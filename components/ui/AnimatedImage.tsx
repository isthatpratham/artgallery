'use client';
import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { Skeleton } from './Skeleton';

export function AnimatedImage({ className, onLoad, ...props }: ImageProps) {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <>
            {!isLoaded && <Skeleton className="absolute inset-0 z-0" />}
            <Image
                {...props}
                className={`transition-opacity duration-700 ease-in-out z-10 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className || ''}`}
                onLoad={(e) => {
                    setIsLoaded(true);
                    if (onLoad) onLoad(e);
                }}
            />
        </>
    );
}
