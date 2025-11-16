import { Sidebar } from "../components/Sidebar";
// import { Navbar } from "../components/Navbar";
import { Outlet } from "react-router-dom";





export const StaffLayout = () => {
    return (
        <div className="flex min-h-screen bg-(--primary-bg-color) text-(--primary-text-color)">
            <Sidebar role="admin" />
            <div className="flex-1 flex flex-col">
                {/* <Navbar role="admin" /> */}
                <main className="flex-1 p-6 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};
