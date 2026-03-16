"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogoutButton } from './LogoutButton';

export function AdminSidebar() {
    const pathname = usePathname();

    function comingSoon(feature: string) {
        alert(feature + " feature is coming soon.");
    }

    const menuItems = [
        { name: 'Dashboard', href: '/admin/dashboard', icon: 'dashboard' },
        { name: 'Orders', href: '/admin/orders', icon: 'shopping_cart' },
        { name: 'Gallery', href: '/admin/gallery', icon: 'image' },
        { name: 'Pricing', href: '/admin/pricing', icon: 'sell' },
        { name: 'Products', href: '/admin/products', icon: 'inventory_2' },
        { name: 'Settings', href: '/admin/settings', icon: 'settings' },
    ];

    const isActive = (href: string) => pathname === href;

    return (
        <aside className="w-64 border-r border-primary/10 bg-background-light dark:bg-background-dark flex flex-col h-full shrink-0">
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
                {menuItems.map((item) => {
                    const active = isActive(item.href);
                    const isSettings = item.name === 'Settings';

                    const isComingSoon = ['Gallery', 'Pricing', 'Products'].includes(item.name);

                    const content = (
                        <div className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors cursor-pointer w-full text-left ${active
                            ? 'bg-primary text-white shadow-sm'
                            : 'text-slate-600 dark:text-slate-300 hover:bg-primary/10'
                            }`}>
                            <span className="material-symbols-outlined">{item.icon}</span>
                            <span className="text-sm font-medium">{item.name}</span>
                        </div>
                    );

                    if (isComingSoon) {
                        return (
                            <button key={item.name} onClick={() => comingSoon(item.name)} className="w-full block">
                                {content}
                            </button>
                        );
                    }

                    if (isSettings) {
                        return (
                            <div key={item.name} className="pt-4 mt-4 border-t border-primary/10">
                                <Link href={item.href}>
                                    {content}
                                </Link>
                            </div>
                        );
                    }

                    return (
                        <Link key={item.name} href={item.href}>
                            {content}
                        </Link>
                    );
                })}
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
                    <LogoutButton />
                </div>
            </div>
        </aside>
    );
}
