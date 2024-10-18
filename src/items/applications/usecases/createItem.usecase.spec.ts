import { Builder, StrictBuilder } from 'builder-pattern';
import { mock } from 'jest-mock-extended';

import { Item, ItemColor, ItemStatus } from '../../domains';
import { ItemsRepository } from '../ports';
import { CreateItemCommand, CreateItemUseCase } from './createItem.usecase';

describe('CreateItemUseCase', () => {
  const itemRepository = mock<ItemsRepository>();

  let useCase: CreateItemUseCase;

  const itemName = 'JavaScriptBangkok2.0';
  const itemPrice = 100;
  const itemImageUrl = 'https://example.com/image.png';
  const itemStatus = ItemStatus.Available;
  const itemColor = ItemColor.Red;

  beforeEach(() => {
    useCase = new CreateItemUseCase(itemRepository);
  });

  it('should create an item', async () => {
    // Arrange
    const command = StrictBuilder<CreateItemCommand>()
      .name(itemName)
      .price(itemPrice)
      .imageUrl(itemImageUrl)
      .status(itemStatus)
      .color(itemColor)
      .build();

    const expectedItem = Builder(Item)
      .name(itemName)
      .price(itemPrice)
      .imageUrl(itemImageUrl)
      .status(itemStatus)
      .color(itemColor)
      .build();

    // Act
    await useCase.execute(command);

    // Assert
    expect(itemRepository.create).toHaveBeenCalledWith(expectedItem);
  });

  it('should mark item as available by default if not provided', async () => {
    // Arrange
    const command = Builder<CreateItemCommand>()
      .name(itemName)
      .price(itemPrice)
      .imageUrl(itemImageUrl)
      .color(itemColor)
      .build();

    const expectedItem = Builder(Item)
      .name(itemName)
      .price(itemPrice)
      .imageUrl(itemImageUrl)
      .status(ItemStatus.Available)
      .color(itemColor)
      .build();

    // Act
    await useCase.execute(command);

    // Assert
    expect(itemRepository.create).toHaveBeenCalledWith(expectedItem);
  });
});
