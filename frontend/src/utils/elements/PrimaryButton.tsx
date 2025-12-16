import React from "react";


interface PrimaryButtonProps {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  fullWidth?: boolean;
}


const PrimaryButton: React.FC<PrimaryButtonProps> = ({ label, icon, onClick, fullWidth = false }) => {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2 px-4 py-2 text-nowrap
        bg-(--accent-color) text-black font-medium
        rounded-lg shadow hover:opacity-90 transition cursor-pointer
        ${fullWidth ? "w-full justify-center" : ""}
      `}
    >
      {icon && <span className="w-5 h-5">{icon}</span>}
      {label}
    </button>
  );
};

export default PrimaryButton;
