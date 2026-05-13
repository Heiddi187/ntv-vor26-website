import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { useGlobalContext } from "@/shared/context";
import ProjectForm from "./ProjectForm";
import { Dialog } from "@/shared/components/ui/dialog";
import userEvent from "@testing-library/user-event";

vi.mock("@/shared/context", () => ({
   useGlobalContext: vi.fn(),
}));

const onClose = vi.fn();

beforeEach(() => {
   vi.clearAllMocks();
});

describe("ProjectForm tests", () => {
   it("should render project name input", async () => {
      vi.mocked(useGlobalContext).mockReturnValue({
         addProject: vi.fn(),
      } as any);

      render(
         <Dialog open>
            <ProjectForm onClose={onClose} />
         </Dialog>,
      );

      expect(screen.getByLabelText(/Project name/i)).toBeInTheDocument();
   });

   it("should update project name input value when typing", async () => {
      const user = userEvent.setup();

      vi.mocked(useGlobalContext).mockReturnValue({
         addProject: vi.fn(),
      } as any);

      render(
         <Dialog open>
            <ProjectForm onClose={onClose} />
         </Dialog>,
      );

      const input = screen.getByLabelText(/Project name/i);

      await user.type(input, "new project");

      expect(input).toHaveValue("new project");
   });

   it("should render description input", async () => {
      vi.mocked(useGlobalContext).mockReturnValue({
         addProject: vi.fn(),
      } as any);

      render(
         <Dialog open>
            <ProjectForm onClose={onClose} />
         </Dialog>,
      );

      expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
   });

   it("should update description input value when typing", async () => {
      const user = userEvent.setup();

      vi.mocked(useGlobalContext).mockReturnValue({
         addProject: vi.fn(),
      } as any);

      render(
         <Dialog open>
            <ProjectForm onClose={onClose} />
         </Dialog>,
      );

      const descriptionInput = screen.getByLabelText(/description/i);

      await user.type(descriptionInput, "testing description");

      expect(descriptionInput).toHaveValue("testing description");
   });

   it("should render add project submit button", async () => {
      vi.mocked(useGlobalContext).mockReturnValue({
         addProject: vi.fn(),
      } as any);

      render(
         <Dialog open>
            <ProjectForm onClose={onClose} />
         </Dialog>,
      );

      expect(
         screen.getByRole("button", { name: "Add project" }),
      ).toBeInTheDocument();
   });

   it("should render cancel button", async () => {
      vi.mocked(useGlobalContext).mockReturnValue({
         addProject: vi.fn(),
      } as any);

      render(
         <Dialog open>
            <ProjectForm onClose={onClose} />
         </Dialog>,
      );

      expect(
         screen.getByRole("button", { name: "Cancel" }),
      ).toBeInTheDocument();
   });

   it("should call addProject when form is submitted with valid data", async () => {
      const user = userEvent.setup();
      const addProject = vi.fn();

      vi.mocked(useGlobalContext).mockReturnValue({
         addProject,
      } as any);

      render(
         <Dialog open>
            <ProjectForm onClose={onClose} />
         </Dialog>,
      );

      const inputName = screen.getByLabelText(/Project name/i);

      await user.type(inputName, "new project");

      const descriptionInput = screen.getByLabelText(/description/i);

      await user.type(descriptionInput, "testing description");

      await user.click(screen.getByRole("button", { name: /Add project/i }));

      expect(addProject).toHaveBeenCalledWith(
         expect.objectContaining({
            name: "new project",
            description: "testing description",
            tasksCount: 0,
         }),
      );
   });

   it("should not call addProject when project name is empty", async () => {
      const user = userEvent.setup();
      const addProject = vi.fn();

      vi.mocked(useGlobalContext).mockReturnValue({
         addProject,
      } as any);

      render(
         <Dialog open>
            <ProjectForm onClose={onClose} />
         </Dialog>,
      );

      await user.click(screen.getByRole("button", { name: /Add project/i }));

      expect(addProject).not.toHaveBeenCalled();
   });

   it("should not call addProject if input is only whitespace", async () => {
      const user = userEvent.setup();
      const addProject = vi.fn();

      vi.mocked(useGlobalContext).mockReturnValue({
         addProject,
      } as any);

      render(
         <Dialog open>
            <ProjectForm onClose={onClose} />
         </Dialog>,
      );

      const inputName = screen.getByLabelText(/Project name/i);

      await user.type(inputName, "     ");

      await user.click(screen.getByRole("button", { name: /Add project/i }));

      expect(addProject).not.toHaveBeenCalled();
   });

   it("should reset form inputs after successful submit", async () => {
      const user = userEvent.setup();
      const addProject = vi.fn();

      vi.mocked(useGlobalContext).mockReturnValue({
         addProject,
      } as any);

      render(
         <Dialog open>
            <ProjectForm onClose={onClose} />
         </Dialog>,
      );

      const inputName = screen.getByLabelText(/Project name/i);

      await user.type(inputName, "new project");

      const descriptionInput = screen.getByLabelText(/description/i);

      await user.type(descriptionInput, "testing description");

      await user.click(screen.getByRole("button", { name: /Add project/i }));

      expect(inputName).toHaveValue("");
      expect(descriptionInput).toHaveValue("");
   });

   it("should call onClose after successful submit", async () => {
      const user = userEvent.setup();
      const addProject = vi.fn();

      vi.mocked(useGlobalContext).mockReturnValue({
         addProject,
      } as any);

      render(
         <Dialog open>
            <ProjectForm onClose={onClose} />
         </Dialog>,
      );

      const inputName = screen.getByLabelText(/Project name/i);

      await user.type(inputName, "new new project");

      await user.click(screen.getByRole("button", { name: /Add project/i }));

      expect(onClose).toHaveBeenCalled();
   });

   it("should not call onClose when form submission is invalid", async () => {
      const user = userEvent.setup();
      const addProject = vi.fn();

      vi.mocked(useGlobalContext).mockReturnValue({
         addProject,
      } as any);

      render(
         <Dialog open>
            <ProjectForm onClose={onClose} />
         </Dialog>,
      );

      await user.click(screen.getByRole("button", { name: /Add project/i }));

      expect(onClose).not.toHaveBeenCalled();
   });

   it("should allow empty description", async () => {
      const user = userEvent.setup();
      const addProject = vi.fn();

      vi.mocked(useGlobalContext).mockReturnValue({
         addProject,
      } as any);

      render(
         <Dialog open>
            <ProjectForm onClose={onClose} />
         </Dialog>,
      );

      const inputName = screen.getByLabelText(/Project name/i);

      await user.type(inputName, "new project");

      await user.click(screen.getByRole("button", { name: /Add project/i }));

      expect(addProject).toHaveBeenCalledWith(
         expect.objectContaining({
            name: "new project",
            description: "",
            tasksCount: 0,
         }),
      );
   });
});
