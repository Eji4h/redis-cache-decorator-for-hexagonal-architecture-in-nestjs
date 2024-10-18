import { mock } from 'jest-mock-extended';
import { ItemsRepository } from '../ports';
import { GetItemsUseCase } from './getItems.usecase';
import { Builder } from 'builder-pattern';
import { IItem, Item, ItemColor, ItemId, ItemStatus } from '../../domains';

describe('GetItemsUsecase', () => {
  const itemRepository = mock<ItemsRepository>();

  let getItemsUseCase: GetItemsUseCase;

  beforeEach(() => {
    getItemsUseCase = new GetItemsUseCase(itemRepository);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return all items', async () => {
    // Arrange
    const itemId1 = 'JavaScript' as ItemId;
    const item1 = Builder<IItem>().id(itemId1).build();

    const itemId2 = 'Bangkok2.0' as ItemId;
    const item2 = Builder<IItem>().id(itemId2).build();

    itemRepository.findAll.mockResolvedValue([item1, item2]);

    const expected = [item1, item2];

    // Act
    const actual = await getItemsUseCase.execute({});

    // Assert
    expect(actual).toEqual(expected);
    expect(itemRepository.findAll).toHaveBeenCalled();
    expect(itemRepository.findByStatusAndColor).not.toHaveBeenCalled();
  });

  it.each`
    status                    | color
    ${ItemStatus.Available}   | ${undefined}
    ${ItemStatus.Unavailable} | ${undefined}
    ${ItemStatus.Obsoleted}   | ${undefined}
    ${undefined}              | ${ItemColor.Red}
    ${undefined}              | ${ItemColor.Green}
    ${undefined}              | ${ItemColor.Blue}
  `(
    'should find item with specific parameters',
    async ({ status, color }: { status: ItemStatus; color: ItemColor }) => {
      // Arrange
      const query = { status, color };

      const itemId1 = 'JavaScript' as ItemId;
      const item1 = Builder(Item)
        .id(itemId1)
        .status(status)
        .color(color)
        .build();

      const itemId2 = 'Bangkok2.0' as ItemId;
      const item2 = Builder(Item)
        .id(itemId2)
        .status(status)
        .color(color)
        .build();

      itemRepository.findByStatusAndColor.mockResolvedValue([item1, item2]);

      // Act
      await getItemsUseCase.execute(query);

      // Assert
      expect(itemRepository.findByStatusAndColor).toHaveBeenCalledWith(
        status,
        color,
      );
      expect(itemRepository.findAll).not.toHaveBeenCalled();
    },
  );
});
