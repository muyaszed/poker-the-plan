// import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Socket } from "socket.io"
import { WebsocketGuard } from "../guard/websocket.guard";


export type SocketIOMiddleware = {
    (client: Socket, next: (err?: Error) => void)
};

export const SocketAuthMiddleware = (
    jwtService: JwtService,
): SocketIOMiddleware => {
    return (client, next) => {
        try {
            WebsocketGuard.validateToken(client, jwtService);
            next();
        } catch(error) {
            next(error);
        }
    }
}