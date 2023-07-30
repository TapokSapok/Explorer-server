import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/users/repository/users.repository';
import { CheckPromocodeDto } from './dto/check-promocode.dto';
import { CreateLinkDto } from './dto/create-link.dto';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { DeletePartnerDto } from './dto/delete-partner.dto';
import { PartnersPromocodesRepository } from './repository/partners-promocodes.repository';
import { PartnersRepository } from './repository/partners.repository';
import { PromocodesActivationsRepository } from './repository/promocodes-activations.repository';

@Injectable()
export class PartnersService {
   constructor(
      private usersRepository: UsersRepository,
      private partnersRepository: PartnersRepository,
      private promocodeRepository: PartnersPromocodesRepository,
      private promocodeActivations: PromocodesActivationsRepository
   ) {}

   async createPartner(dto: CreatePartnerDto) {
      const partner = await this.partnersRepository.create(dto.userId); // todo: сделать проверку на то, существует ли уже партнер

      const user = await this.usersRepository.getUser({
         where: { id: dto.userId },
      });

      if (user.role !== 'ADMIN') {
         await this.usersRepository.changeRole({
            role: 'PARTNER',
            id: dto.userId,
         });
      }

      return await this.partnersRepository.getOne(dto.userId);
   }

   async deletePartner(dto: DeletePartnerDto) {
      const partner = await this.partnersRepository.getOne(dto.userId);

      if (!partner) {
         throw new HttpException('Такого партнера нету', HttpStatus.NOT_FOUND);
      }

      return await this.partnersRepository.remove(partner.id);
   }

   async getStatistics(userId: number) {
      const user = await this.usersRepository.getUser({
         where: { id: userId },
      });

      // const partner = await this.partnersRepository.getOne()
   }

   async checkPromocode(dto: CheckPromocodeDto, userId: number) {
      const promocode = await this.promocodeRepository.getOne({
         where: { code: dto.code },
      });

      if (!promocode) {
         throw new HttpException('Промокод не найден', HttpStatus.NOT_FOUND);
      }

      const promocodeAlreadyUsed =
         await this.promocodeActivations.getUserPromocodeActivations(
            userId,
            promocode.id
         );

      if (promocodeAlreadyUsed) {
         throw new HttpException(
            'Промокод уже был использован',
            HttpStatus.NOT_ACCEPTABLE
         );
      }

      return promocode;
   }
}
