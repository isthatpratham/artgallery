import { supabaseAdmin } from "@/lib/supabaseAdmin"

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { orderId, status } = body

        const { data, error } = await supabaseAdmin
            .from("orders")
            .update({ status })
            .eq("id", orderId)
            .select()

        if (error) {
            console.error("Status update error:", error)
            return Response.json({ error: error.message }, { status: 500 })
        }

        return Response.json({ success: true, data })
    } catch (err) {
        console.error("API error:", err)
        return Response.json({ error: "Server error" }, { status: 500 })
    }
}
