import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, ILike } from 'typeorm';
import { CreateManagerDto } from './manager.dto';
import { CreatManagerDto } from './manager.dto';
import { ManagerEntity } from './manager.entity';

@Injectable()
export class ManagerService {
  constructor(
    @InjectRepository(ManagerEntity)
    private readonly managerRepo: Repository<ManagerEntity>,
  ) {}

  getManager(): string {
    return 'Manager service found successfully.';
  }

  getManagerById(id: number): string {
    return 'Get manager by ID: ' + id;
  }

  async createManager(data: CreatManagerDto): Promise<ManagerEntity> {
    const manager = this.managerRepo.create(data);
    return await this.managerRepo.save(manager);
  }


  async findByFullNameSubstring(substring: string): Promise<ManagerEntity[]> {
  return await this.managerRepo.find({
    where: { fullName: ILike(`%${substring}%`) },  // fullName or fullname, যা টেবিলের নাম হবে
  });
}

  async findByManagerName(managername: string): Promise<ManagerEntity | null> {
    return await this.managerRepo.findOne({ where: { managername } });
  }

  async removeByManagerName(managername: string): Promise<{ message: string }> {
    const result = await this.managerRepo.delete({ managername });
    if (result.affected === 0) {
      return { message: 'Manager not found or already deleted' };
    }
    return { message: 'Manager deleted successfully' };
  }
}
