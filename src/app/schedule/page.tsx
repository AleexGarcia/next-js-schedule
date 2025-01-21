import { createSchedule } from "../lib/actions";

export default function Schedule() {
    return (

        <form method="POST" className="flex gap-4 flex-col p-4 max-w-[275px]" action={createSchedule}>
            <div className="flex flex-col">
                <label htmlFor="">Start</label>
                <input className="px-2 py-1" type="date" />
            </div>
            <div className="flex flex-col">
                <label htmlFor="">End</label>
                <input className="px-2 py-1" type="date" />
            </div>
            <button className="p-2 rounded-lg bg-orange-500" type="submit">Next Step </button>
        </form>

    )
}