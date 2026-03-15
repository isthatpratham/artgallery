import React from 'react';
import { AnimatedImage as Image } from '@/components/ui/AnimatedImage';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { Button } from '../../components/ui/Button';

export default function About() {
    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
            <Navbar />
            <main className="flex-1">
                {/* Hero Profile Section */}
                <section className="max-w-5xl mx-auto px-6 py-16 flex flex-col items-center">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-tr from-primary to-orange-200 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                        <div className="relative size-48 md:size-64 rounded-full border-4 border-white shadow-xl overflow-hidden">
                            <Image src="/images/studio/studio-1.png" alt="Sudarshana Sharma" fill className="object-cover" />
                        </div>
                    </div>
                    <div className="mt-8 text-center max-w-2xl">
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4 tracking-tight">Sudarshana Sharma</h1>
                        <p className="text-primary text-lg font-medium mb-2">Contemporary Painter & Visual Storyteller</p>
                        <p className="text-slate-500 dark:text-slate-400 flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined text-sm">location_on</span> Margherita, Assam, India
                        </p>
                    </div>
                </section>

                {/* Story Section */}
                <section className="bg-primary/5 py-20 px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <span className="text-primary font-bold tracking-widest text-xs uppercase">The Narrative</span>
                            <h2 className="text-3xl font-bold mt-2">The Soul Behind the Canvas</h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                                <p>
                                    With over two decades of immersion in classical and contemporary forms, Sudarshana explores the delicate intersection of nature and human emotion. Her journey began in the vibrant streets of Rajasthan, where the rhythmic patterns of local architecture first sparked her creative flame.
                                </p>
                                <p>
                                    Her work is characterized by warm earth tones and intricate textures that evoke a sense of timeless tranquility. Each piece is a conversation between her memory and the physical medium.
                                </p>
                            </div>
                            <div className="rounded-2xl overflow-hidden shadow-2xl rotate-2 relative aspect-square">
                                <Image
                                    alt="Abstract painting with warm earth tones"
                                    className="object-cover"
                                    fill
                                    src="/images/studio/studio-11.jpg"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Creative Process Section */}
                <section className="py-20 px-6 max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                        <div className="max-w-xl">
                            <span className="text-primary font-bold tracking-widest text-xs uppercase">Methodology</span>
                            <h2 className="text-3xl font-bold mt-2">The Creative Process</h2>
                            <p className="text-slate-500 mt-4 italic">"I don't paint things; I paint the way they make me feel."</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="group">
                            <div className="aspect-[3/4] rounded-xl overflow-hidden mb-4 relative">
                                <Image className="object-cover transition-transform duration-500 group-hover:scale-110" src="/images/studio/studio-2.webp" alt="Color Alchemy" fill />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                                    <p className="text-white text-sm">Step 1: Color Alchemy</p>
                                </div>
                            </div>
                            <h3 className="font-bold text-lg">Layering & Depth</h3>
                            <p className="text-slate-500 text-sm mt-2 leading-relaxed">Sudarshana uses a unique glazing technique, applying thin layers of translucent pigment to build a luminous glow from within.</p>
                        </div>
                        <div className="group">
                            <div className="aspect-[3/4] rounded-xl overflow-hidden mb-4 relative">
                                <Image className="object-cover transition-transform duration-500 group-hover:scale-110" src="/images/studio/studio-3.jpg" alt="Mark Making" fill />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                                    <p className="text-white text-sm">Step 2: Mark Making</p>
                                </div>
                            </div>
                            <h3 className="font-bold text-lg">Intuitive Brushwork</h3>
                            <p className="text-slate-500 text-sm mt-2 leading-relaxed">Each stroke is deliberate yet free, allowing the subconscious to guide the movement across the surface.</p>
                        </div>
                        <div className="group">
                            <div className="aspect-[3/4] rounded-xl overflow-hidden mb-4 relative">
                                <Image className="object-cover transition-transform duration-500 group-hover:scale-110" src="/images/studio/studio-4.webp" alt="Final Resonance" fill />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                                    <p className="text-white text-sm">Step 3: Final Resonance</p>
                                </div>
                            </div>
                            <h3 className="font-bold text-lg">Textural Finish</h3>
                            <p className="text-slate-500 text-sm mt-2 leading-relaxed">Incorporating natural elements like fine sand and linen fibers to create a tactile experience for the viewer.</p>
                        </div>
                    </div>
                </section>

                {/* Studio Section */}
                <section className="bg-background-dark text-white py-20 px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex flex-col md:flex-row gap-16 items-center">
                            <div className="md:w-1/2">
                                <h2 className="text-4xl font-bold mb-6">The Studio Sanctuary</h2>
                                <p className="text-slate-400 text-lg leading-relaxed mb-8">
                                    Located in the heart of Jaipur, Sudarshana's studio is a sun-drenched space where time seems to stand still. Surrounded by unfinished canvases and jars of raw pigments, this is where inspiration is forged into reality.
                                </p>
                                <div className="flex gap-8">
                                    <div>
                                        <p className="text-primary text-3xl font-bold">15+</p>
                                        <p className="text-slate-500 text-xs uppercase tracking-widest mt-1">Solo Exhibitions</p>
                                    </div>
                                    <div className="w-px h-12 bg-white/10"></div>
                                    <div>
                                        <p className="text-primary text-3xl font-bold">200+</p>
                                        <p className="text-slate-500 text-xs uppercase tracking-widest mt-1">Private Collections</p>
                                    </div>
                                </div>
                                <Button variant="primary" className="mt-10" icon="arrow_forward">
                                    Book a Studio Visit
                                </Button>
                            </div>
                            <div className="md:w-1/2 grid grid-cols-2 gap-4">
                                <div className="space-y-4">
                                    <div className="rounded-xl overflow-hidden aspect-square relative">
                                        <Image className="object-cover" src="/images/studio/studio-5.webp" alt="Studio 1" fill />
                                    </div>
                                    <div className="rounded-xl overflow-hidden aspect-[4/5] relative">
                                        <Image className="object-cover" src="/images/studio/studio-6.jpg" alt="Studio 2" fill />
                                    </div>
                                </div>
                                <div className="space-y-4 pt-8">
                                    <div className="rounded-xl overflow-hidden aspect-[4/5] relative">
                                        <Image className="object-cover" src="/images/studio/studio-7.webp" alt="Studio 3" fill />
                                    </div>
                                    <div className="rounded-xl overflow-hidden aspect-square relative">
                                        <Image className="object-cover" src="/images/studio/studio-8.webp" alt="Studio 4" fill />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
}
