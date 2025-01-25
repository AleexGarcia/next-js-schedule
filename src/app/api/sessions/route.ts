// /src/app/api/studySessions/route.ts

import { dbConnection } from '@/app/lib/db_connection';  // Conectar com o MongoDB
import StudySession from '@/app/models/studysession';  // Modelo de StudySession
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  await dbConnection.connect(); // Conectar ao banco de dados

  try {
    const studySessions = await StudySession.find();  // Buscar todas as studySessions
    return NextResponse.json(studySessions);  // Retornar as studySessions como JSON
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar as studySessions' }, { status: 500 });
  } finally {
    await dbConnection.disconnect();
  }
}

export async function POST(request: NextRequest) {
  await dbConnection.connect();  // Conectar ao banco de dados

  try {
    const body = await request.json();  // Pegar o corpo da requisição
    const studySession = new StudySession(body);  // Criar uma nova instância de StudySession
    await studySession.save();  // Salvar no banco de dados
    return NextResponse.json(studySession, { status: 201 });  // Retornar a studySession criada
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao criar a studySession' }, { status: 400 });
  } finally {
    await dbConnection.disconnect();
  }
}
