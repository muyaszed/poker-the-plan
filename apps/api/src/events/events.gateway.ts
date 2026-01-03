import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { Logger, UseGuards } from '@nestjs/common';
import { WebsocketGuard } from 'src/auth/guard/websocket.guard';
import { SocketAuthMiddleware } from 'src/auth/middleware/websocket.middleware';

@WebSocketGateway({ 
  cors: {
    origin: ['http://localhost:3000']
  }
})
@UseGuards(WebsocketGuard)
export class EventsGateway {
  constructor(
    private readonly jwtService: JwtService,
  ) {}
  @WebSocketServer()
  server: Server;

  afterInit(client: Socket) {
    client.use(
      SocketAuthMiddleware(this.jwtService) as any,
    );
  }

  handleConnection(client: Socket) {
    Logger.log('Websocket connected');
  }

  handleDisconnect() {
    Logger.log('Websocket disconnected');
  }
}
