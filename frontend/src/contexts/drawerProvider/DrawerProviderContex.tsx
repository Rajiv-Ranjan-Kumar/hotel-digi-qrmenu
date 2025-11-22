import React, { createContext, useContext, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";




type DrawerComponentProps<T = any> = {
    isOpen: boolean;
    onClose: () => void;
    props?: T;
};



type DrawerComponentType = React.ComponentType<DrawerComponentProps<any>>;

type DrawerState = {
    isOpen: boolean;
    props?: any;
};

type DrawersMap = Record<string, DrawerComponentType>;

type ContextType = {
    openDrawer: (key: string, props?: any) => void;
    closeDrawer: (key: string) => void;
    toggleDrawer: (key: string, props?: any) => void;
    isOpen: (key: string) => boolean;
    getProps: (key: string) => any;
};




const DrawerContext = createContext<ContextType | undefined>(undefined);

export function useDrawer() {
    const ctx = useContext(DrawerContext);
    if (!ctx) throw new Error("useDrawer must be used inside DrawerProvider");
    return ctx;
}





export function DrawerProvider({ children, drawers = {}, }: { children: React.ReactNode; drawers?: DrawersMap; }) {
    const [state, setState] = useState<Record<string, DrawerState>>({});



    const openDrawer = (key: string, props?: any) => {
        setState((s) => ({ ...s, [key]: { isOpen: true, props } }));
    };




    const closeDrawer = (key: string) => {
        setState((s) => ({ ...s, [key]: { ...(s[key] || {}), isOpen: false } }));
    };




    const toggleDrawer = (key: string, props?: any) => {
        setState((s) => {
            const prev = s[key];
            return { ...s, [key]: { isOpen: !prev?.isOpen, props: props ?? prev?.props } };
        });
    };




    const isOpen = (key: string) => !!state[key]?.isOpen;
    const getProps = (key: string) => state[key]?.props;

    const ctx = useMemo(() => ({ openDrawer, closeDrawer, toggleDrawer, isOpen, getProps }), [state]);





    return (
        <DrawerContext.Provider value={ctx}>
            {children}

            {Object.entries(drawers).map(([key, Comp]) => {
                const drawerState = state[key] ?? { isOpen: false, props: {} };

                return (
                    <AnimatePresence key={key}>
                        {drawerState.isOpen && (
                            <motion.div
                                initial={{ x: "100%" }}
                                animate={{ x: 0 }}
                                exit={{ x: "100%" }}
                                transition={{ duration: 0.3 }}
                                className="fixed top-0 right-0 h-full w-80 z-[9999]"
                            >

                                <Comp
                                    isOpen={drawerState.isOpen}
                                    onClose={() => closeDrawer(key)}
                                    {...drawerState.props}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                );
            })}
        </DrawerContext.Provider>

    );
}
