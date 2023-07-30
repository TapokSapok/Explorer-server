export class CreateBotMacrosBlockDto {
   readonly macrosId: number;
   readonly blockType: string;
   readonly event?: string;
   readonly action?: string;
   readonly value: string;
   readonly secondValue?: string;
}
