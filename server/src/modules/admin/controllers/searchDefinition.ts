import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ISearchDefinition, SearchDefinitionValidation } from 'schema/searchDefinition';

import { SearchDefinitionService } from '../services/searchDefinition';

@Controller('/search-definition')
export class SearchDefinitionController {
  constructor(private readonly appService: SearchDefinitionService) { }

  @Get()
  public async list(): Promise<ISearchDefinition[]> {
    return await this.appService.list();
  }

  @Post()
  public async save(@Body() model: SearchDefinitionValidation): Promise<any> {
    return await this.appService.save(model);
  }

  @Delete('/:id')
  public async delete(@Param('id') id: string): Promise<any> {
    return await this.appService.delete(id);
  }
}
