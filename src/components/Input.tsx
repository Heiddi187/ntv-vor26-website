import { Input as ShadInput } from '@/components/ui/input';

export const Input = ShadInput;

type Props = {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: 'text' | 'email';
}

export const OldInput = ({
    value,
    onChange,
    type = 'text'
}: Props) => {
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        onChange(e); //e.target.value
    }
    return (
        <ShadInput
            type={type}
            value={value}
            onChange={(e) => handleChange(e)}
        />
    );
}

{/* 
export function Input({ value, onChange }: { value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
    }
}
*/}