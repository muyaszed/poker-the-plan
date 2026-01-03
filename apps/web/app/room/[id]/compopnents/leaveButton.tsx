'use client'

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSocket } from "../../../useSocket";

export interface LeaveButtonProps {
    roomId: string;
    userId: string | null;
    userName: string | null;
}
export default function LeaveButton({ roomId, userId, userName }: LeaveButtonProps) {
    const route = useRouter();
    const socket = useSocket()
    console.log('This leave button component')

    useEffect(() => {
        socket.on('leaveRoomCompleted', () => {
            console.log('leaveRoomCompleted')
            route.push('/room/create');
        })
    }, [])
    async function handleLeaveButton() {
        socket.emit('leaveRoom', {
            roomId,
            userId,
            userName,
        });

         
    }
    return <div className="w-25 bg-blue-200 p-2 cursor-pointer" onClick={handleLeaveButton}>Leave room</div>
}