"use client"
import React, { useEffect, useState } from 'react';
import { OrdersDashboardClient, Order } from '@/components/admin/OrdersDashboardClient';

export default function AdminDashboard() {
    // STEP 4 — Create Orders State
    const [orders, setOrders] = useState<Order[]>([]);
    // STEP 2 — Add Selected Order State
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    // STEP 5 — Fetch Orders from API
    useEffect(() => {
        async function fetchOrders() {
            try {
                const res = await fetch("/api/admin/orders");
                const data = await res.json();

                console.log("Dashboard orders:", data);

                const fetchedOrders = data.orders || [];
                setOrders(fetchedOrders);

                // Automatically select first order if available
                if (fetchedOrders.length > 0 && !selectedOrder) {
                    setSelectedOrder(fetchedOrders[0]);
                }
            } catch (error) {
                console.error("Dashboard orders fetch failed:", error);
            }
        }

        fetchOrders();
    }, []);

    return (
        <OrdersDashboardClient
            initialOrders={orders}
            selectedOrder={selectedOrder}
            setSelectedOrder={setSelectedOrder}
        />
    );
}
