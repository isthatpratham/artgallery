import React from 'react';
import { Navbar } from '../../../components/layout/Navbar';
import { Footer } from '../../../components/layout/Footer';
import { Button } from '../../../components/ui/Button';
import Link from 'next/link';
import Image from 'next/image';

export default function ArtworkDetail() {
    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
            <Navbar />
            <main className="flex-1 px-4 md:px-20 py-8 lg:py-12">
                <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Images Section */}
                    <div className="flex flex-col gap-4">
                        <div className="group relative aspect-[4/5] overflow-hidden rounded-xl bg-primary/5">
                            <Image
                                src="/images/gallery/gallery-6.webp"
                                alt="Main artwork"
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {[
                                '/images/gallery/gallery-7.webp',
                                '/images/gallery/gallery-8.webp',
                                '/images/gallery/gallery-9.webp',
                                '/images/gallery/gallery-10.webp'
                            ].map((src, i) => (
                                <div key={i} className="relative aspect-square rounded-lg border-2 border-transparent hover:border-primary opacity-60 hover:opacity-100 cursor-pointer transition-all overflow-hidden">
                                    <Image src={src} alt="Thumbnail view" fill className="object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="flex flex-col">
                        <div className="mb-8">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-primary/20 text-primary">Limited Edition</span>
                                <span className="text-slate-500 dark:text-slate-400 text-sm">SKU: AG-2024-ED</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-slate-100 leading-tight tracking-tight mb-2">Ethereal Dreams</h1>
                            <p className="text-xl text-primary font-medium">by Elena Rodriguez</p>
                        </div>

                        <div className="bg-primary/5 rounded-xl p-6 mb-8 border border-primary/10">
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">info</span>
                                Artwork Details
                            </h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center border-b border-primary/10 pb-2">
                                    <span className="text-slate-500 dark:text-slate-400 font-medium">Product Type</span>
                                    <span className="text-slate-900 dark:text-slate-100 font-bold">Original Oil on Canvas</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-primary/10 pb-2">
                                    <span className="text-slate-500 dark:text-slate-400 font-medium">Portrait Type</span>
                                    <span className="text-slate-900 dark:text-slate-100 font-bold">Landscape / Rectangle</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-primary/10 pb-2">
                                    <span className="text-slate-500 dark:text-slate-400 font-medium">Size</span>
                                    <span className="text-slate-900 dark:text-slate-100 font-bold">24 x 36 inches</span>
                                </div>
                                <div className="flex justify-between items-center pt-2">
                                    <span className="text-slate-500 dark:text-slate-400 font-medium">Price</span>
                                    <span className="text-3xl font-black text-primary">$1,250.00</span>
                                </div>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-lg font-bold mb-3">Description</h3>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                "Ethereal Dreams" explores the boundary between subconscious thought and visual reality. This piece uses heavy impasto techniques to create a physical depth that mirrors the emotional complexity of the subject matter. Each brushstroke is a deliberate movement capturing a fleeting moment of serenity amidst chaos.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                            <Link href="/order" className="flex-1 block">
                                <Button variant="primary" icon="shopping_cart" className="w-full h-full shadow-lg shadow-primary/20">
                                    Order This Artwork
                                </Button>
                            </Link>
                            <Link href="/contact" className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold py-4 px-6 rounded-xl hover:bg-opacity-90 transition-all shadow-lg shadow-green-500/20">
                                Contact on WhatsApp
                            </Link>
                        </div>

                        <div className="mt-8 flex flex-wrap items-center gap-6 p-4 border border-primary/10 rounded-xl">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">local_shipping</span>
                                <span className="text-sm font-medium">Free Shipping</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">verified</span>
                                <span className="text-sm font-medium">Authenticity Cert.</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">history</span>
                                <span className="text-sm font-medium">30-Day Returns</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* More from Artist */}
                <div className="mt-20 max-w-[1200px] mx-auto">
                    <h3 className="text-2xl font-bold mb-8">More from this artist</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { title: 'Silent Whispers', src: '/images/portraits/portraits-7.webp' },
                            { title: 'Azure Depths', src: '/images/keychains/keychains-4.webp' },
                            { title: 'Golden Hour', src: '/images/portraits/portraits-8.webp' },
                            { title: 'Morning Dew', src: '/images/keychains/keychains-5.webp' }
                        ].map((item) => (
                            <Link href="/artwork/1" key={item.title} className="group cursor-pointer">
                                <div className="relative aspect-square rounded-xl bg-primary/10 overflow-hidden mb-3">
                                    <Image src={item.src} alt={item.title} fill className="object-cover transition-transform group-hover:scale-110" />
                                </div>
                                <h4 className="font-bold text-sm">{item.title}</h4>
                                <p className="text-primary text-xs font-bold">$850.00</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
