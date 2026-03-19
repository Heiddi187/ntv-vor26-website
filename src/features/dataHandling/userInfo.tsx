import { Input } from "@/components/ui/input";
import type { FormValuesType } from "../types/types";

type Props = {
  defaultValues: FormValuesType;
  onInputChange: (key: keyof FormValuesType, value: string) => void;
};

export function PersonalInfoFields({ defaultValues, onInputChange }: Props) {
  return (
    <div className="flex gap-4">
      <Input
        placeholder="First name"
        defaultValue={defaultValues.firstName}
        onChange={(e) => onInputChange("firstName", e.target.value)}
      />

      <Input
        placeholder="Last name"
        onChange={(e) => onInputChange("lastName", e.target.value)}
      />
    </div>
  );
}