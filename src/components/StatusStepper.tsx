import React from "react";

type StatusStepperProps = {
  status: "IN_ASSIGNING" | "IN_DELIVERY" | "COMPLETED";
};

const StatusStepper: React.FC<StatusStepperProps> = ({ status }) => {
  const steps = [
    { key: "IN_ASSIGNING", label: "Đang tìm tài xế" },
    { key: "IN_DELIVERY", label: "Đang giao hàng" },
    { key: "COMPLETED", label: "Đã giao" },
  ];

  const activeIndex = steps.findIndex((s) => s.key === status);

  return (
    <div className="flex items-center justify-between mt-6 mb-8 px-6 relative">
      {steps.map((step, index) => {
        const isActive = index <= activeIndex;

        return (
          <div
            key={step.key}
            className="flex-1 flex flex-col items-center relative">
            {/* Line nối */}
            {index !== 0 && (
              <div
                className={`absolute top-2 left-0 w-full h-1 -translate-x-1/2 ${
                  isActive ? "bg-green-500" : "bg-gray-600"
                }`}
              />
            )}

            {/* Dot */}
            <div
              className={`z-10 w-4 h-4 rounded-full ${
                isActive ? "bg-green-500" : "bg-gray-500"
              }`}
            />

            {/* Label */}
            <span
              className={`mt-2 text-sm text-center ${
                isActive ? "text-white" : "text-gray-400"
              }`}>
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default StatusStepper;
