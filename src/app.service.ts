/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! Nest.js is running successfully.';
  }
  getPhotoService(photoId: number): string {
    // return `Photo service is running successfully`;
    return 'Get the photo of id: ' + 1;
  }
  createPhoto(): string {
    return 'create photo';
  }
}
