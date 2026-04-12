import { useState } from "react";
import type { ProjectType } from "./ProjectType";
import type { TaskType } from "./TaskType";
import TaskForm from "./TaskForm";
import Task from "./Task";
import { useProjectStore } from "../store/useProjectStore";
import { useTaskFilters } from "../hooks/useTaskFilters";

type ProjectProps = {
   project: ProjectType;
   deleteProject: (id: number) => void;
   // setProjects: React.Dispatch<React.SetStateAction<ProjectType[]>>;
};

const Project = ({ project, deleteProject }: ProjectProps) => {
   const [search, setSearch] = useState("");
   const [priorityFilter, setPriorityFilter] = useState<
      "all" | "low" | "medium" | "high"
   >("all");
   const [statusFilter, setStatusFilter] = useState<
      "all" | "completed" | "active"
   >("all");

   const filteredTasks = useTaskFilters(project.tasks, {
      search,
      priority: priorityFilter,
      status: statusFilter,
   });

   const addTask = useProjectStore((s) => s.addTask);

   // const deleteTask = useProjectStore((state) => state.deleteTask)
   // const toggleTaskStatus = useProjectStore((state) => state.toggleTaskStatus)
   // const editTask = useProjectStore((state) => state.editTask)

   const [showTaskForm, setShowTaskForm] = useState(false);

   // nýttt

   //    addTask(project.id, task);
   //    deleteTask(project.id, taskId);
   //    toggleTaskStatus(project.id, taskId);
   //    editTask(project.id, TaskEditForm, updates);

   //    const addTask = (task: TaskType) => {
   //       const updatedProject = {
   //          ...project,
   //          tasks: [task, ...project.tasks],
   //       };

   //       setProjects((prev) =>
   //          prev.map((p) => (p.id === project.id ? updatedProject : p)),
   //       );
   //    };

   //    const deleteTask = (taskId: number) => {
   //       setProjects((prev) =>
   //          prev.map((p) =>
   //             p.id === project.id
   //                ? {
   //                     ...p,
   //                     tasks: p.tasks.filter((t) => t.id !== taskId),
   //                  }
   //                : p,
   //          ),
   //       );
   //    };

   //    const taskStatus = (taskId: number) => {
   //       setProjects((prev) =>
   //          prev.map((p) =>
   //             p.id === project.id
   //                ? {
   //                     ...p,
   //                     tasks: p.tasks.map((t) =>
   //                        t.id === taskId ? { ...t, completed: !t.completed } : t,
   //                     ),
   //                  }
   //                : p,
   //          ),
   //       );
   //    };

   //    const editTask = (taskId: number, updatedTask: Partial<TaskType>) => {
   //       setProjects((prev) =>
   //          prev.map((p) =>
   //             p.id === project.id
   //                ? {
   //                     ...p,
   //                     tasks: p.tasks.map((t) =>
   //                        t.id === taskId ? { ...t, ...updatedTask } : t,
   //                     ),
   //                  }
   //                : p,
   //          ),
   //       );
   //    };
   const totalTasks = project.tasks.length;

   const completedTasks = project.tasks.filter((t) => t.completed).length

   const progress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

   return (
      <div className="border shadow-lg rounded-lg py-2 px-2">
         <h3 className="text-lg font-bold">{project.title}</h3>
         <p>
            <strong>Category: </strong> {project.category}
         </p>
         <p>
            <strong>Description: </strong> {project.description}
         </p>
         <div className="mt-3">
            <p className="text-sm text-gray-600">
                Tasks: {completedTasks} / {totalTasks} completed ({progress}%)
            </p>
            <div className="w-full bg-gray-200 rounded-full h-3 mt-1">
                <div
                    className="bg-green-500 h-3 rounded-full transition-all"
                    style={{ width: `${progress}%`}}
                />
            </div>
         </div>
         <button
            onClick={() => deleteProject(project.id)}
            className="mt-3 text-red-500"
         >
            Delete Project
         </button>

         <div className="space-y-2 mt-3">
            <input
               placeholder="Search tasks..."
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               className="border p-2 w-full"
            />

            <select
               value={priorityFilter}
               onChange={(e) => setPriorityFilter(e.target.value as "all" | "low" | "medium" | "high")}
               className="border p-2 w-full"
            >
               <option value="all">All priorities</option>
               <option value="low">Low</option>
               <option value="medium">Medium</option>
               <option value="high">High</option>
            </select>

            <select
               value={statusFilter}
               onChange={(e) => setStatusFilter(e.target.value as "all" | "active" | "completed")}
               className="border p-2 w-full"
            >
               <option value="all">All tasks</option>
               <option value="active">Active</option>
               <option value="completed">Completed</option>
            </select>
         </div>
         <div className="space-y-2 mt-2">
            {filteredTasks.map((task) => (
               <Task
                  key={task.id}
                  task={task}
                  projectId={project.id}
                  // deleteTask={deleteTask}
                  // taskStatus={taskStatus}
                  // editTask={editTask}
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
         {showTaskForm && (
            <TaskForm addTask={(task) => addTask(project.id, task)} />
         )}
      </div>
   );
};

export default Project;
