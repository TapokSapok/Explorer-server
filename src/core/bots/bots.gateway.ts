import { BotsRepository } from './repository/bots.repository';
import { OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { Body, UseGuards } from '@nestjs/common/decorators';
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import {
   ConnectedSocket,
   MessageBody,
   WebSocketServer,
} from '@nestjs/websockets/decorators';
import {
   OnGatewayConnection,
   OnGatewayDisconnect,
   OnGatewayInit,
} from '@nestjs/websockets/interfaces';
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@WebSocketGateway({ cors: true })
export class BotsGateway implements OnGatewayConnection {
   constructor(
      private botsRepository: BotsRepository,
      private jwtService: JwtService
   ) {}
   private server: Server;

   async handleConnection(client: Socket) {
      const payload = this.jwtService.decode(client.handshake.auth.token);
      if (!payload) return;
   }

   @SubscribeMessage('getMyBots')
   async getMyBots(@ConnectedSocket() client: Socket) {
      const user = this.jwtService.decode(client.handshake.auth.token) as User;
      if (!user) {
         client.emit('alert', {
            message: 'Пользователь не авторизован',
            type: 'red',
         });
         return;
      }

      const bots = await this.botsRepository.getUserBots(Number(user.id));
      client.emit('setBots', bots);
   }
}
