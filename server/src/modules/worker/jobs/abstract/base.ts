import * as sentry from '@sentry/node';
import { Model } from 'mongoose';
import * as scheduler from 'node-schedule';
import { enJobsStatus, IJob } from 'schema/job';

export type JobRules = scheduler.RecurrenceRule | scheduler.RecurrenceSpecDateRange | scheduler.RecurrenceSpecObjLit | Date | string;

export interface IJobResult<T = any> {
  success: boolean;
  model: IJob;
  result?: T;
  error?: any;
}

export default abstract class JobBase<R extends IJobResult = IJobResult> {
  constructor(
    protected baseName: string,
    protected jobModel: Model<IJob>,
    protected defaultRule?: JobRules,
  ) { }

  public register(name: string = null, rule: JobRules = this.defaultRule): void {
    const jobName = `${this.baseName}${name ? ` - ${name}` : ''}`.trim();
    scheduler.scheduleJob(jobName, rule, () => this.run(jobName));
  }

  public async run(name: string = this.baseName): Promise<R> {
    let model: IJob;
    console.log(`JOB: ${name} - ${new Date()} - BEGIN`);

    try {
      model = await this.jobModel.create({ name, status: enJobsStatus.proccessing });
      const result = await this.proccess();

      model.status = enJobsStatus.success;
      model.result = result;
      await model.save();

      console.log(`JOB: ${name} - ${new Date()} - RESULT:`);
      console.log(result);

      return { success: true, model, result } as R;
    } catch (error) {
      if (model) {
        model.status = enJobsStatus.error;
        model.result = {
          name: error.name,
          message: error.message,
          stack: error.stack
        };

        error.errorData = model.save().catch(updateError => ({ ...model, updateError }) as any);
      }

      sentry.captureException(error);

      console.log(`JOB: ${name} - ${new Date()} - ERROR:`);
      console.error(error);

      return { success: false, model, error } as R;
    }
  }

  protected abstract proccess(): Promise<any>;
}