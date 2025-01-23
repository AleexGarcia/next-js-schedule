'use client'

import { FormDataSchedule } from "@/app/lib/types/types"


type ScheduleProps = {
    formDataSchedule: FormDataSchedule, handleChangeAction: (e: React.ChangeEvent<HTMLInputElement>, step: number, index?: number, themeIndex?: number) => void, handleNextAction: () => void
}


export function Schedule({ formDataSchedule, handleChangeAction, handleNextAction }: ScheduleProps) {
    return (
        <div>
            <h2>Step 1: Dates</h2>
            <div className="flex flex-col">
                <label htmlFor="startDate">Start Date:</label>
                <input
                    type="date"
                    name="startDate"
                    value={formDataSchedule.startDate}
                    onChange={(e) => handleChangeAction(e, 1)}
                    required
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="endDate">End Date:</label>
                <input
                    type="date"
                    name="endDate"
                    value={formDataSchedule.endDate}
                    onChange={(e) => handleChangeAction(e, 1)}
                    required
                />
            </div>
            <div className="flex gap-4">
                <button type="button" onClick={() => handleNextAction()} className="p-2 bg-orange-500 rounded-lg">
                    Next Step
                </button>
            </div>
        </div>
    )
}