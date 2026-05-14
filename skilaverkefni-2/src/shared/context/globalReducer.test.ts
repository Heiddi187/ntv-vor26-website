import { describe, it, expect, vi } from "vitest";
import { globalReducer, initialState } from "./globalReducer";
import type { Task } from "@/feature/project/tasks/model/task";

beforeEach(() => {
   vi.resetAllMocks();
});

const mockProject = {
   id: "project-1",
   name: "Testing project",
   description: "reducer test",
   tasksCount: 0,
};

const mockTask: Task = {
   id: "task 1",
   title: "task test",
   description: "reducer test",
   completed: false,
   priority: "low",
   projectId: "project-1",
};

describe("globalReducer tests", () => {
   it("should return unchanged state for unknown action type", () => {
      const result = globalReducer(initialState, {
         type: "UNKNOWN_ACTION",
      } as any);

      expect(result).toEqual(initialState);
   });

   it("should add project to projects array", () => {
      const state = {
         ...initialState,
         projects: [],
      };

      const action = {
         type: "ADD_PROJECT" as const,
         payload: {
            project: mockProject,
         },
      };

      const result = globalReducer(state, action);

      expect(result.projects).toEqual([mockProject]);
   });

   it("should keep existing projects when adding new project", () => {
      const mockProject2 = {
         id: "project-2",
         name: "Testing project 2",
         description: "reducer test 2",
         tasksCount: 0,
      };

      const state = {
         ...initialState,
         projects: [mockProject],
      };

      const action = {
         type: "ADD_PROJECT" as const,
         payload: {
            project: mockProject2,
         },
      };

      const result = globalReducer(state, action);

      expect(result.projects).toEqual([mockProject, mockProject2]);
   });

   it("should add task to tasks array", () => {
      const state = {
         ...initialState,
         projects: [mockProject],
         tasks: [],
      };

      const action = {
         type: "ADD_TASK" as const,
         payload: {
            task: mockTask,
            projectId: mockProject.id,
         },
      };

      const result = globalReducer(state, action);

      expect(result.tasks).toHaveLength(1);
      expect(result.tasks).toEqual([
         {
            ...mockTask,
            projectId: mockProject.id,
         },
      ]);
   });

   it("should attach projectId to added task", () => {
      const taskWithWrongId: Task = {
         ...mockTask,
         projectId: "wrong-id",
      };

      const state = {
         ...initialState,
         projects: [mockProject],
         tasks: [],
      };

      const action = {
         type: "ADD_TASK" as const,
         payload: {
            task: taskWithWrongId,
            projectId: mockProject.id,
         },
      };

      const result = globalReducer(state, action);

      expect(result.tasks[0].projectId).toBe(mockProject.id);
   });

   it("should increment tasksCount for matching project when adding task", () => {
      const taskWithWrongId: Task = {
         ...mockTask,
         projectId: "wrong-id",
      };

      const state = {
         ...initialState,
         projects: [mockProject],
         tasks: [],
      };

      const action = {
         type: "ADD_TASK" as const,
         payload: {
            task: taskWithWrongId,
            projectId: mockProject.id,
         },
      };

      const result = globalReducer(state, action);

      expect(result.projects[0].tasksCount).toBe(1);
   });

   it("should not decrement tasksCount below 0", () => {
      const state = {
         ...initialState,
         projects: [mockProject],
         tasks: [mockTask],
      };

      const action = {
         type: "REMOVE_TASK" as const,
         payload: {
            taskId: mockTask.id,
         },
      };

      const result = globalReducer(state, action);

      expect(result.projects[0].tasksCount).toBe(0);
   });

   it("should not increment tasksCount for other projects when adding task", () => {
      const mockProjectWithTask = {
         ...mockProject,
         tasksCount: 1,
      };

      const mockProject2 = {
         id: "project-2",
         name: "Testing project 2",
         description: "reducer test 2",
         tasksCount: 0,
      };

      const taskWithWrongId: Task = {
         ...mockTask,
         projectId: "wrong-id",
      };

      const state = {
         ...initialState,
         projects: [mockProjectWithTask, mockProject2],
         tasks: [],
      };

      const action = {
         type: "ADD_TASK" as const,
         payload: {
            task: taskWithWrongId,
            projectId: mockProjectWithTask.id,
         },
      };

      const result = globalReducer(state, action);

      expect(result.projects[0].tasksCount).toBe(2);
      expect(result.projects[1].tasksCount).toBe(0);
   });

   it("should update activeProject tasksCount when adding task", () => {
      const state = {
         ...initialState,
         projects: [mockProject],
         tasks: [],
         activeProject: mockProject,
      };

      const action = {
         type: "ADD_TASK" as const,
         payload: {
            task: mockTask,
            projectId: mockProject.id,
         },
      };

      const result = globalReducer(state, action);

      expect(result.activeProject?.tasksCount).toBe(1);
   });

   it("should remove task from tasks array", () => {
      const state = {
         ...initialState,
         projects: [mockProject],
         tasks: [mockTask],
      };

      const action = {
         type: "REMOVE_TASK" as const,
         payload: {
            taskId: mockTask.id,
         },
      };

      const result = globalReducer(state, action);

      expect(result.tasks).toEqual([]);
   });

   it("should decrement tasksCount for matching project when removing task", () => {
      const mockProjectWithTasks = {
         ...mockProject,
         tasksCount: 2,
      };

      const state = {
         ...initialState,
         projects: [mockProjectWithTasks],
         tasks: [mockTask],
      };

      const action = {
         type: "REMOVE_TASK" as const,
         payload: {
            taskId: mockTask.id,
         },
      };

      const result = globalReducer(state, action);

      expect(result.projects[0].tasksCount).toBe(1);
   });

   it("should not modify projects if removed task does not exist", () => {
      const mockProjectWithTasks = {
         ...mockProject,
         tasksCount: 3,
      };

      const state = {
         ...initialState,
         projects: [mockProjectWithTasks],
         tasks: [mockTask],
      };

      const action = {
         type: "REMOVE_TASK" as const,
         payload: {
            taskId: "wrong-id",
         },
      };

      const result = globalReducer(state, action);

      expect(result.projects[0].tasksCount).toBe(3);
   });

   it("should update task when UPDATE_TASK action is dispatched", () => {
      const state = {
         ...initialState,
         projects: [mockProject],
         tasks: [mockTask],
      };

      const action = {
         type: "UPDATE_TASK" as const,
         payload: {
            task: { ...mockTask, title: "updated title" },
            taskId: mockTask.id,
         },
      };

      const result = globalReducer(state, action);

      expect(result.tasks[0].title).toBe("updated title");
   });

   it("should only update matching task when UPDATE_TASK action is dispatched", () => {
      const mockTask2: Task = {
         id: "task 2",
         title: "should not change",
         description: "reducer test",
         completed: false,
         priority: "low",
         projectId: "project-1",
      };

      const state = {
         ...initialState,
         projects: [mockProject],
         tasks: [mockTask, mockTask2],
      };

      const action = {
         type: "UPDATE_TASK" as const,
         payload: {
            task: { ...mockTask, title: "updated title" },
            taskId: mockTask.id,
         },
      };

      const result = globalReducer(state, action);

      expect(result.tasks[0].title).toEqual("updated title");
      expect(result.tasks[1].title).toEqual("should not change");
   });

   it("should update project tasksCount when UPDATE_PROJECT_TASKS_COUNT action is dispatched", () => {
      const state = {
         ...initialState,
         projects: [mockProject],
         tasks: [],
      };

      const action = {
         type: "UPDATE_PROJECT_TASKS_COUNT" as const,
         payload: {
            projectId: mockProject.id,
            tasksCount: 1,
         },
      };

      const result = globalReducer(state, action);

      expect(result.projects[0].tasksCount).toBe(1);
   });

   it("should update activeProject after UPDATE_PROJECT_TASKS_COUNT", () => {
      const state = {
         ...initialState,
         projects: [mockProject],
         tasks: [],
         activeProject: mockProject,
      };

      const action = {
         type: "UPDATE_PROJECT_TASKS_COUNT" as const,
         payload: {
            projectId: mockProject.id,
            tasksCount: 1,
         },
      };

      const result = globalReducer(state, action);

      expect(result.activeProject?.tasksCount).toBe(1);
   });

   it("should remove projects with tasksCount of 0 after UPDATE_PROJECT_TASKS_COUNT", () => {
      const mockProjectWithTasks = {
         ...mockProject,
         tasksCount: 2,
      };

      const mockProject2 = {
         id: "project-2",
         name: "Testing project 2",
         description: "reducer test 2",
         tasksCount: 3,
      };

      const state = {
         ...initialState,
         projects: [mockProjectWithTasks, mockProject2],
      };

      const action = {
         type: "UPDATE_PROJECT_TASKS_COUNT" as const,
         payload: {
            projectId: mockProjectWithTasks.id,
            tasksCount: 0,
         },
      };

      const result = globalReducer(state, action);

      expect(result.projects).not.toContainEqual(mockProjectWithTasks);
      expect(result.projects).toContainEqual(mockProject2);
      expect(result.projects).toHaveLength(1);
   });

   it("should remove project when REMOVE_PROJECT action is dispatched", () => {
      const state = {
         ...initialState,
         projects: [mockProject],
      };

      const action = {
         type: "REMOVE_PROJECT" as const,
         payload: {
            projectId: mockProject.id,
         },
      };

      const result = globalReducer(state, action);

      expect(result.projects).toHaveLength(0);
   });

   it("should clear activeProject when active project is removed", () => {
      const state = {
         ...initialState,
         projects: [mockProject],
         activeProject: mockProject,
      };

      const action = {
         type: "REMOVE_PROJECT" as const,
         payload: {
            projectId: mockProject.id,
         },
      };

      const result = globalReducer(state, action);

      expect(result.activeProject).toBeNull();
   });

   it("should set activeProject when SET_ACTIVE_PROJECT action is dispatched", () => {
      const state = {
         ...initialState,
         projects: [mockProject],
         activeProject: null,
      };

      const action = {
         type: "SET_ACTIVE_PROJECT" as const,
         payload: {
            project: mockProject,
         },
      };

      const result = globalReducer(state, action);

      expect(result.activeProject).toEqual(mockProject);
   });

   it("should keep activeProject when different project is removed", () => {
      const mockProjectWithTasks = {
         ...mockProject,
         tasksCount: 2,
      };

      const mockProject2 = {
         id: "project-2",
         name: "Testing project 2",
         description: "reducer test 2",
         tasksCount: 3,
      };

      const state = {
         ...initialState,
         projects: [mockProjectWithTasks, mockProject2],
         activeProject: mockProjectWithTasks,
      };

      const action = {
         type: "REMOVE_PROJECT" as const,
         payload: {
            projectId: mockProject2.id,
         },
      };

      const result = globalReducer(state, action);

      expect(result.activeProject).toEqual(mockProjectWithTasks);
   });

   it("should clear activeProject when CLEAR_ACTIVE_PROJECT action is dispatched", () => {
      const state = {
         ...initialState,
         projects: [mockProject],
         activeProject: mockProject,
      };

      const action = {
         type: "CLEAR_ACTIVE_PROJECT" as const,
      };

      const result = globalReducer(state, action);

      expect(result.activeProject).toBeNull();
   });
});
