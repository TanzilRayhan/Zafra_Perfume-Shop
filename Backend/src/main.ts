// /* eslint-disable @typescript-eslint/no-floating-promises */
// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(process.env.PORT ?? 3000);
// }
// bootstrap();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
     session({
     secret: 'my-secret',
     resave: false,
     saveUninitialized: false,
    cookie:{
     maxAge: 300000
    }
     }),
    );
    
  await app.listen(3000);
}
bootstrap();
