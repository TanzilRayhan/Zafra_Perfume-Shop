import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from '../entities/review.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewsRepository: Repository<Review>,
  ) {}

  findAll(): Promise<Review[]> {
    return this.reviewsRepository.find({ relations: ['user', 'product'] });
  }

  async findOne(id: number): Promise<Review> {
    const review = await this.reviewsRepository.findOne({ where: { id }, relations: ['user', 'product'] });
    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }
    return review;
  }

  async remove(id: number): Promise<void> {
    const result = await this.reviewsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }
  }
}