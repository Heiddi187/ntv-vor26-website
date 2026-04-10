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

   const [isFormVisible, setIsFormVisible] = useState(true);

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
         <button
            className="w-full bg-gray-100 border text-blue-800 py-2 rounded-lg cursor-pointer hover:bg-blue-300 border-blue-400"
            onClick={() => setIsFormVisible(!isFormVisible)}
         >
            {isFormVisible ? "Hide Form" : "Add New Task"}
         </button>
         {isFormVisible && (
            <form onSubmit={handleSubmit} className="mb-6">
               {/* <ProjectInput
                  label="Title"
                  title="title"
                  value={formData.title}
                  onChange={handleChange}
               />
               <SelectInput
                  label="Category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  options={[
                     { value: "Work", label: "Work" },
                     { value: "Personal", label: "Personal" },
                     { value: "Ideas", label: "Ideas" },
                  ]}
               />
               <TextAreaInput
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
               /> */}
               <button className="w-full bg-blue-400 text-white py-2 rounded-lg cursor-pointer hover:bg-blue-600">
                  Add Project
               </button>
            </form>
         )}
      </>
   );
};

export default TaskForm;
