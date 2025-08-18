import { IsNotEmpty, IsNumber, Min, IsString, IsIn, MaxLength } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  size: string;

  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  gender: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  stock: number;
}

export class UpdateProductDto {
  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  stock: number;
}

export class UpdateOrderStatusDto {
  @IsIn(['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'])
  status: string;
}
