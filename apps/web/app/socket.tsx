'use client'

import { createContext, ReactNode, use, useEffect } from "react";
import { io, Socket } from "socket.io-client";

const socket = io(`${process.env.NEXT_PUBLIC_WS_SERVER}`, {
    autoConnect: false,
})
export const WebsocketContext = createContext<Socket>(socket);

export default function WebsocketProvider({
    children,
    token,
}: {
    children: ReactNode;
    token: string | null;
}) {
    socket.auth = {
        token,
    };
    
    useEffect(() => {
        socket.connect();

        return () => {
            socket.disconnect();
        }
    }, [])
    return <WebsocketContext.Provider value={ socket }>{ children }</WebsocketContext.Provider>
}