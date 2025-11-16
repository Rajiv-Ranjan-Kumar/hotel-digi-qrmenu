import { Route, Routes } from "react-router-dom";

// import Dashboard from "../pages/admin/Dashboard";
// import Hotels from "../pages/admin/Hotels";
// import Users from "../pages/admin/Users";
import { AdminLayout } from "../../layouts/AdminLayout";

export const AdminRoutes = () => {
    return (
        <Routes>
            <Route element={<AdminLayout />}>
                {/* <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/hotels" element={<Hotels />} />
        <Route path="/admin/users" element={<Users />} /> */}
            </Route>
        </Routes>
    );
};
