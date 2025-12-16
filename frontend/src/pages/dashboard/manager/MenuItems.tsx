import React from "react";

export default function MenuItems() {
    return (
        <div className="w-full flex flex-col bg-surface-dark rounded-xl overflow-hidden">

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="sticky top-0 bg-surface-dark z-10">
                        <tr className="border-b border-border-dark/50">
                            <th className="px-6 py-4 font-medium text-text-darker uppercase tracking-wider w-20">Image</th>
                            <th className="px-6 py-4 font-medium text-text-darker uppercase tracking-wider min-w-[200px]">Item Name</th>
                            <th className="px-6 py-4 font-medium text-text-darker uppercase tracking-wider min-w-[120px]">Category</th>
                            <th className="px-6 py-4 font-medium text-text-darker uppercase tracking-wider">Price</th>
                            <th className="px-6 py-4 font-medium text-text-darker uppercase tracking-wider">Availability</th>
                            <th className="px-6 py-4 font-medium text-text-darker uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {[1, 2, 3, 4].map((i) => (
                            <tr
                                key={i}
                                className="border-b border-border-dark/50 hover:bg-background-dark transition-colors"
                            >
                                <td className="px-6 py-3">
                                    <div
                                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-md size-12"
                                        style={{
                                            backgroundImage:
                                                'url("https://source.unsplash.com/100x100/?food")',
                                        }}
                                    ></div>
                                </td>

                                <td className="px-6 py-3 font-medium text-text-light">
                                    Demo Food Item {i}
                                </td>

                                <td className="px-6 py-3 text-text-darker">Main Course</td>

                                <td className="px-6 py-3 text-text-darker">$10.00</td>

                                <td className="px-6 py-3">
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" defaultChecked />
                                        <div className="w-11 h-6 bg-border-dark rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                    </label>
                                </td>

                                <td className="px-6 py-3 text-right">
                                    <div className="flex justify-end gap-4">
                                        <button className="text-text-darker hover:text-primary transition-colors">
                                            <span className="material-symbols-outlined">edit</span>
                                        </button>
                                        <button className="text-text-darker hover:text-red-500 transition-colors">
                                            <span className="material-symbols-outlined">delete</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between p-4 border-t border-border-dark/50">
                <p className="text-sm text-text-darker">
                    Showing <span className="font-medium text-text-light">1</span> to{" "}
                    <span className="font-medium text-text-light">4</span> of{" "}
                    <span className="font-medium text-text-light">50</span> results
                </p>

                <div className="flex items-center">
                    <button className="flex size-9 items-center justify-center text-text-darker hover:text-white transition-colors">
                        <span className="material-symbols-outlined text-xl">chevron_left</span>
                    </button>

                    <button className="text-sm font-bold flex size-9 items-center justify-center text-background-dark rounded-full bg-primary">
                        1
                    </button>

                    <button className="text-sm font-normal flex size-9 items-center justify-center text-text-darker rounded-full hover:bg-background-dark hover:text-white">
                        2
                    </button>

                    <button className="text-sm font-normal flex size-9 items-center justify-center text-text-darker rounded-full hover:bg-background-dark hover:text-white">
                        3
                    </button>

                    <span className="text-sm flex size-9 items-center justify-center text-text-darker">
                        ...
                    </span>

                    <button className="text-sm font-normal flex size-9 items-center justify-center text-text-darker rounded-full hover:bg-background-dark hover:text-white">
                        10
                    </button>

                    <button className="flex size-9 items-center justify-center text-text-darker hover:text-white transition-colors">
                        <span className="material-symbols-outlined text-xl">chevron_right</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

