import { Route, Routes } from "react-router-dom";
import { ManagerLayout } from "../../layouts/ManagerLayout";
// import Dashboard from "../pages/admin/Dashboard";



export const ManagerRoutes = () => {
    return (
        <Routes>
            <Route element={<ManagerLayout />}>
                {/* <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/hotels" element={<Hotels />} />
        <Route path="/admin/users" element={<Users />} /> */}
            </Route>
        </Routes>
    );
};
