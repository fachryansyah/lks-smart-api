import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { urlencoded, json } from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { configService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  if (!configService.isProduction()) {
    const config = new DocumentBuilder()
      .setTitle('LKS Smart API Docs')
      .setDescription('The LKS Smart API Documentation')
      .addBearerAuth(
        { type: 'http', scheme: 'Bearer', bearerFormat: 'JWT', in: 'header' },
        'Authorization',
      )
      .setVersion('1.0')
      .addTag('LKS Smart')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
  }

  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false,
      transform: true,
    }),
  );

  app.use(json({ limit: '1000mb' }));
  app.use(urlencoded({ limit: '1000mb', extended: true }));

  app.enableCors({
    origin: ['https://fachry.dev', 'http://localhost:3000'], // Your frontend URL (explicitly mention it, NOT '*')
    credentials: true, // Allow credentials (cookies)
  });

  await app.listen(configService.getPort());
}
bootstrap();
