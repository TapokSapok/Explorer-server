import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { OperationsRepository } from './repository/operations.repository';

@Module({
   providers: [OperationsRepository, PrismaService],
   exports: [OperationsRepository],
})
export class OperationsModule {}
