'use server'

import { redirect } from "next/navigation";
import { createSession } from "./session";

export async function signIn(_: any, formData: FormData) {
    const email = formData.get('email');
    const password = formData.get('password')
    const response = await fetch('http://localhost:3002/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    })
    const data = await response.json();
    if (!response.ok) {
        return  {errors: data.message}
    }

    // create session
    await createSession(data.user.id, data.accessToken);
    redirect('/profile');

}

export async function signUp(_: any, formData: FormData) {
    const email = formData.get('email');
    const password = formData.get('password')
    const response = await fetch('http://localhost:3002/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    })
    const data = await response.json();
    if (!response.ok) {
        return  {errors: data.message}
    }

    // create session
    await createSession(data.user.id, data.accessToken);
    redirect('/profile');

}