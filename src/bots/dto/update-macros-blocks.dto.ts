import { MacrosBlock } from '@prisma/client';

export class UpdateMacrosBlocksDto {
   readonly macrosId: number;
   readonly blocks: MacrosBlock[];
}
