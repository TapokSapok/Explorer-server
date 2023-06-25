import { User } from '@prisma/client';

export class UserRequestDto extends Request {
   user: User;
}
