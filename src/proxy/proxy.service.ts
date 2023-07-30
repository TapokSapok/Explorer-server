import { HttpService } from '@nestjs/axios/dist';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Proxy } from '@prisma/client';
import { AxiosResponse } from 'axios';
import { map, Observable, Subscription } from 'rxjs';
import { BuyProxyDto } from './dto/buy-proxy.dto';
import { ProxyRepository } from './proxy.repository';
import { IProxyBuyResponse } from './types';

@Injectable()
export class ProxyService {
   constructor(
      private httpService: HttpService,
      private proxyRepository: ProxyRepository
   ) {}

   async buyProxy(dto: BuyProxyDto, userId: number): Promise<Proxy> {
      return new Promise((resolve, reject) => {
         const proxyResponseObservable = this.httpService
            .get(
               `https://proxy6.net/api/1d0dc8b9b2-a3f01f5fd8-f0d8ffc009/buy/?count=1&period=1&country=${dto.country}&type=socks&descr=userId${userId}&nokey`
            )
            .pipe(map((axiosResponse: AxiosResponse) => axiosResponse.data));

         proxyResponseObservable.subscribe(async (proxy: IProxyBuyResponse) => {
            if (proxy?.status === 'yes') {
               const createdProxy = await this.proxyRepository.create({
                  userId: userId,
                  marketId: Number(proxy.list[0].id),
                  adress: `${proxy.list[0].host}:${proxy.list[0].port}:${proxy.list[0].user}:${proxy.list[0].pass}`,
                  createDate: proxy.list[0].date,
                  endDate: proxy.list[0].date_end,
               });
               resolve(createdProxy);
            } else {
               throw new HttpException(
                  'Ошибка покупки прокси',
                  HttpStatus.INTERNAL_SERVER_ERROR
               );
            }
         });
      });
   }

   async getProxies(userId: number) {
      return await this.proxyRepository.getProxies(userId);
   }
}
