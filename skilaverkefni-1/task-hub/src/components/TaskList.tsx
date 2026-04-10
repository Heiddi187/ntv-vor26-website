import type { TaskType } from "./TaskType";
import Task from "./Task";

type TaskListProps = {
    tasks: TaskType[]
    deleteTask: (id: number) => void
}

const TaskList = ({ tasks, deleteTask }: TaskListProps) => {
    if (tasks.length === 0) {
        return (
            <p className="text-center text-gray-500">
                No tasks
            </p>
        )
    }

    return (
        <div className="space-y-4">
            {tasks.map((task) => (
                <Task
                    key={task.id}
                    task={task}
                    deleteTask={deleteTask}
                />
            ))}
        </div>
    )
}

export default TaskList;