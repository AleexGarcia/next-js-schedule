// /src/app/api/studySchedules/route.ts

import { dbConnection } from '@/app/lib/db_connection';
import Subject from '@/app/models/subject';
import StudySchedule from '@/app/models/studyschedule';
import Theme from '@/app/models/theme';
import { jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';
import { Subject as SubjectType } from '@/app/lib/types/types';


export async function GET(request: NextRequest) {
  await dbConnection.connect();

  try {
    const studySchedules = await StudySchedule.find();
    return NextResponse.json(studySchedules);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar os studySchedules' }, { status: 500 });
  } finally {
    await dbConnection.disconnect();
  }
}

export async function POST(request: NextRequest) {
  await dbConnection.connect();

  try {
    const body = await request.json();

    const token = request.cookies.get('token')?.value;
    
    if (token) {
      
      const userId = jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
     
      const subjectsId = (await createSubjectsAndAssociatedThemes(body.subjects)).map(subject => subject._id);

      const studySchedule = new StudySchedule({
        userid: userId,
        startDate: body.startDate,
        endDate: body.endDate,
        subjects: subjectsId
      });

      await studySchedule.save();

      return NextResponse.json(studySchedule, { status: 201 });
    }

    throw new Error('Unauthorized: Token não encontrado');

  } catch (error) {
    return NextResponse.json({ error: 'Erro ao criar o studySchedule' }, { status: 400 });
  } finally {
    await dbConnection.disconnect();
  }
}


const createSubjectsAndAssociatedThemes = async (subjects: SubjectType[]) => {
  try {

    return await Promise.all(
      subjects.map(async subject => {

        const newSubject = new Subject({ name: subject.name });
        const savedSubject = await newSubject.save();

        if (subject.themes && subject.themes.length > 0) {
          await Promise.all(
            subject.themes.map(async theme => {
              const newTheme = new Theme({
                name: theme.name,
                subject: savedSubject._id,
                studyStatus: 'not_studied',
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
    throw error; // Propaga o erro para o chamador
  }
};

