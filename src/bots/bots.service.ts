import {
   HttpException,
   HttpStatus,
   Injectable,
   UnauthorizedException,
} from '@nestjs/common';
import { MacrosBlock, Promocode, User } from '@prisma/client';
import { AuthService } from 'src/auth/auth.service';
import { PartnersPromocodesRepository } from 'src/partners/repository/partners-promocodes.repository';
import { ProxyService } from 'src/proxy/proxy.service';
import { ExtendBotDto } from 'src/users/dto/extend-bot.dto';
import { UsersRepository } from 'src/users/repository/users.repository';
import { BuyBotDto } from './dto/buy-bot.dto';
import { CreateBotMacrosBlockDto } from './dto/create-macros-block.dto';
import { CreateBotMacrosDto } from './dto/create-macros.dto';
import { CreateTimerDto } from './dto/create-timer.dto';
import { BotsRepository } from './repository/bots.repository';
import { BotMacrosesBlockRepository } from './repository/macroses-block.repository';
import { BotMacrosesRepository } from './repository/macroses.repository';
import { TimersRepository } from './repository/timers.repository';

@Injectable()
export class BotsService {
   constructor(
      private botsRepository: BotsRepository,
      private usersRepository: UsersRepository,
      private authService: AuthService,
      private promocodesRepository: PartnersPromocodesRepository,
      private proxyService: ProxyService,
      private macrosRepository: BotMacrosesRepository,
      private macrosBlockRepository: BotMacrosesBlockRepository,
      private timersRepository: TimersRepository
   ) {}

   async buyBot(dto: BuyBotDto, userId: number) {
      const user = await this.usersRepository.getUser({
         where: { id: Number(userId) },
      });

      const promocode = await this.promocodesRepository.getOne({
         where: { id: dto.promocodeId },
      });

      const botPrice = await this.getBotPrice({
         botPeriod: dto.period,
         isPremium: dto.isPremium,
         proxyPeriod: dto.period,
         promocode: promocode,
      });

      if (user.balance < botPrice) {
         throw new HttpException(
            'Не достаточно денег на балансе',
            HttpStatus.PAYMENT_REQUIRED
         );
      }

      if (promocode) {
         if (promocode.type === 'days') {
            dto.period += promocode.value;
         }
      }

      const currentDate = new Date();
      const botEndDate = new Date(
         new Date().setDate(currentDate.getDate() + dto.period)
      ).toISOString();

      const proxy = await this.proxyService.buyProxy(
         {
            country: 'ru',
            period: dto.period,
         },
         user.id
      );

      const bot = await this.botsRepository.createBot({
         isPremium: dto.isPremium,
         username: dto.username,
         server: dto.server,
         userId: user.id,
         endDate: String(botEndDate),
         proxyId: proxy.id,
      });

      await this.usersRepository.takeBalance({
         id: user.id,
         balanceDifference: botPrice,
      });

      const resultedUser = await this.usersRepository.getUser({
         where: { id: user.id },
      });

      return await this.authService.generateToken(resultedUser);
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

      await this.usersRepository.takeBalance({
         id: user.id,
         balanceDifference: resultPrice,
      });

      const resultedUser = await this.usersRepository.getUser({
         where: { id: user.id },
      });

      return await this.authService.generateToken(resultedUser);
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

   async getBotPrice({
      botPeriod,
      isPremium,
      proxyPeriod,
      promocode,
   }: {
      botPeriod: number;
      isPremium: boolean;
      proxyPeriod: number;
      promocode?: Promocode;
   }) {
      const classicBotPrice = Number(process.env.CLASSIC_PRICE);
      const premiumBotPrice = Number(process.env.PREMIUM_PRICE);
      const proxyPrice = Number(process.env.PROXY_PRICE);

      let resultPrice: number;

      if (isPremium) {
         resultPrice = premiumBotPrice * botPeriod;
      } else {
         resultPrice = classicBotPrice * botPeriod;
      }

      resultPrice += proxyPrice * proxyPeriod;

      if (promocode) {
         if (promocode.type === 'discount') {
            resultPrice = resultPrice - (resultPrice / 100) * promocode.value;
         }
      }
      console.log(`result bot price: ${resultPrice}`);
      return resultPrice;
   }

   async createMacros(dto: CreateBotMacrosDto) {
      const createdMacros = await this.macrosRepository.create(dto);

      const macroses = await this.macrosRepository.getManyByBotId(dto.botId);

      if (macroses.length === 1) {
         await this.botsRepository.setActiveMacros(dto.botId, createdMacros.id);
      }

      const firstBlock = {
         macrosId: createdMacros.id,
         blockType: 'event',
         event: 'spawn',
         value: 'true',
      };

      const createdFirstBlock = await this.macrosBlockRepository.create(
         firstBlock
      );

      return await this.macrosRepository.getOneById(createdMacros.id);
   }

   async updateMacrosBlocks(
      macrosId: number,
      blocks: MacrosBlock[],
      userId: number
   ) {
      const macros = await this.macrosRepository.getOneById(macrosId);

      if (!macros) {
         throw new HttpException('Макрос не найден', HttpStatus.NOT_FOUND);
      }

      await this.macrosBlockRepository.removeAll(macrosId);

      const preparedBlocks: CreateBotMacrosBlockDto[] = blocks.map((block) => ({
         macrosId: macrosId,
         blockType: block.blockType,
         action: block.action,
         event: block.event,
         value: block.value,
         secondValue: block.secondValue,
      }));

      return await this.macrosBlockRepository.createMany(preparedBlocks);
   }

   async createTimer(dto: CreateTimerDto, userId: number) {
      const bot = await this.botsRepository.getOne({
         where: { id: dto.botId },
      });

      const timers = await this.timersRepository.getByBotId(dto.botId);
      const classicLimit = Number(process.env.CLASSIC_TIMER_LIMIT);
      const premiumLimit = Number(process.env.PREMIUM_TIMER_LIMIT);

      if (
         (!bot.isPremium && timers.length >= classicLimit) ||
         (bot.isPremium && timers.length >= premiumLimit)
      ) {
         throw new HttpException(
            'Ты достиг лимита по таймерам',
            HttpStatus.BAD_REQUEST
         );
      }

      return await this.timersRepository.create(dto);
   }
}
