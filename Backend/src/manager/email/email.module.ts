import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, 
        auth: {
          user: 'remonkumar21@gmail.com',      
          pass: 'cyzt loxp hogz piqs',            
        },
      },
      defaults: {
        from: '"No Reply" <remonkumar21@gmail.com>',
      },
    }),
  ],
  controllers: [EmailController],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
