import { ProjectTasksChart } from "./Chart";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { useGlobalContext } from "@/shared/context";
import type { Task } from "../../tasks/model/task";

vi.mock("@/shared/context/useGlobalContext", () => ({
   useGlobalContext: vi.fn(),
}));

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
      title: "Task 5",
      description: "Testing task 5",
      completed: true,
      priority: "medium",
      projectId: "project-1",
   },
];

describe("Chart tests", () => {
   it("should show empty message when there are no tasks", () => {
      vi.mocked(useGlobalContext).mockReturnValue({
         tasks: [],
      } as any);

      render(<ProjectTasksChart />);

      expect(screen.getByText(/No tasks yet/i)).toBeInTheDocument();
   });

   it("should show correct task counts", () => {
      vi.mocked(useGlobalContext).mockReturnValue({
         tasks: mockTasks,
      } as any);

      render(<ProjectTasksChart />);

      expect(screen.getByText(/5 tasks total/i)).toBeInTheDocument();

      expect(screen.getByText(/3 complete/i)).toBeInTheDocument();

      expect(screen.getByText(/2 incomplete/i)).toBeInTheDocument();
   });

   it("should show singular task when applicable", () => {
      vi.mocked(useGlobalContext).mockReturnValue({
         tasks: [
            {
               ...mockTasks[0],
            },
         ],
      } as any);

      render(<ProjectTasksChart />);

      expect(screen.getByText(/1 task total/i)).toBeInTheDocument();
   });

   it("should render chart when tasks exist", () => {
      vi.mocked(useGlobalContext).mockReturnValue({
         tasks: mockTasks,
      } as any);

      render(<ProjectTasksChart />);

      expect(screen.getByTestId("tasks-chart")).toBeInTheDocument();
   });

   it("should update displayed counts when tasks change", () => {
      const mockedContext = vi.mocked(useGlobalContext);

      mockedContext.mockReturnValue({
         tasks: mockTasks,
      } as any);

      const { rerender } = render(<ProjectTasksChart />);

      expect(screen.getByText(/5 tasks total/i)).toBeInTheDocument();

      mockedContext.mockReturnValue({
         tasks: [
            ...mockTasks,
            {
               id: "6",
               title: "Task 6",
               description: "testing ",
               completed: true,
               priority: "low",
               projectId: "project-1",
            },
         ],
      } as any);

      rerender(<ProjectTasksChart />);

      expect(screen.getByText(/6 tasks total/i)).toBeInTheDocument();
      expect(screen.getByText(/4 complete/i)).toBeInTheDocument();
   });
});
