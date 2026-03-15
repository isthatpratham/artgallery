'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'icon' | 'ghost';

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "variant"> {
    variant?: ButtonVariant;
    className?: string;
    icon?: string;
    children?: React.ReactNode;
}

export function Button({ variant = 'primary', className = '', icon, children, ...props }: ButtonProps) {
    let baseClasses = 'transition-all inline-flex items-center justify-center gap-2 font-bold ';

    switch (variant) {
        case 'primary':
            baseClasses += 'bg-primary text-white hover:opacity-90 rounded-xl px-8 py-4 ';
            break;
        case 'secondary':
            baseClasses += 'bg-primary/5 text-slate-700 hover:bg-primary/10 dark:text-slate-300 dark:bg-primary/10 rounded-full px-6 py-2 ';
            break;
        case 'outline':
            baseClasses += 'bg-white dark:bg-slate-800 border border-primary/20 hover:bg-primary/5 rounded-xl px-8 py-4 ';
            break;
        case 'icon':
            baseClasses += 'p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-primary/10 hover:text-primary dark:hover:text-primary ';
            break;
        case 'ghost':
            baseClasses += 'bg-transparent text-primary hover:bg-primary/5 rounded-xl h-12 ';
            break;
    }

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className={`${baseClasses} ${className}`}
            {...props}
        >
            {children}
            {icon && <span className="material-symbols-outlined">{icon}</span>}
        </motion.button>
    );
}
