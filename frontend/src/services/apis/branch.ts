import type { Branch } from "../../types/branch";


export const fetchBranches = async (): Promise<Branch[]> => {
    const staticBranches: Branch[] = [
        { id: 1, name: "Branch A", address: "123 Main St", isActive: true },
        { id: 2, name: "Branch B", address: "456 Market Rd", isActive: false },
        { id: 3, name: "Branch C", address: "789 Park Ave", isActive: true },
    ];

    return new Promise((resolve) => {
        setTimeout(() => resolve(staticBranches), 300);
    });
};
