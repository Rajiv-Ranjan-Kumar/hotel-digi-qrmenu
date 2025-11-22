import { Card, Badge } from "flowbite-react";

const salesData = [
    { day: "Mon", sales: 240 },
    { day: "Tue", sales: 300 },
    { day: "Wed", sales: 200 },
    { day: "Thu", sales: 278 },
    { day: "Fri", sales: 189 },
    { day: "Sat", sales: 239 },
    { day: "Sun", sales: 349 },
];

export function DailySalesChart() {
    const totalSales = salesData.reduce((s, d) => s + d.sales, 0);
    const values = salesData.map((d) => d.sales);
    const max = Math.max(...values, 1);
    const min = Math.min(...values);
    const width = 100; // viewBox width
    const height = 40; // viewBox height

    const points = values
        .map((v, i) => {
            const x = (i / (values.length - 1)) * width;
            const y = height - ((v - min) / (max - min || 1)) * (height - 6) - 3;
            return `${x},${y}`;
        })
        .join(" ");

    return (
        <Card>
            <div className="flex items-center justify-between mb-3">
                <div>
                    <h5 className="text-sm font-semibold text-gray-900">Daily Sales</h5>
                    <p className="text-xs text-gray-500">Total: {totalSales}</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                        <span className="inline-block w-3 h-3 rounded-sm" style={{ background: 'var(--accent-color)' }} />
                        <span>Sales</span>
                    </div>
                    <Badge color="info">Weekly</Badge>
                </div>
            </div>

            <div style={{ height: 250 }} className="flex items-center">
                <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="w-full h-24">
                    <polyline points={points} fill="none" stroke="var(--accent-color)" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
                    {values.map((v, i) => {
                        const x = (i / (values.length - 1)) * width;
                        const y = height - ((v - min) / (max - min || 1)) * (height - 6) - 3;
                        return <circle key={i} cx={x} cy={y} r={1.6} fill="var(--accent-color)" />;
                    })}
                </svg>
            </div>
        </Card>
    );
}
