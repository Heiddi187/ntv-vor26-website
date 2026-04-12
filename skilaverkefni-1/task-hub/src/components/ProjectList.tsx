// import type { ProjectType } from "./ProjectType";
import Project from "./Project";
import { useProjectStore } from "../store/useProjectStore";

// type ProjectListProps = {
//     projects: ProjectType[]
//     deleteProject: (id: number) => void
//     // setProjects: React.Dispatch<React.SetStateAction<ProjectType[]>>
// }

const ProjectList = () => {
    const projects = useProjectStore((state) => state.projects)
    const deleteProject = useProjectStore((state) => state.deleteProject)

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
                    //setProjects={setProjects}
                />
            ))}
        </div>
    )
}

export default ProjectList;