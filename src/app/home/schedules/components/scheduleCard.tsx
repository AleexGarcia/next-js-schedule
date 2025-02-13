import Link from "next/link"

type ScheduleCardProps = {
    name: string
    startDate: string
    endDate: string
    id: string
    removeSchedule: (id:string) => Promise<void>
}



export default function ScheduleCard({ name, startDate, endDate, id,removeSchedule }: ScheduleCardProps) {

    return (
        <div className="p-4 rounded-md bg-slate-600 w-[200px] h-[200px] flex flex-col gap-4">
            <h3>{name}</h3>
            <div className="flex flex-col gap-2 flex-grow">
                <span>Start: {new Date(startDate).toLocaleDateString('pt-BR')}</span>
                <span>End: {new Date(endDate).toLocaleDateString('pt-BR')}</span>
            </div>
            <div className="flex justify-between">
                <button onClick={() => removeSchedule(id)}>Delete</button>
                <Link href={'/home/schedules/edit'}>Edit</Link>
            </div>
        </div>
    )
}