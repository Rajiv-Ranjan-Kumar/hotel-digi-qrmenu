import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useRef } from "react";



interface SidebarItem {
    to: string;
    title: string;
    icon: React.ElementType;
}

interface Props {
    collapsed: boolean;
    onToggle: () => void;
    items: SidebarItem[];
}





export default function Sidebar({ collapsed, onToggle, items }: Props) {
    const loc = useLocation();
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);



    return (
        <motion.aside
            initial={false}
            animate={{ width: collapsed ? 70 : 250 }}
            transition={{ duration: 0.35 }}
            className="
                fixed top-0 left-0 h-screen z-50
                bg-(--secondary-bg-color)/60 backdrop-blur-2xl
                border-r border-(--accent-color)/20
                shadow-[0_0_8px_rgba(0,0,0,0.18)]
                flex flex-col overflow-hidden gap-4
            "
        >
            {/* HEADER */}
            <div className="flex items-center justify-between px-4 py-2">
                {!collapsed && (
                    <motion.h1
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xl font-bold text-(--primary-text-color)"
                    >
                        Digi Menu
                    </motion.h1>
                )}

                <button
                    onClick={onToggle}
                    className="p-2 rounded-xl hover:bg-(--accent-color)/20 transition"
                >
                    <svg width="24" height="24" className="text-(--primary-text-color)">
                        <path d="M4 6h16M4 12h10M4 18h16" stroke="currentColor" strokeWidth="2" />
                    </svg>
                </button>
            </div>

            {/* SCROLL AREA */}
            <div
                className="
                    flex-1 overflow-y-auto overflow-x-hidden px-2 py-4
                    [&::-webkit-scrollbar]:hidden
                    [-ms-overflow-style:none]
                    [scrollbar-width:none]
                "
            >
                <nav className="space-y-2">
                    {items.map((it, i) => {
                        const active = loc.pathname.startsWith(it.to);

                        return (
                            <motion.div
                                key={it.to}
                                ref={(el) => { itemRefs.current[i] = el; }}
                                whileHover={{ scale: 1.03, x: 4 }}
                                transition={{ duration: 0.15 }}
                                className="relative"
                            >
                                {/* Active highlight */}
                                {active && (
                                    <motion.div
                                        layoutId="activeGlow"
                                        className="
                                            absolute inset-0 rounded-xl
                                            bg-(--accent-color)/10 
                                            border border-(--accent-color)/20
                                            shadow-[0_0_6px_var(--accent-color)]
                                        "
                                    />
                                )}

                                {/* Link */}
                                <Link
                                    to={it.to}
                                    onClick={() => {
                                        itemRefs.current[i]?.scrollIntoView({
                                            behavior: "smooth",
                                            block: "center",
                                        });
                                    }}
                                    className={`
                                        relative z-10 flex items-center gap-4
                                        p-3 rounded-xl transition-all
                                        ${active
                                            ? "text-(--primary-text-color) font-semibold"
                                            : "text-(--secondary-text-color) hover:text-(--primary-text-color)"
                                        }
                                    `}
                                >
                                    <it.icon width={24} height={24} />

                                    {!collapsed && (
                                        <motion.span
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="text-[15px]"
                                        >
                                            {it.title}
                                        </motion.span>
                                    )}
                                </Link>
                            </motion.div>
                        );
                    })}
                </nav>
            </div>

            {/* FOOTER */}
            <div className="p-4 py-2 border-t border-(--accent-color)/20">
                <Link
                    to="/profile"
                    className={`flex items-center gap-4 p-3 rounded-xl hover:bg-(--accent-color)/10 transition 
                        ${collapsed ? "justify-center" : ""}`}
                >
                    <div className="w-12 h-12 p-5 bg-(--primary-bg-color) text-(--accent-color) flex items-center justify-center rounded-xl font-bold">
                        A
                    </div>

                    {!collapsed && (
                        <div className="flex flex-col">
                            <span className="text-(--primary-text-color) font-semibold">Manager</span>
                            <span className="text-(--secondary-text-color) text-xs">Hotel XYZ</span>
                        </div>
                    )}
                </Link>
            </div>
        </motion.aside>
    );
}
