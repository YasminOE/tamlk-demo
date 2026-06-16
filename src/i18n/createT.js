export function createT(locale, dictionaries) {
  const dict = dictionaries[locale] || dictionaries.en;

  return function t(key, vars = {}) {
    const value = key.split('.').reduce((acc, part) => acc?.[part], dict);
    if (typeof value !== 'string') return key;
    return value.replace(/\{(\w+)\}/g, (_, name) => (vars[name] != null ? String(vars[name]) : `{${name}}`));
  };
}
