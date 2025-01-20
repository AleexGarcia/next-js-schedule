// /src/app/api/users/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { dbConnection } from '@/app/lib/db_connection';  // Conectar ao MongoDB
import User from '@/app/models/user';  // Modelo User

// Função GET para buscar um usuário pelo id
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  await dbConnection.connect();  // Conectar ao banco de dados

  try {
    const user = await User.findById(params.id);  // Buscar usuário pelo id
    if (!user) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
    }
    return NextResponse.json(user);  // Retornar o usuário encontrado
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar o usuário' }, { status: 500 });
  } finally {
    await dbConnection.disconnect();
  }
}

// Função PUT para atualizar um usuário pelo id
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  await dbConnection.connect();  // Conectar ao banco de dados

  try {
    const body = await request.json();  // Pegar o corpo da requisição
    const updatedUser = await User.findByIdAndUpdate(params.id, body, { new: true });  // Atualizar usuário
    if (!updatedUser) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
    }
    return NextResponse.json(updatedUser);  // Retornar o usuário atualizado
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao atualizar o usuário' }, { status: 400 });
  } finally {
    await dbConnection.disconnect();
  }
}

// Função DELETE para excluir um usuário pelo id
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  await dbConnection.connect();  // Conectar ao banco de dados

  try {
    const deletedUser = await User.findByIdAndDelete(params.id);  // Excluir usuário
    if (!deletedUser) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Usuário excluído com sucesso' });  // Retornar sucesso
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao excluir o usuário' }, { status: 500 });
  } finally {
    await dbConnection.disconnect();
  }
}
