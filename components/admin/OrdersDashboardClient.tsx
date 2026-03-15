'use client';
import React, { useState } from 'react';
import { AnimatedImage as Image } from '@/components/ui/AnimatedImage';
import { Dropdown } from '@/components/ui/Dropdown';
import { AdminSidebar } from './AdminSidebar';

export interface Order {
    id: string;
    order_number: string;
    customer_name: string;
    phone: string;
    address: string;
    product_type: string;
    portrait_type: string;
    size: string;
    keychain_shape: string;
    notes: string;
    reference_image: string;
    status: string;
    created_at: string;
}

interface OrdersDashboardClientProps {
    initialOrders: Order[];
    selectedOrder: Order | null;
    setSelectedOrder: (order: Order | null) => void;
}

export function OrdersDashboardClient({
    initialOrders,
    selectedOrder,
    setSelectedOrder
}: OrdersDashboardClientProps) {
    const [filter, setFilter] = useState('All Orders');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredOrders = initialOrders.filter(order => {
        const matchesFilter = filter === 'All Orders' || order.status === filter;
        const matchesSearch = order.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.order_number.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    // Use the explicitly selected order or fall back to the first one in filtered list
    const currentOrder = selectedOrder || filteredOrders[0];

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

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-full bg-white dark:bg-background-dark/50">
                {/* Header */}
                <header className="h-16 border-b border-primary/10 flex items-center justify-between px-8 bg-background-light dark:bg-background-dark">
                    <div className="flex items-center gap-4">
                        <h2 className="text-xl font-bold tracking-tight">Orders Management</h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
                            <input
                                type="text"
                                placeholder="Search orders..."
                                className="pl-10 pr-4 py-2 bg-primary/5 border-none focus:ring-2 focus:ring-primary rounded-xl text-sm w-64 outline-none"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <button className="size-10 rounded-xl bg-primary/5 text-slate-600 dark:text-slate-300 flex items-center justify-center hover:bg-primary/10 transition-colors">
                            <span className="material-symbols-outlined">notifications</span>
                        </button>
                    </div>
                </header>

                <div className="flex-1 flex overflow-hidden">
                    {/* Table View */}
                    <div className="flex-1 flex flex-col overflow-auto p-8">
                        <div className="flex items-end justify-between mb-8">
                            <div>
                                <h3 className="text-3xl font-black text-slate-900 dark:text-slate-50">Orders Overview</h3>
                                <p className="text-slate-500 dark:text-slate-400 mt-1">Manage and track all customer art orders</p>
                            </div>
                            <div className="w-48">
                                <Dropdown
                                    options={[
                                        { label: 'All Orders', value: 'All Orders' },
                                        { label: 'Pending', value: 'Pending' },
                                        { label: 'Processing', value: 'Processing' },
                                        { label: 'Shipped', value: 'Shipped' },
                                        { label: 'Completed', value: 'Completed' }
                                    ]}
                                    value={filter}
                                    onChange={setFilter}
                                />
                            </div>
                        </div>

                        {/* Table */}
                        <div className="bg-background-light dark:bg-background-dark border border-primary/10 rounded-xl overflow-hidden">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-primary/5 border-b border-primary/10">
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Order ID</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Customer</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Product Type</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Size/Shape</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Status</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-primary/5">
                                    {filteredOrders.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-10 text-center text-slate-500 dark:text-slate-400 italic">
                                                No orders yet
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredOrders.map((order) => (
                                            <tr
                                                key={order.id}
                                                onClick={() => setSelectedOrder(order)}
                                                className={`hover:bg-primary/5 transition-colors cursor-pointer ${currentOrder?.id === order.id ? 'bg-primary/5 border-l-4 border-primary' : ''}`}
                                            >
                                                <td className="px-6 py-4 text-sm font-semibold">{order.order_number}</td>
                                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 font-medium">{order.customer_name}</td>
                                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{order.product_type}</td>
                                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{order.size || order.keychain_shape}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(order.status)}`}>
                                                        {order.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{new Date(order.created_at).toLocaleDateString()}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                            <div className="px-6 py-4 bg-primary/5 flex items-center justify-between border-t border-primary/10">
                                <p className="text-xs text-slate-500 font-medium">Showing {filteredOrders.length} of {initialOrders.length} orders</p>
                                <div className="flex gap-2">
                                    <button className="px-3 py-1 bg-white dark:bg-background-dark border border-primary/10 rounded text-xs font-bold hover:bg-primary hover:text-white transition-colors">Prev</button>
                                    <button className="px-3 py-1 bg-white dark:bg-background-dark border border-primary/10 rounded text-xs font-bold hover:bg-primary hover:text-white transition-colors">Next</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order Detail Panel */}
                    <aside className="w-96 border-l border-primary/10 bg-background-light dark:bg-background-dark overflow-y-auto p-6 flex flex-col gap-6">
                        <div className="flex items-center justify-between">
                            <h4 className="font-bold text-lg">Order Detail</h4>
                            <button className="text-slate-400 hover:text-primary transition-colors">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        {currentOrder ? (
                            <>
                                <div className="space-y-4">
                                    <div className="aspect-square w-full rounded-xl overflow-hidden border border-primary/10 relative group">
                                        <Image src={currentOrder.reference_image || "/images/gallery/gallery-2.jpg"} alt="Order Detail Reference" fill className="object-cover" />
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <a
                                                href={currentOrder.reference_image}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="bg-white text-primary px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2"
                                            >
                                                <span className="material-symbols-outlined text-sm">zoom_in</span>
                                                View Reference
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Reference Photo</span>
                                        <span className="text-[10px] text-slate-400 truncate max-w-[150px]">{currentOrder.order_number}_ref.jpg</span>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-slate-500 font-medium">Status</span>
                                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${getStatusClass(currentOrder.status)}`}>{currentOrder.status}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-slate-500 font-medium">Order ID</span>
                                            <span className="text-sm font-bold">{currentOrder.order_number}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-slate-500 font-medium">Customer</span>
                                            <span className="text-sm font-bold">{currentOrder.customer_name}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-slate-500 font-medium">Phone</span>
                                            <span className="text-sm font-bold">{currentOrder.phone}</span>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Configuration</h5>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="p-3 bg-white dark:bg-background-dark/30 border border-primary/10 rounded-xl">
                                                <p className="text-[10px] text-slate-500 font-medium mb-1">Product</p>
                                                <p className="text-sm font-bold truncate">{currentOrder.product_type}</p>
                                            </div>
                                            <div className="p-3 bg-white dark:bg-background-dark/30 border border-primary/10 rounded-xl">
                                                <p className="text-[10px] text-slate-500 font-medium mb-1">Type/Shape</p>
                                                <p className="text-sm font-bold truncate">{currentOrder.portrait_type || currentOrder.keychain_shape}</p>
                                            </div>
                                            <div className="p-3 bg-white dark:bg-background-dark/30 border border-primary/10 rounded-xl">
                                                <p className="text-[10px] text-slate-500 font-medium mb-1">Size</p>
                                                <p className="text-sm font-bold truncate">{currentOrder.size || 'N/A'}</p>
                                            </div>
                                            <div className="p-3 bg-white dark:bg-background-dark/30 border border-primary/10 rounded-xl">
                                                <p className="text-[10px] text-slate-500 font-medium mb-1">Date</p>
                                                <p className="text-sm font-bold truncate">{new Date(currentOrder.created_at).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Shipping Address</h5>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed bg-primary/5 p-4 rounded-xl border-l-2 border-primary">
                                            {currentOrder.address}
                                        </p>
                                    </div>

                                    {currentOrder.notes && (
                                        <div className="space-y-3">
                                            <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Customer Notes</h5>
                                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed italic bg-primary/5 p-4 rounded-xl border-l-2 border-primary">
                                                "{currentOrder.notes}"
                                            </p>
                                        </div>
                                    )}

                                    <div className="flex gap-2 pt-4 border-t border-primary/10">
                                        <button className="flex-1 bg-primary text-white py-3 rounded-xl font-bold text-sm shadow-md shadow-primary/20 hover:scale-[1.02] transition-transform">Update Status</button>
                                        <a
                                            href={`tel:${currentOrder.phone}`}
                                            className="px-4 bg-primary/10 text-primary py-3 rounded-xl font-bold text-sm hover:bg-primary/20 transition-colors flex items-center justify-center"
                                        >
                                            <span className="material-symbols-outlined">call</span>
                                        </a>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex-1 flex items-center justify-center text-slate-400 italic text-sm">
                                Select an order to see details
                            </div>
                        )}
                    </aside>
                </div>
            </main>
        </div>
    );
}
