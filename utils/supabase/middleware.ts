import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  try {
    // Safety check: if env variables are missing, do not crash the site with a 500 error.
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) {
      console.warn('Middleware: Missing Supabase environment variables.')
      return NextResponse.next()
    }

    let supabaseResponse = NextResponse.next({
      request: {
        headers: request.headers,
      },
    })

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            request.cookies.set({ name, value, ...options })
            supabaseResponse = NextResponse.next({
              request: { headers: request.headers },
            })
            supabaseResponse.cookies.set({ name, value, ...options })
          },
          remove(name: string, options: CookieOptions) {
            request.cookies.set({ name, value: '', ...options })
            supabaseResponse = NextResponse.next({
              request: { headers: request.headers },
            })
            supabaseResponse.cookies.set({ name, value: '', ...options })
          },
        },
      }
    )

    const {
      data: { user },
    } = await supabase.auth.getUser()

    // Protect the dashboard route
    if (!user && request.nextUrl.pathname.startsWith('/dashboard')) {
      const url = request.nextUrl.clone()
      url.pathname = '/auth/login'
      return NextResponse.redirect(url)
    }

    // Also protect portfolio since it's the mock dashboard equivalent
    if (!user && request.nextUrl.pathname.startsWith('/portfolio')) {
      const url = request.nextUrl.clone()
      url.pathname = '/auth/login'
      return NextResponse.redirect(url)
    }

    return supabaseResponse
  } catch (error) {
    // Fail gracefully instead of crashing the site
    console.error('Supabase Middleware Error:', error)
    return NextResponse.next()
  }
}

