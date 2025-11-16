import { NavLink } from "react-router-dom";
import { Button } from "flowbite-react";

type Props = { role: string };

export const Sidebar = ({ role }: Props) => {
    const links =
        role === "admin"
            ? [
                { name: "Dashboard", path: "/admin/dashboard" },
                { name: "Hotels", path: "/admin/hotels" },
                { name: "Users", path: "/admin/users" },
            ]
            : role === "manager"
                ? [
                    { name: "Dashboard", path: "/manager/dashboard" },
                    { name: "Branches", path: "/manager/branches" },
                    { name: "Orders", path: "/manager/orders" },
                ]
                : role === "staff"
                    ? [
                        { name: "Dashboard", path: "/staff/dashboard" },
                        { name: "Tasks", path: "/staff/tasks" },
                    ]
                    : [];

    return (
        <aside className="w-64 bg-[var(--secondary-bg-color)] p-4 flex flex-col gap-4">
            {links.map((link) => (
                <NavLink
                    key={link.name}
                    to={link.path}
                    className="block px-4 py-2 rounded hover:bg-[var(--primary-bg-color)] transition-colors"
                >
                    {link.name}
                </NavLink>
            ))}
            <Button color="success" className="mt-auto">
                Logout
            </Button>
        </aside>
    );
};
