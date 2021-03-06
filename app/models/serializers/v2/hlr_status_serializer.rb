# frozen_string_literal: true

class V2::HLRStatusSerializer
  include FastJsonapi::ObjectSerializer
  set_key_transform :camel_lower
  set_type :higher_level_review
  set_id :review_status_id

  attribute :appeal_ids, &:linked_review_ids

  attribute :updated do
    Time.zone.now.in_time_zone("Eastern Time (US & Canada)").round.iso8601
  end

  attribute :incomplete_history do
    false
  end

  attribute :active, &:active_status?
  attribute :description

  attribute :location do
    "aoj"
  end

  attribute :aoj
  attribute :program_area, &:program
  attribute :status, &:status_hash
  attribute :alerts
  attribute :issues, &:issues_hash
  attribute :events

  # Stubbed attributes
  attribute :evidence do
    []
  end
end
