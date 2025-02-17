import { dbConnection } from "@/app/lib/db_connection";
import User from "@/app/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {    
    await dbConnection.connect();
    try {

        const { email, password } = await request.json();
        const query = User.findOne({ email: email });
        const user = await query.exec();

        if (!user) {
            return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return NextResponse.json({ error: 'Senha Incorreta' }, { status: 400 });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET!,
            { expiresIn: '1h' }
        )

        const response = NextResponse.json({ message: 'Login bem-sucedido', user: user.name }, { status: 200 });

        response.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development',
            sameSite: 'strict',
            maxAge: 3600000
        })

        return response;

    } catch (error: any) {
        console.error('Erro na autenticação:', error);
        return NextResponse.json({ error: 'Erro ao autenticar' }, { status: 500 });
    } finally {
        await dbConnection.disconnect();
    }
}
