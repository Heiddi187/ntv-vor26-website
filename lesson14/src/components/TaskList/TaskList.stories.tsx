import { fn } from "storybook/test";
import type { Meta, StoryObj } from '@storybook/react-vite';

import TaskList from './TaskList';
import * as TaskStories from '../Task/Task.stories'

const meta = {
  component: TaskList,
  title: 'TaskList',
  decorators: [(story) => <div style={{ margin: '3rem' }}>{story()}</div>],
  args: {
    ...TaskStories.ActionsData
  },
  tags: ['autodocs']
} satisfies Meta<typeof TaskList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    "tasks": [
      { ...TaskStories.Default.args.task, id: '1', title: 'Task 1'},
      { ...TaskStories.Default.args.task, id: '2', title: 'Task 2'},
      { ...TaskStories.Default.args.task, id: '3', title: 'Task 3'}
    ],
  },
};

export const WithPinnedTasks: Story = {
  args: {
    "tasks": [
      ...Default.args.tasks.slice(0, 2),
      { id: '3', title: 'Task 3 (pinned)', state: 'TASK_PINNED'}
    ],
  },
};

export const Loading: Story = {
  args: {
    tasks: [],
    loading: true
  }
};

export const Empty: Story = {
  args: {
    ...Loading.args,
    loading: false
  }
};