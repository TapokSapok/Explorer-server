export class RegistrationUserDto {
   readonly username: string;
   readonly email: string;
   readonly password: string;
}

export class AuthorizeUserDto {
   readonly email: string;
   readonly password: string;
}
