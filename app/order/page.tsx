'use client';
import React from 'react';
import Link from 'next/link';
import { Navbar } from '../../components/layout/Navbar';
import { OrderForm } from '../../components/order/OrderForm';

export default function OrderPage() {
    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
            <Navbar />
            <main className="flex flex-1 justify-center py-10 px-6">
                <div className="flex flex-col max-w-[800px] flex-1">
                    <div className="flex flex-col gap-2 mb-8">
                        <h1 className="text-slate-900 dark:text-slate-100 text-4xl font-black leading-tight tracking-tight">Place Your Order</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-base font-normal">Fill in the details below to start your custom handcrafted commission.</p>
                    </div>
                    <OrderForm />
                </div>
            </main>
            <footer className="py-8 px-4 border-t border-primary/10 text-center">
                <div className="flex items-center justify-center gap-2 text-primary/60 mb-2">
                    <span className="material-symbols-outlined text-sm">palette</span>
                    <span className="text-xs font-bold uppercase tracking-widest">ArtGallery Studios</span>
                </div>
                <p className="text-xs text-slate-400">© 2024 ArtGallery. All rights reserved.</p>
            </footer>
        </div>
    );
}
