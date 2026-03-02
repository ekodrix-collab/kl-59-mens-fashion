import { v2 as cloudinary } from 'cloudinary'
import { NextResponse } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request: Request) {
    try {
        // Auth check
        const cookieStore = cookies()
        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    get(name: string) {
                        return cookieStore.get(name)?.value
                    },
                },
            }
        )
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { public_id, resource_type = 'video' } = await request.json()

        if (!public_id) {
            return NextResponse.json({ error: 'public_id is required' }, { status: 400 })
        }

        const result = await cloudinary.uploader.destroy(public_id, {
            resource_type: resource_type
        })

        if (result.result === 'ok' || result.result === 'not_found') {
            return NextResponse.json({ success: true, result })
        } else {
            console.error('Cloudinary deletion failed:', result)
            return NextResponse.json({ error: 'Cloudinary deletion failed', details: result }, { status: 500 })
        }
    } catch (error) {
        console.error('Cloudinary deletion error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
