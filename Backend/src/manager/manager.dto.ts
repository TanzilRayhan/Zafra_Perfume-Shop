import {IsEmail,IsIn,IsNotEmpty,IsNumberString,Matches,MinLength,IsString,IsBoolean,IsOptional,Length, MaxLength,
} from 'class-validator';

export class CreateManagerDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail({}, { message: 'Invalid email format' })
  @Matches(/@aiub\.edu$/, {
    message: 'Email must be from aiub.edu domain',
  })
  email: string;

  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @Matches(/[A-Z]/, {
    message: 'Password must contain at least one uppercase letter',
  })
  password: string;

  @IsIn(['male', 'female'], {
    message: 'Gender must be either male or female',
  })
  gender: string;

  @IsNumberString({}, { message: ' invalid phone number' })
  phone: string;


}

export class CreatManagerDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  managername: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  fullName: string;
}