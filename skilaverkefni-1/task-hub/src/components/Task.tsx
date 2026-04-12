import type { TaskType } from "./TaskType";

type TaskProps = {
   task: TaskType;
   deleteTask: (id: number) => void;
   taskStatus: (id: number) => void;
   editTask: (id: number, newTitle: string) => void;
};

const Task = ({ task, deleteTask, taskStatus, editTask }: TaskProps) => {

   return (
      <div
         className="p-4 bg-white rounded-lg shadow-md border-l-4"
         style={{
            borderLeftColor:
               task.priority === "high"
                  ? "red"
                  : task.priority === "medium"
                    ? "orange"
                    : "green",
         }}
      >
         <h3
            className={`text-lg font-bold ${task.completed ? "line-through" : ""}`}
         >
            {task.title}
         </h3>
         <p className="text-sm text-gray-600">
            <strong>Priority: </strong> {task.priority}
         </p>
         <p className="text-sm text-gray-600">
            <strong>Assigned to: </strong> {task.assignedTo}
         </p>
         <p className="text-sm text-gray-600">
            <strong>Description: </strong> {task.description}
         </p>
         <p className="flex gap-8 mt-4">
            <button
               className="text-green-500 mt-3"
               onClick={() => taskStatus(task.id)}
            >
               {task.completed ? "Undo" : "Done"}
            </button>
            <button
                className="text-blue-500 mt-3"
                onClick={() => {
                  const newTitle = prompt("Edit title:", task.title);

                  if (newTitle?.trim()) {
                     editTask(task.id, newTitle);
                  }
               }}
            >
               Edit
            </button>
            <button
               className="mt-3 text-red-500 cursor-pointer transition hover:text-red-700"
               onClick={() => deleteTask(task.id)}
            >
               Delete
            </button>
         </p>
      </div>
   );
};

export default Task;
