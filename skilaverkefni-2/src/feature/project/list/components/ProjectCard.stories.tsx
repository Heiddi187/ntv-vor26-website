import type { Meta, StoryObj } from '@storybook/react-vite';

import ProjectCard from './ProjectCard';

const meta = {
  title: "Project/ProjectCard",
  component: ProjectCard,
  tags: ['autodocs']
} satisfies Meta<typeof ProjectCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
   args: {
      project: {
         id: "1",
         name: "Website Redesign",
         description: "Update landing page and dashboard",
         tasksCount: 5,
      },
   },
   
};

export const SingleTask: Story = {
   args: {
      project: {
         id: "2",
         name: "Bug Fixes",
         description: "Fix login bug",
         tasksCount: 1,
      },
   },
};

export const EmptyProject: Story = {
   args: {
      project: {
         id: "3",
         name: "New Project",
         description: "",
         tasksCount: 0,
      },
   },
};