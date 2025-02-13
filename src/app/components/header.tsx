'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
    const [name, setName] = useState<string>('');
    const router = useRouter();
    useEffect(() => {
        const name = localStorage.getItem('name');
        if (name) {
            setName(name);
        }

    }, [])

    const logout = async () => {
        const apiUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api/auth/logout' : '/api/auth/logout';
        try {
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            if (response.status === 200) {
                localStorage.removeItem('name');
                router.push('/');
            }
        } catch (error) {
            console.log('Erro na requisição', error);
        }
    }

        
    

    return (
        <header className="px-[5%] h-10 flex items-center justify-between bg-red-500">
            <h1>CRONOGRAMAS</h1>
            <div>
                <p>Seja Bem Vindo, {name}</p>
            </div>
            <button onClick={() => logout()}>Log out</button>
        </header>
    )
}