import { Injectable } from '@nestjs/common';

@Injectable()
export class TestService {

  public getHello(): string {
    return 'Hello World! 22';
  }
}
