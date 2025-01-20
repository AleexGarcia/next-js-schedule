// /src/app/api/themes/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { dbConnection } from '@/app/lib/db_connection';  // Função para conectar ao MongoDB
import Theme from '@/app/models/theme';  // Modelo Theme

// Função GET para buscar um tema pelo id
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  await dbConnection.connect();  // Conectar ao banco de dados

  try {
    const theme = await Theme.findById(params.id);  // Buscar tema pelo id
    if (!theme) {
      return NextResponse.json({ error: 'Tema não encontrado' }, { status: 404 });
    }
    return NextResponse.json(theme);  // Retornar o tema encontrado
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar o tema' }, { status: 500 });
  }finally {
    await dbConnection.disconnect();
  }
}

// Função PUT para atualizar um tema pelo id
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  await dbConnection.connect();  // Conectar ao banco de dados

  try {
    const body = await request.json();  // Pegar o corpo da requisição
    const updatedTheme = await Theme.findByIdAndUpdate(params.id, body, { new: true });  // Atualizar tema
    if (!updatedTheme) {
      return NextResponse.json({ error: 'Tema não encontrado' }, { status: 404 });
    }
    return NextResponse.json(updatedTheme);  // Retornar o tema atualizado
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao atualizar o tema' }, { status: 400 });
  }finally {
    await dbConnection.disconnect();
  }
}

// Função DELETE para excluir um tema pelo id
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  await dbConnection.connect();  // Conectar ao banco de dados

  try {
    const deletedTheme = await Theme.findByIdAndDelete(params.id);  // Excluir tema
    if (!deletedTheme) {
      return NextResponse.json({ error: 'Tema não encontrado' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Tema excluído com sucesso' });  // Retornar sucesso
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao excluir o tema' }, { status: 500 });
  }finally {
    await dbConnection.disconnect();
  }
}
