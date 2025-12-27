import React from "react";

interface Option {
  label: string;
  value: string;
}

interface CheckboxGroupProps {
  label?: string;
  name: string;
  options: Option[];
  value: string[];
  onChange: (name: string, value: string[]) => void;
  error?: string;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  label,
  name,
  options,
  value,
  onChange,
  error,
}) => {
  const toggle = (val: string) => {
    const newValue = value.includes(val)
      ? value.filter((v) => v !== val)
      : [...value, val];

    onChange(name, newValue);
  };

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium">{label}</label>}

      <div className="grid grid-cols-2 gap-2 border rounded-md px-3 py-2">
        {options.map((opt) => (
          <label
            key={opt.value}
            className="flex items-center gap-2 text-sm cursor-pointer"
          >
            <input
              type="checkbox"
              checked={value.includes(opt.value)}
              onChange={() => toggle(opt.value)}
            />
            {opt.label}
          </label>
        ))}
      </div>

      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default CheckboxGroup;
