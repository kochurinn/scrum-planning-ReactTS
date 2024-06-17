import { createContext, useContext } from "react";
import { Socket } from "socket.io-client";

export const SocketContext = createContext<Socket | null>(null);

export const useSocketContext = () => {
    const socket = useContext(SocketContext)
    if (!socket) throw new Error('Нельзя использовать сокет без провайдера')
    return socket
}
