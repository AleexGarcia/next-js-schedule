// /src/app/api/themes/route.ts

import { dbConnection } from '@/app/lib/db_connection';  // Conectar com o MongoDB
import Theme from '@/app/models/theme';  // Modelo de Tema
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  await dbConnection.connect(); // Conectar ao banco de dados

  try {
    const themes = await Theme.find();  // Buscar todos os temas
    return NextResponse.json(themes);  // Retornar os temas como JSON
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar os temas' }, { status: 500 });
  } finally {
    await dbConnection.disconnect();
  }
}

export async function POST(request: NextRequest) {
  await dbConnection.connect();  // Conectar ao banco de dados

  try {
    const body = await request.json();  // Pegar o corpo da requisição
    const theme = new Theme(body);  // Criar uma nova instância de Theme
    await theme.save();  // Salvar no banco de dados
    return NextResponse.json(theme, { status: 201 });  // Retornar o tema criado
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao criar o tema' }, { status: 400 });
  } finally {
    await dbConnection.disconnect();
  }
}
