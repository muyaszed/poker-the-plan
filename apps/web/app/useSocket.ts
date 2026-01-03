'use client'

import { useContext } from "react"
import { WebsocketContext } from "./socket"

export const useSocket = () => {
    const context = useContext(WebsocketContext);
    if(!context) {
        throw new Error('useSocket must be used within WebsocketProvider')
    }

    return context
}