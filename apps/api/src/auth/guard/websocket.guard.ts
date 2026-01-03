import { CanActivate, Injectable, ExecutionContext, Logger } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { Socket } from "socket.io";
import { WsException } from "@nestjs/websockets";

@Injectable()
export class WebsocketGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
    ) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        if (context.getType() !== 'ws') {
            return true;
        }

        const client: Socket = context.switchToWs().getClient();

        WebsocketGuard.validateToken(client, this.jwtService);

        return true;
    }

    static validateToken(
        client: Socket,
        jwtService: JwtService,
    ) {
        try {
            const { token } = client.handshake.auth;
            const payload = jwtService.verify(token, {
                secret: process.env.JWT_SECRET
            });
            return payload;
            
        } catch(error) {
            throw new WsException('User is not authorised');
        }
    }
}