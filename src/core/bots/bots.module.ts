import { AuthModule } from 'src/auth/auth.module';
import { UsersRepository } from './../users/repository/users.repository';
import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { BotsService } from './bots.service';
import { BotsController } from './bots.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { BotsRepository } from './repository/bots.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BotsGateway } from './bots.gateway';
import { AuthService } from 'src/auth/auth.service';

@Module({
   providers: [BotsService, BotsRepository, JwtService, BotsGateway],
   controllers: [BotsController],
   imports: [PrismaModule],
   exports: [BotsRepository],
})
export class BotsModule {}
