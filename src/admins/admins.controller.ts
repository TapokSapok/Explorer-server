import { CreatePartnerDto } from '../partners/dto/create-partner.dto';
import {
   Body,
   Controller,
   Get,
   Param,
   Post,
   Put,
   Query,
   UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/auth/role-auth.decorator';
import { RoleGuard } from 'src/auth/roles.guard';
import { BalanceDifferenceDto } from 'src/users/dto/balance-difference.dto';
import { ChangeRoleDto } from 'src/users/dto/change-role.dto';
import { ChangeUsernameDto } from 'src/users/dto/change-username.dto';
import { UsersRepository } from 'src/users/repository/users.repository';
import { AdminsService } from './admins.service';
import { GetUsersDto } from './dto/get-users.dto';

@Controller('admins')
export class AdminsController {
   constructor(
      private usersRepository: UsersRepository,
      private adminsService: AdminsService
   ) {}

   @Get('/get-users')
   @Roles('ADMIN')
   @UseGuards(RoleGuard)
   getUsers(
      @Query() params: GetUsersDto
      // @Query('username') username?: string,
      // @Param('email') email?: string,
      // @Param('limit') limit?: number
   ) {
      return this.usersRepository.getUsers(params);
   }

   @Put('change-username')
   @Roles('ADMIN')
   @UseGuards(RoleGuard)
   changeUsername(@Body() dto: ChangeUsernameDto) {
      return this.usersRepository.changeUsername(dto);
   }

   @Put('change-role')
   @Roles('ADMIN')
   @UseGuards(RoleGuard)
   changeRole(@Body() dto: ChangeRoleDto) {
      return this.usersRepository.changeRole(dto);
   }

   @Put('give-balance')
   @Roles('ADMIN')
   @UseGuards(RoleGuard)
   giveBalance(@Body() dto: BalanceDifferenceDto) {
      return this.usersRepository.giveBalance(dto);
   }

   @Put('take-balance')
   @Roles('ADMIN')
   @UseGuards(RoleGuard)
   takeBalance(@Body() dto: BalanceDifferenceDto) {
      return this.usersRepository.takeBalance(dto);
   }
}
