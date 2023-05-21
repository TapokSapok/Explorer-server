import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { UserController } from './user.controller';
import { User } from './user.model';
import { UserService } from './user.service';

@Module({
   controllers: [UserController],
   providers: [UserService],
   imports: [forwardRef(() => AuthModule), SequelizeModule.forFeature([User])],
   exports: [UserService],
})
export class UserModule {}
