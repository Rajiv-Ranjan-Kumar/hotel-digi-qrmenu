import React from "react";
import ImageWithFallback from "./ImageWithFallback";
import { CheckCircleIcon, InboxIcon, XCircleIcon } from "@heroicons/react/24/solid";



interface TableColumn {
    key: string;
    label: string;
    width?: string;
}

interface TableAction {
    icon: React.ReactNode;
    onClick: (row: any) => void;
    className?: string;
}

interface TableProps {
    columns: TableColumn[];
    data: any[];
    actions?: TableAction[];
    loading?: boolean;
}




const Table: React.FC<TableProps> = ({ columns, data, actions = [], loading }) => {
    return (
        <div className="flex overflow-hidden rounded-xl border border-(--secondary-text-color)/30 bg-(--primary-bg-color)">
            <div className="w-full overflow-x-auto">
                <table className="w-full text-center">
                    <thead className="sticky top-0 bg-(--secondary-bg-color)">
                        <tr>
                            {columns.map((col) => (
                                <th
                                    key={col.key}
                                    className="px-6 py-4 text-(--primary-text-color) text-sm font-medium leading-normal text-center"
                                    style={{ width: col.width }}
                                >
                                    {col.label}
                                </th>
                            ))}

                            {actions.length > 0 && (
                                <th className="px-6 py-4 text-(--primary-text-color) text-sm font-medium text-center">
                                    Actions
                                </th>
                            )}
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-(--secondary-text-color)/30">
                        {loading ? (
                            <tr>
                                <td
                                    colSpan={columns.length + (actions.length ? 1 : 0)}
                                    className="py-10 text-center"
                                >
                                    <div className="flex flex-col items-center justify-center gap-3">

                                        {/* Spinner */}
                                        <div className="w-8 h-8 border-4 border-(--secondary-text-color)/30 border-t-(--accent-color) rounded-full animate-spin" />

                                        {/* Text */}
                                        <span className="text-sm font-medium text-(--secondary-text-color)">
                                            Loading, please wait...
                                        </span>
                                    </div>
                                </td>
                            </tr>

                        ) : data.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={columns.length + (actions.length ? 1 : 0)}
                                    className="py-6 text-center text-(--secondary-text-color)"
                                >
                                    <div className="flex flex-col items-center justify-center h-full gap-2">
                                        <InboxIcon className="h-8 w-8 text-(--secondary-text-color)/60" />
                                        <span className="text-sm font-medium">No data found</span>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            data.map((row, i) => (
                                <tr
                                    key={i}
                                    className="hover:bg-(--secondary-bg-color)/60 transition-colors duration-200"
                                >
                                    {columns.map((col) => (
                                        <td
                                            key={col.key}
                                            className="h-[72px] px-6 py-3 text-(--primary-text-color) text-sm text-center"
                                        >
                                            {col.key === "image" ? (
                                                <ImageWithFallback src={row[col.key]} name={row["name"]} />

                                            ) : col.key === "status" ? (
                                                <div className="flex justify-center">
                                                    {row[col.key] === "Active" ? (
                                                        <div className="inline-flex items-center gap-2 rounded-full py-1 px-3 text-xs font-medium bg-(--accent-color)/20 text-(--accent-color)">
                                                            <CheckCircleIcon className="w-4 h-4" />
                                                            {row[col.key]}
                                                        </div>
                                                    ) : (
                                                        <div className="inline-flex items-center gap-2 rounded-full py-1 px-3 text-xs font-medium bg-(--inactive-color)/20 text-(--inactive-color)">
                                                            <XCircleIcon className="w-4 h-4" />
                                                            {row[col.key]}
                                                        </div>
                                                    )}
                                                </div>

                                            ) : (
                                                <div className="flex justify-center items-center">
                                                    {row[col.key]}
                                                </div>
                                            )}
                                        </td>
                                    ))}

                                    {actions.length > 0 && (
                                        <td className="h-[72px] px-6 py-3">
                                            <div className="flex items-center justify-center gap-4 text-(--secondary-text-color)">
                                                {actions.map((action, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => action.onClick(row)}
                                                        className={`${action.className} hover:text-(--primary-text-color) transition`}
                                                    >
                                                        {action.icon}
                                                    </button>
                                                ))}
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;
