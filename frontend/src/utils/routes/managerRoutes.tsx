import { Route, Routes } from "react-router-dom";
import { ManagerLayout } from "../../layouts/ManagerLayout";
import Dashboard from "../../pages/dashboard/ManagerDashboard";
import NotFound from "../../pages/NotFound";
// import Dashboard from "../pages/admin/Dashboard";






export const defaultRoutes = {
    login: { path: "/dashboard/manager-dashboard", element: <Dashboard /> },
};







export const ManagerRoutes = () => {
    return (
        <Routes>
            <Route element={<ManagerLayout />}>
                <Route index element={<Dashboard />} />

                {Object.values(defaultRoutes).map((route) => (
                    <Route key={route.path} path={route.path} element={route.element} />
                ))}

                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
};