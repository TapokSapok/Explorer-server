import { UserService } from '../core/users/users.service';
import { forwardRef, Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserModule } from 'src/core/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
   controllers: [AuthController],
   providers: [AuthService],
   imports: [
      forwardRef(() => UserModule),
      JwtModule.register({
         secret: process.env.PRIVATE_KEY || 'sapoktapok',
      }),
   ],
   exports: [AuthService],
})
export class AuthModule {}
