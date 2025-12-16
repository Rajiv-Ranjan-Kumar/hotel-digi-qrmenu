// Alert.tsx
import { createPortal } from "react-dom";
import { XMarkIcon, CheckCircleIcon, ExclamationTriangleIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { useState, useEffect, type JSX } from "react";
import type { AlertItem, AlertType } from "./alertTypes";
import { motion, AnimatePresence } from "framer-motion";


interface Props {
    alerts: AlertItem[];
    autoClose?: boolean;
    duration?: number;
}




const icons: Record<AlertType, JSX.Element> = {
    success: <CheckCircleIcon className="w-6 h-6 text-green-600" />,
    warning: <ExclamationTriangleIcon className="w-6 h-6 text-yellow-600" />,
    danger: <ExclamationCircleIcon className="w-6 h-6 text-red-600" />,
};





export const Alert = ({ alerts, autoClose = true, duration = 3000 }: Props) => {
    const [visibleAlerts, setVisibleAlerts] = useState<AlertItem[]>(alerts);

    useEffect(() => {
        setVisibleAlerts(alerts);
    }, [alerts]);

    useEffect(() => {
        if (!autoClose) return;
        const timers = visibleAlerts.map(a =>
            setTimeout(() => {
                setVisibleAlerts(prev => prev.filter(alert => alert.id !== a.id));
            }, duration)
        );
        return () => timers.forEach(t => clearTimeout(t));
    }, [visibleAlerts, autoClose, duration]);

    const handleClose = (id: number) => {
        setVisibleAlerts(prev => prev.filter(a => a.id !== id));
    };

    return createPortal(
        <div className="fixed top-15 right-5 flex flex-col gap-3 z-50 max-w-xs sm:max-w-sm w-full">
            <AnimatePresence>
                {visibleAlerts.map(a => (
                    <motion.div
                        key={a.id}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className={`flex items-center gap-3 p-4 rounded shadow-lg border-l-4 
                            ${a.type === "success" ? "bg-green-50 border-green-500" : ""}
                            ${a.type === "warning" ? "bg-yellow-50 border-yellow-500" : ""}
                            ${a.type === "danger" ? "bg-red-50 border-red-500" : ""}
                        `}
                    >
                        {/* Icon */}
                        <div className="shrink-0">{icons[a.type]}</div>

                        {/* Message */}
                        <div className="flex-1 text-sm text-gray-700">{a.message}</div>

                        {/* Close Button */}
                        <button
                            className="shrink-0 text-gray-400 hover:text-gray-700"
                            onClick={() => handleClose(a.id)}
                        >
                            <XMarkIcon className="w-5 h-5" />
                        </button>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>,
        document.body
    );
};