import { Model } from 'mongoose';
import { IJob } from 'schema/job';

import { SearchSenderService } from '../services/searchSender';
import JobBase from './abstract/base';

export default class SearchEmailJob extends JobBase {
  constructor(
    jobModel: Model<IJob>,
    private searchSender: SearchSenderService,
    private interval: 2 | 15 | 30
  ) {
    super('SearchEmailJob', jobModel, `*/${interval} * * * *`);
  }

  protected async proccess(): Promise<any> {
    return await this.searchSender.proccess(this.interval);
  }
}