import { Injectable } from '@nestjs/common';
import { logger } from './logger';

@Injectable()
export class AppService {
  constructor() {
    logger.debug('AppService initialized');
    logger.info('AppService initialized');
    logger.warn('AppService initialized');
    logger.error('AppService initialized');
    logger.verbose('AppService initialized');
    logger.silly('AppService initialized');
    logger.http('AppService initialized');
  }
  getHello() {
    // return 'Hello World!';
    return { title: 'Home Page', name: 'NestJS Developer' };
  }
}
