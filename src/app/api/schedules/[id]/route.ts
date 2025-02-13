// /src/app/api/studySchedules/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { dbConnection } from '@/app/lib/db_connection';  // Conectar ao MongoDB
import Schedule from '@/app/models/schedule';  // Modelo StudySchedule
import Subject from '@/app/models/subject';
import Theme from '@/app/models/theme';

// Função GET para buscar um studySchedule pelo id
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    await dbConnection.connect();  // Conectar ao banco de dados

    try {
        const schedule = await Schedule.findById(params.id);  // Buscar studySchedule pelo id
        if (!schedule) {
            return NextResponse.json({ error: 'StudySchedule não encontrada' }, { status: 404 });
        }
        return NextResponse.json(schedule);  // Retornar o studySchedule encontrado
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
        const updatedSchedule = await Schedule.findByIdAndUpdate(params.id, body, { new: true });  // Atualizar studySchedule
        if (!updatedSchedule) {
            return NextResponse.json({ error: 'StudySchedule não encontrada' }, { status: 404 });
        }
        return NextResponse.json(updatedSchedule);  // Retornar o studySchedule atualizado
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao atualizar o studySchedule' }, { status: 400 });
    } finally {
        await dbConnection.disconnect();
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    await dbConnection.connect();
    try {
        const { id } = await params;
        const deletedSchedule = await Schedule.findOneAndDelete({_id: id}).exec();
        const subjects = await Subject.find({ scheduleId: id }).exec();

        const deletesThemes = Promise.all(subjects.map(async subject => {
            return await Theme.deleteMany({ subjectId: subject._id })
        }));
    
        const deletedSubjects = await Subject.deleteMany({scheduleId: id})

        if (!deletedSchedule) {
            return NextResponse.json({ error: 'StudySchedule não encontrada' }, { status: 404 });
        }
        return NextResponse.json({ message: 'StudySchedule excluída com sucesso' }, { status: 200 });  // Retornar sucesso
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao excluir o studySchedule' }, { status: 500 });
    } finally {
        await dbConnection.disconnect();
    }
}
