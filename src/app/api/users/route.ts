import { dbConnection } from '@/app/lib/db_connection';  // Conectar com o MongoDB
import User from '@/app/models/user';  // Modelo de User
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(request: NextRequest) {
  await dbConnection.connect();

  try {
    const body = await request.json();
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(body.password, salt);

    body.password = hashedPassword;

    const user = new User(body);

    await user.save();
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Erro ao criar o usuário' }, { status: 400 });
  } finally {
    await dbConnection.disconnect();
  }
}
