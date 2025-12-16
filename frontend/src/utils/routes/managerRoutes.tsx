import { Route, Routes } from "react-router-dom";
import { ManagerLayout } from "../../layouts/ManagerLayout";
import Dashboard from "../../pages/dashboard/manager/ManagerDashboard";
import NotFound from "../../pages/NotFound";
import Categories from "../../pages/dashboard/manager/Categories";
import MenuItems from "../../pages/dashboard/manager/MenuItems";
import HotelRegistration from "../../pages/dashboard/manager/HotelRegistration";






export const managerRoutes = {
    registerRestro: { path: "/dashboard/manager/register-restaurant", element: <HotelRegistration /> },
    dashboard: { path: "/dashboard/manager/dashboard", element: <Dashboard /> },
    categories: { path: "/dashboard/manager/categories", element: <Categories /> },
    menuItems: { path: "/dashboard/manager/menu-items", element: <MenuItems /> },
};






export const ManagerRoutes = () => {
    return (
        <Routes>
            {/* ---- Route with manager layout ---- */}
            <Route element={<ManagerLayout />}>
                <Route index element={<Dashboard />} />

                {Object.values(managerRoutes).map((route) => (
                    <Route key={route.path} path={route.path} element={route.element} />
                ))}
            </Route>

            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};
