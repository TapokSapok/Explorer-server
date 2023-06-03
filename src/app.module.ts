import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './core/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { BotsModule } from './core/bots/bots.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { PrismaModule } from './prisma/prisma.module';
import { BotsGateway } from './core/bots/bots.gateway';
import { OperationsModule } from './core/operations/operations.module';

@Module({
   imports: [
      ConfigModule.forRoot({ envFilePath: `.env` }),
      AuthModule,
      UserModule,
      BotsModule,
      PrismaModule,
      OperationsModule,
   ],
   controllers: [],
})
export class AppModule {}
