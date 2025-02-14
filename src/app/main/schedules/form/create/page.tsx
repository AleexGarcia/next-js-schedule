'use client'

import { FormSchedule } from "@/app/main/schedules/form/components/formSchedule";
import FormSubject from "@/app/main/schedules/form/components/formSubject";
import FormTheme from "@/app/main/schedules/form/components/formTheme";
import { FormDataSchedule } from "@/app/lib/types/types";
import { useState } from "react";
import { z } from 'zod';
import { useRouter } from "next/navigation";
import { instance } from "@/app/lib/axios";

const generalSchema = z.object({
    name: z.string().nonempty(),
    startDate: z.string().date().nonempty(),
    endDate: z.string().date().nonempty()
})

const subjectsSchema = z.array(z.object({
    name: z.string().nonempty()
}))

const themesSchema = z.array(z.object({
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

export default function MultiStepForm() {

    const router = useRouter();

    const [step, setStep] = useState<number>(1);
    const [error, setError] = useState<string>('');
    const [formData, setFormData] = useState<FormDataSchedule>({
        name: '',
        startDate: '',
        endDate: '',
        subjects: [{ name: '', themes: [{ name: '' }] }],
    });

    const [subjectIndex, SetSubjectIndex] = useState<number>(0);
    const [subject, SetSubject] = useState(formData.subjects[subjectIndex]);


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
    const handleNextSubject = () => {

        try {
            const isValid = themesSchema.parse(formData.subjects[subjectIndex].themes);
            if (isValid) {
                const newIndex = subjectIndex + 1;
                SetSubjectIndex(newIndex);
                SetSubject(formData.subjects[newIndex]);
            }
        } catch (error) {

        }
    };

    const handlePrevSubject = () => {
        const newIndex = subjectIndex - 1;
        SetSubjectIndex(newIndex);
        SetSubject(formData.subjects[newIndex]);
    };
    const handlePrev = () => {
        setStep(step - 1);
    };

    const createSchedule = async (schedule: FormDataSchedule) => {
        try {
            const res = await instance.post('schedules', JSON.stringify(schedule));
            if (res.status === 201) {
                router.push('/main/schedules')
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
                    <FormSchedule
                        formDataSchedule={formData}
                        handleChangeAction={handleChange}
                        handleNextAction={handleNext}
                    />
                )}

                {step === 2 && (
                    <FormSubject
                        formDataSchedule={formData}
                        handleAddFieldAction={handleAddField}
                        handleChangeAction={handleChange}
                        handleNextAction={handleNext}
                        handlePrevAction={handlePrev}
                        handleRemoveFieldAction={handleRemoveField}

                    />
                )}

                {step === 3 && (
                    <FormTheme
                        subject={subject}
                        subjectIndex={subjectIndex}
                        handleChangeAction={handleChange}
                        handleAddFieldAction={handleAddField}
                        handleRemoveFieldAction={handleRemoveField}
                    />
                )}


                <div className="flex gap-4">

                    {(step > 1 || step === 3 && subjectIndex === 0) &&
                        (
                            <button type="button" onClick={() => { handlePrev() }} className="p-2 bg-gray-400 rounded-lg">
                                Previous Step
                            </button>
                        )
                    }

                    {step < 3 && (
                        <button type="button" onClick={() => { handleNext() }} className="p-2 bg-gray-400 rounded-lg">
                            Next Step
                        </button>
                    )}

                    {step === 3 && (
                        <>
                            {subjectIndex > 0 && (
                                <button type="button" onClick={() => { handlePrevSubject() }} className="p-2 bg-gray-400 rounded-lg">
                                    Previous Subject
                                </button>
                            )}
                            {subjectIndex < formData.subjects.length - 1 ? (
                                <button type="button" onClick={e => handleNextSubject()} className="p-2 bg-orange-500 rounded-lg">
                                    Next Subject
                                </button>
                            ) : (
                                <button type="submit" className="p-2 bg-orange-500 rounded-lg">
                                    Submit
                                </button>
                            )}
                        </>
                    )}

                </div>
            </form>
        </div>
    );
}
