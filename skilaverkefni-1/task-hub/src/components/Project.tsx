import { useState } from "react";
import type { ProjectType } from "./ProjectType";
import type { TaskType } from "./TaskType";
import TaskForm from "./TaskForm";

type ProjectProps = {
    project: ProjectType
    deleteProject: (id: number) => void
    setProjects: React.Dispatch<React.SetStateAction<ProjectType[]>>
}

const Project = ({ project, deleteProject, setProjects }: ProjectProps) => {
    const [showTaskForm, setShowTaskForm] = useState(false)

    const addTask = (task: TaskType) => {
        const updatedProject = {
            ...project,
            tasks: [task, ...project.tasks]
        }

        setProjects(prev => 
            prev.map(p => p.id === project.id ? updatedProject : p)
        )
    }


    return (
        <div className="border shadow-lg rounded-lg py-2 px-2">
            <h3 className="text-lg font-bold">
                {project.title}
            </h3>
            <p>
                <strong>Category: </strong> {project.category}
            </p>
            <p>
                <strong>Description: </strong> {project.description}
            </p>
            <button onClick={() => deleteProject(project.id)} className="mt-3 text-red-500">
                Delete Project
            </button>
            {project.tasks.map(task => (
                        <div key={task.id}>{task.title}</div>
                    ))}
            <button onClick={() => setShowTaskForm(prev => !prev)}>
                Add Task
            </button>
            {showTaskForm && (
                <TaskForm addTask={addTask}/>
            )}
        </div>
    )
}

export default Project