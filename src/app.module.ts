import { databaseConfig } from './config/configuratoin';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './core/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { SequelizeConfigService } from './config/sequelizeConfig.service';
import { BotsModule } from './core/bots/bots.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig } from '@nestjs/apollo';

@Module({
   imports: [
      SequelizeModule.forRootAsync({
         imports: [ConfigModule],
         useClass: SequelizeConfigService,
      }),
      ConfigModule.forRoot({
         load: [databaseConfig],
      }),
      ConfigModule.forRoot({ envFilePath: `.env` }),
      AuthModule,
      UserModule,
      BotsModule,
   ],
   controllers: [],
   providers: [],
})
export class AppModule {}
