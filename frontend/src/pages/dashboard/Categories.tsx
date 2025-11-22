// src/pages/Categories.tsx
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import CategoryTable from "../components/CategoryTable";
import CategoryAddModal from "../components/CategoryAddModal";
import CategoryEditModal from "../components/CategoryEditModal";
import CategoryDeleteModal from "../components/CategoryDeleteModal";
import FloatingChat from "../components/FloatingChat";

export default function Categories() {
    const [collapsed, setCollapsed] = useState(false);
    const [addOpen, setAddOpen] = useState(false);
    const [editOpen, setEditOpen] = useState<{ open: boolean; id?: string }>({ open: false });
    const [deleteOpen, setDeleteOpen] = useState<{ open: boolean; id?: string }>({ open: false });
    return (
        <div className="min-h-screen flex bg-[var(--primary-bg-color)] text-[var(--primary-text-color)]">
            <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(v => !v)} />
            <div className="flex-1 flex flex-col">
                <Header collapsed={collapsed} onToggle={() => setCollapsed(v => !v)} />
                <main className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-semibold">Categories</h1>
                        <div className="flex items-center gap-3">
                            <button onClick={() => setAddOpen(true)} className="px-4 py-2 rounded-lg bg-[var(--accent-color)] text-[var(--primary-text-color)]">Add Category</button>
                        </div>
                    </div>
                    <div className="bg-[var(--secondary-bg-color)] p-4 rounded-2xl shadow">
                        <CategoryTable onEdit={id => setEditOpen({ open: true, id })} onDelete={id => setDeleteOpen({ open: true, id })} />
                    </div>
                </main>
            </div>
            <CategoryAddModal open={addOpen} onClose={() => setAddOpen(false)} />
            <CategoryEditModal open={editOpen.open} id={editOpen.id} onClose={() => setEditOpen({ open: false })} />
            <CategoryDeleteModal open={deleteOpen.open} id={deleteOpen.id} onClose={() => setDeleteOpen({ open: false })} />
            <FloatingChat />
        </div>
    );
}
