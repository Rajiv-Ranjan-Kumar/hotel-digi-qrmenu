import { createContext, useContext } from "react";
import type { DrawerContextType } from "./DrawerTypes";



export const DrawerContext = createContext<DrawerContextType | null>(null);



export const useDrawer = () => {
    const ctx = useContext(DrawerContext);
    if (!ctx) throw new Error("useDrawer must be used inside DrawerProvider");
    return ctx;
};
