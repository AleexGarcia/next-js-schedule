'use client'

import { FormDataSchedule } from "@/app/lib/types/types"
import { useState } from "react"
import { z } from 'zod';

type ThemeProps = {
    subject: {name: string, themes:{name:string}[]},
    subjectIndex: number
    handleChangeAction: (e: React.ChangeEvent<HTMLInputElement>, step: number, index?: number, themeIndex?: number) => void
    handleAddFieldAction: (step: number, subjectIndex?: number) => void
    handleRemoveFieldAction: (step: number, index: number, themeIndex?: number) => void
}

export default function FormTheme({ subject,subjectIndex, handleAddFieldAction, handleChangeAction, handleRemoveFieldAction }: ThemeProps) {

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
      
        </div>
    )
}