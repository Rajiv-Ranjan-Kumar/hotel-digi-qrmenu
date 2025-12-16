import type { MenuItem } from "../../types/menu";

export const fetchMenu = async () => {
    const staticMenu: MenuItem[] = [
        {
            id: 1,
            name: "Margherita Pizza",
            price: 299,
            category: "Pizza",
            available: true,
            image: "/images/pizza1.png"
        },
        {
            id: 2,
            name: "Veg Cheese Burger",
            price: 149,
            category: "Burger",
            available: true,
            image: "/images/burger1.png"
        },
        {
            id: 3,
            name: "Cold Coffee",
            price: 99,
            category: "Beverages",
            available: false,
            image: "/images/coffee.png"
        }
    ];

    return new Promise((resolve) => {
        setTimeout(() => resolve(staticMenu), 300); 
    });
};
