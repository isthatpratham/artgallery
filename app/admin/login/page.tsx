'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminLogin() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // 1. Sign in with Supabase Auth
            const { data, error: authError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            console.log("LOGIN RESPONSE:", data, authError);

            if (authError) {
                setError(authError.message);
                return;
            }

            const user = data.user;

            if (!user) {
                setError("Authentication failed");
                return;
            }

            // 2. Verify user is in admin_users table
            const { data: admin, error: adminError } = await supabase
                .from('admin_users')
                .select('*')
                .eq('user_id', user.id)
                .single();

            console.log("ADMIN RESULT:", admin);

            if (adminError || !admin) {
                console.log("ADMIN CHECK FAILED:", adminError);
                // Sign out immediately if not authorized
                await supabase.auth.signOut();
                setError('Unauthorized admin access');
                return;
            }

            // 3. Success - Redirect to dashboard
            console.log("LOGIN SUCCESS:", user);
            console.log("ADMIN CHECK RESULT:", admin);
            router.push('/admin/dashboard');

        } catch (err: any) {
            console.error('Unexpected login error:', err.message);
            setError(err.message || 'An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark">
            <div className="layout-container flex h-full grow flex-col">
                {/* Navigation Header */}
                <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-primary/10 px-6 md:px-10 py-4 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md sticky top-0 z-50">
                    <div className="flex items-center gap-3 text-primary">
                        <span className="material-symbols-outlined text-3xl">palette</span>
                        <h2 className="text-slate-900 dark:text-slate-100 text-xl font-bold leading-tight tracking-tight">ArtGallery</h2>
                    </div>
                    <div>
                        <Link href="/" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">arrow_back</span>
                            Back to Gallery
                        </Link>
                    </div>
                </header>

                {/* Main Content Area: Centered Login Card */}
                <main className="flex flex-1 items-center justify-center p-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="flex flex-col w-full max-w-[440px] bg-white dark:bg-slate-900/50 rounded-2xl shadow-2xl shadow-primary/5 overflow-hidden border border-primary/10 backdrop-blur-sm"
                    >
                        {/* Card Header Image/Visual */}
                        <div className="w-full h-40 bg-primary/5 flex items-center justify-center relative">
                            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent"></div>
                            <div className="z-10 flex flex-col items-center">
                                <motion.div
                                    initial={{ scale: 0.8 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                    className="p-4 rounded-2xl bg-white dark:bg-slate-800 shadow-lg border border-primary/5"
                                >
                                    <span className="material-symbols-outlined text-4xl text-primary">lock</span>
                                </motion.div>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white dark:from-slate-900 to-transparent"></div>
                        </div>

                        {/* Form Content */}
                        <div className="px-8 pb-10 pt-2">
                            <div className="text-center mb-8">
                                <h1 className="text-slate-900 dark:text-slate-100 text-2xl font-bold leading-tight">Admin Login</h1>
                                <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">Access your secure dashboard</p>
                            </div>

                            <AnimatePresence mode="wait">
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl mb-6 text-sm flex items-center gap-3"
                                    >
                                        <span className="material-symbols-outlined text-lg">error</span>
                                        {error}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <form className="space-y-6" onSubmit={handleLogin}>
                                {/* Email Field */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold px-1">Email Address</label>
                                    <Input
                                        type="email"
                                        placeholder="admin@artgallery.com"
                                        icon="mail"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={loading}
                                    />
                                </div>

                                {/* Password Field */}
                                <div className="flex flex-col gap-2">
                                    <div className="flex justify-between items-center px-1">
                                        <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold">Password</label>
                                        <Link href="#" className="text-xs font-medium text-primary hover:underline">Forgot?</Link>
                                    </div>
                                    <div className="relative flex items-stretch">
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            icon="key"
                                            className="pr-12"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            disabled={loading}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors"
                                        >
                                            <span className="material-symbols-outlined text-xl">
                                                {showPassword ? 'visibility_off' : 'visibility'}
                                            </span>
                                        </button>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    variant="primary"
                                    className="w-full h-14 rounded-xl shadow-lg shadow-primary/20 transition-all font-bold mt-2"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <div className="flex items-center gap-2">
                                            <span className="animate-spin h-5 w-5 border-2 border-white/30 border-t-white rounded-full"></span>
                                            Verifying...
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <span>Sign In to Dashboard</span>
                                            <span className="material-symbols-outlined text-lg">arrow_forward</span>
                                        </div>
                                    )}
                                </Button>
                            </form>

                            {/* Footer Links */}
                            <div className="mt-8 pt-6 border-t border-primary/5 text-center">
                                <p className="text-slate-400 dark:text-slate-500 text-xs leading-relaxed">
                                    Restricted area for authorized personnel only.
                                    <br />
                                    Need access? <Link href="#" className="text-primary font-semibold hover:underline">Contact System Admin</Link>
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </main>

                {/* Simple Footer */}
                <footer className="py-6 text-center">
                    <p className="text-slate-400 dark:text-slate-500 text-xs">
                        © {new Date().getFullYear()} ArtGallery CMS. Hand-painted Security.
                    </p>
                </footer>
            </div>
        </div>
    );
}
