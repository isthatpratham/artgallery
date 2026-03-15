'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export function MobileOrderButton() {
    return (
        <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
            <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                className="pointer-events-auto"
            >
                <Link
                    href="/order"
                    className="bg-[#D47A6A] text-white rounded-full shadow-xl px-8 py-4 font-bold text-sm tracking-wide inline-flex items-center justify-center whitespace-nowrap"
                >
                    Order Your Portrait
                </Link>
            </motion.div>
        </div>
    );
}
