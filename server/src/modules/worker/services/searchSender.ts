import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ISearchDefinition, SearchDefinitionToken } from 'schema/searchDefinition';

import { EbayApiService } from './ebay';
import { EmailService } from './email';

@Injectable()
export class SearchSenderService {
  constructor(
    private ebayService: EbayApiService,
    private emailService: EmailService,
    @InjectModel(SearchDefinitionToken) private searchDefinitionModel: Model<ISearchDefinition>
  ) { }

  public async proccess(interval: number): Promise<{ success: boolean, error?: any; }[]> {
    const items = await this.searchDefinitionModel.find({ interval }).exec();
    const promises = items.map(async item => {
      try {
        const messageId = await this.sendEmail(item);
        return { success: true, messageId };
      } catch (error) {
        return { success: false, error };
      }
    });

    return Promise.all(promises);
  }

  public async sendEmail(searchDefinition: ISearchDefinition): Promise<string> {
    const items = await this.ebayService.search(searchDefinition.phrase);
    return this.emailService.send(searchDefinition.email, 'Ebay Search', 'ebay', {
      phrase: searchDefinition.phrase,
      interval: searchDefinition.interval,
      items
    });
  }
}