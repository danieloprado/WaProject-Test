import { HttpModule, Module } from '@nestjs/common';
import { DatabaseModule } from 'modules/database/module';

import { EbayApiService } from './services/ebay';
import { EmailService } from './services/Email';
import { SearchSenderService } from './services/searchSender';
import { SearchWorkerService } from './services/searchWorker';

@Module({
  imports: [DatabaseModule, HttpModule],
  providers: [EmailService, EbayApiService, SearchWorkerService, SearchSenderService, EmailService]
})
export class WorkerModule { }