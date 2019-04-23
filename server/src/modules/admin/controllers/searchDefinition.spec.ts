import { Test, TestingModule } from '@nestjs/testing';

import { SearchDefinitionService } from '../services/searchDefinition';
import { SearchDefinitionController } from './searchDefinition';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [SearchDefinitionController],
      providers: [SearchDefinitionService],
    }).compile();
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      const appController = app.get<SearchDefinitionController>(SearchDefinitionController);
      expect(appController.list()).toBe([]);
    });
  });
});
