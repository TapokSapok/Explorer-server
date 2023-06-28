import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaymentsRepository } from './payments/payments.repository';

@Module({
   providers: [PaymentsRepository, PrismaService],
   exports: [PaymentsRepository],
})
export class PaymentsModule {}
