import { Route, Routes } from "react-router-dom";
import { ManagerLayout } from "../../layouts/ManagerLayout";
import Dashboard from "../../pages/dashboard/ManagerDashboard";
import NotFound from "../../pages/NotFound";
import Categories from "../../pages/dashboard/Categories";
// import Dashboard from "../pages/admin/Dashboard";






export const managerRoutes = {
    dashboard: { path: "/dashboard/manager-dashboard", element: <Dashboard /> },
    categories: { path: "/dashboard/categories", element: <Categories /> },
};







export const ManagerRoutes = () => {
    return (
        <Routes>
            <Route element={<ManagerLayout />}>
                <Route index element={<Dashboard />} />

                {Object.values(managerRoutes).map((route) => (
                    <Route key={route.path} path={route.path} element={route.element} />
                ))}

                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
};