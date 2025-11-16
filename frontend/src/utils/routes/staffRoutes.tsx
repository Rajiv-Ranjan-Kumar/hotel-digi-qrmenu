import { Route, Routes } from "react-router-dom";
import { StaffLayout } from "../../layouts/StaffLayout";
// import Dashboard from "../pages/admin/Dashboard";



export const StaffRoutes = () => {
    return (
        <Routes>
            <Route element={<StaffLayout />}>
                {/* <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/hotels" element={<Hotels />} />
        <Route path="/admin/users" element={<Users />} /> */}
            </Route>
        </Routes>
    );
};
