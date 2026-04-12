// import type { TaskType } from "./TaskType";
// import Task from "./Task";

// type TaskListProps = {
//     tasks: TaskType[]
//     deleteTask: (id: number) => void
//     taskStatus: (id: number) => void;
//     editTask: (id: number, updatedTask: Partial<TaskType>) => void;
// }

// const TaskList = ({ tasks, deleteTask, taskStatus, editTask }: TaskListProps) => {
//     if (tasks.length === 0) {
//         return (
//             <p className="text-center text-gray-500">
//                 No tasks
//             </p>
//         )
//     }

//     return (
//         <div className="space-y-4">
//             {tasks.map((task) => (
//                 <Task
//                     key={task.id}
//                     task={task}
//                     deleteTask={deleteTask}
//                     editTask={editTask}
//                     taskStatus={taskStatus}
//                 />
//             ))}
//         </div>
//     )
// }

// export default TaskList;