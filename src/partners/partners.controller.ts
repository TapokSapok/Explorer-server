import { Controller, Post } from '@nestjs/common';
import {
   Body,
   Delete,
   Get,
   Param,
   Req,
   UseGuards,
} from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PartnersService } from './partners.service';
import { PartnersRepository } from './repository/partners.repository';
import { Roles } from 'src/auth/role-auth.decorator';
import { RoleGuard } from 'src/auth/roles.guard';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { CreateLinkDto } from './dto/create-link.dto';
import { PartnersLinksRepository } from './repository/partners-links.repository';
import { CreatePromocodeDto } from './dto/create-promocode.dto';
import { PartnersPromocodesRepository } from './repository/partners-promocodes.repository';
import { UserRequestDto } from 'src/users/dto/user-request.dto';
import { RemoveLinkDto } from './dto/remove-link.dto';
import { CheckPromocodeDto } from './dto/check-promocode.dto';
import { DeletePartnerDto } from './dto/delete-partner.dto';

@Controller('partners')
export class PartnersController {
   constructor(
      private partnersService: PartnersService,
      private partnersRepository: PartnersRepository,
      private linksRepository: PartnersLinksRepository,
      private promocodesRepository: PartnersPromocodesRepository
   ) {}

   @Post()
   @Roles('ADMIN')
   @UseGuards(RoleGuard)
   createPartner(@Body() dto: CreatePartnerDto) {
      return this.partnersService.createPartner(dto);
   }

   @Delete()
   @Roles('ADMIN')
   @UseGuards(RoleGuard)
   deletePartner(@Body() dto: DeletePartnerDto) {
      return this.partnersService.deletePartner(dto);
   }

   @Post('/links')
   @UseGuards(JwtAuthGuard)
   createLink(@Body() dto: CreateLinkDto) {
      return this.linksRepository.create(dto);
   }

   @Delete('/links')
   @UseGuards(JwtAuthGuard)
   deleteLink(@Body() dto: RemoveLinkDto[]) {
      return this.linksRepository.remove(dto);
   }

   @Post('/promocodes')
   @UseGuards(JwtAuthGuard)
   createPromocode(@Body() dto: CreatePromocodeDto) {
      return this.promocodesRepository.create(dto);
   }

   @Post('/promocodes/check')
   @UseGuards(JwtAuthGuard)
   checkPromocode(@Body() dto: CheckPromocodeDto, @Req() req: UserRequestDto) {
      return this.partnersService.checkPromocode(dto, req.user.id);
   }

   @Get()
   @UseGuards(JwtAuthGuard)
   getPartner(@Req() req: UserRequestDto) {
      const user = req.user;
      return this.partnersRepository.getOne(user?.id);
   }

   @Get('/statistics')
   getStatistics(@Req() req: UserRequestDto) {
      const user = req.user;
      return this.partnersService.getStatistics(user?.id);
   }

   @Get('/promocodes/:id')
   getPromocodes(@Param('id') id: string) {
      return this.promocodesRepository.getOne({ where: { id: Number(id) } });
   }
}
