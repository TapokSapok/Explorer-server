import { Bot } from '../bots/bots.model';
import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { UserController } from './users.controller';
import { User } from './users.model';
import { UserService } from './users.service';

@Module({
   controllers: [UserController],
   providers: [UserService],
   imports: [
      forwardRef(() => AuthModule),
      SequelizeModule.forFeature([User, Bot]),
   ],
   exports: [UserService],
})
export class UserModule {}
