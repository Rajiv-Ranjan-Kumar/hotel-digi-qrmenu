import { BellIcon } from "@heroicons/react/24/solid";
import { Dropdown } from "flowbite-react";
import { motion } from "framer-motion";

export default function NotificationDropdown() {

    const notifications = [
        { id: 1, text: "New order received from Table 5", unread: true },
        { id: 2, text: "Your staff shift report is ready", unread: false },
        { id: 3, text: "Inventory low: Tomatoes", unread: false },
        { id: 4, text: "New reservation booked", unread: true },
        { id: 5, text: "Monthly sales report is available", unread: false },
        { id: 6, text: "New message from supplier", unread: false },
        { id: 7, text: "System maintenance scheduled", unread: false },
        { id: 8, text: "New review submitted by a customer", unread: true },
        { id: 9, text: "Staff meeting at 3 PM today", unread: false },
        { id: 10, text: "New menu item added: Vegan Burger", unread: false },
    ];

    return (
        <Dropdown
            placement="bottom-end"
            className="
                mt-1.5 w-64 max-h-80
                bg-(--primary-bg-color)
                border border-(--accent-color)/20
                shadow-xl rounded-b-xl overflow-hidden
            "
            renderTrigger={() => (
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="
                        relative p-2 rounded-xl
                        bg-(--primary-bg-color)/40 
                        hover:bg-(--accent-color)/20
                        shadow
                        cursor-pointer
                    "
                >
                    <BellIcon className="w-5 h-5 text-(--primary-text-color)" />

                    <span
                        className="
                            absolute top-1 right-1 
                            w-2.5 h-2.5 rounded-full 
                            bg-green-500
                        "
                    />
                </motion.button>
            )}
        >
            <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="max-h-60"
            >
                <div
                    className="
                        px-4 py-2 
                        text-sm font-semibold
                        text-(--primary-text-color)
                        border-b border-(--accent-color)/20
                    "
                >
                    Notifications
                </div>

                <div className="
                    py-4 max-h-56 my-auto overflow-y-auto no-scrollbar
                    [&::-webkit-scrollbar]:w-1
                    [&::-webkit-scrollbar-track]:bg-(--secondary-bg-color)
                    [&::-webkit-scrollbar-thumb]:bg-(--accent-color)
                    [&::-webkit-scrollbar-thumb]:rounded-full
                    scrollbar-thin
                ">
                    {notifications.map((item) => (
                        <button
                            key={item.id}
                            className="
                                w-full text-left px-4 py-2 
                                text-sm text-(--primary-text-color)
                                hover:bg-(--accent-color)/10 
                                transition flex items-start gap-2
                            "
                        >
                            <span
                                className={`
                                    w-2 h-2 mt-1 rounded-full
                                    ${item.unread ? "bg-(--accent-color)" : "bg-gray-500"}
                                `}
                            />

                            <span>{item.text}</span>
                        </button>
                    ))}
                </div>

            </motion.div>
        </Dropdown>
    );
}
