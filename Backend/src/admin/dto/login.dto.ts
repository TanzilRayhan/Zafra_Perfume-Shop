import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail() // Validates that the string is a valid email address
  @IsNotEmpty() // Ensures the value is not empty
  email: string;

  @IsString() // Ensures the value is a string
  @IsNotEmpty()
  password: string;
}