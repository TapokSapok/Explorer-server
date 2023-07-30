import { Injectable } from '@nestjs/common';
import { Proxy } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProxyCreateDto } from './dto/proxy-create.dto';

@Injectable()
export class ProxyRepository {
   constructor(private prisma: PrismaService) {}

   async create(dto: ProxyCreateDto): Promise<Proxy> {
      return await this.prisma.proxy.create({
         data: dto,
      });
   }

   async getProxies(userId: number): Promise<Proxy[]> {
      return await this.prisma.proxy.findMany({ where: { userId } });
   }
}
