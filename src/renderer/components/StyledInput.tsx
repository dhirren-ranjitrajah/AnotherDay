interface Props {
  value?: string | number;
  label?: string;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
}

export default function StyledInput({
  value,
  label,
  error,
  onChange,
  autoFocus = false,
}: Props) {
  return (
    <div className="flex flex-col w-full gap-1 rounded-md p-2 bg-background outline outline-background-raised transition-colors focus-within:outline-primary duration-200 ">
      <label className={`h-4 leading-4 text-text/60 text-xs`}>
        {value !== undefined && value !== "" ? label : ""}
      </label>

      <input
        placeholder={label}
        value={value}
        onChange={onChange}
        onFocus={(e) => e.target.select()}
        className="min-w-0 bg-background text-text text-lg px-4 rounded-sm outline-none"
        autoFocus={autoFocus}
      />

      <label className={`h-4 leading-4 text-error/80 text-xs text-center`}>
        {error}
      </label>
    </div>
  );
}
