import { useState, useEffect, useRef } from 'react';
import { LocaleProvider, useT, useLocale, pickName } from './i18n';
import { getSearchCityLabel, getSearchBudgetLabel, SEARCH_CITY_OPTIONS, SEARCH_BUDGET_OPTIONS, SEARCH_SHARE_OPTIONS } from './i18n/searchOptions';
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, ReferenceLine,
} from 'recharts';
import {
  Home, FileText, CreditCard, Wallet, HeadphonesIcon,
  Briefcase, TrendingUp, ArrowLeftRight,
  Building2, Users, Shield, BarChart3, Check, X, Download,
  ChevronRight, Plus, AlertCircle, Clock, CircleCheck, Trophy, ArrowRight,
  Search, Filter, MapPin, Banknote, Smartphone, Landmark, Lock, Receipt,
  ArrowLeft, Sparkles, ArrowDownToLine, Globe, Menu, ChevronLeft,
  LogOut, User, Settings,
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════════════
// DEMO DATA
// ═══════════════════════════════════════════════════════════════════

const COLORS = {
  teal: '#0D7C7C',
  tealMid: '#0F9A9A',
  tealDark: '#0A6464',
  tealLight: '#E6F4F4',
  sand: '#E8DCC4',
  alert: '#C0504D',
  bg: '#FAF7F2',
  card: '#FFFFFF',
  border: '#E5E0D8',
  success: '#16A34A',
  warning: '#D97706',
  text: '#1A1A1A',
  muted: '#78716C',
  lightGray: '#D6D0C8',
};

const BUYER = {
  name: 'Ahmad Al-Rashidi',
  nameAr: 'أحمد',
  walletBalance: 12400,
};

const PROPERTY_IMAGES = {
  riyadh: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80&auto=format&fit=crop',
  jeddah: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80&auto=format&fit=crop',
  dammam: 'https://images.unsplash.com/photo-1600585154340-be6162a9a0d9?w=800&q=80&auto=format&fit=crop',
  'riyadh-heights': 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80&auto=format&fit=crop',
  'jeddah-corniche': 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80&auto=format&fit=crop',
  'khobar-waterfront': 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80&auto=format&fit=crop',
  'riyadh-hills': 'https://images.unsplash.com/photo-1600585154340-be6162a9a0d9?w=800&q=80&auto=format&fit=crop',
};

const getPropertyImage = (id, name) => PROPERTY_IMAGES[id] || (name?.includes('Riyadh') ? PROPERTY_IMAGES.riyadh : name?.includes('Jeddah') ? PROPERTY_IMAGES.jeddah : null);

// PRD 5.5 — buyer can hold multiple active contracts simultaneously
const BUYER_CONTRACTS = [
  {
    id: 'riyadh',
    name: 'Riyadh Heights — Villa 12',
    imageUrl: PROPERTY_IMAGES.riyadh,
    location: 'Al Nakheel District, Riyadh',
    type: 'Villa', beds: 4, baths: 3, sqm: 320,
    totalValue: 1850000,
    tamlkOwnership: 20,
    ownership: 23.4,
    monthlyPayment: 8200,
    rentComponent: 5740,
    buyoutComponent: 2460,
    contractStart: 'February 2025',
    contractMonths: 240,
    contractId: 'TML-2025-00847',
    nextPaymentDue: '15 July 2025',
    daysUntilDue: 15,
    paymentsMade: 4,
    nextMilestone: '25% — Est. August 2025',
    status: 'active',
    ejar: {
      verified: true,
      occupantName: 'Ahmad Al-Rashidi',
      leaseStart: '1 Feb 2025',
      leaseEnd: '1 Jan 2045',
      usageRentAmount: 5740,
      ejarRef: 'EJ-2025-44821',
    },
  },
  {
    id: 'jeddah',
    name: 'Jeddah Corniche — Apt 5B',
    imageUrl: PROPERTY_IMAGES.jeddah,
    location: 'Corniche Road, Jeddah',
    type: 'Apartment', beds: 3, baths: 2, sqm: 180,
    totalValue: 1650000,
    tamlkOwnership: 20,
    ownership: 11.2,
    monthlyPayment: 5800,
    rentComponent: 4060,
    buyoutComponent: 1740,
    contractStart: 'October 2024',
    contractMonths: 240,
    contractId: 'TML-2024-00512',
    nextPaymentDue: '15 June 2025',
    daysUntilDue: -12,
    paymentsMade: 8,
    nextMilestone: '15% — Est. December 2025',
    status: 'delinquent',
    ejar: {
      verified: true,
      occupantName: 'Ahmad Al-Rashidi',
      leaseStart: '1 Oct 2024',
      leaseEnd: '1 Sep 2044',
      usageRentAmount: 4060,
      ejarRef: 'EJ-2024-33107',
    },
  },
  {
    id: 'dammam',
    name: 'Dammam Marina — Villa 8',
    imageUrl: PROPERTY_IMAGES.dammam,
    location: 'Marina District, Dammam',
    type: 'Villa', beds: 5, baths: 4, sqm: 380,
    totalValue: 1420000,
    tamlkOwnership: 0,
    ownership: 100,
    monthlyPayment: 0,
    rentComponent: 0,
    buyoutComponent: 0,
    contractStart: 'March 2016',
    contractEnd: 'March 2024',
    contractMonths: 96,
    contractId: 'TML-2016-00231',
    nextPaymentDue: null,
    daysUntilDue: null,
    paymentsMade: 96,
    totalPaid: 892000,
    nextMilestone: null,
    status: 'complete',
    completedDate: 'March 2024',
    investorCount: 28,
    investorsBoughtOut: 28,
    ejar: {
      verified: true,
      occupantName: 'Ahmad Al-Rashidi',
      leaseStart: '1 Mar 2016',
      leaseEnd: '1 Mar 2024',
      usageRentAmount: 0,
      ejarRef: 'EJ-2016-11842',
    },
  },
];

const INVESTMENT_OPPORTUNITIES = [
  {
    id: 'riyadh-heights',
    name: 'Riyadh Heights — Villa 12',
    imageUrl: PROPERTY_IMAGES['riyadh-heights'],
    location: 'Al Nakheel District, Riyadh',
    type: 'Villa',
    beds: 4,
    baths: 3,
    sqm: 320,
    totalValue: 1850000,
    tamlkOwnership: 20,
    buyerOwnership: 23.4,
    buyerName: 'Ahmad Al-Rashidi',
    contractStart: 'February 2025',
    contractMonths: 240,
    investorFunding: 1200000,
    fundingTarget: 1480000,
    investorCount: 47,
    minInvestment: 5000,
    annualReturn: 7.2,
    monthlyPer10k: 60,
    platformFeePct: 2,
    status: 'open',
    featured: true,
    riskNote: null,
    ejar: BUYER_CONTRACTS[0].ejar,
  },
  {
    id: 'khobar-waterfront',
    name: 'Khobar Waterfront — Villa 2',
    imageUrl: PROPERTY_IMAGES['khobar-waterfront'],
    location: 'Corniche, Al Khobar',
    type: 'Villa',
    beds: 4,
    baths: 3,
    sqm: 290,
    totalValue: 1720000,
    tamlkOwnership: 20,
    buyerOwnership: 8.5,
    buyerName: 'Faisal Al-Qahtani',
    contractStart: 'April 2025',
    contractMonths: 240,
    investorFunding: 1064000,
    fundingTarget: 1376000,
    investorCount: 34,
    minInvestment: 5000,
    annualReturn: 7.8,
    monthlyPer10k: 65,
    platformFeePct: 2,
    status: 'open',
    featured: false,
    riskNote: null,
    ejar: {
      verified: true,
      occupantName: 'Faisal Al-Qahtani',
      leaseStart: '1 Apr 2025',
      leaseEnd: '1 Mar 2045',
      usageRentAmount: 4980,
      ejarRef: 'EJ-2025-55201',
    },
  },
  {
    id: 'jeddah-corniche',
    name: 'Jeddah Corniche — Apt 5B',
    imageUrl: PROPERTY_IMAGES['jeddah-corniche'],
    location: 'Corniche Road, Jeddah',
    type: 'Apartment',
    beds: 3,
    baths: 2,
    sqm: 180,
    totalValue: 1650000,
    tamlkOwnership: 20,
    buyerOwnership: 11.2,
    buyerName: 'Ahmad Al-Rashidi',
    contractStart: 'October 2024',
    contractMonths: 240,
    investorFunding: 1320000,
    fundingTarget: 1320000,
    investorCount: 38,
    minInvestment: 5000,
    annualReturn: 7.0,
    monthlyPer10k: 58,
    platformFeePct: 2,
    status: 'full',
    featured: false,
    riskNote: 'Fully funded — buyer payment currently overdue',
    ejar: BUYER_CONTRACTS[1].ejar,
  },
];

const INVESTOR_WALLET_TRANSACTIONS = [
  { date: '1 Jun 2025', desc: 'Distribution — Riyadh Heights', amount: 300, balance: 15200 },
  { date: '1 Jun 2025', desc: 'Distribution — Jeddah Corniche', amount: 180, balance: 14900 },
  { date: '15 May 2025', desc: 'Investment — Riyadh Heights', amount: -50000, balance: 14720 },
  { date: '1 May 2025', desc: 'Distribution — Riyadh Heights', amount: 300, balance: 64720 },
  { date: '10 Apr 2025', desc: 'Top Up — Bank Transfer', amount: 60000, balance: 64420 },
  { date: '1 Apr 2025', desc: 'Distribution — Jeddah Corniche', amount: 180, balance: 4420 },
];

const TOPUP_METHODS = [
  { id: 'card', labelKey: 'methods.card', subKey: 'methods.cardSub', icon: CreditCard },
  { id: 'apple', labelKey: 'methods.apple', subKey: 'methods.appleSub', icon: Smartphone },
  { id: 'bank', labelKey: 'methods.bank', subKey: 'methods.bankSub', icon: Landmark },
];

const WITHDRAW_METHODS = [
  { id: 'bank', labelKey: 'methods.bank', subKey: 'methods.bankWithdrawSub', icon: Landmark },
  { id: 'card', labelKey: 'methods.card', subKey: 'methods.cardWithdrawSub', icon: CreditCard },
];

const isListableOpportunity = (o) => Boolean(o.buyerName);

const INVESTOR = {
  name: 'Sara Al-Otaibi',
  nameAr: 'سارة',
  riyadhInvestment: 50000,
  riyadhShare: 2.7,
  monthlyDistribution: 300,
  totalReceived: 1200,
  nextDistribution: '1 July 2025',
  totalInvested: 80000,
  totalMonthlyIncome: 480,
  portfolio: [
    {
      name: 'Riyadh Heights — Villa 12',
      invested: 50000,
      share: 2.7,
      monthly: 300,
      received: 1200,
      value: 1850000,
      status: 'Active',
    },
    {
      name: 'Jeddah Corniche — Apt 5B',
      invested: 30000,
      share: 1.8,
      monthly: 180,
      received: 720,
      value: 1650000,
      status: 'Active',
    },
    {
      name: 'Dammam Marina — Villa 8',
      invested: 35000,
      share: 0,
      shareAtStart: 2.5,
      monthly: 0,
      received: 48200,
      distributionsReceived: 13200,
      buyoutReceived: 35000,
      value: 1420000,
      status: 'Complete',
      completedDate: 'March 2024',
      returnPct: 37.7,
    },
    {
      name: 'Khobar Waterfront — Villa 2',
      invested: 25000,
      share: 0,
      shareAtStart: 1.5,
      monthly: 0,
      received: 31200,
      distributionsReceived: 6200,
      buyoutReceived: 25000,
      value: 1720000,
      status: 'Complete',
      completedDate: 'January 2025',
      returnPct: 24.8,
    },
  ],
};

const BUYOUT_COMPLETE_CHART = [
  { phase: '2016', distributions: 2400, buyout: 0 },
  { phase: '2018', distributions: 7200, buyout: 0 },
  { phase: '2020', distributions: 12000, buyout: 0 },
  { phase: '2022', distributions: 13200, buyout: 0 },
  { phase: '2024', distributions: 13200, buyout: 48200 },
];

const OWNERSHIP_GROWTH = [
  { month: 1, actual: 20.0, projected: 20.0 },
  { month: 2, actual: 20.6, projected: 20.6 },
  { month: 3, actual: 21.2, projected: 21.2 },
  { month: 4, actual: 23.4, projected: 23.4 },
  { month: 5, actual: null, projected: 24.0 },
  { month: 6, actual: null, projected: 24.6 },
  { month: 7, actual: null, projected: 25.2 },
  { month: 8, actual: null, projected: 25.8 },
  { month: 9, actual: null, projected: 26.2 },
  { month: 10, actual: null, projected: 26.6 },
  { month: 11, actual: null, projected: 26.8 },
  { month: 12, actual: null, projected: 27.0 },
];

const RECENT_PAYMENTS = [
  { month: 'Jun 2025', total: 8200, rent: 5740, buyout: 2460, ownership: 23.4 },
  { month: 'May 2025', total: 8200, rent: 5756, buyout: 2444, ownership: 22.8 },
  { month: 'Apr 2025', total: 8200, rent: 5772, buyout: 2428, ownership: 22.2 },
  { month: 'Mar 2025', total: 8200, rent: 5788, buyout: 2412, ownership: 21.6 },
];

const CONTRACT_MONTHS = Array.from({ length: 12 }, (_, i) => {
  const month = i + 1;
  const rent = Math.round(5800 - i * 12);
  const buyout = 8200 - rent;
  const startOwn = 20 + i * 0.6;
  const endOwn = startOwn + 0.6;
  const months = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'];
  const year = month <= 11 ? 2025 : 2026;
  const label = month === 12 ? `12 (${months[11]} ${year})` : `${month} (${months[month - 1]} ${year})`;
  return {
    month: label,
    payment: 8200,
    rent,
    buyout,
    cumulative: `${startOwn.toFixed(1)}% → ${endOwn.toFixed(1)}%`,
    remaining: `${(100 - endOwn).toFixed(1)}%`,
    status: month <= 4 ? 'paid' : month === 5 ? 'upcoming' : 'future',
  };
});

const WALLET_TRANSACTIONS = [
  { date: '15 Jun 2025', desc: 'Monthly Payment — Riyadh Heights', amount: -8200, balance: 12400 },
  { date: '10 Jun 2025', desc: 'Top Up — Bank Transfer', amount: 20000, balance: 20600 },
  { date: '15 May 2025', desc: 'Monthly Payment — Riyadh Heights', amount: -8200, balance: 600 },
  { date: '15 May 2025', desc: 'Monthly Payment — Jeddah Corniche', amount: -5800, balance: 8800 },
  { date: '08 May 2025', desc: 'Top Up — Credit Card', amount: 8600, balance: 14600 },
  { date: '15 Apr 2025', desc: 'Monthly Payment — Jeddah Corniche', amount: -5800, balance: 6000 },
];

const PORTFOLIO_PERFORMANCE = [
  { month: 'Feb', total: 0 },
  { month: 'Mar', total: 240 },
  { month: 'Apr', total: 480 },
  { month: 'May', total: 720 },
  { month: 'Jun', total: 960 },
  { month: 'Jul', total: 1200 },
];

const DISTRIBUTIONS = [
  { date: '1 Jun 2025', property: 'Riyadh Heights', amount: 300, share: 2.7, status: 'Paid' },
  { date: '1 Jun 2025', property: 'Jeddah Corniche', amount: 180, share: 1.8, status: 'Paid' },
  { date: '1 May 2025', property: 'Riyadh Heights', amount: 300, share: 2.7, status: 'Paid' },
  { date: '1 May 2025', property: 'Jeddah Corniche', amount: 180, share: 1.8, status: 'Paid' },
  { date: '1 Apr 2025', property: 'Riyadh Heights', amount: 300, share: 2.7, status: 'Paid' },
  { date: '1 Apr 2025', property: 'Jeddah Corniche', amount: 180, share: 1.8, status: 'Paid' },
];

const MONTHLY_DISTRIBUTIONS = [
  { month: 'Feb', total: 480 },
  { month: 'Mar', total: 480 },
  { month: 'Apr', total: 480 },
  { month: 'May', total: 480 },
  { month: 'Jun', total: 480 },
  { month: 'Jul', total: 300, projected: true },
];

const ADMIN_MONTHLY_PLATFORM = [
  { month: 'Feb', total: 14480 },
  { month: 'Mar', total: 14520 },
  { month: 'Apr', total: 14620 },
  { month: 'May', total: 14720 },
  { month: 'Jun', total: 14760 },
  { month: 'Jul', total: 8900, projected: true },
];

const ADMIN_DISTRIBUTION_RUNS = [
  { id: 1, date: '1 Jun 2025', time: '09:02 AM', amount: 14760, investors: 85, properties: 2, status: 'completed', trigger: 'auto' },
  { id: 2, date: '1 May 2025', time: '09:01 AM', amount: 14720, investors: 84, properties: 2, status: 'completed', trigger: 'auto' },
  { id: 3, date: '1 Apr 2025', time: '09:03 AM', amount: 14620, investors: 82, properties: 2, status: 'completed', trigger: 'auto' },
  { id: 4, date: '1 Mar 2025', time: '09:00 AM', amount: 14520, investors: 80, properties: 2, status: 'completed', trigger: 'auto' },
];

const getAdminPropertyDistributions = (properties, buyerContracts) => {
  const platformPayouts = {
    'Riyadh Heights — Villa 12': 8900,
    'Jeddah Corniche — Apt 5B': 5860,
  };

  return properties
    .filter((p) => p.buyer)
    .map((prop) => {
      const contract = buyerContracts.find((c) => c.name === prop.name);
      const isDelinquent = contract?.status === 'delinquent';
      const ejarRent = contract?.ejar?.usageRentAmount ?? 0;
      const investorPool = Math.round((100 - (prop.buyerOwn ?? 0)) * 10) / 10;
      const poolAmount = platformPayouts[prop.name] ?? Math.round(ejarRent * (investorPool / 100));
      return {
        property: prop.name,
        buyer: prop.buyer,
        investors: prop.investors,
        ejarRent,
        investorPool,
        poolAmount,
        julyAmount: isDelinquent ? 0 : poolAmount,
        status: isDelinquent ? 'Paused' : 'Scheduled',
        daysOverdue: isDelinquent ? Math.abs(contract.daysUntilDue) : null,
        ejarRef: contract?.ejar?.ejarRef,
      };
    });
};

const getInvestorDelinquencyImpact = (buyerContracts) => {
  const contract = buyerContracts.find((c) => c.status === 'delinquent');
  if (!contract) return null;
  const position = INVESTOR.portfolio.find(
    (p) => p.status === 'Active' && p.name.includes('Jeddah'),
  );
  if (!position) return null;

  const daysOverdue = Math.abs(contract.daysUntilDue);
  const pausedMonthly = position.monthly;
  const normalMonthly = INVESTOR.totalMonthlyIncome;
  const activeMonthly = normalMonthly - pausedMonthly;

  return {
    property: contract.name,
    buyerName: contract.ejar?.occupantName || BUYER.name,
    contractId: contract.contractId,
    daysOverdue,
    dueDate: contract.nextPaymentDue,
    pausedMonthly,
    share: position.share,
    invested: position.invested,
    normalMonthly,
    activeMonthly,
    missedCycles: 1,
    estimatedMissed: pausedMonthly,
    upcoming: [
      { date: '1 July 2025', property: 'Riyadh Heights — Villa 12', amount: 300, share: 2.7, status: 'Scheduled' },
      {
        date: '1 July 2025',
        property: contract.name,
        amount: pausedMonthly,
        share: position.share,
        status: 'Paused',
        reason: `Buyer payment ${daysOverdue} days overdue`,
      },
    ],
  };
};

const SECONDARY_LISTINGS = [
  { property: 'Riyadh Heights Villa 12', share: '1.0%', price: 18500, income: 111 },
  { property: 'Jeddah Corniche Apt 5B', share: '0.5%', price: 8000, income: 54 },
  { property: 'Riyadh Hills — Apt 3A', share: '2.0%', price: 35000, income: 210 },
];

const ADMIN_PROPERTIES = [
  { name: 'Riyadh Heights — Villa 12', value: 1850000, funded: 81, investors: 47, buyerOwn: 23.4, buyer: 'Ahmad Al-Rashidi', status: 'Active' },
  { name: 'Jeddah Corniche — Apt 5B', value: 1650000, funded: 100, investors: 38, buyerOwn: 11.2, buyer: 'Ahmad Al-Rashidi', status: 'Delinquent' },
  { name: 'Riyadh Hills — Apt 3A', value: 2100000, funded: 45, investors: 21, buyerOwn: null, buyer: null, status: 'Funding' },
];

const KYC_QUEUE = [
  { id: 1, user: 'Mohammed Al-Harbi', type: 'Home Buyer', idType: 'nationalId', submitted: '10 Jun 2025', docs: 'Nafath verified ✓' },
  { id: 2, user: 'Priya Sharma', type: 'Investor', idType: 'iqama', submitted: '11 Jun 2025', docs: 'Nafath verified ✓' },
  { id: 3, user: 'Khalid Al-Dosari', type: 'Home Buyer', idType: 'nationalId', submitted: '12 Jun 2025', docs: 'Nafath verified ✓' },
  { id: 4, user: 'James Chen', type: 'Investor', idType: 'iqama', submitted: '13 Jun 2025', docs: 'Nafath verified ✓' },
];

// ═══════════════════════════════════════════════════════════════════
// UTILITIES
// ═══════════════════════════════════════════════════════════════════

const fmt = (n) => `SAR ${n.toLocaleString('en-US')}`;
const fmtPct = (n) => `${n}%`;

const getBuyerPortfolio = (contracts) => {
  const payable = contracts.filter((c) => c.status !== 'complete');
  const completed = contracts.filter((c) => c.status === 'complete');
  return {
    activeCount: payable.filter((c) => c.status !== 'terminated').length,
    completedCount: completed.length,
    totalOwnershipValue: contracts.reduce((s, c) => s + (c.ownership / 100) * c.totalValue, 0),
    nextPayment: payable.filter((c) => c.status === 'active').sort((a, b) => a.daysUntilDue - b.daysUntilDue)[0],
    delinquentCount: payable.filter((c) => c.status === 'delinquent').length,
    combinedMonthly: payable.filter((c) => c.status === 'active' || c.status === 'delinquent').reduce((s, c) => s + c.monthlyPayment, 0),
    payable,
    completed,
  };
};

// ═══════════════════════════════════════════════════════════════════
// SHARED COMPONENTS
// ═══════════════════════════════════════════════════════════════════

function TamlkLogo({ size = 'md', light = false, onClick }) {
  const t = useT();
  const { locale } = useLocale();
  const sizes = { sm: 28, md: 36, lg: 44 };
  const s = sizes[size] || sizes.md;
  const textColor = light ? 'text-white' : 'text-[#0D7C7C]';
  const content = (
    <>
      <div className="relative flex-shrink-0" style={{ width: s, height: s }}>
        <div
          className="absolute inset-0 rounded-full bg-[#0D7C7C]"
          style={{ width: s * 0.85, height: s * 0.85 }}
        />
        <div
          className="absolute rounded-full bg-[#E8DCC4]"
          style={{ width: s * 0.45, height: s * 0.45, right: 0, bottom: 0 }}
        />
      </div>
      <div className="leading-tight text-start">
        <span className={`block text-lg font-bold tracking-tight ${textColor}`}>
          {locale === 'ar' ? t('brand.wordmarkAr') : t('brand.wordmark')}
        </span>
      </div>
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="flex items-center gap-2.5 rounded-lg hover:opacity-90 transition-opacity"
        aria-label="Home overview"
      >
        {content}
      </button>
    );
  }

  return <div className="flex items-center gap-2.5">{content}</div>;
}

