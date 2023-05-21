import { databaseConfig } from './config/configuratoin';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { SequelizeConfigService } from './config/sequelizeConfig.service';

@Module({
   imports: [
      SequelizeModule.forRootAsync({
         imports: [ConfigModule],
         useClass: SequelizeConfigService,
      }),
      ConfigModule.forRoot({
         load: [databaseConfig],
      }),
      ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env` }),
      AuthModule,
      UserModule,
   ],
   controllers: [],
   providers: [],
})
export class AppModule {}
