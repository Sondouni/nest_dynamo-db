import { Injectable } from '@nestjs/common';

@Injectable()
export class TestService {
  getHello(): any {

    return 'test';
  }
}
