import React from "react";

type TextAreaInputProps = {
  label: string
  name: string
  value: string
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>
}

const TextAreaInput = ({ label, name, value, onChange }: TextAreaInputProps) => {
    return ( 
        <div className="mb-4">
                  <label htmlFor={name} className="block font-semibold">
                     {label}
                  </label>
                  <textarea
                     name={name}
                     className="w-full p-2 border rounded-lg"
                     value={value}
                     onChange={onChange}
                  ></textarea>
               </div>
     );
}
 
export default TextAreaInput;