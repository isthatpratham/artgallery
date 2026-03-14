import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: string;
    containerClassName?: string;
}

export function Input({ icon, className = '', containerClassName = '', ...props }: InputProps) {
    const inputClasses = `rounded-lg border-primary/20 bg-background-light dark:bg-slate-800 dark:text-slate-100 focus:border-primary focus:ring-1 focus:ring-primary py-3 px-4 outline-none transition-all w-full ${icon ? 'pl-12' : ''} ${className}`;

    if (icon) {
        return (
            <div className={`relative ${containerClassName}`}>
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                    {icon}
                </span>
                <input className={inputClasses} {...props} />
            </div>
        );
    }

    return <input className={inputClasses} {...props} />;
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    containerClassName?: string;
}

export function Textarea({ className = '', ...props }: TextareaProps) {
    return (
        <textarea
            className={`rounded-lg border-primary/20 bg-background-light dark:bg-slate-800 dark:text-slate-100 focus:border-primary focus:ring-1 focus:ring-primary py-3 px-4 outline-none transition-all w-full resize-none ${className}`}
            {...props}
        />
    );
}
