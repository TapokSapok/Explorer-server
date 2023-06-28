import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PaymentsRepository {
   constructor(private prisma: PrismaService) {}

   async userOperations(userId: number) {
      return await this.prisma.payment.findMany({
         where: {
            userId,
         },
      });
   }
}
