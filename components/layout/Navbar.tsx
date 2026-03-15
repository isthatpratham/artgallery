'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NavLink = ({ href, children, className = '' }: { href: string; children: React.ReactNode; className?: string }) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <Link
            href={href}
            className={`relative text-sm font-medium hover:text-primary transition-colors py-1 ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {children}
            <motion.span
                className="absolute left-0 right-0 -bottom-1 h-0.5 bg-primary origin-center"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isHovered ? 1 : 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
            />
        </Link>
    );
};

export function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-6 md:px-20 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-12">
                    <Link href="/" className="flex items-center gap-2 text-primary hover:opacity-90 transition-opacity">
                        <span className="material-symbols-outlined text-3xl">palette</span>
                        <h2 className="text-slate-900 dark:text-slate-100 text-xl font-bold tracking-tight">ArtGallery</h2>
                    </Link>
                    <nav className="hidden md:flex items-center gap-8">
                        <NavLink href="/gallery">Gallery</NavLink>
                        <NavLink href="/about">About</NavLink>
                        <NavLink href="/contact">Contact</NavLink>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.2 }}>
                            <Link href="/order" className="bg-[#D47A6A] text-white rounded-lg px-4 py-2 hover:bg-[#C06A5A] transition-colors text-sm font-medium shadow-sm inline-block">Order</Link>
                        </motion.div>
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden sm:flex items-center bg-primary/5 rounded-xl px-3 py-1.5 border border-primary/10">
                        <span className="material-symbols-outlined text-primary text-xl">search</span>
                        <input
                            type="text"
                            placeholder="Search art..."
                            className="bg-transparent border-none focus:ring-0 text-sm w-32 lg:w-48 placeholder:text-slate-400 outline-none"
                        />
                    </div>
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="p-2 hover:bg-primary/10 rounded-xl transition-colors text-slate-700 dark:text-slate-300">
                        <span className="material-symbols-outlined">shopping_cart</span>
                    </motion.button>
                    <Link href="/admin/login" className="hidden sm:inline-block">
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex p-2 hover:bg-primary/10 rounded-xl transition-colors text-slate-700 dark:text-slate-300">
                            <span className="material-symbols-outlined">account_circle</span>
                        </motion.button>
                    </Link>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="md:hidden p-2 hover:bg-primary/10 rounded-xl transition-colors text-slate-700 dark:text-slate-300"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <span className="material-symbols-outlined">{isMobileMenuOpen ? 'close' : 'menu'}</span>
                    </motion.button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="md:hidden mt-4 p-4 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-primary/10 flex flex-col gap-4 origin-top"
                    >
                        <Link href="/gallery" className="text-sm font-medium hover:text-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Gallery</Link>
                        <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
                        <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
                        <Link href="/admin/login" className="text-sm font-medium hover:text-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Admin Login</Link>
                        <Link href="/order" className="bg-[#D47A6A] text-white rounded-lg px-4 py-2 hover:bg-[#C06A5A] transition-all duration-300 text-sm font-medium text-center shadow-sm" onClick={() => setIsMobileMenuOpen(false)}>Order</Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
