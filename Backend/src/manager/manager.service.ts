import { Injectable } from '@nestjs/common';

@Injectable()
export class ManagerService {
  getManager(): string {
    return 'Manager service is running successfully.';
  }

  getManagerById(id: string): string {
    return 'Get manager by id: ' + id;
  }

  createManager(): string {
    return 'Create manager';
  }
}
