import { ItemStatus } from '../../../items/domains';
import { generateKey } from './redisCache.utils';

describe('RedisCache utils', () => {
  describe('generateKey', () => {
    it('should be basename:all when keyNames is [all]', () => {
      // Arrange
      const baseKey = 'test:items';
      const keyNames = ['all'];
      const args = [];
      const expected = `test:items:all`;

      // Act
      const actual = generateKey(keyNames, baseKey, args);

      // Assert
      expect(actual).toBe(expected);
    });

    it('should be basename:suffix when keyNames is [itemId, available]', () => {
      // Arrange
      const baseKey = 'test:items';
      const keyNames = ['id', 'status'];
      const args = [1, ItemStatus.Available];
      const expected = `test:items:{id:1,status:${ItemStatus.Available}}`;

      // Act
      const actual = generateKey(keyNames, baseKey, args);

      // Assert
      expect(actual).toBe(expected);
    });
  });
});
