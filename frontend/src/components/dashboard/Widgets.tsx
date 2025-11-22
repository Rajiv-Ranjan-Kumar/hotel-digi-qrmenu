// src/components/Widgets.tsx
import React from "react";
import { Truck, Clock, CheckCircle, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

const data = [
    { id: "w1", label: "Total Orders", value: 1284, icon: Truck, colorVar: "var(--order-color)" },
    { id: "w2", label: "In-Progress", value: 42, icon: Clock, colorVar: "var(--pickup-color)" },
    { id: "w3", label: "Delivered", value: 1200, icon: CheckCircle, colorVar: "var(--delivered-color)" },
    { id: "w4", label: "Feedbacks", value: 312, icon: MessageSquare, colorVar: "var(--feedback-color)" },
];

export default function Widgets() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.map(card => {
                const Icon = card.icon;
                return (
                    <motion.div key={card.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="bg-[var(--secondary-bg-color)] p-4 rounded-2xl shadow flex items-center justify-between">
                        <div>
                            <div className="text-2xl font-semibold">{card.value}</div>
                            <div className="text-sm text-[var(--secondary-text-color)]">{card.label}</div>
                        </div>
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: "rgba(255,255,255,0.02)" }}>
                            <Icon size={22} style={{ color: card.colorVar }} />
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}
