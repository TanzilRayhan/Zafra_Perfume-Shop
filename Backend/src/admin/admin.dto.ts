import { IsNotEmpty, Matches } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  @Matches(/^[A-Za-z\s]+$/, {
    message: 'Name Should be only contain Alphabets',
  })
  name: string;

  @IsNotEmpty()
  @Matches(/^[^\s@]+@[^\s@]+\.xyz$/, {
    message: 'Email must be valid, input must contain @ and end with .xyz',
  })
  email: string;

  @IsNotEmpty()
  @Matches(/^\d{10,17}$/, {
    message: 'NID number must be 10 to 17 digits long',
  })
  nidNumber: string;
}
