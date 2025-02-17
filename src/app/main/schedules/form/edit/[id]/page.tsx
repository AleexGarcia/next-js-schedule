'use client'

import { useParams } from "next/navigation"
import { FormSchedule } from "../../components/formSchedule";
import FormSubject from "../../components/formSubject";
import FormTheme from "../../components/formTheme";
import { useEffect, useState } from "react";
import { FormDataSchedule, Subject, Theme } from "@/app/lib/types/types";
import { instance } from "@/app/lib/axios";

export default function EditSchedule() {
    const params = useParams();
    const [formData, setFormData] = useState<FormDataSchedule>({
        name: '',
        startDate: '',
        endDate: '',
        subjects: [{ name: '', themes: [{ name: '' }] }],
    });

    const [subject, setSubject] = useState<Subject | undefined>(undefined);

    useEffect(() => {
        async function getScheduleById(id: string) {
            const res = await instance.get(`schedules/${id}`);

            const newFormData: FormDataSchedule = {
                startDate: new Date(res.data.startDate).toISOString().split('T')[0],
                endDate: new Date(res.data.endDate).toISOString().split('T')[0],
                name: res.data.name,
                subjects: res.data.subjects
            }
            console.log(newFormData);
            setFormData(newFormData);
        }
        getScheduleById(params.id as string)
    }, [])

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

    const handleFormTheme = (id: string) => {
        const selectedSubject = formData.subjects.find((subject) => subject.id === id);
        setSubject(selectedSubject);
    }

    return (
        <section className="flex w-full">
            <div className="w-[33%]">
                <FormSchedule
                    formDataSchedule={formData}
                    handleChangeAction={handleChange}
                />
            </div>
            <div className="w-[33%]">
                <FormSubject
                    formDataSchedule={formData}
                    handleChangeAction={handleChange}
                    handleAddFieldAction={handleAddField}
                    handleRemoveFieldAction={handleRemoveField}
                    handleFormTheme={handleFormTheme}
                />
            </div>
            {subject ?
                <div className="w-[33%]">
                    <FormTheme
                        subject={subject}
                        subjectIndex={0}
                        handleChangeAction={handleChange}
                        handleAddFieldAction={handleAddField}
                        handleRemoveFieldAction={handleRemoveField} />
                </div>
                : <div>

                </div>
            }
        </section>
    )
}