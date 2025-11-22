import { Dropdown } from "flowbite-react";
import { motion } from "framer-motion";
import { BuildingStorefrontIcon } from "@heroicons/react/24/solid";



export default function BranchSelectDropdown() {
    const branches = [
        { id: "A", name: "Branch A" },
        { id: "B", name: "Branch B" },
        { id: "C", name: "Branch C" },
    ];

    return (
        <Dropdown
            placement="bottom-end"
            className="
                mt-1 w-52
                bg-(--primary-bg-color)
                border border-(--accent-color)/20
                shadow-xl rounded-b-xl overflow-hidden
            "
            renderTrigger={() => (
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="
                        flex items-center gap-2
                        px-4 py-2 rounded-xl
                        bg-(--primary-bg-color)/40
                        hover:bg-(--accent-color)/20
                        text-(--primary-text-color)
                        shadow-sm cursor-pointer
                    "
                >
                    <BuildingStorefrontIcon className="w-5 h-5 text-(--accent-color)" />
                    <span className="font-medium">Select Branch</span>
                </motion.button>
            )}
        >
            {/* Dropdown Content */}
            <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="py-1"
            >
                <div
                    className="
                        px-4 py-2 
                        text-sm font-semibold
                        text-(--primary-text-color)
                        border-b border-(--accent-color)/20
                    "
                >
                    Choose Branch
                </div>

                <div className="py-4 max-h-56 my-auto overflow-y-auto no-scrollbar
                    [&::-webkit-scrollbar]:w-1
                    [&::-webkit-scrollbar-track]:bg-(--secondary-bg-color)
                    [&::-webkit-scrollbar-thumb]:bg-(--accent-color)
                    [&::-webkit-scrollbar-thumb]:rounded-full
                    scrollbar-thin">
                    {branches.map((branch) => (
                        <button
                            key={branch.id}
                            className="
                            w-full flex items-center gap-3
                            px-4 py-2 text-sm
                            text-(--primary-text-color)
                            hover:bg-(--accent-color)/10
                            transition cursor-pointer
                        "
                            onClick={() => console.log(`Selected: ${branch.name}`)}
                        >
                            <BuildingStorefrontIcon className="w-4 h-4 text-(--accent-color)" />
                            {branch.name}
                        </button>
                    ))}
                </div>
            </motion.div>
        </Dropdown>
    );
}
