import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsIn, IsInt, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
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

export class SearchDefinitionValidation {
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(250)
  @ApiModelProperty({ required: true, maxLength: 250 })
  public email: string;

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  @ApiModelProperty({ required: true, minLength: 3, maxLength: 100 })
  public phrase: string;

  @IsNotEmpty()
  @IsInt()
  @IsIn([2, 10, 30])
  @ApiModelProperty({ required: true, in: '2, 10, 30' })
  public interval: number;
}