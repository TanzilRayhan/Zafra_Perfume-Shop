import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './review.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
  ) {}

  async findAll(): Promise<Review[]> {
    return this.reviewRepository.find({
      relations: ['customer', 'perfume'],
    });
  }

  async findOne(id: string): Promise<Review | null> {
    return this.reviewRepository.findOne({
      where: { id },
      relations: ['customer', 'perfume'],
    });
  }

  async findByPerfume(perfumeId: string): Promise<Review[]> {
    return this.reviewRepository.find({
      where: { perfume: { id: perfumeId } },
      relations: ['customer', 'perfume'],
    });
  }

  async create(reviewData: Partial<Review>): Promise<Review> {
    const review = this.reviewRepository.create(reviewData);
    return this.reviewRepository.save(review);
  }

  async update(
    id: string,
    reviewData: Partial<Review>,
  ): Promise<Review | null> {
    await this.reviewRepository.update(id, reviewData);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.reviewRepository.delete(id);
  }
}
