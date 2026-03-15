import { supabaseAdmin } from "@/lib/supabaseAdmin"

export async function GET() {
    const { data, error } = await supabaseAdmin
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false })

    if (error) {
        console.error("Orders fetch error:", error)
        return Response.json({ error: error.message }, { status: 500 })
    }

    return Response.json({ orders: data })
}
