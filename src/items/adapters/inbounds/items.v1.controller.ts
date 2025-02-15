import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { StrictBuilder } from 'builder-pattern';

import {
  CreateItemCommand,
  CreateItemUseCase,
  DeleteItemByIdUseCase,
  GetItemsUseCase,
  UpdateItemCommand,
  UpdateItemUseCase,
} from '../../applications/usecases';
import { GetItemByIdUseCase } from './../../applications/usecases/getItemById.usecase';
import { CreateItemV1Dto } from './createItem.v1.dto';
import { GetItemsV1Dto } from './getItems.v1.dto';
import { ItemIdV1Dto } from './itemId.v1.dto';
import { UpdateItemV1Dto } from './updateItem.v1.dto';

@Controller('items')
export class ItemsV1Controller {
  constructor(
    private readonly createItemUseCase: CreateItemUseCase,
    private readonly deleteItemByIdUseCase: DeleteItemByIdUseCase,
    private readonly getItemByIdUseCase: GetItemByIdUseCase,
    private readonly getItemsUseCase: GetItemsUseCase,
    private readonly updateItemUseCase: UpdateItemUseCase,
  ) {}

  @Get()
  async getItems(@Query() query: GetItemsV1Dto) {
    return this.getItemsUseCase.execute(query);
  }

  @Get(':itemId')
  async getItemById(@Param() { itemId }: ItemIdV1Dto) {
    return this.getItemByIdUseCase.execute(itemId);
  }

  @Post()
  async createItem(@Body() body: CreateItemV1Dto) {
    const command = StrictBuilder<CreateItemCommand>()
      .name(body.name)
      .price(body.price)
      .imageUrl(body.imageUrl)
      .status(body.status)
      .color(body.color)
      .country(body.country)
      .category(body.category)
      .build();
    return this.createItemUseCase.execute(command);
  }

  @Patch(':itemId')
  async updateItem(
    @Param() { itemId }: ItemIdV1Dto,
    @Body() body: UpdateItemV1Dto,
  ) {
    const command = StrictBuilder<UpdateItemCommand>()
      .id(itemId)
      .name(body.name)
      .price(body.price)
      .imageUrl(body.imageUrl)
      .status(body.status)
      .build();
    return this.updateItemUseCase.execute(command);
  }

  @Delete(':itemId')
  async deleteItem(@Param() { itemId }: ItemIdV1Dto) {
    return this.deleteItemByIdUseCase.execute(itemId);
  }
}
