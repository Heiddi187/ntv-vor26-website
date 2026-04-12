import { useState } from "react";
import type { ProjectType } from "./ProjectType";
import type { TaskType } from "./TaskType";
import TaskForm from "./TaskForm";
import Task from "./Task";

type ProjectProps = {
   project: ProjectType;
   deleteProject: (id: number) => void;
   setProjects: React.Dispatch<React.SetStateAction<ProjectType[]>>;
};

const Project = ({ project, deleteProject, setProjects }: ProjectProps) => {
   const [showTaskForm, setShowTaskForm] = useState(false);

   const addTask = (task: TaskType) => {
      const updatedProject = {
         ...project,
         tasks: [task, ...project.tasks],
      };

      setProjects((prev) =>
         prev.map((p) => (p.id === project.id ? updatedProject : p)),
      );
   };

   const deleteTask = (taskId: number) => {
      setProjects((prev) =>
         prev.map((p) =>
            p.id === project.id
               ? {
                    ...p,
                    tasks: p.tasks.filter((t) => t.id !== taskId),
                 }
               : p,
         ),
      );
   };

   const taskStatus = (taskId: number) => {
      setProjects((prev) =>
         prev.map((p) =>
            p.id === project.id
               ? {
                    ...p,
                    tasks: p.tasks.map((t) =>
                       t.id === taskId ? { ...t, completed: !t.completed } : t,
                    ),
                 }
               : p,
         ),
      );
   };

   const editTask = (taskId: number, updatedTask: Partial<TaskType>) => {
      setProjects((prev) =>
         prev.map((p) =>
            p.id === project.id
               ? {
                    ...p,
                    tasks: p.tasks.map((t) =>
                       t.id === taskId ? { ...t, ...updatedTask } : t,
                    ),
                 }
               : p,
         ),
      );
   };

   return (
      <div className="border shadow-lg rounded-lg py-2 px-2">
         <h3 className="text-lg font-bold">{project.title}</h3>
         <p>
            <strong>Category: </strong> {project.category}
         </p>
         <p>
            <strong>Description: </strong> {project.description}
         </p>
         <button
            onClick={() => deleteProject(project.id)}
            className="mt-3 text-red-500"
         >
            Delete Project
         </button>
         <div className="space-y-2 mt-2">
         {project.tasks.map(task => (
            <Task
                key={task.id}
                task={task}
                deleteTask={deleteTask}
                taskStatus={taskStatus}
                editTask={editTask}
            />
         ))}
        </div>
         
         {/* {project.tasks.map((task) => (
            <div
               key={task.id}
               className="border p-2 rounded flex justify-between items-center"
            >
               <div>
                  <span className={task.completed ? "line-through" : ""}>
                     {task.title}
                  </span>
               </div>
               <div>
                  <button
                     onClick={() => taskStatus(task.id)}
                     className="text-green-500"
                  >
                     {task.completed ? "undo" : "done"}
                  </button>

                  <button
                     onClick={() => {
                        const newTitle = prompt("Edit task title:", task.title);

                        if (!newTitle?.trim()) return;

                        if (newTitle) editTask(task.id, newTitle);
                     }}
                     className="text-blue-500"
                  >
                     Edit
                  </button>

                  <button
                    onClick={() => {
                        if (!confirm("Delete this task?")) return
                        
                        deleteTask(task.id)
                    }}
                    className="text-red-500"
                  >
                    Delete
                  </button>
               </div>
            </div>
         ))} */}
         <button onClick={() => setShowTaskForm((prev) => !prev)}>
            Add Task
         </button>
         {showTaskForm && <TaskForm addTask={addTask} />}
      </div>
   );
};

export default Project;
