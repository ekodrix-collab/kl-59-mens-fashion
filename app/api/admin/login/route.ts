import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json()

        const envEmail = process.env.ADMIN_EMAIL
        const envPassword = process.env.ADMIN_PASSWORD

        if (!envEmail || !envPassword) {
            return NextResponse.json(
                { error: 'Admin credentials not configured in environment' },
                { status: 500 }
            )
        }

        if (email === envEmail && password === envPassword) {
            // In a real app, we would generate a JWT or use NextAuth/Supabase here
            // For Option 2, we return a success signal
            return NextResponse.json({ success: true, message: 'Authenticated' })
        }

        return NextResponse.json(
            { error: 'Invalid email or password' },
            { status: 401 }
        )
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
