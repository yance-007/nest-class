import { FeishuService } from './../user/feishu/feishu.service';
import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.mongo.entity';
import { FeishuUserInfo } from '../user/feishu/feishu.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private UserService: UserService,
    private FeishuService: FeishuService,
  ) {}

  // 验证飞书用户
  async validateFeishuUser(code: string) {
    const feishuInfo: FeishuUserInfo = await this.getFeishuTokenByApplications(
      code,
    );

    // 同步信息
    const user: User = await this.UserService.createOrUpdateByFeishu(
      feishuInfo,
    );

    return {
      userId: user.id,
      username: user.username,
      name: user.name,
      email: user.email,
      feishuAccessToken: feishuInfo.accessToken,
      feishuUserId: feishuInfo.feishuUserId,
    };
  }

  // jwt 登录
  async login(user) {
    return {
      access_token: this.jwtService.sign(user),
    };
  }

  async getFeishuTokenByApplications(code: string) {
    const data = await this.FeishuService.getUserToken(code);
    const feishuInfo: FeishuUserInfo = {
      accessToken: data.access_token,
      avatarBig: data.avatar_big,
      avatarMiddle: data.avatar_middle,
      avatarThumb: data.avatar_thumb,
      avatarUrl: data.avatar_url,
      email: data.email,
      enName: data.en_name,
      mobile: data.mobile,
      name: data.name,
      feishuUnionId: data.union_id,
      feishuUserId: data.user_id,
    };
    return feishuInfo;
  }
}
