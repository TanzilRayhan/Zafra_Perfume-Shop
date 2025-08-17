import { IsNotEmpty, IsNumber, IsOptional, IsString, Min, Max, Matches } from "class-validator";

export class SignupDto {
    @IsNotEmpty()
    @IsString()
    fullName: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(100000000) // Minimum 9 digits
    @Max(999999999999999) // Maximum 15 digits
    phone: number;

    @IsNotEmpty()
    @IsString()
    @Matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: 'Please enter a valid email address' })
    email: string;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsString()
    @IsOptional()
    role: string = "user";
}