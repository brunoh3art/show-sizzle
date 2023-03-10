import { ErrorInterceptor } from '@infra/interceptors/error-interceptor';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ErrorInterceptor());

  await app.listen(3000);
}
bootstrap();
