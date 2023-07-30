import { BotMacros } from '@prisma/client';

export class UpdateMacrosDto {
   readonly macrosId: number;
   readonly data: BotMacros;
}
