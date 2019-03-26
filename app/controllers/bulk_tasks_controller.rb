class BulkTasksController < TasksController
  def create
    assignee = User.find(create_params[:assigned_to_id])

    # TODO: Make sure we close the original task if we are reassigning. Maybe we can just call task.reassign()?
    task_class = JudgeTeam.for_judge(assignee) ? JudgeAssignTask.name : AttorneyTask.name

    tasks = task_class.create_many_from_params(create_params, current_user)

    tasks_to_return = (queue_class.new(user: current_user).tasks + tasks).uniq

    render json: { tasks: json_tasks(tasks_to_return) }
  rescue ActiveRecord::RecordInvalid => error
    invalid_record_error(error.record)
  end
end
