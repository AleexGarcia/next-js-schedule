'use client'

import { Schedule } from "@/app/home/schedules/create/components/schedule";
import Subject from "@/app/home/schedules/create/components/subject";
import Theme from "@/app/home/schedules/create/components/theme";
import { FormDataSchedule } from "@/app/lib/types/types";
import { useState } from "react";
import { object, z } from 'zod';
import { useRouter } from "next/navigation";
type Theme = {
    name: string;
};

type Subject = {
    name: string;
    themes: Theme[];
};

export default function MultiStepForm() {

    const router = useRouter();

    const generalSchema = z.object({
        name: z.string().nonempty(),
        startDate: z.string().date().nonempty(),
        endDate: z.string().date().nonempty()
    })

    const subjectsSchema = z.array(z.object({
        name: z.string().nonempty()
    }))

    const formDataSchema = z.object({
        name: z.string().nonempty(),
        startDate: z.string().date().nonempty(),
        endDate: z.string().date().nonempty(),
        subjects: z.array(z.object({
            name: z.string().nonempty(),
            themes: z.array(z.object({
                name: z.string().nonempty()
            }))
        }))
    })


    const [step, setStep] = useState<number>(1);
    const [error, setError] = useState<string>('');
    const [formData, setFormData] = useState<FormDataSchedule>({
        name: '',
        startDate: '',
        endDate: '',
        subjects: [{ name: '', themes: [{ name: '' }] }],
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        step: number,
        index?: number,
        themeIndex?: number
    ) => {
        const { name, value } = e.target;

        if (step === 1) {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }

        if (step === 2 && index !== undefined) {
            const newSubjects = [...formData.subjects];
            newSubjects[index].name = value;
            setFormData((prevData) => ({
                ...prevData,
                subjects: newSubjects,
            }));
        }

        if (step === 3 && index !== undefined && themeIndex !== undefined) {
            const newSubjects = [...formData.subjects];
            newSubjects[index].themes[themeIndex].name = value;
            setFormData((prevData) => ({
                ...prevData,
                subjects: newSubjects,
            }));
        }
    };

    const handleAddField = (step: number, subjectIndex?: number) => {
        if (step === 2) {
            setFormData((prevData) => ({
                ...prevData,
                subjects: [...prevData.subjects, { name: '', themes: [{ name: '' }] }],
            }));
        }

        if (step === 3) {
            const newSubjects = [...formData.subjects];

            for (let index = 0; index < newSubjects.length; index++) {
                if (index === subjectIndex) {
                    newSubjects[index].themes.push({ name: '' });
                    break;
                }
            }

            setFormData((prevData) => ({
                ...prevData,
                subjects: newSubjects,
            }));
        }
    };

    const handleRemoveField = (step: number, index: number, themeIndex?: number) => {
        if (step === 2) {
            const newSubjects = formData.subjects.filter((_, i) => i !== index);
            setFormData((prevData) => ({
                ...prevData,
                subjects: newSubjects,
            }));
        }

        if (step === 3 && themeIndex !== undefined) {
            const newSubjects = [...formData.subjects];
            newSubjects[index].themes = newSubjects[index].themes.filter((_, i) => i !== themeIndex);
            setFormData((prevData) => ({
                ...prevData,
                subjects: newSubjects,
            }));
        }
    };

    const handleNext = () => {
        if (step === 1) {
            const isValid = generalSchema.parse({
                name: formData.name,
                startDate: formData.startDate,
                endDate: formData.endDate,
            })
            isValid ? setStep(step + 1) : setError('');
        } else if (step === 2) {
            const isValid = subjectsSchema.parse(formData.subjects);
            isValid ? setStep(step + 1) : setError('');
        }
    };

    const handlePrev = () => {
        setStep(step - 1);
    };

    const createSchedule = async (schedule: FormDataSchedule) => {

        const apiUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api/schedules' : '/api/schedules';

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(schedule),
            })
            if (response.status === 201){
                router.push('/home/schedules')
            }
        } catch (error) {
            console.log('Erro na requisição', error);
        }
    }


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const isValid = formDataSchema.parse(formData);
        if (isValid) {
            createSchedule(formData);
        }

    };

    return (
        <div className="flex-grow">
            <h1 className="text-center">Create a new Schedule</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center">
                {step === 1 && (
                    <Schedule
                        formDataSchedule={formData}
                        handleChangeAction={handleChange}
                        handleNextAction={handleNext}
                    />
                )}

                {step === 2 && (
                    <Subject
                        formDataSchedule={formData}
                        handleAddFieldAction={handleAddField}
                        handleChangeAction={handleChange}
                        handleNextAction={handleNext}
                        handlePrevAction={handlePrev}
                        handleRemoveFieldAction={handleRemoveField}

                    />
                )}

                {step === 3 && (
                    <Theme
                        formDataSchedule={formData}
                        handleChangeAction={handleChange}
                        handleAddFieldAction={handleAddField}
                        handlePrevAction={handlePrev}
                        handleRemoveFieldAction={handleRemoveField}
                        handleSubmitAction={handleSubmit}
                    />
                )}

            </form>
        </div>
    );
}
