import { useLocation, useNavigate } from "react-router-dom";
import { AdminRoutes } from "./adminRoutes";
import { managerRoutes, ManagerRoutes } from "./managerRoutes";
import { StaffRoutes } from "./staffRoutes";
import { defaultRoutes, DefaultRoutes } from "./defaultRoutes";
import CentralizeDrawer from "../../contexts/drawerProvider/CentralizeDrawer";
import { DrawerProvider } from "../../contexts/drawerProvider/DrawerProviderContex";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store/store";
import NotFound from "../../pages/NotFound";
import { useEffect, type JSX } from "react";
import { get_role } from "../../services/apis/coresettings";
import { setRoles } from "../../store/slice/roleSlice";




export const AppRoutes = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    // ✅ Fetch roles once using use() + Suspense
    const fetchedRoles = async () => {
        const res = await get_role();
        if (!res?.status) return;

        // ensure we always pass an array to Redux
        const rolesArray = res.data ?? [];
        dispatch(setRoles(rolesArray));
    };




    // Dispatch to Redux store once
    useEffect(() => {
        fetchedRoles();
    }, []);







    // Get roles & user from store
    const roles = useSelector((state: RootState) => state.roles.roles);
    const user = useSelector((state: RootState) => state.user);
    const is_authenticated = user.is_authenticated;




    const normalize = (value: string) => value.toLowerCase().replace(/[\s_-]/g, "");




    // role → component map
    const roleRouteMap: Record<string, JSX.Element> = {
        superadmin: <AdminRoutes />,
        admin: <ManagerRoutes />,
        manager: <ManagerRoutes />,
        staff: <StaffRoutes />
    };





    // Fetch role record from roles state
    const currentRole = roles?.find(r => normalize(r.name) === normalize(user.profile?.role ?? ""));
    const cleanRole = currentRole ? normalize(currentRole.name) : "";
    const SelectedRoute = roleRouteMap[cleanRole];






    useEffect(() => {
        if (!is_authenticated || !cleanRole) return;

        // Auto-generate base path: /dashboard/{role}
        const basePath = `/dashboard/${cleanRole}`;

        // If already inside role namespace → no redirect
        if (location.pathname.startsWith(basePath)) return;

        // Redirect dynamically to /dashboard/{role}/dashboard
        navigate(`${basePath}/dashboard`, { replace: true });
    }, [is_authenticated, cleanRole, location.pathname, navigate]);








    useEffect(() => {
        // Allowed default routes (login, register, etc.)
        const allowedPaths = Object.values(defaultRoutes).map(r => r.path);

        if (!is_authenticated && !allowedPaths.includes(location.pathname)) {
            navigate(defaultRoutes.login.path, { replace: true });
        }
    }, [is_authenticated, location.pathname, navigate]);





    return (
        <DrawerProvider drawers={CentralizeDrawer}>
            {/* Role exists but route not mapped */}
            {currentRole && !SelectedRoute && <NotFound />}

            {/* Role matched → correct dashboard */}
            {SelectedRoute && SelectedRoute}

            {/* No role assigned → Default */}
            {!currentRole && <DefaultRoutes />}
        </DrawerProvider>
    );
};