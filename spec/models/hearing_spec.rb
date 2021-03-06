# frozen_string_literal: true

describe Hearing do
  context "create" do
    let!(:hearing_day) { create(:hearing_day) }

    before do
      12.times do
        create(:hearing, hearing_day: hearing_day)
      end

      hearing_day.reload
    end

    it "prevents user from overfilling a hearing day" do
      expect do
        Hearing.create!(appeal: create(:appeal), hearing_day: hearing_day, scheduled_time: "8:30 am est")
      end.to raise_error(Hearing::HearingDayFull)
    end
  end

  context "disposition_editable" do
    let!(:hearing) { create(:hearing, :with_tasks) }
    subject { hearing.disposition_editable }

    context "when the hearing has an open disposition task" do
      it { is_expected.to eq(true) }
    end

    context "when the hearing has a cancelled disposition task" do
      before do
        hearing.disposition_task.update!(status: Constants.TASK_STATUSES.cancelled)
      end

      it { is_expected.to eq(false) }
    end

    context "when the hearing has a disposition task with children" do
      let!(:transcription_task) { create(:transcription_task, parent: hearing.disposition_task) }

      it { is_expected.to eq(false) }
    end
  end

  context "assigned_to_vso?" do
    let!(:hearing) { create(:hearing, :with_tasks) }
    let!(:user) { create(:user, :vso_role) }
    let!(:vso_participant_id) { "789" }
    let!(:vso) { create(:vso, participant_id: vso_participant_id) }
    let!(:track_veteran_task) { create(:track_veteran_task, appeal: hearing.appeal, assigned_to: vso) }
    let!(:vso_participant_ids) do
      [
        {
          legacy_poa_cd: "070",
          nm: "VIETNAM VETERANS OF AMERICA",
          org_type_nm: "POA National Organization",
          ptcpnt_id: vso_participant_id
        }
      ]
    end

    before do
      BGSService = ExternalApi::BGSService
      RequestStore[:current_user] = user

      allow_any_instance_of(BGS::SecurityWebService).to receive(:find_participant_id)
        .with(css_id: user.css_id, station_id: user.station_id).and_return(vso_participant_id)
      allow_any_instance_of(BGS::OrgWebService).to receive(:find_poas_by_ptcpnt_id)
        .with(vso_participant_id).and_return(vso_participant_ids)
    end

    after do
      BGSService = Fakes::BGSService
    end

    subject { hearing.assigned_to_vso?(user) }

    context "when the hearing is not assigned a vso" do
      let(:vso) { Vso.create(participant_id: "999") }

      it { is_expected.to eq(false) }
    end

    context "when the hearing is assigned a vso" do
      it { is_expected.to eq(true) }
    end
  end
end
