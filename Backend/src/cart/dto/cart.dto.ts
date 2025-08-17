import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CartDto {


    @IsNotEmpty()
    @IsNumber()
    quantity: number;

    @IsNotEmpty()
    @IsNumber()
    totalPrice: number;

    @IsOptional()
    @IsBoolean()
    paymentStatus: boolean = false;

    @IsOptional()
    @IsBoolean()
    deliveryStatus: boolean = false;

    @IsNotEmpty()
    @IsString()
    customerId: string;

    @IsNotEmpty()
    @IsString()
    perfumeId: string;

    @IsOptional()
    @IsDate()
    orderCreatedDate: Date | null;

}