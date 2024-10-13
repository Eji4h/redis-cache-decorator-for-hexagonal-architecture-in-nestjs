import { mock } from 'jest-mock-extended';
import { ItemsRepository } from '../ports';
import { DeleteItemByIdUseCase } from './deleteItemById.usecase';
import { ItemColor, ItemFactory, ItemId, ItemStatus } from '../../domains';
import { clone } from 'lodash';
import { NotFoundException } from '@nestjs/common';

describe('DeleteItemByIdUseCase', () => {
  const itemRepository = mock<ItemsRepository>();
  let deleteItemByIdUseCase: DeleteItemByIdUseCase;

  beforeEach(() => {
    deleteItemByIdUseCase = new DeleteItemByIdUseCase(itemRepository);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be throw error when not found', async () => {
    // Arrange
    const itemId = 'JavaScriptBangkok2.0' as ItemId;
    itemRepository.findById.mockResolvedValue(undefined);

    const expectedError = NotFoundException;

    // Act
    const actualPromise = deleteItemByIdUseCase.execute(itemId);

    // Assert
    await expect(actualPromise).rejects.toThrow(expectedError);
    expect(itemRepository.update).not.toHaveBeenCalled();
  });

  it('item should be obsoleted item when found it', async () => {
    // Arrange
    const itemId = 'JavaScriptBangkok2.0' as ItemId;

    const itemToDelete = ItemFactory.create({
      name: 'JavaScriptBangkok2.0',
      price: 1000,
      imageUrl: 'https://example.com/image.png',
      status: ItemStatus.Available,
      color: ItemColor.Red,
    });

    const expectedItem = clone(itemToDelete);
    expectedItem.status = ItemStatus.Obsoleted;
    itemRepository.findById.mockResolvedValue(itemToDelete);

    // Act
    await deleteItemByIdUseCase.execute(itemId);

    // Assert
    expect(itemRepository.update).toHaveBeenCalledWith(itemToDelete);
  });
});
