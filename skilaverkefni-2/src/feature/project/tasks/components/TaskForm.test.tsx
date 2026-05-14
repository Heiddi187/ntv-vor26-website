import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { useGlobalContext } from "@/shared/context/useGlobalContext";
import userEvent from "@testing-library/user-event";
import TaskForm from "./TaskForm";
import type { Project } from "../../list/model/project";
import { Dialog } from "@/shared/components/ui/dialog";

// til að fá select priority til að virka!
Element.prototype.hasPointerCapture = vi.fn();
Element.prototype.setPointerCapture = vi.fn();
Element.prototype.releasePointerCapture = vi.fn();
Element.prototype.scrollIntoView = vi.fn();

vi.mock("@/shared/context/useGlobalContext", () => ({
   useGlobalContext: vi.fn(),
}));

beforeEach(() => {
   vi.clearAllMocks();

   vi.mocked(useGlobalContext).mockReturnValue({
      addTask: vi.fn(),
      updateTask: vi.fn(),
      activeProject: mockProject,
   } as any);
});

const mockProject: Project = {
   id: "nr 1",
   name: "Project 1",
   description: "describe",
   tasksCount: 0,
};

function renderTaskForm(
   props: Partial<React.ComponentProps<typeof TaskForm>> = {},
) {
   return render(
      <Dialog open>
         <TaskForm onClose={vi.fn()} taskToEdit={null} {...props} />
      </Dialog>,
   );
}

describe("TaskForm tests", () => {
   it("should render title input", () => {
      renderTaskForm();

      expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
   });

   it("should render description input", () => {
      renderTaskForm();

      expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
   });

   it("should render priority select", () => {
      renderTaskForm();

      expect(screen.getByLabelText(/priority/i)).toBeInTheDocument();
   });

   it("should update title when typing", async () => {
      const user = userEvent.setup();

      renderTaskForm();

      const titleInput = screen.getByLabelText(/task title/i);

      await user.type(titleInput, "new task title");

      expect(titleInput).toHaveValue("new task title");
   });

   it("should update description when typing", async () => {
      const user = userEvent.setup();

      renderTaskForm();

      const descriptionInput = screen.getByLabelText(/description/i);

      await user.type(descriptionInput, "new descr..");

      expect(descriptionInput).toHaveValue("new descr..");
   });

   it("should call addTask on submit", async () => {
      const user = userEvent.setup();

      const addTask = vi.fn();

      vi.mocked(useGlobalContext).mockReturnValue({
         addTask,
         updateTask: vi.fn(),
         activeProject: mockProject,
      } as any);

      renderTaskForm();

      await user.type(screen.getByLabelText(/task title/i), "new title");

      await user.click(screen.getByRole("button", { name: /add task/i }));

      expect(addTask).toHaveBeenCalled();
   });

   it("should update priority when selected", async () => {
      const user = userEvent.setup();

      const addTask = vi.fn();

      vi.mocked(useGlobalContext).mockReturnValue({
         addTask,
         updateTask: vi.fn(),
         activeProject: mockProject,
      } as any);

      renderTaskForm();

      await user.type(screen.getByLabelText(/task title/i), "new title");

      const prioritySelect = screen.getByRole("combobox");

      await user.click(prioritySelect);

      await user.click(screen.getByRole("option", { name: /high/i }));

      await user.click(screen.getByRole("button", { name: /add task/i }));

      expect(addTask).toHaveBeenCalledWith(
         expect.objectContaining({
            title: "new title",
            priority: "high",
         }),
         mockProject.id,
      );
   });

   it("should call onClose after successful submit", async () => {
      const user = userEvent.setup();

      const onClose = vi.fn();

      renderTaskForm({ onClose });

      await user.type(screen.getByLabelText(/task title/i), "new task title");

      await user.click(screen.getByRole("button", { name: /add task/i }));

      expect(onClose).toHaveBeenCalled();
   });

   it("should not submit when title is empty", async () => {
      const user = userEvent.setup();

      const addTask = vi.fn();

      vi.mocked(useGlobalContext).mockReturnValue({
         addTask,
         updateTask: vi.fn(),
         activeProject: mockProject,
      } as any);

      renderTaskForm();

      await user.click(screen.getByRole("button", { name: /add task/i }));

      expect(addTask).not.toHaveBeenCalled();
   });

   it("should reset form after submit", async () => {
      const user = userEvent.setup();

      renderTaskForm();

      const titleInput = screen.getByLabelText(/task title/i);
      const descriptionInput = screen.getByLabelText(/description/i);

      await user.type(titleInput, "new task");
      await user.type(descriptionInput, "new description");

      const prioritySelect = screen.getByRole("combobox");

      await user.click(prioritySelect);

      await user.click(screen.getByRole("option", { name: /high/i }));

      await user.click(screen.getByRole("button", { name: /add task/i }));

      expect(titleInput).toHaveValue("");
      expect(descriptionInput).toHaveValue("");
      expect(screen.getByRole("combobox")).toHaveTextContent(/low/i);
   });

   it("should call updateTask when editing task", async () => {
      const user = userEvent.setup();

      const updateTask = vi.fn();

      vi.mocked(useGlobalContext).mockReturnValue({
         addTask: vi.fn(),
         updateTask,
         activeProject: mockProject,
      } as any);

      const taskToEdit = {
         id: "1",
         title: "Existing task",
         description: "Existing description",
         completed: false,
         priority: "high" as const,
         projectId: "nr 1",
      };

      renderTaskForm({ taskToEdit });

      await user.clear(screen.getByLabelText(/task title/i));

      await user.type(screen.getByLabelText(/task title/i), "Updated title");

      await user.click(
         screen.getByRole("button", {
            name: /save changes/i,
         }),
      );

      expect(updateTask).toHaveBeenCalled();
   });

   it("should prefill form when editing task", () => {
      const taskToEdit = {
         id: "1",
         title: "Existing task",
         description: "Existing description",
         completed: false,
         priority: "high" as const,
         projectId: "nr 1",
      };

      renderTaskForm({ taskToEdit });

      expect(screen.getByLabelText(/task title/i)).toHaveValue("Existing task");

      expect(screen.getByLabelText(/description/i)).toHaveValue(
         "Existing description",
      );

      expect(screen.getByRole("combobox")).toHaveTextContent(/high/i);
   });
});
