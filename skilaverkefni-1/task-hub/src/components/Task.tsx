import type { TaskType } from "./TaskType";

type TaskProps = {
    task: TaskType
    deleteTask: (id: number) => void
}

const Task = ({ task, deleteTask}: TaskProps) => {
    return (
        <div className="p-4 bg-white rounded-lg shadow-md border-l-4" style={{
            borderLeftColor:
                task.priority === 'high'
                ? 'red'
                : task.priority === 'medium'
                ? 'orange'
                : 'green'
        }}>
            <h3 className="text-lg font-bold">
                {task.title}
            </h3>
            <p className="text-sm text-gray-600">
                <strong>Priority: </strong> {task.priority}
            </p>
            <p className="text-sm text-gray-600">
                <strong>Assigned to: </strong> {task.assignTo}
            </p>
            <p className="text-sm text-gray-600">
                <strong>Description: </strong> {task.description}
            </p>
            <p className="text-sm text-gray-600">
                <strong>Completed: </strong> {task.completed}
            </p>
            <button onClick={() => deleteTask(task.id)} className="mt-3 text-red-500 cursor-pointer transition hover:text-red-700"> 
                Delete
            </button>
        </div>
    )
}

export default Task