import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Perfume } from '../perfume/perfume.entity';
import { UpdatePerfumeDto } from '../perfume/dto/update-perfume.dto';

@Injectable()
export class ManagerService {
  constructor(
    @InjectRepository(Perfume)
    private perfumeRepository: Repository<Perfume>,
  ) {}

  // Get all perfumes
  async getAllPerfumes(): Promise<Perfume[]> {
    return this.perfumeRepository.find();
  }

  // Get perfume by ID
  async getPerfumeById(id: string): Promise<Perfume> {
    const perfume = await this.perfumeRepository.findOne({ where: { id } });
    if (!perfume) {
      throw new NotFoundException(`Perfume with ID ${id} not found`);
    }
    return perfume;
  }

  // Update perfume (manager can only update price, stock, discount)
  async updatePerfume(
    id: string,
    updatePerfumeDto: UpdatePerfumeDto,
  ): Promise<Perfume> {
    // Restrict manager to only update certain fields
    const allowedFields = ['price', 'stock', 'discount'];
    const filteredUpdateData = {};

    Object.keys(updatePerfumeDto).forEach((key) => {
      if (allowedFields.includes(key)) {
        filteredUpdateData[key] = updatePerfumeDto[key];
      }
    });

    if (Object.keys(filteredUpdateData).length === 0) {
      throw new Error(
        'No valid fields to update. Managers can only update price, stock, and discount.',
      );
    }

    const perfume = await this.getPerfumeById(id);
    Object.assign(perfume, filteredUpdateData);

    return this.perfumeRepository.save(perfume);
  }
}
