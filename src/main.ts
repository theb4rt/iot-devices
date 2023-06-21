import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');
  const apiPrefix = configService.get<string>('API_PREFIX');
  const apiVersion = configService.get<string>('API_VERSION');

  app.setGlobalPrefix(`${apiPrefix}/${apiVersion}`);
  app.useWebSocketAdapter(new IoAdapter(app));

  // Enable CORS
  app.enableCors();

  await app.listen(port);
}
bootstrap();
