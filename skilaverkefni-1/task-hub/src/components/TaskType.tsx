export type TaskType = {
    id: number
    title: string
    priority: "low" | "medium" | "high"
    description?: string
    assignedTo?: string
    completed: boolean
}