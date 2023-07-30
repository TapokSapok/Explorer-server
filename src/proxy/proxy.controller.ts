import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserRequestDto } from 'src/users/dto/user-request.dto';
import { BuyProxyDto } from './dto/buy-proxy.dto';
import { ProxyService } from './proxy.service';

@Controller('proxy')
export class ProxyController {
   constructor(private proxyService: ProxyService) {}

   @Post('/buy')
   @UseGuards(JwtAuthGuard)
   buyProxy(@Body() dto: BuyProxyDto, @Req() req: UserRequestDto) {
      const user = req.user;
      return this.proxyService.buyProxy(dto, user.id);
   }

   @Get('')
   @UseGuards(JwtAuthGuard)
   getMyProxies(@Req() req: UserRequestDto) {
      const user = req.user;
      return this.proxyService.getProxies(user.id);
   }
}
