import { first } from 'radash';

export function generateKey(
  keyNames: string[],
  baseKey: string,
  args: unknown[],
) {
  return first(keyNames) === 'all'
    ? `${baseKey}:all`
    : generateSuffixKey(baseKey, keyNames, args);
}

function generateSuffixKey(
  baseKey: string,
  keyNames: string[],
  args: unknown[],
) {
  const suffixKey = keyNames
    .reduce((acc, name, i) => {
      const currentArg = args[i];
      const appendValueOfKey = Array.isArray(currentArg)
        ? `[${currentArg}]`
        : currentArg;
      return `${acc}${name}:${appendValueOfKey},`;
    }, '')
    .slice(0, -1);

  const key = `${baseKey}:{${suffixKey}}`;
  return key;
}

export const mapDomainToModel = <Domain, Model>(
  domain: Domain & { id?: string },
) => {
  return {
    ...domain,
    _id: domain.id ?? undefined,
  } as Model;
};
