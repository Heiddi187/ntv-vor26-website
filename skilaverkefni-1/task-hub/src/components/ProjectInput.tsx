import React from "react";

type ProjectInputProps = {
    label: string
    name: string
    value: string
    onChange: React.ChangeEventHandler<HTMLInputElement>
}

const ProjectInput = ({ label, name, value, onChange }: ProjectInputProps) => {
    return (
        <div className="mb-4">
            <label htmlFor={ name } className="block font-semibold">
                { label }
            </label>
            <input 
                className="w-full p-2 border rounded-lg"
                type="text"
                name={name}
                id={name}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}

export default ProjectInput