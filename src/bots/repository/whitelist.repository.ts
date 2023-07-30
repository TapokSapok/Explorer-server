import { Injectable } from '@nestjs/common';
import { BotWhitelistUser } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateWhitelistUser } from '../dto/create-whitelist-user.dto';

@Injectable()
export class BotWhitelistRepository {
   constructor(private prisma: PrismaService) {}

   async create(dto: CreateWhitelistUser): Promise<BotWhitelistUser> {
      return await this.prisma.botWhitelistUser.create({ data: dto });
   }

   async remove(id: number): Promise<BotWhitelistUser> {
      return await this.prisma.botWhitelistUser.delete({ where: { id } });
   }
}
