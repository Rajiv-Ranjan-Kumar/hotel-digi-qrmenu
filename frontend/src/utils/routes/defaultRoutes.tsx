import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { DefaultLayout } from "../../layouts/DefaultLayout";



const Home = lazy(() => import("../../pages/Home"));
const NotFound = lazy(() => import("../../pages/NotFound"));
const Login = lazy(() => import("../../pages/auth/Login"));
const SignUp = lazy(() => import("../../pages/auth/Signup"));
const ForgotPassword = lazy(() => import("../../pages/auth/ForgotPassword"));
const OtpVerification = lazy(() => import("../../pages/auth/OtpVerification"));
const ResetPassword = lazy(() => import("../../pages/auth/ResetPassword"));
const PasswordResetSuccess = lazy(() => import("../../pages/auth/PasswordResetSuccess"));
const AccountSuccess = lazy(() => import("../../pages/auth/AccountSuccess"));











export const defaultRoutes = {
    login: { path: "/auth/login", element: <Login /> },
    signup: { path: "/auth/signup", element: <SignUp /> },
    forgotPassword: { path: "/auth/forgot-password", element: <ForgotPassword /> },
    otpVerification: { path: "/auth/otp-verification", element: <OtpVerification /> },
    resetPassword: { path: "/auth/reset-password", element: <ResetPassword /> },
    passwordResetSuccess: { path: "/auth/password-reset-success", element: <PasswordResetSuccess /> },
    accountSuccess: { path: "/auth/account-success", element: <AccountSuccess /> },
};







export const DefaultRoutes = () => {
    return (
        <Routes>
            <Route element={<DefaultLayout />}>
                <Route index element={<Home />} />

                {Object.values(defaultRoutes).map((route) => (
                    <Route key={route.path} path={route.path} element={route.element} />
                ))}

                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
};
