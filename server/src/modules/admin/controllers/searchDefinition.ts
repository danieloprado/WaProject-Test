import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
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
  public async create(@Body() model: SearchDefinitionValidation): Promise<any> {
    return await this.appService.create(model);
  }

  @Put('/:id')
  public async update(@Param('id') id: string, @Body() model: SearchDefinitionValidation): Promise<any> {
    return await this.appService.update(id, model);
  }

  @Delete('/:id')
  public async delete(@Param('id') id: string): Promise<any> {
    return await this.appService.delete(id);
  }
}
