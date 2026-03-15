import { createBrowserClient } from "@supabase/ssr"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!

// createBrowserClient automatically handles session persistence in cookies
// which is required for Next.js middleware to work correctly.
export const supabase = createBrowserClient(
    supabaseUrl,
    supabaseKey
)