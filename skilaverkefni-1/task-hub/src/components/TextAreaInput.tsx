import React from "react";

type TextAreaInputProps = {
  label: string
  title: string
  value: string
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>
}

const TextAreaInput = ({ label, title, value, onChange }: TextAreaInputProps) => {
    return ( 
        <div className="mb-4">
                  <label htmlFor={title} className="block font-semibold">
                     {label}
                  </label>
                  <textarea
                     title={title}
                     className="w-full p-2 border rounded-lg"
                     value={value}
                     onChange={onChange}
                  ></textarea>
               </div>
     );
}
 
export default TextAreaInput;