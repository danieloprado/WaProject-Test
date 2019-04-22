import { Controller, Get } from '@nestjs/common';

import { TestService } from '../services/TestService';

@Controller()
export class AppController {
  constructor(private readonly appService: TestService) { }

  @Get()
  public getHello(): string {
    return this.appService.getHello();
  }
}
