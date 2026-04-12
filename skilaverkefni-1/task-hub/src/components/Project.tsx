import type { ProjectType } from "./ProjectType";

type ProjectProps = {
    project: ProjectType
    deleteProject: (id: number) => void
}

const Project = ({ project, deleteProject }: ProjectProps) => {
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
            {project.tasks.map(task => (
                        <div key={task.id}>{task.title}</div>
                    ))}
            <button onClick={() => deleteProject(project.id)} className="mt-3 text-red-500">
                Delete Project
            </button>
        </div>
    )
}

export default Project