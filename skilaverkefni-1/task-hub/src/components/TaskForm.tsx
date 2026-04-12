import { useState } from "react";
import type { TaskType } from "./TaskType";

type FormDataType = {
   title: string;
   priority: "low" | "medium" | "high";
   description: string;
   assignedTo: string;
   completed: boolean;
};

type TaskFormProps = {
   addTask: (task: TaskType) => void;
};

export const TaskForm = ({ addTask }: TaskFormProps) => {
   const [formData, setFormData] = useState<FormDataType>({
      title: "",
      priority: "medium",
      description: "",
      assignedTo: "",
      completed: false,
   });

   // const [isFormVisible, setIsFormVisible] = useState(true);

   const handleChange = (
      e: React.ChangeEvent<
         HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
   ) => {
      const { name, value, type } = e.target;
      setFormData({
         ...formData,
         [name]:
            type === "checkbox"
               ? (e.target as HTMLInputElement).checked
               : value,
      });
   };

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!formData.title.trim()) return;

      const newTask: TaskType = {
         id: Date.now(),
         ...formData,
      };

      addTask(newTask);

      setFormData({
         title: "",
         priority: "medium",
         description: "",
         assignedTo: "",
         completed: false,
      });
   };

   return (
      <>
         <form onSubmit={handleSubmit} className="space-y-2 border p-3 rounded">
            <input
               name="title"
               placeholder="task title"
               value={formData.title}
               onChange={handleChange}
               className="border p-2 w-full"
            />

            <select
               name="priority"
               value={formData.priority}
               onChange={handleChange}
               className="border p-2 w-full"
            >
               <option value="low">Low</option>
               <option value="medium">Medium</option>
               <option value="high">High</option>
            </select>

            <textarea 
               name="description"
               placeholder="Description"
               value={formData.description}
               onChange={handleChange}
               className="border p-2 w-full"
            />

            <input 
               name="assignedTo"
               placeholder="Assigned to"
               value={formData.assignedTo}
               onChange={handleChange}
               className="border p-2 w-full"
            />   
            completed:
            <label className="flex items-center gap-2">
               <input 
                  type="checkbox" 
                  name="completed"
                  checked={formData.completed}
                  onChange={handleChange}
               />
               Completed
            </label>
            
            <button
               disabled={!formData.title.trim()}
               className="bg-blue-500 text-white px-3 py-1 rounded"
               type="submit"
            >
               Add Task
            </button>
         </form>
      </>
   );
};

export default TaskForm;
