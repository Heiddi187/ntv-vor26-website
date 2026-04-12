import { z } from 'zod';

export const TaskSchema = z.object({
    id: z.number(),
    title: z.string(),
    priority: z.enum(["low", "medium", "high"]),
    description: z.string(),
    assignedTo: z.string(),
    completed: z.boolean()
});

export const ProjectSchema = z.object({
    id: z.number(),
    title: z.string(),
    category: z.string(),
    description: z.string(),
    tasks: z.array(TaskSchema)
});

export const ProjectsSchema = z.array(ProjectSchema)