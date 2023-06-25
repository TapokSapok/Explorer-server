import { UsersRepository } from './../users/repository/users.repository';
import { JwtModule } from '@nestjs/jwt';
import { forwardRef, Module } from '@nestjs/common';
import { BotsRepository } from './repository/bots.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BotsService } from './bots.service';
import { AuthService } from 'src/auth/auth.service';
import { BotsController } from './bots.controller';
@Module({
   imports: [
      PrismaModule,
      JwtModule.register({ secret: process.env.PRIVATE_KEY }),
   ],
   providers: [
      BotsRepository,
      UsersRepository,
      BotsService,
      BotsRepository,
      AuthService,
   ],
   exports: [BotsRepository],
   controllers: [BotsController],
})
export class BotsModule {}
