import { redirect } from "next/navigation";
import { verifySession } from "../../auth/session";

export async function getRoom(roomId: string) {
    
    const { userId, token } = await verifySession();

    if (!userId || !token) {
        redirect('/auth/signin');
    }
    const response = await fetch(`${process.env.BACKEND_SERVER}/api/v1/rooms/${roomId}`, {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message);
    }

    return data;
}