import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { UsersRepository } from 'src/users/repository/users.repository';
import { PartnersRepository } from 'src/partners/repository/partners.repository';
import { BotsRepository } from 'src/bots/repository/bots.repository';
import { PartnersService } from 'src/partners/partners.service';
import { PartnersPromocodesRepository } from 'src/partners/repository/partners-promocodes.repository';
import { PromocodesActivationsRepository } from 'src/partners/repository/promocodes-activations.repository';

@Module({
   imports: [
      JwtModule.register({ secret: process.env.PRIVATE_KEY }),
      PrismaModule,
   ],
   providers: [
      AdminsService,
      UsersRepository,
      PartnersRepository,
      BotsRepository,
   ],
   controllers: [AdminsController],
})
export class AdminsModule {}
