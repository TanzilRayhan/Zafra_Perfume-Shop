import { Get, Injectable, Param, Res } from '@nestjs/common';
import { CreateManagerDto } from './manager.dto';

@Injectable()
export class ManagerService {
  private createdManager: CreateManagerDto | null = null;

  getManager(): string {
    return 'Manager service found successfully.';
  }

  getManagerById(id: number): string {
    return 'Get manager by ID: ' + id;
  }

  createManager(data: CreateManagerDto): string {
    this.createdManager = data;
    const { id, name, email, password, gender, phone } = data;
    return `Manager created:
      ID: ${id}
      Name: ${name}
      Email: ${email}
      Password: ${password}
      Gender: ${gender}
      Phone: ${phone}`;
  }



}
