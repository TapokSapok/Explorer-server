import {
   Body,
   Controller,
   Get,
   Param,
   Post,
   Req,
   UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ExtendBotDto } from 'src/users/dto/extend-bot.dto';
import { UserRequestDto } from 'src/users/dto/user-request.dto';
import { BotsService } from './bots.service';
import { BuyBotDto } from './dto/buy-bot.dto';
import { ChangeBotUsernameDto } from './dto/change-bot-username.dto';

@Controller('bots')
export class BotsController {
   constructor(private botsService: BotsService) {}

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
      return this.botsService.buyBot(dto, user);
   }

   @Get('get-many')
   @UseGuards(JwtAuthGuard)
   myBots(@Req() req: UserRequestDto) {
      const user = req.user;
      return this.botsService.myBots(user.id);
   }
}
