import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: true });
  app.enableCors();
  app.setGlobalPrefix('api');
  await app.listen(AppModule.port);
}
bootstrap();
