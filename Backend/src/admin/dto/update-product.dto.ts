import { IsString, IsNumber, Min, IsOptional } from 'class-validator';

export class UpdateProductDto {
  @IsOptional() // Marks the property as optional; it doesn't need to be provided
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  @Min(0) // Ensures the number is not negative
  price?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  stock?: number;
}