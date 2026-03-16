import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
        {
            cookies: {
                get(name: string) {
                    return request.cookies.get(name)?.value
                },
                set(name: string, value: string, options: CookieOptions) {
                    request.cookies.set({
                        name,
                        value,
                        ...options,
                    })
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    })
                    response.cookies.set({
                        name,
                        value,
                        ...options,
                    })
                },
                remove(name: string, options: CookieOptions) {
                    request.cookies.set({
                        name,
                        value: '',
                        ...options,
                    })
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    })
                    response.cookies.set({
                        name,
                        value: '',
                        ...options,
                    })
                },
            },
        }
    )

    // Check for a Supabase session
    const { data: { session } } = await supabase.auth.getSession()

    const url = request.nextUrl.clone()
    const isLoginRoute = url.pathname === '/admin/login'

    // 1. If no session exists and it's an admin route (except login), redirect to login
    if (!session) {
        if (!isLoginRoute) {
            url.pathname = '/admin/login'
            return NextResponse.redirect(url)
        }
        return response
    }

    // 2. If session exists, verify admin status
    const { data: adminUser, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('user_id', session.user.id)
        .single()

    // 3. If the user is NOT in the admin_users table
    if (error || !adminUser) {
        // Sign out by clearing cookies and redirect to homepage
        await supabase.auth.signOut()
        url.pathname = '/'
        return NextResponse.redirect(url)
    }

    // 4. If session exists and it's the login route, redirect to dashboard
    if (isLoginRoute) {
        url.pathname = '/admin/dashboard'
        return NextResponse.redirect(url)
    }

    return response
}

export const config = {
    matcher: ['/admin/:path*'],
}
