export interface IProxyBuyResponse {
   status: string;
   user_id: string;
   balance: number;
   currency: string;
   count: number;
   price: number;
   period: number;
   country: string;
   list: IBuyedProxy[];
}

export interface IBuyedProxy {
   id: string;
   ip: string;
   host: string;
   port: string;
   user: string;
   pass: string;
   type: string;
   date: string;
   date_end: string;
   unixtime: number;
   unixtime_end: number;
   active: string;
}
