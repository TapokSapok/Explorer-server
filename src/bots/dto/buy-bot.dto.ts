export class BuyBotDto extends Request {
   readonly isPremium: boolean;
   readonly username: string;
   readonly server: string;
   readonly days: number;
}
