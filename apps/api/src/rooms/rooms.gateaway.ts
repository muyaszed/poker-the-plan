import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { Socket } from "socket.io";
import { EventsGateway } from "src/events/events.gateway";
import { JwtService } from "@nestjs/jwt";
import { RoomsService } from "src/rooms/rooms.service";
import { Inject, forwardRef } from "@nestjs/common";

@WebSocketGateway()
export class RoomsGateway extends EventsGateway {
    constructor(
        @Inject(forwardRef(() => RoomsService))
        private readonly roomService: RoomsService,
    ) {
        super(new JwtService());
    }

    @SubscribeMessage('enterRoom')
    handleEnterRoom(@ConnectedSocket() client: Socket, @MessageBody() payload: {
        roomId: string;
        userId: string;
        userName: string;
    }): void {
        client.join(payload.roomId);
        this.roomService.enter(payload.roomId, {userId: payload.userId})
        client.emit('enterRoomCompleted');
        client.to(payload.roomId).emit('roomMessage', {
            message: `${payload.userName} has joined the room ${payload.roomId}`,
            timestamp: new Date().toISOString(),
        })
        
    }

    @SubscribeMessage('leaveRoom')
    handleLeaveRoom(@ConnectedSocket() client: Socket, @MessageBody() payload: {
        roomId: string;
        userId: string;
        userName: string;
    }): void {
        client.leave(payload.roomId);
        this.roomService.leave(payload.roomId, {userId: payload.userId})
        client.emit('leaveRoomCompleted');
        client.to(payload.roomId).emit('roomMessage', {
            message: `${payload.userName} has left the room ${payload.roomId}`,
            timestamp: new Date().toISOString(),
        });
       
    }

    updateRooms() {
        this.server.emit('updateRooms');
    }
}
