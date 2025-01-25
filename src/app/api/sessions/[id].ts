// /src/app/api/studySessions/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { dbConnection } from '@/app/lib/db_connection';  // Conectar ao MongoDB
import StudySession from '@/app/models/studysession';  // Modelo StudySession

// Função GET para buscar uma studySession pelo id
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  await dbConnection.connect();  // Conectar ao banco de dados

  try {
    const studySession = await StudySession.findById(params.id);  // Buscar studySession pelo id
    if (!studySession) {
      return NextResponse.json({ error: 'StudySession não encontrada' }, { status: 404 });
    }
    return NextResponse.json(studySession);  // Retornar a studySession encontrada
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar a studySession' }, { status: 500 });
  } finally {
    await dbConnection.disconnect();
  }
}

// Função PUT para atualizar uma studySession pelo id
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  await dbConnection.connect();  // Conectar ao banco de dados

  try {
    const body = await request.json();  // Pegar o corpo da requisição
    const updatedStudySession = await StudySession.findByIdAndUpdate(params.id, body, { new: true });  // Atualizar studySession
    if (!updatedStudySession) {
      return NextResponse.json({ error: 'StudySession não encontrada' }, { status: 404 });
    }
    return NextResponse.json(updatedStudySession);  // Retornar a studySession atualizada
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao atualizar a studySession' }, { status: 400 });
  } finally {
    await dbConnection.disconnect();
  }
}

// Função DELETE para excluir uma studySession pelo id
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  await dbConnection.connect();  // Conectar ao banco de dados

  try {
    const deletedStudySession = await StudySession.findByIdAndDelete(params.id);  // Excluir studySession
    if (!deletedStudySession) {
      return NextResponse.json({ error: 'StudySession não encontrada' }, { status: 404 });
    }
    return NextResponse.json({ message: 'StudySession excluída com sucesso' });  // Retornar sucesso
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao excluir a studySession' }, { status: 500 });
  } finally {
    await dbConnection.disconnect();
  }
}
