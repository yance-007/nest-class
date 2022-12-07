import { Inject, Injectable } from '@nestjs/common';
import { User } from './entities/user.mongo.entity';
import { MongoRepository } from 'typeorm';
import { FeishuUserInfo } from './feishu/feishu.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: MongoRepository<User>,
  ) {}

  async createOrSave(user) {
    return await this.userRepository.save(user);
  }

  async createOrUpdateByFeishu(feishuUserInfo: FeishuUserInfo) {
    return await this.userRepository.save(feishuUserInfo);
  }
}
