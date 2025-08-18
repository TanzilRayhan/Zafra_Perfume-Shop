import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { ManagerEntity } from './manager.entity';
import { ProductEntity } from './product/product.entity';
import { OrderEntity } from './order/order.entity';
import { CreateManagerDto } from './manager.dto';
import { CreateProductDto, UpdateProductDto, UpdateOrderStatusDto } from './product/product.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class ManagerService {
  constructor(
    @InjectRepository(ManagerEntity) private managerRepo: Repository<ManagerEntity>,
    @InjectRepository(ProductEntity) private productRepo: Repository<ProductEntity>,
    @InjectRepository(OrderEntity) private orderRepo: Repository<OrderEntity>,
  ) { }

 
  async createManager(dto: CreateManagerDto) {
    // NEW: duplicate check
    const exists = await this.managerRepo.findOne({ where: { managername: dto.managername } });
    if (exists) throw new BadRequestException('Managername already exists');

    const hashed = await bcrypt.hash(dto.password, 10);
    const manager = this.managerRepo.create({ ...dto, password: hashed });

    const saved = await this.managerRepo.save(manager);
    const { password, ...rest } = saved;
    return rest;
  }

  async getManagers() {

    return await this.managerRepo.find({
      select: { id: true, managername: true, fullName: true, isActive: true },

    });
  }

  async findByManagerName(name: string) {
    return await this.managerRepo.find({
      where: { managername: ILike(`%${name}%`) },
      select: { id: true, managername: true, fullName: true, isActive: true },
    });
  }

  async removeManager(id: string) {
    const result = await this.managerRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Manager not found');
    return { message: 'Manager deleted successfully' };
  }


  // Product CRUD
  async addProduct(managerId: string, dto: CreateProductDto) {
    const manager = await this.managerRepo.findOne({ where: { id: managerId } });
    if (!manager) throw new NotFoundException('Manager not found');

    const product = this.productRepo.create({ ...dto, manager });
    return await this.productRepo.save(product);
  }

  async updateProduct(id: string, dto: UpdateProductDto) {
    const product = await this.productRepo.findOne({ where: { id } });
    if (!product) throw new NotFoundException('Product not found');

    Object.assign(product, dto);
    return await this.productRepo.save(product);
  }

  async removeProduct(id: string) {
    const result = await this.productRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Product not found');
    return { message: 'Product removed successfully' };
  }

  async getProducts(managerId: string) {
    return await this.productRepo.find({
      where: { manager: { id: managerId } },

    });
  }

  async getAllProducts() {
    return await this.productRepo.find();
  }

  // Orders

  async getOrdersByManagerId(managerId: string) {
    return await this.orderRepo.find({
      where: { manager: { id: managerId } },
    });
  }
  async getOrders(managerId: string) {
    return await this.orderRepo.find({
      where: { manager: { id: managerId } },
    });
  }

  async changeOrderStatus(orderId: string, dto: UpdateOrderStatusDto) {
    const order = await this.orderRepo.findOne({ where: { id: orderId } });
    if (!order) throw new NotFoundException('Order not found');
    order.status = dto.status;
    return await this.orderRepo.save(order);
  }

  async getAllOrders() {
    return await this.orderRepo.find();
  }


}
