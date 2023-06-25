import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChangeUsernameDto } from '../dto/change-username.dto';
import { ChangeRoleDto } from '../dto/change-role.dto';
import { BalanceDifferenceDto } from '../dto/balance-difference.dto';
import { RegistrationUserDto } from 'src/auth/dto/registration-user.dto';

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
