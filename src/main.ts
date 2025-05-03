import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'; // Import Swagger modules

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Antares Project API')
    .setDescription('Movie Booking App API documentation')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('_api', app, document); // Setup Swagger UI at /_api
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
