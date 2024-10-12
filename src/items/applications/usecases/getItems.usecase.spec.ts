import { mock } from 'jest-mock-extended';
import { ItemsRepository } from '../ports';
import { GetItemsUseCase } from './getItems.usecase';
import { Builder } from 'builder-pattern';
import { IItem, ItemId } from '../../domains';

describe('GetItemsUsecase', () => {
  const itemRepository = mock<ItemsRepository>();

  let getItemsUseCase: GetItemsUseCase;

  beforeEach(() => {
    getItemsUseCase = new GetItemsUseCase(itemRepository);
  });

  it('should return all items', async () => {
    // Arrange
    const itemId1 = 'JavaScript' as ItemId;
    const item1 = Builder<IItem>().itemId(itemId1).build();

    const itemId2 = 'Bangkok2.0' as ItemId;
    const item2 = Builder<IItem>().itemId(itemId2).build();

    itemRepository.findAll.mockResolvedValue([item1, item2]);

    const expected = [item1, item2];

    // Act
    const actual = await getItemsUseCase.execute({});

    // Assert
    expect(actual).toEqual(expected);
  });

  it.each`
    available
    ${true}
    ${false}
    ${undefined}
  `(
    'should find item with specific available status',
    async ({ available }: { available: boolean }) => {
      // Arrange
      const query = { available };

      const itemId1 = 'JavaScript' as ItemId;
      const item1 = Builder<IItem>().itemId(itemId1).available(true).build();

      const itemId2 = 'Bangkok2.0' as ItemId;
      const item2 = Builder<IItem>().itemId(itemId2).available(true).build();

      itemRepository.findAll.mockResolvedValue([item1, item2]);

      const expected = { available };

      // Act
      await getItemsUseCase.execute(query);

      // Assert
      expect(itemRepository.findAll).toHaveBeenCalledWith(expected);
    },
  );
});
