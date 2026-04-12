import { useState } from "react";
import type { TaskType } from "./TaskType";

// type FormDataType = {
//    title: string;
//    priority: "low" | "medium" | "high";
//    description: string;
//    assignedTo: string;
//    completed: boolean;
// };

type TaskFormProps = {
   addTask: (task: TaskType) => void;
};

export const TaskForm = ({ addTask }: TaskFormProps) => {
   const [title, setTitle] = useState("");
   const [priority, setPriority] = useState<"low" | "medium" | "high">("low");
   const [description, setDescription] = useState("");
   const [assignedTo, setAssignedTo] = useState("");
   const [completed, setCompleted] = useState(false);

   // const [formData, setFormData] = useState<FormDataType>({
   //    title: "",
   //    priority: "medium",
   //    description: "",
   //    assignedTo: "",
   //    completed: false,
   // });

   // const [isFormVisible, setIsFormVisible] = useState(true);

   // const handleChange = (
   //    e: React.ChangeEvent<
   //       HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
   //    >,
   // ) => {
   //    const { name, value, type } = e.target;
   //    setFormData({
   //       ...formData,
   //       [name]:
   //          type === "checkbox"
   //             ? (e.target as HTMLInputElement).checked
   //             : value,
   //    });
   // };

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!title.trim()) return;

      // const newTask: TaskType = {
      //    id: Date.now(),
      //    ...formData,
      // };

      addTask({
         id: Date.now(),
         title,
         priority,
         description,
         assignedTo,
         completed,
      });

      setTitle("");
      //    setFormData({
      //       title: "",
      //       priority: "medium",
      //       description: "",
      //       assignedTo: "",
      //       completed: false,
      //    });
      };

      return (
         <>
            <form
               onSubmit={handleSubmit}
               className="space-y-2 border p-3 rounded"
            >
               <input
                  name="title"
                  placeholder="task title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border p-2 w-full"
               />
               <select
                  name="priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as "low" | "medium" | "high")}
                  className="border p-2 w-full"
               >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
               </select>
               <textarea
                  name="description"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="border p-2 w-full"
               />
               <input
                  name="assignedTo"
                  placeholder="Assigned to"
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
                  className="border p-2 w-full"
               />
               completed:
               <label className="flex items-center gap-2">
                  <input
                     type="checkbox"
                     name="completed"
                     checked={completed}
                     onChange={() => setCompleted(!completed)}
                  />
                  Completed
               </label>
               <button
                  disabled={!title.trim()}
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
