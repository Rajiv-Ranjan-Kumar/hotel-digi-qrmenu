import { motion } from "framer-motion";
import {
    XMarkIcon,
    PencilSquareIcon,
    ClockIcon,
    CreditCardIcon,
    UserIcon,
    CheckCircleIcon,
    ChevronDownIcon,
    TruckIcon,
    CubeIcon,
    WrenchScrewdriverIcon,
    CheckBadgeIcon,
} from "@heroicons/react/24/solid";
import { useState, type JSX } from "react";



interface Props {
    isOpen: boolean;
    onClose: () => void;
    orderId?: string;
}




export default function OrderDetailsSidebar({ isOpen, onClose, orderId }: Props) {
    const [orderStatus, setOrderStatus] = useState("Preparing");
    const [paymentStatus, setPaymentStatus] = useState("Pending");
    const [isOrderStatusOpen, setIsOrderStatusOpen] = useState(false);

    const statusColors: Record<string, { bg: string; text: string; icon: JSX.Element }> = {
        Pending: { bg: "bg-yellow-500/20", text: "text-yellow-600", icon: <ClockIcon className="w-4 h-4" /> },
        Accepted: { bg: "bg-blue-500/20", text: "text-blue-600", icon: <CheckBadgeIcon className="w-4 h-4" /> },
        Preparing: { bg: "bg-orange-500/20", text: "text-orange-600", icon: <WrenchScrewdriverIcon className="w-4 h-4" /> },
        Ready: { bg: "bg-green-500/20", text: "text-green-600", icon: <CubeIcon className="w-4 h-4" /> },
        Delivered: { bg: "bg-emerald-500/20", text: "text-emerald-600", icon: <TruckIcon className="w-4 h-4" /> },
    };

    const statusOptions = ["Pending", "Accepted", "Preparing", "Ready", "Delivered"];

    const items = [
        { id: 1, name: "Paneer Tikka", qty: 1, price: 180, notes: "No onions" },
        { id: 2, name: "Cold Coffee", qty: 1, price: 120, notes: "Less sugar" },
        { id: 3, name: "Cold Coffee", qty: 1, price: 120, notes: "Less sugar" },
        { id: 4, name: "Cold Coffee", qty: 1, price: 120, notes: "Less sugar" },
    ];

    const subtotal = items.reduce((s, it) => s + it.qty * it.price, 0);
    const service = Math.round(subtotal * 0.1);
    const total = subtotal + service;

    return (
        <motion.div
            initial={{ x: "100%" }}
            animate={{ x: isOpen ? 0 : "100%" }}
            transition={{ duration: 0.28 }}
            className="fixed right-0 bottom-0 w-96 h-[calc(100vh-var(--navbar-height))] bg-(--secondary-bg-color) border-l border-(--accent-color)/20 shadow-xl z-30 flex flex-col"
        >
            {/* Header */}
            <div className="px-4 py-3 flex items-center justify-between border-b border-(--accent-color)/15 bg-(--primary-bg-color) sticky top-0">
                <div>
                    <div className="text-xs text-(--accent-color) font-semibold">Order</div>
                    <div className="text-sm font-bold text-(--primary-text-color)">#{orderId || "—"}</div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="text-xs px-2 py-1 text-bold bg-(--accent-color)/10 text-(--accent-color) rounded">
                        Delivery: Table 7
                    </div>
                    <button aria-label="edit" className="p-1 rounded hover:bg-(--accent-color)/10">
                        <PencilSquareIcon className="w-5 h-5 text-(--accent-color)" />
                    </button>
                    <button onClick={onClose} aria-label="close" className="p-1 rounded hover:bg-(--accent-color)/10">
                        <XMarkIcon className="w-5 h-5 text-(--primary-text-color)" />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="px-4 py-3 space-y-2 overflow-y-auto flex-1">
                {/* Customer */}
                <div className="bg-(--primary-bg-color) p-3 rounded-lg border border-(--accent-color)/10">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <UserIcon className="w-4 h-4 text-(--accent-color)" />
                            <div className="text-sm font-medium text-(--primary-text-color)">Rahul Sharma</div>
                        </div>
                        <div className="text-xs text-(--primary-text-color)/70">Table 7</div>
                    </div>
                    <div className="mt-2 text-xs text-(--primary-text-color)/70">
                        Notes: "No onions, extra spicy"
                    </div>
                </div>

                {/* Order Status + Payment — SAME ROW */}
                <div className="grid grid-cols-2 gap-2">

                    {/* ORDER STATUS */}
                    <div className="bg-(--primary-bg-color) p-3 rounded-lg border border-(--accent-color)/10 relative">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-semibold text-(--accent-color) uppercase">Order Status</span>
                            <ClockIcon className="w-4 h-4 text-yellow-500" />
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.01 }}
                            onClick={() => setIsOrderStatusOpen(!isOrderStatusOpen)}
                            className={`w-full px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between border transition 
                                ${statusColors[orderStatus].bg}
                                ${statusColors[orderStatus].text}
                                border-current/40`}
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-sm">{statusColors[orderStatus].icon}</span>
                                <span>{orderStatus}</span>
                            </div>
                            <ChevronDownIcon
                                className={`w-4 h-4 transition-transform ${isOrderStatusOpen ? "rotate-180" : ""}`}
                            />
                        </motion.button>

                        {isOrderStatusOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -2 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.15 }}
                                className="absolute top-full left-0 right-0 mt-1 bg-(--primary-bg-color) border border-(--accent-color)/20 rounded-lg shadow-lg z-50 overflow-hidden"
                            >
                                {statusOptions.map((status) => (
                                    <motion.button
                                        key={status}
                                        onClick={() => {
                                            setOrderStatus(status);
                                            setIsOrderStatusOpen(false);
                                        }}
                                        className={`w-full text-left px-3 py-2 text-xs font-medium flex items-center gap-2 transition
                                            ${orderStatus === status
                                                ? "bg-(--accent-color)/20 text-(--accent-color)"
                                                : "text-(--primary-text-color) hover:bg-(--accent-color)/10"
                                            }`}
                                    >
                                        <span className="text-sm">{statusColors[status].icon}</span>
                                        {status}
                                    </motion.button>
                                ))}
                            </motion.div>
                        )}
                    </div>

                    {/* PAYMENT */}
                    <div className="bg-(--primary-bg-color) p-3 rounded-lg border border-(--accent-color)/10">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-semibold text-(--accent-color) uppercase">Payment</span>
                            <CreditCardIcon className="w-4 h-4 text-(--accent-color)" />
                        </div>

                        {paymentStatus === "Pending" ? (
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setPaymentStatus("Paid")}
                                className="w-full bg-(--accent-color) text-(--primary-text-color) text-xs py-2 rounded-lg font-semibold shadow-sm"
                            >
                                Accept Payment
                            </motion.button>
                        ) : (
                            <div className="flex items-center gap-2 bg-green-500/15 text-green-400 border border-green-500/30 px-3 py-2 rounded-lg">
                                <CheckCircleIcon className="w-4 h-4" />
                                <span className="text-xs font-semibold">{paymentStatus}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Items */}
                <div className="bg-(--primary-bg-color) p-3 rounded-lg border border-(--accent-color)/10">
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-xs font-semibold text-(--primary-text-color)">Items</div>
                        <div className="text-xs text-(--primary-text-color)/70">{items.length} items</div>
                    </div>

                    <div
                        className="space-y-1.5 overflow-y-auto no-scrollbar pr-2 max-h-34
                        [&::-webkit-scrollbar]:w-1
                        [&::-webkit-scrollbar-track]:bg-(--secondary-bg-color)
                        [&::-webkit-scrollbar-thumb]:bg-(--accent-color)
                        [&::-webkit-scrollbar-thumb]:rounded-full
                        scrollbar-thin"
                    >
                        {items.map((it) => (
                            <div key={it.id} className="flex items-center justify-between text-xs">
                                <div className="min-w-0">
                                    <div className="truncate font-medium text-(--primary-text-color)">{it.name}</div>
                                    <div className="text-(--primary-text-color)/60">{it.notes}</div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="text-xs bg-(--accent-color)/20 text-(--accent-color) px-2 py-0.5 rounded">{it.qty}x</div>
                                    <div className="text-xs font-semibold text-(--accent-color)">₹{it.price}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-(--accent-color)/15 mt-3 pt-2 text-xs">
                        <div className="flex justify-between mb-1 text-(--primary-text-color)">
                            <span>Subtotal</span><span>₹{subtotal}</span>
                        </div>
                        <div className="flex justify-between mb-1 text-(--primary-text-color)">
                            <span>Service (10%)</span><span>₹{service}</span>
                        </div>
                        <div className="border-t border-(--accent-color)/15 pt-2 flex justify-between font-bold text-(--primary-text-color)">
                            <span>Total</span><span>₹{total}</span>
                        </div>
                    </div>
                </div>

            </div>

            {/* Footer */}
            <div className="px-3 py-2 border-t border-(--accent-color)/15 flex gap-2">
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-2 rounded-lg bg-(--accent-color) text-(--primary-text-color) font-semibold text-xs"
                >
                    Confirm
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-2 rounded-lg bg-red-500/20 border border-red-500/50 text-red-400 font-semibold text-xs"
                >
                    Cancel
                </motion.button>
            </div>
        </motion.div>
    );
}
