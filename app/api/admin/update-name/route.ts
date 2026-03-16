import { supabaseAdmin } from "@/lib/supabaseAdmin"

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { userId, name } = body

        if (!userId || !name) {
            return Response.json({ error: "Missing required fields" }, { status: 400 })
        }

        const { data, error } = await supabaseAdmin
            .from("admin_users")
            .update({ name })
            .eq("user_id", userId)
            .select()

        if (error) {
            console.error("Update name error:", error)
            return Response.json({ error: error.message }, { status: 500 })
        }

        return Response.json({ success: true, data })
    } catch (err) {
        console.error("API error:", err)
        return Response.json({ error: "Server error" }, { status: 500 })
    }
}
