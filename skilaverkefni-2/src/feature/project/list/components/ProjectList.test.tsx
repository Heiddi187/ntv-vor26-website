import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { useGlobalContext } from "@/shared/context/useGlobalContext";
import ProjectList from "./ProjectList";
import type { Project } from "../model/project";
import userEvent from "@testing-library/user-event";
import { ProjectTasksChart } from "../../chart/components/Chart";

vi.mock("@/shared/context/useGlobalContext", () => ({
   useGlobalContext: vi.fn(),
}));

const mockProject: Project = {
   id: "id-1",
   name: "mock project",
   description: "testing",
   tasksCount: 2,
};

const mockProjects = [
   {
      id: "id-1",
      name: "mock project",
      description: "testing",
      tasksCount: 2,
   },
   {
      id: "id-2",
      name: "mock project 2",
      description: "re-testing",
      tasksCount: 1,
   },
   {
      id: "id-3",
      name: "mock project 3",
      description: "re-re-testing",
      tasksCount: 4,
   },
];

beforeEach(() => {
    vi.clearAllMocks();
})

describe("ProjectList tests", () => {
   it("should render Projects title", async () => {
      vi.mocked(useGlobalContext).mockReturnValue({
         projects: [],
         tasks: [],
         activeProject: null,
         clearActiveProject: vi.fn(),
      } as any);

      render(<ProjectList />);

      expect(screen.getByText("Projects")).toBeInTheDocument();
   });

   it("should render ProjectTasksChart component", async () => {
      vi.mocked(useGlobalContext).mockReturnValue({
         projects: [],
         tasks: [],
         activeProject: null,
         clearActiveProject: vi.fn(),
      } as any);

      render(<ProjectTasksChart />);

      expect(screen.getByText(/no tasks yet/i)).toBeInTheDocument();
   });

   it("should render AddProject button when no active project exists", async () => {
      vi.mocked(useGlobalContext).mockReturnValue({
         projects: [],
         tasks: [],
         activeProject: null,
         clearActiveProject: vi.fn(),
      } as any);

      render(<ProjectList />);

      expect(
         screen.getByRole("button", { name: "Add project" }),
      ).toBeInTheDocument();
   });

   it("should not render AddProject button when active project exists", async () => {
      vi.mocked(useGlobalContext).mockReturnValue({
         projects: [],
         tasks: [],
         activeProject: mockProject,
         clearActiveProject: vi.fn(),
      } as any);

      render(<ProjectList />);

      expect(
         screen.queryByRole("button", { name: "Add project" }),
      ).not.toBeInTheDocument();
   });

   it("should render back button when active project exists", async () => {
      vi.mocked(useGlobalContext).mockReturnValue({
         projects: [],
         tasks: [],
         activeProject: mockProject,
         clearActiveProject: vi.fn(),
      } as any);

      render(<ProjectList />);

      expect(screen.getByRole("button", { name: "back" })).toBeInTheDocument();
   });

   it("should not render back button when no active project exists", async () => {
      vi.mocked(useGlobalContext).mockReturnValue({
         projects: [],
         tasks: [],
         activeProject: null,
         clearActiveProject: vi.fn(),
      } as any);

      render(<ProjectList />);

      expect(
         screen.queryByRole("button", { name: "back" }),
      ).not.toBeInTheDocument();
   });

   it("should call clearActiveProject when back button is clicked", async () => {
      const user = userEvent.setup();
      const clearActiveProject = vi.fn();

      vi.mocked(useGlobalContext).mockReturnValue({
         projects: [],
         tasks: [],
         activeProject: mockProject,
         clearActiveProject,
      } as any);

      render(<ProjectList />);

      await user.click(screen.getByRole("button", { name: /back/i }));

      expect(clearActiveProject).toHaveBeenCalled();
   });

   it("should render empty state message when no projects exist", async () => {
      vi.mocked(useGlobalContext).mockReturnValue({
         projects: [],
         tasks: [],
         activeProject: null,
         clearActiveProject: vi.fn(),
      } as any);

      render(<ProjectList />);

      expect(
         screen.getByText(/add a project to get started/i),
      ).toBeInTheDocument();
   });

   it("should hide empty state message when projects exist", async () => {
      vi.mocked(useGlobalContext).mockReturnValue({
         projects: [mockProject],
         tasks: [],
         activeProject: null,
         clearActiveProject: vi.fn(),
      } as any);

      render(<ProjectList />);

      expect(
         screen.queryByText(/add a project to get started/i),
      ).not.toBeInTheDocument();
   });

   it("should render ProjectCard components when projects exist", async () => {
      vi.mocked(useGlobalContext).mockReturnValue({
         projects: [mockProject],
         tasks: [],
         activeProject: null,
         clearActiveProject: vi.fn(),
      } as any);

      render(<ProjectList />);

      expect(screen.getByText("mock project")).toBeInTheDocument();
   });

   it("should render correct number of ProjectCard components", async () => {
      vi.mocked(useGlobalContext).mockReturnValue({
         projects: mockProjects,
         tasks: [],
         activeProject: null,
         clearActiveProject: vi.fn(),
      } as any);

      render(<ProjectList />);

      expect(screen.getAllByTestId("project-card")).toHaveLength(3);
   });

   it("should render project names from project list", async () => {
      vi.mocked(useGlobalContext).mockReturnValue({
         projects: mockProjects,
         tasks: [],
         activeProject: null,
         clearActiveProject: vi.fn(),
      } as any);

      render(<ProjectList />);

      expect(screen.getByText("mock project")).toBeInTheDocument();
      expect(screen.getByText("mock project 2")).toBeInTheDocument();
      expect(screen.getByText("mock project 3")).toBeInTheDocument();
   });

   it("should open add project dialog when AddProject button is clicked", async () => {
      const user = userEvent.setup();

      vi.mocked(useGlobalContext).mockReturnValue({
         projects: [],
         tasks: [],
         activeProject: null,
         clearActiveProject: vi.fn(),
      } as any);

      render(<ProjectList />);

      await user.click(screen.getByRole("button", { name: /Add project/i }));

      expect(
         screen.getByRole("button", { name: /Cancel/i }),
      ).toBeInTheDocument();
   });

   it("should close dialog when Cancel button is clicked", async () => {
      const user = userEvent.setup();

      vi.mocked(useGlobalContext).mockReturnValue({
         projects: [],
         tasks: [],
         activeProject: null,
         clearActiveProject: vi.fn(),
      } as any);

      render(<ProjectList />);

      await user.click(screen.getByRole("button", { name: /Add project/i }));

      await user.click(screen.getByRole("button", { name: /Cancel/i }));

      expect(
         screen.queryByRole("button", { name: /Cancel/i }),
      ).not.toBeInTheDocument();
   });

   it("should rerender project list when projects change", async () => {
      vi.mocked(useGlobalContext).mockReturnValue({
         projects: [mockProject],
         tasks: [],
         activeProject: null,
         clearActiveProject: vi.fn(),
      } as any);

      const { rerender } = render(<ProjectList />);

      expect(screen.getByText(/mock project/i)).toBeInTheDocument();

      expect(screen.queryByText(/mock project 2/i)).not.toBeInTheDocument();

      vi.mocked(useGlobalContext).mockReturnValue({
         projects: mockProjects,
         tasks: [],
         activeProject: null,
         clearActiveProject: vi.fn(),
      } as any);

      rerender(<ProjectList />);

      expect(screen.getByText(/mock project 2/i)).toBeInTheDocument();

      expect(screen.getByText(/mock project 3/i)).toBeInTheDocument();
   });
});
