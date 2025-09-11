import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🔹 Always enable CORS before session
 app.enableCors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
});


  // 🔹 Session middleware
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true, // ✅ secure
        maxAge: 1000 * 60 * 60, // 1 hour
      },
    }),
  );

  await app.listen(4000);
}
bootstrap();
