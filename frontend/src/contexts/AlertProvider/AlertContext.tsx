import { createContext, type ReactNode, useState } from "react";
import type { AlertItem, AlertType } from "./alertTypes";
import { Alert } from "./Alert";






interface AlertContextType {
    showAlert: (type: AlertType, message: string, duration?: number) => void;
}






export const AlertContext = createContext<AlertContextType | undefined>(undefined);





export const AlertProvider = ({ children }: { children: ReactNode }) => {
    const [alerts, setAlerts] = useState<AlertItem[]>([]);

    const showAlert = (type: AlertType, message: string, duration = 3000) => {
        const id = Date.now();
        setAlerts((prev) => [...prev, { id, type, message }]);
        setTimeout(() => setAlerts((prev) => prev.filter((a) => a.id !== id)), duration);
    };

    return (
        <AlertContext.Provider value={{ showAlert }}>
            {children}
            <Alert alerts={alerts} />
        </AlertContext.Provider>
    );
};