import { BrowserRouter } from "react-router-dom";
import { AdminRoutes } from "./adminRoutes";
import { ManagerRoutes } from "./managerRoutes";
import { StaffRoutes } from "./staffRoutes";
import { DefaultRoutes } from "./defaultRoutes";
import CentralizeDrawer from "../../context/drawerProvider/CentralizeDrawer";
import { DrawerProvider } from "../../context/drawerProvider/DrawerProviderContex";




export const AppRoutes = () => {
    const user = { role: "manager" }

    return (
        <BrowserRouter>
            <DrawerProvider drawers={CentralizeDrawer}>
                {user?.role === "admin" && <AdminRoutes />}
                {user?.role === "manager" && <ManagerRoutes />}
                {user?.role === "staff" && <StaffRoutes />}
            </DrawerProvider>
            {user?.role === "guest" && <DefaultRoutes />}
        </BrowserRouter>
    );
};
