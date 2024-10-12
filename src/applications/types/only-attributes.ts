import { NonFunctionProperties } from './non-function';

export type OnlyAttributes<T> = Pick<T, NonFunctionProperties<T>>;
