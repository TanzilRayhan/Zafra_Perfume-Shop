import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ManagerEntity } from '../manager.entity';
import * as bcrypt from 'bcryptjs'; // NEW

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(ManagerEntity)
    private managerRepo: Repository<ManagerEntity>,
  ) {}

  async validateManager(managername: string, password: string) {
    
    const manager = await this.managerRepo.findOne({ where: { managername } });
    if (!manager) return null;

    const ok = await bcrypt.compare(password, manager.password); 
    if (!ok) return null;

    
    return { id: manager.id, managername: manager.managername }; 
  }
}
