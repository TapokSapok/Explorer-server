import { User } from '@prisma/client';

export class ChangeUsernameDto {
   readonly id: number;
   readonly username: string;
}

export class ChangeRoleDto {
   readonly id: number;
   readonly role: string;
}

export class BalanceDifferenceDto {
   readonly id: number;
   readonly balanceDifference: number;
}

export class GiveRoleDto {
   readonly id: number;
   readonly role: string;
}
export class BuyBotDto extends Request {
   readonly isPremium: boolean;
   readonly username: string;
   readonly server: string;
   readonly days: number;
}

export class UserRequestDto extends Request {
   user: User;
}
