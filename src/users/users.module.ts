import { PrismaService } from 'src/prisma/prisma.service';
import { Module, forwardRef } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UserController } from './users.controller';
import { UsersRepository } from './repository/users.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BotsRepository } from '../bots/repository/bots.repository';
import { BotsService } from 'src/bots/bots.service';
import { PaymentsRepository } from 'src/payments/payments/payments.repository';
import { PartnersPromocodesRepository } from 'src/partners/repository/partners-promocodes.repository';
import { ProxyService } from 'src/proxy/proxy.service';
import { HttpModule } from '@nestjs/axios';
import { ProxyRepository } from 'src/proxy/proxy.repository';
import { BotMacrosesRepository } from 'src/bots/repository/macroses.repository';
import { BotMacrosesBlockRepository } from 'src/bots/repository/macroses-block.repository';
import { TimersRepository } from 'src/bots/repository/timers.repository';

@Module({
   imports: [forwardRef(() => AuthModule), PrismaModule, HttpModule],
   controllers: [UserController],
   providers: [
      PaymentsRepository,
      UsersRepository,
      BotsRepository,
      PartnersPromocodesRepository,
      ProxyService,
      ProxyRepository,
      BotsService,
      BotMacrosesRepository,
      BotMacrosesBlockRepository,
      TimersRepository,
   ],
   exports: [UsersRepository],
})
export class UserModule {}
