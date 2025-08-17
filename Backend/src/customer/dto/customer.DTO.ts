import { IsBoolean, IsIn, IsNotEmpty, IsNumber, IsString, Matches, MinLength } from 'class-validator';

export class CustomerDTO {

  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsNumber()
  phone: number;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  password: string; 


}