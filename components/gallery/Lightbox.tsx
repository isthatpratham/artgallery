'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedImage as Image } from '@/components/ui/AnimatedImage';

interface LightboxProps {
    src: string;
    alt: string;
    isOpen: boolean;
    onClose: () => void;
}

export function Lightbox({ src, alt, isOpen, onClose }: LightboxProps) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-black/80"
                        onClick={onClose}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="relative z-10 max-w-[90vw] max-h-[90vh] w-full h-full flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div className="relative w-full h-full pointer-events-auto flex items-center justify-center">
                            <Image
                                src={src}
                                alt={alt}
                                fill
                                className="object-contain"
                            />
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/80 rounded-full p-2 transition-colors flex items-center justify-center"
                                aria-label="Close Lightbox"
                            >
                                <span className="material-symbols-outlined text-2xl">close</span>
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
