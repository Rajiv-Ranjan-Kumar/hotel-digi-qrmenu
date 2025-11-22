import { motion } from "framer-motion";
import {
    XMarkIcon,
    PencilSquareIcon,
} from "@heroicons/react/24/solid";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    orderId?: string;
}

export default function OrderDetailsSidebar({ isOpen, onClose, orderId }: Props) {
    return (
        <motion.div
            initial={{ x: "100%" }}
            animate={{ x: isOpen ? 0 : "100%" }}
            transition={{ duration: 0.3 }}
            className="
                fixed top-[var(--navbar-height)] right-0 
                w-96 h-[calc(100vh-var(--navbar-height))]
                bg-(--secondary-bg-color)
                border-l border-(--accent-color)/20
                shadow-xl z-40 
                flex flex-col
            "
        >
            {/* HEADER */}
            <div className="
                px-5 py-4 
                flex items-center justify-between 
                border-b border-(--accent-color)/15
                bg-(--primary-bg-color)
                sticky top-0
            ">
                <h2 className="text-lg font-semibold text-(--primary-text-color)">
                    Order Details
                </h2>

                <div className="flex items-center gap-4">
                    <button>
                        <PencilSquareIcon className="w-6 h-6 text-(--accent-color)" />
                    </button>

                    <button onClick={onClose}>
                        <XMarkIcon className="w-6 h-6 text-(--primary-text-color)" />
                    </button>
                </div>
            </div>

            {/* SCROLL AREA */}
            <div className="p-5 space-y-5 overflow-y-auto">
                {/* ORDER INFO */}
                <div className="space-y-2">
                    <p className="text-sm text-(--primary-text-color)">
                        <span className="font-semibold">Order ID:</span> {orderId || "N/A"}
                    </p>
                    <p className="text-sm text-(--primary-text-color)">
                        <span className="font-semibold">Customer:</span> Rahul Sharma
                    </p>
                    <p className="text-sm text-(--primary-text-color)">
                        <span className="font-semibold">Table:</span> 7
                    </p>
                </div>

                {/* ITEMS LIST */}
                <div className="bg-(--primary-bg-color) p-4 rounded-xl border border-(--accent-color)/10">
                    <h3 className="text-sm font-semibold text-(--primary-text-color) mb-3">
                        Items
                    </h3>

                    <div className="space-y-3">
                        <div className="flex justify-between text-(--primary-text-color)">
                            <span>Paneer Tikka</span>
                            <span>₹180</span>
                        </div>
                        <div className="flex justify-between text-(--primary-text-color)">
                            <span>Cold Coffee</span>
                            <span>₹120</span>
                        </div>
                    </div>

                    <div className="border-t border-(--accent-color)/10 my-3"></div>

                    <div className="flex justify-between font-semibold text-(--primary-text-color)">
                        <span>Total</span>
                        <span>₹300</span>
                    </div>
                </div>

                {/* STATUS */}
                <div>
                    <label className="block mb-2 text-sm text-(--primary-text-color)">
                        Change Status
                    </label>

                    <select className="
                        w-full px-3 py-2 rounded-lg
                        bg-(--primary-bg-color)
                        border border-(--accent-color)/25
                        text-(--primary-text-color)
                        focus:outline-none
                    ">
                        <option>Pending</option>
                        <option>Accepted</option>
                        <option>Preparing</option>
                        <option>Ready</option>
                        <option>Delivered</option>
                    </select>
                </div>
            </div>

            {/* FOOTER BUTTONS */}
            <div className="p-5 border-t border-(--accent-color)/15 flex gap-3">
                <button className="
                    flex-1 py-2 rounded-lg 
                    bg-(--accent-color)
                    text-(--primary-text-color)
                    font-semibold
                ">
                    Accept
                </button>
                <button className="
                    flex-1 py-2 rounded-lg 
                    bg-(--button-danger)
                    text-white font-semibold
                ">
                    Reject
                </button>
            </div>
        </motion.div>
    );
}
