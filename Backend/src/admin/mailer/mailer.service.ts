import { MailerService as NestMailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailerService {
  constructor(private readonly mailerService: NestMailerService) {}

  async sendStockUpdateNotification(userEmail: string, productName: string) {
    await this.mailerService.sendMail({
      to: userEmail,
      subject: `Stock Update for ${productName}`,
      text: `Good news! ${productName} is back in stock.`,
    });
    console.log(`Email sent for ${productName} stock update.`);
  }
}