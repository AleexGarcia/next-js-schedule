// /src/app/api/studySchedules/route.ts

import { dbConnection } from '@/app/lib/db_connection';
import { FormDataSchedule } from '@/app/lib/types/types';
import Schedule from '@/app/models/schedule';
import Subject from '@/app/models/subject';
import Theme from '@/app/models/theme'
import { jwtVerify } from 'jose';
import { ObjectId } from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';



export async function GET(request: NextRequest) {
  await dbConnection.connect();

  try {
    const schedule = await Schedule.find();

    return NextResponse.json(schedule);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar os studySchedules' }, { status: 500 });
  } finally {
    await dbConnection.disconnect();
  }
}

export async function POST(request: NextRequest) {
  await dbConnection.connect();

  try {
    const body: FormDataSchedule = await request.json();

    const token = request.cookies.get('token')?.value;

    if (token) {

      const jwt = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));

      const newSchedule = {
        userId: jwt.payload.userId,
        name: body.name,
        startDate: body.startDate,
        endDate: body.endDate,
      }

      const schedule = new Schedule(newSchedule);

      await schedule.save();

      const scheduleId = schedule._id;
      await createSubjectsAndAssociatedThemes(body.subjects, scheduleId);

      return NextResponse.json({ message: 'Schedule Adicionado com Sucesso!' }, { status: 201 });
    }

    throw new Error('Unauthorized: Token não encontrado');

  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Erro ao criar o Schedule' }, { status: 400 });
  } finally {
    await dbConnection.disconnect();
  }
}


const createSubjectsAndAssociatedThemes = async (subjects: { name: string, themes: { name: string }[]}[], scheduleId: ObjectId) => {
  try {

    return await Promise.all(
      subjects.map(async subject => {

        const newSubject = new Subject({ name: subject.name, scheduleId: scheduleId });

        const savedSubject = await newSubject.save();

        if (subject.themes && subject.themes.length > 0) {
          await Promise.all(
            subject.themes.map(async theme => {
              const newTheme = new Theme({
                name: theme.name,
                subjectId: savedSubject._id,
                studyStatus: 'not_studied',
                reviews: null
              });
              await newTheme.save();
            })
          );
        }

        return savedSubject;
      })
    );


  } catch (error) {
    console.error("Erro ao criar Subjects e Themes:", error);
    throw error;
  }
};

