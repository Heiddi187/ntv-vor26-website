import { useState } from "react";
import type { ProjectType } from "./ProjectType";

type FormDataType = {
    title: string
    category: string
    description?: string
    tasks: Tasks[]
}

type ProjectFormProps = {
    projects: ProjectType[];
    setProjects: React.Dispatch<React.SetStateAction<ProjectType[]>>
}

const ProjectForm = ({ projects, setProjects }: ProjectFormProps) => {
    const [formData, setFormData] = useState<FormDataType>({
        title: "",
        category: "",
        description?: "",
        tasks: Tasks[]
    })

    const [isFormVisible, setIsFormVisible] = useState(true);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        setFormData({
            ...formData,
            [e.target.title]: e.target.value
        });
    };

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData.title) return;
        const newProject = { ...formData };
        setProjects((projects) => [newProject, ...projects]);
        setFormData({
            title: "",
            category: "",
            description: "",
            tasks: Tasks[]
        })
    }

    return ( 
        console.log('hello')
     );
}
 
export default ProjectForm;