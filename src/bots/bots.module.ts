import { UsersRepository } from './../users/repository/users.repository';
import { JwtModule } from '@nestjs/jwt';
import { forwardRef, Module } from '@nestjs/common';
import { BotsRepository } from './repository/bots.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BotsService } from './bots.service';
import { AuthService } from 'src/auth/auth.service';
import { BotsController } from './bots.controller';
import { PartnersPromocodesRepository } from 'src/partners/repository/partners-promocodes.repository';
import { ProxyService } from 'src/proxy/proxy.service';
import { HttpModule } from '@nestjs/axios';
import { ProxyRepository } from 'src/proxy/proxy.repository';
import { BotWhitelistRepository } from './repository/whitelist.repository';
import { BotMacrosesRepository } from './repository/macroses.repository';
import { BotMacrosesBlockRepository } from './repository/macroses-block.repository';
import { TimersRepository } from './repository/timers.repository';
@Module({
   imports: [
      PrismaModule,
      HttpModule,
      JwtModule.register({ secret: process.env.PRIVATE_KEY }),
   ],
   providers: [
      BotsRepository,
      UsersRepository,
      BotsService,
      BotsRepository,
      AuthService,
      ProxyRepository,
      PartnersPromocodesRepository,
      BotWhitelistRepository,
      BotMacrosesRepository,
      BotMacrosesBlockRepository,
      ProxyService,
      TimersRepository,
   ],
   exports: [BotsRepository],
   controllers: [BotsController],
})
export class BotsModule {}
