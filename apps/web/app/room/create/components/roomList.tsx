'use client'

import { 
    removeRoom } from "../action";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {useSocket} from '../../../useSocket'

export interface RoomListProps {
    data: any;
    myRooms: any[];
    userId: string|null;
    userName: string|null
}

export function RoomList({
    data,
    myRooms,
    userId,
    userName
}: RoomListProps) {
    const router = useRouter();
    const socket = useSocket();
     
    useEffect(() => {
        socket.on('updateRooms', () => {
            router.refresh();
        });

         
        
    }, [])
    async function handleJoin(roomId: string) {
        socket.emit('enterRoom', {
            roomId,
            userId,
            userName
        })
       socket.on('enterRoomCompleted', () => {
                    console.log('enterRoomCompleted')

            router.push(`/room/${roomId}`);
        })
    }

    async function handleDelete(event: React.MouseEvent<HTMLElement>) {
        console.log(event.currentTarget.id)
        await removeRoom(event.currentTarget.id)
    }
    return <div className="w-[40%] p-10">
        <div className="mb-5">Rooms</div>
        {
            data.length && <ul className="border-2 border-gray-200 p-2">
                {
                    data.map((room: any, index: number) => (<li className="flex gap-10 p-2" key={`${index}-${room.id}`} id={room.id}>
                        <div>{room.name}</div>
                        <div className="flex gap-5">
                            <div className="w-20 bg-blue-200 p-2 cursor-pointer" onClick={() => handleJoin(room.id)}>Join</div>
                            {myRooms.find(myRoom => myRoom.id === room.id) && <div className="w-20 bg-blue-200 p-2 cursor-pointer" id={room.id} onClick={handleDelete}>Delete</div>}
                        </div>
                    </li>))
                }
            </ul>
        }
    </div>
}