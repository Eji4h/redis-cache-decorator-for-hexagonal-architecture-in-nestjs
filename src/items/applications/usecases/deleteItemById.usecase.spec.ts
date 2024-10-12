import { mock } from 'jest-mock-extended';
import { ItemsRepository } from '../ports';
import { DeleteItemByIdUseCase } from './deleteItemById.usecase';
import { ItemId } from '../../domains';

describe('DeleteItemByIdUseCase', () => {
  const itemRepository = mock<ItemsRepository>();
  let deleteItemByIdUseCase: DeleteItemByIdUseCase;

  beforeEach(() => {
    deleteItemByIdUseCase = new DeleteItemByIdUseCase(itemRepository);
  });

  it('should delete item by id', async () => {
    // Arrange
    const itemId = 'JavaScriptBangkok2.0' as ItemId;

    // Act
    await deleteItemByIdUseCase.execute(itemId);

    // Assert
    expect(itemRepository.delete).toHaveBeenCalledWith(itemId);
  });
});
