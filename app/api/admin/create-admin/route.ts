import { supabaseAdmin } from "@/lib/supabaseAdmin"

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { name, email, password } = body

        if (!name || !email || !password) {
            return Response.json({ error: "Missing required fields" }, { status: 400 })
        }

        // 1. Create user in Supabase Auth
        const { data, error: authError } = await supabaseAdmin.auth.admin.createUser({
            email,
            password,
            email_confirm: true
        })

        if (authError) {
            console.error("Auth createUser error:", authError)
            return Response.json({ error: authError.message }, { status: 500 })
        }

        if (!data.user) {
            return Response.json({ error: "Failed to create user" }, { status: 500 })
        }

        // 2. Insert into admin_users table
        const { error: dbError } = await supabaseAdmin
            .from("admin_users")
            .insert({
                user_id: data.user.id,
                email: email,
                name: name,
                role: "admin"
            });

        if (dbError) {
            console.error("Admin insert error:", dbError);
            return Response.json({ error: dbError.message }, { status: 500 })
        }

        console.log("Admin created:", data.user.id);

        return Response.json({ success: true, user: data.user })
    } catch (err) {
        console.error("API error:", err)
        return Response.json({ error: "Server error" }, { status: 500 })
    }
}
