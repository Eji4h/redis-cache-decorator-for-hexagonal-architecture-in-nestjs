import { match } from 'ts-pattern';

export const booleanParser = (value: string) => {
  return match(value)
    .with('true', () => true)
    .with('false', () => false)
    .otherwise(() => undefined);
};
