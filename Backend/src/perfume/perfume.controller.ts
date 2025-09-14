import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { PerfumeService } from './perfume.service';
import { Perfume } from './perfume.entity';
import { CreatePerfumeDto, UpdatePerfumeDto } from './perfume.dto';

@Controller('perfumes')
export class PerfumeController {
  constructor(private perfumeService: PerfumeService) {}
  @Get()
  async getAllPerfumes(): Promise<Perfume[]> {
    return await this.perfumeService.getAllPerfumes();
  }
  @Post()
  async createPerfume(
    @Body() createPerfumeDto: CreatePerfumeDto,
  ): Promise<Perfume> {
    return await this.perfumeService.createPerfume(createPerfumeDto);
  }

  @Get(':id')
  async getPerfumeById(@Param('id') id: string): Promise<Perfume> {
    return await this.perfumeService.getPerfumeById(id);
  }

  @Put(':id')
  async updatePerfume(
    @Param('id') id: string,
    @Body() updatePerfumeDto: UpdatePerfumeDto,
  ): Promise<Perfume> {
    return await this.perfumeService.updatePerfume(id, updatePerfumeDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletePerfume(@Param('id') id: string): Promise<void> {
    return await this.perfumeService.deletePerfume(id);
  }
}
