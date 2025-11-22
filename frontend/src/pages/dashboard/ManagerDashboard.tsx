import React, { useState } from "react";
import { motion } from "framer-motion";

import { useEffect } from "react";
import { useDrawer } from "../../contexts/drawerProvider/DrawerProviderContex";

import Widgets from "../../components/dashboard/Widgets";
import { DailySalesChart } from "../../components/dashboard/Graphs/DailySalesChart";
import { CategoryOrdersChart } from "../../components/dashboard/Graphs/CategoryOrdersChart";
import OrdersTable from "../../components/dashboard/OrdersTable";
import FloatingChat from "../../components/dashboard/FloatingChat";
import { Card } from "flowbite-react";






export default function Dashboard() {
    const { openDrawer } = useDrawer();

    useEffect(() => {
        openDrawer("order", { orderId: "OD1020" });
    }, []);

    return (
        <div className="min-h-screen flex bg-[var(--primary-bg-color)] text-[var(--primary-text-color)]">

            <div className="flex-1 flex flex-col">
                <main className="p-6 space-y-6">
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                        <Widgets />
                    </motion.div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <motion.div initial={{ opacity: 0, scale: 0.995 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35 }}>
                                <Card className="rounded-2xl">
                                    <h3 className="text-lg font-medium mb-4">Daily Sales</h3>
                                    <DailySalesChart />
                                </Card>
                            </motion.div>
                        </div>
                        <div>
                            <motion.div initial={{ opacity: 0, scale: 0.995 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35 }}>
                                <Card className="rounded-2xl">
                                    <h3 className="text-lg font-medium mb-4">Category Orders</h3>
                                    <CategoryOrdersChart />
                                </Card>
                            </motion.div>
                        </div>
                    </div>
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                        <Card className="rounded-2xl">
                            <h3 className="text-lg font-medium mb-4">Recent Orders</h3>
                            <OrdersTable />
                        </Card>
                    </motion.div>
                </main>
            </div>
            <FloatingChat />
        </div>

    );
}
