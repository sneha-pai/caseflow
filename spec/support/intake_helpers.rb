# rubocop:disable Metrics/ModuleLength
module IntakeHelpers
  # rubocop: disable Metrics/MethodLength
  # rubocop: disable Metrics/ParameterLists
  def start_higher_level_review(
    test_veteran,
    receipt_date: 1.day.ago,
    claim_participant_id: nil,
    legacy_opt_in_approved: false,
    veteran_is_not_claimant: false,
    benefit_type: "compensation"
  )

    higher_level_review = HigherLevelReview.create!(
      veteran_file_number: test_veteran.file_number,
      receipt_date: receipt_date,
      informal_conference: false, same_office: false,
      benefit_type: benefit_type,
      legacy_opt_in_approved: legacy_opt_in_approved,
      veteran_is_not_claimant: veteran_is_not_claimant
    )

    intake = HigherLevelReviewIntake.create!(
      veteran_file_number: test_veteran.file_number,
      user: User.authenticate!(roles: ["Mail Intake"]),
      started_at: 5.minutes.ago,
      detail: higher_level_review
    )

    if claim_participant_id
      Claimant.create!(
        review_request: higher_level_review,
        participant_id: claim_participant_id || test_veteran.participant_id,
        payee_code: claim_participant_id ? "02" : "00"
      )
    end

    higher_level_review.start_review!

    [higher_level_review, intake]
  end

  def start_supplemental_claim(
    test_veteran,
    receipt_date: 1.day.ago,
    legacy_opt_in_approved: false,
    veteran_is_not_claimant: false,
    claim_participant_id: nil,
    benefit_type: "compensation"
  )

    supplemental_claim = SupplementalClaim.create!(
      veteran_file_number: test_veteran.file_number,
      receipt_date: receipt_date,
      benefit_type: benefit_type,
      legacy_opt_in_approved: legacy_opt_in_approved,
      veteran_is_not_claimant: veteran_is_not_claimant
    )

    intake = SupplementalClaimIntake.create!(
      veteran_file_number: test_veteran.file_number,
      user: User.authenticate!(roles: ["Mail Intake"]),
      started_at: 5.minutes.ago,
      detail: supplemental_claim
    )

    if claim_participant_id
      Claimant.create!(
        review_request: supplemental_claim,
        participant_id: claim_participant_id
      )
    end

    supplemental_claim.start_review!
    [supplemental_claim, intake]
  end

  def start_appeal(
    test_veteran,
    receipt_date: 1.day.ago,
    veteran_is_not_claimant: false,
    legacy_opt_in_approved: false
  )
    appeal = Appeal.create!(
      veteran_file_number: test_veteran.file_number,
      receipt_date: receipt_date,
      docket_type: "evidence_submission",
      legacy_opt_in_approved: legacy_opt_in_approved,
      veteran_is_not_claimant: veteran_is_not_claimant
    )

    intake = AppealIntake.create!(
      veteran_file_number: test_veteran.file_number,
      user: User.authenticate!(roles: ["Mail Intake"]),
      started_at: 5.minutes.ago,
      detail: appeal
    )

    Claimant.create!(
      review_request: appeal,
      participant_id: test_veteran.participant_id
    )

    appeal.start_review!

    [appeal, intake]
  end
  # rubocop: enable Metrics/MethodLength
  # rubocop: enable Metrics/ParameterLists

  def setup_intake_flags
    FeatureToggle.enable!(:intake)
    FeatureToggle.enable!(:intakeAma)
    FeatureToggle.enable!(:intake_legacy_opt_in)

    Time.zone = "America/New_York"
    Timecop.freeze(Time.zone.today)

    # skip the sync call since all edit requests require resyncing
    # currently, we're not mocking out vbms and bgs
    allow_any_instance_of(EndProductEstablishment).to receive(:sync!).and_return(nil)
  end

  def teardown_intake_flags
    FeatureToggle.disable!(:intakeAma)
    FeatureToggle.disable!(:intake_legacy_opt_in)
  end

  def search_page_title
    "Search for Veteran by ID"
  end

  def search_bar_title
    "Enter the Veteran's ID"
  end

  def add_untimely_exemption_response(yes_or_no, note = "I am an exemption note")
    expect(page).to have_content("The issue requested isn't usually eligible because its decision date is older")
    find_all("label", text: yes_or_no).first.click
    fill_in "Notes", with: note
    safe_click ".add-issue"
  end

  def click_intake_add_issue
    safe_click "#button-add-issue"
  end

  def click_intake_finish
    safe_click "#button-finish-intake"
  end

  def click_intake_continue
    safe_click "#button-submit-review"
  end

  def click_edit_submit
    safe_click "#button-submit-update"
  end

  def click_intake_no_matching_issues
    safe_click ".no-matching-issues"
  end

  def add_intake_rating_issue(description, note = nil)
    # find_all with 'minimum' will wait like find() does.
    find_all("label", text: description, minimum: 1).first.click
    fill_in("Notes", with: note) if note
    safe_click ".add-issue"
  end

  def get_claim_id(claim_review)
    EndProductEstablishment.find_by(source: claim_review).reference_id
  end

  def add_intake_nonrating_issue(
    category: "Active Duty Adjustments",
    description: "Some description",
    date: "01/01/2016",
    legacy_issues: false
  )
    add_button_text = legacy_issues ? "Next" : "Add this issue"
    expect(page.text).to match(/Does issue \d+ match any of these issue categories?/)
    expect(page).to have_button(add_button_text, disabled: true)
    fill_in "Issue category", with: category
    find("#issue-category").send_keys :enter
    fill_in "Issue description", with: description
    fill_in "Decision date", with: date
    expect(page).to have_button(add_button_text, disabled: false)
    safe_click ".add-issue"
  end

  def add_active_intake_nonrating_issue(description)
    find_all("label", text: description, minimum: 1).first.click
    safe_click ".add-issue"
  end

  def add_intake_unidentified_issue(description = "unidentified issue description")
    safe_click ".no-matching-issues"
    safe_click ".no-matching-issues"
    expect(page).to have_content("Describe the issue to mark it as needing further review.")
    fill_in "Transcribe the issue as it's written on the form", with: description
    safe_click ".add-issue"
  end

  def click_remove_intake_issue(number)
    issue_el = find_intake_issue_by_number(number)
    issue_el.find(".remove-issue").click
  end

  def click_remove_intake_issue_by_text(text)
    issue_el = find_intake_issue_by_text(text)
    issue_el.find(".remove-issue").click
  end

  def click_remove_issue_confirmation
    safe_click ".remove-issue"
  end

  def click_number_of_issues_changed_confirmation
    safe_click "#Number-of-issues-has-changed-button-id-1"
  end

  def click_still_have_unidentified_issue_confirmation
    safe_click "#Unidentified-issue-button-id-1"
  end

  def find_intake_issue_by_number(number)
    find_all(:xpath, './/div[@class="issues"]/*/div[@class="issue"]').each do |node|
      if node.find(".issue-num").text.match?(/^#{number}\./)
        return node
      end
    end
  end

  def find_intake_issue_by_text(text)
    find_all(:xpath, './/div[@class="issues"]/*/div[@class="issue"]').each do |node|
      if node.text.match?(/#{text}/)
        return node
      end
    end
  end

  def find_intake_issue_number_by_text(text)
    find_intake_issue_by_text(text).find(".issue-num").text.delete(".")
  end

  def expect_ineligible_issue(number)
    expect(find_intake_issue_by_number(number)).to have_css(".not-eligible")
  end

  def expect_eligible_issue(number)
    expect(find_intake_issue_by_number(number)).to_not have_css(".not-eligible")
  end

  def setup_active_eligible_legacy_appeal(veteran_file_number)
    create(:legacy_appeal, vacols_case:
      create(
        :case,
        :status_active,
        bfkey: "vacols1",
        bfcorlid: "#{veteran_file_number}S",
        bfdnod: 3.days.ago,
        bfdsoc: 3.days.ago,
        case_issues: [
          create(:case_issue, :ankylosis_of_hip),
          create(:case_issue, :limitation_of_thigh_motion_extension)
        ]
      ))
  end

  def setup_active_ineligible_legacy_appeal(veteran_file_number)
    create(:legacy_appeal, vacols_case:
      create(
        :case,
        :status_active,
        bfkey: "vacols2",
        bfcorlid: "#{veteran_file_number}S",
        bfdnod: 4.years.ago,
        bfdsoc: 4.months.ago,
        case_issues: [
          create(:case_issue, :intervertebral_disc_syndrome),
          create(:case_issue, :degenerative_arthritis_of_the_spine)
        ]
      ))
  end

  def setup_inactive_eligible_legacy_appeal(veteran_file_number)
    create(:legacy_appeal, vacols_case:
      create(
        :case,
        :status_complete,
        bfkey: "vacols3",
        bfcorlid: "#{veteran_file_number}S",
        bfdnod: 4.days.ago,
        bfdsoc: 4.days.ago,
        case_issues: [
          create(:case_issue, :impairment_of_hip),
          create(:case_issue, :impairment_of_femur, :disposition_opted_in)
        ]
      ))
  end

  def setup_inactive_ineligible_legacy_appeal(veteran_file_number)
    create(:legacy_appeal, vacols_case:
      create(
        :case,
        :status_complete,
        bfkey: "vacols4",
        bfcorlid: "#{veteran_file_number}S",
        bfdnod: 4.years.ago,
        bfdsoc: 4.months.ago,
        case_issues: [
          create(:case_issue, :typhoid_arthritis),
          create(:case_issue, :caisson_disease_of_bones)
        ]
      ))
  end

  def setup_legacy_opt_in_appeals(veteran_file_number)
    setup_active_eligible_legacy_appeal(veteran_file_number)
    setup_active_ineligible_legacy_appeal(veteran_file_number)
    setup_inactive_eligible_legacy_appeal(veteran_file_number)
    setup_inactive_ineligible_legacy_appeal(veteran_file_number)
  end

  def setup_request_issue_with_nonrating_decision_issue(decision_review, issue_category: "Active Duty Adjustments")
    create(:request_issue,
           :with_nonrating_decision_issue,
           description: "Test nonrating decision issue",
           nonrating_issue_description: "Test nonrating decision issue",
           review_request: decision_review,
           decision_date: decision_review.receipt_date - 1.day,
           issue_category: issue_category,
           veteran_participant_id: veteran.participant_id)
  end

  def setup_request_issue_with_rating_decision_issue(decision_review, contested_rating_issue_reference_id: "rating123")
    create(:request_issue,
           :with_rating_decision_issue,
           contested_rating_issue_reference_id: contested_rating_issue_reference_id,
           contested_rating_issue_profile_date: decision_review.receipt_date - 1.day,
           description: "Test rating decision issue",
           contested_issue_description: "Test rating decision issue",
           review_request: decision_review,
           veteran_participant_id: veteran.participant_id)
  end

  def setup_prior_decision_issues(veteran, benefit_type: "compensation")
    supplemental_claim_with_decision_issues = create(:supplemental_claim,
                                                     veteran_file_number: veteran.file_number,
                                                     benefit_type: benefit_type)

    nonrating_request_issue = setup_request_issue_with_nonrating_decision_issue(supplemental_claim_with_decision_issues)
    rating_request_issue = setup_request_issue_with_rating_decision_issue(supplemental_claim_with_decision_issues)

    rating_request_issue.decision_issues + nonrating_request_issue.decision_issues
  end
end
# rubocop:enable Metrics/ModuleLength
