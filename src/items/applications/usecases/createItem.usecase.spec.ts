import { mock } from 'jest-mock-extended';
import { ItemsRepository } from '../ports';
import { CreateItemUseCase, CreateItemCommand } from './createItem.usecase';
import { Builder, StrictBuilder } from 'builder-pattern';
import { ItemAttributes } from '../../domains';

describe('CreateItemUseCase', () => {
  const itemRepository = mock<ItemsRepository>();

  let useCase: CreateItemUseCase;

  const itemName = 'JavaScriptBangkok2.0';
  const itemPrice = 100;
  const itemImageUrl = 'https://example.com/image.png';
  const itemAvailable = true;

  beforeEach(() => {
    useCase = new CreateItemUseCase(itemRepository);
  });

  it('should create an item', async () => {
    // Arrange
    const command = StrictBuilder<CreateItemCommand>()
      .name(itemName)
      .price(itemPrice)
      .imageUrl(itemImageUrl)
      .available(itemAvailable)
      .build();

    const expectedItem = Builder<ItemAttributes>()
      .name(itemName)
      .price(itemPrice)
      .imageUrl(itemImageUrl)
      .available(itemAvailable)
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
      .build();

    const expectedItem = Builder<Parameters<ItemsRepository['create']>[0]>()
      .name(itemName)
      .price(itemPrice)
      .imageUrl(itemImageUrl)
      .available(true)
      .build();

    // Act
    await useCase.execute(command);

    // Assert
    expect(itemRepository.create).toHaveBeenCalledWith(expectedItem);
  });
});
