import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './users/users.module';
import { BotsModule } from './bots/bots.module';
import { OperationsModule } from './operations/operations.module';

@Module({
   imports: [
      ConfigModule.forRoot({ envFilePath: `.env` }),
      AuthModule,
      UserModule,
      BotsModule,
      PrismaModule,
      OperationsModule,
   ],
})
export class AppModule {}
