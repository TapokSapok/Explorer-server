import { ValidationPipe } from '@nestjs/common/pipes';

import { AuthService } from './auth.service';
import { Controller } from '@nestjs/common';
import {
   Body,
   Get,
   Post,
   Req,
   UseGuards,
   UsePipes,
} from '@nestjs/common/decorators';
import { AuthorizeUserDto } from './dto/authorize-user.dto';
import { RegistrationUserDto } from './dto/registration-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserRequestDto } from 'src/users/dto/user-request.dto';

@Controller('auth')
export class AuthController {
   constructor(private authService: AuthService) {}

   @Post('authorize')
   authorize(@Body() dto: AuthorizeUserDto) {
      return this.authService.authorize(dto);
   }

   @Post('registration')
   @UsePipes(new ValidationPipe())
   registration(@Body() dto: RegistrationUserDto) {
      return this.authService.registration(dto);
   }

   @Post('update')
   @UseGuards(JwtAuthGuard)
   update(@Req() req: UserRequestDto) {
      const user = req.user;
      return this.authService.update(user.id);
   }
}
