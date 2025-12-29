import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { Logger, UseGuards } from '@nestjs/common';
import { WebsocketGuard } from 'src/auth/guard/websocket.guard';
import { SocketAuthMiddleware } from 'src/auth/middleware/websocket.middleware';

@WebSocketGateway({ namespace: 'events' })
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
    Logger.log('Handle connection');
  }
  
  @SubscribeMessage('message')
  handleMessage(@ConnectedSocket() client: Socket, @MessageBody() payload: any): void {
    Logger.log({payload}, "Recieved message")
    this.server.emit('message', {
      message: `Broadcast to all: ${payload.message || ''}`,
      // message: `Broadcast to all: ${JSON.parse(payload).message || ''}`,
      timestamp: new Date().toISOString(),
      fromClient: client.id,
    })
  }

  sendMessage(message: string) {
    this.server.emit('newMessage', message);
  }
}
