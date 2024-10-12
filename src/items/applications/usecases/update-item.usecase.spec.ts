import { mock } from 'jest-mock-extended';
import { UpdateItemUsecase } from './update-item.usecase';
import { ItemRepository } from '../ports';
import { Builder, StrictBuilder } from 'builder-pattern';
import { UpdateItemCommand } from '../commands';
import { IItem, Item, ItemId } from '../../domains';
import { NotFoundException } from '@nestjs/common';

describe('UpdateItemUsecase', () => {
  const itemRepository = mock<ItemRepository>();
  let updateItemUseCase: UpdateItemUsecase;

  const itemId = 'JavaScriptBangkok2.0' as ItemId;

  beforeEach(() => {
    updateItemUseCase = new UpdateItemUsecase(itemRepository);

    const item = Builder(Item).itemId(itemId).build();
    itemRepository.findById.mockResolvedValue(item);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should throw NotFoundException if item not found', async () => {
    // Arrange
    const command = StrictBuilder<UpdateItemCommand>().itemId(itemId).build();
    itemRepository.findById.mockResolvedValue(undefined);

    const expected = NotFoundException;

    // Act
    const actualPromise = updateItemUseCase.execute(command);

    // Assert
    await expect(actualPromise).rejects.toThrow(expected);
  });

  it("should change item's name", async () => {
    // Arrange
    const nameToChange = 'item-name-1';
    const command = StrictBuilder<UpdateItemCommand>()
      .itemId(itemId)
      .name('item-name-1')
      .build();

    const expected = Builder<IItem>().itemId(itemId).name(nameToChange).build();

    // Act
    await updateItemUseCase.execute(command);

    // Assert
    expect(itemRepository.update).toHaveBeenCalledWith(expected);
  });

  it("should change item's price", async () => {
    // Arrange
    const newPrice = 1000;
    const command = StrictBuilder<UpdateItemCommand>()
      .itemId(itemId)
      .price(newPrice)
      .build();

    const expected = Builder<IItem>().itemId(itemId).price(newPrice).build();

    // Act
    await updateItemUseCase.execute(command);

    // Assert
    expect(itemRepository.update).toHaveBeenCalledWith(expected);
  });

  it("should change item's image url", async () => {
    // Arrange
    const newImageUrl = 'https://example.com/image.jpg';
    const command = StrictBuilder<UpdateItemCommand>()
      .itemId(itemId)
      .imageUrl(newImageUrl)
      .build();

    const expected = Builder<IItem>()
      .itemId(itemId)
      .imageUrl(newImageUrl)
      .build();

    // Act
    await updateItemUseCase.execute(command);

    // Assert
    expect(itemRepository.update).toHaveBeenCalledWith(expected);
  });

  it("should change item's available", async () => {
    // Arrange
    const newAvailable = false;
    const command = StrictBuilder<UpdateItemCommand>()
      .itemId(itemId)
      .available(newAvailable)
      .build();

    const expected = Builder<IItem>()
      .itemId(itemId)
      .available(newAvailable)
      .build();

    // Act
    await updateItemUseCase.execute(command);

    // Assert
    expect(itemRepository.update).toHaveBeenCalledWith(expected);
  });

  it('should return updated item', async () => {
    // Arrange
    const command = StrictBuilder<UpdateItemCommand>().itemId(itemId).build();
    const nameToChange = 'updated-name';

    const updatedItem = Builder<IItem>()
      .itemId(itemId)
      .name(nameToChange)
      .build();
    itemRepository.update.mockResolvedValue(updatedItem);

    const expected = Builder<IItem>().itemId(itemId).name(nameToChange).build();

    // Act
    const actual = await updateItemUseCase.execute(command);

    // Assert
    expect(actual).toEqual(expected);
  });
});
