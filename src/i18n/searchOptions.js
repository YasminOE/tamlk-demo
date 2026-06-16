export const SEARCH_CITY_OPTIONS = [
  { id: '', labelKey: 'search.anywhere', subKey: 'search.allCities' },
  { id: 'riyadh', labelKey: 'search.riyadh', subKey: 'search.riyadhSub' },
  { id: 'jeddah', labelKey: 'search.jeddah', subKey: 'search.jeddahSub' },
  { id: 'khobar', labelKey: 'search.khobar', subKey: 'search.khobarSub' },
];

export const SEARCH_BUDGET_OPTIONS = [
  { id: null, labelKey: 'search.anyPrice', subKey: 'search.noBudgetCap' },
  { id: 10000, labelKey: 'search.upTo10k', subKey: 'search.starterTickets' },
  { id: 25000, labelKey: 'search.upTo25k', subKey: 'search.growthEntry' },
  { id: 50000, labelKey: 'search.upTo50k', subKey: 'search.coreAllocation' },
  { id: 100000, labelKey: 'search.upTo100k', subKey: 'search.largerTickets' },
];

export const SEARCH_SHARE_OPTIONS = [
  { id: null, labelKey: 'search.anyShare', subKey: 'search.allCities' },
  { id: 0.25, labelKey: 'search.share025', subKey: 'search.microOwnership' },
  { id: 0.5, labelKey: 'search.share05', subKey: 'search.smallPositions' },
  { id: 1, labelKey: 'search.share1', subKey: 'search.meaningfulStake' },
];

export function getSearchCityLabel(t, cityId) {
  const opt = SEARCH_CITY_OPTIONS.find((c) => c.id === cityId);
  return t(opt?.labelKey || 'search.anywhere');
}

export function getSearchBudgetLabel(t, budgetId) {
  const opt = SEARCH_BUDGET_OPTIONS.find((b) => b.id === budgetId);
  return t(opt?.labelKey || 'search.anyPrice');
}
