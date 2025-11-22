import { ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, Legend } from "recharts";


const categoryData = [
    { name: "Starters", orders: 120 },
    { name: "Mains", orders: 340 },
    { name: "Desserts", orders: 80 },
    { name: "Beverages", orders: 210 },
];



export function CategoryOrdersChart() {
    return (
        <div style={{ height: 250 }}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" stroke="var(--secondary-text-color)" />
                    <YAxis stroke="var(--secondary-text-color)" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="orders" fill="var(--order-color)" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}