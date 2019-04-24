import { Module } from '@nestjs/common';

import { AdminModule } from './admin/module';
import { WorkerModule } from './worker/module';

@Module({
  imports: [AdminModule, WorkerModule],
})
export class ApplicationModule { }