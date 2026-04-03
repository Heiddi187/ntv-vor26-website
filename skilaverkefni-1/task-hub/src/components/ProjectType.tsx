import type { TaskType } from "./TaskType"

export type ProjectType = {
    id: number
    title: string
    category: string
    description?: string
    tasks: TaskType[]
}