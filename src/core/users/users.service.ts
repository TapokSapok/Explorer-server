import { JwtService } from '@nestjs/jwt';
import { BotsRepository } from './../bots/repository/bots.repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBotDto } from '../bots/dto';
import { User } from '@prisma/client';
import { UsersRepository } from './repository/users.repository';
import { BuyBotDto } from './dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
   constructor(
      private botsRepository: BotsRepository,
      private usersRepository: UsersRepository,
      private authService: AuthService
   ) {}

   async buyBot(dto: BuyBotDto, user: User) {
      const DbUser = await this.usersRepository.getUser({
         where: { id: Number(user.id) },
      });

      let botPrice: number;
      if (dto.isPremium) {
         botPrice = dto.days * Number(process.env.PREMIUM_BOT_PRICE_PER_DAY);
      } else {
         botPrice = dto.days * Number(process.env.CLASSIC_BOT_PRICE_PER_DAY);
      }

      if (DbUser.balance < botPrice) {
         throw new HttpException(
            'Не достаточно денег на балансе',
            HttpStatus.PAYMENT_REQUIRED
         );
      }

      const currentDate = new Date();
      const botEndDate = new Date(
         new Date().setDate(currentDate.getDate() + dto.days)
      ).toISOString();

      const bot = await this.botsRepository.createBot({
         isPremium: dto.isPremium,
         username: dto.username,
         server: dto.server,
         userId: user.id,
         endDate: String(botEndDate),
      });

      const changedUser = await this.usersRepository.takeBalance({
         id: user.id,
         balanceDifference: botPrice,
      });

      return await this.authService.generateToken(changedUser);
   }
}
