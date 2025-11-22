// src/components/OrdersTable.tsx
import React from "react";
import { Edit2, Trash2 } from "lucide-react";
import { Badge } from "flowbite-react";

const orders = [
    { id: "ORD-1001", customer: "Aman", amount: 12.5, payment: "Paid", status: "delivered", time: "10:23 AM" },
    { id: "ORD-1002", customer: "Priya", amount: 8.0, payment: "Pending", status: "in-progress", time: "10:45 AM" },
    { id: "ORD-1003", customer: "Ravi", amount: 20.0, payment: "Paid", status: "pending", time: "11:12 AM" },
];

function StatusBadge({ status }: { status: string }) {
    const map: Record<string, string> = {
        "delivered": "bg-[var(--delivered-color)]/20 text-[var(--delivered-color)]",
        "in-progress": "bg-[var(--pickup-color)]/20 text-[var(--pickup-color)]",
        "pending": "bg-[var(--order-color)]/20 text-[var(--order-color)]",
    };
    return <span className={`px-2 py-1 rounded-full text-xs ${map[status] || map.pending}`}>{status}</span>;
}

export default function OrdersTable() {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="text-[var(--secondary-text-color)] text-sm">
                    <tr>
                        <th className="p-3">Order ID</th>
                        <th className="p-3">Customer</th>
                        <th className="p-3">Amount</th>
                        <th className="p-3">Payment</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Time</th>
                        <th className="p-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(o => (
                        <tr key={o.id} className="border-t border-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.01)]">
                            <td className="p-3">{o.id}</td>
                            <td className="p-3">{o.customer}</td>
                            <td className="p-3">₹{o.amount.toFixed(2)}</td>
                            <td className="p-3">{o.payment}</td>
                            <td className="p-3"><StatusBadge status={o.status} /></td>
                            <td className="p-3">{o.time}</td>
                            <td className="p-3 flex gap-2">
                                <button className="p-2 rounded-lg hover:bg-[var(--accent-color)]/10"><Edit2 size={16} /></button>
                                <button className="p-2 rounded-lg hover:bg-[var(--button-danger)]/10"><Trash2 size={16} /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}