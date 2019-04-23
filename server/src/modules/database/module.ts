import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SearchDefinitionSchema, SearchDefinitionToken } from 'schema/searchDefinition';
import { MONGO_DSN } from 'settings';

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_DSN),
    MongooseModule.forFeature([{ name: SearchDefinitionToken, schema: SearchDefinitionSchema }])
  ],
  exports: [
    MongooseModule.forFeature([{ name: SearchDefinitionToken, schema: SearchDefinitionSchema }])
  ]
})
export class DatabaseModule { }