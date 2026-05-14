import { describe, it, expect, vi, beforeEach } from "vitest";
import {
   getAllProjectsRaw,
   getAllTasksRaw,
   setAllProjects,
   setAllTasks,
   withSyncedTaskCounts,
} from "./projectTaskStorage";

import { readJson, writeJson } from "@/shared/localStorage/jsonLocalStorage";
import { LOCAL_STORAGE_KEYS } from "@/shared/localStorage/keys";
import type { Project } from "@/feature/project/list/model/project";
import type { Task } from "@/feature/project/tasks/model/task";

vi.mock("@/shared/localStorage/jsonLocalStorage", () => ({
   readJson: vi.fn(),
   writeJson: vi.fn(),
}));

const mockProjects: Project[] = [
   {
      id: "project-1",
      name: "Project 1",
      description: "Testing project 1",
      tasksCount: 0,
   },
   {
      id: "project-2",
      name: "Project 2",
      description: "Testing project 2",
      tasksCount: 0,
   },
];

const mockTasks: Task[] = [
   {
      id: "task-1",
      title: "Task 1",
      description: "Testing task 1",
      completed: false,
      priority: "low",
      projectId: "project-1",
   },
   {
      id: "task-2",
      title: "Task 2",
      description: "Testing task 2",
      completed: true,
      priority: "medium",
      projectId: "project-1",
   },
   {
      id: "task-3",
      title: "Task 3",
      description: "Testing task 3",
      completed: false,
      priority: "high",
      projectId: "project-2",
   },
];

beforeEach(() => {
   vi.clearAllMocks();
});

describe("projectTaskStorage tests", () => {
   describe("getAllTasksRaw", () => {
      it("should return parsed tasks", () => {
         vi.mocked(readJson).mockReturnValue(mockTasks);

         const result = getAllTasksRaw();

         expect(result).toEqual(mockTasks);

         expect(readJson).toHaveBeenCalledWith(LOCAL_STORAGE_KEYS.tasks);
      });

      it("should return empty array for invalid task data", () => {
         vi.mocked(readJson).mockReturnValue("invalid data");

         const result = getAllTasksRaw();

         expect(result).toEqual([]);
      });
   });

   describe("setAllTasks", () => {
      it("should write valid tasks to localStorage", () => {
         setAllTasks(mockTasks);

         expect(writeJson).toHaveBeenCalledWith(
            LOCAL_STORAGE_KEYS.tasks,
            mockTasks,
         );
      });

      it("should not write invalid task data", () => {
         const invalidTasks = [
            {
               invalid: "data",
            },
         ];

         setAllTasks(invalidTasks as any);

         expect(writeJson).not.toHaveBeenCalled();
      });
   });

   describe("getAllProjectsRaw", () => {
      it("should return parsed projects", () => {
         vi.mocked(readJson).mockReturnValue(mockProjects);

         const result = getAllProjectsRaw();

         expect(result).toEqual(mockProjects);

         expect(readJson).toHaveBeenCalledWith(LOCAL_STORAGE_KEYS.projects);
      });

      it("should return empty array for invalid project data", () => {
         vi.mocked(readJson).mockReturnValue("invalid data");

         const result = getAllProjectsRaw();

         expect(result).toEqual([]);
      });
   });

   describe("setAllProjects", () => {
      it("should write valid projects to localStorage", () => {
         setAllProjects(mockProjects);

         expect(writeJson).toHaveBeenCalledWith(
            LOCAL_STORAGE_KEYS.projects,
            mockProjects,
         );
      });

      it("should not write invalid project data", () => {
         const invalidProjects = [
            {
               wrong: "data",
            },
         ];

         setAllProjects(invalidProjects as any);

         expect(writeJson).not.toHaveBeenCalled();
      });
   });

   describe("withSyncedTaskCounts", () => {
      it("should sync correct task counts to projects", () => {
         const result = withSyncedTaskCounts(mockProjects, mockTasks);

         expect(result[0].tasksCount).toBe(2);

         expect(result[1].tasksCount).toBe(1);
      });

      it("should return 0 tasksCount when project has no tasks", () => {
         const result = withSyncedTaskCounts(mockProjects, []);

         expect(result[0].tasksCount).toBe(0);

         expect(result[1].tasksCount).toBe(0);
      });

      it("should not mutate original projects array", () => {
         const originalProjects = structuredClone(mockProjects);

         withSyncedTaskCounts(mockProjects, mockTasks);

         expect(mockProjects).toEqual(originalProjects);
      });

      it("should return a new array", () => {
         const result = withSyncedTaskCounts(mockProjects, mockTasks);

         expect(result).not.toBe(mockProjects);
      });
   });
});
