# frozen_string_literal: true

describe FieldVso do
  describe ".should_write_ihp?" do
    let(:vso) { FieldVso.create!(name: "Field VSO") }
    let(:docket) { nil }
    let(:appeal) { FactoryBot.create(:appeal, docket_type: docket) }

    before { allow_any_instance_of(Appeal).to receive(:vsos).and_return(poas) }

    subject { vso.should_write_ihp?(appeal) }

    context "when there is no vso_configs record for this VSO" do
      context "when VSO represents the appellant" do
        let(:poas) { [vso] }

        context "when the appeal is on the direct_review docket" do
          let(:docket) { Constants.AMA_DOCKETS.direct_review }
          it "should return false because the default set of dockets to write IHPs is empty" do
            expect(subject).to eq(false)
          end
        end

        context "when the appeal is on the evidence_submission docket" do
          let(:docket) { Constants.AMA_DOCKETS.evidence_submission }
          it "should return false because the default set of dockets to write IHPs is empty" do
            expect(subject).to eq(false)
          end
        end

        context "when the appeal is on the hearing docket" do
          let(:docket) { Constants.AMA_DOCKETS.hearing }
          it "should return false because the default set of dockets to write IHPs is empty" do
            expect(subject).to eq(false)
          end
        end
      end

      context "when VSO does not represent the appellant" do
        let(:poas) { [] }

        context "when the appeal is on the direct_review docket" do
          let(:docket) { Constants.AMA_DOCKETS.direct_review }
          it "should return false for all docket types" do
            expect(subject).to eq(false)
          end
        end

        context "when the appeal is on the evidence_submission docket" do
          let(:docket) { Constants.AMA_DOCKETS.evidence_submission }
          it "should return false for all docket types" do
            expect(subject).to eq(false)
          end
        end

        context "when the appeal is on the hearing docket" do
          let(:docket) { Constants.AMA_DOCKETS.hearing }
          it "should return false for all docket types" do
            expect(subject).to eq(false)
          end
        end
      end
    end
  end
end
