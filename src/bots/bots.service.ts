import {
   HttpException,
   HttpStatus,
   Injectable,
   UnauthorizedException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthService } from 'src/auth/auth.service';
import { ExtendBotDto } from 'src/users/dto/extend-bot.dto';
import { UsersRepository } from 'src/users/repository/users.repository';
import { BuyBotDto } from './dto/buy-bot.dto';
import { BotsRepository } from './repository/bots.repository';

@Injectable()
export class BotsService {
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

   async myBots(userId: number) {
      const bots = await this.botsRepository.getUserBots(userId);

      await Promise.all(
         bots.map(async (bot) => {
            if (
               new Date(bot.endDate).getTime() < Date.now() &&
               bot.status !== 'expired'
            ) {
               await this.botsRepository.changeBot({
                  where: { id: bot.id },
                  data: {
                     status: 'expired',
                  },
               });
               bot.status = 'expired';
            }
         })
      );

      return bots;
   }

   async extendBot(dto: ExtendBotDto, reqUser: User) {
      const user = await this.usersRepository.getUser({
         where: { id: reqUser.id },
      });

      if (!user) {
         throw new UnauthorizedException({
            message: 'Пользователь не авторизован',
         });
      }

      const bot = await this.botsRepository.getOne({
         where: { id: dto.botId, userId: user.id },
      });
      if (!bot) {
         throw new HttpException(
            'Ты не владеешь этим ботом',
            HttpStatus.FORBIDDEN
         );
      }

      let resultPrice: number;
      if (bot.isPremium) {
         resultPrice =
            dto.extensionPeriod * Number(process.env.PREMIUM_BOT_PRICE_PER_DAY);
      } else {
         resultPrice =
            dto.extensionPeriod * Number(process.env.CLASSIC_BOT_PRICE_PER_DAY);
      }

      if (user.balance < resultPrice) {
         throw new HttpException(
            'Не достаточно денег на балансе',
            HttpStatus.PAYMENT_REQUIRED
         );
      }

      const currentDate = new Date();
      const currentBotEndDate = new Date(bot.endDate);
      let resultEndDate: string;

      if (currentBotEndDate > currentDate) {
         resultEndDate = new Date(
            new Date().setDate(
               currentBotEndDate.getDate() + dto.extensionPeriod
            )
         ).toISOString();
      } else if (currentDate > currentBotEndDate) {
         resultEndDate = new Date(
            new Date().setDate(currentDate.getDate() + dto.extensionPeriod)
         ).toISOString();
      }

      const changedBot = await this.botsRepository.changeBot({
         where: {
            id: bot.id,
         },
         data: {
            endDate: resultEndDate,
            status: 'offline',
         },
      });

      const changedUser = await this.usersRepository.takeBalance({
         id: user.id,
         balanceDifference: resultPrice,
      });

      return await this.authService.generateToken(changedUser);
   }

   async getOne(botId: number, reqUser: User) {
      return await this.botsRepository.getOne({ where: { id: botId } });
   }

   async changeUsername(
      {
         botId,
         username,
      }: {
         botId: number;
         username: string;
      },
      user: User
   ) {
      await this.botsRepository.changeBot({
         where: { id: botId },
         data: { username: username },
      });
      return username;
   }
}
