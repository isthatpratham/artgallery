'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '../ui/Button';
import { Input, Textarea } from '../ui/Input';
import { Dropdown } from '../ui/Dropdown';

export function OrderForm() {
    const [productType, setProductType] = useState('Portrait');
    const [portraitType, setPortraitType] = useState('Solo');
    const [size, setSize] = useState('4x6');
    const [keychainShape, setKeychainShape] = useState('Circle');
    return (
        <form className="flex flex-col gap-8" onSubmit={(e) => e.preventDefault()}>
            {/* Reference Photo Upload Section */}
            <div className="flex flex-col gap-4 bg-white dark:bg-slate-800/50 p-6 rounded-xl border border-primary/10 shadow-sm">
                <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">image</span>
                    Reference Photo
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="aspect-square bg-primary/5 rounded-xl border-2 border-dashed border-primary/20 flex flex-col items-center justify-center gap-2 hover:bg-primary/10 transition-colors cursor-pointer">
                        <span className="material-symbols-outlined text-primary text-3xl">add_a_photo</span>
                        <span className="text-xs font-semibold text-primary">Add Photo</span>
                    </div>
                    <div className="relative aspect-square bg-slate-100 dark:bg-slate-700 rounded-xl overflow-hidden">
                        <Image src="/images/studio/studio-9.webp" alt="Reference Photo Placeholder" fill className="object-cover" />
                    </div>
                </div>
                <div className="flex justify-start">
                    <Button variant="primary" type="button" icon="upload" className="h-10 px-4 py-0 text-sm shadow-lg shadow-primary/20">
                        Upload New Photo
                    </Button>
                </div>
            </div>

            {/* Product Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Product Type */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Product Type</label>
                    <Dropdown
                        options={[
                            { label: 'Portrait', value: 'Portrait' },
                            { label: 'Keychain', value: 'Keychain' }
                        ]}
                        value={productType}
                        onChange={setProductType}
                    />
                </div>

                {/* Portrait Type */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Portrait Type</label>
                    <Dropdown
                        options={[
                            { label: 'Solo', value: 'Solo' },
                            { label: 'Couple', value: 'Couple' },
                            { label: 'Family', value: 'Family' }
                        ]}
                        value={portraitType}
                        onChange={setPortraitType}
                    />
                </div>

                {/* Size */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Size</label>
                    <Dropdown
                        options={[
                            { label: '4x4', value: '4x4' },
                            { label: '4x6', value: '4x6' },
                            { label: '6x6', value: '6x6' }
                        ]}
                        value={size}
                        onChange={setSize}
                    />
                </div>

                {/* Keychain Shape */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Keychain Shape</label>
                    <Dropdown
                        options={[
                            { label: 'Circle', value: 'Circle' },
                            { label: 'Square', value: 'Square' },
                            { label: 'Custom', value: 'Custom' }
                        ]}
                        value={keychainShape}
                        onChange={setKeychainShape}
                    />
                </div>
            </div>

            {/* Contact Information */}
            <div className="flex flex-col gap-4 border-t border-primary/10 pt-8">
                <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Full Name</label>
                        <Input type="text" placeholder="John Doe" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Phone Number</label>
                        <Input type="tel" placeholder="+1 (555) 000-0000" />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Shipping Address</label>
                    <Textarea rows={3} placeholder="123 Art Street, Creativity City..." />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Notes / Special Requests</label>
                    <Textarea rows={4} placeholder="Mention any specific color preferences or details..." />
                </div>
            </div>

            {/* Submit Section */}
            <div className="flex flex-col items-center gap-4 mt-4 pb-20">
                <Button variant="primary" type="submit" className="w-full max-w-md h-14 text-lg shadow-xl shadow-primary/30">
                    Submit Order
                </Button>
                <p className="text-xs text-slate-400 text-center px-4">
                    By submitting, you agree to our terms of service regarding custom handmade commissions. Prices vary based on complexity.
                </p>
            </div>
        </form>
    );
}
