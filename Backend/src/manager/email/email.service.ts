import { Injectable, BadRequestException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer/dist';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(to: string, subject: string, text: string) {
    try {
      const result = await this.mailerService.sendMail({
        to,
        subject,
        text,
        from: '"No Reply" <remonkumar21@gmail.com>',
      });
      
      return { message: 'Email sent successfully' };
    } catch (error: any) {

      
      throw new BadRequestException({
        message: 'Email sending failed',
        details: error.response || error.message,
      });
    }
  }
}
