import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SearchDefinitionSchema, SearchDefinitionToken } from 'schema/searchDefinition';
import { MONGO_DSN } from 'settings';
import { JobToken, JobSchema } from 'schema/job';

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_DSN),
    MongooseModule.forFeature([{ name: SearchDefinitionToken, schema: SearchDefinitionSchema }]),
    MongooseModule.forFeature([{ name: JobToken, schema: JobSchema }])
  ],
  exports: [
    MongooseModule.forFeature([{ name: SearchDefinitionToken, schema: SearchDefinitionSchema }]),
    MongooseModule.forFeature([{ name: JobToken, schema: JobSchema }])
  ]
})
export class DatabaseModule { }