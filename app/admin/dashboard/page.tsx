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

    // STEP 2 — Add Status Update Function
    async function updateStatus(newStatus: string) {
        if (!selectedOrder) return;

        try {
            const res = await fetch("/api/admin/update-order-status", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    orderId: selectedOrder.id,
                    status: newStatus
                })
            });

            const result = await res.json();

            if (result.success) {
                setSelectedOrder({
                    ...selectedOrder,
                    status: newStatus
                });

                setOrders((prev) =>
                    prev.map((order) =>
                        order.id === selectedOrder.id
                            ? { ...order, status: newStatus }
                            : order
                    )
                );
            }
        } catch (error) {
            console.error("Status update failed:", error);
        }
    }

    return (
        <OrdersDashboardClient
            initialOrders={orders}
            selectedOrder={selectedOrder}
            setSelectedOrder={setSelectedOrder}
            onUpdateStatus={updateStatus}
        />
    );
}
