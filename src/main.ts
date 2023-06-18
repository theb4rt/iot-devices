import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');
  const apiPrefix = configService.get<string>('API_PREFIX');
  const apiVersion = configService.get<string>('API_VERSION');
  app.setGlobalPrefix(`${apiPrefix}/${apiVersion}`);
  await app.listen(port);
}
bootstrap();
