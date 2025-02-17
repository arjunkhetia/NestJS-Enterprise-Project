import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes config available throughout the app
      envFilePath: '.env', // Specify the path to the .env file (default is .env)
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
