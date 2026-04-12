import type React from "react";
import type { TaskType } from "./TaskType";

type TaskEditFormProps = {
   editData: TaskType;
   setEditData: React.Dispatch<React.SetStateAction<TaskType>>;
   onSave: () => void;
   onCancel: () => void;
};

const TaskEditForm = ({
   editData,
   setEditData,
   onSave,
   onCancel,
}: TaskEditFormProps) => {

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

   return (
      <div className="space-y-2 border rounded bg-gray-100">
        <h4 className="font-bold text-sm text-orange-400 p-2">Editing Task</h4>
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
               onClick={onSave}
               className="bg-green-500 text-white px-2 py-1 rounded"
            >
               Save
            </button>

            <button
               onClick={onCancel}
               className="bg-gray-300 px-2 py-1 rounded"
            >
               Cancel
            </button>
         </div>
      </div>
   );
};

export default TaskEditForm