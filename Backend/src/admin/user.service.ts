import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  createUser(dto: CreateUserDto) {
    const user = this.userRepo.create(dto);
    return this.userRepo.save(user);
  }

  async updateCountry(id: number, country: string) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) return null;
    user.country = country;
    return this.userRepo.save(user);
  }

  findByJoiningDate(date: string) {
    return this.userRepo
      .createQueryBuilder('user')
      .where('DATE(user.joiningDate) = :date', { date })
      .getMany();
  }

  findWithUnknownCountry() {
    return this.userRepo.findBy({ country: 'Unknown' });
  }

  getAllUsers() {
    return this.userRepo.find();
  }
}
