'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { AnimatedImage as Image } from '@/components/ui/AnimatedImage';
import { Dropdown } from '../../../components/ui/Dropdown';

export default function AdminDashboard() {
    const router = useRouter();
    const [filter, setFilter] = useState('All Orders');

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/admin/login');
    };
    return (
        <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100">
            {/* Sidebar */}
            <aside className="w-64 border-r border-primary/10 bg-background-light dark:bg-background-dark flex flex-col">
                <div className="p-6 flex items-center gap-3">
                    <div className="size-10 rounded-full bg-primary flex items-center justify-center text-white">
                        <span className="material-symbols-outlined">palette</span>
                    </div>
                    <div>
                        <h1 className="text-lg font-bold leading-none">ArtGallery</h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Management Portal</p>
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-2 py-4">
                    <Link href="#" className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-300 hover:bg-primary/10 rounded-lg transition-colors">
                        <span className="material-symbols-outlined">dashboard</span>
                        <span className="text-sm font-medium">Dashboard</span>
                    </Link>
                    <Link href="#" className="flex items-center gap-3 px-3 py-2 bg-primary text-white rounded-lg shadow-sm">
                        <span className="material-symbols-outlined">shopping_cart</span>
                        <span className="text-sm font-medium">Orders</span>
                    </Link>
                    <Link href="#" className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-300 hover:bg-primary/10 rounded-lg transition-colors">
                        <span className="material-symbols-outlined">image</span>
                        <span className="text-sm font-medium">Gallery</span>
                    </Link>
                    <Link href="#" className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-300 hover:bg-primary/10 rounded-lg transition-colors">
                        <span className="material-symbols-outlined">sell</span>
                        <span className="text-sm font-medium">Pricing</span>
                    </Link>
                    <Link href="#" className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-300 hover:bg-primary/10 rounded-lg transition-colors">
                        <span className="material-symbols-outlined">inventory_2</span>
                        <span className="text-sm font-medium">Products</span>
                    </Link>
                    <div className="pt-4 mt-4 border-t border-primary/10">
                        <Link href="#" className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-300 hover:bg-primary/10 rounded-lg transition-colors">
                            <span className="material-symbols-outlined">settings</span>
                            <span className="text-sm font-medium">Settings</span>
                        </Link>
                    </div>
                </nav>

                <div className="p-4 border-t border-primary/10">
                    <div className="flex items-center justify-between p-2 rounded-lg bg-primary/5">
                        <div className="flex items-center gap-3 overflow-hidden">
                            <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                                <span className="material-symbols-outlined text-sm">person</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-bold truncate">Admin User</p>
                                <p className="text-[10px] text-slate-500 truncate">admin@artgallery.com</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-400 hover:text-red-500 rounded-lg transition-all tooltip-trigger relative group"
                            title="Sign Out"
                        >
                            <span className="material-symbols-outlined text-xl">logout</span>
                        </button>
                    </div>
                </div>
            </aside>

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
                            <input type="text" placeholder="Search orders..." className="pl-10 pr-4 py-2 bg-primary/5 border-none focus:ring-2 focus:ring-primary rounded-xl text-sm w-64 outline-none" />
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
                                        { label: 'Shipped', value: 'Shipped' }
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
                                    {[
                                        { id: '#1024', name: 'Alice Johnson', type: 'Canvas Print', size: '24x36 Rect', status: 'Pending', date: 'Oct 12, 2023', statusClass: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' },
                                        { id: '#1023', name: 'Bob Smith', type: 'Digital Art', size: 'Square', status: 'In Progress', date: 'Oct 11, 2023', statusClass: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400', active: true },
                                        { id: '#1022', name: 'Charlie Brown', type: 'Oil Painting', size: '18x24 Oval', status: 'Completed', date: 'Oct 10, 2023', statusClass: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' },
                                        { id: '#1021', name: 'Diana Prince', type: 'Sketch', size: 'A4 Portrait', status: 'Shipped', date: 'Oct 09, 2023', statusClass: 'bg-primary/20 text-primary' },
                                    ].map((order, i) => (
                                        <tr key={i} className={`hover:bg-primary/5 transition-colors cursor-pointer ${order.active ? 'bg-primary/5 border-l-4 border-primary' : ''}`}>
                                            <td className="px-6 py-4 text-sm font-semibold">{order.id}</td>
                                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 font-medium">{order.name}</td>
                                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{order.type}</td>
                                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{order.size}</td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.statusClass}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{order.date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="px-6 py-4 bg-primary/5 flex items-center justify-between border-t border-primary/10">
                                <p className="text-xs text-slate-500 font-medium">Showing 4 of 124 orders</p>
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

                        <div className="space-y-4">
                            <div className="aspect-square w-full rounded-xl overflow-hidden border border-primary/10 relative group">
                                <Image src="/images/gallery/gallery-2.jpg" alt="Order Detail Reference" fill className="object-cover" />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="bg-white text-primary px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2">
                                        <span className="material-symbols-outlined text-sm">zoom_in</span>
                                        View Reference
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Reference Photo</span>
                                <span className="text-[10px] text-slate-400">IMG_20231011.jpg</span>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-slate-500 font-medium">Status</span>
                                    <span className="px-2 py-0.5 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 rounded-full text-[10px] font-bold uppercase">In Progress</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-slate-500 font-medium">Order ID</span>
                                    <span className="text-sm font-bold">#1023</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-slate-500 font-medium">Customer</span>
                                    <span className="text-sm font-bold">Bob Smith</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Configuration</h5>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="p-3 bg-white dark:bg-background-dark/30 border border-primary/10 rounded-xl">
                                        <p className="text-[10px] text-slate-500 font-medium mb-1">Product</p>
                                        <p className="text-sm font-bold truncate">Digital Art</p>
                                    </div>
                                    <div className="p-3 bg-white dark:bg-background-dark/30 border border-primary/10 rounded-xl">
                                        <p className="text-[10px] text-slate-500 font-medium mb-1">Size</p>
                                        <p className="text-sm font-bold truncate">Square</p>
                                    </div>
                                    <div className="p-3 bg-white dark:bg-background-dark/30 border border-primary/10 rounded-xl">
                                        <p className="text-[10px] text-slate-500 font-medium mb-1">Frame</p>
                                        <p className="text-sm font-bold truncate">Minimalist Oak</p>
                                    </div>
                                    <div className="p-3 bg-white dark:bg-background-dark/30 border border-primary/10 rounded-xl">
                                        <p className="text-[10px] text-slate-500 font-medium mb-1">Amount</p>
                                        <p className="text-sm font-bold truncate">$240.00</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Customer Notes</h5>
                                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed italic bg-primary/5 p-4 rounded-xl border-l-2 border-primary">
                                    "Please emphasize the blue tones in the background. This is a gift for my daughter's new apartment."
                                </p>
                            </div>

                            <div className="flex gap-2 pt-4 border-t border-primary/10">
                                <button className="flex-1 bg-primary text-white py-3 rounded-xl font-bold text-sm shadow-md shadow-primary/20 hover:scale-[1.02] transition-transform">Update Status</button>
                                <button className="px-4 bg-primary/10 text-primary py-3 rounded-xl font-bold text-sm hover:bg-primary/20 transition-colors flex items-center justify-center">
                                    <span className="material-symbols-outlined">mail</span>
                                </button>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
}
