// 启用版本配置
import { VERSION_NEUTRAL, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
// 底层框架由 Express 换为 Fastify
// import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import fastify from 'fastify';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { AllExceptionsFilter } from './common/exceptions/base.exception.filter';
import { HttpExceptionFilter } from './common/exceptions/http.exception.filter';
import { generateDocument } from './doc';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { FastifyLogger } from './common/logger';

declare const module: any;

async function bootstrap() {
  const fastifyInstance = fastify({
    logger: FastifyLogger,
  });

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(fastifyInstance),
  );

  app.setGlobalPrefix('api');

  // 接口版本化管理
  app.enableVersioning({
    // 配置全局版本控制
    defaultVersion: [VERSION_NEUTRAL, '1'],
    type: VersioningType.URI,
  });

  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionFilter());

  generateDocument(app);

  // 开启热重载
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  await app.listen(3000);
}

bootstrap();
