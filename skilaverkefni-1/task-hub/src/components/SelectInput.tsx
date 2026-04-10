import React from "react";

type Option = {
    value: string
    label: string
}

type SelectInputProps = {
  label: string
  title: string
  value: string
  onChange: React.ChangeEventHandler<HTMLSelectElement>
  options: Option[]
}
const SelectInput = ({ label, title, value, onChange, options }: SelectInputProps) => {
    return ( 
        <div className="mb-4">
                  <label htmlFor={title} className="block font-semibold">
                     {label}
                  </label>
                  <select
                     title={title}
                     className="w-full p-2 border rounded-lg"
                     value={value}
                     onChange={onChange}
                  >
                     {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                     ))}
                  </select>
               </div>
     );
}
 
export default SelectInput;