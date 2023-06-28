import { UsersRepository } from './repository/users.repository';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Header, Req, UseGuards, UsePipes } from '@nestjs/common/decorators';
import { Roles } from 'src/auth/role-auth.decorator';
import { RoleGuard } from 'src/auth/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserRequestDto } from './dto/user-request.dto';
import { ChangeUsernameDto } from './dto/change-username.dto';
import { ChangeRoleDto } from './dto/change-role.dto';
import { BalanceDifferenceDto } from './dto/balance-difference.dto';
import { RegistrationUserDto } from 'src/auth/dto/registration-user.dto';
import { BotsService } from 'src/bots/bots.service';
import { PaymentsRepository } from 'src/payments/payments/payments.repository';

@Controller('user')
export class UserController {
   constructor(
      private userRepository: UsersRepository,
      private paymentsRepository: PaymentsRepository
   ) {}

   @Post()
   create(@Body() dto: RegistrationUserDto) {
      return this.userRepository.createUser(dto);
   }

   @Get('operations')
   @UseGuards(JwtAuthGuard)
   getOperations(@Req() req: UserRequestDto) {
      const user = req.user;
      return this.paymentsRepository.userOperations(user.id);
   }

   // не трогать, все сломается
   // @Get(':id')
   // getById(@Param('id') id: number) {
   //    return this.userRepository.getUser({ where: { id } });
   // }
}
