import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class WebsocketService
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private connectedClients: Socket[] = [];

  afterInit(server: Server) {
    console.log('WebSocket Initialized!');
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
    this.connectedClients.push(client);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.connectedClients = this.connectedClients.filter(
      (c) => c.id !== client.id,
    );
  }

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, text: string): void {
    this.server.emit('msgToClient', text);
  }
  sendJsonDataToAll<T>(event: string, data: T): void {
    if (this.connectedClients.length > 0) {
      const json = JSON.stringify(data);
      this.server.emit(event, json);
    }
  }
}
