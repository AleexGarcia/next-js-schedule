import Link from "next/link";
import Footer from "../components/footer";
import Header from "../components/header";

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Header />
            <main className="py-5 px-[5%] flex flex-grow gap-4">
                <nav className="border-r-2 px-10 py-4">
                    <ul className="flex gap-2 flex-col">
                        <li><Link href={"/main/dashboard"}>Dashboard</Link></li>
                        <li><Link href={"/main/schedules"}>Schedules</Link></li>
                    </ul>
                </nav>
                {children}
            </main>
            <Footer />
        </>
    );
}