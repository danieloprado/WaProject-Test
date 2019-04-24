import * as mongoose from 'mongoose';

// tslint:disable-next-line: variable-name
export const SearchDefinitionToken = 'SearchDefinitionSchema';

export interface ISearchDefinition extends mongoose.Document, mongoose.SchemaTimestampsConfig {
  email: string;
  phrase: string;
  interval: number;
}

// tslint:disable-next-line: variable-name
export const SearchDefinitionSchema = new mongoose.Schema<ISearchDefinition>({
  email: String,
  phrase: String,
  interval: Number
}, { timestamps: true });