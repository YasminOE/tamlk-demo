import { createContext, useContext, useMemo } from 'react';
import { common } from './chunks/common';
import { buyer } from './chunks/buyer';
import { investor } from './chunks/investor';
import { admin } from './chunks/admin';

const dictionaries = {
  en: { ...common.en, buyer: buyer.en, investor: investor.en, admin: admin.en },
  ar: { ...common.ar, buyer: buyer.ar, investor: investor.ar, admin: admin.ar },
};

function getNested(obj, path) {
  return path.split('.').reduce((acc, key) => (acc == null ? undefined : acc[key]), obj);
}

function interpolate(template, vars = {}) {
  if (!template || typeof template !== 'string') return template ?? '';
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    const val = vars[key];
    return val == null ? '' : String(val);
  });
}

export function createTranslator(locale) {
  const dict = dictionaries[locale] || dictionaries.en;
  return (key, vars) => {
    const value = getNested(dict, key);
    if (value == null) return key;
    return interpolate(value, vars);
  };
}

const LocaleContext = createContext({ locale: 'en', t: createTranslator('en') });

export function LocaleProvider({ locale, children }) {
  const value = useMemo(
    () => ({ locale, t: createTranslator(locale) }),
    [locale],
  );
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  return useContext(LocaleContext);
}

export function useT() {
  return useContext(LocaleContext).t;
}

export function pickName(locale, { en, ar }) {
  return locale === 'ar' ? ar : en;
}
