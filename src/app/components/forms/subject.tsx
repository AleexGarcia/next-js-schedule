'use client'

import { FormDataSchedule } from "@/app/lib/types/types";

type SubjectProps = {
    formDataSchedule: FormDataSchedule
    handleChangeAction: (e: React.ChangeEvent<HTMLInputElement>, step: number, index?: number, themeIndex?: number) => void
    handleNextAction: () => void
    handlePrevAction: () => void
    handleAddFieldAction: (step: number, subjectIndex?: number) => void
    handleRemoveFieldAction: (step: number, index: number, themeIndex?: number) => void
}

export default function Subject({ formDataSchedule, handleChangeAction, handleNextAction, handlePrevAction, handleAddFieldAction, handleRemoveFieldAction }: SubjectProps) {
    return (
        <div>
            <h2>Step 2: Subjects</h2>
            {formDataSchedule.subjects.map((subject, index) => (
                <div key={index} className="flex gap-4 items-center">
                    <label htmlFor={`subject-${index}`}>Subject {index + 1}</label>
                    <input
                        type="text"
                        id={`subject-${index}`}
                        value={subject.name}
                        onChange={(e) => handleChangeAction(e, 2, index)}
                        placeholder="Enter subject name"
                        required
                    />
                    {formDataSchedule.subjects.length > 1 && (
                        <button
                            type="button"
                            onClick={() => handleRemoveFieldAction(2, index)}
                            className="bg-red-400 px-2 rounded-sm"
                        >
                            -
                        </button>
                    )}
                </div>
            ))}
            <div className="flex gap-4">
                <button type="button" onClick={() => handleAddFieldAction(2)} className="bg-green-400 rounded-md p-2">
                    Add Subject
                </button>
                <button type="button" onClick={() => { handlePrevAction() }} className="p-2 bg-gray-400 rounded-lg">
                    Previous
                </button>
                <button type="button" onClick={() => { handleNextAction() }} className="p-2 bg-orange-500 rounded-lg">
                    Next Step
                </button>
            </div>
        </div>
    )
}