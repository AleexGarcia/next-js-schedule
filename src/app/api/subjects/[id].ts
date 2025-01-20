// /src/app/api/subjects/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { dbConnection } from '@/app/lib/db_connection';  // Conectar ao MongoDB
import Subject from '@/app/models/subject';  // Modelo Subject

// Função GET para buscar um subject pelo id
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  await dbConnection.connect();  // Conectar ao banco de dados

  try {
    const subject = await Subject.findById(params.id);  // Buscar subject pelo id
    if (!subject) {
      return NextResponse.json({ error: 'Subject não encontrado' }, { status: 404 });
    }
    return NextResponse.json(subject);  // Retornar o subject encontrado
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar o subject' }, { status: 500 });
  } finally {
    await dbConnection.disconnect();
  }
}

// Função PUT para atualizar um subject pelo id
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  await dbConnection.connect();  // Conectar ao banco de dados

  try {
    const body = await request.json();  // Pegar o corpo da requisição
    const updatedSubject = await Subject.findByIdAndUpdate(params.id, body, { new: true });  // Atualizar subject
    if (!updatedSubject) {
      return NextResponse.json({ error: 'Subject não encontrado' }, { status: 404 });
    }
    return NextResponse.json(updatedSubject);  // Retornar o subject atualizado
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao atualizar o subject' }, { status: 400 });
  } finally {
    await dbConnection.disconnect();
  }
}

// Função DELETE para excluir um subject pelo id
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  await dbConnection.connect();  // Conectar ao banco de dados

  try {
    const deletedSubject = await Subject.findByIdAndDelete(params.id);  // Excluir subject
    if (!deletedSubject) {
      return NextResponse.json({ error: 'Subject não encontrado' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Subject excluído com sucesso' });  // Retornar sucesso
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao excluir o subject' }, { status: 500 });
  } finally {
    await dbConnection.disconnect();
  }
}
