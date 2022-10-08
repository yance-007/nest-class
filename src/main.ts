// 启用版本配置
import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
// 底层框架由 Express 换为 Fastify
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  // 接口版本化管理
  app.enableVersioning({
    type: VersioningType.URI,
  });

  await app.listen(3000);
}
bootstrap();
