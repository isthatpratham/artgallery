'use client';
import React from 'react';
import Link from 'next/link';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';

export default function AdminLogin() {
    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
            <div className="layout-container flex h-full grow flex-col">
                {/* Navigation Header */}
                <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-primary/10 px-6 md:px-10 py-4 bg-background-light dark:bg-background-dark">
                    <div className="flex items-center gap-3 text-primary">
                        <span className="material-symbols-outlined text-3xl">palette</span>
                        <h2 className="text-slate-900 dark:text-slate-100 text-xl font-bold leading-tight tracking-tight">ArtGallery</h2>
                    </div>
                    <div>
                        <Link href="/gallery" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                            Back to Gallery
                        </Link>
                    </div>
                </header>

                {/* Main Content Area: Centered Login Card */}
                <main className="flex flex-1 items-center justify-center p-6 bg-background-light dark:bg-background-dark">
                    <div className="flex flex-col w-full max-w-[440px] bg-white dark:bg-slate-900/50 rounded-xl shadow-xl shadow-primary/5 overflow-hidden border border-primary/5">
                        {/* Card Header Image/Visual */}
                        <div className="w-full h-48 bg-primary/10 flex items-center justify-center relative">
                            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent"></div>
                            <div className="z-10 flex flex-col items-center">
                                <div className="p-4 rounded-full bg-white dark:bg-background-dark shadow-sm">
                                    <span className="material-symbols-outlined text-4xl text-primary">lock</span>
                                </div>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-slate-900 to-transparent"></div>
                        </div>

                        {/* Form Content */}
                        <div className="px-8 pb-10 pt-2">
                            <div className="text-center mb-8">
                                <h1 className="text-slate-900 dark:text-slate-100 text-2xl font-bold leading-tight">Admin Login</h1>
                                <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">Manage your collection and gallery settings</p>
                            </div>

                            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                                {/* Email Field */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold px-1">Email Address</label>
                                    <Input type="email" placeholder="admin@artgallery.com" icon="mail" />
                                </div>

                                {/* Password Field */}
                                <div className="flex flex-col gap-2">
                                    <div className="flex justify-between items-center px-1">
                                        <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold">Password</label>
                                        <a href="#" className="text-xs font-medium text-primary hover:underline">Forgot?</a>
                                    </div>
                                    <div className="relative flex items-stretch">
                                        <Input type="password" placeholder="••••••••" icon="key" className="pr-12" />
                                        <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors">
                                            <span className="material-symbols-outlined text-xl">visibility</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Remember Me Toggle */}
                                <div className="flex items-center gap-2 px-1 py-1">
                                    <input type="checkbox" id="remember" className="rounded border-primary/30 text-primary focus:ring-primary/20 w-4 h-4 bg-background-light dark:bg-background-dark" />
                                    <label htmlFor="remember" className="text-sm text-slate-600 dark:text-slate-400 cursor-pointer">Stay logged in for 30 days</label>
                                </div>

                                {/* Submit Button */}
                                <Link href="/admin/dashboard" className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/25 transition-all transform active:scale-[0.98] mt-4 flex items-center justify-center gap-2">
                                    <span>Sign In to Dashboard</span>
                                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                                </Link>
                            </form>

                            {/* Footer Links */}
                            <div className="mt-8 pt-6 border-t border-primary/5 text-center">
                                <p className="text-slate-500 dark:text-slate-400 text-xs">
                                    Restricted area for authorized personnel only.
                                    <br />
                                    Need access? <a href="#" className="text-primary font-semibold hover:underline">Contact System Admin</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Simple Footer */}
                <footer className="py-6 text-center bg-background-light dark:bg-background-dark">
                    <p className="text-slate-400 dark:text-slate-500 text-xs">
                        © 2024 ArtGallery CMS. All rights reserved.
                    </p>
                </footer>
            </div>
        </div>
    );
}
