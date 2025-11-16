// import { Button } from "flowbite-react";
// import { useContext } from "react";
// import { ThemeContext } from "../../contexts/ThemeContext";
// import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
// import { motion } from "framer-motion";



// export const ThemeSwitcher = () => {
//     const { theme, toggleTheme } = useContext(ThemeContext);

//     return (
//         <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.4 }}
//             className="flex items-center space-x-2"
//         >
//             <Button
//                 onClick={toggleTheme}
//                 size="sm"
//                 pill
//                 className="flex items-center gap-2 transition-all duration-300 hover:scale-105"
//             >
//                 <motion.div
//                     key={theme}
//                     initial={{ rotate: -90, opacity: 0 }}
//                     animate={{ rotate: 0, opacity: 1 }}
//                     exit={{ rotate: 90, opacity: 0 }}
//                     transition={{ duration: 0.3 }}
//                 >
//                     {theme === "light" ? (
//                         <MoonIcon className="w-5 h-5 text-gray-500" />
//                     ) : (
//                         <SunIcon className="w-5 h-5 text-yellow-400" />
//                     )}
//                 </motion.div>
//             </Button>
//         </motion.div>
//     );
// };






import { Button } from "flowbite-react";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

export const ThemeSwitcher = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
        >
            <Button
                pill
                size="sm"
                onClick={toggleTheme}
                className="
                    relative w-12 h-7 p-0
                    bg-white/30 dark:bg-black/30
                    backdrop-blur-md
                    border border-white/20 dark:border-black/20
                    shadow-lg
                    transition-all duration-300
                "
            >
                {/* Sliding Circle */}
                <motion.div
                    key={theme}
                    initial={{ x: theme === "light" ? 0 : 24 }}
                    animate={{ x: theme === "light" ? 0 : 24 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                    className="
                        absolute left-0 w-6 h-6 rounded-full
                        flex items-center justify-center
                        bg-(--primary-bg-color)
                        shadow-md
                    "
                >
                    <motion.div
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        transition={{ duration: 0.25 }}
                    >
                        {theme === "light" ? (
                            <MoonIcon className="w-4 h-4 text-gray-500" />
                        ) : (
                            <SunIcon className="w-4 h-4 text-yellow-400" />
                        )}
                    </motion.div>
                </motion.div>
            </Button>
        </motion.div>
    );
};
