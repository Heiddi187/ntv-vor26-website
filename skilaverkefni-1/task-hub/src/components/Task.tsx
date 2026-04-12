import { useState, useEffect } from "react";
import type { TaskType } from "./TaskType";
import TaskEditForm from "./TaskEditForm";

type TaskProps = {
   task: TaskType;
   deleteTask: (id: number) => void;
   taskStatus: (id: number) => void;
   editTask: (id: number, updatedTask: Partial<TaskType>) => void;
};

const Task = ({ task, deleteTask, taskStatus, editTask }: TaskProps) => {
   const [isOpen, setIsOpen] = useState(false);

   const [isEditing, setIsEditing] = useState(false);
   const [editData, setEditData] = useState(task);

   useEffect(() => {
      setEditData(task);
   }, [task]);

   const saveEdit = () => {
      editTask(task.id, editData);
      setIsEditing(false);
   };

   if (isEditing) {
        return (
            <TaskEditForm
                editData={editData}
                setEditData={setEditData}
                onSave={saveEdit}
                onCancel={() => setIsEditing(false)}
            />
        )
   }

   return (
      <div
         onClick={() => setIsOpen((prev) => !prev)}
         className="p-4 bg-white rounded-lg shadow-md border-l-4 cursor-pointer"
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
         {isOpen && (
            <div className="mt-2 text-sm text-gray-500 space-y-1">
               <p className="text-sm text-gray-600">
                  <strong>Priority: </strong> {task.priority}
               </p>
               <p className="text-sm text-gray-600">
                  <strong>Description: </strong> {task.description}
               </p>
               <p className="text-sm text-gray-600">
                  <strong>Assigned to: </strong> {task.assignedTo}
               </p>
            </div>
         )}
         {isOpen && (
            <div className="flex gap-8 mt-3">
               <button
                  className="text-green-500 mt-3"
                  onClick={(e) => {
                     e.stopPropagation();
                     taskStatus(task.id);
                  }}
               >
                  {task.completed ? "Undo" : "Completed"}
               </button>

               <button
                  className="text-blue-500 mt-3"
                  onClick={(e) => {
                     e.stopPropagation();
                     setIsEditing(true);
                  }}
               >
                  Edit Task
               </button>

               <button
                  className="mt-3 text-red-500 cursor-pointer transition hover:text-red-700"
                  onClick={(e) => {
                     e.stopPropagation();

                     if (!confirm("Delete task?")) return;

                     deleteTask(task.id);
                  }}
               >
                  Delete Task
               </button>
            </div>
         )}
      </div>
   );
};

export default Task;
