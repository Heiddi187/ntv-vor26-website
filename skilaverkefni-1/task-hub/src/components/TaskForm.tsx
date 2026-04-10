import { useState } from "react";
import type { TaskType } from "./TaskType";

type FormDataType = {
   title: string;
   priority: "low" | "medium" | "high";
   description: string;
   assignedTo: string
   completed: boolean
};

type TaskFormProps = {
   setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
};

export const TaskForm = ({ setTasks }: TaskFormProps) => {
   const [formData, setFormData] = useState<FormDataType>({
      title: "",
      priority: "medium",
      description: "",
      assignedTo: "",
      completed: false
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
         [name]: type === "checkbox"
            ? (e.target as HTMLInputElement).checked
            : value,
      });
   };

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!formData.title.trim()) return;
      const newTask: TaskType = { id: Date.now(), ...formData };
      setTasks((tasks) => [newTask, ...tasks]);
      setFormData({
         title: "",
         priority: "medium",
         description: "",
         assignedTo: "",
         completed: false
      });
   };

   return (
      <>
         
            <form onSubmit={handleSubmit} className="mb-6">
               <input
                  name="Title"
                  placeholder="task title"
                  value={formData.title}
                  onChange={handleChange}
               />
               <select
                  name="Category"
                  value={formData.priority}
                  onChange={handleChange}
                  >
                     <option value="low">Low</option>
                     <option value="medium">Medium</option>
                     <option value="high">High</option>
                  </select>
               {/* <TextAreaInput
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
               /> */}
               description?: 
               assignTo?: 
               completed: 
               <button className="w-full bg-blue-400 text-white py-2 rounded-lg cursor-pointer hover:bg-blue-600">
                  Add Task
               </button>
            </form>
        
      </>
   );
};

export default TaskForm;
