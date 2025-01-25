import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export const config = {
    matcher: [
        '/api/studyschedules',
        '/api/studysessions',
        '/api/subjects',
        '/api/reviews',
        '/api/themes',
        '/form-schedule',
        '/dashboard',
        '/'
    ],
};

export async function middleware(request: NextRequest) {

    const tokenCookie = request.cookies.get('token');
    const { pathname } = request.nextUrl;

    if (!tokenCookie) {
        if (pathname === '/') {
            return NextResponse.next();
        }
        return NextResponse.json({ error: 'Unauthorized: Token não encontrado' }, { status: 401 });
    }

    try {

        const token = tokenCookie.value;
        await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET!));
        if (pathname === '/') {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
        return NextResponse.next();
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Unauthorized: Token inválido ou expirado' }, { status: 401 });
    }

}

