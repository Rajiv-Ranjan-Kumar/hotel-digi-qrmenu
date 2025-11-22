export type DrawerProps<P> = {
    isOpen: boolean;
    onClose: () => void;
    props?: P;
};



export type DrawerComponent<P = unknown> = React.ComponentType<DrawerProps<P>>;



export type DrawerMap = Record<string, DrawerComponent<any>>;



export type DrawerState = {
    isOpen: boolean;
    props?: unknown;
};



export type DrawerContextType = {
    openDrawer: <P>(key: string, props?: P) => void;
    closeDrawer: (key: string) => void;
    isOpen: (key: string) => boolean;
    getProps: (key: string) => unknown;
};
