import { JwtService } from '@nestjs/jwt';
import {
   CanActivate,
   ExecutionContext,
   HttpException,
   HttpStatus,
   Injectable,
   UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './role-auth.decorator';
import { ForbiddenError } from '@nestjs/apollo';

@Injectable()
export class RoleGuard implements CanActivate {
   constructor(private jwtService: JwtService, private reflector: Reflector) {}

   canActivate(
      context: ExecutionContext
   ): boolean | Promise<boolean> | Observable<boolean> {
      try {
         const requiredRoles: string[] = this.reflector.getAllAndOverride(
            ROLES_KEY,
            [context.getHandler(), context.getClass()]
         );
         if (!requiredRoles) {
            return true;
         }
         const req = context.switchToHttp().getRequest();
         const authHeader = req.headers.authorization;
         const bearer = authHeader.split(' ')[0];
         const token = authHeader.split(' ')[1];

         if (bearer !== 'Bearer' || !token) {
            throw new UnauthorizedException({
               message: 'Пользователь не авторизован',
            });
         }
         const user = this.jwtService.verify(token);
         req.user = user;
         return requiredRoles.includes(user.role);
      } catch (err) {
         throw new HttpException('Недостаточно доступа', HttpStatus.FORBIDDEN);
      }
   }
}
