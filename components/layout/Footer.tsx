import Link from 'next/link';
import React from 'react';

export function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-400 py-12 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6 md:px-20">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
                    <div className="flex items-center gap-2 text-white">
                        <span className="material-symbols-outlined text-primary text-3xl">palette</span>
                        <h2 className="text-xl font-bold tracking-tight">ArtGallery</h2>
                    </div>
                    <nav className="flex flex-wrap justify-center gap-8">
                        <Link href="/gallery" className="hover:text-primary transition-colors">Gallery</Link>
                        <Link href="/about" className="hover:text-primary transition-colors">About</Link>
                        <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
                        <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
                    </nav>
                    <div className="flex gap-4">
                        <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-primary hover:text-white transition-all text-white">
                            <span className="material-symbols-outlined text-sm">public</span>
                        </a>
                        <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-primary hover:text-white transition-all text-white">
                            <span className="material-symbols-outlined text-sm">share</span>
                        </a>
                        <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-primary hover:text-white transition-all text-white">
                            <span className="material-symbols-outlined text-sm">alternate_email</span>
                        </a>
                    </div>
                </div>
                <div className="text-center text-xs border-t border-white/5 pt-8">
                    © {new Date().getFullYear()} ArtGallery Boutique. Hand-painted with love. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
