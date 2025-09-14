import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ManagerService } from './manager.service';
import { AuthGuard } from '../auth/auth.guard';
import { UpdatePerfumeDto } from '../perfume/dto/update-perfume.dto';

@Controller('manager')
@UseGuards(AuthGuard)
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  // Route 1: Get all perfumes [GET]
  @Get('perfumes')
  getAllPerfumes() {
    return this.managerService.getAllPerfumes();
  }

  // Route 2: Get perfume by ID [GET]
  @Get('perfume/:id')
  getPerfumeById(@Param('id') id: string) {
    return this.managerService.getPerfumeById(id);
  }

  // Route 3: Update perfume [PUT]
  @Put('perfume/:id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  updatePerfume(
    @Param('id') id: string,
    @Body() updatePerfumeDto: UpdatePerfumeDto,
  ) {
    return this.managerService.updatePerfume(id, updatePerfumeDto);
  }
}
