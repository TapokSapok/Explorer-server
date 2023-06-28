import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { UsersRepository } from 'src/users/repository/users.repository';
import { PartnersRepository } from 'src/partners/repository/partners.repository';

@Module({
   imports: [
      JwtModule.register({ secret: process.env.PRIVATE_KEY }),
      PrismaModule,
   ],
   providers: [AdminsService, UsersRepository, PartnersRepository],
   controllers: [AdminsController],
})
export class AdminsModule {}
