import { useState, type ChangeEvent } from "react";
import { EyeIcon, EyeSlashIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";




interface InputFieldProps {
    label?: string;
    type?: string;
    name: string;
    value: string;
    placeholder?: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    Icon?: React.ElementType;
    error?: string;
    passwordToggle?: boolean;
}




export default function InputField({ label, type = "text", name, value, placeholder, onChange, Icon, error, passwordToggle = false }: InputFieldProps) {
    const [showPassword, setShowPassword] = useState(false);


    return (
        <div className="flex flex-col gap-1">
            {label && (
                <label htmlFor={name} className="text-(--primary-text-color) text-sm font-medium">
                    {label}
                </label>
            )}

            <div className="relative w-full">
                {/* Left Icon */}
                {Icon && (<Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-(--secondary-text-color)" />)}

                <input
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    type={passwordToggle ? (showPassword ? "text" : "password") : type}
                    placeholder={placeholder}
                    className={`w-full ps-10 pe-10 py-3 rounded-lg bg-(--primary-bg-color)/40 text-(--primary-text-color) placeholder:text-(--secondary-text-color) border transition ${error ? "border-red-500" : "border-(--border-color)"} focus:outline-none focus:border-(--accent-color)`}
                />

                {/* Password Toggle Button (optional) */}
                {passwordToggle && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                        {showPassword ? (
                            <EyeSlashIcon className="h-5 w-5 text-(--secondary-text-color) hover:text-(--primary-text-color) transition cursor-pointer" />
                        ) : (
                            <EyeIcon className="h-5 w-5 text-(--secondary-text-color) hover:text-(--primary-text-color) transition cursor-pointer" />
                        )}
                    </button>
                )}
            </div>

            {error && (
                <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="w-[97%] relative self-center flex items-center gap-1 -mt-1 p-1 rounded-b-xl bg-(--button-danger)/20 text-(--button-danger) text-xs"
                >
                    <ExclamationCircleIcon className="absolute top-0.5 left-1 h-5 w-5 opacity-90" />
                    <span className="opacity-90 capitalize ml-6">{error}</span>
                </motion.div>
            )}


        </div>
    );
}
