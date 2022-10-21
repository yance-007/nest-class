import { messages } from '@/helper/feishu/message';
import { BusinessException } from './../../common/exceptions/business.exception';
import { getAppToken } from '@/helper/feishu/auth';
import { ConfigService } from '@nestjs/config';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class FeishuService {
  private APP_TOKEN_CACHE_KEY;
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
    private configService: ConfigService,
  ) {
    this.APP_TOKEN_CACHE_KEY = this.configService.get('APP_TOKEN_CACHE_KEY');
  }

  async getAppToken() {
    let appToken: string;
    appToken = await this.cacheManager.get('APP_TOKEN_CACHE_KEY');
    if (!appToken) {
      const response = await getAppToken();
      if (response.code === 0) {
        appToken = response.app_access_token;
        this.cacheManager.set(
          this.APP_TOKEN_CACHE_KEY,
          appToken,
          response.expire - 60,
        );
      } else {
        throw new BusinessException('飞书调用异常');
      }
    }
    return appToken;
  }

  async sendMessage(receive_id_type, params) {
    const app_token = await this.getAppToken();
    return messages(receive_id_type, params, app_token as string);
  }
}
