import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import TaskForm from "./TaskForm";
import { Dialog, DialogContent } from "@/shared/components/ui/dialog";

const meta = {
   title: "Tasks/TaskForm",
   component: TaskForm,
   parameters: {
      layout: "centered",
   },
   decorators: [
      (Story) => (
         <Dialog open>
            <DialogContent className="sm:max-w-md">
               <Story />
            </DialogContent>
         </Dialog>
      ),
   ],
   tags: ['autodocs'],
} satisfies Meta<typeof TaskForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CreateTask: Story = {
   args: {
      onClose: fn(),
      taskToEdit: null,
   },
};

export const EditTask: Story = {
   args: {
      onClose: fn(),
      taskToEdit: {
         id: "1",
         title: "Fix login page",
         description: "Resolve authentication bug",
         completed: false,
         priority: "high",
         projectId: "project-1",
      },
   },
};