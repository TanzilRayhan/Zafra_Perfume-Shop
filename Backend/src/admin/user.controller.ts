import { Body, Controller, Get, Param, Post, Put, Query, UsePipes, ValidationPipe} from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { UpdateCountryDto } from './update-country.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @UsePipes(new ValidationPipe())
  create(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  @Put('update-country/:id')
  @UsePipes(new ValidationPipe())
  updateCountry(
    @Param('id') id: string,
    @Body() dto: UpdateCountryDto,
  ) {
    return this.userService.updateCountry(+id, dto.country);
  }

  @Get('by-joining-date')
  getByJoiningDate(@Query('date') date: string) {
    return this.userService.findByJoiningDate(date);
  }

  @Get('unknown-country')
  getWithUnknownCountry() {
    return this.userService.findWithUnknownCountry();
  }

  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }
}
