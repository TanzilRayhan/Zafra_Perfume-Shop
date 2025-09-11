import { IsString, IsNotEmpty, MaxLength, MinLength, IsOptional } from 'class-validator';


export class CreateManagerDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  managername: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  fullName: string; 

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @MinLength(6)
  password: string;

  @IsString()
  @IsOptional()
  @MaxLength(150)
  shopName?: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  shopLocation?: string;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  phone?: string;


}


export class SearchManagerDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;
}
