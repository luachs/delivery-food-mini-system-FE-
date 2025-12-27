import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, ...props }) => {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium">{label}</label>}
      <input
        {...props}
        className={`border rounded-md px-3 py-2 text-sm outline-none transition duration-500
          ${
            error
              ? "border-red-500"
              : "border-gray-300 focus:border-gray-300 focus:shadow-xl"
          }
        `}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default Input;
