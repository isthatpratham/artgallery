'use client';

import React, { useState } from 'react';
import { Lightbox } from './Lightbox';

interface GalleryGridProps {
    children: React.ReactNode;
}

export function GalleryGrid({ children }: GalleryGridProps) {
    const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);

    const handleChildClick = (src: string, alt: string) => {
        setSelectedImage({ src, alt });
    };

    const mappedChildren = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, {
                onClick: (e: React.MouseEvent) => {
                    e.preventDefault();
                    handleChildClick(child.props.imageSrc, child.props.imageAlt);
                }
            } as React.HTMLAttributes<HTMLElement>);
        }
        return child;
    });

    return (
        <>
            <section className="masonry-grid">
                {mappedChildren}
            </section>

            <Lightbox
                src={selectedImage?.src || ''}
                alt={selectedImage?.alt || ''}
                isOpen={!!selectedImage}
                onClose={() => setSelectedImage(null)}
            />
        </>
    );
}
