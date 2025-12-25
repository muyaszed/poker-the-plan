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
        const { authorization } = client.handshake.headers;

        WebsocketGuard.validateToken(client, this.jwtService);

        return true;
    }

    static validateToken(
        client: Socket,
        jwtService: JwtService,
    ) {
        try {
            const { authorization } = client.handshake.headers;
            const token: string = authorization && typeof authorization === 'string' ? authorization.split(' ')[1] : '';
            const payload = jwtService.verify(token, {
                secret: 'asupersecretkey'
            });
            return payload;
            
        } catch(error) {
            throw new WsException('User is not authorised');
        }
    }
}