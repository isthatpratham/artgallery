'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/admin/login');
    };

    return (
        <button
            onClick={handleLogout}
            className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-400 hover:text-red-500 rounded-lg transition-all tooltip-trigger relative group"
            title="Sign Out"
        >
            <span className="material-symbols-outlined text-xl">logout</span>
        </button>
    );
}
