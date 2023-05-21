import { UserService } from './user.service';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { RegistrationUserDto } from 'src/auth/dto';
import { BalanceDifferenceDto, ChangeRoleDto, ChangeUsernameDto } from './dto';

@Controller('user')
export class UserController {
   constructor(private UserService: UserService) {}

   @Post()
   create(@Body() dto: RegistrationUserDto) {
      return this.UserService.createUser(dto);
   }

   @Get()
   getAll() {
      return this.UserService.getUsers();
   }

   @Get(':id')
   getById(@Param('id') id: number) {
      return this.UserService.getUserById(id);
   }

   @Put('change-username')
   changeUsername(@Body() dto: ChangeUsernameDto) {
      return this.UserService.changeUsername(dto);
   }

   @Put('change-role')
   changeRole(@Body() dto: ChangeRoleDto) {
      return this.UserService.changeRole(dto);
   }

   @Put('give-balance')
   giveBalance(@Body() dto: BalanceDifferenceDto) {
      return this.UserService.giveBalance(dto);
   }

   @Put('take-balance')
   takeBalance(@Body() dto: BalanceDifferenceDto) {
      return this.UserService.takeBalance(dto);
   }
}
