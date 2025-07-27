import { IsNotEmpty, Matches } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @Matches(/^[A-Za-z\s]+$/, {
    message: 'Name must only contain alphabets and spaces',
  })
  name: string;

  @IsNotEmpty()
  @Matches(/^[^\s@]+@[^\s@]+\.xyz$/, {
    message: 'Email must be valid and end with .xyz',
  })
  email: string;

  @IsNotEmpty()
  @Matches(/^\d{10,17}$/, {
    message: 'NID number must be 10 to 17 digits long',
  })
  nidNumber: string;
}
