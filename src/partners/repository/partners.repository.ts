import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PartnersRepository {
   constructor(private prisma: PrismaService) {}

   async create(userId: number) {
      return await this.prisma.partner.create({ data: { userId } });
   }

   async remove(id: number) {
      return await this.prisma.partner.delete({
         where: { id },
      });
   }

   async getOne(userId: number) {
      return await this.prisma.partner.findFirst({
         where: {
            userId,
         },
         include: {
            links: true,
            promocodes: {
               include: {
                  activations: true,
               },
            },
         },
      });
   }
}
