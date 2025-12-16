import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import { useEffect, useState } from "react";
import { Bars3Icon, Cog6ToothIcon, CubeIcon, HomeIcon, Squares2X2Icon, TagIcon, UsersIcon } from "@heroicons/react/24/solid";
import Header from "../components/dashboard/Header";
import { managerRoutes } from "../utils/routes/managerRoutes";
import { get_maneger_initial_data } from "../services/apis/hotel";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";
import { setHotels } from "../store/slice/hotelSlice";
import { setBranches } from "../store/slice/branchSlice";






export const ManagerLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const dispatch = useDispatch<AppDispatch>();




    const fetch_initial_data = async () => {
        const response = await get_maneger_initial_data();

        if (!response.status) {
            console.error("Failed to fetch initial data for manager.");
            return;
        }

        const hotelsData = response?.data ?? { items: [], count: 0 };

        dispatch(setHotels({
            items: hotelsData.items ?? [],
            count: hotelsData.count ?? 0,
        }));

        const firstHotel = hotelsData.items?.[0];
        dispatch(setBranches(firstHotel?.branches ?? []));
    }


    useEffect(() => {
        fetch_initial_data();
    }, []);




    const sidebarItems = [
        { to: managerRoutes.dashboard.path, title: "Dashboard", icon: HomeIcon },
        { to: managerRoutes.categories.path, title: "Categories", icon: TagIcon },
        { to: managerRoutes.menuItems.path, title: "Menu Items", icon: CubeIcon },
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
