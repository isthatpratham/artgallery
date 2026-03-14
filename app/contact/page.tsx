'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { Button } from '../../components/ui/Button';
import { Input, Textarea } from '../../components/ui/Input';
import { Dropdown } from '../../components/ui/Dropdown';

export default function Contact() {
    const [subject, setSubject] = useState('General Inquiry');
    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
            <Navbar />
            <main className="flex-1 flex flex-col items-center py-12 md:py-24 px-6 md:px-20 lg:px-40">
                <div className="max-w-[1000px] w-full grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
                    {/* Left Column: Content & Socials */}
                    <div className="flex flex-col gap-10">
                        <div className="flex flex-col gap-4">
                            <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-[-0.033em] text-slate-900 dark:text-slate-100">
                                Let's start a <span className="text-primary">conversation</span>.
                            </h1>
                            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-md">
                                Whether you're an artist looking for representation or a collector seeking a new piece, we're here to help.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <div className="flex flex-col gap-2">
                                <p className="text-xs font-bold uppercase tracking-widest text-primary">Email Us</p>
                                <a className="text-lg font-medium hover:underline" href="mailto:hello@artgallery.com">hello@artgallery.com</a>
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="text-xs font-bold uppercase tracking-widest text-primary">Call Us</p>
                                <a className="text-lg font-medium hover:underline" href="tel:+1234567890">+1 (234) 567-890</a>
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="text-xs font-bold uppercase tracking-widest text-primary">WhatsApp</p>
                                <a className="text-lg font-medium hover:underline" href="#">Chat with us</a>
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="text-xs font-bold uppercase tracking-widest text-primary">Instagram</p>
                                <a className="text-lg font-medium hover:underline" href="#">@artgallery_official</a>
                            </div>
                        </div>

                        {/* Map Placeholder Image */}
                        <div className="mt-4 rounded-xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-500 aspect-video bg-primary/5 border border-primary/10 relative">
                            <Image
                                alt="Map location of the art gallery"
                                className="object-cover"
                                fill
                                src="/images/studio/studio-10.webp"
                            />
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <div className="bg-white dark:bg-slate-900/50 p-8 md:p-10 rounded-xl shadow-sm border border-primary/5 flex flex-col gap-6">
                        <h3 className="text-2xl font-bold">Send a message</h3>
                        <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Full Name</label>
                                <Input type="text" placeholder="Jane Doe" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
                                <Input type="email" placeholder="jane@example.com" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Subject</label>
                                <Dropdown
                                    options={[
                                        { label: 'General Inquiry', value: 'General Inquiry' },
                                        { label: 'Art Acquisition', value: 'Art Acquisition' },
                                        { label: 'Artist Submission', value: 'Artist Submission' },
                                        { label: 'Press & Media', value: 'Press & Media' }
                                    ]}
                                    value={subject}
                                    onChange={setSubject}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Message</label>
                                <Textarea rows={5} placeholder="Tell us about your project or inquiry..." />
                            </div>
                            <Button variant="primary" type="submit" icon="send" className="w-full h-14 mt-2">
                                Send Message
                            </Button>
                        </form>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
