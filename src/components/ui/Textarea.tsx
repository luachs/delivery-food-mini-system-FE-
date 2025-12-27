import React from "react";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

const Textarea: React.FC<TextareaProps> = ({ label, ...props }) => {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium">{label}</label>}
      <textarea
        {...props}
        className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-gray-300 focus:shadow-xl resize-none transition duration-500"
      />
    </div>
  );
};

export default Textarea;
