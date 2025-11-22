import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";



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
    return (
        <div style={{ height: 250 }}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" stroke="var(--secondary-text-color)" />
                    <YAxis stroke="var(--secondary-text-color)" />
                    <Tooltip />
                    <Line type="monotone" dataKey="sales" stroke="var(--accent-color)" strokeWidth={3} dot={{ r: 3 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}