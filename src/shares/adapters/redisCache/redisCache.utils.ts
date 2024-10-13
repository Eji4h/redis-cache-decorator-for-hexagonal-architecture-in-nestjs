export function generateKey(
  keyNames: string[],
  baseKey: string,
  args: unknown[],
) {
  const isAllArgsUndefined = args.every((arg) => arg === undefined);
  return isAllArgsUndefined
    ? `${baseKey}:all`
    : generateSuffixKey(baseKey, keyNames, args);
}

function generateSuffixKey(
  baseKey: string,
  keyNames: string[],
  args: unknown[],
) {
  const suffixKey = keyNames
    .reduce((acc, name, i) => `${acc}${name}:${args[i]},`, '')
    .slice(0, -1);
  const key = `${baseKey}:{${suffixKey}}`;
  console.debug(`[Cache] generated suffix key: ${key}`);

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
