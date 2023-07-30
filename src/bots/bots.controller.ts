import {
   Body,
   Controller,
   Delete,
   Get,
   Param,
   Patch,
   Post,
   Put,
   Req,
   UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ExtendBotDto } from 'src/users/dto/extend-bot.dto';
import { UserRequestDto } from 'src/users/dto/user-request.dto';
import { BotsService } from './bots.service';
import { BuyBotDto } from './dto/buy-bot.dto';
import { ChangeBotUsernameDto } from './dto/change-bot-username.dto';
import { CreateBotMacrosBlockDto } from './dto/create-macros-block.dto';
import { CreateBotMacrosDto } from './dto/create-macros.dto';
import { CreateTimerDto } from './dto/create-timer.dto';
import { CreateWhitelistUser } from './dto/create-whitelist-user.dto';
import { UpdateMacrosBlocksDto } from './dto/update-macros-blocks.dto';
import { BotsRepository } from './repository/bots.repository';
import { BotMacrosesBlockRepository } from './repository/macroses-block.repository';
import { BotMacrosesRepository } from './repository/macroses.repository';
import { TimersRepository } from './repository/timers.repository';
import { BotWhitelistRepository } from './repository/whitelist.repository';

@Controller('bots')
export class BotsController {
   constructor(
      private botsService: BotsService,
      private whitelistRepository: BotWhitelistRepository,
      private macrosesRepository: BotMacrosesRepository,
      private macrosesBlocksRepository: BotMacrosesBlockRepository,
      private timersRepository: TimersRepository,
      private botsRepository: BotsRepository
   ) {}

   @Post('change-username')
   @UseGuards(JwtAuthGuard)
   changeUsernameBot(
      @Body() dto: ChangeBotUsernameDto,
      @Req() req: UserRequestDto
   ) {
      const user = req.user;
      return this.botsService.changeUsername(dto, user);
   }

   @Post('extend')
   @UseGuards(JwtAuthGuard)
   extendBot(@Body() dto: ExtendBotDto, @Req() req: UserRequestDto) {
      const user = req.user;
      return this.botsService.extendBot(dto, user);
   }

   @Get('get-one/:id')
   @UseGuards(JwtAuthGuard)
   async getOne(@Param('id') id, @Req() req: UserRequestDto) {
      const user = req.user;
      return await this.botsService.getOne(Number(id), user);
   }

   @Post('buy-bot')
   @UseGuards(JwtAuthGuard)
   buyBot(@Body() dto: BuyBotDto, @Req() req: UserRequestDto) {
      const user = req.user;
      return this.botsService.buyBot(dto, user.id);
   }

   @Get('get-many')
   @UseGuards(JwtAuthGuard)
   myBots(@Req() req: UserRequestDto) {
      const user = req.user;
      return this.botsService.myBots(user.id);
   }

   @Post('whitelist')
   @UseGuards(JwtAuthGuard)
   addToWhitelist(
      @Body() dto: CreateWhitelistUser,
      @Req() req: UserRequestDto
   ) {
      const user = req.user;
      return this.whitelistRepository.create(dto);
   }

   @Delete('whitelist')
   @UseGuards(JwtAuthGuard)
   removeToWhitelist(@Body() dto: { id: number }, @Req() req: UserRequestDto) {
      const user = req.user;
      return this.whitelistRepository.remove(dto.id);
   }

   @Post('set-active-macros/:macrosId/:botId')
   @UseGuards(JwtAuthGuard)
   setActivedMacros(
      @Param('macrosId') macrosId: string,
      @Param('botId') botId: string,
      @Req() req: UserRequestDto
   ) {
      const user = req.user;
      return this.botsRepository.setActiveMacros(
         Number(botId),
         Number(macrosId)
      );
   }

   @Post('macroses')
   @UseGuards(JwtAuthGuard)
   createMacros(@Body() dto: CreateBotMacrosDto, @Req() req: UserRequestDto) {
      const user = req.user;
      return this.botsService.createMacros(dto);
   }

   @Delete('macroses')
   @UseGuards(JwtAuthGuard)
   deleteMacros(@Body() dto: { id: number }, @Req() req: UserRequestDto) {
      const user = req.user;
      return this.macrosesRepository.remove(dto.id);
   }

   @Put('macroses/:id')
   @UseGuards(JwtAuthGuard)
   updateMacrosBlocks(
      @Param('id') macrosId: string,
      @Body() dto: { data: UpdateMacrosBlocksDto },
      @Req() req: UserRequestDto
   ) {
      const user = req.user;
      return this.botsService.updateMacrosBlocks(
         Number(macrosId),
         dto.data.blocks,
         user.id
      );
   }

   @Get('macroses/:botId')
   @UseGuards(JwtAuthGuard)
   getMacroses(@Param('botId') botId: string, @Req() req: UserRequestDto) {
      const user = req.user;
      return this.macrosesRepository.getManyByBotId(Number(botId));
   }
   //

   @Post('macroses/blocks')
   @UseGuards(JwtAuthGuard)
   createMacrosBlock(
      @Body() dto: CreateBotMacrosBlockDto,
      @Req() req: UserRequestDto
   ) {
      const user = req.user;
      return this.macrosesBlocksRepository.create(dto);
   }

   @Delete('macroses/blocks')
   @UseGuards(JwtAuthGuard)
   deleteMacrosBlock(@Body() dto: { id: number }, @Req() req: UserRequestDto) {
      const user = req.user;
      return this.macrosesBlocksRepository.remove(dto.id);
   }

   @Get('macroses/blocks/:macrosId')
   @UseGuards(JwtAuthGuard)
   getMacrosesBlocks(
      @Param('macrosId') macrosId: string,
      @Req() req: UserRequestDto
   ) {
      const user = req.user;
      return this.macrosesBlocksRepository.getManyByMacrosId(Number(macrosId));
   }

   @Get('timers/:botId')
   @UseGuards(JwtAuthGuard)
   getTimers(@Param('botId') botId: string, @Req() req: UserRequestDto) {
      const user = req.user;
      return this.timersRepository.getByBotId(Number(botId));
   }

   @Post('timers')
   @UseGuards(JwtAuthGuard)
   createTimer(@Body() dto: CreateTimerDto, @Req() req: UserRequestDto) {
      const user = req.user;
      return this.botsService.createTimer(dto, user.id);
   }

   @Patch('timers/:id')
   @UseGuards(JwtAuthGuard)
   updateTimer(
      @Param('id') id: string,
      @Body() dto: CreateTimerDto,
      @Req() req: UserRequestDto
   ) {
      const user = req.user;
      return this.timersRepository.update(Number(id), dto);
   }

   @Delete('timers/:id')
   @UseGuards(JwtAuthGuard)
   deleteTimer(@Param('id') id: string, @Req() req: UserRequestDto) {
      const user = req.user;
      return this.timersRepository.remove(Number(id));
   }
}
