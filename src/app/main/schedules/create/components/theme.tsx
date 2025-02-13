'use client'

import { FormDataSchedule } from "@/app/lib/types/types"
import { useState } from "react"
import { z } from 'zod';

type ThemeProps = {
    formDataSchedule: FormDataSchedule
    handleChangeAction: (e: React.ChangeEvent<HTMLInputElement>, step: number, index?: number, themeIndex?: number) => void
    handlePrevAction: () => void
    handleAddFieldAction: (step: number, subjectIndex?: number) => void
    handleRemoveFieldAction: (step: number, index: number, themeIndex?: number) => void
    handleSubmitAction: (e: React.FormEvent) => void
}

export default function Theme({ formDataSchedule, handleSubmitAction, handleAddFieldAction, handleChangeAction, handleRemoveFieldAction, handlePrevAction }: ThemeProps) {

    const [subjectIndex, SetSubjectIndex] = useState<number>(0);
    const [subject, SetSubject] = useState(formDataSchedule.subjects[subjectIndex]);

    const themesSchema = z.array(z.object({
        name: z.string().nonempty()
    }))


    const handleNextSubject = () => {

        try {
            const isValid = themesSchema.parse(formDataSchedule.subjects[subjectIndex].themes);
            if (isValid) {
                const newIndex = subjectIndex + 1;
                SetSubjectIndex(newIndex);
                SetSubject(formDataSchedule.subjects[newIndex]);
            }
        } catch (error) {

        }
    };

    const handlePrevSubject = () => {
        const newIndex = subjectIndex - 1;
        SetSubjectIndex(newIndex);
        SetSubject(formDataSchedule.subjects[newIndex]);
    };

    return (
        <div className='flex flex-col gap-4 p-8'>
            <h2>Themes</h2>
            <div className="flex flex-col gap-3">
                <div className="flex gap-4 justify-between">
                    <h3>{subject.name}</h3>
                    <button type="button" onClick={() => handleAddFieldAction(3, subjectIndex)} className="bg-green-400 rounded-md w-6 h-6">
                        +
                    </button>
                </div>
                {subject.themes.map((theme, themeIndex) => (
                    <div key={themeIndex} className="flex gap-4 items-center">
                        <label htmlFor={`theme-${subjectIndex}-${themeIndex}`}>Theme {themeIndex + 1}</label>
                        <input
                            className="p-2 rounded-lg dark:text-black"
                            type="text"
                            id={`theme-${subjectIndex}-${themeIndex}`}
                            value={theme.name}
                            onChange={(e) => handleChangeAction(e, 3, subjectIndex, themeIndex)}
                            placeholder="Enter theme name"
                            required
                        />
                        {subject.themes.length > 1 && (
                            <button
                                type="button"
                                onClick={() => handleRemoveFieldAction(3, subjectIndex, themeIndex)}
                                className="bg-red-400 px-2 rounded-sm"
                            >
                                -
                            </button>
                        )}
                    </div>
                ))}
            </div>
            <div className="flex gap-4">
                {
                    subjectIndex === 0 ? (
                        <button type="button" onClick={() => { handlePrevAction() }} className="p-2 bg-gray-400 rounded-lg">
                            Previous Step
                        </button>
                    ) :
                        <button type="button" onClick={() => { handlePrevSubject() }} className="p-2 bg-gray-400 rounded-lg">
                            Previous Subject
                        </button>
                }
                {
                    formDataSchedule.subjects.length - 1 === subjectIndex ? (
                        <button type="submit" onClick={e => handleSubmitAction(e)} className="p-2 bg-orange-500 rounded-lg">
                            Submit
                        </button>
                    ) : (
                        <button type="button" onClick={e => handleNextSubject()} className="p-2 bg-orange-500 rounded-lg">
                            Next Subject
                        </button>
                    )
                }
            </div>
        </div>
    )
}