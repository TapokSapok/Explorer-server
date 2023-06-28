import { PrismaModule } from './../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { PartnersService } from './partners.service';
import { PartnersController } from './partners.controller';
import { JwtModule } from '@nestjs/jwt';
import { PartnersRepository } from './repository/partners.repository';
import { UsersRepository } from 'src/users/repository/users.repository';
import { PartnersLinksRepository } from './repository/partners-links.repository';
import { PartnersPromocodesRepository } from './repository/partners-promocodes.repository';
import { PromocodesActivationsRepository } from './repository/promocodes-activations.repository';

@Module({
   imports: [
      JwtModule.register({ secret: process.env.PRIVATE_KEY }),
      PrismaModule,
   ],
   providers: [
      PartnersService,
      PartnersRepository,
      UsersRepository,
      PartnersLinksRepository,
      PartnersPromocodesRepository,
      PartnersPromocodesRepository,
      PromocodesActivationsRepository,
   ],
   controllers: [PartnersController],
})
export class PartnersModule {}
