import type { Meta, StoryObj } from "@storybook/react-vite";

import ProjectList from "./ProjectList";
import { GlobalProvider } from "@/shared/context/GlobalContext";

const meta = {
   title: "Project/ProjectList",
   component: ProjectList,
   tags: ['autodocs'],
   decorators: [
      (Story) => (
         <GlobalProvider>
            <Story />
         </GlobalProvider>
      ),
   ],
} satisfies Meta<typeof ProjectList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};