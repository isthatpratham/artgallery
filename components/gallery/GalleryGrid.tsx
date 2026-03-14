import React from 'react';

interface GalleryGridProps {
    children: React.ReactNode;
}

export function GalleryGrid({ children }: GalleryGridProps) {
    return (
        <section className="masonry-grid">
            {children}
        </section>
    );
}
