import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IJob, JobToken } from 'schema/job';

import SearchEmailJob from '../jobs/searchEmail';
import { SearchSenderService } from './searchSender';

@Injectable()
export class SearchWorkerService implements OnApplicationBootstrap {
  constructor(
    @InjectModel(JobToken) private jobModel: Model<IJob>,
    private searchSender: SearchSenderService
  ) { }

  public onApplicationBootstrap(): void {
    new SearchEmailJob(this.jobModel, this.searchSender, 2).register('2 minutes');
    new SearchEmailJob(this.jobModel, this.searchSender, 15).register('15 minutes');
    new SearchEmailJob(this.jobModel, this.searchSender, 30).register('30 minutes');
  }
}