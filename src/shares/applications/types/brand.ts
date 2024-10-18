export type Brand<Type, Key extends string> = { readonly __brand: Key } & Type;
