import { NotFoundException } from '@nestjs/common';
import { Builder, StrictBuilder } from 'builder-pattern';
import { mock } from 'jest-mock-extended';

import { IItem, Item, ItemId, ItemStatus } from '../../domains';
import { ItemsRepository } from '../ports';
import { UpdateItemCommand, UpdateItemUseCase } from './updateItem.usecase';

describe('UpdateItemUsecase', () => {
  const itemRepository = mock<ItemsRepository>();
  let updateItemUseCase: UpdateItemUseCase;

  const itemId = 'JavaScriptBangkok2.0' as ItemId;

  beforeEach(() => {
    updateItemUseCase = new UpdateItemUseCase(itemRepository);

    const item = Builder(Item).id(itemId).build();
    itemRepository.findById.mockResolvedValue(item);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should throw NotFoundException if item not found', async () => {
    // Arrange
    const command = StrictBuilder<UpdateItemCommand>().id(itemId).build();
    itemRepository.findById.mockResolvedValue(undefined);

    const expectedError = NotFoundException;

    // Act
    const actualPromise = updateItemUseCase.execute(command);

    // Assert
    await expect(actualPromise).rejects.toThrow(expectedError);
  });

  it("should change item's name", async () => {
    // Arrange
    const nameToChange = 'item-name-1';
    const command = StrictBuilder<UpdateItemCommand>()
      .id(itemId)
      .name('item-name-1')
      .build();

    const expected = Builder<IItem>().id(itemId).name(nameToChange).build();

    // Act
    await updateItemUseCase.execute(command);

    // Assert
    expect(itemRepository.update).toHaveBeenCalledWith(expected);
  });

  it("should change item's price", async () => {
    // Arrange
    const newPrice = 1000;
    const command = StrictBuilder<UpdateItemCommand>()
      .id(itemId)
      .price(newPrice)
      .build();

    const expected = Builder<IItem>().id(itemId).price(newPrice).build();

    // Act
    await updateItemUseCase.execute(command);

    // Assert
    expect(itemRepository.update).toHaveBeenCalledWith(expected);
  });

  it("should change item's image url", async () => {
    // Arrange
    const newImageUrl = 'https://example.com/image.jpg';
    const command = StrictBuilder<UpdateItemCommand>()
      .id(itemId)
      .imageUrl(newImageUrl)
      .build();

    const expected = Builder<IItem>().id(itemId).imageUrl(newImageUrl).build();

    // Act
    await updateItemUseCase.execute(command);

    // Assert
    expect(itemRepository.update).toHaveBeenCalledWith(expected);
  });

  it("should change item's status", async () => {
    // Arrange
    const newStatus = ItemStatus.Unavailable;
    const command = StrictBuilder<UpdateItemCommand>()
      .id(itemId)
      .status(newStatus)
      .build();

    const expected = Builder<IItem>().id(itemId).status(newStatus).build();

    // Act
    await updateItemUseCase.execute(command);

    // Assert
    expect(itemRepository.update).toHaveBeenCalledWith(expected);
  });

  it('should return updated item', async () => {
    // Arrange
    const command = StrictBuilder<UpdateItemCommand>().id(itemId).build();
    const nameToChange = 'updated-name';

    const updatedItem = Builder<IItem>().id(itemId).name(nameToChange).build();
    itemRepository.update.mockResolvedValue(updatedItem);

    const expected = Builder<IItem>().id(itemId).name(nameToChange).build();

    // Act
    const actual = await updateItemUseCase.execute(command);

    // Assert
    expect(actual).toEqual(expected);
  });
});
