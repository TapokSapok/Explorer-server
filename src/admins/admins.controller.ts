import { CreatePartnerDto } from '../partners/dto/create-partner.dto';
import {
   Body,
   Controller,
   Get,
   Param,
   Patch,
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
import { BotsRepository } from 'src/bots/repository/bots.repository';
import { ChangeBotDto } from './dto/change-bot.dto';
import { PartnersService } from 'src/partners/partners.service';

@Controller('admins')
export class AdminsController {
   constructor(
      private usersRepository: UsersRepository,
      private botsRepository: BotsRepository,
      private adminsService: AdminsService
   ) {}

   @Get('/get-users')
   @Roles('ADMIN')
   @UseGuards(RoleGuard)
   getUsers(@Query() params: GetUsersDto) {
      return this.usersRepository.getUsers(params);
   }

   @Get('/get-users/:id')
   @Roles('ADMIN')
   @UseGuards(RoleGuard)
   getUserById(@Param('id') id: number) {
      return this.usersRepository.getUser({ where: { id: Number(id) } });
   }

   @Patch('change-username')
   @Roles('ADMIN')
   @UseGuards(RoleGuard)
   changeUsername(@Body() dto: ChangeUsernameDto) {
      return this.usersRepository.changeUsername(dto);
   }

   @Patch('/change-bot')
   @Roles('ADMIN')
   @UseGuards(RoleGuard)
   changeBot(@Body() dto: ChangeBotDto) {
      return this.adminsService.changeBot(dto);
   }

   @Patch('change-role')
   @Roles('ADMIN')
   @UseGuards(RoleGuard)
   changeRole(@Body() dto: ChangeRoleDto) {
      return this.usersRepository.changeRole(dto);
   }

   @Patch('give-balance')
   @Roles('ADMIN')
   @UseGuards(RoleGuard)
   giveBalance(@Body() dto: BalanceDifferenceDto) {
      return this.usersRepository.giveBalance(dto);
   }

   @Patch('take-balance')
   @Roles('ADMIN')
   @UseGuards(RoleGuard)
   takeBalance(@Body() dto: BalanceDifferenceDto) {
      return this.usersRepository.takeBalance(dto);
   }
}
