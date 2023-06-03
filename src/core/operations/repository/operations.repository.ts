import { OperationsModule } from './../operations.module';
import { RegistrationUserDto } from 'src/auth/dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OperationsRepository {
   constructor(private prisma: PrismaService) {}

   async userOperations(userId: number) {
      return await this.prisma.operation.findMany({
         where: {
            userId,
         },
      });
   }
}
