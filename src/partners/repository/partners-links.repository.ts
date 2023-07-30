import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLinkDto } from '../dto/create-link.dto';
import { RemoveLinkDto } from '../dto/remove-link.dto';

@Injectable()
export class PartnersLinksRepository {
   constructor(private prisma: PrismaService) {}

   async create(dto: CreateLinkDto) {
      return await this.prisma.partnerLink.create({
         data: { ...dto },
      });
   }

   async remove(dto: RemoveLinkDto[]) {
      return await this.prisma.partnerLink.deleteMany({
         where: {
            id: {
               in: dto.map((dto) => dto.id),
            },
         },
      });
   }

   async getAll(filter: {
      where: {
         id?: number;
         partnerId?: number;
      };
   }) {
      return await this.prisma.partnerLink.findMany(filter);
   }
}
