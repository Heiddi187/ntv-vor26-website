import { ProjectTasksChart } from "./Chart";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { useGlobalContext } from "@/shared/context";

vi.mock("@/shared/context/useGlobalContext", () => ({
   useGlobalContext: vi.fn(),
}));

const mockTasks = [
   { id: 1, completed: true },
   { id: 2, completed: false },
   { id: 3, completed: false },
   { id: 4, completed: true },
   { id: 5, completed: true },
];

describe("Chart tests", () => {
   it("should show empty message when there are no tasks", async () => {
      vi.mocked(useGlobalContext).mockReturnValue({
         tasks: [],
      } as any);

      render(<ProjectTasksChart />);

      expect(screen.getByText(/No tasks yet/i)).toBeInTheDocument();
   });

   it("should show correct task counts", async () => {
      vi.mocked(useGlobalContext).mockReturnValue({
         tasks: mockTasks,
      } as any);

      render(<ProjectTasksChart />);

      expect(screen.getByText(/5 tasks total/i)).toBeInTheDocument();

      expect(screen.getByText(/3 complete/i)).toBeInTheDocument();

      expect(screen.getByText(/2 incomplete/i)).toBeInTheDocument();
   });

   it("should show singular task when applicable", async () => {
      vi.mocked(useGlobalContext).mockReturnValue({
         tasks: [{ id: 1, completed: true }],
      } as any);

      render(<ProjectTasksChart />);

      expect(screen.getByText(/1 task total/i)).toBeInTheDocument();
   });

   it("should render chart when tasks exist", async () => {
      vi.mocked(useGlobalContext).mockReturnValue({
         tasks: mockTasks,
      } as any);

      render(<ProjectTasksChart />);

      expect(screen.getByTestId("tasks-chart")).toBeInTheDocument();
   });

   it("should update displayed counts when tasks change", async () => {
      const mockedContext = vi.mocked(useGlobalContext);

      mockedContext.mockReturnValue({
         tasks: mockTasks,
      } as any);

      const { rerender } = render(<ProjectTasksChart />);

      expect(screen.getByText(/5 tasks total/i)).toBeInTheDocument();

      mockedContext.mockReturnValue({
         tasks: [...mockTasks, { id: 6, completed: true }],
      } as any);

      rerender(<ProjectTasksChart />);

      expect(screen.getByText(/6 tasks total/i)).toBeInTheDocument();
   });
});
