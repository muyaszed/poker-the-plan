'use server'

import { redirect } from "next/navigation";
import { createSession, deleteSession } from "./session";

export async function signIn(formData: FormData) {
    const email = formData.get('email');
    const password = formData.get('password')
    const response = await fetch('http://localhost:3002/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    })
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message);
    }

    // create session
    await createSession({
        id: data.user.id,
        userName: data.user.username
    }, data.accessToken);
    redirect('/profile');

}

export async function signUp(formData: FormData) {
    const email = formData.get('email');
    const password = formData.get('password')
    const username = formData.get('username')

    const response = await fetch('http://localhost:3002/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, username }),
    })
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message);
    }

    // create session
    await createSession(data.user.id, data.accessToken);
    redirect('/profile');

}

export async function logout() {
    await deleteSession();
    redirect('/auth/signin')
}