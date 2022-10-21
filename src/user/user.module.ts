import { LoggerMiddleware } from './../common/middlewares/logger.middleware';
import { DatabaseModule } from './../common/database/database.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { FeishuService } from './feishu/feishu.service';
import { UserService } from './user.service';
import { FeishuController } from './feishu/feishu.controller';
import { UserController } from './user.controller';
import { UserProviders } from './user.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [FeishuController, UserController],
  providers: [...UserProviders, FeishuService, UserService],
  exports: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(UserController);
  }
}
