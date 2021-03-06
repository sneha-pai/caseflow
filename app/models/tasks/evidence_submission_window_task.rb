# frozen_string_literal: true

##
# Task that signals that a case now has a 90-day window for appellant to submit additional evidence.
# The evidence window may be waived by an appellant.

class EvidenceSubmissionWindowTask < GenericTask
  include TimeableTask

  def when_timer_ends
    RootTask.create_ihp_tasks!(appeal, parent)
    update!(status: :completed)
  end

  def timer_ends_at
    from_date = if parent.is_a?(DispositionTask)
                  parent.hearing&.hearing_day&.scheduled_for
                end
    from_date ||= appeal.receipt_date

    from_date + 90.days
  end
end
