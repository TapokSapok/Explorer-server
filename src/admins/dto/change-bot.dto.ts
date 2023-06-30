export class ChangeBotDto {
   readonly id: number;
   readonly username?: string;
   readonly type?: string;
   readonly server?: string;
   readonly termType: string;
   readonly termDays: number;
}
