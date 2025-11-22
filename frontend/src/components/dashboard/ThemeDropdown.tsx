import { Dropdown } from "flowbite-react";
import { motion } from "framer-motion";
import { SunIcon, MoonIcon, ComputerDesktopIcon } from "@heroicons/react/24/solid";







export default function ThemeDropdown() {
    const themes = [
        { id: "light", label: "Light Mode", icon: <SunIcon className="w-4 h-4" /> },
        { id: "dark", label: "Dark Mode", icon: <MoonIcon className="w-4 h-4" /> },
        { id: "system", label: "System Default", icon: <ComputerDesktopIcon className="w-4 h-4" /> },
    ];

    return (
        <Dropdown
            placement="bottom-end"
            className="
                mt-1.5 w-48
                bg-(--primary-bg-color)
                border border-(--accent-color)/20
                shadow-xl rounded-b-xl overflow-hidden
            "
            renderTrigger={() => (
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="
                        p-2 rounded-xl 
                        bg-(--primary-bg-color)/40 
                        hover:bg-(--accent-color)/20
                        shadow cursor-pointer
                    "
                >
                    <SunIcon className="w-5 h-5 text-(--primary-text-color)" />
                </motion.button>
            )}
        >
            <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="py-1"
            >
                <div
                    className="
                        px-4 py-2 mb-1
                        text-sm font-semibold
                        text-(--primary-text-color)
                        border-b border-(--accent-color)/20
                    "
                >
                    Theme Mode
                </div>

                {themes.map((t) => (
                    <button
                        key={t.id}
                        className="
                            w-full flex items-center gap-3
                            px-4 py-2 text-sm
                            text-(--primary-text-color)
                            hover:bg-(--accent-color)/10
                            transition cursor-pointer
                        "
                        onClick={() => console.log(`Theme changed to: ${t.id}`)}
                    >
                        <span className="text-(--accent-color)">{t.icon}</span>
                        {t.label}
                    </button>
                ))}
            </motion.div>
        </Dropdown>
    );
}
