import type { Task } from "../../model/task";
import { filterTasksBySearchQuery } from "./filterTasksBySearchQuery";
import { describe, it, expect } from "vitest";

const mockTasks: Task[] = [
   {
      id: "1",
      title: "Task 1",
      description: "Testing task 1",
      completed: true,
      priority: "low",
      projectId: "project-1",
   },
   {
      id: "2",
      title: "Task 2",
      description: "Testing task 2",
      completed: false,
      priority: "medium",
      projectId: "project-1",
   },
   {
      id: "3",
      title: "Task 3",
      description: "Testing task 3",
      completed: false,
      priority: "high",
      projectId: "project-1",
   },
   {
      id: "4",
      title: "Task 4",
      description: "Testing task 4",
      completed: true,
      priority: "low",
      projectId: "project-1",
   },
   {
      id: "5",
      title: "Unique title",
      description: "Unique description",
      completed: true,
      priority: "medium",
      projectId: "project-1",
   },
];

describe("filterTasksBySearchQuery tests", () => {
   it("should return matching tasks", () => {
      const result = filterTasksBySearchQuery(mockTasks, "Task");

      expect(result).toHaveLength(4);
   });

   it("should return all tasks for empty query", () => {
      const result = filterTasksBySearchQuery(mockTasks, "");

      expect(result).toHaveLength(5);
   });

   it("should return all tasks for whitespace in query", () => {
      const result = filterTasksBySearchQuery(mockTasks, " ");

      expect(result).toHaveLength(5);
   });

   it("should return empty array when no matches found", () => {
      const result = filterTasksBySearchQuery(mockTasks, "apple");

      expect(result).toEqual([]);
   });

   it("should match task title", () => {
      const result = filterTasksBySearchQuery(mockTasks, "Unique title");

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Unique title')
   });

   it("should match task description", () => {
      const result = filterTasksBySearchQuery(mockTasks, "Unique description");

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Unique title')
      expect(result[0].description).toBe('Unique description')
      expect(result).toEqual([mockTasks[4]]);
   });

   it("should match task priority", () => {
      const result = filterTasksBySearchQuery(mockTasks, "medium");

      expect(result).toHaveLength(2);
   });

   it("should be case insensitive", () => {
      const result = filterTasksBySearchQuery(mockTasks, "uniQUE deSCRiptiOn");

      expect(result).toHaveLength(1);
   });

   it("should not mutate original tasks array", () => {
      const originalTasks = [...mockTasks];
      const result = filterTasksBySearchQuery(mockTasks, "medium");

      expect(result).toHaveLength(2);
      expect(mockTasks).toEqual(originalTasks);
   });
});
