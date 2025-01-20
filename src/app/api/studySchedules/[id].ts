// /src/app/api/studySchedules/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { dbConnection } from '@/app/lib/db_connection';  // Conectar ao MongoDB
import StudySchedule from '@/app/models/studyschedule';  // Modelo StudySchedule

// Função GET para buscar um studySchedule pelo id
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  await dbConnection.connect();  // Conectar ao banco de dados

  try {
    const studySchedule = await StudySchedule.findById(params.id);  // Buscar studySchedule pelo id
    if (!studySchedule) {
      return NextResponse.json({ error: 'StudySchedule não encontrada' }, { status: 404 });
    }
    return NextResponse.json(studySchedule);  // Retornar o studySchedule encontrado
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar o studySchedule' }, { status: 500 });
  } finally {
    await dbConnection.disconnect();
  }
}

// Função PUT para atualizar um studySchedule pelo id
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  await dbConnection.connect();  // Conectar ao banco de dados

  try {
    const body = await request.json();  // Pegar o corpo da requisição
    const updatedStudySchedule = await StudySchedule.findByIdAndUpdate(params.id, body, { new: true });  // Atualizar studySchedule
    if (!updatedStudySchedule) {
      return NextResponse.json({ error: 'StudySchedule não encontrada' }, { status: 404 });
    }
    return NextResponse.json(updatedStudySchedule);  // Retornar o studySchedule atualizado
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao atualizar o studySchedule' }, { status: 400 });
  } finally {
    await dbConnection.disconnect();
  }
}

// Função DELETE para excluir um studySchedule pelo id
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  await dbConnection.connect();  // Conectar ao banco de dados

  try {
    const deletedStudySchedule = await StudySchedule.findByIdAndDelete(params.id);  // Excluir studySchedule
    if (!deletedStudySchedule) {
      return NextResponse.json({ error: 'StudySchedule não encontrada' }, { status: 404 });
    }
    return NextResponse.json({ message: 'StudySchedule excluída com sucesso' });  // Retornar sucesso
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao excluir o studySchedule' }, { status: 500 });
  } finally {
    await dbConnection.disconnect();
  }
}
