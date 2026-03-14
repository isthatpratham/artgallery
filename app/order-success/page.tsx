import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '../../components/ui/Button';

export default function OrderSuccess() {
    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
            {/* Navigation Header */}
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-primary/10 px-6 py-4 lg:px-40">
                <div className="flex items-center gap-3 text-primary">
                    <span className="material-symbols-outlined text-3xl">palette</span>
                    <h2 className="text-slate-900 dark:text-slate-100 text-xl font-bold leading-tight tracking-tight">ArtGallery</h2>
                </div>
                <Link href="/" className="flex items-center justify-center rounded-full h-10 w-10 bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                    <span className="material-symbols-outlined">close</span>
                </Link>
            </header>

            {/* Main Content Container */}
            <main className="flex flex-1 justify-center py-10 px-4">
                <div className="flex flex-col max-w-[480px] w-full gap-8">
                    {/* Success Visual & Message */}
                    <div className="flex flex-col items-center gap-6 text-center">
                        <div className="relative">
                            <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center">
                                <span className="material-symbols-outlined text-primary text-5xl">task_alt</span>
                            </div>
                            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full border-4 border-background-light dark:border-background-dark"></div>
                        </div>
                        <div className="space-y-3">
                            <h1 className="text-slate-900 dark:text-slate-100 text-2xl font-bold leading-tight">Your order request has been created.</h1>
                            <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
                                Thank you for your interest! Our team will get back to you shortly to finalize the shipping and payment details.
                            </p>
                        </div>
                    </div>

                    {/* Order Summary Card */}
                    <div className="bg-white dark:bg-slate-800/50 rounded-xl p-6 border border-primary/10 shadow-sm">
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between items-center pb-4 border-b border-primary/5">
                                <span className="text-slate-500 dark:text-slate-400 font-medium">Order Number</span>
                                <span className="text-slate-900 dark:text-slate-100 font-bold font-mono">#AG-88291</span>
                            </div>
                            {/* Placeholder for ordered item preview */}
                            <div className="flex items-center gap-4 py-2">
                                <div className="relative size-16 rounded-lg overflow-hidden">
                                    <Image src="/images/gallery/gallery-11.webp" alt="Ordered Item Thumbnail" fill className="object-cover" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-slate-900 dark:text-slate-100 font-semibold">Ethereal Horizons</span>
                                    <span className="text-slate-500 dark:text-slate-400 text-sm">Original Canvas, 24x36"</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3">
                        <Button variant="primary" className="w-full h-14" icon="chat">
                            Confirm Order on WhatsApp
                        </Button>
                        <Link href="/gallery" className="flex items-center justify-center w-full h-12 bg-transparent text-primary hover:bg-primary/5 rounded-xl font-semibold transition-colors">
                            Back to Gallery
                        </Link>
                    </div>

                    {/* Helpful Footer */}
                    <div className="text-center">
                        <p className="text-slate-400 dark:text-slate-500 text-xs">
                            A copy of this request has been sent to your registered email.
                        </p>
                    </div>
                </div>
            </main>

            {/* Footer Decorative Element */}
            <footer className="py-8 flex justify-center">
                <div className="flex gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/30"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/30"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/30"></div>
                </div>
            </footer>
        </div>
    );
}
