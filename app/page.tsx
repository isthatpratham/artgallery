'use client';
import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';

export default function Home() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 320; // Card width + gap
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
            <Navbar />
            <main className="flex-1">
                {/* Hero Section */}
                <section className="max-w-7xl mx-auto px-6 md:px-20 py-12 md:py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="flex flex-col gap-8">
                            <div className="space-y-4">
                                <span className="text-primary font-semibold tracking-wider uppercase text-sm">Bespoke Boutique Art</span>
                                <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tight text-slate-900 dark:text-slate-100">
                                    Turn Your Memories Into <span className="text-primary">Hand-Painted</span> Art
                                </h1>
                                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
                                    Experience the magic of bespoke hand-painted portraits and custom accessories crafted by master artists. Every brushstroke tells your story.
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-4">
                                <Link href="/order"><Button variant="primary" icon="arrow_forward">Order Your Custom Art</Button></Link>
                                <Link href="/gallery"><Button variant="outline">Explore Gallery</Button></Link>
                            </div>
                        </div>
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-primary/20 rounded-xl blur-2xl group-hover:bg-primary/30 transition-all"></div>
                            <div className="relative aspect-square rounded-xl border-4 border-white dark:border-slate-800 shadow-2xl overflow-hidden">
                                <Image
                                    src="/images/hero/hero-11.jpg"
                                    alt="Turn Your Memories Into Hand-Painted Art"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Featured Artworks Carousel */}
                <section className="bg-primary/5 py-20">
                    <div className="max-w-7xl mx-auto px-6 md:px-20">
                        <div className="flex justify-between items-end mb-10">
                            <div>
                                <h2 className="text-3xl font-bold">Featured Artworks</h2>
                                <p className="text-slate-500">Recently completed commissions and bestsellers</p>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => scroll('left')} className="p-2 border border-primary/20 rounded-full hover:bg-primary hover:text-white transition-colors">
                                    <span className="material-symbols-outlined">chevron_left</span>
                                </button>
                                <button onClick={() => scroll('right')} className="p-2 border border-primary/20 rounded-full hover:bg-primary hover:text-white transition-colors">
                                    <span className="material-symbols-outlined">chevron_right</span>
                                </button>
                            </div>
                        </div>
                        <div ref={scrollContainerRef} className="flex gap-6 overflow-x-auto pb-8 snap-x no-scrollbar">
                            {[
                                { title: 'Classic Portraits', src: '/images/portraits/portraits-2.jpg' },
                                { title: 'Custom Pet Keychains', src: '/images/keychains/keychains-3.jpg' },
                                { title: 'Nature Miniatures', src: '/images/gallery/gallery-4.jpg' },
                                { title: 'Anniversary Specials', src: '/images/portraits/portraits-3.webp' }
                            ].map((item, i) => (
                                <div key={i} className="min-w-[300px] snap-start bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm">
                                    <div className="relative aspect-[3/4] rounded-lg mb-4 overflow-hidden">
                                        <Image src={item.src} alt={item.title} fill className="object-cover" />
                                    </div>
                                    <h3 className="font-bold">{item.title}</h3>
                                    <p className="text-sm text-slate-500">Hand-crafted selection</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Portrait Sizes & Pricing */}
                <section className="max-w-7xl mx-auto px-6 md:px-20 py-20">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black mb-4">Available Portrait Sizes</h2>
                        <p className="text-slate-500 max-w-2xl mx-auto">Choose the perfect canvas size for your space. All portraits are hand-painted using premium oil or acrylic paints.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Standard Pricing Card */}
                        <div className="border border-primary/10 p-8 rounded-xl flex flex-col items-center text-center hover:shadow-xl transition-shadow bg-white dark:bg-slate-800">
                            <span className="material-symbols-outlined text-primary text-5xl mb-4">person</span>
                            <h3 className="text-xl font-bold mb-2">4x4 Solo</h3>
                            <p className="text-slate-500 mb-6">Perfect for single face detail portraits</p>
                            <div className="text-3xl font-black text-primary mb-8">₹250</div>
                            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400 mb-8 w-full text-left">
                                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-green-500 text-sm">check_circle</span> 3-5 days delivery</li>
                                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-green-500 text-sm">check_circle</span> Premium canvas paper</li>
                            </ul>
                            <Link href="/order" className="w-full block"><Button variant="outline" className="w-full">Select Size</Button></Link>
                        </div>
                        {/* Popular Pricing Card */}
                        <div className="border-2 border-primary p-8 rounded-xl flex flex-col items-center text-center shadow-2xl bg-white dark:bg-slate-800 relative">
                            <div className="absolute -top-4 bg-primary text-white px-4 py-1 rounded-full text-sm font-bold">Most Popular</div>
                            <span className="material-symbols-outlined text-primary text-5xl mb-4">group</span>
                            <h3 className="text-xl font-bold mb-2">4x6 Couple</h3>
                            <p className="text-slate-500 mb-6">Ideal for anniversaries and close memories</p>
                            <div className="text-3xl font-black text-primary mb-8">₹300</div>
                            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400 mb-8 w-full text-left">
                                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-green-500 text-sm">check_circle</span> 5-7 days delivery</li>
                                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-green-500 text-sm">check_circle</span> Stretched wooden frame</li>
                            </ul>
                            <Link href="/order" className="w-full block"><Button variant="primary" className="w-full h-14">Select Size</Button></Link>
                        </div>
                        {/* Large Pricing Card */}
                        <div className="border border-primary/10 p-8 rounded-xl flex flex-col items-center text-center hover:shadow-xl transition-shadow bg-white dark:bg-slate-800">
                            <span className="material-symbols-outlined text-primary text-5xl mb-4">family_restroom</span>
                            <h3 className="text-xl font-bold mb-2">6x6 Family</h3>
                            <p className="text-slate-500 mb-6">Capture the whole family in one frame</p>
                            <div className="text-3xl font-black text-primary mb-8">₹400</div>
                            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400 mb-8 w-full text-left">
                                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-green-500 text-sm">check_circle</span> 7-10 days delivery</li>
                                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-green-500 text-sm">check_circle</span> Large canvas frame</li>
                            </ul>
                            <Link href="/order" className="w-full block"><Button variant="outline" className="w-full">Select Size</Button></Link>
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
}
