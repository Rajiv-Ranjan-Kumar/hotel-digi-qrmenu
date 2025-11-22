import { Bars3Icon, BuildingOffice2Icon, ChatBubbleLeftRightIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import { Dropdown } from "flowbite-react";
import { motion } from "framer-motion";
import NotificationDropdown from "./NotificationsDropdown";
import ThemeDropdown from "./ThemeDropdown";
import BranchSelectDropdown from "./BranchSelectDropdown";





export default function Header() {
    return (
        <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="
                top-0 z-40 
                backdrop-blur-2xl
                bg-(--secondary-bg-color)/70
                border-b border-(--accent-color)/20
                shadow-[0_4px_12px_rgba(0,0,0,0.15)]
                relative
            "
        >
            {/* Accent Line */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="
                    absolute top-0 left-0 w-full h-0.5
                    bg-linear-to-r 
                    from-(--accent-color)
                    via-transparent
                    to-(--accent-color)
                    opacity-60
                "
            />

            <div className="px-6 py-3 flex items-center justify-between">

                {/* LEFT SECTION */}
                <div className="flex items-center gap-5">

                    {/* TOGGLE BUTTON */}
                    {/* <div
                        onClick={onToggle}
                        className="
                            flex items-center justify-center
                            w-12 h-12 rounded-xl 
                            bg-(--primary-bg-color)/40
                            hover:bg-(--accent-color)/20
                            cursor-pointer shadow-md
                            transition
                        "
                    >
                        <img 
                            src="/hotel-logo.png" 
                            alt="Hotel Logo" 
                            className="w-8 h-8 object-contain"
                        />
                    </div> */}
                    <div className="p-1 bg-(--primary-bg-color) rounded-md">
                        <BuildingOffice2Icon className="w-7 h-7 text-(--accent-color)" />
                    </div>


                    {/* TITLE */}
                    <motion.h1
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="
                            text-xl font-semibold tracking-wide
                            text-(--primary-text-color)
                        "
                    >
                        Royal Orchid Hotel
                    </motion.h1>


                    {/* PROFESSIONAL BRANCH DROPDOWN */}
                    <BranchSelectDropdown />

                </div>

                {/* RIGHT SECTION */}
                <div className="flex items-center gap-4">

                    {/* ADD ORDER ICON */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="
                            p-2 rounded-xl 
                            bg-(--primary-bg-color)/40 
                            hover:bg-(--accent-color)/20 
                            shadow cursor-pointer transition
                        "
                    >
                        <PlusCircleIcon className="w-6 h-6 text-(--accent-color)" />
                    </motion.button>

                    {/* NOTIFICATION ICON */}
                    <NotificationDropdown />

                    {/* MESSAGE ICON */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="
                            p-2 rounded-xl 
                            bg-(--primary-bg-color)/40 
                            hover:bg-(--accent-color)/20 
                            shadow cursor-pointer transition
                        "
                    >
                        <ChatBubbleLeftRightIcon className="w-5 h-5 text-(--primary-text-color)" />
                    </motion.button>

                    {/* THEME TOGGLER */}
                    <ThemeDropdown />

                    {/* USER AVATAR DROPDOWN */}
                    <Dropdown
                        placement="bottom-end"
                        className="mt-1 shadow-lg rounded-b-xl bg-(--primary-bg-color) border border-(--accent-color)/20"
                        renderTrigger={() => (
                            <div className="relative flex items-center cursor-pointer">

                                {/* USER INITIAL BADGE */}
                                <div
                                    className="
                                    w-10 h-10 rounded-xl 
                                    bg-(--primary-bg-color) 
                                    text-(--accent-color)
                                    flex items-center justify-center
                                    text-lg font-bold
                                    border border-(--accent-color)/30
                                    shadow-sm
                                "
                                >
                                    A
                                </div>

                                {/* Online Dot */}
                                <span
                                    className="
                                        absolute bottom-0 right-0 
                                        w-3 h-3 rounded-full
                                        bg-green-500
                                        border-2 border-(--secondary-bg-color)
                                    "
                                />
                            </div>
                        )}
                    >
                        {/* Motion content */}
                        <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="py-1"
                        >
                            <button className="block w-full px-4 py-2 text-sm text-(--primary-text-color) hover:bg-(--accent-color)/10 cursor-pointer">
                                Profile
                            </button>

                            <button className="block w-full px-4 py-2 text-sm text-(--primary-text-color) hover:bg-(--accent-color)/10 cursor-pointer">
                                Logout
                            </button>
                        </motion.div>
                    </Dropdown>
                </div>
            </div>
        </motion.header>
    );
}
