import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/users/users.module';
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
   exports: [AuthService, JwtModule],
})
export class AuthModule {}
