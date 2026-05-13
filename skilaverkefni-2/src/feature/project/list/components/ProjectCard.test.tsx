import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { useGlobalContext } from "@/shared/context";
import ProjectCard from "./ProjectCard";
import type { Project } from "../model/project";
import userEvent from '@testing-library/user-event';

vi.mock("@/shared/context", () => ({
   useGlobalContext: vi.fn(),
}));

const mockProject: Project = {
   id: '1',
   name: 'Test Project',
   description: 'For testing',
   tasksCount: 2
}



describe("ProjectCard tests", () => {
   it("should render project name", async () => {
      vi.mocked(useGlobalContext).mockReturnValue({
         removeProject: vi.fn(),
         setActiveProject: vi.fn()
      } as any);

      render (<ProjectCard project={mockProject}/>);

      expect(screen.getByText(/Test Project/i)).toBeInTheDocument();
   });

   it("should render project description", async () => {
      vi.mocked(useGlobalContext).mockReturnValue({
         removeProject: vi.fn(),
         setActiveProject: vi.fn()
      } as any);

      render (<ProjectCard project={mockProject}/>);

      expect(screen.getByText(/For testing/i)).toBeInTheDocument();
   });

   it("should render project task count", async () => {
      vi.mocked(useGlobalContext).mockReturnValue({
         removeProject: vi.fn(),
         setActiveProject: vi.fn()
      } as any);

      render (<ProjectCard project={mockProject}/>);

      expect(screen.getByText(/2 tasks/i)).toBeInTheDocument();
   });

   it("should call setActiveProject when card is clicked", async () => {
      const user = userEvent.setup();
      const setActiveProject = vi.fn();
      
      vi.mocked(useGlobalContext).mockReturnValue({
         removeProject: vi.fn(),
         setActiveProject,
      } as any);

      render (<ProjectCard project={mockProject}/>);

      await user.click(screen.getByText(/Test Project/i));

      expect(setActiveProject).toHaveBeenCalledWith(mockProject)
      // Test fann að það voru óþarfa keys á CardContent-inu
   });

   it.todo("should call removeProject when delete button is clicked", async () => {

   });

   it.todo("should call removeProject with correct project id", async () => {

   });

   it.todo("should not call setActiveProject when delete button is clicked", async () => {

   });

   it.todo("should render delete button", async () => {

   });
});
