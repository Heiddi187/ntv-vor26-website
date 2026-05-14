import Tasks from "./Tasks";
import { describe, it, expect, vi } from "vitest";
import { useGlobalContext } from "@/shared/context/useGlobalContext";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("@/shared/context/useGlobalContext", () => ({
   useGlobalContext: vi.fn(),
}));

beforeEach(() => {
   vi.clearAllMocks();
});

const mockProject = {
   id: "1",
   name: "Test Project",
   description: "Testing description",
   tasksCount: 0,
};

function mockContext(overrides = {}) {
   vi.mocked(useGlobalContext).mockReturnValue({
      activeProject: null,
      tasks: [],
      ...overrides,
   } as any);
}

describe("Tasks tests", () => {
   it("should render tasks heading", () => {
      mockContext({
         activeProject: mockProject,
      });

      render(<Tasks />);

      expect(screen.getByText(/test project/i)).toBeInTheDocument();
   });

   it("should render empty message when no project is selected", () => {
      mockContext();

      render(<Tasks />);

      expect(screen.getByText(/no project selected/i)).toBeInTheDocument();
   });

   it("should render add task button", () => {
      mockContext();

      render(<Tasks />);

      expect(
         screen.getByRole("button", { name: /add task/i }),
      ).toBeInTheDocument();
   });

   it("should open task form when add task button is clicked", async () => {
      const user = userEvent.setup();

      mockContext({ activeProject: mockProject });

      render(<Tasks />);

      await user.click(screen.getByRole("button", { name: /add task/i }));

      expect(await screen.findByText(/create a new task/i)).toBeInTheDocument();
   });

   it("should close task form dialog when cancel is clicked", async () => {
      const user = userEvent.setup();

      mockContext({ activeProject: mockProject });

      render(<Tasks />);

      await user.click(screen.getByRole("button", { name: /add task/i }));
      await user.click(screen.getByRole("button", { name: /cancel/i }));

      expect(screen.queryByText(/create a new task/i)).not.toBeInTheDocument();
   });
});
