import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBotDto } from '../dto';

@Injectable()
export class BotsRepository {
   constructor(private prisma: PrismaService) {}

   async createBot(dto: CreateBotDto) {
      return await this.prisma.bot.create({ data: dto });
   }

   async getUserBots(userId: number) {
      return this.prisma.bot.findMany({
         where: {
            userId,
         },
      });
   }
}
