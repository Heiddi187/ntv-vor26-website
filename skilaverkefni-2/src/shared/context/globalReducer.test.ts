import { describe, it, expect, vi } from "vitest";
import { globalReducer, initialState } from "./globalReducer";

describe("", () => {
   it("should return unchanged state for unknown action type", () => {
      const result = globalReducer(initialState, {
         type: "UNKNOWN_ACTION",
      } as any);

      expect(result).toEqual(initialState);
   });

   it.todo("should add project to projects array", () => {});

   it.todo("should keep existing projects when adding new project", () => {});

   it.todo("should add task to tasks array", () => {});

   it.todo("should attach projectId to added task", () => {});

   it.todo(
      "should increment tasksCount for matching project when adding task",
      () => {},
   );

   it.todo("should update activeProject tasksCount when adding task", () => {});

   it.todo("should remove task from tasks array", () => {});

   it.todo(
      "should decrement tasksCount for matching project when removing task",
      () => {},
   );

   it.todo(
      "should update task when UPDATE_TASK action is dispatched",
      () => {},
   );

   it.todo(
      "should only update matching task when UPDATE_TASK action is dispatched",
      () => {},
   );

   it.todo(
      "should update project tasksCount when UPDATE_PROJECT_TASKS_COUNT action is dispatched",
      () => {},
   );

   it.todo(
      "should remove project when REMOVE_PROJECT action is dispatched",
      () => {},
   );

   it.todo(
      "should clear activeProject when active project is removed",
      () => {},
   );
});
