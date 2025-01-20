// /src/app/api/reviews/route.ts
import { dbConnection } from '@/app/lib/db_connection';  // Conectar com o MongoDB
import Review from '@/app/models/review';  // Modelo de Review
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  await dbConnection.connect(); // Conectar ao banco de dados

  try {
    const reviews = await Review.find();  // Buscar todos os reviews
    return NextResponse.json(reviews);  // Retornar os reviews como JSON
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar os reviews' }, { status: 500 });
  } finally {
    await dbConnection.disconnect();
  }
}

export async function POST(request: NextRequest) {
  await dbConnection.connect();  // Conectar ao banco de dados

  try {
    const body = await request.json();  // Pegar o corpo da requisição
    const review = new Review(body);  // Criar uma nova instância de Review
    await review.save();  // Salvar no banco de dados
    return NextResponse.json(review, { status: 201 });  // Retornar o review criado
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao criar o review' }, { status: 400 });
  } finally {
    await dbConnection.disconnect();
  }
}
