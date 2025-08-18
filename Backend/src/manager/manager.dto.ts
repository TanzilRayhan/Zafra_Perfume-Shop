import { IsString, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

// CHANGED: Typo ঠিক—CreatManagerDto → CreateManagerDto
export class CreateManagerDto { // CHANGED
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
  @MinLength(6) // NEW: ন্যূনতম length
  password: string;
}

// NEW: search query validation এর জন্য
export class SearchManagerDto { // NEW
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;
}
