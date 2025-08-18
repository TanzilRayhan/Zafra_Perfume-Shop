// import { IsUUID, IsNotEmpty, IsNumber, IsString, IsIn } from 'class-validator';

// export class CreateOrderDto {
//   @IsUUID()
//   @IsNotEmpty()
//   customer_id: string;

//   @IsUUID()
//   @IsNotEmpty()
//   productId: string;

//   @IsNumber()
//   @IsNotEmpty()
//   quantity: number;

//   @IsNumber()
//   @IsNotEmpty()
//   total_amount: number;

//   @IsString()
//   @IsNotEmpty()
//   shipping_address: string;

//   @IsString()
//   @IsIn(['Cash on Delivery', 'Card', 'Mobile Banking'])
//   payment_method: string;

//   @IsString()
//   @IsIn(['Unpaid', 'Paid', 'Failed'])
//   payment_status: string;
// }

import { IsUUID, IsNotEmpty, IsNumber, IsString, IsIn } from 'class-validator';

export class CreateOrderDto {
  @IsUUID()
  @IsNotEmpty()
  customer_id: string;

  @IsUUID()
  @IsNotEmpty()
  productId: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsString()
  @IsNotEmpty()
  shipping_address: string;

  @IsString()
  @IsIn(['Cash on Delivery', 'Card', 'Mobile Banking'])
  payment_method: string;
}
