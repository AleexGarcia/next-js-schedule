'use server'

import { redirect } from "next/navigation";

export const createUser = async (formData: FormData) => {

    const apiUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api/users' : '/api/users';

    const user = {
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password')
    }

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
    } catch (error) {
        console.log('Erro na requisição', error);
    } finally {
        redirect('/');
    }
}

export const login = async (formData: FormData) => {

    const apiUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api/users' : '/api/auth';

    const user = {
        email: formData.get('email'),
        password: formData.get('password')
    }

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
    } catch (error) {
        console.log('Erro na requisição', error);
    } finally {
        redirect('/dashboard');
    }
}