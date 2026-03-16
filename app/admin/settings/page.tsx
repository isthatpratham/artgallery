"use client"
import React, { useEffect, useState } from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function AdminSettingsPage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [adminData, setAdminData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // Profile State
    const [name, setName] = useState('');
    const [isUpdatingName, setIsUpdatingName] = useState(false);

    // Password State
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

    // Add Admin State
    const [newAdminName, setNewAdminName] = useState('');
    const [newAdminEmail, setNewAdminEmail] = useState('');
    const [newAdminPassword, setNewAdminPassword] = useState('');
    const [isCreatingAdmin, setIsCreatingAdmin] = useState(false);

    useEffect(() => {
        async function getAdmin() {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push('/admin/login');
                return;
            }
            setUser(user);

            // Fetch admin name from database
            const { data, error } = await supabase
                .from('admin_users')
                .select('user_id, name')
                .eq('user_id', user.id)
                .single();

            if (data) {
                setAdminData(data);
                setName(data.name);
            }
            setLoading(false);
        }
        getAdmin();
    }, [router]);

    const handleUpdateName = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        setIsUpdatingName(true);
        try {
            const res = await fetch('/api/admin/update-name', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.id, name })
            });
            const result = await res.json();
            if (result.success) {
                alert('Name updated successfully!');
            } else {
                alert(result.error || 'Failed to update name');
            }
        } catch (err) {
            console.error('Update name error:', err);
            alert('Server error');
        } finally {
            setIsUpdatingName(false);
        }
    };

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        if (newPassword.length < 6) {
            alert('Password must be at least 6 characters');
            return;
        }

        setIsUpdatingPassword(true);
        try {
            const { error } = await supabase.auth.updateUser({ password: newPassword });
            if (error) {
                alert(error.message);
            } else {
                alert('Password updated successfully!');
                setNewPassword('');
                setConfirmPassword('');
            }
        } catch (err) {
            console.error('Update password error:', err);
            alert('Server error');
        } finally {
            setIsUpdatingPassword(false);
        }
    };

    const handleCreateAdmin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newAdminName || !newAdminEmail || !newAdminPassword) {
            alert('Please fill all fields');
            return;
        }

        setIsCreatingAdmin(true);
        try {
            const res = await fetch('/api/admin/create-admin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: newAdminName,
                    email: newAdminEmail,
                    password: newAdminPassword
                })
            });
            const result = await res.json();
            if (result.success) {
                alert('Admin created successfully!');
                setNewAdminName('');
                setNewAdminEmail('');
                setNewAdminPassword('');
            } else {
                alert(result.error || 'Failed to create admin');
            }
        } catch (err) {
            console.error('Create admin error:', err);
            alert('Server error');
        } finally {
            setIsCreatingAdmin(false);
        }
    };

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-background-light dark:bg-background-dark font-display">
                <p className="text-slate-500 animate-pulse">Loading settings...</p>
            </div>
        );
    }

    return (
        <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100">
            <AdminSidebar />

            <main className="flex-1 flex flex-col h-full bg-white dark:bg-background-dark/50 overflow-y-auto">
                <header className="h-16 border-b border-primary/10 flex items-center px-8 bg-background-light dark:bg-background-dark shrink-0">
                    <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Admin Settings</h2>
                </header>

                <div className="flex-1 p-8 space-y-8 max-w-4xl">
                    {/* Admin Profile Section */}
                    <section className="bg-white dark:bg-background-dark border border-primary/10 rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined text-2xl">account_circle</span>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold">Admin Profile</h3>
                                <p className="text-sm text-slate-500">Manage your basic information</p>
                            </div>
                        </div>

                        <form onSubmit={handleUpdateName} className="space-y-4">
                            <div className="grid gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Email Address</label>
                                    <input
                                        type="email"
                                        value={user?.email || ''}
                                        readOnly
                                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl text-sm italic text-slate-500 cursor-not-allowed outline-none"
                                    />
                                    <p className="text-[10px] text-slate-400 mt-1">Email cannot be changed for security reasons.</p>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Admin Display Name</label>
                                    <input
                                        type="text"
                                        value={name || 'Admin'}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full px-4 py-2.5 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 focus:border-primary rounded-xl text-sm outline-none transition-colors"
                                        placeholder="Enter your name"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={isUpdatingName}
                                className="px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-xl shadow-md shadow-primary/20 hover:scale-[1.02] transition-all disabled:opacity-50"
                            >
                                {isUpdatingName ? 'Saving...' : 'Save Profile Changes'}
                            </button>
                        </form>
                    </section>

                    {/* Password Section */}
                    <section className="bg-white dark:bg-background-dark border border-primary/10 rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="size-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
                                <span className="material-symbols-outlined text-2xl">lock</span>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold">Security</h3>
                                <p className="text-sm text-slate-500">Update your account password</p>
                            </div>
                        </div>

                        <form onSubmit={handleChangePassword} className="space-y-4">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase">New Password</label>
                                    <input
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="w-full px-4 py-2.5 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 focus:border-primary rounded-xl text-sm outline-none transition-colors"
                                        placeholder="••••••••"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Confirm Password</label>
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full px-4 py-2.5 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 focus:border-primary rounded-xl text-sm outline-none transition-colors"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={isUpdatingPassword}
                                className="px-6 py-2.5 bg-slate-900 dark:bg-slate-50 dark:text-slate-900 text-white text-sm font-bold rounded-xl hover:scale-[1.02] transition-all disabled:opacity-50"
                            >
                                {isUpdatingPassword ? 'Updating...' : 'Update Password'}
                            </button>
                        </form>
                    </section>

                    {/* Add New Admin Section */}
                    {/* Only visible or functional if user has permissions, but for this task we show for all current admins */}
                    <section className="bg-white dark:bg-background-dark border border-primary/10 rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="size-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                <span className="material-symbols-outlined text-2xl">person_add</span>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold">Add New Administrator</h3>
                                <p className="text-sm text-slate-500">Grant admin access to another user</p>
                            </div>
                        </div>

                        <form onSubmit={handleCreateAdmin} className="space-y-4">
                            <div className="grid sm:grid-cols-3 gap-4">
                                <div className="space-y-1.5 text-black">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Admin Name</label>
                                    <input
                                        type="text"
                                        value={newAdminName}
                                        onChange={(e) => setNewAdminName(e.target.value)}
                                        className="w-full px-4 py-2.5 bg-white border border-slate-200 dark:border-slate-800 focus:border-primary rounded-xl text-sm outline-none transition-colors"
                                        placeholder="E.g. Jane Doe"
                                    />
                                </div>
                                <div className="space-y-1.5 text-black">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Email Address</label>
                                    <input
                                        type="email"
                                        value={newAdminEmail}
                                        onChange={(e) => setNewAdminEmail(e.target.value)}
                                        className="w-full px-4 py-2.5 bg-white border border-slate-200 dark:border-slate-800 focus:border-primary rounded-xl text-sm outline-none transition-colors"
                                        placeholder="admin@artgallery.com"
                                    />
                                </div>
                                <div className="space-y-1.5 text-black">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Initial Password</label>
                                    <input
                                        type="password"
                                        value={newAdminPassword}
                                        onChange={(e) => setNewAdminPassword(e.target.value)}
                                        className="w-full px-4 py-2.5 bg-white border border-slate-200 dark:border-slate-800 focus:border-primary rounded-xl text-sm outline-none transition-colors"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={isCreatingAdmin}
                                className="px-6 py-2.5 bg-emerald-600 text-white text-sm font-bold rounded-xl shadow-md shadow-emerald-600/20 hover:scale-[1.02] transition-all disabled:opacity-50"
                            >
                                {isCreatingAdmin ? 'Creating...' : 'Register New Admin'}
                            </button>
                        </form>
                    </section>
                </div>
            </main>
        </div>
    );
}
