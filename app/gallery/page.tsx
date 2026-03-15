'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { Button } from '../../components/ui/Button';
import { GalleryGrid } from '../../components/gallery/GalleryGrid';
import { ArtworkCard } from '../../components/gallery/ArtworkCard';
import { Dropdown } from '../../components/ui/Dropdown';

export default function Gallery() {
    const [category, setCategory] = useState('All Works');
    const artworks = [
        { id: '1', title: 'The Silent Gaze', category: 'Portraits', aspectRatio: 'aspect-[4/5]' as const, src: '/images/portraits/portraits-1.jpg' },
        { id: '2', title: 'Oceanic Tides', category: 'Keychains', aspectRatio: 'aspect-[1/1]' as const, src: '/images/keychains/keychains-1.jpg' },
        { id: '3', title: 'Midnight Reverie', category: 'Solo Portraits', aspectRatio: 'aspect-[3/4]' as const, src: '/images/gallery/gallery-2.jpg' },
        { id: '4', title: 'Eternal Bond', category: 'Couple Portraits', aspectRatio: 'aspect-[4/5]' as const, src: '/images/portraits/portraits-4.webp' },
        { id: '5', title: 'The Library Corner', category: 'Gallery Space', aspectRatio: 'aspect-[3/2]' as const, src: '/images/gallery/gallery-5.webp' },
        { id: '6', title: 'Generations', category: 'Family Portraits', aspectRatio: 'aspect-[1/1]' as const, src: '/images/portraits/portraits-6.webp' },
    ];

    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
            <Navbar />
            <main className="mx-auto w-full max-w-7xl px-6 lg:px-20 py-12">
                <section className="mb-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                        <div className="max-w-2xl">
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight">Art Collection</h2>
                            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                Discover a curated selection of contemporary masterpieces, from soul-stirring portraits to delicate handmade keepsakes.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center pb-4 w-64">
                        <Dropdown
                            options={[
                                { label: 'All Works', value: 'All Works' },
                                { label: 'Portraits', value: 'Portraits' },
                                { label: 'Keychains', value: 'Keychains' },
                                { label: 'Solo Portraits', value: 'Solo Portraits' },
                                { label: 'Couple Portraits', value: 'Couple Portraits' },
                                { label: 'Family Portraits', value: 'Family Portraits' }
                            ]}
                            value={category}
                            onChange={setCategory}
                        />
                    </div>
                </section>

                <GalleryGrid>
                    {artworks.map((art) => (
                        <ArtworkCard
                            key={art.id}
                            id={art.id}
                            imageSrc={art.src}
                            imageAlt={art.title}
                            category={art.category}
                            title={art.title}
                            aspectRatio={art.aspectRatio}
                        />
                    ))}
                </GalleryGrid>

                <div className="mt-20 border-t border-primary/10 pt-12 text-center">
                    <p className="text-slate-500 dark:text-slate-400 mb-6">Can't find what you're looking for?</p>
                    <Link href="/order" className="inline-block">
                        <Button variant="primary" icon="auto_awesome" className="px-10 py-4 shadow-xl shadow-primary/20">
                            Request Custom Commission
                        </Button>
                    </Link>
                </div>
            </main>
            <Footer />
        </div>
    );
}
