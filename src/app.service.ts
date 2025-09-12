import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getCheckHealth(): string {
    return 'OK';
  }
}
