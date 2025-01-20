import { NextRequest, NextResponse } from 'next/server';
import {jwtVerify} from 'jose';

export const config = {
    matcher: [
        '/api/studyschedules',
        '/api/studysessions',
        '/api/subjects',
        '/api/reviews',
        '/api/themes',
        '/api/users'
    ],
};

export function middleware(request: NextRequest) {

    const tokenCookie = request.cookies.get('token');

    if (!tokenCookie) {
        return NextResponse.json({ error: 'Unauthorized: Token não encontrado' }, { status: 401 });
    }

    try {
        const token = tokenCookie.value;
        jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET!));
        return NextResponse.next();
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Unauthorized: Token inválido ou expirado' }, { status: 401 });
    }

}

