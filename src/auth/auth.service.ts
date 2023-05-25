import { JwtService } from '@nestjs/jwt';
import { UserService } from '../core/users/users.service';
import {
   AuthorizeUserDto,
   RegistrationUserDto,
   UpdateUserDto,
} from './dto/index';
import {
   forwardRef,
   HttpException,
   HttpStatus,
   Inject,
   Injectable,
   UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/core/users/users.model';
import * as bcrypt from 'bcryptjs';
import {
   BadRequestException,
   NotFoundException,
} from '@nestjs/common/exceptions';

@Injectable()
export class AuthService {
   constructor(
      private JwtService: JwtService,
      private UserService: UserService
   ) {}

   async authorize(dto: AuthorizeUserDto) {
      const user = await this.validateUser(dto);
      return this.generateToken(user);
   }

   async registration(dto: RegistrationUserDto) {
      const candidateEmail = await this.UserService.findOne({
         where: { email: dto.email },
      });
      if (candidateEmail) {
         throw new HttpException(
            'Пользователь с такой почтой уже есть.',
            HttpStatus.BAD_REQUEST
         );
      }

      const candidateId = await this.UserService.findOne({
         where: { username: dto.username },
      });
      if (candidateId) {
         throw new HttpException(
            'Пользователь с таким ником уже есть.',
            HttpStatus.BAD_REQUEST
         );
      }

      const hashPassword = await bcrypt.hash(dto.password, 5);
      const user = await this.UserService.createUser({
         ...dto,
         password: hashPassword,
      });
      return this.generateToken(user);
   }

   async getMe(dto: UpdateUserDto) {
      const user = await this.UserService.findOne({
         where: { email: dto.email },
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
      const user = await this.UserService.getUserByEmail(dto.email);
      if (!user)
         throw new UnauthorizedException({ message: 'Некорректная почта' });
      const passwordEquals = await bcrypt.compare(dto.password, user.password);
      if (user && passwordEquals) return user;
      throw new UnauthorizedException({ message: 'Некорректный пароль' });
   }
}
