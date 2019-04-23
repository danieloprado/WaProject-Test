import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ISearchDefinition, SearchDefinitionToken, SearchDefinitionValidation } from 'schema/searchDefinition';

@Injectable()
export class SearchDefinitionService {
  constructor(
    @InjectModel(SearchDefinitionToken) private searchDefinitionModel: Model<ISearchDefinition>
  ) { }

  public async list(): Promise<ISearchDefinition[]> {
    return await this.searchDefinitionModel.find().exec();
  }

  public async save(model: SearchDefinitionValidation): Promise<ISearchDefinition> {
    const data = await this.searchDefinitionModel.create(model);
    return data.save();
  }

  public async delete(_id: string): Promise<void> {
    await this.searchDefinitionModel.deleteOne({ _id });
  }
}
