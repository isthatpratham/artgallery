'use client';

import Link from 'next/link';
import React from 'react';
import { AnimatedImage as Image } from '@/components/ui/AnimatedImage';
import { motion } from 'framer-motion';

interface ArtworkCardProps {
    id: string;
    imageSrc: string;
    imageAlt: string;
    category: string;
    title: string;
    aspectRatio?: 'aspect-[4/5]' | 'aspect-[1/1]' | 'aspect-[3/4]' | 'aspect-[3/2]';
    onClick?: (e: React.MouseEvent) => void;
    priority?: boolean;
    sizes?: string;
}

export function ArtworkCard({
    id,
    imageSrc,
    imageAlt,
    category,
    title,
    aspectRatio = 'aspect-[4/5]',
    onClick,
    priority = false,
    sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
}: ArtworkCardProps) {
    const content = (
        <div className={`relative overflow-hidden ${aspectRatio}`}>
            <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                priority={priority}
                sizes={sizes}
                className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 z-10">
                <p className="text-white text-sm font-medium mb-1">{category}</p>
                <h3 className="text-white text-xl font-bold">{title}</h3>
            </div>
        </div>
    );

    return (
        <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="masonry-item artwork-card group cursor-pointer overflow-hidden rounded-xl bg-white dark:bg-slate-900 shadow-sm hover:shadow-2xl"
            onClick={onClick}
        >
            {onClick ? content : <Link href={`/artwork/${id}`}>{content}</Link>}
        </motion.div>
    );
}
