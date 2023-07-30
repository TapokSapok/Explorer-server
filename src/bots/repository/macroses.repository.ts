import { Injectable } from '@nestjs/common';
import { BotMacros } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBotMacrosDto } from '../dto/create-macros.dto';
import { UpdateMacrosDto } from '../dto/update-macros.dto';

@Injectable()
export class BotMacrosesRepository {
   constructor(private prisma: PrismaService) {}

   async create(dto: CreateBotMacrosDto): Promise<BotMacros> {
      return await this.prisma.botMacros.create({ data: { ...dto } });
   }

   async remove(id: number): Promise<BotMacros> {
      return await this.prisma.botMacros.delete({ where: { id } });
   }

   async update(dto: UpdateMacrosDto) {
      return await this.prisma.botMacros.update({
         where: { id: dto.macrosId },
         data: dto.data,
      });
   }

   async getManyByBotId(botId: number): Promise<BotMacros[]> {
      return await this.prisma.botMacros.findMany({
         where: { botId },
         include: { blocks: true },
      });
   }

   async getOneById(id: number) {
      return await this.prisma.botMacros.findUnique({
         where: { id },
         include: { blocks: true },
      });
   }
}
