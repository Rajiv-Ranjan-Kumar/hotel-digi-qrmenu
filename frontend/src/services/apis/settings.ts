import type { Settings } from "../../types/settings";



export const fetchSettings = async (): Promise<Settings> => {
    const staticSettings: Settings = {
        theme: "dark",
        currency: "INR",
        taxPercent: 5,
        branchName: "Demo Branch",
        contactEmail: "contact@hotel.com"
    };

    return new Promise((resolve) => {
        setTimeout(() => resolve(staticSettings), 300);
    });
};
