export class BuyBotDto extends Request {
   readonly isPremium: boolean;
   readonly username: string;
   readonly server: string;
   period: number;
   readonly promocodeId: number;
}
