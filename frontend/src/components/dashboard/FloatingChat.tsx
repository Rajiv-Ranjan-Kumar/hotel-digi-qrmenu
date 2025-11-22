// src/components/FloatingChat.tsx
import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { motion } from "framer-motion";

export default function FloatingChat() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<{ id: string; from: "user" | "agent"; text: string }[]>([
        { id: "m1", from: "agent", text: "Hello! How can I help?" },
    ]);
    const [text, setText] = useState("");
    function send() {
        if (!text.trim()) return;
        const id = `m${Date.now()}`;
        setMessages(prev => [...prev, { id, from: "user", text }]);
        setText("");
        setTimeout(() => setMessages(prev => [...prev, { id: `r${Date.now()}`, from: "agent", text: "Thanks, we'll check and get back." }]), 800);
    }
    return (
        <>
            <button onClick={() => setOpen(true)} className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform" style={{ background: "var(--accent-color)", color: "var(--primary-text-color)" }}>
                <MessageCircle size={20} />
            </button>
            {open && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.18 }} className="fixed bottom-20 right-6 z-50 w-80 bg-[var(--secondary-bg-color)] rounded-2xl shadow-lg flex flex-col overflow-hidden">
                    <div className="flex items-center justify-between p-3 border-b border-[rgba(255,255,255,0.03)]">
                        <div className="font-medium">Support</div>
                        <div className="flex items-center gap-2">
                            <button onClick={() => setOpen(false)} className="p-2 rounded-md hover:bg-[var(--accent-color)]/10"><X size={16} /></button>
                        </div>
                    </div>
                    <div className="p-3 flex-1 overflow-auto space-y-2">
                        {messages.map(m => (
                            <div key={m.id} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                                <div className={`max-w-[80%] p-2 rounded-lg ${m.from === "user" ? "bg-[var(--accent-color)] text-[var(--primary-text-color)]" : "bg-[rgba(255,255,255,0.02)]"}`}>
                                    {m.text}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-3 border-t border-[rgba(255,255,255,0.03)] flex gap-2">
                        <input value={text} onChange={e => setText(e.target.value)} className="flex-1 bg-[var(--primary-bg-color)] border-none p-2 rounded-lg focus:ring-[var(--accent-color)]" placeholder="Type a message..." />
                        <button onClick={send} className="px-3 py-2 rounded-lg bg-[var(--accent-color)] text-[var(--primary-text-color)]">Send</button>
                    </div>
                </motion.div>
            )}
        </>
    );
}
