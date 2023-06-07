import { AuthModule } from 'src/auth/auth.module';
import { UsersRepository } from './../users/repository/users.repository';
import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BotsRepository } from './repository/bots.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthService } from 'src/auth/auth.service';

@Module({
   providers: [BotsRepository, JwtService],
   imports: [PrismaModule],
   exports: [BotsRepository],
})
export class BotsModule {}
