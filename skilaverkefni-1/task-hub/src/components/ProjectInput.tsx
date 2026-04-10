import React from "react";

type ProjectInputProps = {
    label: string
    title: string
    value: string
    onChange: React.ChangeEventHandler<HTMLInputElement>
}

const ProjectInput = ({ label, title, value, onChange }: ProjectInputProps) => {
    return (
        <div className="mb-4">
            <label htmlFor={ title } className="block font-semibold">
                { label }
            </label>
            <input 
                className="w-full p-2 border rounded-lg"
                type="text"
                title={title}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}

export default ProjectInput