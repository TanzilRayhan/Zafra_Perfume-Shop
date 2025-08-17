import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

    
export class CustomerUpdateDTO {
    @IsString()
    @IsOptional()
    fullName?: string;
    @IsEmail()
    @IsOptional()
    email?: string;
    @IsNumber()
    @IsOptional()
    phone?: number;
    @IsString()
    @IsOptional()
    address?: string;
}