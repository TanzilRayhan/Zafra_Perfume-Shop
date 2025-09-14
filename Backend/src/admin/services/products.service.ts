import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Perfume } from '../../perfume/perfume.entity';
import { CreatePerfumeDto } from '../../perfume/dto/create-perfume.dto';
import { UpdatePerfumeDto } from '../../perfume/dto/update-perfume.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Perfume)
    private perfumesRepository: Repository<Perfume>,
  ) {}

  create(createPerfumeDto: CreatePerfumeDto): Promise<Perfume> {
    const perfume = this.perfumesRepository.create(createPerfumeDto);
    return this.perfumesRepository.save(perfume);
  }

  findAll(): Promise<Perfume[]> {
    return this.perfumesRepository.find();
  }

  async findOne(id: string): Promise<Perfume> {
    const perfume = await this.perfumesRepository.findOne({ where: { id } });
    if (!perfume) {
      throw new NotFoundException(`Perfume with ID ${id} not found`);
    }
    return perfume;
  }

  async update(
    id: string,
    updatePerfumeDto: UpdatePerfumeDto,
  ): Promise<Perfume> {
    const perfume = await this.findOne(id);
    Object.assign(perfume, updatePerfumeDto);
    return this.perfumesRepository.save(perfume);
  }

  async remove(id: string): Promise<void> {
    const perfume = await this.findOne(id);
    await this.perfumesRepository.remove(perfume);
  }
}
