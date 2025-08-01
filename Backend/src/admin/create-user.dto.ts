import { IsNotEmpty, IsString, IsEmail, MaxLength, Matches, IsOptional} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^[A-Za-z\s]+$/, {
    message: 'Name must contain only alphabets and spaces',
  })
  @MaxLength(100)
  name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsNotEmpty()
  @Matches(/^(\+8801[3-9]\d{8})$/, {
    message: 'Phone must be a valid Bangladeshi number (e.g., +88017XXXXXXXX)',
  })
  phone: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  address?: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  country?: string;
}