function PageHeader({ title, subtitle, children }) {
  return (
    <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
      <div>
        <h1 className="text-[26px] font-semibold text-[#1A1A1A] tracking-tight">{title}</h1>
        {subtitle && <p className="text-[#78716C] mt-1 text-sm">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

function WalletBalanceCard({ balance, pending = 0, onTopUp, onWithdraw, subtitle }) {
  const t = useT();
  return (
    <div className="bg-white rounded-2xl border border-[#E5E0D8] p-8 shadow-sm">
      <p className="text-sm text-[#78716C]">{t('wallet.availableBalance')}</p>
      <p className="text-4xl font-semibold text-[#1A1A1A] mt-1 tracking-tight">{fmt(balance)}</p>
      {pending > 0 && <p className="text-sm text-[#78716C] mt-1">{t('wallet.pending', { amount: fmt(pending) })}</p>}
      {subtitle && <p className="text-sm text-[#78716C] mt-2">{subtitle}</p>}
      <div className="flex flex-wrap gap-3 mt-6">
        <button
          type="button"
          onClick={onTopUp}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0D7C7C] text-white rounded-full text-sm font-semibold hover:bg-[#0F9A9A] transition-colors"
        >
          <Plus size={16} /> {t('wallet.addFunds')}
        </button>
        <button
          type="button"
          onClick={onWithdraw}
          disabled={balance <= 0}
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#1A1A1A] text-[#1A1A1A] rounded-full text-sm font-semibold hover:bg-[#FAF7F2] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ArrowDownToLine size={16} /> {t('wallet.withdraw')}
        </button>
      </div>
    </div>
  );
}

function SectionCard({ title, children, className = '' }) {
  return (
    <div className={`tamlk-card overflow-hidden ${className}`}>
      {title && (
        <div className="px-6 py-4 border-b border-[#E5E0D8] bg-[#FAF7F2]/50">
          <h2 className="tamlk-section-title">{title}</h2>
        </div>
      )}
      <div className={title ? 'p-6' : ''}>{children}</div>
    </div>
  );
}

function Skeleton({ className = '' }) {
  return <div className={`animate-pulse bg-[#E5E0D8] rounded-lg ${className}`} />;
}

function LoadingSkeleton() {
  return (
    <div className="p-6 space-y-4">
      <Skeleton className="h-8 w-64" />
      <div className="grid grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-28" />)}
      </div>
      <Skeleton className="h-64" />
      <Skeleton className="h-48" />
    </div>
  );
}

function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 border border-[#E5E0D8]" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-[#1A1A1A]">{title}</h3>
          <button onClick={onClose} className="text-[#78716C] hover:text-[#1A1A1A] transition-colors">
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function StatCard({ label, value, sub, icon: Icon, accent }) {
  return (
    <div className="relative bg-white rounded-2xl border border-[#E5E0D8] p-5 hover:shadow-tamlk-sm transition-all duration-300 overflow-hidden group">
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#0D7C7C] rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-[#78716C] mb-1.5 leading-snug">{label}</p>
          <p className="text-2xl font-bold text-[#0D7C7C] tracking-tight">{value}</p>
          {sub && <p className="text-xs text-[#78716C] mt-1.5">{sub}</p>}
        </div>
        {Icon && (
          <div className={`p-2.5 rounded-xl ${accent || 'bg-[#E6F4F4]'}`}>
            <Icon size={20} className="text-[#0D7C7C]" />
          </div>
        )}
      </div>
    </div>
  );
}

function BilingualLabel({ ar, en }) {
  const { locale } = useLocale();
  return <span>{locale === 'ar' ? ar : en}</span>;
}

function OwnershipArc({ percent }) {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const offset = circ - (percent / 100) * circ;
  return (
    <svg width="64" height="64" className="inline-block">
      <circle cx="32" cy="32" r={r} fill="none" stroke="#E5E0D8" strokeWidth="6" />
      <circle
        cx="32" cy="32" r={r} fill="none" stroke="#0D7C7C" strokeWidth="6"
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round" transform="rotate(-90 32 32)"
      />
      <text x="32" y="36" textAnchor="middle" className="text-xs font-bold" fill="#0D7C7C">{percent}%</text>
    </svg>
  );
}

function PropertyPlaceholder({ name, imageUrl, className = 'h-48', showTitle = true, overlay = true }) {
  const [imgFailed, setImgFailed] = useState(false);
  const src = !imgFailed ? (imageUrl || getPropertyImage(null, name)) : null;

  if (src) {
    return (
      <div className={`${className} rounded-xl relative overflow-hidden bg-[#E5E0D8]`}>
        <img
          src={src}
          alt={name || 'Property'}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={() => setImgFailed(true)}
        />
        {overlay && <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-black/5" />}
        {showTitle && name && (
          <h3 className="absolute bottom-4 left-4 right-4 text-white text-xl font-bold z-10 drop-shadow-md">{name}</h3>
        )}
      </div>
    );
  }

  return (
    <div className={`${className} rounded-xl bg-gradient-to-br from-[#0D7C7C] via-[#0F9A9A] to-[#E8DCC4] flex items-end p-6 relative overflow-hidden`}>
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.3) 0%, transparent 50%)',
      }} />
      {showTitle && name && <h3 className="text-white text-xl font-bold relative z-10 drop-shadow-sm">{name}</h3>}
    </div>
  );
}

function ShariaBadge({ light = false }) {
  const t = useT();
  if (light) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium border border-white/30">
        <Check size={14} /> {t('sharia.certified')}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-50 text-[#16A34A] text-sm font-medium border border-green-200">
      <Check size={14} /> {t('sharia.certified')}
    </span>
  );
}

function EjarBadge() {
  const t = useT();
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#E6F4F4] text-[#0F9A9A] text-xs font-medium border border-[#0D7C7C]/20">
      <Shield size={12} /> {t('ejar.verified')}
    </span>
  );
}

function ContractStatusBadge({ status }) {
  const t = useT();
  const styles = {
    active: 'bg-green-50 text-[#16A34A] border-green-200',
    delinquent: 'bg-red-50 text-[#C0504D] border-red-200',
    complete: 'bg-amber-50 text-amber-700 border-amber-200',
    terminated: 'bg-gray-50 text-[#78716C] border-gray-200',
  };
  const labels = {
    active: t('status.active'),
    delinquent: t('status.delinquent'),
    complete: t('status.complete'),
    terminated: t('status.terminated'),
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${styles[status] || styles.active}`}>
      {labels[status] || status}
    </span>
  );
}

function EjarOccupancyPanel({ ejar, buyerName }) {
  const t = useT();
  return (
    <div className="bg-white rounded-xl border border-[#E5E0D8] p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-[#0F9A9A]">{t('buyer.ejar.title')}</h2>
        {ejar.verified && <EjarBadge />}
      </div>
      <p className="text-xs text-[#78716C] mb-4">{t('buyer.ejar.explainer')}</p>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div><span className="text-[#78716C]">{t('buyer.ejar.occupant')}</span><p className="font-medium">{ejar.occupantName}</p></div>
        <div><span className="text-[#78716C]">{t('buyer.ejar.homeBuyer')}</span><p className="font-medium">{buyerName}</p></div>
        <div><span className="text-[#78716C]">{t('buyer.ejar.leaseStart')}</span><p className="font-medium">{ejar.leaseStart}</p></div>
        <div><span className="text-[#78716C]">{t('buyer.ejar.leaseEnd')}</span><p className="font-medium">{ejar.leaseEnd}</p></div>
        <div><span className="text-[#78716C]">{t('buyer.ejar.monthlyRent')}</span><p className="font-medium text-[#0D7C7C]">{fmt(ejar.usageRentAmount)}{t('buyer.ejar.perMonth')}</p></div>
        <div><span className="text-[#78716C]">{t('buyer.ejar.ejarRef')}</span><p className="font-mono text-xs">{ejar.ejarRef}</p></div>
      </div>
    </div>
  );
}

function ContractSelector({ contracts, activeId, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2">
      {contracts.map((c) => (
        <button
          key={c.id}
          onClick={() => onSelect(c.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeId === c.id
              ? c.status === 'complete'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-[#0D7C7C] text-white shadow-sm'
              : c.status === 'complete'
                ? 'bg-amber-50 text-amber-800 border border-amber-200 hover:border-amber-400'
                : 'bg-white text-[#78716C] border border-[#E5E0D8] hover:border-[#0D7C7C] hover:shadow-sm'
          }`}
        >
          {c.name} {c.status === 'delinquent' && '⚠️'}{c.status === 'complete' && ' 🏆'}
        </button>
      ))}
    </div>
  );
}

function PaymentBreakdownExplainer({ contract, ownership }) {
  const t = useT();
  const unownedPct = (100 - ownership).toFixed(1);
  return (
    <div className="bg-[#FAF7F2] rounded-xl border border-[#E5E0D8] p-5 space-y-4">
      <p className="text-sm font-medium text-[#1A1A1A]">{t('buyer.paymentBreakdown.title')}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="bg-white rounded-lg p-4 border-l-4 border-[#0F9A9A]">
          <p className="text-xs text-[#78716C] mb-1">{t('buyer.paymentBreakdown.rentTitle')}</p>
          <p className="text-xl font-bold text-[#0F9A9A]">{fmt(contract.rentComponent)}</p>
          <p className="text-xs text-[#78716C] mt-2 leading-relaxed">
            {t('buyer.paymentBreakdown.rentExplainer', { owned: ownership, unowned: unownedPct })}
          </p>
        </div>
        <div className="bg-white rounded-lg p-4 border-l-4 border-[#0D7C7C]">
          <p className="text-xs text-[#78716C] mb-1">{t('buyer.paymentBreakdown.buyoutTitle')}</p>
          <p className="text-xl font-bold text-[#0D7C7C]">{fmt(contract.buyoutComponent)}</p>
          <p className="text-xs text-[#78716C] mt-2 leading-relaxed">{t('buyer.paymentBreakdown.buyoutExplainer')}</p>
        </div>
      </div>
    </div>
  );
}

function PaymentReminderBanner({ contract, ownership }) {
  const t = useT();
  const dayWord = contract.daysUntilDue === 1 ? t('buyer.reminder.day') : t('buyer.reminder.days');

  if (contract.status === 'delinquent') {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-5 flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
          <AlertCircle size={20} className="text-[#C0504D]" />
        </div>
        <div>
          <p className="font-semibold text-[#C0504D] text-lg">
            {t('buyer.reminder.overdueTitle', { days: Math.abs(contract.daysUntilDue) })}
          </p>
          <p className="text-sm text-[#1A1A1A] mt-2">
            {t('buyer.reminder.overdueAmount', { amount: fmt(contract.monthlyPayment), name: contract.name, date: contract.nextPaymentDue })}
          </p>
          <ul className="text-sm text-[#78716C] mt-3 space-y-1.5 list-disc list-inside">
            <li>{t('buyer.reminder.frozen', { pct: ownership })}</li>
            <li>{t('buyer.reminder.noBuyout')}</li>
            <li>{t('buyer.reminder.payNowStanding')}</li>
          </ul>
        </div>
      </div>
    );
  }
  if (contract.daysUntilDue <= 7) {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3">
        <Clock size={20} className="text-[#D97706]" />
        <span className="text-sm font-medium text-[#D97706]">
          {t('buyer.reminder.dueSoon', {
            amount: fmt(contract.monthlyPayment),
            days: `${contract.daysUntilDue} ${dayWord}`,
            date: contract.nextPaymentDue,
          })}
        </span>
      </div>
    );
  }
  return null;
}

// ═══════════════════════════════════════════════════════════════════
// BUYER VIEW
// ═══════════════════════════════════════════════════════════════════

