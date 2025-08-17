import { Controller, Get, Post, Body, Put, Patch, Param, Delete, UseGuards, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { UsersService } from './services/users.service';
import { OrdersService } from './services/orders.service';
import { ReviewsService } from './services/reviews.service';
import { MailerService } from './mailer/mailer.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { Roles } from './common/decorators/roles.decorator';
import { Role } from './common/enums/user-role.enum';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard) 
export class AdminController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly usersService: UsersService,
    private readonly ordersService: OrdersService,
    private readonly reviewsService: ReviewsService,
    private readonly mailerService: MailerService,
  ) {}

  // Route 1: Add new perfume [POST]
  @Post('product')
  @Roles(Role.Admin)
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  // Route 2: Update perfume details [PUT]
  @Put('product/:id')
  @Roles(Role.Admin)

  async updateProduct(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateProductDto: UpdateProductDto,
  ) {

    const updatedProduct = await this.productsService.update(id, updateProductDto);

    this.mailerService.sendStockUpdateNotification(
      'tanzilrayhan169@gmail.com', 
      updatedProduct.name, 
    );
    
    return updatedProduct;
  }

  

  // Route 3: Delete perfume [DELETE]
  @Delete('product/:id')
  @Roles(Role.Admin)
  @HttpCode(HttpStatus.NO_CONTENT)
  removeProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }

  // Route 4: Get all perfumes [GET]
  @Get('products')
  @Roles(Role.Admin)
  findAllProducts() {
    return this.productsService.findAll();
  }

  // Route 5: List all users [GET]
  @Get('users')
  @Roles(Role.Admin)
  findAllUsers() {
    return this.usersService.findAll();
  }

  // Route 6: Change user role [PATCH]
  @Patch('user/:id/role')
  @Roles(Role.Admin)
  updateUserRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserRoleDto: UpdateUserRoleDto,
  ) {
    return this.usersService.updateRole(id, updateUserRoleDto.role as Role);
  }

  // Route 7: Delete perfume [DELETE]
  @Delete('user/:id')
  @Roles(Role.Admin)
  @HttpCode(HttpStatus.NO_CONTENT)
  removeUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }


  // Route 8: View all orders [GET]
  @Get('orders')
  @Roles(Role.Admin)
  findAllOrders() {
    return this.ordersService.findAll();
  }
  
  // Route 9: Get all reviews [GET]
  @Get('reviews')
  @Roles(Role.Admin)
  findAllReviews() {
    return this.reviewsService.findAll();
  }
  
  // Route 10: Get a single review by ID [GET]
  @Get('review/:id')
  @Roles(Role.Admin)
  findOneReview(@Param('id', ParseIntPipe) id: number) {
    return this.reviewsService.findOne(id);
  }

  // Route 11: Remove review [DELETE]
  @Delete('review/:id')
  @Roles(Role.Admin)
  @HttpCode(HttpStatus.NO_CONTENT)
  removeReview(@Param('id', ParseIntPipe) id: number) {
    return this.reviewsService.remove(id);
  }
}