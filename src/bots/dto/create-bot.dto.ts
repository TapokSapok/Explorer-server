export class CreateBotDto {
   readonly userId: number;
   readonly isPremium: boolean;
   readonly username: string;
   readonly server: string;
   readonly endDate: string;
}
