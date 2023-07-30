import { JwtService } from '@nestjs/jwt';

import {
   forwardRef,
   HttpException,
   HttpStatus,
   Inject,
   Injectable,
   UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import {
   BadRequestException,
   NotFoundException,
} from '@nestjs/common/exceptions';
import { User } from '@prisma/client';
import { UsersRepository } from 'src/users/repository/users.repository';
import { AuthorizeUserDto } from './dto/authorize-user.dto';
import { RegistrationUserDto } from './dto/registration-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class AuthService {
   constructor(
      private JwtService: JwtService,
      private usersRepository: UsersRepository
   ) {}

   async authorize(dto: AuthorizeUserDto) {
      const user = await this.validateUser(dto);
      return this.generateToken(user);
   }

   async registration(dto: RegistrationUserDto) {
      const candidateEmail = await this.usersRepository.getUser({
         where: { email: dto.email },
      });
      if (candidateEmail) {
         throw new HttpException(
            'Пользователь с такой почтой уже есть.',
            HttpStatus.BAD_REQUEST
         );
      }
      const candidateId = await this.usersRepository.getUser({
         where: { username: dto.username },
      });
      if (candidateId) {
         throw new HttpException(
            'Пользователь с таким ником уже есть.',
            HttpStatus.BAD_REQUEST
         );
      }
      const hashPassword = await bcrypt.hash(dto.password, 5);
      const user = await this.usersRepository.createUser({
         ...dto,
         password: hashPassword,
      });
      return this.generateToken(user);
   }

   async update(id: number) {
      await new Promise((resolve) =>
         setTimeout(() => {
            resolve(1);
         }, 500)
      );

      const user = await this.usersRepository.getUser({
         where: { id },
      });
      if (!user) {
         throw new BadRequestException('Пользователя не существует');
      }
      return this.generateToken(user);
   }

   //=============================

   async generateToken(user: User) {
      const payload = {
         id: user.id,
         email: user.email,
         username: user.username,
         balance: user.balance,
         role: user.role,
      };
      return {
         token: this.JwtService.sign(payload),
      };
   }

   private async decodeToken(token: string) {
      return this.JwtService.decode(token);
   }

   private async validateUser(dto: AuthorizeUserDto) {
      const user = await this.usersRepository.getUser({
         where: { email: dto.email },
      });
      if (!user)
         throw new UnauthorizedException({
            message: 'Пользователя с такой почтой не существует',
         });
      const passwordEquals = await bcrypt.compare(dto.password, user.password);
      if (user && passwordEquals) return user;
      throw new UnauthorizedException({ message: 'Неверный пароль' });
   }
}
