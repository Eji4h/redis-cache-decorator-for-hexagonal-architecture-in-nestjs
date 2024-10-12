import { NonFunctionProperties } from './nonFunction';

export type OnlyAttributes<T> = Pick<T, NonFunctionProperties<T>>;
