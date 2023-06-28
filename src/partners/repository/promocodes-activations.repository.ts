import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLinkDto } from '../dto/create-link.dto';
import { CreatePromocodeActivationDto } from '../dto/create-promocode-activation.dto';

@Injectable()
export class PromocodesActivationsRepository {
   constructor(private prisma: PrismaService) {}

   async create(dto: CreatePromocodeActivationDto) {
      return await this.prisma.promocodeActivation.create({
         data: { ...dto },
      });
   }

   async remove(id: number) {
      return await this.prisma.promocodeActivation.delete({
         where: { id },
      });
   }

   async getUserPromocodeActivations(userId: number, promocodeId: number) {
      return await this.prisma.promocodeActivation.findFirst({
         where: { userId: userId, id: promocodeId },
      });
   }

   async getAll(filter: {
      where: {
         id?: number;
         promocodeId?: number;
      };
   }) {
      return await this.prisma.promocodeActivation.findMany(filter);
   }

   async getOne(filter: {
      where: {
         id?: number;
         promocodeId?: number;
         userId?: number;
         code?: string;
      };
   }) {
      return await this.prisma.promocodeActivation.findFirst(filter);
   }
}
