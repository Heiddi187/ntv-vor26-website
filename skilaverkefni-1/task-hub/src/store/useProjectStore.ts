import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ProjectType } from "../components/ProjectType";
import type { TaskType } from "../components/TaskType";

type ProjectStore = {
   projects: ProjectType[];
   addProject: (project: ProjectType) => void;
   deleteProject: (id: number) => void;

   addTask: (projectId: number, task: TaskType) => void;
   editTask: (
      projectId: number,
      taskId: number,
      updates: Partial<TaskType>,
   ) => void;
   deleteTask: (projectId: number, taskId: number) => void;
   toggleTaskStatus: (projectId: number, taskId: number) => void;
};

export const useProjectStore = create<ProjectStore>()(
   persist(
      (set) => ({
         projects: [],
         addProject: (project) =>
            set((state) => ({
               projects: [project, ...state.projects],
            })),

         deleteProject: (id) =>
            set((state) => ({
               projects: state.projects.filter((p) => p.id !== id),
            })),

         addTask: (projectId, task) =>
            set((state) => ({
               projects: state.projects.map((p) =>
                  p.id === projectId ? { ...p, tasks: [task, ...p.tasks] } : p,
               ),
            })),

         editTask: (projectId, taskId, updates) =>
            set((state) => ({
               projects: state.projects.map((p) =>
                  p.id === projectId
                     ? {
                          ...p,
                          tasks: p.tasks.map((t) =>
                             t.id === taskId ? { ...t, ...updates } : t,
                          ),
                       }
                     : p,
               ),
            })),

         deleteTask: (projectId, taskId) =>
            set((state) => ({
               projects: state.projects.map((p) =>
                  p.id === projectId
                     ? {
                          ...p,
                          tasks: p.tasks.filter((t) => t.id !== taskId),
                       }
                     : p,
               ),
            })),

         toggleTaskStatus: (projectId, taskId) =>
            set((state) => ({
               projects: state.projects.map((p) =>
                  p.id === projectId
                     ? {
                          ...p,
                          tasks: p.tasks.map((t) =>
                             t.id === taskId
                                ? { ...t, completed: !t.completed }
                                : t,
                          ),
                       }
                     : p,
               ),
            })),
      }),
      {
         name: "project-storage",
      },
   ),
);
