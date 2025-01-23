import { dbConnection } from '@/app/lib/db_connection'; 
import { NextRequest, NextResponse } from 'next/server';
import Subject from '@/app/models/subject';

export async function POST(request: NextRequest) {
  await dbConnection.connect(); // Conectar ao banco de dados

  try {
    const body = await request.json();
   
    const subjects = await Subject.insertMany(body);

    return NextResponse.json(subjects, { status: 201 }); // Retornar os subjects criados
  } catch (error) {
    console.error('Erro ao criar subjects:', error);
    return NextResponse.json({ error: 'Erro ao criar os subjects' }, { status: 400 });
  } finally {
    await dbConnection.disconnect(); // Desconectar do banco de dados
  }
}