function BuyerInlineAlert({ contract, ownership, onPay, onViewContract, embedded = false }) {
  const t = useT();
  const wrap = embedded
    ? 'border-b border-[#E5E0D8]'
    : 'rounded-xl border border-[#E5E0D8] bg-white shadow-sm mb-4';

  if (contract.status === 'delinquent') {
    return (
      <div className={`${wrap} bg-[#FFF8F8]`} role="alert">
        <div className="flex items-center gap-3 px-4 py-3 sm:px-6 sm:py-3.5">
          <span className="hidden sm:flex w-8 h-8 rounded-full bg-[#C0504D]/10 items-center justify-center flex-shrink-0">
            <AlertCircle size={16} className="text-[#C0504D]" />
          </span>
          <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center sm:gap-2">
            <p className="text-sm font-semibold text-[#1A1A1A] truncate">
              <span className="text-[#C0504D]">{t('buyer.alert.daysOverdue', { days: Math.abs(contract.daysUntilDue) })}</span>
              <span className="text-[#78716C] font-normal hidden sm:inline"> · </span>
              <span className="text-[#78716C] font-normal sm:hidden block text-xs mt-0.5 truncate">
                {fmt(contract.monthlyPayment)} · {contract.name}
              </span>
              <span className="text-[#78716C] font-normal hidden sm:inline">
                {fmt(contract.monthlyPayment)} · {contract.name} · {t('buyer.alert.ownershipFrozen', { pct: ownership })}
              </span>
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              type="button"
              onClick={onViewContract}
              className="hidden sm:inline text-xs font-medium text-[#78716C] hover:text-[#1A1A1A] underline-offset-2 hover:underline"
            >
              {t('actions.details')}
            </button>
            <button
              type="button"
              onClick={onPay}
              className="px-3.5 py-1.5 sm:px-4 sm:py-2 bg-[#C0504D] text-white rounded-full text-xs sm:text-sm font-semibold hover:bg-red-700 transition-colors whitespace-nowrap"
            >
              {t('buyer.alert.payNow')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (contract.daysUntilDue != null && contract.daysUntilDue <= 7 && contract.status === 'active') {
    return (
      <div className={`${wrap} bg-amber-50/60`} role="status">
        <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <p className="text-sm text-[#1A1A1A] truncate">
            <Clock size={14} className="inline mr-1.5 text-[#D97706] -mt-0.5" />
            <span className="font-semibold">{fmt(contract.monthlyPayment)}</span>
            <span className="text-[#78716C]"> {t('buyer.alert.dueSoon', { days: contract.daysUntilDue })} · {contract.name}</span>
          </p>
          <button type="button" onClick={onPay} className="text-xs sm:text-sm font-semibold text-[#0D7C7C] hover:underline flex-shrink-0 whitespace-nowrap">
            {t('actions.pay')} →
          </button>
        </div>
      </div>
    );
  }

  return null;
}

function BuyerPropertyOverviewCard({ contract, ownership, payments, onOpen, onPay }) {
  const t = useT();
  const progress = Math.min(100, (payments / 240) * 100);
  const isDelinquent = contract.status === 'delinquent';
  const isComplete = contract.status === 'complete';

  return (
    <article
      className={`group rounded-2xl border bg-white overflow-hidden transition-all duration-200 hover:shadow-[0_8px_30px_rgba(13,124,124,0.08)] ${
        isDelinquent ? 'border-[#C0504D]/40 ring-1 ring-[#C0504D]/10' :
        isComplete ? 'border-amber-200' : 'border-[#E5E0D8]'
      }`}
    >
      <div className="h-24 relative">
        <PropertyPlaceholder
          name={contract.name}
          imageUrl={contract.imageUrl}
          className="h-24 rounded-none"
          showTitle={false}
        />
        <div className="absolute top-3 right-3">
          <ContractStatusBadge status={contract.status} />
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-[#1A1A1A] leading-snug">{contract.name}</h3>
        <p className="text-xs text-[#78716C] mt-1 truncate">{contract.location}</p>

        <div className="mt-4 flex items-end justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-wide text-[#78716C]">{t('buyer.property.yourOwnership')}</p>
            <p className="text-2xl font-semibold text-[#0D7C7C] tabular-nums">{ownership}%</p>
          </div>
          <div className="text-right">
            <p className="text-[11px] uppercase tracking-wide text-[#78716C]">{t('buyer.property.monthly')}</p>
            <p className="text-sm font-semibold text-[#1A1A1A] tabular-nums">{fmt(contract.monthlyPayment)}</p>
          </div>
        </div>

        {!isComplete && (
          <div className="mt-4">
            <div className="flex justify-between text-[11px] text-[#78716C] mb-1.5">
              <span>{t('buyer.property.paymentProgress')}</span>
              <span>{payments} / 240</span>
            </div>
            <div className="h-1.5 bg-[#E5E0D8] rounded-full overflow-hidden">
              <div className="h-full bg-[#0D7C7C] rounded-full transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

        <div className="mt-5 flex gap-2">
          <button
            type="button"
            onClick={onOpen}
            className="flex-1 py-2 text-sm font-medium rounded-xl border border-[#E5E0D8] text-[#1A1A1A] hover:border-[#0D7C7C] hover:text-[#0D7C7C] transition-colors"
          >
            {t('actions.details')}
          </button>
          {!isComplete && (
            <button
              type="button"
              onClick={onPay}
              className={`flex-1 py-2 text-sm font-semibold rounded-xl text-white transition-colors ${
                isDelinquent ? 'bg-[#C0504D] hover:bg-red-700' : 'bg-[#0D7C7C] hover:bg-[#0F9A9A]'
              }`}
            >
              {isDelinquent ? t('actions.payOverdue') : t('actions.pay')}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

function BuyerDashboard({ contracts, ownershipMap, paymentsMap, onSelectContract, onNavigate, walletBalance }) {
  const t = useT();
  const { locale } = useLocale();
  const portfolio = getBuyerPortfolio(contracts);
  const delinquent = contracts.find((c) => c.status === 'delinquent');
  const priorityContract = delinquent || portfolio.nextPayment || contracts[0];
  const [insightId, setInsightId] = useState(priorityContract?.id || contracts[0]?.id);
  const insightContract = contracts.find((c) => c.id === insightId) || contracts[0];
  const insightOwnership = ownershipMap[insightContract.id] ?? insightContract.ownership;

  const openContract = (id) => {
    onSelectContract(id);
    onNavigate('contract');
  };

  const goPay = (id) => {
    onSelectContract(id);
    onNavigate('payment');
  };

  const priorityOwnership = ownershipMap[priorityContract.id] ?? priorityContract.ownership;
  const showAlert = priorityContract.status === 'delinquent'
    || (priorityContract.daysUntilDue != null && priorityContract.daysUntilDue <= 7 && priorityContract.status === 'active');
  const nextPaymentDisplay = delinquent || portfolio.nextPayment;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Overview card — alert embedded at top so welcome stays above the fold */}
      <section className="rounded-2xl bg-white border border-[#E5E0D8] shadow-sm overflow-hidden">
        {showAlert && (
          <BuyerInlineAlert
            embedded
            contract={priorityContract}
            ownership={priorityOwnership}
            onPay={() => goPay(priorityContract.id)}
            onViewContract={() => openContract(priorityContract.id)}
          />
        )}

        <div className="px-6 md:px-8 pt-5 md:pt-6 pb-5 border-b border-[#E5E0D8] bg-[#FAF7F2]/40">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <p className="text-sm text-[#0D7C7C] font-medium">{t('buyer.overview.eyebrow')}</p>
              <h1 className="text-[26px] md:text-[28px] font-semibold text-[#1A1A1A] tracking-tight mt-1">
                {t('buyer.overview.welcome', { name: pickName(locale, { en: 'Ahmad', ar: BUYER.nameAr }) })}
              </h1>
              <p className="text-[#78716C] text-sm mt-1">
                {t('buyer.overview.subtitle', {
                  count: contracts.length,
                  properties: contracts.length === 1 ? t('buyer.overview.property') : t('buyer.overview.properties'),
                })}
              </p>
            </div>
            <ShariaBadge />
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end">
            <div className="lg:col-span-5 pb-2 border-b lg:border-b-0 lg:border-r border-[#E5E0D8] lg:pr-8">
              <p className="text-xs font-medium uppercase tracking-wider text-[#78716C]">{t('buyer.overview.totalOwnership')}</p>
              <p className="text-4xl md:text-[42px] font-semibold text-[#0D7C7C] tracking-tight tabular-nums mt-2">
                {fmt(Math.round(portfolio.totalOwnershipValue))}
              </p>
              <p className="text-sm text-[#78716C] mt-2">
                {t('buyer.overview.activeSummary', { active: portfolio.activeCount, completed: portfolio.completedCount })}
              </p>
            </div>
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                {
                  key: 'next',
                  label: t('buyer.overview.nextPayment'),
                  value: nextPaymentDisplay ? fmt(nextPaymentDisplay.monthlyPayment) : '—',
                  hint: delinquent
                    ? t('buyer.overview.daysOverdue', { days: Math.abs(delinquent.daysUntilDue) })
                    : nextPaymentDisplay
                      ? t('buyer.overview.dueInDays', { days: nextPaymentDisplay.daysUntilDue })
                      : '',
                  warn: !!delinquent,
                },
                {
                  key: 'monthly',
                  label: t('buyer.overview.monthlyTotal'),
                  value: fmt(portfolio.combinedMonthly),
                  hint: t('buyer.overview.allActiveHomes'),
                },
                {
                  key: 'wallet',
                  label: t('buyer.overview.walletBalance'),
                  value: walletBalance != null ? fmt(walletBalance) : '—',
                  hint: t('buyer.overview.availableToPay'),
                },
              ].map((m) => (
                <div key={m.key} className={`rounded-xl border px-4 py-3 ${m.warn ? 'bg-red-50/50 border-[#C0504D]/20' : 'bg-[#FAF7F2] border-[#E5E0D8]/80'}`}>
                  <p className="text-[11px] text-[#78716C] uppercase tracking-wide">{m.label}</p>
                  <p className={`text-lg font-semibold tabular-nums mt-1 ${m.warn ? 'text-[#C0504D]' : 'text-[#1A1A1A]'}`}>{m.value}</p>
                  {m.hint && <p className="text-[11px] text-[#78716C] mt-0.5">{m.hint}</p>}
                </div>
              ))}
              <button
                type="button"
                onClick={() => onNavigate('wallet')}
                className="col-span-2 sm:col-span-1 rounded-xl border border-dashed border-[#0D7C7C]/40 px-4 py-3 text-left hover:bg-[#E6F4F4]/50 transition-colors group"
              >
                <p className="text-[11px] text-[#0D7C7C] font-medium uppercase tracking-wide">{t('buyer.overview.quickAction')}</p>
                <p className="text-sm font-semibold text-[#0D7C7C] mt-1 group-hover:underline">{t('buyer.overview.manageWallet')}</p>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3 — Properties: scannable cards with clear CTAs */}
      <section>
        <div className="flex items-end justify-between gap-4 mb-5">
          <div>
            <h2 className="text-lg font-semibold text-[#1A1A1A]">{t('buyer.overview.yourProperties')}</h2>
            <p className="text-sm text-[#78716C] mt-0.5">{t('buyer.overview.propertiesHint')}</p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('contract')}
            className="text-sm font-medium text-[#0D7C7C] hover:underline flex-shrink-0"
          >
            View all contracts
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {contracts.map((c) => (
            <BuyerPropertyOverviewCard
              key={c.id}
              contract={c}
              ownership={ownershipMap[c.id] ?? c.ownership}
              payments={paymentsMap[c.id] ?? c.paymentsMade}
              onOpen={() => openContract(c.id)}
              onPay={() => goPay(c.id)}
            />
          ))}
        </div>
      </section>

      {/* 4 — Insights: chart + payments with explicit context switching */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-[#1A1A1A]">Ownership & payments</h2>
            <p className="text-sm text-[#78716C]">Trends for the selected property</p>
          </div>
          <ContractSelector contracts={contracts} activeId={insightId} onSelect={setInsightId} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          <SectionCard
            title={`Growth · ${insightContract.name.split('—')[0]?.trim() || insightContract.name}`}
            className="lg:col-span-3"
          >
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-3xl font-semibold text-[#0D7C7C] tabular-nums">{insightOwnership}%</span>
              <span className="text-sm text-[#78716C]">current ownership</span>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={OWNERSHIP_GROWTH.map((d) => ({ ...d, actualLine: d.actual, projectedLine: d.projected }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E0D8" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#78716C' }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 30]} tick={{ fontSize: 11, fill: '#78716C' }} tickFormatter={(v) => `${v}%`} axisLine={false} tickLine={false} width={36} />
                <Tooltip formatter={(v) => `${v}%`} />
                <Area type="monotone" dataKey="actualLine" stroke="#0D7C7C" fill="#0D7C7C" fillOpacity={0.1} strokeWidth={2} connectNulls={false} name="Actual" />
                <Line type="monotone" dataKey="projectedLine" stroke="#0F9A9A" strokeWidth={2} strokeDasharray="6 4" dot={false} name="Projected" />
              </AreaChart>
            </ResponsiveContainer>
          </SectionCard>

          <div className="lg:col-span-2 tamlk-card overflow-hidden flex flex-col">
            <div className="px-5 py-4 border-b border-[#E5E0D8] bg-[#FAF7F2]/50">
              <h3 className="text-sm font-semibold text-[#1A1A1A]">Recent payments</h3>
            </div>
            <ul className="divide-y divide-[#E5E0D8] flex-1">
              {RECENT_PAYMENTS.slice(0, 4).map((p, i) => (
                <li key={i} className="px-5 py-3.5 flex items-center justify-between gap-3 hover:bg-[#FAF7F2]/60 transition-colors">
                  <div>
                    <p className="text-sm font-medium text-[#1A1A1A]">{p.month}</p>
                    <p className="text-xs text-[#78716C]">Rent {fmt(p.rent)} · Buyout {fmt(p.buyout)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold tabular-nums">{fmt(p.total)}</p>
                    <p className="text-xs font-medium text-[#0D7C7C]">{p.ownership}% owned</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="px-5 py-3 border-t border-[#E5E0D8] bg-[#FAF7F2]/30">
              <button type="button" onClick={() => goPay(insightContract.id)} className="text-sm font-semibold text-[#0D7C7C] hover:underline">
                Make next payment →
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function BuyerContractComplete({ contract }) {
  const t = useT();
  const { locale } = useLocale();
  const buyerName = pickName(locale, { en: BUYER.name, ar: BUYER.nameAr });

  return (
    <div className="space-y-6">
      {/* Celebration hero */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#0D7C7C] via-[#0F9A9A] to-[#0D7C7C] p-8 text-white">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-400/10 rounded-full translate-y-1/2 -translate-x-1/4" />
        <div className="relative flex flex-col md:flex-row items-center gap-8">
          <div className="relative">
            <svg width="140" height="140" className="drop-shadow-lg">
              <circle cx="70" cy="70" r="58" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="8" />
              <circle cx="70" cy="70" r="58" fill="none" stroke="#FCD34D" strokeWidth="8"
                strokeDasharray={364} strokeDashoffset={0} strokeLinecap="round" transform="rotate(-90 70 70)" />
              <text x="70" y="65" textAnchor="middle" fill="white" className="text-2xl font-bold">100%</text>
              <text x="70" y="85" textAnchor="middle" fill="rgba(255,255,255,0.7)" className="text-[10px]">{t('buyer.contract.owned')}</text>
            </svg>
            <Trophy size={28} className="absolute -top-1 -right-1 text-amber-300" />
          </div>
          <div className="text-center md:text-left">
            <p className="text-amber-300 text-sm font-semibold uppercase tracking-widest">{t('buyer.contract.congrats')}</p>
            <h2 className="text-3xl font-bold mt-2">{t('buyer.contract.fullyOwn')}</h2>
            <p className="text-white/80 mt-2 max-w-md">{t('buyer.contract.completedOn', { name: contract.name, date: contract.completedDate })}</p>
            <p className="text-sm text-white/60 mt-3">{t('buyer.contract.contractMeta', { id: contract.contractId, payments: contract.paymentsMade })}</p>
          </div>
        </div>
      </div>

      <PropertyPlaceholder name={contract.name} imageUrl={contract.imageUrl} className="h-40" />
      <div className="flex flex-wrap gap-3 text-sm text-[#78716C] items-center">
        <span>{contract.location}</span>
        <span>·</span>
        <span>{contract.type} · {t('buyer.contract.beds', { count: contract.beds })} · {t('buyer.contract.baths', { count: contract.baths })} · {t('buyer.contract.sqm', { count: contract.sqm })}</span>
        <ContractStatusBadge status="complete" />
      </div>

      {/* Final ownership — buyer 100% */}
      <div className="bg-white rounded-xl border border-amber-200 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-[#0F9A9A] mb-4">{t('buyer.contract.finalOwnership')}</h2>
        <div className="h-12 rounded-lg overflow-hidden flex bg-[#FAF7F2]">
          <div className="bg-[#0D7C7C] flex items-center justify-center text-white font-bold w-full">
            {buyerName} — 100%
          </div>
        </div>
        <p className="text-xs text-[#78716C] mt-3">{t('buyer.contract.investorsZero')}</p>
      </div>

      {/* Contract summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: t('buyer.contract.totalPaid'), value: fmt(contract.totalPaid) },
          { label: t('buyer.contract.paymentsMade'), value: contract.paymentsMade },
          { label: t('buyer.contract.contractPeriod'), value: `${contract.contractStart} → ${contract.contractEnd}` },
          { label: t('buyer.contract.propertyValue'), value: fmt(contract.totalValue) },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-[#E5E0D8] p-4">
            <p className="text-xs text-[#78716C]">{s.label}</p>
            <p className="text-lg font-bold text-[#0D7C7C] mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      {/* What happened to investors */}
      <div className="bg-white rounded-xl border border-[#E5E0D8] p-6">
        <h2 className="text-lg font-semibold text-[#0F9A9A] mb-2">{t('buyer.contract.whatHappened')}</h2>
        <p className="text-sm text-[#78716C] mb-6">
          {t('buyer.contract.investorsExplainer', { count: contract.investorCount })}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { step: '1', title: t('buyer.contract.step1Title'), desc: t('buyer.contract.step1Desc'), color: '#0F9A9A' },
            { step: '2', title: t('buyer.contract.step2Title'), desc: t('buyer.contract.step2Desc'), color: '#0D7C7C' },
            { step: '3', title: t('buyer.contract.step3Title'), desc: t('buyer.contract.step3Desc', { count: contract.investorsBoughtOut }), color: '#16A34A' },
          ].map((item) => (
            <div key={item.step} className="relative p-5 rounded-xl bg-[#FAF7F2] border border-[#E5E0D8]">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold mb-3" style={{ backgroundColor: item.color }}>
                {item.step}
              </div>
              <p className="font-semibold text-[#1A1A1A] text-sm">{item.title}</p>
              <p className="text-xs text-[#78716C] mt-2 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[#78716C]">
          <span className="px-3 py-1.5 rounded-lg bg-[#0F9A9A]/10 text-[#0F9A9A] font-medium">{t('buyer.contract.investors')}: 56.6%</span>
          <ArrowRight size={14} className={locale === 'ar' ? 'rotate-180' : ''} />
          <span className="px-3 py-1.5 rounded-lg bg-[#0F9A9A]/10 text-[#0F9A9A] font-medium">28.3%</span>
          <ArrowRight size={14} className={locale === 'ar' ? 'rotate-180' : ''} />
          <span className="px-3 py-1.5 rounded-lg bg-[#0F9A9A]/10 text-[#0F9A9A] font-medium">0%</span>
          <ArrowRight size={14} className={locale === 'ar' ? 'rotate-180' : ''} />
          <span className="px-3 py-1.5 rounded-lg bg-green-50 text-[#16A34A] font-bold">{t('buyer.contract.fullyBoughtOut')}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#0D7C7C] text-white rounded-lg hover:bg-[#0F9A9A] transition-colors">
          <Download size={16} /> {t('buyer.contract.downloadCert')}
        </button>
        <button className="flex items-center gap-2 px-5 py-2.5 border border-[#E5E0D8] rounded-lg hover:bg-[#FAF7F2] transition-colors text-sm">
          <FileText size={16} /> {t('buyer.contract.viewClosed')}
        </button>
      </div>
    </div>
  );
}

function InvestorBuyoutListItem({ position, expanded, onToggle }) {
  const t = useT();
  const { locale } = useLocale();
  return (
    <li className="border-b border-[#E5E0D8] last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        className={`w-full flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-3.5 text-left transition-colors ${
          expanded ? 'bg-amber-50/40' : 'hover:bg-[#FAF7F2]/80'
        }`}
      >
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden flex-shrink-0 bg-[#E5E0D8]">
          <PropertyPlaceholder
            name={position.name}
            imageUrl={getPropertyImage(null, position.name)}
            className="w-full h-full rounded-none"
            showTitle={false}
            overlay={false}
          />
        </div>

        <div className="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-[1fr_auto_auto] sm:items-center gap-1 sm:gap-4">
          <div className="min-w-0">
            <p className="font-medium text-[#1A1A1A] truncate text-sm sm:text-base">{position.name}</p>
            <p className="text-xs text-[#78716C] mt-0.5">{t('investor.portfolio.closed', { date: position.completedDate })}</p>
          </div>
          <span className="hidden sm:inline text-xs font-semibold text-[#16A34A] bg-green-50 border border-green-200 px-2 py-1 rounded-full tabular-nums">
            +{position.returnPct}%
          </span>
          <p className="text-sm font-semibold text-[#1A1A1A] tabular-nums sm:text-right">
            {fmt(position.received)}
            <span className="sm:hidden text-xs font-normal text-[#16A34A] ml-2">+{position.returnPct}%</span>
          </p>
        </div>

        <ChevronRight
          size={18}
          className={`text-[#78716C] flex-shrink-0 transition-transform duration-200 ${expanded ? 'rotate-90' : ''} ${locale === 'ar' ? 'rotate-180' : ''}`}
        />
      </button>

      {expanded && (
        <div className="px-4 sm:px-5 pb-4 pt-1 bg-amber-50/20 border-t border-amber-100/80">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-4">
            {[
              { label: t('investor.portfolio.invested'), value: fmt(position.invested) },
              { label: t('investor.portfolio.distributions'), value: fmt(position.distributionsReceived) },
              { label: t('investor.portfolio.buyout'), value: fmt(position.buyoutReceived) },
              { label: t('investor.portfolio.total'), value: fmt(position.received), accent: true },
            ].map((item) => (
              <div key={item.label} className="rounded-lg bg-white border border-[#E5E0D8] px-3 py-2">
                <p className="text-[10px] uppercase tracking-wide text-[#78716C]">{item.label}</p>
                <p className={`text-sm font-semibold tabular-nums mt-0.5 ${item.accent ? 'text-[#16A34A]' : 'text-[#1A1A1A]'}`}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-xl bg-white border border-[#E5E0D8] p-3 sm:p-4">
            <p className="text-xs font-medium text-[#78716C] mb-2">{t('investor.portfolio.returnTimeline')}</p>
            <ResponsiveContainer width="100%" height={120}>
              <AreaChart data={BUYOUT_COMPLETE_CHART}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E0D8" vertical={false} />
                <XAxis dataKey="phase" tick={{ fontSize: 10, fill: '#78716C' }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip formatter={(v) => fmt(v)} />
                <Area type="monotone" dataKey="distributions" stackId="1" stroke="#0F9A9A" fill="#0F9A9A" fillOpacity={0.35} name={t('investor.portfolio.distributions')} />
                <Area type="monotone" dataKey="buyout" stackId="1" stroke="#16A34A" fill="#16A34A" fillOpacity={0.45} name={t('investor.portfolio.buyout')} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <p className="text-xs text-[#78716C] mt-3 leading-relaxed">
            {t('investor.portfolio.buyoutTimelineNote', { share: position.shareAtStart })}
          </p>
        </div>
      )}
    </li>
  );
}

function InvestorCompletedBuyoutsSection({ positions }) {
  const t = useT();
  const [expandedId, setExpandedId] = useState(null);
  const totalReturned = positions.reduce((s, p) => s + p.received, 0);
  const totalInvested = positions.reduce((s, p) => s + p.invested, 0);
  const blendedReturn = totalInvested > 0
    ? (((totalReturned - totalInvested) / totalInvested) * 100).toFixed(1)
    : '0';

  return (
    <section className="rounded-2xl border border-[#E5E0D8] bg-white overflow-hidden shadow-sm">
      <div className="px-4 sm:px-5 py-4 border-b border-[#E5E0D8] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <Trophy size={16} className="text-amber-600 flex-shrink-0" />
          <h2 className="font-semibold text-[#1A1A1A] truncate">{t('investor.portfolio.completedBuyouts')}</h2>
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 flex-shrink-0">
            {positions.length}
          </span>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs sm:text-sm text-[#78716C]">
          <span>{t('investor.portfolio.invested')} <strong className="text-[#1A1A1A] tabular-nums">{fmt(totalInvested)}</strong></span>
          <span>{t('investor.portfolio.returned')} <strong className="text-[#16A34A] tabular-nums">{fmt(totalReturned)}</strong></span>
          <span>{t('investor.portfolio.blended')} <strong className="text-[#16A34A] tabular-nums">+{blendedReturn}%</strong></span>
        </div>
      </div>

      <ul>
        {positions.map((p) => (
          <InvestorBuyoutListItem
            key={p.name}
            position={p}
            expanded={expandedId === p.name}
            onToggle={() => setExpandedId((id) => (id === p.name ? null : p.name))}
          />
        ))}
      </ul>
    </section>
  );
}

function BuyerContract({ contract, contracts, activeId, onSelectContract, ownership, showAll, setShowAll, onExit }) {
  const t = useT();
  const { locale } = useLocale();
  const buyerName = pickName(locale, { en: BUYER.name.split(' ')[0], ar: BUYER.nameAr });

  if (contract.status === 'complete') {
    return (
      <div className="space-y-6">
        <PageHeader title={t('buyer.contract.title')} />
        <ContractSelector contracts={contracts} activeId={activeId} onSelect={onSelectContract} />
        <BuyerContractComplete contract={contract} />
      </div>
    );
  }

  const investorShare = 100 - ownership - contract.tamlkOwnership;

  return (
    <div className="space-y-6">
      <PageHeader title={t('buyer.contract.title')} />
      <ContractSelector contracts={contracts} activeId={activeId} onSelect={onSelectContract} />

      <PaymentReminderBanner contract={contract} ownership={ownership} />

      <PropertyPlaceholder name={contract.name} imageUrl={contract.imageUrl} />
      <div className="flex flex-wrap gap-4 text-sm text-[#78716C] items-center">
        <span>{contract.location}</span>
        <span>·</span>
        <span>{contract.type} · {t('buyer.contract.beds', { count: contract.beds })} · {t('buyer.contract.baths', { count: contract.baths })} · {t('buyer.contract.sqm', { count: contract.sqm })}</span>
        <ContractStatusBadge status={contract.status} />
      </div>

      <EjarOccupancyPanel ejar={contract.ejar} buyerName={pickName(locale, { en: BUYER.name, ar: BUYER.nameAr })} />

      <div className="bg-white rounded-xl border border-[#E5E0D8] p-6">
        <h2 className="text-lg font-semibold text-[#0F9A9A] mb-4">{t('buyer.contract.ownershipSplit')}</h2>
        <div className="h-10 rounded-lg overflow-hidden flex">
          <div className="bg-[#0D7C7C] flex items-center justify-center text-white text-sm font-medium" style={{ width: `${ownership}%` }}>
            {buyerName} {ownership}%
          </div>
          <div className="bg-[#0F9A9A] flex items-center justify-center text-white text-sm font-medium" style={{ width: `${investorShare}%` }}>
            {t('buyer.contract.investors')} {investorShare.toFixed(1)}%
          </div>
          <div className="bg-[#D6D0C8] flex items-center justify-center text-[#78716C] text-sm font-medium" style={{ width: `${contract.tamlkOwnership}%` }}>
            Tamlk {contract.tamlkOwnership}%
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#E5E0D8] p-6">
        <h2 className="text-lg font-semibold text-[#0F9A9A] mb-4">{t('buyer.contract.milestoneTracker')}</h2>
        <div className="relative pt-6 pb-2">
          <div className="h-3 bg-[#E5E0D8] rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#0D7C7C] to-[#0F9A9A] rounded-full transition-all duration-700" style={{ width: `${ownership}%` }} />
          </div>
          {[0, 25, 50, 75, 100].map((m) => (
            <div key={m} className="absolute top-0 flex flex-col items-center" style={{ left: `${m}%`, transform: 'translateX(-50%)' }}>
              <div className={`w-4 h-4 rounded-full border-2 ${ownership >= m ? 'bg-[#0D7C7C] border-[#0D7C7C]' : 'bg-white border-[#D6D0C8]'}`} />
              <span className="text-xs text-[#78716C] mt-6">{m}%</span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-[#0F9A9A] font-medium flex items-center gap-2">
          <Clock size={16} /> {t('buyer.contract.nextMilestone', { milestone: contract.nextMilestone })}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-[#E5E0D8] overflow-hidden">
          <div className="px-6 py-4 border-b border-[#E5E0D8] flex justify-between items-center">
            <h2 className="text-lg font-semibold text-[#0F9A9A]">{t('buyer.contract.monthProgress')}</h2>
            <button onClick={() => setShowAll(!showAll)} className="text-sm text-[#0F9A9A] hover:underline">
              {showAll ? t('buyer.contract.show12Months') : t('buyer.contract.showAllMonths')}
            </button>
          </div>
          <div className="overflow-x-auto max-h-96 overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0">
                <tr className="bg-[#0A6464] text-white">
                  <th className="px-3 py-2 text-start">{t('buyer.contract.month')}</th>
                  <th className="px-3 py-2 text-start">{t('buyer.contract.payment')}</th>
                  <th className="px-3 py-2 text-start">{t('buyer.contract.rentPortion')}</th>
                  <th className="px-3 py-2 text-start">{t('buyer.contract.buyout')}</th>
                  <th className="px-3 py-2 text-start">{t('buyer.contract.cumulative')}</th>
                  <th className="px-3 py-2 text-start">{t('buyer.contract.remaining')}</th>
                </tr>
              </thead>
              <tbody>
                {(showAll ? Array.from({ length: 240 }, (_, i) => {
                  const rent = i < 239 ? Math.round(contract.rentComponent + (4 - i) * 12) : 0;
                  const buyout = i < 239 ? contract.monthlyPayment - rent : contract.monthlyPayment;
                  const startOwn = 20 + i * 0.33;
                  const endOwn = Math.min(100, startOwn + 0.33);
                  return {
                    month: `${i + 1}`,
                    payment: contract.monthlyPayment,
                    rent: rent || '—',
                    buyout,
                    cumulative: `${startOwn.toFixed(1)}% → ${endOwn.toFixed(1)}%`,
                    remaining: `${(100 - endOwn).toFixed(1)}%`,
                    status: i < contract.paymentsMade ? 'paid' : i === contract.paymentsMade ? 'upcoming' : 'future',
                  };
                }) : CONTRACT_MONTHS).map((row, i) => (
                  <tr
                    key={i}
                    className={`border-b border-[#E5E0D8] hover:bg-[#FAF7F2] ${
                      row.status === 'paid' ? 'border-l-4 border-l-[#16A34A]' :
                      row.status === 'upcoming' ? 'border-l-4 border-l-[#D97706] bg-amber-50/30' : ''
                    }`}
                  >
                    <td className="px-3 py-2">{row.month}</td>
                    <td className="px-3 py-2">{fmt(row.payment)}</td>
                    <td className="px-3 py-2">{typeof row.rent === 'number' ? fmt(row.rent) : row.rent}</td>
                    <td className="px-3 py-2">{fmt(row.buyout)}</td>
                    <td className="px-3 py-2 text-[#0D7C7C]">{row.cumulative}</td>
                    <td className="px-3 py-2">{row.remaining}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-[#E5E0D8] p-6 space-y-4 h-fit">
            <h2 className="text-lg font-semibold text-[#0F9A9A]">{t('buyer.contract.contractDetails')}</h2>
            <div className="space-y-3 text-sm">
              <div><span className="text-[#78716C]">{t('buyer.contract.contractType')}</span> <span className="font-medium">{t('buyer.contract.diminishingMusharaka')}</span></div>
              <div className="flex items-center gap-2">
                <span className="text-[#78716C]">{t('buyer.contract.shariaBoard')}</span>
                <span className="px-2 py-0.5 rounded bg-green-50 text-[#16A34A] text-xs font-medium">{t('buyer.contract.certified')}</span>
              </div>
              <div><span className="text-[#78716C]">{t('buyer.contract.contractId')}</span> <span className="font-mono">{contract.contractId}</span></div>
              <div><span className="text-[#78716C]">{t('buyer.contract.startDate')}</span> <span>{contract.contractStart}</span></div>
              <div><span className="text-[#78716C]">{t('buyer.contract.term')}</span> <span>{t('buyer.contract.months', { count: contract.contractMonths })}</span></div>
            </div>
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0D7C7C] text-white rounded-lg hover:bg-[#0F9A9A] transition-colors">
              <Download size={16} /> {t('buyer.contract.downloadPdf')}
            </button>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
            <h3 className="font-semibold text-[#1A1A1A] mb-2">{t('buyer.contract.exitOption')}</h3>
            <p className="text-sm text-[#78716C] mb-3">
              {t('buyer.contract.exitDesc', { pct: ownership })}
            </p>
            <button onClick={onExit} className="w-full px-4 py-2 border border-[#D97706] text-[#D97706] rounded-lg hover:bg-[#D97706] hover:text-white transition-colors text-sm font-medium">
              {t('buyer.contract.listShare')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FlowStepper({ steps, current }) {
  const currentIdx = steps.findIndex((s) => s.id === current);
  return (
    <div className="flex items-center gap-0 w-full">
      {steps.map((step, i) => {
        const done = i < currentIdx;
        const active = step.id === current;
        return (
          <div key={step.id} className="flex items-center flex-1 last:flex-none">
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  done ? 'bg-[#16A34A] text-white' :
                  active ? 'bg-[#0D7C7C] text-white ring-4 ring-[#0D7C7C]/15' :
                  'bg-[#E5E0D8] text-[#78716C]'
                }`}
              >
                {done ? <Check size={14} /> : i + 1}
              </div>
              <div className="hidden sm:block">
                <p className={`text-xs font-semibold ${active ? 'text-[#0D7C7C]' : done ? 'text-[#16A34A]' : 'text-[#78716C]'}`}>
                  {step.label}
                </p>
                {step.sub && <p className="text-[10px] text-[#78716C]">{step.sub}</p>}
              </div>
            </div>
            {i < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-3 rounded transition-colors duration-500 ${done ? 'bg-[#16A34A]' : 'bg-[#E5E0D8]'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function WalletCheckoutPanel({ walletBalance, amount, onTopUp, onWithdraw }) {
  const t = useT();
  const sufficient = walletBalance >= amount;
  const shortfall = Math.max(0, amount - walletBalance);

  return (
    <div className="rounded-2xl border border-[#E5E0D8] p-6 space-y-4 bg-white shadow-sm">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-full bg-[#E6F4F4] text-[#0D7C7C]">
          <Wallet size={22} />
        </div>
        <div>
          <p className="font-semibold text-[#1A1A1A]">{t('wallet.name')}</p>
          <p className="text-xs text-[#78716C]">{t('wallet.manageHint')}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E5E0D8]">
          <p className="text-[#78716C] text-xs">{t('wallet.yourBalance')}</p>
          <p className={`text-2xl font-semibold mt-1 ${sufficient ? 'text-[#16A34A]' : 'text-[#C0504D]'}`}>{fmt(walletBalance)}</p>
        </div>
        <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E5E0D8]">
          <p className="text-[#78716C] text-xs">{t('wallet.amountDue')}</p>
          <p className="text-2xl font-semibold text-[#0D7C7C] mt-1">{fmt(amount)}</p>
        </div>
      </div>

      {sufficient ? (
        <div className="flex items-center gap-2 text-sm text-[#16A34A] bg-green-50 border border-green-100 rounded-2xl px-4 py-3">
          <CircleCheck size={16} />
          <span>{t('wallet.sufficient')}</span>
        </div>
      ) : (
        <div className="rounded-2xl bg-red-50 border border-red-100 p-4 space-y-3">
          <p className="text-sm text-[#C0504D] font-medium flex items-center gap-2">
            <AlertCircle size={16} />
            {t('wallet.shortBy', { amount: fmt(shortfall) })}
          </p>
          <button
            type="button"
            onClick={() => onTopUp(shortfall)}
            className="w-full py-3 bg-[#0D7C7C] text-white rounded-full font-semibold hover:bg-[#0F9A9A] transition-colors flex items-center justify-center gap-2"
          >
            <Plus size={16} /> {t('wallet.addAmount', { amount: fmt(shortfall) })}
          </button>
        </div>
      )}

      <div className="flex flex-wrap gap-2 pt-2 border-t border-[#E5E0D8]">
        <button
          type="button"
          onClick={() => onTopUp()}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-[#0D7C7C] rounded-full border border-[#0D7C7C] hover:bg-[#E6F4F4] transition-colors"
        >
          <Plus size={14} /> {t('wallet.addFunds')}
        </button>
        {walletBalance > 0 && onWithdraw && (
          <button
            type="button"
            onClick={onWithdraw}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-[#78716C] rounded-full border border-[#E5E0D8] hover:border-[#1A1A1A] transition-colors"
          >
            <ArrowDownToLine size={14} /> {t('wallet.withdraw')}
          </button>
        )}
      </div>
    </div>
  );
}

function PaymentProcessing({ label }) {
  const t = useT();
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-5">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-[#E5E0D8]" />
        <div className="absolute inset-0 rounded-full border-4 border-[#0D7C7C] border-t-transparent animate-spin" />
        <Lock size={20} className="absolute inset-0 m-auto text-[#0D7C7C]" />
      </div>
      <div className="text-center">
        <p className="font-semibold text-[#1A1A1A]">{label}</p>
        <p className="text-sm text-[#78716C] mt-1">{t('wallet.secured')}</p>
      </div>
    </div>
  );
}

function PaymentReceipt({ title, amount, lines, method, reference, onDone, doneLabel }) {
  const t = useT();
  return (
    <div className="max-w-lg mx-auto space-y-6 animate-in fade-in">
      <div className="text-center space-y-3">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto">
          <CircleCheck size={44} className="text-[#16A34A]" />
        </div>
        <h2 className="text-2xl font-bold text-[#16A34A]">{title}</h2>
        <p className="text-4xl font-bold text-[#0D7C7C] tracking-tight">{fmt(amount)}</p>
      </div>

      <div className="bg-white rounded-2xl border border-[#E5E0D8] overflow-hidden shadow-sm">
        <div className="px-5 py-4 bg-[#FAF7F2] border-b border-[#E5E0D8] flex items-center gap-2">
          <Receipt size={16} className="text-[#0F9A9A]" />
          <span className="text-sm font-semibold text-[#0F9A9A]">{t('wallet.receipt')}</span>
        </div>
        <div className="p-5 space-y-3 text-sm">
          {lines.map((line) => (
            <div key={line.label} className="flex justify-between gap-4">
              <span className="text-[#78716C]">{line.label}</span>
              <span className={`font-medium text-right ${line.accent || 'text-[#1A1A1A]'}`}>{line.value}</span>
            </div>
          ))}
          <div className="flex justify-between gap-4 pt-3 border-t border-[#E5E0D8]">
            <span className="text-[#78716C]">{t('wallet.method')}</span>
            <span className="font-medium">{t('wallet.name')}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-[#78716C]">{t('wallet.reference')}</span>
            <span className="font-mono text-xs">{reference}</span>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onDone}
        className="w-full py-3.5 bg-[#0D7C7C] text-white font-semibold rounded-xl hover:bg-[#0F9A9A] transition-colors"
      >
        {doneLabel}
      </button>
    </div>
  );
}

function PaymentOverview({ contracts, ownershipMap, walletBalance }) {
  const t = useT();
  const { locale } = useLocale();
  const payable = contracts.filter((c) => c.status !== 'complete');
  const completed = contracts.filter((c) => c.status === 'complete');
  const totalDue = payable.reduce((s, c) => s + c.monthlyPayment, 0);
  const totalRent = payable.reduce((s, c) => s + c.rentComponent, 0);
  const totalBuyout = payable.reduce((s, c) => s + c.buyoutComponent, 0);
  const overdue = payable.filter((c) => c.status === 'delinquent');
  const overdueAmount = overdue.reduce((s, c) => s + c.monthlyPayment, 0);
  const sorted = [...payable].sort((a, b) => a.daysUntilDue - b.daysUntilDue);
  const nextDue = sorted.find((c) => c.status !== 'delinquent') || sorted[0];
  const homePlural = locale === 'en' && payable.length !== 1 ? 's' : '';

  return (
    <div className="rounded-2xl overflow-hidden border border-[#E5E0D8] shadow-sm">
      <div className="bg-gradient-to-br from-[#0D7C7C] via-[#0A6464] to-[#0D7C7C] px-6 py-7 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07]" style={{
          backgroundImage: 'radial-gradient(circle at 80% 20%, white 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }} />
        <div className="relative flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <p className="text-sm opacity-70 uppercase tracking-widest">{t('buyer.payment.overview')}</p>
            <p className="text-5xl font-bold mt-2 tracking-tight">{fmt(totalDue)}</p>
            <p className="text-sm opacity-80 mt-2">
              {t('buyer.payment.dueAcross', { count: payable.length, plural: homePlural })}
              {completed.length > 0 && t('buyer.payment.fullyOwnedSuffix', { count: completed.length })}
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:gap-4">
            {[
              { label: t('buyer.payment.rentPortion'), value: fmt(totalRent) },
              { label: t('buyer.payment.buyoutPortion'), value: fmt(totalBuyout) },
              { label: t('buyer.payment.wallet'), value: fmt(walletBalance) },
              { label: overdue.length > 0 ? t('buyer.payment.overdue') : t('buyer.payment.nextDue'), value: overdue.length > 0 ? fmt(overdueAmount) : (nextDue ? nextDue.nextPaymentDue : '—') },
            ].map((item) => (
              <div key={item.label} className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
                <p className="text-[10px] uppercase tracking-wider opacity-70">{item.label}</p>
                <p className="text-lg font-bold mt-1">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white divide-y divide-[#E5E0D8]">
        {payable.map((c) => {
          const ownership = ownershipMap[c.id] ?? c.ownership;
          const isOverdue = c.status === 'delinquent';
          return (
            <div key={c.id} className="flex items-center gap-4 px-6 py-4 hover:bg-[#FAF7F2] transition-colors">
              <div className={`w-2 h-2 rounded-full flex-shrink-0 ${isOverdue ? 'bg-[#C0504D]' : c.daysUntilDue <= 7 ? 'bg-[#D97706]' : 'bg-[#16A34A]'}`} />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-[#1A1A1A] text-sm truncate">{c.name}</p>
                <p className="text-xs text-[#78716C] mt-0.5">
                  {isOverdue ? t('buyer.payment.daysOverdue', { days: Math.abs(c.daysUntilDue) }) : t('buyer.payment.dueOn', { date: c.nextPaymentDue })} · {t('buyer.payment.ownedPct', { pct: ownership })}
                </p>
              </div>
              <p className={`font-bold text-sm flex-shrink-0 ${isOverdue ? 'text-[#C0504D]' : 'text-[#0D7C7C]'}`}>
                {fmt(c.monthlyPayment)}
              </p>
              {isOverdue && (
                <span className="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full bg-red-50 text-[#C0504D] font-bold border border-red-100 flex-shrink-0">
                  {t('buyer.payment.overdue')}
                </span>
              )}
            </div>
          );
        })}
        {completed.map((c) => (
          <div key={c.id} className="flex items-center gap-4 px-6 py-4 bg-amber-50/30">
            <Trophy size={14} className="text-amber-600 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-[#1A1A1A] text-sm truncate">{c.name}</p>
              <p className="text-xs text-amber-700 mt-0.5">{t('buyer.payment.fullyOwnedRow', { date: c.completedDate })}</p>
            </div>
            <span className="text-xs font-semibold text-amber-700 flex-shrink-0">{t('buyer.payment.fullyOwnedBadge')}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PropertyPaymentTabs({ contracts, activeId, onSelect }) {
  const shortName = (name) => {
    if (name.includes('Villa')) return name.split('—')[1]?.trim() || name;
    if (name.includes('Apt')) return name.split('—')[1]?.trim() || name;
    return name.length > 20 ? `${name.slice(0, 18)}…` : name;
  };

  return (
    <div className="px-6 py-4 border-b border-[#E5E0D8] bg-[#FAF7F2]/40">
      <div className="flex flex-wrap gap-2">
        {contracts.map((c) => {
          const isActive = c.id === activeId;
          const isOverdue = c.status === 'delinquent';
          return (
            <button
              key={c.id}
              onClick={() => onSelect(c.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                isActive
                  ? 'bg-[#0D7C7C] text-white shadow-sm'
                  : 'bg-white text-[#78716C] border border-[#E5E0D8] hover:border-[#0D7C7C]'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isOverdue ? 'bg-[#C0504D]' : isActive ? 'bg-white/80' : 'bg-[#16A34A]'}`} />
              {shortName(c.name)}
              <span className={`text-xs ${isActive ? 'text-white/80' : 'opacity-60'}`}>{fmt(c.monthlyPayment)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function BuyerPayment({
  contracts, activeId, onSelectContract, ownershipMap, onPay, paymentSuccess, onClearSuccess, walletBalance, onTopUp, onWithdraw,
}) {
  const t = useT();
  const [step, setStep] = useState('review');
  const [agreed, setAgreed] = useState(false);

  const sortedContracts = [...contracts]
    .filter((c) => c.status !== 'complete')
    .sort((a, b) => {
      if (a.status === 'delinquent' && b.status !== 'delinquent') return -1;
      if (b.status === 'delinquent' && a.status !== 'delinquent') return 1;
      return a.daysUntilDue - b.daysUntilDue;
    });

  const contract = contracts.find((c) => c.id === activeId) || sortedContracts[0];
  const ownership = ownershipMap[contract.id] ?? contract.ownership;
  const newOwnership = ownership + 0.6;
  const isOverdue = contract.status === 'delinquent';
  const amount = contract.monthlyPayment;
  const reference = `PAY-${contract.contractId}-${Date.now().toString().slice(-6)}`;

  const pieData = [
    { name: t('buyer.payment.rentPortionPie'), value: contract.rentComponent, color: '#0F9A9A' },
    { name: t('buyer.payment.buyoutPie'), value: contract.buyoutComponent, color: '#0D7C7C' },
  ];

  const flowSteps = [
    { id: 'review', label: t('buyer.payment.stepReview'), sub: t('buyer.payment.stepReviewSub') },
    { id: 'wallet', label: t('buyer.payment.stepWallet'), sub: t('buyer.payment.stepWalletSub') },
    { id: 'confirm', label: t('buyer.payment.stepConfirm'), sub: t('buyer.payment.stepConfirmSub') },
  ];

  const resetFlow = () => {
    setStep('review');
    setAgreed(false);
    onClearSuccess();
  };

  const handleSelectContract = (id) => {
    setStep('review');
    setAgreed(false);
    onSelectContract(id);
  };

  const walletSufficient = walletBalance >= amount;

  const runPayment = () => {
    setStep('processing');
    setTimeout(() => {
      onPay();
      setStep('success');
    }, 1800);
  };

  if (paymentSuccess || step === 'success') {
    return (
      <PaymentReceipt
        title={t('buyer.payment.confirmed')}
        amount={amount}
        method="wallet"
        reference={reference}
        onDone={resetFlow}
        doneLabel={t('buyer.payment.backToPayments')}
        lines={[
          { label: t('buyer.payment.property'), value: contract.name },
          { label: t('buyer.payment.rentPortion'), value: fmt(contract.rentComponent) },
          { label: t('buyer.payment.buyoutPortion'), value: fmt(contract.buyoutComponent) },
          { label: t('buyer.payment.newOwnership'), value: `${newOwnership.toFixed(1)}%`, accent: 'text-[#0D7C7C] font-bold' },
          { label: t('buyer.payment.contract'), value: contract.contractId },
        ]}
      />
    );
  }

  return (
    <div className="space-y-0">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1A1A1A]">{t('buyer.payment.title')}</h1>
        <p className="text-sm text-[#78716C] mt-1">{t('buyer.payment.subtitle')}</p>
      </div>

      <PaymentOverview contracts={contracts} ownershipMap={ownershipMap} walletBalance={walletBalance} />

      <div className="mt-6 bg-white rounded-2xl border border-[#E5E0D8] shadow-sm overflow-hidden">
        <PropertyPaymentTabs contracts={sortedContracts} activeId={activeId} onSelect={handleSelectContract} />

        <div className="px-6 py-5 border-b border-[#E5E0D8] bg-[#FAF7F2]/60">
          <FlowStepper steps={flowSteps} current={step === 'processing' ? 'confirm' : step} />
        </div>

        <div className="p-6 space-y-5 max-w-3xl">
          {step === 'processing' && <PaymentProcessing label={t('buyer.payment.processing')} />}

          {step === 'review' && (
            <>
              {isOverdue && <PaymentReminderBanner contract={contract} ownership={ownership} />}

              <div className={`rounded-xl border p-6 ${isOverdue ? 'border-[#C0504D]/30 bg-red-50/20' : 'border-[#E5E0D8] bg-[#FAF7F2]/50'}`}>
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-[#78716C] mb-1">
                      {isOverdue ? t('buyer.payment.overduePayment') : t('buyer.payment.nextPayment')}
                    </p>
                    <h2 className="text-lg font-bold text-[#1A1A1A]">{contract.name}</h2>
                    <p className={`text-4xl font-bold mt-2 ${isOverdue ? 'text-[#C0504D]' : 'text-[#0D7C7C]'}`}>
                      {fmt(amount)}
                    </p>
                    <p className="text-sm text-[#78716C] mt-1">
                      {isOverdue ? t('buyer.payment.wasDue', { date: contract.nextPaymentDue }) : t('buyer.payment.due', { date: contract.nextPaymentDue })}
                    </p>
                  </div>
                  <ResponsiveContainer width={100} height={100}>
                    <PieChart>
                      <Pie data={pieData} cx="50%" cy="50%" innerRadius={30} outerRadius={45} dataKey="value" startAngle={90} endAngle={-270}>
                        {pieData.map((e, i) => <Cell key={i} fill={e.color} />)}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="flex gap-4 text-sm mb-6 pb-6 border-b border-[#E5E0D8]">
                  <div className="flex-1 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0F9A9A]" />
                    <span className="text-[#78716C]">{t('buyer.payment.rentToInvestors')}</span>
                    <span className="font-semibold ml-auto">{fmt(contract.rentComponent)}</span>
                  </div>
                  <div className="flex-1 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0D7C7C]" />
                    <span className="text-[#78716C]">{t('buyer.payment.buyoutToCoowners')}</span>
                    <span className="font-semibold ml-auto">{fmt(contract.buyoutComponent)}</span>
                  </div>
                </div>

                <PaymentBreakdownExplainer contract={contract} ownership={ownership} />
              </div>

              {!isOverdue && (
                <div className="rounded-xl border border-[#E5E0D8] p-5 bg-white">
                  <h3 className="font-semibold text-[#0F9A9A] mb-3 text-sm">{t('buyer.payment.afterPayment')}</h3>
                  <p className="text-sm text-[#78716C] mb-3">
                    {t('buyer.payment.ownershipGrows', { from: ownership, to: newOwnership.toFixed(1) })}
                  </p>
                  <div className="h-2.5 bg-[#E5E0D8] rounded-full overflow-hidden relative">
                    <div className="absolute h-full bg-[#0D7C7C]/25 rounded-full" style={{ width: `${newOwnership}%` }} />
                    <div className="absolute h-full bg-[#0D7C7C] rounded-full transition-all duration-500" style={{ width: `${ownership}%` }} />
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={() => setStep('wallet')}
                className={`w-full py-4 text-white text-lg font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl ${
                  isOverdue ? 'bg-[#C0504D] hover:bg-red-700' : 'bg-[#0D7C7C] hover:bg-[#0F9A9A]'
                }`}
              >
                {t('buyer.payment.continueWallet')}
              </button>
            </>
          )}

          {step === 'wallet' && (
            <>
              <WalletCheckoutPanel
                walletBalance={walletBalance}
                amount={amount}
                onTopUp={onTopUp}
                onWithdraw={onWithdraw}
              />
              <div className="flex gap-3">
                <button type="button" onClick={() => setStep('review')} className="flex-1 py-3 border border-[#E5E0D8] rounded-xl text-[#78716C] hover:bg-[#FAF7F2] transition-colors">
                  {t('buyer.payment.back')}
                </button>
                <button
                  type="button"
                  onClick={() => setStep('confirm')}
                  disabled={!walletSufficient}
                  className="flex-[2] py-3 bg-[#0D7C7C] text-white font-semibold rounded-xl hover:bg-[#0F9A9A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t('buyer.payment.reviewConfirm')}
                </button>
              </div>
            </>
          )}

          {step === 'confirm' && (
            <>
              <div className="rounded-xl border border-[#E5E0D8] overflow-hidden">
                <div className="px-5 py-4 bg-gradient-to-r from-[#0D7C7C] to-[#0A6464] text-white">
                  <p className="text-xs uppercase tracking-widest opacity-70">{t('buyer.payment.orderSummary')}</p>
                  <p className="text-3xl font-bold mt-1">{fmt(amount)}</p>
                </div>
                <div className="p-5 space-y-3 text-sm bg-white">
                  <div className="flex justify-between"><span className="text-[#78716C]">{t('buyer.payment.property')}</span><span className="font-medium">{contract.name}</span></div>
                  <div className="flex justify-between"><span className="text-[#78716C]">{t('buyer.payment.rentInvestors')}</span><span>{fmt(contract.rentComponent)}</span></div>
                  <div className="flex justify-between"><span className="text-[#78716C]">{t('buyer.payment.buyoutTamlk')}</span><span>{fmt(contract.buyoutComponent)}</span></div>
                  <div className="flex justify-between"><span className="text-[#78716C]">{t('buyer.payment.ownershipAfter')}</span><span className="font-bold text-[#0D7C7C]">{newOwnership.toFixed(1)}%</span></div>
                  <div className="flex justify-between pt-2 border-t border-[#E5E0D8]"><span className="text-[#78716C]">{t('buyer.payment.paidFrom')}</span><span className="font-medium">{t('wallet.name')}</span></div>
                  <div className="flex justify-between"><span className="text-[#78716C]">{t('buyer.payment.balanceAfter')}</span><span className="font-medium">{fmt(walletBalance - amount)}</span></div>
                </div>
              </div>

              <label className="flex items-start gap-3 p-4 rounded-xl border border-[#E5E0D8] cursor-pointer hover:bg-[#FAF7F2] transition-colors">
                <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-1 accent-[#0D7C7C]" />
                <span className="text-sm text-[#78716C] leading-relaxed">
                  {t('buyer.payment.authorize', { id: contract.contractId })}
                </span>
              </label>

              <div className="flex gap-3">
                <button type="button" onClick={() => setStep('wallet')} className="flex-1 py-3 border border-[#E5E0D8] rounded-xl text-[#78716C] hover:bg-[#FAF7F2] transition-colors">
                  {t('buyer.payment.back')}
                </button>
                <button
                  type="button"
                  onClick={runPayment}
                  disabled={!agreed || !walletSufficient}
                  className={`flex-[2] py-4 text-white text-lg font-semibold rounded-xl transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${
                    isOverdue ? 'bg-[#C0504D] hover:bg-red-700' : 'bg-[#0D7C7C] hover:bg-[#0F9A9A]'
                  }`}
                >
                  {isOverdue ? t('buyer.payment.payOverdue', { amount: fmt(amount) }) : t('buyer.payment.payAmount', { amount: fmt(amount) })}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function BuyerWallet({ balance, transactions, onTopUp, onWithdraw }) {
  const t = useT();
  return (
    <div className="space-y-6">
      <PageHeader title={t('buyer.wallet.title')} subtitle={t('buyer.wallet.subtitle')} />

      <WalletBalanceCard
        balance={balance}
        onTopUp={onTopUp}
        onWithdraw={onWithdraw}
      />

      <div className="bg-white rounded-2xl border border-[#E5E0D8] p-5 flex items-start gap-3 shadow-sm">
        <Wallet size={20} className="text-[#0F9A9A] flex-shrink-0 mt-0.5" />
        <p className="text-sm text-[#78716C] leading-relaxed">{t('buyer.wallet.explainer')}</p>
      </div>

      <div className="bg-white rounded-2xl border border-[#E5E0D8] overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-[#E5E0D8]">
          <h2 className="text-base font-semibold text-[#1A1A1A]">{t('buyer.wallet.history')}</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#FAF7F2] text-[#78716C]">
              <th className="px-4 py-3 text-start font-medium">{t('buyer.wallet.date')}</th>
              <th className="px-4 py-3 text-start font-medium">{t('buyer.wallet.description')}</th>
              <th className="px-4 py-3 text-start font-medium">{t('buyer.wallet.amount')}</th>
              <th className="px-4 py-3 text-start font-medium">{t('buyer.wallet.balance')}</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t, i) => (
              <tr key={i} className="border-b border-[#E5E0D8] hover:bg-[#FAF7F2]">
                <td className="px-4 py-3">{t.date}</td>
                <td className="px-4 py-3">{t.desc}</td>
                <td className={`px-4 py-3 font-medium ${t.amount < 0 ? 'text-[#C0504D]' : 'text-[#16A34A]'}`}>
                  {t.amount < 0 ? '−' : '+'}{fmt(Math.abs(t.amount))}
                </td>
                <td className="px-4 py-3">{fmt(t.balance)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function BuyerSupport() {
  const t = useT();
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#1A1A1A]">{t('buyer.support.title')}</h1>
      <div className="bg-white rounded-xl border border-[#E5E0D8] p-8 text-center">
        <HeadphonesIcon size={48} className="mx-auto text-[#0F9A9A] mb-4" />
        <h2 className="text-xl font-semibold text-[#1A1A1A] mb-2">{t('buyer.support.heading')}</h2>
        <p className="text-[#78716C] mb-6">{t('buyer.support.hours')}</p>
        <div className="flex gap-4 justify-center">
          <button className="px-6 py-3 bg-[#0D7C7C] text-white rounded-lg hover:bg-[#0F9A9A] transition-colors">{t('buyer.support.liveChat')}</button>
          <button className="px-6 py-3 border border-[#E5E0D8] rounded-lg hover:bg-[#FAF7F2] transition-colors">{t('buyer.support.submitTicket')}</button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// INVESTOR VIEW
// ═══════════════════════════════════════════════════════════════════

function InvestorDashboard({ listingSuspended, onNavigate }) {
  const t = useT();
  const { locale } = useLocale();
  const investorName = pickName(locale, { en: INVESTOR.name.split(' ')[0], ar: INVESTOR.nameAr });
  const completePosition = INVESTOR.portfolio.find((p) => p.status === 'Complete');

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('investor.dashboard.welcome', { name: investorName })}
        subtitle={t('investor.dashboard.subtitle')}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label={t('investor.dashboard.totalInvested')} value={fmt(INVESTOR.totalInvested)} icon={Briefcase} />
        <StatCard label={t('investor.dashboard.monthlyIncome')} value={`${fmt(INVESTOR.totalMonthlyIncome)}${t('perMonthShort')}`} icon={TrendingUp} />
        <StatCard label={t('investor.dashboard.totalReceived')} value={fmt(INVESTOR.totalReceived)} icon={Wallet} />
        <StatCard label={t('investor.dashboard.nextDistribution')} value="1 July 2025" icon={Clock} />
      </div>

      <SectionCard title={t('investor.dashboard.portfolioPerformance')}>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={PORTFOLIO_PERFORMANCE}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E0D8" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#78716C' }} />
            <YAxis tick={{ fontSize: 12, fill: '#78716C' }} tickFormatter={(v) => fmt(v)} />
            <Tooltip formatter={(v) => fmt(v)} />
            <Area type="monotone" dataKey="total" stroke="#0D7C7C" fill="#0D7C7C" fillOpacity={0.12} strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </SectionCard>

      <div>
        <h2 className="tamlk-section-title mb-4">{t('investor.dashboard.activePositions')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {INVESTOR.portfolio.filter((p) => p.status === 'Active').map((p, i) => (
            <div key={i} className="tamlk-card p-6 hover:shadow-tamlk-sm transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-semibold text-[#1A1A1A]">{p.name}</h3>
                {p.name.includes('Jeddah') && listingSuspended ? (
                  <span className="text-xs px-2.5 py-1 rounded-full bg-amber-50 text-[#D97706] border border-amber-200">{t('investor.dashboard.buyerOverdue')} ⚠️</span>
                ) : (
                  <span className="text-xs px-2.5 py-1 rounded-full bg-green-50 text-[#16A34A] border border-green-200">{t('investor.dashboard.positionActive')} 🟢</span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-[#78716C]">{t('investor.dashboard.invested')}:</span> <span className="font-medium">{fmt(p.invested)}</span></div>
                <div><span className="text-[#78716C]">{t('investor.dashboard.share')}:</span> <span className="font-medium">{p.share}%</span></div>
                <div><span className="text-[#78716C]">{t('investor.dashboard.monthly')}:</span> <span className="font-medium">{fmt(p.monthly)}</span></div>
                <div><span className="text-[#78716C]">{t('investor.dashboard.received')}:</span> <span className="font-medium">{fmt(p.received)}</span></div>
                <div className="col-span-2"><span className="text-[#78716C]">{t('investor.dashboard.propertyValue')}:</span> <span className="font-medium">{fmt(p.value)}</span></div>
              </div>
            </div>
          ))}
        </div>
        {completePosition && (
          <button
            type="button"
            onClick={() => onNavigate('portfolio')}
            className="mt-4 w-full p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between hover:bg-amber-100/80 hover:border-amber-300 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <Trophy size={20} className="text-amber-600" />
              <div>
                <p className="font-medium text-[#1A1A1A] text-sm">{t('investor.dashboard.buyoutComplete', { name: 'Dammam Marina — Villa 8' })}</p>
                <p className="text-xs text-[#78716C]">{t('investor.dashboard.buyoutSummary', { invested: fmt(35000), returned: fmt(48200), pct: '37.7' })}</p>
              </div>
            </div>
            <span className="text-xs text-amber-700 font-medium">{t('investor.dashboard.viewPortfolio')} →</span>
          </button>
        )}
      </div>
    </div>
  );
}

function InvestorOverdueImpactPanel({ impact, onViewDistributions, compact = false }) {
  const t = useT();
  const { locale } = useLocale();
  if (!impact) return null;

  const effects = [
    {
      label: t('investor.overdue.julyDistribution'),
      value: t('investor.overdue.paused', { amount: fmt(impact.pausedMonthly) }),
      detail: impact.property,
      warn: true,
    },
    {
      label: t('investor.overdue.yourMonthlyIncome'),
      value: `${fmt(impact.activeMonthly)}${t('perMonth')}`,
      detail: t('investor.overdue.was', { amount: fmt(impact.normalMonthly) }),
      warn: false,
    },
    {
      label: t('investor.overdue.buyerOverdue'),
      value: t('buyer.alert.daysOverdue', { days: impact.daysOverdue }),
      detail: t('investor.overdue.due', { date: impact.dueDate }),
      warn: true,
    },
  ];

  return (
    <div className={`${compact ? 'px-4 sm:px-6 pb-4' : 'rounded-2xl border border-amber-200 bg-amber-50/40 p-5'}`}>
      {!compact && (
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#D97706]">{t('investor.overdue.impactTitle')}</p>
            <h3 className="font-semibold text-[#1A1A1A] mt-1">{impact.property}</h3>
            <p className="text-sm text-[#78716C] mt-0.5">
              {impact.buyerName} · {t('investor.overdue.missedContract', { id: impact.contractId })}
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-[#92400E] border border-amber-200 flex-shrink-0">
            {t('investor.overdue.distributionsPausedBadge')}
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {effects.map((e) => (
          <div
            key={e.label}
            className={`rounded-xl border px-3 py-3 bg-white ${e.warn ? 'border-amber-200' : 'border-[#E5E0D8]'}`}
          >
            <p className="text-[10px] uppercase tracking-wide text-[#78716C]">{e.label}</p>
            <p className={`text-base font-semibold tabular-nums mt-0.5 ${e.warn ? 'text-[#D97706]' : 'text-[#1A1A1A]'}`}>
              {e.value}
            </p>
            <p className="text-xs text-[#78716C] mt-0.5 truncate">{e.detail}</p>
          </div>
        ))}
      </div>

      <ul className="mt-4 space-y-2 text-sm text-[#78716C]">
        <li className="flex items-start gap-2">
          <span className="text-[#D97706] mt-0.5">•</span>
          <span>{t('investor.overdue.shareIntact', { share: impact.share })}</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-[#D97706] mt-0.5">•</span>
          <span>{t('investor.overdue.secondarySuspended')}</span>
        </li>
      </ul>

      {onViewDistributions && (
        <button
          type="button"
          onClick={onViewDistributions}
          className="mt-4 text-sm font-medium text-[#0D7C7C] hover:underline inline-flex items-center gap-1"
        >
          {t('investor.overdue.viewInHistory')}
          <ChevronRight size={14} className={locale === 'ar' ? 'rotate-180' : ''} />
        </button>
      )}
    </div>
  );
}

function InvestorPortfolioAlert({ embedded, impact, expanded, onToggleImpact, onViewDistributions }) {
  const t = useT();
  const wrap = embedded ? 'border-b border-[#E5E0D8]' : 'rounded-xl border border-amber-200 bg-amber-50/80 mb-4';

  return (
    <div className={`${wrap} bg-amber-50/90`} role="alert">
      <div className="flex items-center gap-3 px-4 py-3 sm:px-6 sm:py-3.5">
        <span className="hidden sm:flex w-8 h-8 rounded-full bg-amber-100 items-center justify-center flex-shrink-0">
          <AlertCircle size={16} className="text-[#D97706]" />
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-[#1A1A1A]">
            <span className="text-[#D97706]">{t('investor.overdue.title')}</span>
            {impact && (
              <span className="text-[#78716C] font-normal hidden sm:inline">
                {' '}· {t('investor.overdue.pausedMonthly', { amount: fmt(impact.pausedMonthly) })}
              </span>
            )}
          </p>
          <p className="text-xs text-[#78716C] mt-0.5">
            {impact
              ? t('investor.overdue.incomeReduced', { amount: fmt(impact.activeMonthly) })
              : t('investor.overdue.distributionsPaused')}
          </p>
        </div>
        <button
          type="button"
          onClick={onToggleImpact}
          aria-expanded={expanded}
          className="px-3.5 py-1.5 sm:px-4 sm:py-2 border border-amber-300 text-[#92400E] rounded-full text-xs sm:text-sm font-semibold hover:bg-amber-100 transition-colors whitespace-nowrap flex-shrink-0"
        >
          {expanded ? t('investor.overdue.hideImpact') : t('investor.overdue.seeImpact')}
        </button>
      </div>
      {expanded && impact && (
        <InvestorOverdueImpactPanel
          impact={impact}
          compact
          onViewDistributions={onViewDistributions}
        />
      )}
    </div>
  );
}

function InvestorPositionCard({ position, listingSuspended, onNavigate }) {
  const t = useT();
  const isJeddah = position.name.includes('Jeddah');
  const suspended = isJeddah && listingSuspended;
  const annualYield = position.invested > 0 && position.monthly > 0
    ? ((position.monthly * 12) / position.invested * 100).toFixed(1)
    : null;
  const paybackPct = position.invested > 0
    ? Math.min(100, Math.round((position.received / position.invested) * 100))
    : 0;

  return (
    <article
      className={`group rounded-2xl border bg-white overflow-hidden transition-all duration-200 hover:shadow-[0_8px_30px_rgba(13,124,124,0.08)] ${
        suspended ? 'border-amber-200 ring-1 ring-amber-100' : 'border-[#E5E0D8]'
      }`}
    >
      <div className="h-32 relative">
        <PropertyPlaceholder
          name={position.name}
          imageUrl={getPropertyImage(null, position.name)}
          className="h-32 rounded-none"
          showTitle={false}
        />
        <div className="absolute top-3 right-3">
          {suspended ? (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-100 text-[#92400E] border border-amber-200">
              {t('status.paused')}
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-green-50 text-[#16A34A] border border-green-200">
              {t('status.active')}
            </span>
          )}
        </div>
        {annualYield && (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/95 text-[#0D7C7C] text-xs font-bold shadow-sm">
            {annualYield}% p.a.
          </span>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-semibold text-[#1A1A1A] leading-snug group-hover:text-[#0D7C7C] transition-colors">
          {position.name}
        </h3>
        <p className="text-xs text-[#78716C] mt-1">{t('investor.portfolio.ownershipShare', { share: position.share, value: fmt(position.value) })}</p>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-[#FAF7F2] border border-[#E5E0D8]/80 px-3 py-2.5">
            <p className="text-[10px] uppercase tracking-wide text-[#78716C]">{t('investor.portfolio.invested')}</p>
            <p className="text-base font-semibold text-[#0D7C7C] tabular-nums mt-0.5">{fmt(position.invested)}</p>
          </div>
          <div className="rounded-xl bg-[#FAF7F2] border border-[#E5E0D8]/80 px-3 py-2.5">
            <p className="text-[10px] uppercase tracking-wide text-[#78716C]">{t('buyer.property.monthly')}</p>
            <p className={`text-base font-semibold tabular-nums mt-0.5 ${suspended ? 'text-[#D97706]' : 'text-[#16A34A]'}`}>
              {suspended ? t('status.paused') : fmt(position.monthly)}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex justify-between text-[11px] text-[#78716C] mb-1.5">
            <span>{t('investor.portfolio.capitalReturned')}</span>
            <span className="tabular-nums">{fmt(position.received)} · {paybackPct}%</span>
          </div>
          <div className="h-1.5 bg-[#E5E0D8] rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${suspended ? 'bg-amber-400' : 'bg-[#0D7C7C]'}`}
              style={{ width: `${paybackPct}%` }}
            />
          </div>
        </div>

        <div className="mt-5 flex gap-2">
          <button
            type="button"
            onClick={() => onNavigate('distributions')}
            className="flex-1 py-2 text-sm font-medium rounded-xl border border-[#E5E0D8] text-[#1A1A1A] hover:border-[#0D7C7C] hover:text-[#0D7C7C] transition-colors"
          >
            {t('investor.portfolio.distributions')}
          </button>
          <button
            type="button"
            onClick={() => onNavigate('secondary')}
            disabled={suspended}
            className={`flex-1 py-2 text-sm font-semibold rounded-xl transition-colors ${
              suspended
                ? 'bg-[#E5E0D8] text-[#78716C] cursor-not-allowed'
                : 'bg-[#0D7C7C] text-white hover:bg-[#0F9A9A]'
            }`}
          >
            {t('investor.portfolio.listShare')}
          </button>
        </div>
      </div>
    </article>
  );
}

function InvestorPortfolio({ listingSuspended, onNavigate, delinquencyImpact, onViewDistributionImpact }) {
  const t = useT();
  const { locale } = useLocale();
  const [impactExpanded, setImpactExpanded] = useState(false);
  const active = INVESTOR.portfolio.filter((p) => p.status === 'Active');
  const completed = INVESTOR.portfolio.filter((p) => p.status === 'Complete');
  const activeInvested = active.reduce((s, p) => s + p.invested, 0);
  const activeReceived = active.reduce((s, p) => s + p.received, 0);
  const lifetimeReceived = INVESTOR.portfolio.reduce((s, p) => s + p.received, 0);
  const avgYield = activeInvested > 0
    ? ((INVESTOR.totalMonthlyIncome * 12) / activeInvested * 100).toFixed(1)
    : '—';

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Portfolio overview — mirrors buyer dashboard hierarchy */}
      <section className="rounded-2xl bg-white border border-[#E5E0D8] shadow-sm overflow-hidden">
        {listingSuspended && delinquencyImpact && (
          <InvestorPortfolioAlert
            embedded
            impact={delinquencyImpact}
            expanded={impactExpanded}
            onToggleImpact={() => setImpactExpanded((e) => !e)}
            onViewDistributions={onViewDistributionImpact}
          />
        )}

        <div className="px-6 md:px-8 pt-5 md:pt-6 pb-5 border-b border-[#E5E0D8] bg-[#FAF7F2]/40">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <p className="text-sm text-[#0D7C7C] font-medium">{t('investor.portfolio.eyebrow')}</p>
              <h1 className="text-[26px] md:text-[28px] font-semibold text-[#1A1A1A] tracking-tight mt-1">
                {t('investor.portfolio.welcome', { name: pickName(locale, { en: 'Sara', ar: INVESTOR.nameAr }) })}
              </h1>
              <p className="text-[#78716C] text-sm mt-1">
                {t('investor.portfolio.subtitle', {
                  active: active.length,
                  completed: completed.length,
                  activePlural: locale === 'en' && active.length !== 1 ? 's' : '',
                  completedPlural: locale === 'en' && completed.length !== 1 ? 's' : '',
                })}
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 text-[#16A34A] text-sm font-medium border border-green-200 self-start">
              <Check size={14} /> {t('investor.portfolio.targetYield')}
            </span>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end">
            <div className="lg:col-span-5 pb-2 border-b lg:border-b-0 lg:border-r border-[#E5E0D8] lg:pr-8">
              <p className="text-xs font-medium uppercase tracking-wider text-[#78716C]">{t('investor.portfolio.totalInvested')}</p>
              <p className="text-4xl md:text-[42px] font-semibold text-[#0D7C7C] tracking-tight tabular-nums mt-2">
                {fmt(activeInvested)}
              </p>
              <p className="text-sm text-[#78716C] mt-2">
                {t('investor.portfolio.lifetimeReceived', { amount: fmt(lifetimeReceived) })}
              </p>
            </div>
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { key: 'income', label: t('investor.portfolio.monthlyIncome'), value: fmt(INVESTOR.totalMonthlyIncome), hint: listingSuspended ? t('investor.portfolio.onePositionPaused') : t('investor.portfolio.fromActiveShares') },
                { key: 'received', label: t('investor.portfolio.activeReceived'), value: fmt(activeReceived), hint: t('investor.portfolio.distributionsToDate') },
                { key: 'next', label: t('investor.portfolio.nextDistribution'), value: '1 Jul', hint: INVESTOR.nextDistribution },
                { key: 'yield', label: t('investor.portfolio.avgYield'), value: `${avgYield}%`, hint: t('investor.portfolio.annualized') },
              ].map((m) => (
                <div key={m.key} className="rounded-xl border px-4 py-3 bg-[#FAF7F2] border-[#E5E0D8]/80">
                  <p className="text-[11px] text-[#78716C] uppercase tracking-wide">{m.label}</p>
                  <p className="text-lg font-semibold tabular-nums mt-1 text-[#1A1A1A]">{m.value}</p>
                  {m.hint && <p className="text-[11px] text-[#78716C] mt-0.5">{m.hint}</p>}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-[#E5E0D8] flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onNavigate('opportunities')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0D7C7C] text-white text-sm font-semibold hover:bg-[#0F9A9A] transition-colors"
            >
              <TrendingUp size={16} />
              {t('investor.portfolio.browseOpportunities')}
            </button>
            <button
              type="button"
              onClick={() => onNavigate('distributions')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#E5E0D8] text-sm font-medium text-[#1A1A1A] hover:border-[#0D7C7C] hover:text-[#0D7C7C] transition-colors"
            >
              <BarChart3 size={16} />
              {t('investor.portfolio.distributionHistory')}
            </button>
            <button
              type="button"
              onClick={() => onNavigate('wallet')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#E5E0D8] text-sm font-medium text-[#1A1A1A] hover:border-[#0D7C7C] hover:text-[#0D7C7C] transition-colors"
            >
              <Wallet size={16} />
              {t('investor.portfolio.investorWallet')}
            </button>
          </div>
        </div>
      </section>

      {/* Active positions + performance sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-[#1A1A1A]">{t('investor.portfolio.activePositions')}</h2>
              <p className="text-sm text-[#78716C] mt-0.5">{t('investor.portfolio.activePositionsHint')}</p>
            </div>
            <span className="text-xs font-medium text-[#0D7C7C] bg-[#E6F4F4] px-2.5 py-1 rounded-full">
              {t('investor.portfolio.propertiesCount', { count: active.length })}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {active.map((p) => (
              <InvestorPositionCard
                key={p.name}
                position={p}
                listingSuspended={listingSuspended}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl bg-white border border-[#E5E0D8] p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-[#1A1A1A]">{t('investor.portfolio.portfolioGrowth')}</h3>
            <p className="text-xs text-[#78716C] mt-0.5 mb-4">{t('investor.portfolio.portfolioGrowthHint')}</p>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={PORTFOLIO_PERFORMANCE}>
                <defs>
                  <linearGradient id="investorPortfolioFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0D7C7C" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#0D7C7C" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E0D8" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#78716C' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#78716C' }} tickFormatter={(v) => `${v / 1000}k`} axisLine={false} tickLine={false} width={32} />
                <Tooltip formatter={(v) => fmt(v)} />
                <Area type="monotone" dataKey="total" stroke="#0D7C7C" fill="url(#investorPortfolioFill)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-2xl bg-white border border-[#E5E0D8] p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-[#1A1A1A]">{t('investor.portfolio.recentDistributions')}</h3>
              <button
                type="button"
                onClick={() => onNavigate('distributions')}
                className="text-xs font-medium text-[#0D7C7C] hover:underline"
              >
                {t('actions.viewAll')}
              </button>
            </div>
            <ul className="space-y-3">
              {DISTRIBUTIONS.slice(0, 4).map((d, i) => (
                <li key={i} className="flex items-center justify-between gap-3 text-sm">
                  <div className="min-w-0">
                    <p className="font-medium text-[#1A1A1A] truncate">{d.property}</p>
                    <p className="text-xs text-[#78716C]">{d.date}</p>
                  </div>
                  <span className="font-semibold text-[#16A34A] tabular-nums flex-shrink-0">+{fmt(d.amount)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Completed buyouts */}
      {completed.length > 0 && (
        <InvestorCompletedBuyoutsSection positions={completed} />
      )}
    </div>
  );
}

function OpportunityStatusBadge({ status, riskNote }) {
  const t = useT();
  const styles = {
    open: 'bg-green-50 text-[#16A34A] border-green-200',
    full: 'bg-[#E5E0D8] text-[#78716C] border-[#D6D0C8]',
  };
  const labels = { open: t('investor.opportunityStatus.open'), full: t('investor.opportunityStatus.full') };
  const displayRisk = riskNote === 'Fully funded — buyer payment currently overdue'
    ? t('investor.opportunityStatus.riskOverdue')
    : riskNote;
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles[status] || styles.open}`}>
        {labels[status] || status}
      </span>
      {displayRisk && status === 'full' && (
        <span className="text-xs text-[#D97706] flex items-center gap-1"><AlertCircle size={12} /> {displayRisk}</span>
      )}
    </div>
  );
}

function calcInvestReturns(opp, amount) {
  const monthly = Math.round((amount / 10000) * opp.monthlyPer10k);
  const annual = Math.round(monthly * 12);
  const share = ((amount / opp.totalValue) * 100).toFixed(2);
  const platformFee = Math.round(amount * (opp.platformFeePct / 100));
  const totalInvested = amount + platformFee;
  const totalReturn = Math.round(monthly * opp.contractMonths);
  return { monthly, annual, share, platformFee, totalInvested, totalReturn };
}

function OpportunityCard({ opp, onSelect, listingSuspended }) {
  const t = useT();
  const { locale } = useLocale();
  const fundedPct = Math.round((opp.investorFunding / opp.fundingTarget) * 100);
  const isJeddah = opp.id === 'jeddah-corniche';
  const suspended = isJeddah && listingSuspended;

  return (
    <button
      type="button"
      onClick={() => opp.status !== 'full' && onSelect(opp.id)}
      disabled={opp.status === 'full'}
      className={`group text-left bg-white rounded-2xl border overflow-hidden transition-all duration-300 ${
        opp.status === 'full'
          ? 'border-[#E5E0D8] opacity-75 cursor-not-allowed'
          : 'border-[#E5E0D8] hover:border-[#0F9A9A] hover:shadow-lg hover:-translate-y-0.5'
      }`}
    >
      <div className="relative">
        <PropertyPlaceholder name={opp.name} imageUrl={opp.imageUrl} className="h-40 rounded-none" />
        {opp.featured && (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-amber-400 text-amber-950 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
            <Sparkles size={10} /> {t('investor.opportunityCard.featured')}
          </span>
        )}
        <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/95 text-[#16A34A] text-xs font-bold shadow-sm">
          {opp.annualReturn}% p.a.
        </span>
      </div>

      <div className="p-5 space-y-4">
        <div>
          <h3 className="font-bold text-[#1A1A1A] group-hover:text-[#0D7C7C] transition-colors">{opp.name}</h3>
          <p className="text-xs text-[#78716C] mt-1 flex items-center gap-1"><MapPin size={12} /> {opp.location}</p>
          <p className="text-xs text-[#0F9A9A] mt-1.5 flex items-center gap-1 font-medium">
            <Users size={12} /> {t('investor.opportunityCard.homeBuyer', { name: opp.buyerName })}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 text-xs text-[#78716C]">
          <span className="px-2 py-0.5 rounded-md bg-[#FAF7F2] border border-[#E5E0D8]">{opp.type}</span>
          <span className="px-2 py-0.5 rounded-md bg-[#FAF7F2] border border-[#E5E0D8]">{t('investor.opportunityCard.bed', { count: opp.beds })}</span>
          <span className="px-2 py-0.5 rounded-md bg-[#FAF7F2] border border-[#E5E0D8]">{opp.sqm} m²</span>
        </div>

        <div>
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-[#78716C]">{t('investor.opportunityCard.funded', { pct: fundedPct })}</span>
            <span className="font-semibold text-[#0F9A9A]">{fmt(opp.investorFunding)} / {fmt(opp.fundingTarget)}</span>
          </div>
          <div className="h-2 bg-[#E5E0D8] rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${opp.status === 'full' ? 'bg-[#D6D0C8]' : 'bg-[#0F9A9A]'}`}
              style={{ width: `${Math.min(fundedPct, 100)}%` }}
            />
          </div>
        </div>

        <div className="flex justify-between items-end pt-1">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-[#78716C]">{t('investor.opportunityCard.from')}</p>
            <p className="text-lg font-bold text-[#0D7C7C]">{fmt(opp.minInvestment)}</p>
            <p className="text-xs text-[#78716C]">{t('investor.opportunityCard.per10k', { amount: fmt(opp.monthlyPer10k) })}</p>
          </div>
          {opp.status === 'full' ? (
            <span className="text-xs font-medium text-[#78716C]">{t('investor.opportunityCard.closed')}</span>
          ) : suspended ? (
            <span className="text-xs font-medium text-[#D97706]">{t('investor.opportunityCard.buyerOverdue')} ⚠️</span>
          ) : (
            <span className="text-sm font-semibold text-[#0F9A9A] flex items-center gap-1 group-hover:gap-2 transition-all">
              {t('investor.opportunityCard.view')} <ChevronRight size={16} className={locale === 'ar' ? 'rotate-180' : ''} />
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

function InvestorOpportunities({
  opportunities,
  selectedId,
  onSelect,
  onBack,
  investAmount,
  setInvestAmount,
  walletBalance,
  onInvestComplete,
  onTopUp,
  listingSuspended,
  headerSearch,
  onClearHeaderSearch,
}) {
  const t = useT();
  const { locale } = useLocale();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [step, setStep] = useState('browse');
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    setStep(selectedId ? 'browse' : 'browse');
    setAgreed(false);
  }, [selectedId]);

  const opp = opportunities.find((o) => o.id === selectedId);
  const returns = opp ? calcInvestReturns(opp, investAmount) : null;
  const reference = opp ? `INV-${opp.id.toUpperCase().slice(0, 3)}-${Date.now().toString().slice(-6)}` : '';

  const flowSteps = [
    { id: 'amount', label: t('investor.invest.stepAmount'), sub: t('investor.invest.stepAmountSub') },
    { id: 'wallet', label: t('investor.invest.stepWallet'), sub: t('investor.invest.stepWalletSub') },
    { id: 'confirm', label: t('investor.invest.stepConfirm'), sub: t('investor.invest.stepConfirmSub') },
  ];

  const listable = opportunities.filter(isListableOpportunity);

  const headerFiltered = headerSearch
    ? filterOpportunitiesBySearch(opportunities, headerSearch)
    : listable;
  const headerFilteredIds = new Set(headerFiltered.map((o) => o.id));

  const filtered = listable.filter((o) => {
    if (headerSearch && !headerFilteredIds.has(o.id)) return false;
    const matchSearch = !search || o.name.toLowerCase().includes(search.toLowerCase()) || o.location.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || (filter === 'villa' && o.type === 'Villa') || (filter === 'apartment' && o.type === 'Apartment') || (filter === 'open' && o.status === 'open');
    return matchSearch && matchFilter;
  });

  const hasHeaderFilters = headerSearch && (headerSearch.city || headerSearch.maxBudget != null || headerSearch.minShare != null);

  const openCount = listable.filter((o) => o.status === 'open').length;
  const investTotal = returns?.totalInvested || 0;
  const walletSufficient = walletBalance >= investTotal;

  const resetInvestFlow = () => {
    setStep('browse');
    setAgreed(false);
    onBack();
  };

  const runInvest = () => {
    setStep('processing');
    setTimeout(() => {
      onInvestComplete({ opp, amount: investAmount, reference, returns });
      setStep('success');
    }, 1800);
  };

  if (step === 'success' && opp && returns) {
    return (
      <PaymentReceipt
        title={t('investor.invest.confirmed')}
        amount={returns.totalInvested}
        method="wallet"
        reference={reference}
        onDone={resetInvestFlow}
        doneLabel={t('investor.invest.browseMore')}
        lines={[
          { label: t('buyer.payment.property'), value: opp.name },
          { label: t('investor.invest.sharePurchased'), value: `${returns.share}%`, accent: 'text-[#0D7C7C] font-bold' },
          { label: t('investor.invest.principal'), value: fmt(investAmount) },
          { label: t('investor.invest.platformFee'), value: fmt(returns.platformFee) },
          { label: t('investor.invest.estMonthlyDist'), value: fmt(returns.monthly), accent: 'text-[#16A34A] font-bold' },
        ]}
      />
    );
  }

  if (selectedId && opp && step !== 'browse') {
    return (
      <div className="space-y-6">
        <button type="button" onClick={() => { setStep('browse'); setAgreed(false); onBack(); }} className="flex items-center gap-2 text-sm text-[#0F9A9A] hover:text-[#0D7C7C] transition-colors">
          <ArrowLeft size={16} className={locale === 'ar' ? 'rotate-180' : ''} /> {t('investor.invest.backToOpportunities')}
        </button>

        <div className="bg-white rounded-2xl border border-[#E5E0D8] shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-[#E5E0D8] bg-[#FAF7F2]/60">
            <FlowStepper steps={flowSteps} current={step === 'processing' ? 'confirm' : step} />
          </div>

          <div className="p-6 max-w-3xl space-y-5">
            {step === 'processing' && <PaymentProcessing label={t('investor.invest.processing')} />}

            {(step === 'amount' || step === 'wallet' || step === 'confirm') && (
              <div className="flex items-center gap-3 pb-2 border-b border-[#E5E0D8]">
                <PropertyPlaceholder name={opp.name} imageUrl={opp.imageUrl} className="h-16 w-24 rounded-lg flex-shrink-0" showTitle={false} overlay={false} />
                <div>
                  <h2 className="font-bold text-[#1A1A1A]">{opp.name}</h2>
                  <p className="text-xs text-[#78716C]">{opp.location} · {opp.type}</p>
                </div>
              </div>
            )}

            {step === 'amount' && returns && (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-[#FAF7F2] rounded-xl border border-[#E5E0D8] p-5">
                      <h3 className="font-semibold text-[#0F9A9A] mb-3 text-sm">{t('investor.invest.propertySnapshot')}</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between"><span className="text-[#78716C]">{t('investor.invest.totalValue')}</span><span className="font-medium">{fmt(opp.totalValue)}</span></div>
                        <div className="flex justify-between"><span className="text-[#78716C]">{t('investor.invest.homeBuyer')}</span><span className="font-medium">{opp.buyerName}</span></div>
                        <div className="flex justify-between"><span className="text-[#78716C]">{t('investor.invest.buyerOwnership')}</span><span>{opp.buyerOwnership}%</span></div>
                        <div className="flex justify-between"><span className="text-[#78716C]">{t('investor.invest.contract')}</span><span>{t('investor.invest.diminishingMusharaka')}</span></div>
                        <div className="flex justify-between"><span className="text-[#78716C]">{t('investor.invest.investors')}</span><span>{opp.investorCount}</span></div>
                      </div>
                      <div className="mt-4"><ShariaBadge /></div>
                    </div>

                    {opp.ejar && (
                      <div className="bg-white rounded-xl border border-[#E5E0D8] p-5">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold text-[#0F9A9A] text-sm">{t('investor.invest.occupancy')}</h3>
                          <EjarBadge />
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between"><span className="text-[#78716C]">{t('investor.invest.occupant')}</span><span>{opp.ejar.occupantName}</span></div>
                          <div className="flex justify-between"><span className="text-[#78716C]">{t('investor.invest.usageRent')}</span><span className="font-medium">{fmt(opp.ejar.usageRentAmount)}{t('perMonth')}</span></div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="bg-white rounded-xl border border-[#E5E0D8] p-6">
                    <h3 className="text-lg font-semibold text-[#0F9A9A] mb-4">{t('investor.invest.returnCalculator')}</h3>
                    <label className="text-sm text-[#78716C]">{t('investor.invest.investmentAmount')}</label>
                    <input
                      type="range"
                      min={opp.minInvestment}
                      max={500000}
                      step={1000}
                      value={investAmount}
                      onChange={(e) => setInvestAmount(Number(e.target.value))}
                      className="w-full mt-2 accent-[#0D7C7C]"
                    />
                    <p className="text-3xl font-bold text-[#0D7C7C] mt-2">{fmt(investAmount)}</p>
                    <div className="grid grid-cols-2 gap-3 mt-5 text-sm">
                      <div className="p-3 bg-[#FAF7F2] rounded-lg">
                        <p className="text-[#78716C] text-xs">{t('investor.invest.monthlyDistribution')}</p>
                        <p className="text-lg font-bold text-[#16A34A]">{fmt(returns.monthly)}</p>
                      </div>
                      <div className="p-3 bg-[#FAF7F2] rounded-lg">
                        <p className="text-[#78716C] text-xs">{t('investor.invest.ownershipShare')}</p>
                        <p className="text-lg font-bold">{returns.share}%</p>
                      </div>
                      <div className="p-3 bg-[#FAF7F2] rounded-lg">
                        <p className="text-[#78716C] text-xs">{t('investor.invest.platformFee')}</p>
                        <p className="text-lg font-bold">{fmt(returns.platformFee)}</p>
                      </div>
                      <div className="p-3 bg-[#FAF7F2] rounded-lg">
                        <p className="text-[#78716C] text-xs">{t('investor.invest.totalDueToday')}</p>
                        <p className="text-lg font-bold text-[#0D7C7C]">{fmt(returns.totalInvested)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep('wallet')}
                  className="w-full py-4 bg-[#0D7C7C] text-white text-lg font-semibold rounded-xl hover:bg-[#0F9A9A] transition-colors shadow-lg"
                >
                  {t('investor.invest.continueWallet')}
                </button>
              </>
            )}

            {step === 'wallet' && returns && (
              <>
                <WalletCheckoutPanel
                  walletBalance={walletBalance}
                  amount={returns.totalInvested}
                  onTopUp={onTopUp}
                />
                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep('amount')} className="flex-1 py-3 border border-[#E5E0D8] rounded-xl text-[#78716C] hover:bg-[#FAF7F2]">{t('investor.invest.back')}</button>
                  <button type="button" onClick={() => setStep('confirm')} disabled={!walletSufficient} className="flex-[2] py-3 bg-[#0D7C7C] text-white font-semibold rounded-xl hover:bg-[#0F9A9A] disabled:opacity-50">{t('investor.invest.reviewConfirm')}</button>
                </div>
              </>
            )}

            {step === 'confirm' && returns && (
              <>
                <div className="rounded-xl border border-[#E5E0D8] overflow-hidden">
                  <div className="px-5 py-4 bg-gradient-to-r from-[#0D7C7C] to-[#0A6464] text-white">
                    <p className="text-xs uppercase tracking-widest opacity-70">{t('investor.invest.investmentSummary')}</p>
                    <p className="text-3xl font-bold mt-1">{fmt(returns.totalInvested)}</p>
                  </div>
                  <div className="p-5 space-y-3 text-sm bg-white">
                    <div className="flex justify-between"><span className="text-[#78716C]">{t('buyer.payment.property')}</span><span className="font-medium">{opp.name}</span></div>
                    <div className="flex justify-between"><span className="text-[#78716C]">{t('investor.invest.coOwnershipShare')}</span><span className="font-bold text-[#0D7C7C]">{returns.share}%</span></div>
                    <div className="flex justify-between"><span className="text-[#78716C]">{t('investor.invest.estMonthlyIncome')}</span><span className="text-[#16A34A] font-medium">{fmt(returns.monthly)}</span></div>
                    <div className="flex justify-between"><span className="text-[#78716C]">{t('investor.invest.platformCommission')}</span><span>{fmt(returns.platformFee)}</span></div>
                    <div className="flex justify-between pt-2 border-t border-[#E5E0D8]"><span className="text-[#78716C]">{t('buyer.payment.paidFrom')}</span><span>{t('wallet.name')}</span></div>
                    <div className="flex justify-between"><span className="text-[#78716C]">{t('investor.invest.balanceAfter')}</span><span>{fmt(walletBalance - returns.totalInvested)}</span></div>
                  </div>
                </div>

                <label className="flex items-start gap-3 p-4 rounded-xl border border-[#E5E0D8] cursor-pointer hover:bg-[#FAF7F2]">
                  <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-1 accent-[#0D7C7C]" />
                  <span className="text-sm text-[#78716C] leading-relaxed">{t('investor.invest.authorize')}</span>
                </label>

                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep('wallet')} className="flex-1 py-3 border border-[#E5E0D8] rounded-xl text-[#78716C] hover:bg-[#FAF7F2]">{t('investor.invest.back')}</button>
                  <button type="button" onClick={runInvest} disabled={!agreed || !walletSufficient} className="flex-[2] py-4 bg-[#0D7C7C] text-white text-lg font-semibold rounded-xl hover:bg-[#0F9A9A] disabled:opacity-50">
                    {t('investor.invest.invest', { amount: fmt(returns.totalInvested) })}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (selectedId && opp && step === 'browse') {
    const fundedPct = Math.round((opp.investorFunding / opp.fundingTarget) * 100);
    const preview = calcInvestReturns(opp, investAmount);

    return (
      <div className="space-y-6">
        <button type="button" onClick={onBack} className="flex items-center gap-2 text-sm text-[#0F9A9A] hover:text-[#0D7C7C] transition-colors">
          <ArrowLeft size={16} className={locale === 'ar' ? 'rotate-180' : ''} /> {t('investor.invest.backToAll')}
        </button>

        <PropertyPlaceholder name={opp.name} imageUrl={opp.imageUrl} className="h-56" />
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-[#78716C] flex items-center gap-1"><MapPin size={14} /> {opp.location}</span>
          <span className="text-[#78716C]">· {t('buyer.contract.beds', { count: opp.beds })} · {t('buyer.contract.baths', { count: opp.baths })} · {t('buyer.contract.sqm', { count: opp.sqm })}</span>
          <ShariaBadge />
          <OpportunityStatusBadge status={opp.status} riskNote={opp.riskNote} />
        </div>

        <div className="bg-white rounded-xl border border-[#E5E0D8] p-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium">{t('investor.invest.fundedOf', { funded: fmt(opp.investorFunding), target: fmt(opp.fundingTarget) })}</span>
            <span className="text-[#0F9A9A] font-bold">{fundedPct}%</span>
          </div>
          <div className="h-3 bg-[#E5E0D8] rounded-full overflow-hidden">
            <div className="h-full bg-[#0F9A9A] rounded-full" style={{ width: `${Math.min(fundedPct, 100)}%` }} />
          </div>
          <p className="text-sm text-[#78716C] mt-2">{t('investor.invest.investorsMin', { count: opp.investorCount, min: fmt(opp.minInvestment) })}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-[#E5E0D8] p-6 space-y-3 text-sm">
              <h2 className="text-lg font-semibold text-[#0F9A9A]">{t('investor.invest.propertyInfo')}</h2>
              <div className="flex justify-between"><span className="text-[#78716C]">{t('investor.invest.annualReturn')}</span><span className="font-bold text-[#16A34A]">{opp.annualReturn}%</span></div>
              <div className="flex justify-between"><span className="text-[#78716C]">{t('investor.invest.monthlyPer10k')}</span><span>{fmt(opp.monthlyPer10k)}</span></div>
              <div className="flex justify-between"><span className="text-[#78716C]">{t('investor.invest.homeBuyer')}</span><span className="font-medium">{opp.buyerName}</span></div>
              <div className="flex justify-between"><span className="text-[#78716C]">{t('investor.invest.buyerOwnership')}</span><span className="font-medium text-[#0D7C7C]">{opp.buyerOwnership}%</span></div>
            </div>
            {opp.ejar && (
              <div className="bg-white rounded-xl border border-[#E5E0D8] p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-[#0F9A9A]">{t('investor.invest.occupancyInfo')}</h2>
                  <EjarBadge />
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between"><span className="text-[#78716C]">{t('investor.invest.occupant')}</span><span>{opp.ejar.occupantName}</span></div>
                  <div className="flex justify-between"><span className="text-[#78716C]">{t('investor.invest.usageRent')}</span><span className="font-medium">{fmt(opp.ejar.usageRentAmount)}{t('perMonth')}</span></div>
                  <div className="flex justify-between"><span className="text-[#78716C]">{t('investor.invest.ejarRef')}</span><span className="font-mono text-xs">{opp.ejar.ejarRef}</span></div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl border border-[#E5E0D8] p-6">
            <h2 className="text-lg font-semibold text-[#0F9A9A] mb-4">{t('investor.invest.returnCalculator')}</h2>
            <input type="range" min={opp.minInvestment} max={500000} step={1000} value={investAmount} onChange={(e) => setInvestAmount(Number(e.target.value))} className="w-full accent-[#0D7C7C]" />
            <p className="text-2xl font-bold text-[#0D7C7C] mt-2">{fmt(investAmount)}</p>
            <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
              <div className="p-3 bg-[#FAF7F2] rounded-lg"><p className="text-[#78716C] text-xs">{t('investor.dashboard.monthly')}</p><p className="text-lg font-bold text-[#16A34A]">{fmt(preview.monthly)}</p></div>
              <div className="p-3 bg-[#FAF7F2] rounded-lg"><p className="text-[#78716C] text-xs">{t('investor.dashboard.share')}</p><p className="text-lg font-bold">{preview.share}%</p></div>
            </div>
            <button
              type="button"
              onClick={() => setStep('amount')}
              className="w-full mt-6 py-3.5 bg-[#0D7C7C] text-white font-semibold rounded-xl hover:bg-[#0F9A9A] transition-colors flex items-center justify-center gap-2"
            >
              {t('investor.invest.startInvestment')} <ArrowRight size={18} className={locale === 'ar' ? 'rotate-180' : ''} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A1A]">{t('investor.opportunities.title')}</h1>
          <p className="text-sm text-[#78716C] mt-1">{t('investor.opportunities.subtitle', { min: fmt(5000) })}</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0D7C7C]/5 border border-[#0D7C7C]/10 text-sm">
          <Users size={16} className="text-[#0D7C7C]" />
          <span>{t('investor.opportunities.openCount', { count: openCount })}</span>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-sm text-[#0F9A9A] flex items-start gap-2">
        <Shield size={16} className="flex-shrink-0 mt-0.5" />
        <span>{t('investor.opportunities.shariaNote')}</span>
      </div>

      {hasHeaderFilters && (
        <div className="flex flex-wrap items-center gap-2 px-4 py-3 rounded-xl bg-[#E6F4F4] border border-[#0D7C7C]/20">
          <span className="text-xs font-semibold text-[#0D7C7C] uppercase tracking-wide">{t('investor.opportunities.headerSearch')}</span>
          {headerSearch.city && (
            <span className="text-xs px-2.5 py-1 rounded-full bg-white border border-[#0D7C7C]/20 text-[#222222]">
              {getSearchCityLabel(t, headerSearch.city)}
            </span>
          )}
          {headerSearch.maxBudget != null && (
            <span className="text-xs px-2.5 py-1 rounded-full bg-white border border-[#0D7C7C]/20 text-[#222222]">
              {getSearchBudgetLabel(t, headerSearch.maxBudget)}
            </span>
          )}
          {headerSearch.minShare != null && (
            <span className="text-xs px-2.5 py-1 rounded-full bg-white border border-[#0D7C7C]/20 text-[#222222]">
              {t('investor.opportunities.shareFilter', { pct: headerSearch.minShare })}
            </span>
          )}
          <span className="text-xs text-[#717171]">
            · {filtered.length === 1 ? t('investor.opportunities.results', { count: filtered.length }) : t('investor.opportunities.resultsPlural', { count: filtered.length })}
          </span>
          {onClearHeaderSearch && (
            <button
              type="button"
              onClick={onClearHeaderSearch}
              className="ml-auto text-xs font-medium text-[#0D7C7C] hover:underline"
            >
              {t('investor.opportunities.clearFilters')}
            </button>
          )}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#78716C]" />
          <input
            type="text"
            placeholder={t('investor.opportunities.searchPlaceholder')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-[#E5E0D8] rounded-xl focus:outline-none focus:border-[#0F9A9A] text-sm"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {[
            { id: 'all', label: t('investor.opportunities.filterAll') },
            { id: 'open', label: t('investor.opportunities.filterOpen') },
            { id: 'villa', label: t('investor.opportunities.filterVillas') },
            { id: 'apartment', label: t('investor.opportunities.filterApartments') },
          ].map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                filter === f.id ? 'bg-[#0D7C7C] text-white' : 'bg-white border border-[#E5E0D8] text-[#78716C] hover:border-[#0F9A9A]'
              }`}
            >
              {f.id === 'all' && <Filter size={14} />}
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((o) => (
          <OpportunityCard key={o.id} opp={o} onSelect={onSelect} listingSuspended={listingSuspended} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-[#78716C]">
          <Building2 size={40} className="mx-auto mb-3 opacity-40" />
          <p>{t('investor.opportunityCard.noMatch')}</p>
        </div>
      )}
    </div>
  );
}

function InvestorDistributions({ impact, highlightImpact }) {
  const t = useT();
  const impactRef = useRef(null);
  const daysUntil = 17;
  const hasPause = Boolean(impact);

  const statusLabel = (status) => {
    const map = { Paid: t('status.paid'), Scheduled: t('status.scheduled'), Paused: t('status.paused') };
    return map[status] || status;
  };

  useEffect(() => {
    if (highlightImpact && impactRef.current) {
      impactRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [highlightImpact]);

  const statusStyles = {
    Paid: 'text-[#16A34A]',
    Scheduled: 'text-[#0D7C7C]',
    Paused: 'text-[#D97706]',
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1A1A1A]">{t('investor.distributions.title')}</h1>
        <p className="text-sm text-[#78716C] mt-1">{t('investor.distributions.subtitle')}</p>
      </div>

      {hasPause ? (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-start gap-3">
            <AlertCircle size={20} className="text-[#D97706] flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-[#92400E]">{t('investor.overdue.nextCycleReduced', { property: impact.property })}</p>
              <p className="text-sm text-[#78716C] mt-0.5">
                {t('investor.overdue.expecting', { amount: fmt(impact.activeMonthly), normal: fmt(impact.normalMonthly) })}
              </p>
            </div>
          </div>
          <span className="text-sm font-semibold text-[#D97706] tabular-nums flex-shrink-0">
            {t('investor.overdue.pausedAmount', { amount: fmt(impact.pausedMonthly) })}
          </span>
        </div>
      ) : (
        <div className="bg-[#0D7C7C] text-white rounded-xl p-4 flex items-center gap-3">
          <Clock size={20} />
          <span className="font-medium">{t('investor.distributions.nextIn', { days: daysUntil })}</span>
        </div>
      )}

      {hasPause && (
        <section
          id="overdue-impact"
          ref={impactRef}
          className="rounded-2xl border border-amber-200 bg-white overflow-hidden shadow-sm"
        >
          <div className="px-5 py-4 border-b border-amber-100 bg-amber-50/60">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#D97706]">{t('investor.overdue.impactSection')}</p>
            <h2 className="font-semibold text-[#1A1A1A] mt-1">{t('investor.overdue.julyCycle')}</h2>
          </div>
          <InvestorOverdueImpactPanel impact={impact} compact />
          <div className="px-5 pb-5">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[#78716C] text-start">
                  <th className="pb-2 font-medium">{t('investor.distributions.property')}</th>
                  <th className="pb-2 font-medium">{t('investor.distributions.date')}</th>
                  <th className="pb-2 font-medium">{t('investor.distributions.amount')}</th>
                  <th className="pb-2 font-medium">{t('investor.distributions.status')}</th>
                </tr>
              </thead>
              <tbody>
                {impact.upcoming.map((row) => (
                  <tr key={row.property} className={`border-t border-[#E5E0D8] ${row.status === 'Paused' ? 'bg-amber-50/50' : ''}`}>
                    <td className="py-3 font-medium">{row.property}</td>
                    <td className="py-3 text-[#78716C]">{row.date}</td>
                    <td className="py-3 tabular-nums">{fmt(row.amount)}</td>
                    <td className="py-3">
                      <span className={`font-medium ${statusStyles[row.status] || ''}`}>
                        {statusLabel(row.status)}
                        {row.reason && <span className="block text-xs font-normal text-[#78716C] mt-0.5">{row.reason}</span>}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <div className="bg-white rounded-xl border border-[#E5E0D8] p-6">
        <h2 className="text-lg font-semibold text-[#0F9A9A] mb-1">{t('investor.overdue.monthlyTotals')}</h2>
        {hasPause && (
          <p className="text-xs text-[#78716C] mb-4">{t('investor.overdue.julyProjected', { amount: fmt(impact.activeMonthly) })}</p>
        )}
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={MONTHLY_DISTRIBUTIONS}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E0D8" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#78716C' }} />
            <YAxis tick={{ fontSize: 12, fill: '#78716C' }} tickFormatter={(v) => fmt(v)} />
            <Tooltip formatter={(v) => fmt(v)} />
            <Bar dataKey="total" fill="#0D7C7C" radius={[4, 4, 0, 0]}>
              {MONTHLY_DISTRIBUTIONS.map((entry, index) => (
                <Cell key={`dist-${index}`} fill={entry.projected ? '#D97706' : '#0D7C7C'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-xl border border-[#E5E0D8] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#E5E0D8]">
          <h2 className="text-lg font-semibold text-[#0F9A9A]">{t('investor.distributions.history')}</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#0A6464] text-white">
              <th className="px-4 py-3 text-start">{t('investor.distributions.date')}</th>
              <th className="px-4 py-3 text-start">{t('investor.distributions.property')}</th>
              <th className="px-4 py-3 text-start">{t('investor.distributions.amount')}</th>
              <th className="px-4 py-3 text-start">{t('investor.distributions.sharePct')}</th>
              <th className="px-4 py-3 text-start">{t('investor.distributions.status')}</th>
            </tr>
          </thead>
          <tbody>
            {DISTRIBUTIONS.map((d, i) => (
              <tr key={i} className="border-b border-[#E5E0D8] hover:bg-[#FAF7F2]">
                <td className="px-4 py-3">{d.date}</td>
                <td className="px-4 py-3">{d.property}</td>
                <td className="px-4 py-3 font-medium">{fmt(d.amount)}</td>
                <td className="px-4 py-3">{d.share}%</td>
                <td className={`px-4 py-3 ${statusStyles[d.status] || 'text-[#16A34A]'}`}>{statusLabel(d.status)} ✓</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function InvestorSecondary({ onList, activeListing, listingSuspended }) {
  const t = useT();
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#1A1A1A]">{t('investor.secondary.title')}</h1>

      {listingSuspended && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
          <AlertCircle size={20} className="text-[#C0504D] flex-shrink-0" />
          <div>
            <p className="font-semibold text-[#C0504D]">{t('investor.secondary.listingPaused')}</p>
            <p className="text-sm text-[#78716C] mt-1">{t('investor.secondary.listingPausedDesc')}</p>
          </div>
        </div>
      )}

      <div>
        <h2 className="text-lg font-semibold text-[#0F9A9A] mb-4">{t('investor.secondary.myPositions')}</h2>
        <div className="space-y-3">
          {INVESTOR.portfolio.map((p, i) => {
            const isJeddah = p.name.includes('Jeddah');
            const suspended = isJeddah && listingSuspended;
            return (
              <div key={i} className={`bg-white rounded-xl border p-4 flex justify-between items-center hover:shadow-sm transition-shadow ${suspended ? 'border-red-200 bg-red-50/30' : 'border-[#E5E0D8]'}`}>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{p.name}</p>
                    {suspended && <span className="text-xs px-2 py-0.5 rounded bg-red-100 text-[#C0504D]">{t('investor.secondary.suspended')}</span>}
                  </div>
                  <p className="text-sm text-[#78716C]">{t('investor.secondary.shareIncome', { share: p.share, income: fmt(p.monthly) })}</p>
                </div>
                <button
                  onClick={() => !suspended && onList(p)}
                  disabled={suspended}
                  className={`px-4 py-2 border rounded-lg text-sm transition-colors ${
                    suspended
                      ? 'border-[#E5E0D8] text-[#78716C] cursor-not-allowed'
                      : 'border-[#0D7C7C] text-[#0D7C7C] hover:bg-[#0D7C7C] hover:text-white'
                  }`}
                >
                  {t('investor.secondary.listForSale')}
                </button>
              </div>
            );
          })}
          {activeListing && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
              <CircleCheck size={20} className="text-[#16A34A]" />
              <span className="text-sm">{t('investor.secondary.listedAt', { name: 'Riyadh Heights', share: '1.0', price: fmt(18500) })}</span>
            </div>
          )}
          {listingSuspended && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3 opacity-75">
              <AlertCircle size={20} className="text-[#C0504D]" />
              <span className="text-sm line-through">{t('investor.secondary.listedSuspended', { name: 'Jeddah Corniche', share: '0.5', price: fmt(8000) })}</span>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#E5E0D8] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#E5E0D8]">
          <h2 className="text-lg font-semibold text-[#0F9A9A]">{t('investor.secondary.browseListings')}</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#0A6464] text-white">
              <th className="px-4 py-3 text-start">{t('investor.secondary.property')}</th>
              <th className="px-4 py-3 text-start">{t('investor.secondary.share')}</th>
              <th className="px-4 py-3 text-start">{t('investor.secondary.askingPrice')}</th>
              <th className="px-4 py-3 text-start">{t('investor.secondary.monthlyIncome')}</th>
              <th className="px-4 py-3 text-start">{t('investor.secondary.action')}</th>
            </tr>
          </thead>
          <tbody>
            {SECONDARY_LISTINGS.map((l, i) => (
              <tr key={i} className="border-b border-[#E5E0D8] hover:bg-[#FAF7F2]">
                <td className="px-4 py-3">{l.property}</td>
                <td className="px-4 py-3">{l.share}</td>
                <td className="px-4 py-3 font-medium">{fmt(l.price)}</td>
                <td className="px-4 py-3">{fmt(l.income)}{t('perMonth')}</td>
                <td className="px-4 py-3">
                  <button className="px-3 py-1.5 bg-[#0D7C7C] text-white text-xs rounded-lg hover:bg-[#0F9A9A] transition-colors">{t('investor.secondary.buyNow')}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function InvestorWallet({ balance, transactions, onTopUp, onWithdraw }) {
  const t = useT();
  return (
    <div className="space-y-6">
      <PageHeader title={t('investor.wallet.title')} subtitle={t('investor.wallet.subtitle')} />

      <WalletBalanceCard
        balance={balance}
        onTopUp={onTopUp}
        onWithdraw={onWithdraw}
        subtitle={t('investor.wallet.lastDistribution')}
      />

      <div className="bg-white rounded-2xl border border-[#E5E0D8] p-5 flex items-start gap-3 shadow-sm">
        <Banknote size={20} className="text-[#0F9A9A] flex-shrink-0 mt-0.5" />
        <p className="text-sm text-[#78716C] leading-relaxed">{t('investor.wallet.explainer')}</p>
      </div>

      <div className="bg-white rounded-2xl border border-[#E5E0D8] overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-[#E5E0D8]">
          <h2 className="text-base font-semibold text-[#1A1A1A]">{t('investor.wallet.history')}</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#FAF7F2] text-[#78716C]">
              <th className="px-4 py-3 text-start font-medium">{t('investor.wallet.date')}</th>
              <th className="px-4 py-3 text-start font-medium">{t('investor.wallet.description')}</th>
              <th className="px-4 py-3 text-start font-medium">{t('investor.wallet.amount')}</th>
              <th className="px-4 py-3 text-start font-medium">{t('investor.wallet.balance')}</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t, i) => (
              <tr key={i} className="border-b border-[#E5E0D8] hover:bg-[#FAF7F2]">
                <td className="px-4 py-3">{t.date}</td>
                <td className="px-4 py-3">{t.desc}</td>
                <td className={`px-4 py-3 font-medium ${t.amount < 0 ? 'text-[#C0504D]' : 'text-[#16A34A]'}`}>
                  {t.amount < 0 ? '−' : '+'}{fmt(Math.abs(t.amount))}
                </td>
                <td className="px-4 py-3">{fmt(t.balance)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// ADMIN VIEW
// ═══════════════════════════════════════════════════════════════════

function AdminDashboard({ delinquentContracts, properties = [] }) {
  const t = useT();
  const listedCount = properties.filter((p) => p.buyer).length;
  return (
    <div className="space-y-6">
      <PageHeader
        title={t('admin.dashboard.title')}
        subtitle={t('admin.dashboard.subtitle')}
      />

      {delinquentContracts.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
          <h2 className="font-semibold text-[#C0504D] flex items-center gap-2 mb-3">
            <AlertCircle size={18} /> {t('admin.dashboard.contractsAtRisk', { count: delinquentContracts.length })}
          </h2>
          {delinquentContracts.map((d, i) => (
            <div key={i} className="flex flex-wrap justify-between items-center gap-2 text-sm py-2 border-b border-red-100 last:border-0">
              <span><strong>{d.buyer}</strong> — {d.property}</span>
              <span className="text-[#C0504D]">{t('admin.dashboard.overdue', { days: d.overdue })} · {fmt(d.amount)}</span>
              <span className="font-mono text-xs text-[#78716C]">{d.contractId}</span>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard label={t('admin.dashboard.activeProperties')} value={String(listedCount)} icon={Building2} />
        <StatCard label={t('admin.dashboard.capitalDeployed')} value={fmt(3200000)} icon={Briefcase} />
        <StatCard label={t('admin.dashboard.totalUsers')} value="147" icon={Users} />
        <StatCard label={t('admin.dashboard.distributionsMonth')} value={fmt(14760)} icon={TrendingUp} />
        <StatCard label={t('admin.dashboard.pendingKyc')} value="6" icon={Shield} accent="bg-amber-50" />
        <StatCard label={t('admin.dashboard.delinquentContracts')} value={String(delinquentContracts.length)} icon={AlertCircle} accent="bg-red-50" />
      </div>

      <SectionCard title={t('admin.dashboard.distributionEngine')}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-[#78716C]">{t('admin.dashboard.lastRun')}</span><span>1 June 2025 — 09:02 AM</span></div>
            <div className="flex justify-between"><span className="text-[#78716C]">{t('admin.dashboard.status')}</span><span className="text-[#16A34A] font-medium">{t('admin.dashboard.completed')}</span></div>
            <div className="flex justify-between"><span className="text-[#78716C]">{t('admin.dashboard.totalDistributed')}</span><span className="font-medium">{t('admin.dashboard.toInvestors', { amount: fmt(14760), count: 47 })}</span></div>
            <div className="flex justify-between"><span className="text-[#78716C]">{t('admin.dashboard.nextRun')}</span><span>1 July 2025</span></div>
          </div>
          <div className="flex items-center">
            <button disabled className="px-6 py-3 bg-[#E5E0D8] text-[#78716C] rounded-xl cursor-not-allowed text-sm">
              {t('admin.dashboard.runManual')}
            </button>
            <p className="text-xs text-[#78716C] ms-3">{t('admin.dashboard.onlyFirstOfMonth')}</p>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

function AdminDistributions({ properties, buyerContracts, delinquencyImpact }) {
  const t = useT();
  const daysUntil = 17;
  const propertyRows = getAdminPropertyDistributions(properties, buyerContracts);
  const lastRun = ADMIN_DISTRIBUTION_RUNS[0];
  const julyProjected = propertyRows.reduce((sum, row) => sum + row.julyAmount, 0);
  const julyWithheld = propertyRows.reduce((sum, row) => sum + (row.status === 'Paused' ? row.poolAmount : 0), 0);
  const hasHold = Boolean(delinquencyImpact);

  const statusLabel = (status) => {
    const map = { Paid: t('status.paid'), Scheduled: t('status.scheduled'), Paused: t('status.paused') };
    return map[status] || status;
  };

  const statusStyles = {
    Scheduled: 'bg-teal-50 text-[#0D7C7C] border-teal-100',
    Paused: 'bg-amber-50 text-[#D97706] border-amber-200',
    Paid: 'bg-green-50 text-[#16A34A] border-green-100',
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('admin.distributions.title')}
        subtitle={t('admin.distributions.subtitle')}
      />

      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0A6464] via-[#0D7C7C] to-[#0F9A9A] text-white p-6 md:p-8 shadow-lg">
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, #E8DCC4 0%, transparent 50%), radial-gradient(circle at 80% 20%, #fff 0%, transparent 40%)' }} />
        <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/70">{t('admin.distributions.nextRun')}</p>
            <p className="text-3xl font-bold mt-1 tracking-tight">{t('admin.distributions.nextRunDate')}</p>
            <p className="text-sm text-white/80 mt-2 flex items-center gap-2">
              <Clock size={16} />
              {t('admin.distributions.daysUntil', { days: daysUntil })}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 px-4 py-3 min-w-[140px]">
              <p className="text-[11px] uppercase tracking-wide text-white/70">{t('admin.distributions.engineStatus')}</p>
              <p className="font-semibold mt-0.5 flex items-center gap-1.5">
                <CircleCheck size={16} />
                {hasHold ? t('admin.distributions.engineStatusPaused') : t('admin.distributions.engineStatus')}
              </p>
            </div>
            <div className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 px-4 py-3 min-w-[140px]">
              <p className="text-[11px] uppercase tracking-wide text-white/70">{t('admin.distributions.julyProjected')}</p>
              <p className="font-semibold mt-0.5 tabular-nums">{fmt(julyProjected)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label={t('admin.distributions.lastRunTotal')} value={fmt(lastRun.amount)} sub={lastRun.date} icon={Receipt} />
        <StatCard label={t('admin.distributions.julyProjected')} value={fmt(julyProjected)} sub={hasHold ? t('admin.distributions.projectedBadge') : undefined} icon={TrendingUp} accent={hasHold ? 'bg-amber-50' : undefined} />
        <StatCard label={t('admin.distributions.investorsPaid')} value={String(lastRun.investors)} sub={t('admin.distributions.toInvestors', { amount: fmt(lastRun.amount), count: lastRun.investors })} icon={Users} />
        <StatCard
          label={t('admin.distributions.withheld')}
          value={hasHold ? fmt(julyWithheld) : fmt(0)}
          sub={hasHold ? t('admin.distributions.withheldSub') : '—'}
          icon={AlertCircle}
          accent={hasHold ? 'bg-amber-50' : 'bg-[#E6F4F4]'}
        />
      </div>

      {hasHold && (
        <div className="rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 to-white p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-amber-100 text-[#D97706] flex-shrink-0">
              <AlertCircle size={20} />
            </div>
            <div>
              <p className="font-semibold text-[#92400E]">{t('admin.distributions.delinquencyTitle')}</p>
              <p className="text-sm text-[#78716C] mt-1">
                {t('admin.distributions.delinquencyBody', {
                  buyer: delinquencyImpact.buyerName,
                  days: delinquencyImpact.daysOverdue,
                  property: delinquencyImpact.property,
                })}
              </p>
            </div>
          </div>
          <span className="text-sm font-bold text-[#D97706] tabular-nums flex-shrink-0 px-4 py-2 rounded-xl bg-amber-100/80">
            {t('admin.distributions.delinquencyWithheld', { amount: fmt(julyWithheld) })}
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        <SectionCard title={t('admin.distributions.engineTitle')} className="xl:col-span-2">
          <div className="space-y-4 text-sm">
            <div className="flex justify-between gap-4 py-2 border-b border-[#E5E0D8]">
              <span className="text-[#78716C]">{t('admin.distributions.lastRun')}</span>
              <span className="font-medium text-end">{t('admin.distributions.lastRunValue')}</span>
            </div>
            <div className="flex justify-between gap-4 py-2 border-b border-[#E5E0D8]">
              <span className="text-[#78716C]">{t('admin.distributions.runStatus')}</span>
              <span className="text-[#16A34A] font-medium">{t('admin.distributions.completed')}</span>
            </div>
            <div className="flex justify-between gap-4 py-2 border-b border-[#E5E0D8]">
              <span className="text-[#78716C]">{t('admin.distributions.totalDistributed')}</span>
              <span className="font-medium text-end">{t('admin.distributions.toInvestors', { amount: fmt(lastRun.amount), count: lastRun.investors })}</span>
            </div>
            <div className="flex justify-between gap-4 py-2">
              <span className="text-[#78716C]">{t('admin.distributions.nextScheduled')}</span>
              <span className="font-medium">{t('admin.distributions.nextRunDate')}</span>
            </div>
            <p className="text-xs text-[#78716C] pt-2">{t('admin.distributions.autoTrigger')}</p>
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-3">
              <button disabled type="button" className="px-5 py-2.5 bg-[#E5E0D8] text-[#78716C] rounded-xl cursor-not-allowed text-sm font-medium">
                {t('admin.distributions.runManual')}
              </button>
              <p className="text-xs text-[#78716C]">{t('admin.distributions.onlyFirstOfMonth')}</p>
            </div>
          </div>
        </SectionCard>

        <div className="xl:col-span-3 bg-white rounded-2xl border border-[#E5E0D8] p-6 shadow-sm">
          <div className="mb-4">
            <h2 className="tamlk-section-title">{t('admin.distributions.platformTrend')}</h2>
            {hasHold && <p className="text-xs text-[#78716C] mt-1">{t('admin.distributions.platformTrendNote')}</p>}
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={ADMIN_MONTHLY_PLATFORM}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E0D8" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#78716C' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#78716C' }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} axisLine={false} tickLine={false} width={42} />
              <Tooltip formatter={(v) => fmt(v)} />
              <Bar dataKey="total" radius={[6, 6, 0, 0]} maxBarSize={48}>
                {ADMIN_MONTHLY_PLATFORM.map((entry, index) => (
                  <Cell key={`admin-dist-${index}`} fill={entry.projected ? '#D97706' : '#0D7C7C'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#E5E0D8] overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-[#E5E0D8] bg-[#FAF7F2]/60">
          <h2 className="tamlk-section-title">{t('admin.distributions.upcomingCycle')}</h2>
          <p className="text-xs text-[#78716C] mt-1">{t('admin.distributions.upcomingNote')}</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[720px]">
            <thead>
              <tr className="bg-[#0A6464] text-white">
                <th className="px-4 py-3 text-start font-medium">{t('admin.distributions.property')}</th>
                <th className="px-4 py-3 text-start font-medium">{t('admin.distributions.buyer')}</th>
                <th className="px-4 py-3 text-start font-medium">{t('admin.distributions.ejarRent')}</th>
                <th className="px-4 py-3 text-start font-medium">{t('admin.distributions.investorPool')}</th>
                <th className="px-4 py-3 text-start font-medium">{t('admin.distributions.poolPayout')}</th>
                <th className="px-4 py-3 text-start font-medium">{t('admin.distributions.investors')}</th>
                <th className="px-4 py-3 text-start font-medium">{t('admin.distributions.status')}</th>
              </tr>
            </thead>
            <tbody>
              {propertyRows.map((row) => (
                <tr key={row.property} className={`border-b border-[#E5E0D8] hover:bg-[#FAF7F2] transition-colors ${row.status === 'Paused' ? 'bg-amber-50/40' : ''}`}>
                  <td className="px-4 py-3.5">
                    <p className="font-medium text-[#1A1A1A]">{row.property}</p>
                    {row.ejarRef && <p className="text-[10px] text-[#78716C] font-mono mt-0.5">{row.ejarRef}</p>}
                  </td>
                  <td className="px-4 py-3.5 text-[#78716C]">{row.buyer}</td>
                  <td className="px-4 py-3.5 tabular-nums">{fmt(row.ejarRent)}</td>
                  <td className="px-4 py-3.5 tabular-nums">{row.investorPool}%</td>
                  <td className="px-4 py-3.5 tabular-nums font-medium">
                    {row.status === 'Paused' ? (
                      <span className="text-[#D97706] line-through decoration-amber-300">{fmt(row.poolAmount)}</span>
                    ) : (
                      fmt(row.julyAmount)
                    )}
                  </td>
                  <td className="px-4 py-3.5">{row.investors}</td>
                  <td className="px-4 py-3.5">
                    <span className={`inline-flex flex-col px-2.5 py-1 rounded-lg text-xs font-medium border ${statusStyles[row.status] || ''}`}>
                      {statusLabel(row.status)}
                      {row.daysOverdue != null && (
                        <span className="font-normal text-[#78716C] mt-0.5">{t('admin.distributions.overdueReason', { days: row.daysOverdue })}</span>
                      )}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#E5E0D8] overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-[#E5E0D8]">
          <h2 className="tamlk-section-title">{t('admin.distributions.runHistory')}</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[#78716C] border-b border-[#E5E0D8]">
                <th className="px-6 py-3 text-start font-medium">{t('admin.distributions.runDate')}</th>
                <th className="px-4 py-3 text-start font-medium">{t('admin.distributions.runAmount')}</th>
                <th className="px-4 py-3 text-start font-medium">{t('admin.distributions.runProperties')}</th>
                <th className="px-4 py-3 text-start font-medium">{t('admin.distributions.runInvestors')}</th>
                <th className="px-4 py-3 text-start font-medium">{t('admin.distributions.runTrigger')}</th>
                <th className="px-4 py-3 text-start font-medium">{t('admin.distributions.status')}</th>
              </tr>
            </thead>
            <tbody>
              {ADMIN_DISTRIBUTION_RUNS.map((run) => (
                <tr key={run.id} className="border-b border-[#E5E0D8] last:border-0 hover:bg-[#FAF7F2] transition-colors">
                  <td className="px-6 py-3.5">
                    <p className="font-medium">{run.date}</p>
                    <p className="text-xs text-[#78716C]">{run.time}</p>
                  </td>
                  <td className="px-4 py-3.5 tabular-nums font-medium text-[#0D7C7C]">{fmt(run.amount)}</td>
                  <td className="px-4 py-3.5">{run.properties}</td>
                  <td className="px-4 py-3.5">{run.investors}</td>
                  <td className="px-4 py-3.5">
                    <span className="px-2 py-0.5 rounded text-xs bg-[#E6F4F4] text-[#0D7C7C]">
                      {run.trigger === 'auto' ? t('admin.distributions.triggerAuto') : t('admin.distributions.triggerManual')}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-[#16A34A] font-medium flex items-center gap-1">
                      <CircleCheck size={14} /> {t('admin.distributions.completed')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AdminKYC({ kycItems, onApprove, onReject }) {
  const t = useT();
  const idTypeLabel = (idType) => (idType === 'iqama' ? t('admin.kyc.iqama') : t('admin.kyc.nationalId'));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#1A1A1A]">{t('admin.kyc.title')}</h1>

      <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-900">
        {t('admin.kyc.nafathNote')}
      </div>

      <div className="bg-white rounded-xl border border-[#E5E0D8] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#0A6464] text-white">
              <th className="px-4 py-3 text-start">{t('admin.kyc.user')}</th>
              <th className="px-4 py-3 text-start">{t('admin.kyc.type')}</th>
              <th className="px-4 py-3 text-start">{t('admin.kyc.verification')}</th>
              <th className="px-4 py-3 text-start">{t('admin.kyc.idDocument')}</th>
              <th className="px-4 py-3 text-start">{t('admin.kyc.submitted')}</th>
              <th className="px-4 py-3 text-start">{t('admin.kyc.documents')}</th>
              <th className="px-4 py-3 text-start">{t('admin.kyc.action')}</th>
            </tr>
          </thead>
          <tbody>
            {kycItems.map((item) => (
              <tr
                key={item.id}
                className={`border-b border-[#E5E0D8] transition-colors ${
                  item.status === 'approved' ? 'bg-green-50' :
                  item.status === 'rejected' ? 'bg-red-50' : 'hover:bg-[#FAF7F2]'
                }`}
              >
                <td className="px-4 py-3 font-medium">{item.user}</td>
                <td className="px-4 py-3">{item.type}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-[#0F9A9A]">
                    {t('admin.kyc.nafath')}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 rounded text-xs font-medium bg-[#FAF7F2] text-[#1A1A1A]">
                    {idTypeLabel(item.idType)}
                  </span>
                </td>
                <td className="px-4 py-3">{item.submitted}</td>
                <td className="px-4 py-3">{item.docs}</td>
                <td className="px-4 py-3">
                  {item.status === 'approved' ? (
                    <span className="text-[#16A34A] font-medium">{t('admin.kyc.approved')}</span>
                  ) : item.status === 'rejected' ? (
                    <span className="text-[#C0504D] font-medium">{t('admin.kyc.rejected')}</span>
                  ) : (
                    <div className="flex gap-2">
                      <button onClick={() => onApprove(item.id)} className="px-3 py-1 bg-[#16A34A] text-white text-xs rounded hover:bg-green-700 transition-colors">{t('admin.kyc.approve')}</button>
                      <button onClick={() => onReject(item.id)} className="px-3 py-1 bg-[#C0504D] text-white text-xs rounded hover:bg-red-700 transition-colors">{t('admin.kyc.reject')}</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AdminProperties({ properties, onAdd }) {
  const t = useT();
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: '', address: '', value: '', min: '', ret: '' });

  const listedProperties = properties.filter((p) => p.buyer);
  const awaitingProperties = properties.filter((p) => !p.buyer);

  const fieldLabels = {
    name: t('admin.properties.fieldName'),
    address: t('admin.properties.fieldAddress'),
    value: t('admin.properties.fieldValue'),
    min: t('admin.properties.fieldMin'),
    ret: t('admin.properties.fieldReturn'),
  };

  const handleSubmit = () => {
    if (form.name) {
      onAdd({
        name: form.name,
        value: Number(form.value) || 1000000,
        funded: 0,
        investors: 0,
        buyerOwn: null,
        status: 'Funding',
      });
      setShowAdd(false);
      setForm({ name: '', address: '', value: '', min: '', ret: '' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#1A1A1A]">{t('admin.properties.title')}</h1>
        <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 px-4 py-2 bg-[#0D7C7C] text-white rounded-lg hover:bg-[#0F9A9A] transition-colors">
          <Plus size={16} /> {t('admin.properties.addProperty')}
        </button>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-900">
        {t('admin.properties.buyerNote')}
      </div>

      <div>
        <h2 className="text-lg font-semibold text-[#1A1A1A] mb-3">{t('admin.properties.listedProperties')}</h2>
        <div className="bg-white rounded-xl border border-[#E5E0D8] overflow-hidden">
          {listedProperties.length === 0 ? (
            <p className="px-4 py-8 text-sm text-[#78716C] text-center">{t('admin.properties.noListed')}</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#0A6464] text-white">
                  <th className="px-4 py-3 text-start">{t('admin.properties.property')}</th>
                  <th className="px-4 py-3 text-start">{t('admin.properties.value')}</th>
                  <th className="px-4 py-3 text-start">{t('admin.properties.funded')}</th>
                  <th className="px-4 py-3 text-start">{t('admin.properties.investors')}</th>
                  <th className="px-4 py-3 text-start">{t('admin.properties.buyer')}</th>
                  <th className="px-4 py-3 text-start">{t('admin.properties.buyerOwn')}</th>
                  <th className="px-4 py-3 text-start">{t('admin.properties.status')}</th>
                </tr>
              </thead>
              <tbody>
                {listedProperties.map((p, i) => (
                  <tr key={i} className={`border-b border-[#E5E0D8] hover:bg-[#FAF7F2] ${p.status === 'Delinquent' ? 'bg-red-50/40' : ''}`}>
                    <td className="px-4 py-3 font-medium">{p.name}</td>
                    <td className="px-4 py-3">{fmt(p.value)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-[#E5E0D8] rounded-full overflow-hidden">
                          <div className="h-full bg-[#0F9A9A] rounded-full" style={{ width: `${p.funded}%` }} />
                        </div>
                        <span>{p.funded}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">{p.investors}</td>
                    <td className="px-4 py-3 text-sm">{p.buyer}</td>
                    <td className="px-4 py-3">{p.buyerOwn != null ? `${p.buyerOwn}%` : '—'}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        p.status === 'Active' ? 'bg-green-50 text-[#16A34A]' :
                        p.status === 'Delinquent' ? 'bg-red-50 text-[#C0504D]' :
                        'bg-amber-50 text-[#D97706]'
                      }`}>{p.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {awaitingProperties.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-[#1A1A1A] mb-1">{t('admin.properties.awaitingBuyerSection')}</h2>
          <p className="text-sm text-[#78716C] mb-3">{t('admin.properties.awaitingBuyerNote')}</p>
          <div className="bg-white rounded-xl border border-[#E5E0D8] overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#78716C] text-white">
                  <th className="px-4 py-3 text-start">{t('admin.properties.property')}</th>
                  <th className="px-4 py-3 text-start">{t('admin.properties.value')}</th>
                  <th className="px-4 py-3 text-start">{t('admin.properties.status')}</th>
                </tr>
              </thead>
              <tbody>
                {awaitingProperties.map((p, i) => (
                  <tr key={i} className="border-b border-[#E5E0D8] hover:bg-[#FAF7F2]">
                    <td className="px-4 py-3 font-medium">{p.name}</td>
                    <td className="px-4 py-3">{fmt(p.value)}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded text-xs font-medium bg-amber-50 text-[#D97706]">{p.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Modal open={showAdd} onClose={() => setShowAdd(false)} title={t('admin.properties.addModalTitle')}>
        <div className="space-y-4">
          {['name', 'address', 'value', 'min', 'ret'].map((field) => (
            <div key={field}>
              <label className="text-sm text-[#78716C]">{fieldLabels[field]}</label>
              <input
                className="w-full mt-1 px-3 py-2 border border-[#E5E0D8] rounded-lg focus:outline-none focus:border-[#0F9A9A]"
                value={form[field]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
              />
            </div>
          ))}
          <button onClick={handleSubmit} className="w-full py-2.5 bg-[#0D7C7C] text-white rounded-lg hover:bg-[#0F9A9A] transition-colors">{t('admin.properties.addBtn')}</button>
        </div>
      </Modal>
    </div>
  );
}

function AdminPlaceholder({ title }) {
  const t = useT();
  return (
    <div className="flex flex-col items-center justify-center py-20 text-[#78716C]">
      <BarChart3 size={48} className="mb-4 opacity-40" />
      <h2 className="text-xl font-semibold text-[#1A1A1A]">{title}</h2>
      <p className="mt-2">{t('admin.placeholder.demoNote')}</p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// LAYOUTS
// ═══════════════════════════════════════════════════════════════════


const INVESTOR_SHARE_OPTIONS = [
  { id: null, label: 'Any share', sub: 'All ownership sizes' },
  { id: 0.25, label: '0.25%+', sub: 'Micro co-ownership' },
  { id: 0.5, label: '0.5%+', sub: 'Small positions' },
  { id: 1, label: '1%+', sub: 'Meaningful stake' },
];

const matchOpportunityCity = (opp, cityId) => {
  if (!cityId) return true;
  const loc = opp.location.toLowerCase();
  if (cityId === 'riyadh') return loc.includes('riyadh');
  if (cityId === 'jeddah') return loc.includes('jeddah');
  if (cityId === 'khobar') return loc.includes('khobar');
  return true;
};

const shareAtMinInvestment = (opp) => (opp.minInvestment / opp.totalValue) * 100;

const filterOpportunitiesBySearch = (opportunities, search) => {
  const listable = opportunities.filter(isListableOpportunity);
  return listable.filter((o) => {
    if (search.city && !matchOpportunityCity(o, search.city)) return false;
    if (search.maxBudget != null && o.minInvestment > search.maxBudget) return false;
    if (search.minShare != null && shareAtMinInvestment(o) < search.minShare) return false;
    return true;
  });
};

function InvestorHeaderSearch({ filters, onChange, onSubmit }) {
  const t = useT();
  const [activePanel, setActivePanel] = useState(null);
  const searchRef = useRef(null);

  const cityOptions = SEARCH_CITY_OPTIONS;
  const budgetOptions = SEARCH_BUDGET_OPTIONS;
  const shareOptions = SEARCH_SHARE_OPTIONS;

  useEffect(() => {
    if (!activePanel) return undefined;
    const close = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) setActivePanel(null);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [activePanel]);

  const cityLabel = t(cityOptions.find((c) => c.id === filters.city)?.labelKey || 'search.anywhere');
  const budgetLabel = t(budgetOptions.find((b) => b.id === filters.maxBudget)?.labelKey || 'search.anyPrice');
  const shareLabel = filters.minShare != null ? `${filters.minShare}%+` : t('search.addShare');

  const segments = [
    { id: 'city', label: cityLabel, sub: filters.city ? t('search.city') : t('search.searchCities'), active: !!filters.city },
    { id: 'budget', label: budgetLabel, sub: filters.maxBudget != null ? t('search.budget') : t('search.addBudget'), active: filters.maxBudget != null },
    { id: 'share', label: shareLabel, sub: filters.minShare != null ? t('search.minOwnership') : t('search.ownershipPct'), active: filters.minShare != null },
  ];

  const pickCity = (id) => {
    onChange({ ...filters, city: id });
    setActivePanel(null);
  };

  const pickBudget = (id) => {
    onChange({ ...filters, maxBudget: id });
    setActivePanel(null);
  };

  const pickShare = (id) => {
    onChange({ ...filters, minShare: id });
    setActivePanel(null);
  };

  const handleSubmit = () => {
    setActivePanel(null);
    onSubmit();
  };

  const panelContent = {
    city: (
      <ul className="py-2">
        {cityOptions.map((c) => (
          <li key={c.id || 'any'}>
            <button
              type="button"
              onClick={() => pickCity(c.id)}
              className={`w-full text-left px-4 py-2.5 hover:bg-[#F7F7F7] transition-colors ${filters.city === c.id ? 'bg-[#E6F4F4]' : ''}`}
            >
              <p className="text-sm font-semibold text-[#222222]">{t(c.labelKey)}</p>
              <p className="text-xs text-[#717171]">{t(c.subKey)}</p>
            </button>
          </li>
        ))}
      </ul>
    ),
    budget: (
      <ul className="py-2">
        {budgetOptions.map((b) => (
          <li key={String(b.id)}>
            <button
              type="button"
              onClick={() => pickBudget(b.id)}
              className={`w-full text-left px-4 py-2.5 hover:bg-[#F7F7F7] transition-colors ${filters.maxBudget === b.id ? 'bg-[#E6F4F4]' : ''}`}
            >
              <p className="text-sm font-semibold text-[#222222]">{t(b.labelKey)}</p>
              <p className="text-xs text-[#717171]">{t(b.subKey)}</p>
            </button>
          </li>
        ))}
      </ul>
    ),
    share: (
      <ul className="py-2">
        {shareOptions.map((s) => (
          <li key={String(s.id)}>
            <button
              type="button"
              onClick={() => pickShare(s.id)}
              className={`w-full text-left px-4 py-2.5 hover:bg-[#F7F7F7] transition-colors ${filters.minShare === s.id ? 'bg-[#E6F4F4]' : ''}`}
            >
              <p className="text-sm font-semibold text-[#222222]">{t(s.labelKey)}</p>
              <p className="text-xs text-[#717171]">{t(s.subKey)}</p>
            </button>
          </li>
        ))}
      </ul>
    ),
  };

  return (
    <div className="hidden lg:flex flex-1 justify-center max-w-2xl mx-4" ref={searchRef}>
      <div className="relative w-full max-w-lg">
        <div className="flex items-center bg-white rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.12)] pl-1 pr-1 py-1">
          {segments.map((seg, i) => (
            <div key={seg.id} className="flex items-center flex-1 min-w-0 relative">
              {i > 0 && <div className="w-px h-6 bg-[#DDDDDD] flex-shrink-0" />}
              <button
                type="button"
                onClick={() => setActivePanel((p) => (p === seg.id ? null : seg.id))}
                className={`flex-1 text-left px-3 py-1.5 rounded-full transition-colors min-w-0 ${
                  activePanel === seg.id ? 'bg-[#F7F7F7] shadow-inner' : 'hover:bg-[#F7F7F7]'
                }`}
              >
                <p className={`text-xs font-semibold truncate ${seg.active ? 'text-[#0D7C7C]' : 'text-[#222222]'}`}>
                  {seg.label}
                </p>
                <p className="text-[10px] text-[#717171] truncate hidden xl:block">{seg.sub}</p>
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleSubmit}
            className="flex-shrink-0 w-8 h-8 rounded-full bg-[#E8DCC4] flex items-center justify-center hover:scale-105 transition-transform ml-1"
            aria-label="Search opportunities"
          >
            <Search size={14} className="text-[#0D7C7C]" strokeWidth={2.5} />
          </button>
        </div>

        {activePanel && (
          <div className="absolute left-0 right-0 top-[calc(100%+8px)] bg-white rounded-2xl border border-[#E5E0D8] shadow-[0_12px_40px_rgba(0,0,0,0.15)] z-50 overflow-hidden">
            {panelContent[activePanel]}
            <div className="border-t border-[#E5E0D8] px-4 py-3 flex justify-between items-center bg-[#FAF7F2]/60">
              <button
                type="button"
                onClick={() => {
                  onChange({ city: '', maxBudget: null, minShare: null });
                  setActivePanel(null);
                }}
                className="text-xs font-medium text-[#717171] hover:text-[#222222]"
              >
                {t('header.clearAll')}
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-4 py-2 bg-[#0D7C7C] text-white text-sm font-semibold rounded-full hover:bg-[#0F9A9A] transition-colors"
              >
                {t('header.search')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function TamlkTopHeader({
  userName,
  role,
  showSearch = false,
  onLogoClick,
  onNavigate,
  onSwitchRole,
  menuItems = [],
  homeScreen = 'overview',
  investorSearch,
  onInvestorSearchChange,
  onInvestorSearchSubmit,
  locale = 'en',
  onLocaleChange,
}) {
  const t = useT();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const menuRef = useRef(null);
  const langRef = useRef(null);

  useEffect(() => {
    if (!menuOpen && !langOpen) return undefined;
    const close = (e) => {
      if (menuOpen && menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
      if (langOpen && langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [menuOpen, langOpen]);

  const roleLabels = {
    buyer: t('header.roleBuyer'),
    investor: t('header.roleInvestor'),
    admin: t('header.roleAdmin'),
  };
  const switchTargets = [
    { id: 'buyer', label: t('header.switchBuyer') },
    { id: 'investor', label: t('header.switchInvestor') },
    { id: 'admin', label: t('header.switchAdmin') },
  ].filter((r) => r.id !== role);

  const handleNav = (screenId) => {
    setMenuOpen(false);
    onNavigate?.(screenId);
  };

  const handleRoleSwitch = (roleId) => {
    setMenuOpen(false);
    onSwitchRole?.(roleId);
  };

  const locales = [
    { id: 'en', label: t('header.english'), sub: 'EN' },
    { id: 'ar', label: t('header.arabic'), sub: 'AR' },
  ];

  return (
    <div className="bg-[#FAF7F2] pt-4 pb-2">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="bg-[#085656] rounded-2xl shadow-[0_4px_20px_rgba(8,86,86,0.35)] px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex-shrink-0">
            <TamlkLogo light size="sm" onClick={onLogoClick} />
          </div>

          {showSearch && investorSearch && onInvestorSearchChange && onInvestorSearchSubmit ? (
            <InvestorHeaderSearch
              filters={investorSearch}
              onChange={onInvestorSearchChange}
              onSubmit={onInvestorSearchSubmit}
            />
          ) : (
            <div className="flex-1" />
          )}

          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <div className="relative" ref={langRef}>
              <button
                type="button"
                onClick={() => setLangOpen((o) => !o)}
                aria-expanded={langOpen}
                aria-label="Language"
                className={`p-2 rounded-full transition-colors ${langOpen ? 'bg-white/15' : 'hover:bg-white/10'}`}
              >
                <Globe size={18} className="text-white" />
              </button>
              {langOpen && (
                <div className="absolute right-0 top-[calc(100%+8px)] w-44 rounded-xl bg-white border border-[#E5E0D8] shadow-lg overflow-hidden z-50">
                  {locales.map((loc) => (
                    <button
                      key={loc.id}
                      type="button"
                      onClick={() => {
                        onLocaleChange?.(loc.id);
                        setLangOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-[#FAF7F2] transition-colors flex items-center justify-between ${
                        locale === loc.id ? 'bg-[#E6F4F4] font-semibold text-[#0D7C7C]' : 'text-[#222222]'
                      }`}
                    >
                      <span>{loc.label}</span>
                      <span className="text-xs text-[#717171]">{loc.sub}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setMenuOpen((o) => !o)}
                aria-expanded={menuOpen}
                aria-haspopup="true"
                aria-label="Account menu"
                className={`flex items-center gap-2 pl-3 pr-1.5 py-1.5 rounded-full border transition-all ${
                  menuOpen
                    ? 'border-white/50 bg-white/15 shadow-[0_2px_12px_rgba(0,0,0,0.2)]'
                    : 'border-white/30 bg-white/10 hover:shadow-[0_2px_8px_rgba(0,0,0,0.15)]'
                }`}
              >
                <Menu size={16} className="text-white hidden sm:block" />
                <div className="w-7 h-7 rounded-full bg-[#E8DCC4] flex items-center justify-center text-[10px] font-bold text-[#085656]">
                  {userName.charAt(0)}
                </div>
              </button>

              {menuOpen && (
                <div className="absolute right-0 top-[calc(100%+10px)] w-72 rounded-2xl bg-white border border-[#E5E0D8] shadow-[0_12px_40px_rgba(0,0,0,0.12)] overflow-hidden z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="px-4 py-4 border-b border-[#E5E0D8] bg-[#FAF7F2]/80">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#E8DCC4] flex items-center justify-center text-sm font-bold text-[#085656]">
                        {userName.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-[#1A1A1A] truncate">{userName}</p>
                        <p className="text-xs text-[#717171]">{roleLabels[role] || 'Account'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="py-2">
                    <p className="px-4 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#717171]">{t('header.account')}</p>
                    <button
                      type="button"
                      onClick={() => handleNav(homeScreen)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#222222] hover:bg-[#FAF7F2] transition-colors text-left"
                    >
                      <User size={16} className="text-[#717171]" />
                      {t('header.profileSettings')}
                    </button>
                    {menuItems.filter((item) => item.id !== 'overview' && item.id !== homeScreen).slice(0, 3).map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleNav(item.id)}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#222222] hover:bg-[#FAF7F2] transition-colors text-left"
                        >
                          <Icon size={16} className="text-[#717171]" />
                          {t(`nav.${item.id}`)}
                        </button>
                      );
                    })}
                  </div>

                  <div className="border-t border-[#E5E0D8] py-2">
                    <p className="px-4 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#717171]">{t('header.demo')}</p>
                    {switchTargets.map((target) => (
                      <button
                        key={target.id}
                        type="button"
                        onClick={() => handleRoleSwitch(target.id)}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#222222] hover:bg-[#FAF7F2] transition-colors text-left"
                      >
                        <Settings size={16} className="text-[#717171]" />
                        {target.label}
                      </button>
                    ))}
                  </div>

                  <div className="border-t border-[#E5E0D8] py-2">
                    <button
                      type="button"
                      onClick={() => setMenuOpen(false)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#717171] hover:bg-[#FAF7F2] transition-colors text-left"
                    >
                      <LogOut size={16} />
                      {t('header.logOut')}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardSidebar({ items, active, onNavigate, collapsed, onToggleCollapse, sectionLabel }) {
  const t = useT();
  const { locale } = useLocale();
  return (
    <aside
      className={`flex-shrink-0 transition-all duration-300 ease-out ${
        collapsed ? 'w-[76px]' : 'w-[240px]'
      }`}
    >
      <div className="sticky top-[88px] pt-6 pb-8 px-2">
        {!collapsed && sectionLabel && (
          <p className="px-4 mb-3 text-[11px] font-semibold uppercase tracking-[0.06em] text-[#717171]">
            {sectionLabel}
          </p>
        )}

        <nav className="space-y-1">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                title={collapsed ? t(`nav.${item.id}`) : undefined}
                className={`relative w-full flex items-center gap-3 rounded-xl transition-all duration-150 ${
                  collapsed ? 'justify-center px-0 py-3' : 'px-4 py-3'
                } ${
                  isActive
                    ? 'bg-white text-[#222222] font-semibold shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)]'
                    : 'text-[#717171] font-normal hover:bg-white/70 hover:text-[#222222] hover:shadow-[0_1px_2px_rgba(0,0,0,0.04)]'
                }`}
              >
                {isActive && !collapsed && (
                  <span className={`absolute top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-full bg-[#0D7C7C] ${locale === 'ar' ? 'right-0 rounded-l-full' : 'left-0 rounded-r-full'}`} />
                )}
                <Icon
                  size={22}
                  strokeWidth={isActive ? 2.25 : 1.75}
                  className={`flex-shrink-0 ${isActive ? 'text-[#0D7C7C]' : 'text-[#717171]'}`}
                />
                {!collapsed && (
                  <span className="text-[15px] truncate leading-tight">{t(`nav.${item.id}`)}</span>
                )}
              </button>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={onToggleCollapse}
          className={`mt-8 flex items-center gap-2 text-[13px] text-[#717171] hover:text-[#222222] transition-colors ${
            collapsed ? 'justify-center w-full' : 'px-4'
          }`}
        >
          <ChevronLeft size={16} className={`transition-transform duration-300 ${collapsed ? (locale === 'ar' ? '' : 'rotate-180') : (locale === 'ar' ? 'rotate-180' : '')}`} />
          {!collapsed && <span>{t('sidebar.collapse')}</span>}
        </button>
      </div>
    </aside>
  );
}

// ═══════════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════════

const ROLES = [
  { id: 'buyer', emoji: '🏠', user: 'Ahmad Al-Rashidi' },
  { id: 'investor', emoji: '📈', user: 'Sara Al-Otaibi' },
  { id: 'admin', emoji: '⚙️', user: 'Tamlk Operations' },
];

const BUYER_NAV = [
  { id: 'overview', icon: Home },
  { id: 'contract', icon: FileText },
  { id: 'payment', icon: CreditCard },
  { id: 'wallet', icon: Wallet },
  { id: 'support', icon: HeadphonesIcon },
];

const INVESTOR_NAV = [
  { id: 'portfolio', icon: Briefcase },
  { id: 'opportunities', icon: TrendingUp },
  { id: 'distributions', icon: BarChart3 },
  { id: 'wallet', icon: Wallet },
  { id: 'secondary', icon: ArrowLeftRight },
];

const ADMIN_NAV = [
  { id: 'properties', icon: Building2 },
  { id: 'kyc', icon: Shield },
  { id: 'users', icon: Users },
  { id: 'distributions', icon: BarChart3 },
  { id: 'reports', icon: FileText },
];

const ROLE_DEFAULT_SCREEN = {
  buyer: 'overview',
  investor: 'portfolio',
  admin: 'properties',
};

export default function TamlkDemo() {
  const [locale, setLocale] = useState('en');

  return (
    <LocaleProvider locale={locale}>
      <TamlkDemoApp locale={locale} onLocaleChange={setLocale} />
    </LocaleProvider>
  );
}

function TamlkDemoApp({ locale, onLocaleChange }) {
  const t = useT();
  const [role, setRole] = useState('buyer');
  const [buyerScreen, setBuyerScreen] = useState(ROLE_DEFAULT_SCREEN.buyer);
  const [investorScreen, setInvestorScreen] = useState(ROLE_DEFAULT_SCREEN.investor);
  const [adminScreen, setAdminScreen] = useState(ROLE_DEFAULT_SCREEN.admin);
  const [loading, setLoading] = useState(false);

  const [buyerContracts, setBuyerContracts] = useState(BUYER_CONTRACTS);
  const [activeContractId, setActiveContractId] = useState('jeddah');
  const [ownershipMap, setOwnershipMap] = useState({ riyadh: 23.4, jeddah: 11.2, dammam: 100 });
  const [paymentsMap, setPaymentsMap] = useState({ riyadh: 4, jeddah: 8, dammam: 96 });
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [buyerWalletBalance, setBuyerWalletBalance] = useState(BUYER.walletBalance);
  const [buyerTransactions, setBuyerTransactions] = useState(WALLET_TRANSACTIONS);
  const [investorWalletBalance, setInvestorWalletBalance] = useState(15200);
  const [investorTransactions, setInvestorTransactions] = useState(INVESTOR_WALLET_TRANSACTIONS);
  const [showAllMonths, setShowAllMonths] = useState(false);
  const [exitModal, setExitModal] = useState(false);

  const activeContract = buyerContracts.find((c) => c.id === activeContractId) || buyerContracts[0];
  const activeOwnership = ownershipMap[activeContractId] ?? activeContract.ownership;
  const listingSuspended = buyerContracts.some((c) => c.status === 'delinquent');
  const delinquencyImpact = getInvestorDelinquencyImpact(buyerContracts);
  const delinquentContracts = buyerContracts
    .filter((c) => c.status === 'delinquent')
    .map((c) => ({
      buyer: BUYER.name,
      property: c.name,
      overdue: Math.abs(c.daysUntilDue),
      amount: c.monthlyPayment,
      contractId: c.contractId,
    }));

  const [investAmount, setInvestAmount] = useState(50000);
  const [selectedOpportunityId, setSelectedOpportunityId] = useState(null);
  const [opportunities, setOpportunities] = useState(INVESTMENT_OPPORTUNITIES);

  const [walletModal, setWalletModal] = useState({ open: false, mode: 'topup', target: 'buyer', amount: 5000 });
  const [walletMethod, setWalletMethod] = useState('card');
  const [walletError, setWalletError] = useState('');

  const [listModal, setListModal] = useState(false);
  const [activeListing, setActiveListing] = useState(true);
  const [listPrice, setListPrice] = useState(18500);

  const [kycItems, setKycItems] = useState(KYC_QUEUE.map((k) => ({ ...k, status: 'pending' })));
  const [rejectModal, setRejectModal] = useState(null);
  const [rejectReason, setRejectReason] = useState('');

  const [adminProperties, setAdminProperties] = useState(ADMIN_PROPERTIES);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [investorSearch, setInvestorSearch] = useState({ city: '', maxBudget: null, minShare: null });
  const [distributionsFocusImpact, setDistributionsFocusImpact] = useState(false);

  const currentScreen = role === 'buyer' ? buyerScreen : role === 'investor' ? investorScreen : adminScreen;
  const setScreen = role === 'buyer' ? setBuyerScreen : role === 'investor' ? setInvestorScreen : setAdminScreen;
  const sidebarActive = currentScreen === 'overview' ? null : currentScreen;

  const goHome = () => setScreen(ROLE_DEFAULT_SCREEN[role]);

  const handleSwitchRole = (roleId) => {
    setRole(roleId);
    setPaymentSuccess(false);
    setSelectedOpportunityId(null);
    setBuyerScreen(ROLE_DEFAULT_SCREEN.buyer);
    setInvestorScreen(ROLE_DEFAULT_SCREEN.investor);
    setAdminScreen(ROLE_DEFAULT_SCREEN.admin);
  };

  const handleInvestorSearchSubmit = () => {
    setInvestorScreen('opportunities');
    setSelectedOpportunityId(null);
  };

  const clearInvestorSearch = () => setInvestorSearch({ city: '', maxBudget: null, minShare: null });

  const handleViewDistributionImpact = () => {
    setDistributionsFocusImpact(true);
    setInvestorScreen('distributions');
  };

  const navItems = role === 'buyer' ? BUYER_NAV : role === 'investor' ? INVESTOR_NAV : ADMIN_NAV;

  useEffect(() => {
    if (investorScreen !== 'distributions') {
      setDistributionsFocusImpact(false);
    }
  }, [investorScreen]);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, [role, currentScreen, activeContractId]);

  const handlePay = () => {
    const contract = buyerContracts.find((c) => c.id === activeContractId);
    const payAmount = contract?.monthlyPayment || 0;
    setBuyerWalletBalance((b) => b - payAmount);
    setPaymentSuccess(true);
    if (activeContractId === 'riyadh') {
      setOwnershipMap((m) => ({ ...m, riyadh: 24.0 }));
      setPaymentsMap((m) => ({ ...m, riyadh: 5 }));
    } else {
      setBuyerContracts((cs) => cs.map((c) => c.id === 'jeddah' ? { ...c, status: 'active', daysUntilDue: 30, nextPaymentDue: '15 July 2025' } : c));
      setAdminProperties((ps) => ps.map((p) => p.name.includes('Jeddah') ? { ...p, status: 'Active' } : p));
      setOwnershipMap((m) => ({ ...m, jeddah: 11.8 }));
      setPaymentsMap((m) => ({ ...m, jeddah: 9 }));
    }
  };

  const handleInvestComplete = ({ opp, amount, returns }) => {
    const total = returns.totalInvested;
    setInvestorWalletBalance((b) => {
      const newBalance = b - total;
      setInvestorTransactions((tx) => [{
        date: '14 Jun 2025',
        desc: `Investment — ${opp.name}`,
        amount: -total,
        balance: newBalance,
      }, ...tx]);
      return newBalance;
    });
    setOpportunities((list) => list.map((o) => o.id === opp.id ? {
      ...o,
      investorFunding: o.investorFunding + amount,
      investorCount: o.investorCount + 1,
    } : o));
    setInvestAmount(opp.minInvestment);
  };

  const openWalletAction = (target, mode, amount = 5000) => {
    const min = mode === 'withdraw' ? 100 : 1000;
    setWalletModal({
      open: true,
      mode,
      target,
      amount: Math.max(min, amount),
    });
    setWalletMethod(mode === 'withdraw' ? 'bank' : 'card');
    setWalletError('');
  };

  const confirmWalletAction = () => {
    const { mode, target, amount } = walletModal;
    const today = '14 Jun 2025';
    const methods = mode === 'withdraw' ? WITHDRAW_METHODS : TOPUP_METHODS;
    const methodLabel = t((methods.find((m) => m.id === walletMethod) || methods[0]).labelKey);
    const balance = target === 'buyer' ? buyerWalletBalance : investorWalletBalance;

    if (amount <= 0) {
      setWalletError(t('modals.invalidAmount'));
      return;
    }
    if (mode === 'withdraw' && amount > balance) {
      setWalletError(t('modals.insufficientBalance', { amount: fmt(balance) }));
      return;
    }

    if (mode === 'topup') {
      if (target === 'buyer') {
        setBuyerWalletBalance((b) => {
          const newBalance = b + amount;
          setBuyerTransactions((tx) => [{
            date: today,
            desc: `Top Up — ${methodLabel}`,
            amount,
            balance: newBalance,
          }, ...tx]);
          return newBalance;
        });
      } else {
        setInvestorWalletBalance((b) => {
          const newBalance = b + amount;
          setInvestorTransactions((tx) => [{
            date: today,
            desc: `Top Up — ${methodLabel}`,
            amount,
            balance: newBalance,
          }, ...tx]);
          return newBalance;
        });
      }
    } else if (target === 'buyer') {
      setBuyerWalletBalance((b) => {
        const newBalance = b - amount;
        setBuyerTransactions((tx) => [{
          date: today,
          desc: `Withdraw — ${methodLabel}`,
          amount: -amount,
          balance: newBalance,
        }, ...tx]);
        return newBalance;
      });
    } else {
      setInvestorWalletBalance((b) => {
        const newBalance = b - amount;
        setInvestorTransactions((tx) => [{
          date: today,
          desc: `Withdraw — ${methodLabel}`,
          amount: -amount,
          balance: newBalance,
        }, ...tx]);
        return newBalance;
      });
    }

    setWalletModal((m) => ({ ...m, open: false }));
    setWalletError('');
  };

  const handleKycApprove = (id) => {
    setKycItems((items) => items.map((k) => k.id === id ? { ...k, status: 'approved' } : k));
  };

  const handleKycReject = (id) => {
    setRejectModal(id);
  };

  const confirmReject = () => {
    setKycItems((items) => items.map((k) => k.id === rejectModal ? { ...k, status: 'rejected' } : k));
    setRejectModal(null);
    setRejectReason('');
  };

  const currentRole = ROLES.find((r) => r.id === role);

  const renderBuyerContent = () => {
    if (loading) return <LoadingSkeleton />;
    switch (buyerScreen) {
      case 'overview':
        return (
          <BuyerDashboard
            contracts={buyerContracts}
            ownershipMap={ownershipMap}
            paymentsMap={paymentsMap}
            onSelectContract={setActiveContractId}
            onNavigate={setBuyerScreen}
            walletBalance={buyerWalletBalance}
          />
        );
      case 'contract':
        return (
          <BuyerContract
            contract={activeContract}
            contracts={buyerContracts}
            activeId={activeContractId}
            onSelectContract={setActiveContractId}
            ownership={activeOwnership}
            showAll={showAllMonths}
            setShowAll={setShowAllMonths}
            onExit={() => setExitModal(true)}
          />
        );
      case 'payment':
        return (
          <BuyerPayment
            contracts={buyerContracts}
            activeId={activeContractId}
            onSelectContract={(id) => { setActiveContractId(id); setPaymentSuccess(false); }}
            ownershipMap={ownershipMap}
            onPay={handlePay}
            paymentSuccess={paymentSuccess}
            onClearSuccess={() => setPaymentSuccess(false)}
            walletBalance={buyerWalletBalance}
            onTopUp={(shortfall) => openWalletAction('buyer', 'topup', shortfall)}
            onWithdraw={() => openWalletAction('buyer', 'withdraw')}
          />
        );
      case 'wallet':
        return (
          <BuyerWallet
            balance={buyerWalletBalance}
            transactions={buyerTransactions}
            onTopUp={() => openWalletAction('buyer', 'topup')}
            onWithdraw={() => openWalletAction('buyer', 'withdraw')}
          />
        );
      case 'support': return <BuyerSupport />;
      default: return null;
    }
  };

  const renderInvestorContent = () => {
    if (loading) return <LoadingSkeleton />;
    switch (investorScreen) {
      case 'overview': return <InvestorDashboard listingSuspended={listingSuspended} onNavigate={setInvestorScreen} />;
      case 'portfolio':
        return (
          <InvestorPortfolio
            listingSuspended={listingSuspended}
            onNavigate={setInvestorScreen}
            delinquencyImpact={delinquencyImpact}
            onViewDistributionImpact={handleViewDistributionImpact}
          />
        );
      case 'opportunities':
        return (
          <InvestorOpportunities
            opportunities={opportunities}
            selectedId={selectedOpportunityId}
            onSelect={(id) => { setSelectedOpportunityId(id); setInvestAmount(opportunities.find((o) => o.id === id)?.minInvestment || 50000); }}
            onBack={() => setSelectedOpportunityId(null)}
            investAmount={investAmount}
            setInvestAmount={setInvestAmount}
            walletBalance={investorWalletBalance}
            onInvestComplete={handleInvestComplete}
            onTopUp={(shortfall) => openWalletAction('investor', 'topup', shortfall)}
            listingSuspended={listingSuspended}
            headerSearch={investorSearch}
            onClearHeaderSearch={clearInvestorSearch}
          />
        );
      case 'distributions':
        return (
          <InvestorDistributions
            impact={delinquencyImpact}
            highlightImpact={distributionsFocusImpact}
          />
        );
      case 'wallet':
        return (
          <InvestorWallet
            balance={investorWalletBalance}
            transactions={investorTransactions}
            onTopUp={() => openWalletAction('investor', 'topup')}
            onWithdraw={() => openWalletAction('investor', 'withdraw')}
          />
        );
      case 'secondary': return <InvestorSecondary onList={() => setListModal(true)} activeListing={activeListing} listingSuspended={listingSuspended} />;
      default: return null;
    }
  };

  const renderAdminContent = () => {
    if (loading) return <LoadingSkeleton />;
    switch (adminScreen) {
      case 'overview': return <AdminDashboard delinquentContracts={delinquentContracts} properties={adminProperties} />;
      case 'properties': return <AdminProperties properties={adminProperties} onAdd={(p) => setAdminProperties([...adminProperties, p])} />;
      case 'users': return <AdminPlaceholder title={t('admin.placeholder.users')} />;
      case 'kyc': return <AdminKYC kycItems={kycItems} onApprove={handleKycApprove} onReject={handleKycReject} />;
      case 'distributions':
        return (
          <AdminDistributions
            properties={adminProperties}
            buyerContracts={buyerContracts}
            delinquencyImpact={delinquencyImpact}
          />
        );
      case 'reports': return <AdminPlaceholder title={t('admin.placeholder.reports')} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2]" dir={locale === 'ar' ? 'rtl' : 'ltr'} lang={locale}>
      <div className="bg-[#0A6464] text-white text-center py-1.5 text-[11px] tracking-wide">
        {t('demoMode')}
      </div>
      <div className="bg-white border-b border-[#E5E0D8] px-4 py-2 flex items-center justify-center gap-2 flex-wrap">
        {ROLES.map((r) => (
          <button
            key={r.id}
            onClick={() => {
              setRole(r.id);
              setPaymentSuccess(false);
              setSelectedOpportunityId(null);
              setBuyerScreen(ROLE_DEFAULT_SCREEN.buyer);
              setInvestorScreen(ROLE_DEFAULT_SCREEN.investor);
              setAdminScreen(ROLE_DEFAULT_SCREEN.admin);
            }}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              role === r.id
                ? 'bg-[#0D7C7C] text-white'
                : 'bg-[#FAF7F2] text-[#78716C] hover:bg-[#E5E0D8]'
            }`}
          >
            {r.emoji} {t(`roles.${r.id}`)}
          </button>
        ))}
      </div>

      <div className="sticky top-0 z-40">
        <TamlkTopHeader
          userName={currentRole.user}
          role={role}
          showSearch={role === 'investor'}
          onLogoClick={goHome}
          onNavigate={setScreen}
          onSwitchRole={handleSwitchRole}
          menuItems={navItems}
          homeScreen={ROLE_DEFAULT_SCREEN[role]}
          investorSearch={investorSearch}
          onInvestorSearchChange={setInvestorSearch}
          onInvestorSearchSubmit={handleInvestorSearchSubmit}
          locale={locale}
          onLocaleChange={onLocaleChange}
        />
      </div>

      <div className="flex max-w-[1400px] mx-auto">
        <DashboardSidebar
          items={role === 'buyer' ? BUYER_NAV : role === 'investor' ? INVESTOR_NAV : ADMIN_NAV}
          active={sidebarActive}
          onNavigate={setScreen}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed((c) => !c)}
          sectionLabel={t(`sectionLabels.${role}`)}
        />

        <main className="flex-1 px-4 sm:px-6 py-8 min-w-0">
          {role === 'buyer' && renderBuyerContent()}
          {role === 'investor' && renderInvestorContent()}
          {role === 'admin' && renderAdminContent()}
        </main>
      </div>

      {/* Modals */}
      <Modal
        open={walletModal.open}
        onClose={() => setWalletModal((m) => ({ ...m, open: false }))}
        title={`${walletModal.mode === 'withdraw' ? t('modals.withdrawFrom') : t('modals.addFundsTo')} ${walletModal.target === 'buyer' ? t('modals.buyerWallet') : t('modals.investorWallet')}`}
      >
        <div className="space-y-4">
          <p className="text-sm text-[#78716C]">
            {walletModal.mode === 'withdraw' ? t('modals.withdrawHint') : t('modals.topupHint')}
          </p>
          <div>
            <label className="text-sm text-[#78716C]">{t('modals.amountSar')}</label>
            <input
              type="number"
              value={walletModal.amount}
              onChange={(e) => {
                setWalletModal((m) => ({ ...m, amount: Number(e.target.value) }));
                setWalletError('');
              }}
              max={walletModal.mode === 'withdraw' ? (walletModal.target === 'buyer' ? buyerWalletBalance : investorWalletBalance) : undefined}
              className="w-full mt-1 px-3 py-2.5 border border-[#E5E0D8] rounded-xl focus:outline-none focus:border-[#0D7C7C]"
            />
            {walletModal.mode === 'withdraw' && (
              <p className="text-xs text-[#78716C] mt-1">
                {t('modals.available', { amount: fmt(walletModal.target === 'buyer' ? buyerWalletBalance : investorWalletBalance) })}
              </p>
            )}
          </div>
          <div>
            <label className="text-sm text-[#78716C] mb-2 block">
              {walletModal.mode === 'withdraw' ? t('modals.withdrawTo') : t('modals.fundingMethod')}
            </label>
            <div className="grid grid-cols-1 gap-2">
              {(walletModal.mode === 'withdraw' ? WITHDRAW_METHODS : TOPUP_METHODS).map((m) => {
                const Icon = m.icon;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setWalletMethod(m.id)}
                    className={`flex items-center gap-3 p-3 rounded-xl border text-start text-sm transition-all ${
                      walletMethod === m.id ? 'border-[#0D7C7C] bg-[#E6F4F4]' : 'border-[#E5E0D8] hover:border-[#0F9A9A]'
                    }`}
                  >
                    <Icon size={16} className="text-[#78716C]" />
                    <div>
                      <p className="font-medium">{t(m.labelKey)}</p>
                      <p className="text-xs text-[#78716C]">{t(m.subKey)}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
          {walletError && (
            <p className="text-sm text-[#C0504D] bg-red-50 border border-red-100 rounded-xl px-3 py-2">{walletError}</p>
          )}
          <button
            onClick={confirmWalletAction}
            className={`w-full py-3 text-white rounded-full font-semibold transition-colors ${
              walletModal.mode === 'withdraw'
                ? 'bg-[#1A1A1A] hover:bg-[#333]'
                : 'bg-[#0D7C7C] hover:bg-[#0F9A9A]'
            }`}
          >
            {walletModal.mode === 'withdraw'
              ? t('modals.withdrawBtn', { amount: fmt(walletModal.amount) })
              : t('modals.addBtn', { amount: fmt(walletModal.amount) })}
          </button>
        </div>
      </Modal>

      <Modal open={listModal} onClose={() => setListModal(false)} title={t('modals.listForSale')}>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-[#78716C]">{t('modals.shareToSell')}</label>
            <input type="number" defaultValue={1.0} className="w-full mt-1 px-3 py-2 border border-[#E5E0D8] rounded-lg" />
          </div>
          <div>
            <label className="text-sm text-[#78716C]">{t('modals.askingPrice')}</label>
            <input type="number" value={listPrice} onChange={(e) => setListPrice(Number(e.target.value))} className="w-full mt-1 px-3 py-2 border border-[#E5E0D8] rounded-lg" />
          </div>
          <p className="text-sm text-[#78716C]">{t('modals.estimatedIncome', { amount: fmt(111) })}</p>
          <button onClick={() => { setListModal(false); setActiveListing(true); }} className="w-full py-2.5 bg-[#0D7C7C] text-white rounded-lg hover:bg-[#0F9A9A] transition-colors">
            {t('modals.listAt', { amount: fmt(listPrice) })}
          </button>
        </div>
      </Modal>

      <Modal open={!!rejectModal} onClose={() => setRejectModal(null)} title={t('admin.kyc.rejectTitle')}>
        <div className="space-y-4">
          <textarea
            value={rejectReason} onChange={(e) => setRejectReason(e.target.value)}
            placeholder={t('admin.kyc.rejectPlaceholder')}
            className="w-full px-3 py-2 border border-[#E5E0D8] rounded-lg h-24 focus:outline-none focus:border-[#0F9A9A]"
          />
          <button onClick={confirmReject} className="w-full py-2.5 bg-[#C0504D] text-white rounded-lg hover:bg-red-700 transition-colors">
            {t('admin.kyc.confirmRejection')}
          </button>
        </div>
      </Modal>

      <Modal open={exitModal} onClose={() => setExitModal(false)} title={t('modals.exitListTitle')}>
        <div className="space-y-4">
          <p className="text-sm text-[#78716C]">
            {t('modals.exitDesc', { pct: activeOwnership, name: activeContract.name })}
          </p>
          <div>
            <label className="text-sm text-[#78716C]">{t('modals.askingPrice')}</label>
            <input type="number" defaultValue={Math.round(activeOwnership / 100 * activeContract.totalValue)} className="w-full mt-1 px-3 py-2 border border-[#E5E0D8] rounded-lg" />
          </div>
          <button onClick={() => setExitModal(false)} className="w-full py-2.5 bg-[#D97706] text-white rounded-lg hover:bg-amber-700 transition-colors">
            {t('modals.listShareBtn')}
          </button>
        </div>
      </Modal>
    </div>
  );
}
