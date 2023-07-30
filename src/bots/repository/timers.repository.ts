import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTimerDto } from '../dto/create-timer.dto';
import { UpdateTimerDto } from '../dto/update-timer.dto';

@Injectable()
export class TimersRepository {
   constructor(private prisma: PrismaService) {}

   async create(dto: CreateTimerDto) {
      return await this.prisma.timer.create({ data: dto });
   }

   async update(id: number, dto: UpdateTimerDto) {
      return await this.prisma.timer.update({
         where: { id },
         data: { message: dto.message, interval: dto.interval },
      });
   }

   async remove(id: number) {
      return await this.prisma.timer.delete({ where: { id } });
   }

   async getByBotId(botId: number) {
      return await this.prisma.timer.findMany({
         where: { botId },
         orderBy: { id: 'desc' },
      });
   }
}
