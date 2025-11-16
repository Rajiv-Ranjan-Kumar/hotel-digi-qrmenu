import { Route, Routes } from "react-router-dom";
import { DefaultLayout } from "../../layouts/DefaultLayout";
import { lazy } from "react";



const Home = lazy(() => import("../../pages/Home"));
const Login = lazy(() => import("../../pages/auth/Login"));




export const DefaultRoutes = () => {
    return (
        <Routes>
            <Route element={<DefaultLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/auth/login" element={<Login />} />
                {/* <Route path="/admin/hotels" element={<Hotels />} />
        <Route path="/admin/users" element={<Users />} /> */}
            </Route>
        </Routes>
    );
};
