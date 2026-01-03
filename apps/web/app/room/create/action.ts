'use server'

import { redirect } from "next/navigation";
import { verifySession } from "../../auth/session";
import { refresh } from "next/cache";

export async function createNewRoom(formData: FormData) {
    const name = formData.get('name');
    const { userId, token } = await verifySession();

    if (!userId || !token) {
        redirect('/auth/signin');
    }
    const response = await fetch(`${process.env.BACKEND_SERVER}/api/v1/rooms`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name, userId }),
    })
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message);
    }

    refresh()
}

export async function removeRoom(roomId: string) {
     const { userId, token } = await verifySession();

    if (!userId || !token) {
        redirect('/auth/signin');
    }
    const response = await fetch(`${process.env.BACKEND_SERVER}/api/v1/rooms/${roomId}`, {
        method: 'DELETE',
        headers: { 
            'Authorization': `Bearer ${token}`
        },
    })
        console.log(response)

    refresh()
}

export async function getAllRooms() {
    const { userId, token } = await verifySession();
    if (!userId || !token) {
        redirect('/auth/signin');
    }

    const response = await fetch(`${process.env.BACKEND_SERVER}/api/v1/rooms`, {
        method: 'GET',
        headers: { 
            'Authorization': `Bearer ${token}`
        },
    })
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message);
    }
    return data;
}

export async function getMyRooms() {
    const { userId, token } = await verifySession();
    if (!userId || !token) {
        redirect('/auth/signin');
    }

    const response = await fetch(`${process.env.BACKEND_SERVER}/api/v1/rooms/my-room/${userId}`, {
        method: 'GET',
        headers: { 
            'Authorization': `Bearer ${token}`
        },
    })
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message);
    }
    return data;
}
