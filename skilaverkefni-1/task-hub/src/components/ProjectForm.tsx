import { useState } from "react";
import type { ProjectType } from "./ProjectType";
import type { TaskType } from "./TaskType";
import ProjectInput from "./ProjectInput";
import SelectInput from "./SelectInput";
import TextAreaInput from "./TextAreaInput";
import TaskForm from "./TaskForm";

type FormDataType = {
   title: string;
   category: string;
   description: string;
   tasks: TaskType[];
};

type ProjectFormProps = {
   setProjects: React.Dispatch<React.SetStateAction<ProjectType[]>>;
};

export const ProjectForm = ({ setProjects }: ProjectFormProps) => {
   const [formData, setFormData] = useState<FormDataType>({
      title: "",
      category: "",
      description: "",
      tasks: [],
   });

   const [isFormVisible, setIsFormVisible] = useState(false);

   const handleChange = (
      e: React.ChangeEvent<
         HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
   ) => {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value,
      });
   };

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!formData.title.trim()) return;

      const newProject: ProjectType = { id: Date.now(), ...formData };

      setProjects((projects) => [newProject, ...projects]);

      setFormData({
         title: "",
         category: "",
         description: "",
         tasks: [],
      });
   };

   // adding tasks
   const setTasks = (task: TaskType) => {
      setFormData((prev) => ({
         ...prev,
         tasks: [task, ...prev.tasks],
      }));
   };

   return (
      <>
         <button
            className="w-full bg-gray-100 border text-blue-800 py-2 rounded-lg cursor-pointer hover:bg-blue-300 border-blue-400"
            onClick={() => setIsFormVisible(!isFormVisible)}
         >
            {isFormVisible ? "Hide Form" : "Add New Project"}
         </button>
         {isFormVisible && (
            <form onSubmit={handleSubmit} className="mb-6">
               <ProjectInput
                  label="Title"
                  name="title"
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
               />
               <TaskForm setTasks={setTasks} />
               <div className="mt-4 space-y-2">
                  {formData.tasks.map((task) => (
                     <div key={task.id} className="border p-2 rounded">
                        {task.title} {task.completed ? "✅" : "❌"}
                     </div>
                  ))}
               </div>
               <button className="w-full bg-blue-400 text-white py-2 rounded-lg cursor-pointer hover:bg-blue-600">
                  Add Project
               </button>
            </form>
         )}
      </>
   );
};

export default ProjectForm;
