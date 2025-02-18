/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import { engine } from 'express-handlebars';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { logger, requestLogger } from './logger';
import * as hbs from 'hbs';
import { GlobalExceptionFilter } from './exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;
  // Register Global Exception Filter
  app.useGlobalFilters(new GlobalExceptionFilter());

  app.engine('hbs', engine({ extname: '.hbs', defaultLayout: 'main' }));
  app.setViewEngine('hbs'); // Specify Handlebars as the template engine
  app.setBaseViewsDir(join(__dirname, '..', 'views')); // Directory where your templates reside
  hbs.registerPartials(join(__dirname, '..', 'views', 'partials')); // Register Handlebars partials (optional)
  app.useStaticAssets(join(__dirname, '..', 'public')); // Serve static assets (CSS, JS, images)

  logger.info('Application is starting...');
  app.use(requestLogger);

  // To catch uncaught exceptions and promise rejections
  process.on('uncaughtException', (err) => {
    logger.error('Uncaught Exception:', err);
  });
  process.on('unhandledRejection', (reason, promise) => {
    if (reason) {
      logger.error('Unhandled Rejection:', reason);
    }
    if (promise) {
      logger.error('Unhandled Promise:', promise);
    }
  });

  await app.listen(port);

  logger.info(`NestJS Server running on http://localhost:${port}\n`);
}
void bootstrap();
