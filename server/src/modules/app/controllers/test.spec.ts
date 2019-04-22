import { Test, TestingModule } from '@nestjs/testing';

import { TestService } from '../services/TestService';
import { AppController as TestController } from './Test';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [TestController],
      providers: [TestService],
    }).compile();
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      const appController = app.get<TestController>(TestController);
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
