import { Card } from "flowbite-react";

const categoryData = [
    { name: "Starters", orders: 120 },
    { name: "Mains", orders: 340 },
    { name: "Desserts", orders: 80 },
    { name: "Beverages", orders: 210 },
];

export function CategoryOrdersChart() {
    const totalOrders = categoryData.reduce((s, c) => s + c.orders, 0);
    const max = Math.max(...categoryData.map((c) => c.orders), 1);

    return (
        <Card>
            <div className="flex items-center justify-between mb-3">
                <div>
                    <h5 className="text-sm font-semibold text-gray-900">Category Orders</h5>
                    <p className="text-xs text-gray-500">Total: {totalOrders}</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                        <span className="inline-block w-3 h-3 rounded-sm" style={{ background: 'var(--order-color)' }} />
                        <span>Orders</span>
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                {categoryData.map((c) => {
                    const pct = Math.round((c.orders / max) * 100);
                    return (
                        <div key={c.name} className="flex items-center gap-3">
                            <div className="w-28 text-sm text-[var(--secondary-text-color)]">{c.name}</div>
                            <div className="flex-1 h-6 bg-[var(--primary-bg-color)] rounded overflow-hidden">
                                <div className="h-full rounded" style={{ width: `${pct}%`, background: 'var(--order-color)' }} />
                            </div>
                            <div className="w-12 text-sm text-right font-medium">{c.orders}</div>
                        </div>
                    );
                })}
            </div>
        </Card>
    );
}