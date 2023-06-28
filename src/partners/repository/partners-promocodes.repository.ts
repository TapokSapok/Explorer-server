import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePromocodeDto } from 'src/partners/dto/create-promocode.dto';

@Injectable()
export class PartnersPromocodesRepository {
   constructor(private prisma: PrismaService) {}

   async create(dto: CreatePromocodeDto) {
      return await this.prisma.promocode.create({
         data: { ...dto },
      });
   }

   async remove(id: number) {
      return await this.prisma.promocode.delete({
         where: { id },
      });
   }

   async getOne(filter: {
      where: {
         partnerId?: number;
         id?: number;
         code?: string;
      };
   }) {
      return await this.prisma.promocode.findFirst(filter);
   }
}
