import type { Meta, StoryObj } from "@storybook/react-vite";
import { GlobalProvider } from "@/shared/context/GlobalContext";

import Tasks from "./Tasks";

const meta = {
   title: "Feature/project/tasks/components/Tasks",
   component: Tasks,

   decorators: [
      (Story) => (
         <GlobalProvider>
            <Story />
         </GlobalProvider>
      ),
   ],
} satisfies Meta<typeof Tasks>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithProject: Story = {
   parameters: {
      docs: {
         description: {
            story: "Tasks component with project data loaded from localStorage.",
         },
      },
   },
};