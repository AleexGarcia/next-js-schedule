// /src/app/api/studySchedules/route.ts

import { dbConnection } from '@/app/lib/db_connection';  // Conectar com o MongoDB
import StudySchedule from '@/app/models/studyschedule';  // Modelo de StudySchedule
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  await dbConnection.connect(); // Conectar ao banco de dados

  try {
    const studySchedules = await StudySchedule.find();  // Buscar todas as studySchedules
    return NextResponse.json(studySchedules);  // Retornar as studySchedules como JSON
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar os studySchedules' }, { status: 500 });
  } finally {
    await dbConnection.disconnect();
  }
}

export async function POST(request: NextRequest) {
  await dbConnection.connect();  // Conectar ao banco de dados

  try {
    const body = await request.json();  // Pegar o corpo da requisição
    const studySchedule = new StudySchedule(body);  // Criar uma nova instância de StudySchedule
    await studySchedule.save();  // Salvar no banco de dados
    return NextResponse.json(studySchedule, { status: 201 });  // Retornar o studySchedule criado
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao criar o studySchedule' }, { status: 400 });
  } finally {
    await dbConnection.disconnect();
  }
}
