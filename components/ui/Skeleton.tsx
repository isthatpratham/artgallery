import React from 'react';

interface SkeletonProps {
    className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
    return (
        <div className={`bg-[#EAEAEA] dark:bg-slate-800 rounded-lg animate-pulse w-full h-full ${className}`} />
    );
}
