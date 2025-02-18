import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { logger } from './logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;
  logger.info('Application is starting...');
  await app.listen(port);
  logger.info(`NestJS Server running on http://localhost:${port}\n`);
}
bootstrap();
