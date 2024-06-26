import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChangeUsernameDto } from '../dto/change-username.dto';
import { ChangeRoleDto } from '../dto/change-role.dto';
import { BalanceDifferenceDto } from '../dto/balance-difference.dto';
import { RegistrationUserDto } from 'src/auth/dto/registration-user.dto';
import { GetUsersDto } from 'src/admins/dto/get-users.dto';

@Injectable()
export class UsersRepository {
   constructor(private prisma: PrismaService) {}

   async createUser(dto: RegistrationUserDto) {
      return this.prisma.user.create({
         data: dto,
      });
   }

   async getUsers(dto: GetUsersDto) {
      return this.prisma.user.findMany({
         where: {
            username: {
               contains: dto.username,
            },
            email: {
               contains: dto.email,
            },
         },
         take: Number(dto.limit),
      });
   }

   async getUser(filter: {
      where: { id?: number; username?: string; email?: string };
   }) {
      return this.prisma.user.findFirst({
         where: { ...filter.where },
         include: {
            bots: true,
            partner: {
               include: {
                  links: true,
                  promocodes: {
                     include: {
                        activations: true,
                     },
                  },
               },
            },
            payments: true,
            promocodeActivations: true,
         },
      });
   }

   // ADMIN FUNCTIONS >>>><<<<

   async changeUsername(dto: ChangeUsernameDto) {
      const user = await this.prisma.user.update({
         where: { id: dto.id },
         data: {
            username: dto.username,
         },
      });

      return user.username;
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

      const resUser = await this.prisma.user.update({
         where: { id: dto.id },
         data: {
            balance: user.balance + dto.balanceDifference,
         },
      });

      return resUser.balance;
   }

   async takeBalance(dto: BalanceDifferenceDto) {
      const user = await this.getUser({ where: { id: Number(dto.id) } });

      const resUser = await this.prisma.user.update({
         where: { id: dto.id },
         data: {
            balance: user.balance - dto.balanceDifference,
         },
      });

      return resUser.balance;
   }
}
