import { useState, useEffect } from "react";
import type { TaskType } from "./TaskType";

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

   const handleChange = (
      e: React.ChangeEvent<
         HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
   ) => {
      const { name, value, type } = e.target;

      setEditData((prev) => ({
         ...prev,
         [name]:
            type === "checkbox"
               ? (e.target as HTMLInputElement).checked
               : value,
      }));
   };

   const saveEdit = () => {
      editTask(task.id, editData);
      setIsEditing(false);
   };

   if (isEditing) {
      return (
         <div className="space-y-2 border rounded bg-gray-100">
            <div>
               <label className="text-sm font-semibold p-2">Title:</label>
               <input
                  name="title"
                  value={editData.title}
                  onChange={handleChange}
                  className="border p-2 w-full"
               />
            </div>

            <div>
               <label className="text-sm font-semibold p-2">Priority:</label>
               <select
                  name="priority"
                  value={editData.priority}
                  onChange={handleChange}
                  className="border p-2 w-full"
               >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
               </select>
            </div>

            <div>
               <label className="text-sm font-semibold p-2">Description:</label>
               <textarea
                  name="description"
                  value={editData.description}
                  onChange={handleChange}
                  className="border p-2 w-full"
               />
            </div>

            <div>
               <label className="text-sm font-semibold p-2">Assigned to:</label>
               <input
                  name="assignedTo"
                  value={editData.assignedTo}
                  onChange={handleChange}
                  className="border p-2 w-full"
               />
            </div>

            <div className="flex gap-2">
               <button
                  onClick={saveEdit}
                  className="bg-green-500 text-white px-2 py-1 rounded"
               >
                  Save
               </button>

               <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-300 px-2 py-1 rounded"
               >
                  Cancel
               </button>
            </div>
         </div>
      );
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

                     // const newTitle = prompt("Edit title:", task.title);
                     // if (!newTitle?.trim()) return;
                     // editTask(task.id, { title: newTitle });

                     // const newAssignedTo = prompt(
                     //    "Edit Assigned to",
                     //    task.assignedTo,
                     // );
                     // if (!newAssignedTo?.trim()) return;
                     // editTask(task.id, { assignedTo: newAssignedTo });

                     // const newDescription = prompt(
                     //    "Edit description",
                     //    task.description,
                     // );
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
