'use client'

import { createContext, ReactNode, use, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { verifySession } from "./auth/session";

const socket = io('ws://localhost:3002', {
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