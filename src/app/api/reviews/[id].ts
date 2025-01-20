// /src/app/api/reviews/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { dbConnection } from '@/app/lib/db_connection';  // Conectar ao MongoDB
import Review from '@/app/models/review';  // Modelo Review

// Função GET para buscar um review pelo id
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  await dbConnection.connect();  // Conectar ao banco de dados

  try {
    const review = await Review.findById(params.id);  // Buscar review pelo id
    if (!review) {
      return NextResponse.json({ error: 'Review não encontrado' }, { status: 404 });
    }
    return NextResponse.json(review);  // Retornar o review encontrado
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar o review' }, { status: 500 });
  } finally {
    await dbConnection.disconnect();
  }
}

// Função PUT para atualizar um review pelo id
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  await dbConnection.connect();  // Conectar ao banco de dados

  try {
    const body = await request.json();  // Pegar o corpo da requisição
    const updatedReview = await Review.findByIdAndUpdate(params.id, body, { new: true });  // Atualizar review
    if (!updatedReview) {
      return NextResponse.json({ error: 'Review não encontrado' }, { status: 404 });
    }
    return NextResponse.json(updatedReview);  // Retornar o review atualizado
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao atualizar o review' }, { status: 400 });
  } finally {
    await dbConnection.disconnect();
  }
}

// Função DELETE para excluir um review pelo id
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  await dbConnection.connect();  // Conectar ao banco de dados

  try {
    const deletedReview = await Review.findByIdAndDelete(params.id);  // Excluir review
    if (!deletedReview) {
      return NextResponse.json({ error: 'Review não encontrado' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Review excluído com sucesso' });  // Retornar sucesso
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao excluir o review' }, { status: 500 });
  } finally {
    await dbConnection.disconnect();
  }
}
