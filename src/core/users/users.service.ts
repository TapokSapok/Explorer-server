import { BalanceDifferenceDto, ChangeRoleDto } from './dto/index';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RegistrationUserDto } from 'src/auth/dto';
import { ChangeUsernameDto } from './dto';
import { User } from './users.model';
import { AuthService } from 'src/auth/auth.service';
import { Repository } from 'sequelize-typescript';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UserService {
   constructor(@InjectModel(User) private UserRepository: Repository<User>) {}

   async createUser(dto: RegistrationUserDto): Promise<User> {
      return await this.UserRepository.create(dto);
   }

   async getUsers(): Promise<User[]> {
      return await this.UserRepository.findAll();
   }

   async getUserById(id: number): Promise<User> {
      return await this.UserRepository.findByPk(id);
   }

   async getUserByEmail(email: string): Promise<User> {
      return await this.UserRepository.findOne({ where: { email: email } });
   }

   async findOne(filter: {
      where: { id?: number; username?: string; email?: string };
   }): Promise<User> {
      return this.UserRepository.findOne({ ...filter });
   }

   // Divider

   async changeUsername(dto: ChangeUsernameDto) {
      await this.UserRepository.update(
         { username: dto.username },
         { where: { id: dto.id } }
      );
      return true;
   }

   async changeRole(dto: ChangeRoleDto) {
      await this.UserRepository.update(
         { role: dto.role },
         { where: { id: dto.id } }
      );
   }

   async giveBalance(dto: BalanceDifferenceDto) {
      const user = await this.getUserById(dto.id);
      await this.UserRepository.update(
         { balance: user.balance + dto.balanceDifference },
         { where: { id: dto.id } }
      );
      return true;
   }

   async takeBalance(dto: BalanceDifferenceDto) {
      const user = await this.getUserById(dto.id);
      await this.UserRepository.update(
         { balance: user.balance - dto.balanceDifference },
         { where: { id: dto.id } }
      );
      return true;
   }

   async prisma() {
      const client = new PrismaClient();
      const res = await client.user.findMany({ where: { id: 1 } });
      console.log(res);
   }
}
