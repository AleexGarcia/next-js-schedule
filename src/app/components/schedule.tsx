'use client'

type FormData = {
    startDate: string;
    endDate: string;
    subjects: {
        name: string;
        themes: {
            name: string;
        }[];
    }[];

}

type ScheduleProps = {
    formData: FormData, handleChangeAction: (e: React.ChangeEvent<HTMLInputElement>, step: number, index?: number, themeIndex?: number) => void, handleNextAction: () => void
}


export function Schedule({ formData, handleChangeAction, handleNextAction }: ScheduleProps) {
    return (
        <div>
            <h2>Step 1: Dates</h2>
            <div className="flex flex-col">
                <label htmlFor="startDate">Start Date:</label>
                <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={(e) => handleChangeAction(e, 1)}
                    required
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="endDate">End Date:</label>
                <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
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