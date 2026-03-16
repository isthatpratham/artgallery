"use client"
import React, { useEffect, useState } from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';

export default function AdminOrdersPage() {
    // STEP 3 - Ensure State Exists
    const [orders, setOrders] = useState([]);

    // STEP 2 - Fix API Fetch Logic
    // STEP 4 - Status Update Function
    async function updateStatus(orderId: string, newStatus: string) {
        try {
            const res = await fetch("/api/admin/update-order-status", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    orderId,
                    status: newStatus
                })
            });

            const result = await res.json();

            if (result.success) {
                setOrders((prev: any) =>
                    prev.map((order: any) =>
                        order.id === orderId
                            ? { ...order, status: newStatus }
                            : order
                    )
                );
            }
        } catch (error) {
            console.error("Status update failed:", error);
        }
    }

    useEffect(() => {
        async function fetchOrders() {
            try {
                const res = await fetch("/api/admin/orders");
                const result = await res.json();

                console.log("Orders API result:", result);

                setOrders(result.orders || []);
            } catch (err) {
                console.error("Orders fetch failed:", err);
            }
        }

        fetchOrders();
    }, []);

    // STEP 5 - Add Debug Log
    console.log("Orders state:", orders);

    const getStatusClass = (status: string) => {
        switch (status) {
            case 'Pending': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
            case 'Shipped': return 'bg-primary/20 text-primary';
            case 'Completed': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400';
            case 'Processing': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
            default: return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-400';
        }
    };

    return (
        <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100">
            <AdminSidebar />

            <main className="flex-1 flex flex-col h-full bg-white dark:bg-background-dark/50 overflow-auto p-8">
                <div className="max-w-6xl w-full mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-black">Orders Management</h1>
                            <p className="text-slate-500 mt-1 text-sm">Real-time data from Admin API</p>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 border border-primary/10 rounded-xl overflow-hidden shadow-sm">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-primary/5 border-b border-primary/10">
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Order ID</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Customer</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Product Type</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Size/Shape</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Status</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Date</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-primary/5">
                                {/* STEP 4 — Render Orders */}
                                {orders.length > 0 ? (
                                    orders.map((order: any) => (
                                        <tr key={order.id} className="hover:bg-primary/5 transition-colors">
                                            <td className="px-6 py-4 text-sm font-semibold">{order.order_number}</td>
                                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 font-medium">{order.customer_name}</td>
                                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{order.product_type}</td>
                                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{order.size || order.keychain_shape}</td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(order.status)}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                                                {new Date(order.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => updateStatus(order.id, "In Progress")}
                                                    disabled={order.status === "In Progress"}
                                                    className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-lg font-bold hover:bg-primary hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    Set In Progress
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-10 text-center text-slate-500 italic">
                                            No orders yet
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
