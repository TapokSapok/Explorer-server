import { ExtendBotDto } from './dto/extend-bot.dto';
import { JwtService } from '@nestjs/jwt';
import { BotsRepository } from './../bots/repository/bots.repository';
import {
   HttpException,
   HttpStatus,
   Injectable,
   UnauthorizedException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersRepository } from './repository/users.repository';
import { AuthService } from 'src/auth/auth.service';
import { ForbiddenError } from '@nestjs/apollo';
import { BuyBotDto } from 'src/bots/dto/buy-bot.dto';

@Injectable()
export class UserService {}
