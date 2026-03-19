import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

type InputFieldProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    value?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function InputField({ value, ...props }: InputFieldProps) {
    return (
        <Field>
            <Input
                className='bg-white'
                id='firstName'
                autoComplete='off'
                value={value}
                onChange={(e) => {
                    props.onChange(e);
                }}
            />
        </Field>
    )
}