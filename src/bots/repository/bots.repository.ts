import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBotDto } from '../dto/create-bot.dto';

@Injectable()
export class BotsRepository {
   constructor(private prisma: PrismaService) {}

   async createBot(dto: CreateBotDto) {
      return await this.prisma.bot.create({ data: { ...dto } });
   }

   async getUserBots(userId: number) {
      return this.prisma.bot.findMany({
         where: {
            userId,
         },
      });
   }
   async changeBot(filter: {
      where: {
         id?: number;
      };
      data: {
         status?: string;
         username?: string;
         isPremium?: boolean;
         server?: string;
         endDate?: string;
      };
   }) {
      return await this.prisma.bot.update(filter);
   }

   async getOne(filter: {
      where: {
         userId?: number;
         id?: number;
      };
   }) {
      return this.prisma.bot.findFirst({
         where: filter.where,
         include: {
            whitelist: true,
            macroses: { include: { blocks: true } },
            timers: true,
         },
      });
   }

   async setActiveMacros(botId: number, macrosId: number) {
      return await this.prisma.bot.update({
         where: { id: botId },
         data: { activeMacrosId: macrosId },
      });
   }
}
