import { Controller, Get, Post, Body } from "@nestjs/common";
import { PerfumeService } from "./perfume.service";
import { Perfume } from "./perfume.entity";

@Controller('perfume')
export class PerfumeController {
    constructor(private perfumeService: PerfumeService) {}
    @Get()
    async getAllPerfumes(): Promise<Perfume[]> {
        return await this.perfumeService.getAllPerfumes();
    }
    @Post()
    async createPerfume(@Body() perfume: Perfume): Promise<Perfume> {
        return await this.perfumeService.createPerfume(perfume);
    }
}