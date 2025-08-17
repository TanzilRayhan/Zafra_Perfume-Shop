import { IsEnum, IsNotEmpty } from 'class-validator';
import { Role } from '../common/enums/user-role.enum';

export class UpdateUserRoleDto {
  @IsEnum(Role) // Validates that the value is part of the Role enum [cite: 1518]
  @IsNotEmpty()
  role: Role;
}