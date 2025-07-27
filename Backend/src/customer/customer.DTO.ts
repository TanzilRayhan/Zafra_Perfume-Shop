import { IsIn, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class CustomerDTO {
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z0-9]+$/, { message: 'Name Must not contain any special characters' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^01\d+$/, { message: 'Phone number must start with 01' })
  phone: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @Matches(/(?=.*[a-z])/, { message: 'Password must contain at least one lowercase letter' })
  password: string;


}