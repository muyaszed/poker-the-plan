'use client'

import { useEffect, useState } from "react";
import { useSocket } from "../../../useSocket";
import { useRouter } from "next/navigation";

export default function UserInRoom() {
    const [showNotification, setShowNotification] = useState(false);
    const [message, setMessage] = useState('');
    const socket = useSocket();
    const router = useRouter();
    
     useEffect(() => {
        socket.on('roomMessage', (payload) => {
            router.refresh();
            setMessage(payload.message);
            setShowNotification(true);
        })
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setShowNotification(false);
        }, 3000)
    }, [showNotification]);
    return showNotification && <div className="p-3 border-2 w-50">{message}</div>
}