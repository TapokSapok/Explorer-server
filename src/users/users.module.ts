import { PrismaService } from 'src/prisma/prisma.service';
import { Module, forwardRef } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UserController } from './users.controller';
import { UsersRepository } from './repository/users.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BotsRepository } from '../bots/repository/bots.repository';
import { UserService } from './users.service';
import { OperationsRepository } from '../operations/repository/operations.repository';
import { BotsService } from 'src/bots/bots.service';

@Module({
   imports: [forwardRef(() => AuthModule), PrismaModule],
   controllers: [UserController],
   providers: [
      OperationsRepository,
      UsersRepository,
      BotsRepository,
      UserService,
      BotsService,
   ],
   exports: [UsersRepository],
})
export class UserModule {}
