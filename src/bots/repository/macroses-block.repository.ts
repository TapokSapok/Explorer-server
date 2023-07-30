import { Injectable } from '@nestjs/common';
import { MacrosBlock } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBotMacrosBlockDto } from '../dto/create-macros-block.dto';

@Injectable()
export class BotMacrosesBlockRepository {
   constructor(private prisma: PrismaService) {}

   async create(dto: CreateBotMacrosBlockDto): Promise<MacrosBlock> {
      return await this.prisma.macrosBlock.create({ data: dto });
   }

   async remove(id: number): Promise<MacrosBlock> {
      return await this.prisma.macrosBlock.delete({ where: { id } });
   }

   async getManyByMacrosId(macrosId: number): Promise<MacrosBlock[]> {
      return await this.prisma.macrosBlock.findMany({
         where: { macrosId },
      });
   }

   async removeAll(macrosId: number) {
      return await this.prisma.macrosBlock.deleteMany({ where: { macrosId } });
   }

   async createMany(blocks: CreateBotMacrosBlockDto[]) {
      return await this.prisma.macrosBlock.createMany({ data: blocks });
   }
}
