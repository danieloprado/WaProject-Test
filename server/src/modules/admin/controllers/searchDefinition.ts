import { Body, Controller, Delete, Get, HttpException, Param, Post, Put } from '@nestjs/common';
import mongoose from 'mongoose';
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
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpException('Bad Request', 400);
    }

    const result = await this.appService.update(id, model);

    if (!result) {
      throw new HttpException('Not found', 404);
    }

    return result;
  }

  @Delete('/:id')
  public async delete(@Param('id') id: string): Promise<any> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpException('Bad Request', 400);
    }

    return await this.appService.delete(id);
  }
}
