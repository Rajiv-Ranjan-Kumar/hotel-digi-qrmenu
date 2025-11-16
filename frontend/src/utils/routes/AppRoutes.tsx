import { BrowserRouter } from "react-router-dom";
import { AdminRoutes } from "./adminRoutes";
import { ManagerRoutes } from "./managerRoutes";
import { StaffRoutes } from "./staffRoutes";
import { DefaultRoutes } from "./defaultRoutes";


export const AppRoutes = () => {
    const user = { role: "guest" }

    return (
        <BrowserRouter>
            {user?.role === "admin" && <AdminRoutes />}
            {user?.role === "manager" && <ManagerRoutes />}
            {user?.role === "staff" && <StaffRoutes />}
            {user?.role === "guest" && <DefaultRoutes />}
        </BrowserRouter>
    );
};
