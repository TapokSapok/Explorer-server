import { UserService } from './users.service';
import { BotsRepository } from './../bots/repository/bots.repository';
import { CreateBotDto } from './../bots/dto/index';
import { JwtAuthGuard } from './../../auth/jwt-auth.guard';
import { InjectModel } from '@nestjs/sequelize';
import { UsersRepository } from './repository/users.repository';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { RegistrationUserDto } from 'src/auth/dto';
import {
   BalanceDifferenceDto,
   BuyBotDto,
   ChangeRoleDto,
   ChangeUsernameDto,
   UserRequestDto,
} from './dto';
import { Header, Req, UseGuards, UsePipes } from '@nestjs/common/decorators';
import { ValidationPipe } from '@nestjs/common/pipes';
import { Roles } from 'src/auth/role-auth.decorator';
import { RoleGuard } from 'src/auth/roles.guard';
import { User } from '@prisma/client';
import { OperationsRepository } from '../operations/repository/operations.repository';

@Controller('user')
export class UserController {
   constructor(
      private userRepository: UsersRepository,
      private botsRepository: BotsRepository,
      private userService: UserService,
      private operationsRepository: OperationsRepository
   ) {}

   @Post()
   create(@Body() dto: RegistrationUserDto) {
      return this.userRepository.createUser(dto);
   }

   // @Post('bot-auth')
   // @UseGuards(JwtAuthGuard)
   // botAuth(@Body() { botId }: { botId: number }, @Req() req: UserRequestDto) {
   //    const user = req.user;
   //    return this.userService.botAuth(user, botId);
   // }

   @Post('buy-bot')
   @UseGuards(JwtAuthGuard)
   buyBot(@Body() dto: BuyBotDto, @Req() req: UserRequestDto) {
      const user = req.user;
      return this.userService.buyBot(dto, user);
   }

   @Get('operations')
   @UseGuards(JwtAuthGuard)
   getOperations(@Req() req: UserRequestDto) {
      const user = req.user;
      return this.operationsRepository.userOperations(user.id);
   }

   @Get('my-bots')
   @UseGuards(JwtAuthGuard)
   myBots(@Req() req: UserRequestDto) {
      const user = req.user;
      return this.botsRepository.getUserBots(user.id);
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
