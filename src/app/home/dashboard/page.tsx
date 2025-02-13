
export default function Dashboard() {
    return (
        <>
            <div className="flex-grow p-4 rounded-2xl bg-slate-700 grid gap-4">
                <div className="rounded-2xl p-4 bg-black">Calendario</div>
                <div className="rounded-2xl p-4 bg-black">Tasks</div>
            </div>
            <div className="w-[25%]  p-4 rounded-2xl bg-red-800 grid gap-2 ">
                <div className="p-4 bg-black rounded-2xl">BOX 1</div>
                <div className="p-4 bg-black rounded-2xl">BOX 2</div>
                <div className="p-4 bg-black rounded-2xl">BOX 3</div>
            </div>

        </>
    )
}