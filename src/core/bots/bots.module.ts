import { Module } from '@nestjs/common';
import { BotsService } from './bots.service';
import { BotsController } from './bots.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/core/users/users.model';
import { Bot } from './bots.model';

@Module({
   providers: [BotsService],
   controllers: [BotsController],
   imports: [SequelizeModule.forFeature([User, Bot])],
})
export class BotsModule {}
