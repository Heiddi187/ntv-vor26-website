import type { Meta, StoryObj } from "@storybook/react-vite";
import { GlobalProvider } from "@/shared/context/GlobalContext";

import { ProjectTasksChart } from "./Chart";

const meta = {
   title: "Project/Chart",
   component: ProjectTasksChart,
   tags: ['autodocs'],
   decorators: [
      (Story) => (
         <GlobalProvider>
            <Story />
         </GlobalProvider>
      ),
   ],
} satisfies Meta<typeof ProjectTasksChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};