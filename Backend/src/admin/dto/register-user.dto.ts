import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsEnum,
} from 'class-validator';
import { Role } from '../common/enums/user-role.enum';

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;

  @IsEnum(Role, { message: 'Role must be customer, manager, or admin' })
  @IsNotEmpty({ message: 'Role is required' })
  role: Role = Role.Customer;
}
