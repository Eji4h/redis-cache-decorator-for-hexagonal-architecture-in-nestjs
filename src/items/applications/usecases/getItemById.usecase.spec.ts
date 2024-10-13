import { mock } from 'jest-mock-extended';
import { ItemsRepository } from '../ports';
import { GetItemByIdUseCase } from './getItemById.usecase';
import { IItem, ItemId } from '../../domains';
import { Builder } from 'builder-pattern';
import { NotFoundException } from '@nestjs/common';

describe('GetItemByIdUsecase', () => {
  const itemRepository = mock<ItemsRepository>();

  let getItemByIdUseCase: GetItemByIdUseCase;

  const itemId = 'JavaScriptBangkok2.0' as ItemId;

  beforeEach(() => {
    getItemByIdUseCase = new GetItemByIdUseCase(itemRepository);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should throw NotFoundException if item not found', async () => {
    // Arrange
    itemRepository.findById.mockResolvedValue(undefined);

    const expected = NotFoundException;

    // Act
    const actualPromise = getItemByIdUseCase.execute(itemId);

    // Assert
    await expect(actualPromise).rejects.toThrow(expected);
  });

  it('should return item if item is found', async () => {
    // Arrange
    const item = Builder<IItem>().id(itemId).build();

    itemRepository.findById.mockResolvedValue(item);

    // Act
    const actual = await getItemByIdUseCase.execute(itemId);

    // Assert
    expect(actual).toEqual(item);
  });
});
