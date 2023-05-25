import { IsEmail, MinLength } from 'class-validator';

export class RegistrationUserDto {
   @MinLength(3, { message: 'Ник должен быть длиннее 3 символов.' })
   readonly username: string;

   @IsEmail()
   readonly email: string;

   @MinLength(6, { message: 'Пароль должен быть длиннее 6 символов.' })
   readonly password: string;
}

export class AuthorizeUserDto {
   readonly email: string;
   readonly password: string;
}

export class UpdateUserDto {
   readonly email: string;
}
