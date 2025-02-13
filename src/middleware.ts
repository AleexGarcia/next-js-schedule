import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

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

    const tokenCookie =  await request.cookies.get('token');
    const { pathname } = request.nextUrl;

    if (!tokenCookie) {
        if (pathname === '/') {
            return NextResponse.next();
        }
        return NextResponse.redirect(new URL('/', request.url));
    }

    try {

        const token = tokenCookie.value;
        await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET!));
        if (pathname === '/') {
            return NextResponse.redirect(new URL('/home', request.url));
        }

        return NextResponse.next();
    } catch (error) {
        const response = NextResponse.json({ error: 'Unauthorized: Token inválido ou expirado' }, { status: 401 });
        response.headers.set('Set-Cookie', 'token=; Path=/; HttpOnly; Secure; Max-Age=0');
        return response;
    }

}

