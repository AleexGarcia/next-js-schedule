// /src/app/api/subjects/route.ts

import { dbConnection } from '@/app/lib/db_connection';  // Conectar com o MongoDB
import Subject from '@/app/models/subject';  // Modelo de Subject
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  await dbConnection.connect(); // Conectar ao banco de dados

  try {
    const subjects = await Subject.find();  // Buscar todos os subjects
    return NextResponse.json(subjects);  // Retornar os subjects como JSON
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar os subjects' }, { status: 500 });
  } finally {
    await dbConnection.disconnect();
  }
}

export async function POST(request: NextRequest) {
  await dbConnection.connect();  // Conectar ao banco de dados

  try {
    const body = await request.json();  // Pegar o corpo da requisição
    const subject = new Subject(body);  // Criar uma nova instância de Subject
    await subject.save();  // Salvar no banco de dados
    return NextResponse.json(subject, { status: 201 });  // Retornar o subject criado
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao criar o subject' }, { status: 400 });
  } finally {
    await dbConnection.disconnect();
  }
}
