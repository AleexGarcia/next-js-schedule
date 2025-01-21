import Link from "next/link";

export default function Dashboard() {
    return (
        <>
            <header className="px-[5%] h-10 flex items-center justify-between bg-red-500">
                <h1>CRONOGRAMA ENEM</h1>
                <div>
                    <p>Seja Bem Vindo, Nome Usuário</p>
                </div>
                <button>Log out</button>
            </header>
            <main className="py-5 px-[5%] flex min-h-[calc(100vh-2.5rem)]">
                <div className="w-[20%]">
                    <nav>
                        <ul className="flex gap-2 flex-col">
                            <li><Link href={"/dashboard"}>Dashboard</Link></li>
                            <li><Link href={"/schedule"}>Schedule</Link></li>
                            <li><Link href={"/subjects"}>Subjects</Link></li>
                        </ul>
                    </nav>
                </div>
                <div className="flex-grow">
                    <div>Calendario com temas a serem estudados em cada dia</div>
                </div>
                <div className="w-[25%] bg-red-800">
                    <div>Subjects Progresss</div>
                    <div></div>
                </div>
            </main>
        </>
    )
}