// 启用版本配置
import { VERSION_NEUTRAL, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
// 底层框架由 Express 换为 Fastify
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { TransformInterceptor } from "./common/interceptors/transform.interceptor";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  // 接口版本化管理
  app.enableVersioning({
    // 配置全局版本控制
    defaultVersion: [VERSION_NEUTRAL, '1'],
    type: VersioningType.URI,
  });

  app.useGlobalInterceptors(new TransformInterceptor());

  await app.listen(3000);
}
bootstrap();
