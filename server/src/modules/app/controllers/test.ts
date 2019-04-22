import { Controller, Get } from '@nestjs/common';

import { TestService } from '../services/TestService';

@Controller()
export class AppController {
  constructor(private readonly appService: TestService) { }

  @Get()
  public getHello(): string {
    throw new Error('Olá 2');
    return this.appService.getHello();
  }
}
