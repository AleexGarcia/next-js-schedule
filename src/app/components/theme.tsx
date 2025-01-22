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

type ThemeProps = {
    formData: FormData
    handleChangeAction: (e: React.ChangeEvent<HTMLInputElement>, step: number, index?: number, themeIndex?: number) => void
    handlePrevAction: () => void
    handleAddFieldAction: (step: number, subjectIndex?: number) => void
    handleRemoveFieldAction: (step: number, index: number, themeIndex?: number) => void
    handleSubmitAction: (e: React.FormEvent) => void
}


export default function Theme({formData,handleSubmitAction, handleAddFieldAction, handleChangeAction, handleRemoveFieldAction, handlePrevAction }: ThemeProps) {
    return (
        <div className='flex flex-col gap-4 p-8'>
            <h2>Step 3: Themes</h2>
            {formData.subjects.map((subject, index) => (
                <div key={index} className="flex flex-col gap-3">
                    <div className="flex gap-4 justify-between">
                        <h3>Subject {index + 1}: {subject.name}</h3>
                        <button type="button" onClick={() => handleAddFieldAction(3, index)} className="bg-green-400 rounded-md p-2">
                            Add
                        </button>
                    </div>
                    {subject.themes.map((theme, themeIndex) => (
                        <div key={themeIndex} className="flex gap-4 items-center">
                            <label htmlFor={`theme-${index}-${themeIndex}`}>Theme {themeIndex + 1}</label>
                            <input
                                type="text"
                                id={`theme-${index}-${themeIndex}`}
                                value={theme.name}
                                onChange={(e) => handleChangeAction(e, 3, index, themeIndex)}
                                placeholder="Enter theme name"
                                required
                            />
                            {subject.themes.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => handleRemoveFieldAction(3, index, themeIndex)}
                                    className="bg-red-400 px-2 rounded-sm"
                                >
                                    -
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            ))}
            <div className="flex gap-4">
                <button type="button" onClick={() => { handlePrevAction() }} className="p-2 bg-gray-400 rounded-lg">
                    Previous
                </button>
                <button type="submit" onClick={e => handleSubmitAction(e)} className="p-2 bg-orange-500 rounded-lg">
                    Submit
                </button>
            </div>
        </div>
    )
}