import type { ProjectType } from "./ProjectType";
import Project from "./Project";

type ProjectListProps = {
    projects: ProjectType[]
    deleteProject: (id: number) => void
}

const ProjectsList = ({ projects, deleteProject }: ProjectListProps) => {
    if (projects.length === 0) {
        return (
            <p className="text-center text-gray-500">
                No Projects
            </p>
        )
    }

    return (
        <div className="space-y-4">
            {projects.map((project) => (
                <Project
                    key={project.id}
                    project={project}
                    deleteProject={deleteProject}
                >
                    
                </Project>
            ))}
        </div>
    )
}

export default ProjectsList;