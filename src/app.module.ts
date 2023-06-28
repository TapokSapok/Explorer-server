import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './users/users.module';
import { BotsModule } from './bots/bots.module';
import { PartnersModule } from './partners/partners.module';
import { AdminsModule } from './admins/admins.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
   imports: [
      ConfigModule.forRoot({ envFilePath: `.env` }),
      AuthModule,
      UserModule,
      BotsModule,
      PrismaModule,
      PaymentsModule,
      PartnersModule,
      AdminsModule,
   ],
})
export class AppModule {}
