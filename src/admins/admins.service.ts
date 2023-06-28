import { CreatePartnerDto } from '../partners/dto/create-partner.dto';
import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/users/repository/users.repository';
import { PartnersRepository } from 'src/partners/repository/partners.repository';

@Injectable()
export class AdminsService {}
