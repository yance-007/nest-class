import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  // eslint-disable-next-line @typescript-eslint/ban-types
  use(req: any, res: Response, next: Function) {
    try {
      const offuscateRequest = JSON.parse(JSON.stringify(req.body));
      if (offuscateRequest) {
        if (offuscateRequest.password) offuscateRequest.password = '*******';
        if (offuscateRequest.newPassword)
          offuscateRequest.newPassword = '*******';
        if (offuscateRequest.currentPassword)
          offuscateRequest.currentPassword = '*******';
      }
      Logger.log(
        req.url + ' - ' + JSON.stringify(offuscateRequest).slice(0, 500),
        '请求',
      );
    } catch (err) {}
    next();
  }
}
