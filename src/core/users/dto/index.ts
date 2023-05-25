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
