import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Perfume } from './perfume.entity';
import { CreatePerfumeDto, UpdatePerfumeDto } from './perfume.dto';

@Injectable()
export class PerfumeService {
  constructor(
    @InjectRepository(Perfume)
    private PerfumeRepository: Repository<Perfume>,
  ) {}
  async getAllPerfumes(): Promise<Perfume[]> {
    return await this.PerfumeRepository.find();
  }
  async getPerfumeById(id: string): Promise<Perfume> {
    const Perfume = await this.PerfumeRepository.findOne({ where: { id } });
    if (!Perfume) {
      throw new Error('Perfume not found');
    }
    return Perfume;
  }
  async createPerfume(createPerfumeDto: CreatePerfumeDto): Promise<Perfume> {
    const newPerfume = this.PerfumeRepository.create(createPerfumeDto);
    return await this.PerfumeRepository.save(newPerfume);
  }
  async updatePerfume(
    id: string,
    updatePerfumeDto: UpdatePerfumeDto,
  ): Promise<Perfume> {
    await this.PerfumeRepository.update(id, updatePerfumeDto);
    const updatedPerfume = await this.PerfumeRepository.findOne({
      where: { id },
    });
    if (!updatedPerfume) {
      throw new Error('Perfume not found');
    }
    return updatedPerfume;
  }
  async deletePerfume(id: string): Promise<void> {
    await this.PerfumeRepository.delete(id);
  }
}
