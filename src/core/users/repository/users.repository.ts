import {
   BalanceDifferenceDto,
   ChangeRoleDto,
   ChangeUsernameDto,
} from './../dto/index';
import { RegistrationUserDto } from 'src/auth/dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersRepository {
   constructor(private prisma: PrismaService) {}

   async createUser(dto: RegistrationUserDto) {
      return this.prisma.user.create({
         data: dto,
      });
   }

   async getUsers() {
      return this.prisma.user.findMany();
   }

   async getUser(filter: {
      where: {
         id?: number;
         username?: string;
         email?: string;
      };
   }) {
      return this.prisma.user.findFirst(filter);
   }

   // ADMIN FUNCTIONS >>>><<<<

   async changeUsername(dto: ChangeUsernameDto) {
      return await this.prisma.user.update({
         where: { id: dto.id },
         data: {
            username: dto.username,
         },
      });
   }

   async changeRole(dto: ChangeRoleDto) {
      return await this.prisma.user.update({
         where: { id: dto.id },
         data: {
            role: dto.role,
         },
      });
   }

   async giveBalance(dto: BalanceDifferenceDto) {
      const user = await this.getUser({ where: { id: Number(dto.id) } });

      return await this.prisma.user.update({
         where: { id: dto.id },
         data: {
            balance: user.balance + dto.balanceDifference,
         },
      });
   }

   async takeBalance(dto: BalanceDifferenceDto) {
      const user = await this.getUser({ where: { id: Number(dto.id) } });

      return await this.prisma.user.update({
         where: { id: dto.id },
         data: {
            balance: user.balance - dto.balanceDifference,
         },
      });
   }
}
