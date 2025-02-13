import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { redirect } from 'next/navigation';

export const config = {
    matcher: [
        '/api/schedules',
        '/api/studysessions',
        '/api/subjects',
        '/api/reviews',
        '/api/themes',
        '/form-schedule',
        '/home/:path*',
        '/'
    ],
};

export async function middleware(request: NextRequest) {

    const tokenCookie = await request.cookies.get('token');
    const { pathname } = request.nextUrl;

    if (!tokenCookie) {
        if (pathname === '/') {
            return NextResponse.next();
        }
        return NextResponse.redirect(new URL('/', request.url));
    }

    if (pathname === '/') {
        return NextResponse.redirect(new URL('/main/dashboard', request.url));
    }

    try {
        const token = tokenCookie.value;
        await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET!));
        return NextResponse.next();
    } catch (error) {
        
        const response = NextResponse.redirect(new URL('/', request.url));
        response.headers.set('Set-Cookie', 'token=; Path=/; HttpOnly; Secure; Max-Age=0');
        return response;
    }

}

