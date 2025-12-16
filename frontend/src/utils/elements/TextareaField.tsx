import { type ChangeEvent } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";



interface TextareaFieldProps {
    label?: string;
    name: string;
    value: string;
    placeholder?: string;
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    Icon?: React.ElementType;
    error?: string;
    rows?: number;
}




export default function TextareaField({ label, name, value, placeholder, onChange, Icon, error, rows = 4 }: TextareaFieldProps) {
    return (
        <div className="flex flex-col gap-1">
            {label && (
                <label htmlFor={name} className="text-(--primary-text-color) text-sm font-medium">
                    {label}
                </label>
            )}

            <div className="relative w-full">
                {/* Left Icon */}
                {Icon && (
                    <Icon className="absolute left-3 top-4 h-5 w-5 text-(--secondary-text-color)" />
                )}

                <textarea
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    rows={rows}
                    className={`w-full ps-10 pe-4 py-3 rounded-lg bg-(--primary-bg-color)/40 text-(--primary-text-color) placeholder:text-(--secondary-text-color) border transition resize-none ${
                        error ? "border-red-500" : "border-(--border-color)"
                    } focus:outline-none focus:border-(--accent-color)`}
                />
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
