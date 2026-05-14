import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { useGlobalContext } from "@/shared/context";
import ProjectCard from "./ProjectCard";
import type { Project } from "../model/project";
import userEvent from "@testing-library/user-event";

vi.mock("@/shared/context", () => ({
   useGlobalContext: vi.fn(),
}));

const mockProject: Project = {
   id: "1",
   name: "Test Project",
   description: "For testing",
   tasksCount: 2,
};

beforeEach(() => {
   vi.mocked(useGlobalContext).mockReturnValue({
      removeProject: vi.fn(),
      setActiveProject: vi.fn(),
   } as any);
});

describe("ProjectCard tests", () => {
   it("should render project name", () => {
      render(<ProjectCard project={mockProject} />);

      expect(screen.getByText(/Test Project/i)).toBeInTheDocument();
   });

   it("should render project description", () => {
      render(<ProjectCard project={mockProject} />);

      expect(screen.getByText(/For testing/i)).toBeInTheDocument();
   });

   it("should render project task count", () => {
      render(<ProjectCard project={mockProject} />);

      expect(screen.getByText(/2 tasks/i)).toBeInTheDocument();
   });

   it("should render singular task label when tasksCount is 1", () => {
      const mockProjectWithSingleTask = {
         ...mockProject,
         tasksCount: 1
      }

      render(<ProjectCard project={mockProjectWithSingleTask} />);

      expect(screen.getByText('1 task')).toBeInTheDocument();
      /// Lagaði í projectCard svo þetta kæmi rétt
      // {project.tasksCount}{" "}
      // {project.tasksCount === 1 ? "task" : "tasks"}
      // í stað:
      // {project.tasksCount} tasks
   });

   it("should call setActiveProject when card is clicked", async () => {
      const user = userEvent.setup();
      const setActiveProject = vi.fn();

      vi.mocked(useGlobalContext).mockReturnValue({
         removeProject: vi.fn(),
         setActiveProject,
      } as any);

      render(<ProjectCard project={mockProject} />);

      await user.click(screen.getByText(/Test Project/i));

      expect(setActiveProject).toHaveBeenCalledWith(mockProject);
      // Test fann að það voru óþarfa keys á CardContent-inu
   });

   it("should call removeProject when delete button is clicked", async () => {
      const user = userEvent.setup();
      const removeProject = vi.fn();

      vi.mocked(useGlobalContext).mockReturnValue({
         removeProject,
         setActiveProject: vi.fn(),
      } as any);

      render(<ProjectCard project={mockProject} />);

      await user.click(screen.getByTestId("remove-project-button"));

      expect(removeProject).toHaveBeenCalledWith(mockProject.id);
   });

   it("should call removeProject with correct project id", async () => {
      const user = userEvent.setup();
      const removeProject = vi.fn();

      vi.mocked(useGlobalContext).mockReturnValue({
         removeProject,
         setActiveProject: vi.fn(),
      } as any);

      render(<ProjectCard project={mockProject} />);

      await user.click(screen.getByTestId("remove-project-button"));

      expect(removeProject).toHaveBeenCalledWith(mockProject.id);
   });

   it("should not call setActiveProject when delete button is clicked", async () => {
      const user = userEvent.setup();
      const setActiveProject = vi.fn();

      vi.mocked(useGlobalContext).mockReturnValue({
         removeProject: vi.fn(),
         setActiveProject,
      } as any);

      render(<ProjectCard project={mockProject} />);

      await user.click(screen.getByTestId("remove-project-button"));

      expect(setActiveProject).not.toHaveBeenCalled();
   });

   it("should render delete button", () => {
      const removeProject = vi.fn();

      vi.mocked(useGlobalContext).mockReturnValue({
         removeProject,
         setActiveProject: vi.fn(),
      } as any);

      render(<ProjectCard project={mockProject} />);

      expect(screen.getByTestId("remove-project-button")).toBeInTheDocument();
   });
});
