import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
  getImage(name: string) {
    throw new Error('Method not implemented.');
  }
  createAdmin(data: any) {
    console.log('Admin created:', data);
    return {
      message: 'Admin user created successfully',
      data,
    };
  }
}
