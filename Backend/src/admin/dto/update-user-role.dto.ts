import { IsEnum, IsNotEmpty } from 'class-validator';
import { Role } from '../common/enums/user-role.enum';

export class UpdateUserRoleDto {
  @IsEnum(Role)
  @IsNotEmpty()
  role: Role;
}