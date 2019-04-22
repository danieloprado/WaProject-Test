import { Module } from '@nestjs/common';

import { AppController } from './controllers/test';
import { TestService } from './services/TestService';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [TestService],
})
export class AppModule { }
