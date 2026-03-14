import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

interface ArtworkCardProps {
    id: string;
    imageSrc: string;
    imageAlt: string;
    category: string;
    title: string;
    aspectRatio?: 'aspect-[4/5]' | 'aspect-[1/1]' | 'aspect-[3/4]' | 'aspect-[3/2]';
}

export function ArtworkCard({
    id,
    imageSrc,
    imageAlt,
    category,
    title,
    aspectRatio = 'aspect-[4/5]'
}: ArtworkCardProps) {
    return (
        <div className="masonry-item artwork-card group cursor-pointer overflow-hidden rounded-xl bg-white dark:bg-slate-900 transition-all duration-500 hover:shadow-2xl">
            <Link href={`/artwork/${id}`}>
                <div className={`relative overflow-hidden ${aspectRatio}`}>
                    <Image
                        src={imageSrc}
                        alt={imageAlt}
                        fill
                        className="object-cover transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 z-10">
                        <p className="text-white text-sm font-medium mb-1">{category}</p>
                        <h3 className="text-white text-xl font-bold">{title}</h3>
                    </div>
                </div>
            </Link>
        </div>
    );
}
