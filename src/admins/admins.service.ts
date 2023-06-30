import { CreatePartnerDto } from '../partners/dto/create-partner.dto';
import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/users/repository/users.repository';
import { PartnersRepository } from 'src/partners/repository/partners.repository';
import { BotsRepository } from 'src/bots/repository/bots.repository';
import { ChangeBotDto } from './dto/change-bot.dto';

@Injectable()
export class AdminsService {
   constructor(private botsRepository: BotsRepository) {}

   async changeBot(dto: ChangeBotDto) {
      const bot = await this.botsRepository.getOne({ where: { id: dto.id } });

      const giveDays = () => {
         return new Date(
            new Date().setDate(new Date(bot.endDate).getDate() + dto.termDays)
         ).toISOString();
      };

      const takeDays = () => {
         return new Date(
            new Date().setDate(new Date(bot.endDate).getDate() - dto.termDays)
         ).toISOString();
      };

      await this.botsRepository.changeBot({
         where: { id: dto.id },
         data: {
            username: dto.username,
            server: dto.server,
            isPremium: dto.type === 'Premium',
            endDate:
               dto.termType === 'give'
                  ? giveDays()
                  : dto.termType === 'take' && takeDays(),
         },
      });
   }
}
