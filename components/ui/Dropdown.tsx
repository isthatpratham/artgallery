'use client';
import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface DropdownOption {
    label: string;
    value: string;
}

export interface DropdownProps {
    options: DropdownOption[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

export function Dropdown({ options, value, onChange, placeholder = 'Select...', className = '' }: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find((opt) => opt.value === value);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (isOpen) {
            const idx = options.findIndex((opt) => opt.value === value);
            setFocusedIndex(idx >= 0 ? idx : 0);
        }
    }, [isOpen, value, options]);

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    const handleSelect = (optionValue: string) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (!isOpen) {
                setIsOpen(true);
            } else if (focusedIndex >= 0 && focusedIndex < options.length) {
                handleSelect(options[focusedIndex].value);
            }
        } else if (e.key === 'Escape') {
            setIsOpen(false);
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (!isOpen) setIsOpen(true);
            else setFocusedIndex((prev) => (prev + 1) % options.length);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (!isOpen) setIsOpen(true);
            else setFocusedIndex((prev) => (prev - 1 + options.length) % options.length);
        }
    };

    return (
        <div className={`relative w-full ${className}`} ref={dropdownRef} onKeyDown={handleKeyDown}>
            <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                onClick={toggleDropdown}
                className="flex w-full items-center justify-between rounded-lg border border-[#EAEAEA] dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-left text-sm text-slate-800 dark:text-slate-100 transition-colors hover:bg-[#F7F4F1] dark:hover:bg-slate-700 outline-none focus:ring-2 focus:ring-[#EAEAEA] dark:focus:ring-slate-600 shadow-sm"
            >
                <span className="block truncate">{selectedOption ? selectedOption.label : placeholder}</span>
                <span className={`material-symbols-outlined text-sm text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    expand_more
                </span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                        className="absolute z-50 mt-1 w-full overflow-hidden rounded-lg border border-[#EAEAEA] dark:border-slate-700 bg-white dark:bg-slate-800 shadow-md origin-top"
                        role="listbox"
                    >
                        <ul className="max-h-60 overflow-auto py-1 outline-none text-sm">
                            {options.map((option, index) => (
                                <li
                                    key={option.value}
                                    role="option"
                                    aria-selected={option.value === value}
                                    onClick={() => handleSelect(option.value)}
                                    onMouseEnter={() => setFocusedIndex(index)}
                                    className={`cursor-pointer px-4 py-2 transition-colors ${focusedIndex === index
                                        ? 'bg-[#F7F4F1] dark:bg-slate-700'
                                        : 'hover:bg-[#F7F4F1] dark:hover:bg-slate-700'
                                        } ${option.value === value ? 'font-bold text-primary dark:text-primary' : 'text-slate-700 dark:text-slate-200'}`}
                                >
                                    {option.label}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
