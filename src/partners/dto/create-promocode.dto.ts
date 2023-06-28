export class CreatePromocodeDto {
   readonly partnerId: number;
   readonly type: 'discount' | 'days';
   readonly value: number;
   readonly code: string;
}
