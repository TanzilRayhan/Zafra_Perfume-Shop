import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { RegisterUserDto } from '../dto/register-user.dto';
import { Role } from '../common/enums/user-role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(registerUserDto: RegisterUserDto): Promise<User> {
    const user = this.usersRepository.create(registerUserDto);
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
  
  async findOneByEmail(email: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOneBy({ email });
    return user === null ? undefined : user;
  }

  async updateRole(id: number, role: Role): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {

      throw new NotFoundException(`User with ID ${id} not found`);
    }
    user.role = role;
    return this.usersRepository.save(user);
  }
}