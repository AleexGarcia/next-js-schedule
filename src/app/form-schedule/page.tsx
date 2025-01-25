'use client'
import { useState } from 'react';
import { Schedule } from '../components/forms/schedule';
import Theme from '../components/forms/theme';
import Subject from '../components/forms/subject';
import { FormDataSchedule } from '../lib/types/types';
import { createSchedule } from '../lib/actions';

type Theme = {
    name: string;
};

type Subject = {
    name: string;
    themes: Theme[];
};


export default function MultiStepForm() {

    const [step, setStep] = useState<number>(1);

    const [formData, setFormData] = useState<FormDataSchedule>({
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
        setStep(step + 1);
    };

    const handlePrev = () => {
        setStep(step - 1);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createSchedule(formData);
    };

    return (
        <div>
            <h1>Multi-Step Form</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

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
