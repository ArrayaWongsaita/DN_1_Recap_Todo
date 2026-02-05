import { type InputHTMLAttributes } from "react";

type FieldInputProps = {
  label: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function FieldInput({
  label,
  error,
  ...inputProps
}: FieldInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={inputProps.name}>{label}</label>
      <input
        id={inputProps.name}
        type="text"
        className="border"
        {...inputProps}
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
