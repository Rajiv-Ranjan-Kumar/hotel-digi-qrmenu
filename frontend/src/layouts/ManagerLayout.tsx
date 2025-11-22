import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import { useState } from "react";
import { Bars3Icon, Cog6ToothIcon, CubeIcon, HomeIcon, Squares2X2Icon, TagIcon, UsersIcon } from "@heroicons/react/24/solid";
import Header from "../components/dashboard/Header";





export const ManagerLayout = () => {
    const [collapsed, setCollapsed] = useState(false);




    const sidebarItems = [
        { to: "/dashboard", title: "Dashboard", icon: HomeIcon },
        { to: "/categories", title: "Categories", icon: TagIcon },
        { to: "/menu-items", title: "Menu Items", icon: CubeIcon },
        { to: "/orders", title: "Orders", icon: Bars3Icon },
        { to: "/branches", title: "Branches", icon: Squares2X2Icon },
        { to: "/staff", title: "Staff", icon: UsersIcon },
        { to: "/analytics", title: "Analytics", icon: CubeIcon },
        { to: "/settings", title: "Settings", icon: Cog6ToothIcon },
    ];



    return (
        <div className="min-h-screen flex bg-(--primary-bg-color) text-(--primary-text-color)">

            {/* Sidebar */}
            <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(v => !v)} items={sidebarItems} />

            {/* Right Side Content Area */}
            <div className={`flex-1 flex flex-col transition-all duration-300 ${collapsed ? "ml-16" : "ml-60"}`}>
                <Header />

                <main className="flex-1 p-6 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};
