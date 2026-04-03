export type TaskType = {
    id: number
    title: string
    priority: "low" | "medium" | "high"
    description?: string
    assignTo?: string
    completed: boolean
}