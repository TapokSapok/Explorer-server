import { ValidationPipe } from '@nestjs/common/pipes';
import {
   AuthorizeUserDto,
   RegistrationUserDto,
   UpdateUserDto,
} from './dto/index';
import { AuthService } from './auth.service';
import { Controller } from '@nestjs/common';
import { Body, Get, Post, UsePipes } from '@nestjs/common/decorators';

@Controller('auth')
export class AuthController {
   constructor(private AuthService: AuthService) {}

   @Post('authorize')
   authorize(@Body() dto: AuthorizeUserDto) {
      return this.AuthService.authorize(dto);
   }

   @Post('registration')
   @UsePipes(new ValidationPipe())
   registration(@Body() dto: RegistrationUserDto) {
      return this.AuthService.registration(dto);
   }

   @Post('update')
   getMe(@Body() dto: UpdateUserDto) {
      return this.AuthService.getMe(dto);
   }

   @Get('test')
   test() {
      return {
         username: 'SapokTapok',
         email: 'lerom2008@yandex.ru',
         balance: 123,
         id: 41,
         role: 'ADMIN',
      };
   }
}
