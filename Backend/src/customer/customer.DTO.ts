import { IsBoolean, IsIn, IsNotEmpty, IsNumber, IsString, Matches, MinLength } from 'class-validator';

export class CustomerDTO {
  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;

  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsNumber()
  phone: number;

}