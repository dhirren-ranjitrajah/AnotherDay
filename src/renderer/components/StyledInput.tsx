interface Props {
  label?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
}

export default function StyledInput({
  label,
  value,
  onChange,
  autoFocus = false,
}: Props) {
  return (
    <div className="flex flex-col gap-4 rounded-md p-2 bg-background outline outline-background-raised transition-colors focus-within:outline-primary duration-200 ">
      {value !== undefined && value !== "" && (
        <p className="absolute text-text/60 text-xs">{label}</p>
      )}
      <input
        placeholder={label}
        value={value}
        onChange={onChange}
        className="bg-background text-text text-lg p-4 rounded-sm outline-none min-w-0"
        autoFocus={autoFocus}
      />
    </div>
  );
}
