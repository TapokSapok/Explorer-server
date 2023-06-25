import { UsersRepository } from './repository/users.repository';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Header, Req, UseGuards, UsePipes } from '@nestjs/common/decorators';
import { Roles } from 'src/auth/role-auth.decorator';
import { RoleGuard } from 'src/auth/roles.guard';
import { OperationsRepository } from '../operations/repository/operations.repository';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserRequestDto } from './dto/user-request.dto';
import { ChangeUsernameDto } from './dto/change-username.dto';
import { ChangeRoleDto } from './dto/change-role.dto';
import { BalanceDifferenceDto } from './dto/balance-difference.dto';
import { RegistrationUserDto } from 'src/auth/dto/registration-user.dto';
import { BotsService } from 'src/bots/bots.service';

@Controller('user')
export class UserController {
   constructor(
      private userRepository: UsersRepository,
      private operationsRepository: OperationsRepository
   ) {}

   @Post()
   create(@Body() dto: RegistrationUserDto) {
      return this.userRepository.createUser(dto);
   }

   @Get('operations')
   @UseGuards(JwtAuthGuard)
   getOperations(@Req() req: UserRequestDto) {
      const user = req.user;
      return this.operationsRepository.userOperations(user.id);
   }

   // ADMIN ROLE

   @Get()
   @Roles('ADMIN')
   @UseGuards(RoleGuard)
   getUsers() {
      return this.userRepository.getUsers();
   }

   @Put('change-username')
   @Roles('ADMIN')
   @UseGuards(RoleGuard)
   changeUsername(@Body() dto: ChangeUsernameDto) {
      return this.userRepository.changeUsername(dto);
   }

   @Put('change-role')
   @Roles('ADMIN')
   @UseGuards(RoleGuard)
   changeRole(@Body() dto: ChangeRoleDto) {
      return this.userRepository.changeRole(dto);
   }

   @Put('give-balance')
   @Roles('ADMIN')
   @UseGuards(RoleGuard)
   giveBalance(@Body() dto: BalanceDifferenceDto) {
      return this.userRepository.giveBalance(dto);
   }

   @Put('take-balance')
   @Roles('ADMIN')
   @UseGuards(RoleGuard)
   takeBalance(@Body() dto: BalanceDifferenceDto) {
      return this.userRepository.takeBalance(dto);
   }

   // не трогать, все сломается
   // @Get(':id')
   // getById(@Param('id') id: number) {
   //    return this.userRepository.getUser({ where: { id } });
   // }
}
