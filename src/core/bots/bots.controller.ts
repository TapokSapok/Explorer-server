import { Req, UseGuards } from '@nestjs/common/decorators';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateBotDto } from './dto';
import { BotsRepository } from './repository/bots.repository';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserRequestDto } from '../users/dto';

@Controller('bots')
export class BotsController {
   constructor(private botsRepository: BotsRepository) {}
}
