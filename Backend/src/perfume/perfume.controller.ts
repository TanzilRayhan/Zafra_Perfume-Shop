import { Controller, Get, Post, Put, Delete, Param, Body } from "@nestjs/common";
import { PerfumeService } from "./perfume.service";
import { Perfume } from "./perfume.entity";

@Controller('perfume')
export class PerfumeController {
    constructor(private perfumeService: PerfumeService) {}

    @Get()
    async getAllPerfumes(): Promise<Perfume[]> {
        return await this.perfumeService.getAllPerfumes();
    }

    @Get(':id')
    async getPerfumeById(@Param('id') id: string): Promise<Perfume> {
        return await this.perfumeService.getPerfumeById(id);
    }

    @Post()
    async createPerfume(@Body() perfume: Perfume): Promise<Perfume> {
        return await this.perfumeService.createPerfume(perfume);
    }

    @Put(':id')
    async updatePerfume(
        @Param('id') id: string,
        @Body() perfume: Perfume
    ): Promise<Perfume> {
        return await this.perfumeService.updatePerfume(id, perfume);
    }

    @Delete(':id')
    async deletePerfume(@Param('id') id: string): Promise<void> {
        return await this.perfumeService.deletePerfume(id);
    }
}
