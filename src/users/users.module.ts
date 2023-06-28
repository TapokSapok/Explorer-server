import { PrismaService } from 'src/prisma/prisma.service';
import { Module, forwardRef } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UserController } from './users.controller';
import { UsersRepository } from './repository/users.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BotsRepository } from '../bots/repository/bots.repository';
import { BotsService } from 'src/bots/bots.service';
import { PaymentsRepository } from 'src/payments/payments/payments.repository';

@Module({
   imports: [forwardRef(() => AuthModule), PrismaModule],
   controllers: [UserController],
   providers: [
      PaymentsRepository,
      UsersRepository,
      BotsRepository,
      BotsService,
   ],
   exports: [UsersRepository],
})
export class UserModule {}
