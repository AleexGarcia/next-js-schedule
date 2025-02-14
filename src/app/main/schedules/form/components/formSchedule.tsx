'use client'

import { FormDataSchedule } from "@/app/lib/types/types"


type ScheduleProps = {
    formDataSchedule: FormDataSchedule, handleChangeAction: (e: React.ChangeEvent<HTMLInputElement>, step: number, index?: number, themeIndex?: number) => void
}


export function FormSchedule({ formDataSchedule, handleChangeAction }: ScheduleProps) {
    return (
        <div className="flex flex-col p-4 gap-4 max-w-xs">
            <h2>General Information</h2>
            <div className="flex flex-col gap-2">
                <label htmlFor="startDate">Name:</label>
                <input
                    className="p-2 rounded-lg dark:text-black"
                    type="text"
                    name="name"
                    value={formDataSchedule.name}
                    onChange={(e) => handleChangeAction(e, 1)}
                    required
                />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="startDate">Start Date:</label>
                <input
                    className="p-2 rounded-lg dark:text-black"
                    type="date"
                    name="startDate"
                    value={formDataSchedule.startDate}
                    onChange={(e) => handleChangeAction(e, 1)}
                    required
                />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="endDate">End Date:</label>
                <input
                    className="p-2 rounded-lg dark:text-black"
                    type="date"
                    name="endDate"
                    value={formDataSchedule.endDate}
                    onChange={(e) => handleChangeAction(e, 1)}
                    required
                />
            </div>
        </div>
    )
}