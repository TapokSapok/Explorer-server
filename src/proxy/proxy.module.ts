import { Module } from '@nestjs/common';
import { ProxyService } from './proxy.service';
import { ProxyController } from './proxy.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProxyRepository } from './proxy.repository';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';

@Module({
   imports: [
      PrismaModule,
      HttpModule,
      JwtModule.register({ secret: process.env.PRIVATE_KEY }),
   ],
   providers: [ProxyService, ProxyRepository],
   controllers: [ProxyController],
})
export class ProxyModule {}
