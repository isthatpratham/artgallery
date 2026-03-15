'use client';
import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';

export function AnimatedImage({ className, onLoad, ...props }: ImageProps) {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <Image
            {...props}
            className={`transition-opacity duration-700 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className || ''}`}
            onLoad={(e) => {
                setIsLoaded(true);
                if (onLoad) onLoad(e);
            }}
        />
    );
}
