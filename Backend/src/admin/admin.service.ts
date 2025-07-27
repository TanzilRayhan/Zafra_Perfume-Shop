import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
  createAdmin(data: any) {
    console.log('Admin created:', data);
    return {
      message: 'Admin user created successfully',
      data,
    };
  }
}
