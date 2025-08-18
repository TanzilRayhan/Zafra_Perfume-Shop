import {
  Body, Controller, Get, Param, ParseUUIDPipe, Post, Delete,
  Query, UsePipes, ValidationPipe, Patch, Put, UseGuards, Session,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { ManagerService } from './manager.service';
import { CreateManagerDto, SearchManagerDto } from './manager.dto';
import { CreateProductDto, UpdateProductDto, UpdateOrderStatusDto } from './product/product.dto';
import { SessionGuard } from './auth/session.guard';

@Controller('manager')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) { }

  // Create Manager
  @Post('add')
  @UsePipes(new ValidationPipe())
  createManager(@Body() dto: CreateManagerDto) {
    return this.managerService.createManager(dto);
  }

  // Get All Managers
  @Get('all')
  getManagers() {
    return this.managerService.getManagers();
  }

  // Search Manager by name
  @Get('search')
  @UsePipes(new ValidationPipe({ whitelist: true })) 
  getByManagerName(@Query() query: SearchManagerDto) {
    return this.managerService.findByManagerName(query.name);
  }

  // Delete Manager
@Delete(':id')
async removeManager(@Param('id', ParseUUIDPipe) id: string) {
  try {
    return await this.managerService.removeManager(id);
  } catch (error) {
    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error: error.message || 'Failed to delete manager',
      },
      HttpStatus.NOT_FOUND,
    );
  }
}


  // porduct crud


  // Get All Products
  @Get('products')
  getAllProducts() {
    return this.managerService.getAllProducts();
  }

  //  Add product (Only logged-in Manager allowed)
  @Post('product')
  @UseGuards(SessionGuard)
  @UsePipes(new ValidationPipe({ whitelist: true })) 
  addProduct(
    @Session() session: Record<string, any>,
    @Body() dto: CreateProductDto,
  ) {
    return this.managerService.addProduct(session.managerId, dto);
  }


  // Update product
  @Put('product/:id')
  updateProduct(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateProductDto) {
    return this.managerService.updateProduct(id, dto);
  }

  // Remove product
  @Delete('product/:id')
  removeProduct(@Param('id', ParseUUIDPipe) id: string) {
    return this.managerService.removeProduct(id);
  }


  // Get manager's products
  @Get(':managerId/products')
  getProducts(@Param('managerId', ParseUUIDPipe) managerId: string) {
    return this.managerService.getProducts(managerId);
  }

  // Get All Orders
  @Get('orders')
  getAllOrders() {
    return this.managerService.getAllOrders();
  }


}
