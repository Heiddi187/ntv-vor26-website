import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TaskTable } from "./TaskTable";
import { useGlobalContext } from "@/shared/context/useGlobalContext";

vi.mock("@/shared/context/useGlobalContext", () => ({
   useGlobalContext: vi.fn(),
}));

const mockTasks = [
   {
      id: "1",
      title: "First task",
      description: "Testing first",
      completed: false,
      priority: "low",
      projectId: "project-1",
   },
   {
      id: "2",
      title: "Second task",
      description: "Testing second",
      completed: true,
      priority: "high",
      projectId: "project-1",
   },
];

beforeEach(() => {
   vi.clearAllMocks();

   vi.mocked(useGlobalContext).mockReturnValue({
      tasks: mockTasks,
      removeTask: vi.fn(),
      updateTask: vi.fn(),
   } as any);
});

describe("TaskTable tests", () => {
   it("should render search input", () => {
      render(<TaskTable projectId="project-1" onEditTask={vi.fn()} />);

      expect(screen.getByPlaceholderText(/search tasks/i)).toBeInTheDocument();
   });

   it("should render task titles", () => {
      render(<TaskTable projectId="project-1" onEditTask={vi.fn()} />);

      expect(screen.getByText(/first task/i)).toBeInTheDocument();

      expect(screen.getByText(/second task/i)).toBeInTheDocument();
   });

   it("should filter tasks when typing in search input", async () => {
      const user = userEvent.setup();

      render(<TaskTable projectId="project-1" onEditTask={vi.fn()} />);

      const searchInput = screen.getByPlaceholderText(/search tasks/i);

      await user.type(searchInput, "first");

      expect(screen.getByText(/first task/i)).toBeInTheDocument();

      expect(screen.queryByText(/second task/i)).not.toBeInTheDocument();
   });

   it("should only render tasks for matching project id", () => {
      vi.mocked(useGlobalContext).mockReturnValue({
         tasks: [
            ...mockTasks,
            {
               id: "3",
               title: "not this project task",
               description: "not this",
               completed: false,
               priority: "medium",
               projectId: "project-2",
            },
         ],
         removeTask: vi.fn(),
         updateTask: vi.fn(),
      } as any);

      render(<TaskTable projectId="project-1" onEditTask={vi.fn()} />);

      expect(screen.queryByText(/not this/i)).not.toBeInTheDocument();
   });
});
