import { useState, useEffect } from 'react';
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, ReferenceLine,
} from 'recharts';
import {
  Home, FileText, CreditCard, Wallet, HeadphonesIcon,
  LayoutDashboard, Briefcase, TrendingUp, ArrowLeftRight,
  Building2, Users, Shield, BarChart3, Check, X, Download,
  ChevronRight, Plus, AlertCircle, Clock, CircleCheck, Trophy, ArrowRight,
  Search, Filter, MapPin, Banknote, Smartphone, Landmark, Lock, Receipt,
  ArrowLeft, Sparkles,
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════════════
// DEMO DATA
// ═══════════════════════════════════════════════════════════════════

const COLORS = {
  navy: '#1C396A',
  steel: '#2E5090',
  tableHeader: '#2B3D5F',
  alert: '#C0504D',
  bg: '#F8F9FB',
  card: '#FFFFFF',
  border: '#E2E8F0',
  success: '#16A34A',
  warning: '#D97706',
  text: '#1A1A1A',
  muted: '#64748B',
  lightGray: '#CBD5E1',
};

const BUYER = {
  name: 'Ahmad Al-Rashidi',
  nameAr: 'أحمد',
  walletBalance: 12400,
};

// PRD 5.5 — buyer can hold multiple active contracts simultaneously
const BUYER_CONTRACTS = [
  {
    id: 'riyadh',
    name: 'Riyadh Heights — Villa 12',
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
  { id: 'card', label: 'Debit / Credit Card', sub: 'Visa, Mada, Mastercard', icon: CreditCard },
  { id: 'apple', label: 'Apple Pay', sub: 'One-tap · instant', icon: Smartphone },
  { id: 'bank', label: 'Bank Transfer', sub: 'SARIE · 1–2 business days', icon: Landmark },
];

const WALLET_PAYMENT_LABEL = 'Tamlk Wallet';

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
];

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
  { id: 1, user: 'Mohammed Al-Harbi', type: 'Home Buyer', path: 'Nafath', submitted: '10 Jun 2025', docs: 'ID verified ✓' },
  { id: 2, user: 'Priya Sharma', type: 'Investor', path: 'International', submitted: '11 Jun 2025', docs: 'Passport uploaded' },
  { id: 3, user: 'Khalid Al-Dosari', type: 'Home Buyer', path: 'Nafath', submitted: '12 Jun 2025', docs: 'ID verified ✓' },
  { id: 4, user: 'James Chen', type: 'Investor', path: 'International', submitted: '13 Jun 2025', docs: 'Passport uploaded' },
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

function Skeleton({ className = '' }) {
  return <div className={`animate-pulse bg-[#E2E8F0] rounded-lg ${className}`} />;
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
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-[#1A1A1A]">{title}</h3>
          <button onClick={onClose} className="text-[#64748B] hover:text-[#1A1A1A] transition-colors">
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
    <div className="bg-white rounded-xl border border-[#E2E8F0] p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-[#64748B] mb-1">{label}</p>
          <p className="text-2xl font-bold text-[#1C396A]">{value}</p>
          {sub && <p className="text-xs text-[#64748B] mt-1">{sub}</p>}
        </div>
        {Icon && (
          <div className={`p-2 rounded-lg ${accent || 'bg-[#1C396A]/10'}`}>
            <Icon size={20} className="text-[#1C396A]" />
          </div>
        )}
      </div>
    </div>
  );
}

function BilingualLabel({ ar, en }) {
  return <span><span className="text-[#64748B]">{ar}</span> / {en}</span>;
}

function OwnershipArc({ percent }) {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const offset = circ - (percent / 100) * circ;
  return (
    <svg width="64" height="64" className="inline-block">
      <circle cx="32" cy="32" r={r} fill="none" stroke="#E2E8F0" strokeWidth="6" />
      <circle
        cx="32" cy="32" r={r} fill="none" stroke="#1C396A" strokeWidth="6"
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round" transform="rotate(-90 32 32)"
      />
      <text x="32" y="36" textAnchor="middle" className="text-xs font-bold" fill="#1C396A">{percent}%</text>
    </svg>
  );
}

function PropertyPlaceholder({ name, className = 'h-48' }) {
  return (
    <div className={`${className} rounded-xl bg-gradient-to-br from-[#1C396A] to-[#2E5090] flex items-end p-6 relative overflow-hidden`}>
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)',
      }} />
      <h3 className="text-white text-xl font-bold relative z-10">{name}</h3>
    </div>
  );
}

function ShariaBadge() {
  return (
    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-50 text-[#16A34A] text-sm font-medium border border-green-200">
      <Check size={14} /> معتمد شرعياً / Sharia Certified ✓
    </span>
  );
}

function EjarBadge() {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-50 text-[#2E5090] text-xs font-medium border border-blue-100">
      <Shield size={12} /> Ejar API Verified ✓
    </span>
  );
}

function ContractStatusBadge({ status }) {
  const styles = {
    active: 'bg-green-50 text-[#16A34A] border-green-200',
    delinquent: 'bg-red-50 text-[#C0504D] border-red-200',
    complete: 'bg-amber-50 text-amber-700 border-amber-200',
    terminated: 'bg-gray-50 text-[#64748B] border-gray-200',
  };
  const labels = { active: 'Active', delinquent: 'Delinquent', complete: 'Fully Owned ✓', terminated: 'Terminated' };
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${styles[status] || styles.active}`}>
      {labels[status] || status}
    </span>
  );
}

function EjarOccupancyPanel({ ejar, buyerName }) {
  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-[#2E5090]">الإشغال / Occupancy (Ejar)</h2>
        {ejar.verified && <EjarBadge />}
      </div>
      <p className="text-xs text-[#64748B] mb-4">
        You live in this home. Your occupancy is registered with Ejar — the same platform used to verify lease details for investor confidence.
      </p>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div><span className="text-[#64748B]">Occupant</span><p className="font-medium">{ejar.occupantName}</p></div>
        <div><span className="text-[#64748B]">Home buyer</span><p className="font-medium">{buyerName}</p></div>
        <div><span className="text-[#64748B]">Lease start</span><p className="font-medium">{ejar.leaseStart}</p></div>
        <div><span className="text-[#64748B]">Lease end</span><p className="font-medium">{ejar.leaseEnd}</p></div>
        <div><span className="text-[#64748B]">Monthly rent portion</span><p className="font-medium text-[#1C396A]">{fmt(ejar.usageRentAmount)}/mo</p></div>
        <div><span className="text-[#64748B]">Ejar reference</span><p className="font-mono text-xs">{ejar.ejarRef}</p></div>
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
          className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
            activeId === c.id
              ? c.status === 'complete' ? 'bg-amber-600 text-white border-amber-600' : 'bg-[#1C396A] text-white border-[#1C396A]'
              : c.status === 'complete' ? 'bg-amber-50 text-amber-800 border-amber-200 hover:border-amber-400' : 'bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#2E5090]'
          }`}
        >
          {c.name} {c.status === 'delinquent' && '⚠️'}{c.status === 'complete' && ' 🏆'}
        </button>
      ))}
    </div>
  );
}

function PaymentBreakdownExplainer({ contract, ownership }) {
  const unownedPct = (100 - ownership).toFixed(1);
  return (
    <div className="bg-[#F8F9FB] rounded-xl border border-[#E2E8F0] p-5 space-y-4">
      <p className="text-sm font-medium text-[#1A1A1A]">كيف تُقسَّم دفعتك / How your payment works</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="bg-white rounded-lg p-4 border-l-4 border-[#2E5090]">
          <p className="text-xs text-[#64748B] mb-1">أجرة الحصة غير المملوكة / Rent for unowned portion</p>
          <p className="text-xl font-bold text-[#2E5090]">{fmt(contract.rentComponent)}</p>
          <p className="text-xs text-[#64748B] mt-2 leading-relaxed">
            You own <strong>{ownership}%</strong>. The other <strong>{unownedPct}%</strong> still belongs to Tamlk and investors.
            This pays for living in that part — halal rent, not bank interest.
          </p>
        </div>
        <div className="bg-white rounded-lg p-4 border-l-4 border-[#1C396A]">
          <p className="text-xs text-[#64748B] mb-1">شراء حصة إضافية / Buying more of your home</p>
          <p className="text-xl font-bold text-[#1C396A]">{fmt(contract.buyoutComponent)}</p>
          <p className="text-xs text-[#64748B] mt-2 leading-relaxed">
            This portion actually <strong>buys</strong> more of the home from investors and Tamlk.
            That's how your ownership grows each month.
          </p>
        </div>
      </div>
    </div>
  );
}

function PaymentReminderBanner({ contract, ownership }) {
  if (contract.status === 'delinquent') {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-5 flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
          <AlertCircle size={20} className="text-[#C0504D]" />
        </div>
        <div>
          <p className="font-semibold text-[#C0504D] text-lg">
            دفعتك متأخرة / Payment overdue — {Math.abs(contract.daysUntilDue)} days
          </p>
          <p className="text-sm text-[#1A1A1A] mt-2">
            <strong>{fmt(contract.monthlyPayment)}</strong> for {contract.name} was due {contract.nextPaymentDue}.
          </p>
          <ul className="text-sm text-[#64748B] mt-3 space-y-1.5 list-disc list-inside">
            <li>Your ownership is <strong>frozen at {ownership}%</strong> until you pay</li>
            <li>No buyout progress this month — you won't grow your stake</li>
            <li>Pay now to stay in good standing on your contract</li>
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
          تذكير / Reminder: {fmt(contract.monthlyPayment)} due in {contract.daysUntilDue} day{contract.daysUntilDue !== 1 ? 's' : ''} — {contract.nextPaymentDue}
        </span>
      </div>
    );
  }
  return null;
}

// ═══════════════════════════════════════════════════════════════════
// BUYER VIEW
// ═══════════════════════════════════════════════════════════════════

function BuyerDashboard({ contracts, ownershipMap, paymentsMap, onSelectContract, onNavigate }) {
  const portfolio = getBuyerPortfolio(contracts);
  const selected = contracts[0];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#1A1A1A]">
        مرحباً، {BUYER.nameAr} / Welcome, Ahmad
      </h1>

      {/* PRD 5.1 — Active home buyer portfolio summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="العقود النشطة / Active Contracts" value={portfolio.activeCount} sub={portfolio.completedCount > 0 ? `${portfolio.completedCount} fully owned` : portfolio.delinquentCount > 0 ? `${portfolio.delinquentCount} need attention` : 'all on track'} icon={FileText} />
        <StatCard label="قيمة الملكية / Total Ownership Value" value={fmt(Math.round(portfolio.totalOwnershipValue))} icon={Home} />
        <StatCard
          label="الدفعة القادمة / Next Payment"
          value={portfolio.nextPayment ? fmt(portfolio.nextPayment.monthlyPayment) : '—'}
          sub={portfolio.nextPayment ? `due in ${portfolio.nextPayment.daysUntilDue} days` : ''}
          icon={CreditCard}
        />
        <StatCard label="الدفعات الشهرية / Combined Monthly" value={fmt(portfolio.combinedMonthly)} sub="across active contracts" icon={TrendingUp} />
      </div>

      {/* All contracts — PRD 5.5 multiple simultaneous contracts */}
      <div>
        <h2 className="text-lg font-semibold text-[#2E5090] mb-4">عقودي / My Contracts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contracts.map((c) => {
            const ownership = ownershipMap[c.id] ?? c.ownership;
            const payments = paymentsMap[c.id] ?? c.paymentsMade;
            return (
              <button
                key={c.id}
                onClick={() => { onSelectContract(c.id); onNavigate(c.status === 'complete' ? 'contract' : 'contract'); }}
                className={`text-left bg-white rounded-xl border p-5 hover:shadow-md transition-all ${
                  c.status === 'delinquent' ? 'border-[#C0504D] bg-red-50/20' :
                  c.status === 'complete' ? 'border-amber-300 bg-amber-50/30' : 'border-[#E2E8F0]'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-[#1A1A1A]">{c.name}</h3>
                  <ContractStatusBadge status={c.status} />
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div><span className="text-[#64748B]">Ownership</span><p className="font-bold text-[#1C396A]">{ownership}%</p></div>
                  <div><span className="text-[#64748B]">Payments</span><p className="font-medium">{payments} / 240</p></div>
                  <div><span className="text-[#64748B]">Monthly</span><p className="font-medium">{fmt(c.monthlyPayment)}</p></div>
                  <div><span className="text-[#64748B]">Due</span><p className={`font-medium ${c.status === 'delinquent' ? 'text-[#C0504D]' : ''}`}>{c.nextPaymentDue}</p></div>
                </div>
                {c.ejar.verified && (
                  <div className="mt-3 flex items-center gap-2 text-xs text-[#2E5090]">
                    <Shield size={12} /> Ejar verified · Occupant: {c.ejar.occupantName}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Detail for primary contract */}
      <PaymentReminderBanner contract={contracts.find((c) => c.status === 'delinquent') || selected} ownership={ownershipMap[selected.id] ?? selected.ownership} />

      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
        <h2 className="text-lg font-semibold text-[#2E5090] mb-4">نمو الملكية / Ownership Growth — {selected.name}</h2>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={OWNERSHIP_GROWTH.map((d) => ({ ...d, actualLine: d.actual, projectedLine: d.projected }))}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748B' }} />
            <YAxis domain={[0, 30]} tick={{ fontSize: 12, fill: '#64748B' }} tickFormatter={(v) => `${v}%`} />
            <Tooltip formatter={(v) => `${v}%`} />
            <Area type="monotone" dataKey="actualLine" stroke="#1C396A" fill="#1C396A" fillOpacity={0.15} strokeWidth={2} connectNulls={false} name="Actual" />
            <Line type="monotone" dataKey="projectedLine" stroke="#2E5090" strokeWidth={2} strokeDasharray="6 4" dot={false} name="Projected" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#E2E8F0]">
          <h2 className="text-lg font-semibold text-[#2E5090]">الدفعات الأخيرة / Recent Payments — {selected.name}</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#2B3D5F] text-white">
              <th className="px-4 py-3 text-left">Month</th>
              <th className="px-4 py-3 text-left">Total</th>
              <th className="px-4 py-3 text-left">Rent Portion</th>
              <th className="px-4 py-3 text-left">Buyout</th>
              <th className="px-4 py-3 text-left">New Ownership</th>
            </tr>
          </thead>
          <tbody>
            {RECENT_PAYMENTS.map((p, i) => (
              <tr key={i} className="border-b border-[#E2E8F0] hover:bg-[#F8F9FB] transition-colors">
                <td className="px-4 py-3">{p.month}</td>
                <td className="px-4 py-3 font-medium">{fmt(p.total)}</td>
                <td className="px-4 py-3">{fmt(p.rent)}</td>
                <td className="px-4 py-3">{fmt(p.buyout)}</td>
                <td className="px-4 py-3 text-[#1C396A] font-semibold">{p.ownership}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function BuyerContractComplete({ contract }) {
  return (
    <div className="space-y-6">
      {/* Celebration hero */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#1C396A] via-[#2E5090] to-[#1C396A] p-8 text-white">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-400/10 rounded-full translate-y-1/2 -translate-x-1/4" />
        <div className="relative flex flex-col md:flex-row items-center gap-8">
          <div className="relative">
            <svg width="140" height="140" className="drop-shadow-lg">
              <circle cx="70" cy="70" r="58" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="8" />
              <circle cx="70" cy="70" r="58" fill="none" stroke="#FCD34D" strokeWidth="8"
                strokeDasharray={364} strokeDashoffset={0} strokeLinecap="round" transform="rotate(-90 70 70)" />
              <text x="70" y="65" textAnchor="middle" fill="white" className="text-2xl font-bold">100%</text>
              <text x="70" y="85" textAnchor="middle" fill="rgba(255,255,255,0.7)" className="text-[10px]">OWNED</text>
            </svg>
            <Trophy size={28} className="absolute -top-1 -right-1 text-amber-300" />
          </div>
          <div className="text-center md:text-left">
            <p className="text-amber-300 text-sm font-semibold uppercase tracking-widest">مبروك / Congratulations</p>
            <h2 className="text-3xl font-bold mt-2">You fully own this home</h2>
            <p className="text-white/80 mt-2 max-w-md">{contract.name} — completed {contract.completedDate}</p>
            <p className="text-sm text-white/60 mt-3">Contract {contract.contractId} · Closed after {contract.paymentsMade} payments</p>
          </div>
        </div>
      </div>

      <PropertyPlaceholder name={contract.name} className="h-40" />
      <div className="flex flex-wrap gap-3 text-sm text-[#64748B] items-center">
        <span>{contract.location}</span>
        <span>·</span>
        <span>{contract.type} · {contract.beds} bed · {contract.baths} bath · {contract.sqm} m²</span>
        <ContractStatusBadge status="complete" />
      </div>

      {/* Final ownership — buyer 100% */}
      <div className="bg-white rounded-xl border border-amber-200 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-[#2E5090] mb-4">الملكية النهائية / Final Ownership</h2>
        <div className="h-12 rounded-lg overflow-hidden flex bg-[#F8F9FB]">
          <div className="bg-[#1C396A] flex items-center justify-center text-white font-bold w-full">
            Ahmad Al-Rashidi — 100%
          </div>
        </div>
        <p className="text-xs text-[#64748B] mt-3">Investors 0% · Tamlk 0% — all shares bought out through your monthly payments</p>
      </div>

      {/* Contract summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total paid', value: fmt(contract.totalPaid) },
          { label: 'Payments made', value: contract.paymentsMade },
          { label: 'Contract period', value: `${contract.contractStart} → ${contract.contractEnd}` },
          { label: 'Property value', value: fmt(contract.totalValue) },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-[#E2E8F0] p-4">
            <p className="text-xs text-[#64748B]">{s.label}</p>
            <p className="text-lg font-bold text-[#1C396A] mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      {/* What happened to investors */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
        <h2 className="text-lg font-semibold text-[#2E5090] mb-2">ماذا حدث للمستثمرين؟ / What happened to investors?</h2>
        <p className="text-sm text-[#64748B] mb-6">
          As you bought more each month, investor shares shrank. Their buyout portion was returned in your payments. At 100%, all {contract.investorCount} investors were fully cashed out.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { step: '1', title: 'Monthly distributions', desc: 'Investors received rent from your usage payments while you co-owned', color: '#2E5090' },
            { step: '2', title: 'Gradual buyout', desc: 'Each buyout portion purchased investor shares — their % decreased month by month', color: '#1C396A' },
            { step: '3', title: 'Full exit at 100%', desc: `Final payment closed the contract. All ${contract.investorsBoughtOut} investors received their remaining capital back`, color: '#16A34A' },
          ].map((item) => (
            <div key={item.step} className="relative p-5 rounded-xl bg-[#F8F9FB] border border-[#E2E8F0]">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold mb-3" style={{ backgroundColor: item.color }}>
                {item.step}
              </div>
              <p className="font-semibold text-[#1A1A1A] text-sm">{item.title}</p>
              <p className="text-xs text-[#64748B] mt-2 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[#64748B]">
          <span className="px-3 py-1.5 rounded-lg bg-[#2E5090]/10 text-[#2E5090] font-medium">Investors: 56.6%</span>
          <ArrowRight size={14} />
          <span className="px-3 py-1.5 rounded-lg bg-[#2E5090]/10 text-[#2E5090] font-medium">28.3%</span>
          <ArrowRight size={14} />
          <span className="px-3 py-1.5 rounded-lg bg-[#2E5090]/10 text-[#2E5090] font-medium">0%</span>
          <ArrowRight size={14} />
          <span className="px-3 py-1.5 rounded-lg bg-green-50 text-[#16A34A] font-bold">Fully bought out ✓</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#1C396A] text-white rounded-lg hover:bg-[#2E5090] transition-colors">
          <Download size={16} /> Download Ownership Certificate
        </button>
        <button className="flex items-center gap-2 px-5 py-2.5 border border-[#E2E8F0] rounded-lg hover:bg-[#F8F9FB] transition-colors text-sm">
          <FileText size={16} /> View closed contract
        </button>
      </div>
    </div>
  );
}

function InvestorBuyoutComplete({ position }) {
  return (
    <div className="rounded-2xl border-2 border-amber-200 bg-gradient-to-b from-amber-50/50 to-white overflow-hidden">
      <div className="px-6 py-5 border-b border-amber-100 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Trophy size={16} className="text-amber-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Buyout Complete</span>
          </div>
          <h3 className="text-xl font-bold text-[#1A1A1A]">{position.name}</h3>
          <p className="text-sm text-[#64748B] mt-1">Contract closed {position.completedDate} — buyer reached 100% ownership</p>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-xs text-[#64748B]">Total return</p>
          <p className="text-2xl font-bold text-[#16A34A]">+{position.returnPct}%</p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'You invested', value: fmt(position.invested), color: '#1C396A' },
            { label: 'Distributions', value: fmt(position.distributionsReceived), color: '#2E5090' },
            { label: 'Buyout received', value: fmt(position.buyoutReceived), color: '#1C396A' },
            { label: 'Total received', value: fmt(position.received), color: '#16A34A' },
          ].map((item) => (
            <div key={item.label} className="text-center p-3 rounded-xl bg-white border border-[#E2E8F0]">
              <p className="text-[10px] uppercase tracking-wider text-[#64748B]">{item.label}</p>
              <p className="text-lg font-bold mt-1" style={{ color: item.color }}>{item.value}</p>
            </div>
          ))}
        </div>

        <div>
          <p className="text-sm font-medium text-[#2E5090] mb-3">Your return over the contract</p>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={BUYOUT_COMPLETE_CHART}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="phase" tick={{ fontSize: 11, fill: '#64748B' }} />
              <YAxis tick={{ fontSize: 11, fill: '#64748B' }} tickFormatter={(v) => fmt(v)} />
              <Tooltip formatter={(v) => fmt(v)} />
              <Area type="monotone" dataKey="distributions" stackId="1" stroke="#2E5090" fill="#2E5090" fillOpacity={0.4} name="Distributions" />
              <Area type="monotone" dataKey="buyout" stackId="1" stroke="#16A34A" fill="#16A34A" fillOpacity={0.5} name="Final buyout" />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-2 text-xs text-[#64748B]">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-[#2E5090]/60" /> Monthly distributions</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-[#16A34A]/60" /> Final buyout (Mar 2024)</span>
          </div>
        </div>

        <div className="bg-[#F8F9FB] rounded-xl p-5 text-sm space-y-3">
          <p className="font-medium text-[#1A1A1A]">What happened to your share?</p>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="px-2 py-1 rounded bg-white border">{position.shareAtStart}% share acquired</span>
            <ArrowRight size={12} className="text-[#64748B]" />
            <span className="px-2 py-1 rounded bg-white border">Monthly income {fmt(365)}/mo</span>
            <ArrowRight size={12} className="text-[#64748B]" />
            <span className="px-2 py-1 rounded bg-white border">Share bought back by Ahmad</span>
            <ArrowRight size={12} className="text-[#64748B]" />
            <span className="px-2 py-1 rounded bg-green-50 text-[#16A34A] font-semibold border border-green-200">{fmt(position.buyoutReceived)} to your wallet ✓</span>
          </div>
          <p className="text-[#64748B] text-xs leading-relaxed">
            No action needed from you. The platform automatically calculated your final buyout when the buyer's last payment closed the contract. Your share is now 0% — capital returned, position closed.
          </p>
        </div>
      </div>
    </div>
  );
}

function BuyerContract({ contract, contracts, activeId, onSelectContract, ownership, showAll, setShowAll, onExit }) {
  if (contract.status === 'complete') {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold text-[#1A1A1A]">عقودي / My Contracts</h1>
          <ContractSelector contracts={contracts} activeId={activeId} onSelect={onSelectContract} />
        </div>
        <BuyerContractComplete contract={contract} />
      </div>
    );
  }

  const investorShare = 100 - ownership - contract.tamlkOwnership;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-[#1A1A1A]">عقودي / My Contracts</h1>
        <ContractSelector contracts={contracts} activeId={activeId} onSelect={onSelectContract} />
      </div>

      <PaymentReminderBanner contract={contract} ownership={ownership} />

      <PropertyPlaceholder name={contract.name} />
      <div className="flex flex-wrap gap-4 text-sm text-[#64748B] items-center">
        <span>{contract.location}</span>
        <span>·</span>
        <span>{contract.type} · {contract.beds} bed · {contract.baths} bath · {contract.sqm} m²</span>
        <ContractStatusBadge status={contract.status} />
      </div>

      <EjarOccupancyPanel ejar={contract.ejar} buyerName={BUYER.name} />

      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
        <h2 className="text-lg font-semibold text-[#2E5090] mb-4">توزيع الملكية / Ownership Split</h2>
        <div className="h-10 rounded-lg overflow-hidden flex">
          <div className="bg-[#1C396A] flex items-center justify-center text-white text-sm font-medium" style={{ width: `${ownership}%` }}>
            Ahmad {ownership}%
          </div>
          <div className="bg-[#2E5090] flex items-center justify-center text-white text-sm font-medium" style={{ width: `${investorShare}%` }}>
            Investors {investorShare.toFixed(1)}%
          </div>
          <div className="bg-[#CBD5E1] flex items-center justify-center text-[#64748B] text-sm font-medium" style={{ width: `${contract.tamlkOwnership}%` }}>
            Tamlk {contract.tamlkOwnership}%
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
        <h2 className="text-lg font-semibold text-[#2E5090] mb-4">المعالم / Milestone Tracker</h2>
        <div className="relative pt-6 pb-2">
          <div className="h-3 bg-[#E2E8F0] rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#1C396A] to-[#2E5090] rounded-full transition-all duration-700" style={{ width: `${ownership}%` }} />
          </div>
          {[0, 25, 50, 75, 100].map((m) => (
            <div key={m} className="absolute top-0 flex flex-col items-center" style={{ left: `${m}%`, transform: 'translateX(-50%)' }}>
              <div className={`w-4 h-4 rounded-full border-2 ${ownership >= m ? 'bg-[#1C396A] border-[#1C396A]' : 'bg-white border-[#CBD5E1]'}`} />
              <span className="text-xs text-[#64748B] mt-6">{m}%</span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-[#2E5090] font-medium flex items-center gap-2">
          <Clock size={16} /> Next milestone: {contract.nextMilestone}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
          <div className="px-6 py-4 border-b border-[#E2E8F0] flex justify-between items-center">
            <h2 className="text-lg font-semibold text-[#2E5090]">التقدم الشهري / Month-by-Month Progression</h2>
            <button onClick={() => setShowAll(!showAll)} className="text-sm text-[#2E5090] hover:underline">
              {showAll ? 'Show 12 months' : 'Show all 240 months'}
            </button>
          </div>
          <div className="overflow-x-auto max-h-96 overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0">
                <tr className="bg-[#2B3D5F] text-white">
                  <th className="px-3 py-2 text-left">Month</th>
                  <th className="px-3 py-2 text-left">Payment</th>
                  <th className="px-3 py-2 text-left">Rent Portion</th>
                  <th className="px-3 py-2 text-left">Buyout</th>
                  <th className="px-3 py-2 text-left">Cumulative</th>
                  <th className="px-3 py-2 text-left">Remaining</th>
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
                    className={`border-b border-[#E2E8F0] hover:bg-[#F8F9FB] ${
                      row.status === 'paid' ? 'border-l-4 border-l-[#16A34A]' :
                      row.status === 'upcoming' ? 'border-l-4 border-l-[#D97706] bg-amber-50/30' : ''
                    }`}
                  >
                    <td className="px-3 py-2">{row.month}</td>
                    <td className="px-3 py-2">{fmt(row.payment)}</td>
                    <td className="px-3 py-2">{typeof row.rent === 'number' ? fmt(row.rent) : row.rent}</td>
                    <td className="px-3 py-2">{fmt(row.buyout)}</td>
                    <td className="px-3 py-2 text-[#1C396A]">{row.cumulative}</td>
                    <td className="px-3 py-2">{row.remaining}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 space-y-4 h-fit">
            <h2 className="text-lg font-semibold text-[#2E5090]">تفاصيل العقد / Contract Details</h2>
            <div className="space-y-3 text-sm">
              <div><span className="text-[#64748B]">Contract type:</span> <span className="font-medium">Diminishing Musharaka</span></div>
              <div className="flex items-center gap-2">
                <span className="text-[#64748B]">Sharia board:</span>
                <span className="px-2 py-0.5 rounded bg-green-50 text-[#16A34A] text-xs font-medium">Certified ✓</span>
              </div>
              <div><span className="text-[#64748B]">Contract ID:</span> <span className="font-mono">{contract.contractId}</span></div>
              <div><span className="text-[#64748B]">Start date:</span> <span>{contract.contractStart}</span></div>
              <div><span className="text-[#64748B]">Term:</span> <span>{contract.contractMonths} months</span></div>
            </div>
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#1C396A] text-white rounded-lg hover:bg-[#2E5090] transition-colors">
              <Download size={16} /> Download Contract PDF
            </button>
          </div>

          {/* PRD 4.1 — option to sell remaining shares on secondary market */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
            <h3 className="font-semibold text-[#1A1A1A] mb-2">خيار الخروج / Exit Option</h3>
            <p className="text-sm text-[#64748B] mb-3">
              Can't continue? Sell your {ownership}% ownership share on the secondary market instead of holding to 100%.
            </p>
            <button onClick={onExit} className="w-full px-4 py-2 border border-[#D97706] text-[#D97706] rounded-lg hover:bg-[#D97706] hover:text-white transition-colors text-sm font-medium">
              List My Share for Sale
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
                  active ? 'bg-[#1C396A] text-white ring-4 ring-[#1C396A]/15' :
                  'bg-[#E2E8F0] text-[#64748B]'
                }`}
              >
                {done ? <Check size={14} /> : i + 1}
              </div>
              <div className="hidden sm:block">
                <p className={`text-xs font-semibold ${active ? 'text-[#1C396A]' : done ? 'text-[#16A34A]' : 'text-[#64748B]'}`}>
                  {step.label}
                </p>
                {step.sub && <p className="text-[10px] text-[#64748B]">{step.sub}</p>}
              </div>
            </div>
            {i < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-3 rounded transition-colors duration-500 ${done ? 'bg-[#16A34A]' : 'bg-[#E2E8F0]'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function WalletCheckoutPanel({ walletBalance, amount, onTopUp }) {
  const sufficient = walletBalance >= amount;
  const shortfall = Math.max(0, amount - walletBalance);

  return (
    <div className="rounded-xl border-2 border-[#E2E8F0] p-5 space-y-4 bg-white">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-xl bg-[#1C396A] text-white">
          <Wallet size={22} />
        </div>
        <div>
          <p className="font-semibold text-[#1A1A1A]">{WALLET_PAYMENT_LABEL}</p>
          <p className="text-xs text-[#64748B]">All payments are deducted from your wallet — top up first if needed</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="p-4 rounded-xl bg-[#F8F9FB] border border-[#E2E8F0]">
          <p className="text-[#64748B] text-xs uppercase tracking-wider">Your balance</p>
          <p className={`text-2xl font-bold mt-1 ${sufficient ? 'text-[#16A34A]' : 'text-[#C0504D]'}`}>{fmt(walletBalance)}</p>
        </div>
        <div className="p-4 rounded-xl bg-[#F8F9FB] border border-[#E2E8F0]">
          <p className="text-[#64748B] text-xs uppercase tracking-wider">Amount due</p>
          <p className="text-2xl font-bold text-[#1C396A] mt-1">{fmt(amount)}</p>
        </div>
      </div>

      {sufficient ? (
        <div className="flex items-center gap-2 text-sm text-[#16A34A] bg-green-50 border border-green-100 rounded-lg px-4 py-3">
          <CircleCheck size={16} />
          <span>Balance sufficient — ready to pay from wallet</span>
        </div>
      ) : (
        <div className="rounded-xl bg-red-50 border border-red-100 p-4 space-y-3">
          <p className="text-sm text-[#C0504D] font-medium flex items-center gap-2">
            <AlertCircle size={16} />
            Short by {fmt(shortfall)} — top up your wallet to continue
          </p>
          <button
            type="button"
            onClick={() => onTopUp(shortfall)}
            className="w-full py-3 bg-[#1C396A] text-white rounded-xl font-semibold hover:bg-[#2E5090] transition-colors flex items-center justify-center gap-2"
          >
            <Plus size={16} /> Top Up {fmt(shortfall)}
          </button>
        </div>
      )}

      <p className="text-xs text-[#64748B] leading-relaxed">
        Fund your wallet via card, Apple Pay, or bank transfer. Monthly payments and investments are never charged directly to your card.
      </p>
    </div>
  );
}

function PaymentProcessing({ label }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-5">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-[#E2E8F0]" />
        <div className="absolute inset-0 rounded-full border-4 border-[#1C396A] border-t-transparent animate-spin" />
        <Lock size={20} className="absolute inset-0 m-auto text-[#1C396A]" />
      </div>
      <div className="text-center">
        <p className="font-semibold text-[#1A1A1A]">{label}</p>
        <p className="text-sm text-[#64748B] mt-1">Secured · Sharia-compliant · Encrypted</p>
      </div>
    </div>
  );
}

function PaymentReceipt({ title, amount, lines, method, reference, onDone, doneLabel }) {
  return (
    <div className="max-w-lg mx-auto space-y-6 animate-in fade-in">
      <div className="text-center space-y-3">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto">
          <CircleCheck size={44} className="text-[#16A34A]" />
        </div>
        <h2 className="text-2xl font-bold text-[#16A34A]">{title}</h2>
        <p className="text-4xl font-bold text-[#1C396A] tracking-tight">{fmt(amount)}</p>
      </div>

      <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-sm">
        <div className="px-5 py-4 bg-[#F8F9FB] border-b border-[#E2E8F0] flex items-center gap-2">
          <Receipt size={16} className="text-[#2E5090]" />
          <span className="text-sm font-semibold text-[#2E5090]">Payment Receipt</span>
        </div>
        <div className="p-5 space-y-3 text-sm">
          {lines.map((line) => (
            <div key={line.label} className="flex justify-between gap-4">
              <span className="text-[#64748B]">{line.label}</span>
              <span className={`font-medium text-right ${line.accent || 'text-[#1A1A1A]'}`}>{line.value}</span>
            </div>
          ))}
          <div className="flex justify-between gap-4 pt-3 border-t border-[#E2E8F0]">
            <span className="text-[#64748B]">Method</span>
            <span className="font-medium">{WALLET_PAYMENT_LABEL}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-[#64748B]">Reference</span>
            <span className="font-mono text-xs">{reference}</span>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onDone}
        className="w-full py-3.5 bg-[#1C396A] text-white font-semibold rounded-xl hover:bg-[#2E5090] transition-colors"
      >
        {doneLabel}
      </button>
    </div>
  );
}

function PaymentOverview({ contracts, ownershipMap, walletBalance }) {
  const payable = contracts.filter((c) => c.status !== 'complete');
  const completed = contracts.filter((c) => c.status === 'complete');
  const totalDue = payable.reduce((s, c) => s + c.monthlyPayment, 0);
  const totalRent = payable.reduce((s, c) => s + c.rentComponent, 0);
  const totalBuyout = payable.reduce((s, c) => s + c.buyoutComponent, 0);
  const overdue = payable.filter((c) => c.status === 'delinquent');
  const overdueAmount = overdue.reduce((s, c) => s + c.monthlyPayment, 0);
  const sorted = [...payable].sort((a, b) => a.daysUntilDue - b.daysUntilDue);
  const nextDue = sorted.find((c) => c.status !== 'delinquent') || sorted[0];

  return (
    <div className="rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-sm">
      <div className="bg-gradient-to-br from-[#1C396A] via-[#2B3D5F] to-[#1C396A] px-6 py-7 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07]" style={{
          backgroundImage: 'radial-gradient(circle at 80% 20%, white 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }} />
        <div className="relative flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <p className="text-sm opacity-70 uppercase tracking-widest">نظرة عامة / Payment Overview</p>
            <p className="text-5xl font-bold mt-2 tracking-tight">{fmt(totalDue)}</p>
            <p className="text-sm opacity-80 mt-2">
              Due across {payable.length} active home{payable.length !== 1 ? 's' : ''}
              {completed.length > 0 && ` · ${completed.length} fully owned`}
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:gap-4">
            {[
              { label: 'Rent portion', value: fmt(totalRent) },
              { label: 'Buyout portion', value: fmt(totalBuyout) },
              { label: 'Wallet', value: fmt(walletBalance) },
              { label: overdue.length > 0 ? 'Overdue' : 'Next due', value: overdue.length > 0 ? fmt(overdueAmount) : (nextDue ? nextDue.nextPaymentDue : '—') },
            ].map((item) => (
              <div key={item.label} className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
                <p className="text-[10px] uppercase tracking-wider opacity-70">{item.label}</p>
                <p className="text-lg font-bold mt-1">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white divide-y divide-[#E2E8F0]">
        {payable.map((c) => {
          const ownership = ownershipMap[c.id] ?? c.ownership;
          const isOverdue = c.status === 'delinquent';
          return (
            <div key={c.id} className="flex items-center gap-4 px-6 py-4 hover:bg-[#F8F9FB] transition-colors">
              <div className={`w-2 h-2 rounded-full flex-shrink-0 ${isOverdue ? 'bg-[#C0504D]' : c.daysUntilDue <= 7 ? 'bg-[#D97706]' : 'bg-[#16A34A]'}`} />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-[#1A1A1A] text-sm truncate">{c.name}</p>
                <p className="text-xs text-[#64748B] mt-0.5">
                  {isOverdue ? `${Math.abs(c.daysUntilDue)} days overdue` : `Due ${c.nextPaymentDue}`} · {ownership}% owned
                </p>
              </div>
              <p className={`font-bold text-sm flex-shrink-0 ${isOverdue ? 'text-[#C0504D]' : 'text-[#1C396A]'}`}>
                {fmt(c.monthlyPayment)}
              </p>
              {isOverdue && (
                <span className="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full bg-red-50 text-[#C0504D] font-bold border border-red-100 flex-shrink-0">
                  Overdue
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
              <p className="text-xs text-amber-700 mt-0.5">100% owned · Completed {c.completedDate} · No payment due</p>
            </div>
            <span className="text-xs font-semibold text-amber-700 flex-shrink-0">Fully owned ✓</span>
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
    <div className="border-b border-[#E2E8F0]">
      <div className="flex gap-0 overflow-x-auto scrollbar-none">
        {contracts.map((c) => {
          const isActive = c.id === activeId;
          const isOverdue = c.status === 'delinquent';
          return (
            <button
              key={c.id}
              onClick={() => onSelect(c.id)}
              className={`relative flex items-center gap-2 px-5 py-4 text-sm font-medium whitespace-nowrap transition-colors border-b-2 -mb-px ${
                isActive
                  ? 'border-[#1C396A] text-[#1C396A]'
                  : 'border-transparent text-[#64748B] hover:text-[#2E5090] hover:border-[#E2E8F0]'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isOverdue ? 'bg-[#C0504D]' : 'bg-[#16A34A]'}`} />
              {shortName(c.name)}
              <span className="text-xs opacity-60">{fmt(c.monthlyPayment)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function BuyerPayment({
  contracts, activeId, onSelectContract, ownershipMap, onPay, paymentSuccess, onClearSuccess, walletBalance, onTopUp,
}) {
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
    { name: 'Rent portion', value: contract.rentComponent, color: '#2E5090' },
    { name: 'Buyout', value: contract.buyoutComponent, color: '#1C396A' },
  ];

  const flowSteps = [
    { id: 'review', label: 'Review', sub: 'Breakdown' },
    { id: 'wallet', label: 'Wallet', sub: 'Top up if needed' },
    { id: 'confirm', label: 'Confirm', sub: 'Authorize' },
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
        title="Payment confirmed!"
        amount={amount}
        method="wallet"
        reference={reference}
        onDone={resetFlow}
        doneLabel="← Back to payments"
        lines={[
          { label: 'Property', value: contract.name },
          { label: 'Rent portion', value: fmt(contract.rentComponent) },
          { label: 'Buyout portion', value: fmt(contract.buyoutComponent) },
          { label: 'New ownership', value: `${newOwnership.toFixed(1)}%`, accent: 'text-[#1C396A] font-bold' },
          { label: 'Contract', value: contract.contractId },
        ]}
      />
    );
  }

  return (
    <div className="space-y-0">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1A1A1A]">الدفع / Make Payment</h1>
        <p className="text-sm text-[#64748B] mt-1">Review your payment, ensure wallet balance, then confirm.</p>
      </div>

      <PaymentOverview contracts={contracts} ownershipMap={ownershipMap} walletBalance={walletBalance} />

      <div className="mt-6 bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
        <PropertyPaymentTabs contracts={sortedContracts} activeId={activeId} onSelect={handleSelectContract} />

        <div className="px-6 py-5 border-b border-[#E2E8F0] bg-[#F8F9FB]/60">
          <FlowStepper steps={flowSteps} current={step === 'processing' ? 'confirm' : step} />
        </div>

        <div className="p-6 space-y-5 max-w-3xl">
          {step === 'processing' && <PaymentProcessing label="Processing your Musharaka payment…" />}

          {step === 'review' && (
            <>
              {isOverdue && <PaymentReminderBanner contract={contract} ownership={ownership} />}

              <div className={`rounded-xl border p-6 ${isOverdue ? 'border-[#C0504D]/30 bg-red-50/20' : 'border-[#E2E8F0] bg-[#F8F9FB]/50'}`}>
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-[#64748B] mb-1">
                      {isOverdue ? 'Overdue payment' : 'Next payment'}
                    </p>
                    <h2 className="text-lg font-bold text-[#1A1A1A]">{contract.name}</h2>
                    <p className={`text-4xl font-bold mt-2 ${isOverdue ? 'text-[#C0504D]' : 'text-[#1C396A]'}`}>
                      {fmt(amount)}
                    </p>
                    <p className="text-sm text-[#64748B] mt-1">
                      {isOverdue ? `Was due ${contract.nextPaymentDue}` : `Due ${contract.nextPaymentDue}`}
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

                <div className="flex gap-4 text-sm mb-6 pb-6 border-b border-[#E2E8F0]">
                  <div className="flex-1 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2E5090]" />
                    <span className="text-[#64748B]">Rent → investors</span>
                    <span className="font-semibold ml-auto">{fmt(contract.rentComponent)}</span>
                  </div>
                  <div className="flex-1 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#1C396A]" />
                    <span className="text-[#64748B]">Buyout → co-owners</span>
                    <span className="font-semibold ml-auto">{fmt(contract.buyoutComponent)}</span>
                  </div>
                </div>

                <PaymentBreakdownExplainer contract={contract} ownership={ownership} />
              </div>

              {!isOverdue && (
                <div className="rounded-xl border border-[#E2E8F0] p-5 bg-white">
                  <h3 className="font-semibold text-[#2E5090] mb-3 text-sm">After this payment</h3>
                  <p className="text-sm text-[#64748B] mb-3">
                    Ownership grows <strong>{ownership}%</strong> → <strong>{newOwnership.toFixed(1)}%</strong>
                  </p>
                  <div className="h-2.5 bg-[#E2E8F0] rounded-full overflow-hidden relative">
                    <div className="absolute h-full bg-[#1C396A]/25 rounded-full" style={{ width: `${newOwnership}%` }} />
                    <div className="absolute h-full bg-[#1C396A] rounded-full transition-all duration-500" style={{ width: `${ownership}%` }} />
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={() => setStep('wallet')}
                className={`w-full py-4 text-white text-lg font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl ${
                  isOverdue ? 'bg-[#C0504D] hover:bg-red-700' : 'bg-[#1C396A] hover:bg-[#2E5090]'
                }`}
              >
                Continue to wallet →
              </button>
            </>
          )}

          {step === 'wallet' && (
            <>
              <WalletCheckoutPanel
                walletBalance={walletBalance}
                amount={amount}
                onTopUp={onTopUp}
              />
              <div className="flex gap-3">
                <button type="button" onClick={() => setStep('review')} className="flex-1 py-3 border border-[#E2E8F0] rounded-xl text-[#64748B] hover:bg-[#F8F9FB] transition-colors">
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep('confirm')}
                  disabled={!walletSufficient}
                  className="flex-[2] py-3 bg-[#1C396A] text-white font-semibold rounded-xl hover:bg-[#2E5090] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Review & confirm →
                </button>
              </div>
            </>
          )}

          {step === 'confirm' && (
            <>
              <div className="rounded-xl border border-[#E2E8F0] overflow-hidden">
                <div className="px-5 py-4 bg-gradient-to-r from-[#1C396A] to-[#2B3D5F] text-white">
                  <p className="text-xs uppercase tracking-widest opacity-70">Order summary</p>
                  <p className="text-3xl font-bold mt-1">{fmt(amount)}</p>
                </div>
                <div className="p-5 space-y-3 text-sm bg-white">
                  <div className="flex justify-between"><span className="text-[#64748B]">Property</span><span className="font-medium">{contract.name}</span></div>
                  <div className="flex justify-between"><span className="text-[#64748B]">Rent (investors)</span><span>{fmt(contract.rentComponent)}</span></div>
                  <div className="flex justify-between"><span className="text-[#64748B]">Buyout (Tamlk + investors)</span><span>{fmt(contract.buyoutComponent)}</span></div>
                  <div className="flex justify-between"><span className="text-[#64748B]">Ownership after</span><span className="font-bold text-[#1C396A]">{newOwnership.toFixed(1)}%</span></div>
                  <div className="flex justify-between pt-2 border-t border-[#E2E8F0]"><span className="text-[#64748B]">Paid from</span><span className="font-medium">{WALLET_PAYMENT_LABEL}</span></div>
                  <div className="flex justify-between"><span className="text-[#64748B]">Balance after</span><span className="font-medium">{fmt(walletBalance - amount)}</span></div>
                </div>
              </div>

              <label className="flex items-start gap-3 p-4 rounded-xl border border-[#E2E8F0] cursor-pointer hover:bg-[#F8F9FB] transition-colors">
                <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-1 accent-[#1C396A]" />
                <span className="text-sm text-[#64748B] leading-relaxed">
                  I authorize this payment under my Diminishing Musharaka contract <span className="font-mono text-xs">{contract.contractId}</span>. Funds will be allocated to rent and buyout per Sharia board guidelines.
                </span>
              </label>

              <div className="flex gap-3">
                <button type="button" onClick={() => setStep('wallet')} className="flex-1 py-3 border border-[#E2E8F0] rounded-xl text-[#64748B] hover:bg-[#F8F9FB] transition-colors">
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={runPayment}
                  disabled={!agreed || !walletSufficient}
                  className={`flex-[2] py-4 text-white text-lg font-semibold rounded-xl transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${
                    isOverdue ? 'bg-[#C0504D] hover:bg-red-700' : 'bg-[#1C396A] hover:bg-[#2E5090]'
                  }`}
                >
                  {isOverdue ? `Pay overdue ${fmt(amount)}` : `Pay ${fmt(amount)}`}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function BuyerWallet({ balance, onTopUp }) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#1A1A1A]">محفظتي / Wallet</h1>

      <div className="bg-gradient-to-r from-[#1C396A] to-[#2E5090] rounded-xl p-8 text-white">
        <p className="text-sm opacity-80">Available Balance</p>
        <p className="text-4xl font-bold mt-1">{fmt(balance)}</p>
        <p className="text-sm opacity-60 mt-2">{fmt(0)} pending</p>
        <button
          onClick={onTopUp}
          className="mt-4 px-6 py-2 bg-white text-[#1C396A] rounded-lg font-semibold hover:bg-white/90 transition-colors flex items-center gap-2"
        >
          <Plus size={16} /> Top Up
        </button>
      </div>

      <div className="bg-white rounded-xl border border-[#E2E8F0] p-5 flex items-start gap-3">
        <Wallet size={20} className="text-[#2E5090] flex-shrink-0 mt-0.5" />
        <p className="text-sm text-[#64748B] leading-relaxed">
          Top up via card, Apple Pay, or bank transfer. All monthly Musharaka payments are deducted from this wallet balance only.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#E2E8F0]">
          <h2 className="text-lg font-semibold text-[#2E5090]">سجل المعاملات / Transaction History</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#2B3D5F] text-white">
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Description</th>
              <th className="px-4 py-3 text-left">Amount</th>
              <th className="px-4 py-3 text-left">Balance</th>
            </tr>
          </thead>
          <tbody>
            {WALLET_TRANSACTIONS.map((t, i) => (
              <tr key={i} className="border-b border-[#E2E8F0] hover:bg-[#F8F9FB]">
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
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#1A1A1A]">الدعم / Support</h1>
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-8 text-center">
        <HeadphonesIcon size={48} className="mx-auto text-[#2E5090] mb-4" />
        <h2 className="text-xl font-semibold text-[#1A1A1A] mb-2">How can we help?</h2>
        <p className="text-[#64748B] mb-6">Our support team is available Sunday–Thursday, 9 AM – 6 PM AST</p>
        <div className="flex gap-4 justify-center">
          <button className="px-6 py-3 bg-[#1C396A] text-white rounded-lg hover:bg-[#2E5090] transition-colors">Start Live Chat</button>
          <button className="px-6 py-3 border border-[#E2E8F0] rounded-lg hover:bg-[#F8F9FB] transition-colors">Submit a Ticket</button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// INVESTOR VIEW
// ═══════════════════════════════════════════════════════════════════

function InvestorDashboard({ listingSuspended, onNavigate }) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#1A1A1A]">أهلاً، {INVESTOR.nameAr} / Hello, Sara</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="إجمالي الاستثمار / Total Invested" value={fmt(INVESTOR.totalInvested)} icon={Briefcase} />
        <StatCard label="الدخل الشهري / Monthly Income" value={`${fmt(480)} / month`} icon={TrendingUp} />
        <StatCard label="إجمالي المستلم / Total Received" value={fmt(INVESTOR.totalReceived)} icon={Wallet} />
        <StatCard label="التوزيع القادم / Next Distribution" value="1 July 2025" icon={Clock} />
      </div>

      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
        <h2 className="text-lg font-semibold text-[#2E5090] mb-4">أداء المحفظة / Portfolio Performance</h2>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={PORTFOLIO_PERFORMANCE}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748B' }} />
            <YAxis tick={{ fontSize: 12, fill: '#64748B' }} tickFormatter={(v) => fmt(v)} />
            <Tooltip formatter={(v) => fmt(v)} />
            <Area type="monotone" dataKey="total" stroke="#1C396A" fill="#1C396A" fillOpacity={0.15} strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-[#2E5090] mb-4">المراكز النشطة / Active Positions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {INVESTOR.portfolio.filter((p) => p.status === 'Active').map((p, i) => (
            <div key={i} className="bg-white rounded-xl border border-[#E2E8F0] p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-semibold text-[#1A1A1A]">{p.name}</h3>
                {p.name.includes('Jeddah') && listingSuspended ? (
                  <span className="text-xs px-2 py-1 rounded-full bg-amber-50 text-[#D97706]">Buyer overdue ⚠️</span>
                ) : (
                  <span className="text-xs px-2 py-1 rounded-full bg-green-50 text-[#16A34A]">Active 🟢</span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-[#64748B]">Invested:</span> <span className="font-medium">{fmt(p.invested)}</span></div>
                <div><span className="text-[#64748B]">Share:</span> <span className="font-medium">{p.share}%</span></div>
                <div><span className="text-[#64748B]">Monthly:</span> <span className="font-medium">{fmt(p.monthly)}</span></div>
                <div><span className="text-[#64748B]">Received:</span> <span className="font-medium">{fmt(p.received)}</span></div>
                <div className="col-span-2"><span className="text-[#64748B]">Property value:</span> <span className="font-medium">{fmt(p.value)}</span></div>
              </div>
            </div>
          ))}
        </div>
        {INVESTOR.portfolio.some((p) => p.status === 'Complete') && (
          <button
            type="button"
            onClick={() => onNavigate('portfolio')}
            className="mt-4 w-full p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between hover:bg-amber-100/80 hover:border-amber-300 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <Trophy size={20} className="text-amber-600" />
              <div>
                <p className="font-medium text-[#1A1A1A] text-sm">Dammam Marina — buyout complete</p>
                <p className="text-xs text-[#64748B]">SAR 35,000 invested → SAR 48,200 returned (+37.7%)</p>
              </div>
            </div>
            <span className="text-xs text-amber-700 font-medium">View in Portfolio →</span>
          </button>
        )}
      </div>
    </div>
  );
}

function InvestorPortfolio() {
  const active = INVESTOR.portfolio.filter((p) => p.status === 'Active');
  const completed = INVESTOR.portfolio.filter((p) => p.status === 'Complete');

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-[#1A1A1A]">محفظتي / My Portfolio</h1>

      {completed.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-amber-700 mb-4 flex items-center gap-2">
            <Trophy size={18} /> مكتملة / Completed — Full Buyout
          </h2>
          {completed.map((p, i) => (
            <InvestorBuyoutComplete key={i} position={p} />
          ))}
        </div>
      )}

      <div>
        <h2 className="text-lg font-semibold text-[#2E5090] mb-4">نشطة / Active Positions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {active.map((p, i) => (
            <div key={i} className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden hover:shadow-md transition-shadow">
              <PropertyPlaceholder name={p.name} className="h-36" />
              <div className="p-6 space-y-3">
                <div className="flex justify-between">
                  <span className="text-[#64748B] text-sm">Invested</span>
                  <span className="font-bold text-[#1C396A]">{fmt(p.invested)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B] text-sm">Ownership Share</span>
                  <span className="font-medium">{p.share}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B] text-sm">Monthly Distribution</span>
                  <span className="font-medium text-[#16A34A]">{fmt(p.monthly)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B] text-sm">Total Received</span>
                  <span className="font-medium">{fmt(p.received)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function OpportunityStatusBadge({ status, riskNote }) {
  const styles = {
    open: 'bg-green-50 text-[#16A34A] border-green-200',
    full: 'bg-[#E2E8F0] text-[#64748B] border-[#CBD5E1]',
  };
  const labels = { open: 'Open for investment', full: 'Fully funded' };
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles[status] || styles.open}`}>
        {labels[status] || status}
      </span>
      {riskNote && status === 'full' && (
        <span className="text-xs text-[#D97706] flex items-center gap-1"><AlertCircle size={12} /> {riskNote}</span>
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
          ? 'border-[#E2E8F0] opacity-75 cursor-not-allowed'
          : 'border-[#E2E8F0] hover:border-[#2E5090] hover:shadow-lg hover:-translate-y-0.5'
      }`}
    >
      <div className="relative">
        <PropertyPlaceholder name={opp.name} className="h-40 rounded-none" />
        {opp.featured && (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-amber-400 text-amber-950 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
            <Sparkles size={10} /> Featured
          </span>
        )}
        <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/95 text-[#16A34A] text-xs font-bold shadow-sm">
          {opp.annualReturn}% p.a.
        </span>
      </div>

      <div className="p-5 space-y-4">
        <div>
          <h3 className="font-bold text-[#1A1A1A] group-hover:text-[#1C396A] transition-colors">{opp.name}</h3>
          <p className="text-xs text-[#64748B] mt-1 flex items-center gap-1"><MapPin size={12} /> {opp.location}</p>
          <p className="text-xs text-[#2E5090] mt-1.5 flex items-center gap-1 font-medium">
            <Users size={12} /> Home buyer: {opp.buyerName}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 text-xs text-[#64748B]">
          <span className="px-2 py-0.5 rounded-md bg-[#F8F9FB] border border-[#E2E8F0]">{opp.type}</span>
          <span className="px-2 py-0.5 rounded-md bg-[#F8F9FB] border border-[#E2E8F0]">{opp.beds} bed</span>
          <span className="px-2 py-0.5 rounded-md bg-[#F8F9FB] border border-[#E2E8F0]">{opp.sqm} m²</span>
        </div>

        <div>
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-[#64748B]">{fundedPct}% funded</span>
            <span className="font-semibold text-[#2E5090]">{fmt(opp.investorFunding)} / {fmt(opp.fundingTarget)}</span>
          </div>
          <div className="h-2 bg-[#E2E8F0] rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${opp.status === 'full' ? 'bg-[#CBD5E1]' : 'bg-[#2E5090]'}`}
              style={{ width: `${Math.min(fundedPct, 100)}%` }}
            />
          </div>
        </div>

        <div className="flex justify-between items-end pt-1">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-[#64748B]">From</p>
            <p className="text-lg font-bold text-[#1C396A]">{fmt(opp.minInvestment)}</p>
            <p className="text-xs text-[#64748B]">{fmt(opp.monthlyPer10k)}/mo per 10k</p>
          </div>
          {opp.status === 'full' ? (
            <span className="text-xs font-medium text-[#64748B]">Closed</span>
          ) : suspended ? (
            <span className="text-xs font-medium text-[#D97706]">Buyer overdue ⚠️</span>
          ) : (
            <span className="text-sm font-semibold text-[#2E5090] flex items-center gap-1 group-hover:gap-2 transition-all">
              View <ChevronRight size={16} />
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
}) {
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
    { id: 'amount', label: 'Amount', sub: 'Your share' },
    { id: 'wallet', label: 'Wallet', sub: 'Top up if needed' },
    { id: 'confirm', label: 'Confirm', sub: 'Authorize' },
  ];

  const listable = opportunities.filter(isListableOpportunity);

  const filtered = listable.filter((o) => {
    const matchSearch = !search || o.name.toLowerCase().includes(search.toLowerCase()) || o.location.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || (filter === 'villa' && o.type === 'Villa') || (filter === 'apartment' && o.type === 'Apartment') || (filter === 'open' && o.status === 'open');
    return matchSearch && matchFilter;
  });

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
        title="Investment confirmed!"
        amount={returns.totalInvested}
        method="wallet"
        reference={reference}
        onDone={resetInvestFlow}
        doneLabel="← Browse more opportunities"
        lines={[
          { label: 'Property', value: opp.name },
          { label: 'Share purchased', value: `${returns.share}%`, accent: 'text-[#1C396A] font-bold' },
          { label: 'Principal', value: fmt(investAmount) },
          { label: 'Platform fee (2%)', value: fmt(returns.platformFee) },
          { label: 'Est. monthly distribution', value: fmt(returns.monthly), accent: 'text-[#16A34A] font-bold' },
        ]}
      />
    );
  }

  if (selectedId && opp && step !== 'browse') {
    return (
      <div className="space-y-6">
        <button type="button" onClick={() => { setStep('browse'); setAgreed(false); onBack(); }} className="flex items-center gap-2 text-sm text-[#2E5090] hover:text-[#1C396A] transition-colors">
          <ArrowLeft size={16} /> Back to opportunities
        </button>

        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-[#E2E8F0] bg-[#F8F9FB]/60">
            <FlowStepper steps={flowSteps} current={step === 'processing' ? 'confirm' : step} />
          </div>

          <div className="p-6 max-w-3xl space-y-5">
            {step === 'processing' && <PaymentProcessing label="Allocating your co-ownership share…" />}

            {(step === 'amount' || step === 'wallet' || step === 'confirm') && (
              <div className="flex items-center gap-3 pb-2 border-b border-[#E2E8F0]">
                <PropertyPlaceholder name={opp.name} className="h-16 w-24 rounded-lg flex-shrink-0" />
                <div>
                  <h2 className="font-bold text-[#1A1A1A]">{opp.name}</h2>
                  <p className="text-xs text-[#64748B]">{opp.location} · {opp.type}</p>
                </div>
              </div>
            )}

            {step === 'amount' && returns && (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-[#F8F9FB] rounded-xl border border-[#E2E8F0] p-5">
                      <h3 className="font-semibold text-[#2E5090] mb-3 text-sm">Property snapshot</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between"><span className="text-[#64748B]">Total value</span><span className="font-medium">{fmt(opp.totalValue)}</span></div>
                        <div className="flex justify-between"><span className="text-[#64748B]">Home buyer</span><span className="font-medium">{opp.buyerName}</span></div>
                        <div className="flex justify-between"><span className="text-[#64748B]">Buyer ownership</span><span>{opp.buyerOwnership}%</span></div>
                        <div className="flex justify-between"><span className="text-[#64748B]">Contract</span><span>Diminishing Musharaka</span></div>
                        <div className="flex justify-between"><span className="text-[#64748B]">Investors</span><span>{opp.investorCount}</span></div>
                      </div>
                      <div className="mt-4"><ShariaBadge /></div>
                    </div>

                    {opp.ejar && (
                      <div className="bg-white rounded-xl border border-[#E2E8F0] p-5">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold text-[#2E5090] text-sm">Occupancy (Ejar)</h3>
                          <EjarBadge />
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between"><span className="text-[#64748B]">Occupant</span><span>{opp.ejar.occupantName}</span></div>
                          <div className="flex justify-between"><span className="text-[#64748B]">Usage rent</span><span className="font-medium">{fmt(opp.ejar.usageRentAmount)}/mo</span></div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
                    <h3 className="text-lg font-semibold text-[#2E5090] mb-4">حاسبة العائد / Return Calculator</h3>
                    <label className="text-sm text-[#64748B]">Investment amount</label>
                    <input
                      type="range"
                      min={opp.minInvestment}
                      max={500000}
                      step={1000}
                      value={investAmount}
                      onChange={(e) => setInvestAmount(Number(e.target.value))}
                      className="w-full mt-2 accent-[#1C396A]"
                    />
                    <p className="text-3xl font-bold text-[#1C396A] mt-2">{fmt(investAmount)}</p>
                    <div className="grid grid-cols-2 gap-3 mt-5 text-sm">
                      <div className="p-3 bg-[#F8F9FB] rounded-lg">
                        <p className="text-[#64748B] text-xs">Monthly distribution</p>
                        <p className="text-lg font-bold text-[#16A34A]">{fmt(returns.monthly)}</p>
                      </div>
                      <div className="p-3 bg-[#F8F9FB] rounded-lg">
                        <p className="text-[#64748B] text-xs">Ownership share</p>
                        <p className="text-lg font-bold">{returns.share}%</p>
                      </div>
                      <div className="p-3 bg-[#F8F9FB] rounded-lg">
                        <p className="text-[#64748B] text-xs">Platform fee (2%)</p>
                        <p className="text-lg font-bold">{fmt(returns.platformFee)}</p>
                      </div>
                      <div className="p-3 bg-[#F8F9FB] rounded-lg">
                        <p className="text-[#64748B] text-xs">Total due today</p>
                        <p className="text-lg font-bold text-[#1C396A]">{fmt(returns.totalInvested)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep('wallet')}
                  className="w-full py-4 bg-[#1C396A] text-white text-lg font-semibold rounded-xl hover:bg-[#2E5090] transition-colors shadow-lg"
                >
                  Continue to wallet →
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
                  <button type="button" onClick={() => setStep('amount')} className="flex-1 py-3 border border-[#E2E8F0] rounded-xl text-[#64748B] hover:bg-[#F8F9FB]">← Back</button>
                  <button type="button" onClick={() => setStep('confirm')} disabled={!walletSufficient} className="flex-[2] py-3 bg-[#1C396A] text-white font-semibold rounded-xl hover:bg-[#2E5090] disabled:opacity-50">Review & confirm →</button>
                </div>
              </>
            )}

            {step === 'confirm' && returns && (
              <>
                <div className="rounded-xl border border-[#E2E8F0] overflow-hidden">
                  <div className="px-5 py-4 bg-gradient-to-r from-[#1C396A] to-[#2B3D5F] text-white">
                    <p className="text-xs uppercase tracking-widest opacity-70">Investment summary</p>
                    <p className="text-3xl font-bold mt-1">{fmt(returns.totalInvested)}</p>
                  </div>
                  <div className="p-5 space-y-3 text-sm bg-white">
                    <div className="flex justify-between"><span className="text-[#64748B]">Property</span><span className="font-medium">{opp.name}</span></div>
                    <div className="flex justify-between"><span className="text-[#64748B]">Co-ownership share</span><span className="font-bold text-[#1C396A]">{returns.share}%</span></div>
                    <div className="flex justify-between"><span className="text-[#64748B]">Est. monthly income</span><span className="text-[#16A34A] font-medium">{fmt(returns.monthly)}</span></div>
                    <div className="flex justify-between"><span className="text-[#64748B]">Platform commission</span><span>{fmt(returns.platformFee)}</span></div>
                    <div className="flex justify-between pt-2 border-t border-[#E2E8F0]"><span className="text-[#64748B]">Paid from</span><span>{WALLET_PAYMENT_LABEL}</span></div>
                    <div className="flex justify-between"><span className="text-[#64748B]">Balance after</span><span>{fmt(walletBalance - returns.totalInvested)}</span></div>
                  </div>
                </div>

                <label className="flex items-start gap-3 p-4 rounded-xl border border-[#E2E8F0] cursor-pointer hover:bg-[#F8F9FB]">
                  <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-1 accent-[#1C396A]" />
                  <span className="text-sm text-[#64748B] leading-relaxed">
                    I understand this is a co-ownership (Musharaka) investment, not a loan. Distributions come from the home buyer's usage rent. My share may be bought out as the buyer's ownership grows.
                  </span>
                </label>

                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep('wallet')} className="flex-1 py-3 border border-[#E2E8F0] rounded-xl text-[#64748B] hover:bg-[#F8F9FB]">← Back</button>
                  <button type="button" onClick={runInvest} disabled={!agreed || !walletSufficient} className="flex-[2] py-4 bg-[#1C396A] text-white text-lg font-semibold rounded-xl hover:bg-[#2E5090] disabled:opacity-50">
                    Invest {fmt(returns.totalInvested)}
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
        <button type="button" onClick={onBack} className="flex items-center gap-2 text-sm text-[#2E5090] hover:text-[#1C396A] transition-colors">
          <ArrowLeft size={16} /> Back to all opportunities
        </button>

        <PropertyPlaceholder name={opp.name} className="h-56" />
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-[#64748B] flex items-center gap-1"><MapPin size={14} /> {opp.location}</span>
          <span className="text-[#64748B]">· {opp.beds} bed · {opp.baths} bath · {opp.sqm} m²</span>
          <ShariaBadge />
          <OpportunityStatusBadge status={opp.status} riskNote={opp.riskNote} />
        </div>

        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium">{fmt(opp.investorFunding)} of {fmt(opp.fundingTarget)} funded</span>
            <span className="text-[#2E5090] font-bold">{fundedPct}%</span>
          </div>
          <div className="h-3 bg-[#E2E8F0] rounded-full overflow-hidden">
            <div className="h-full bg-[#2E5090] rounded-full" style={{ width: `${Math.min(fundedPct, 100)}%` }} />
          </div>
          <p className="text-sm text-[#64748B] mt-2">{opp.investorCount} investors · Min {fmt(opp.minInvestment)}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 space-y-3 text-sm">
              <h2 className="text-lg font-semibold text-[#2E5090]">معلومات العقار / Property Info</h2>
              <div className="flex justify-between"><span className="text-[#64748B]">Annual return</span><span className="font-bold text-[#16A34A]">{opp.annualReturn}%</span></div>
              <div className="flex justify-between"><span className="text-[#64748B]">Monthly per SAR 10,000</span><span>{fmt(opp.monthlyPer10k)}</span></div>
              <div className="flex justify-between"><span className="text-[#64748B]">Home buyer</span><span className="font-medium">{opp.buyerName}</span></div>
              <div className="flex justify-between"><span className="text-[#64748B]">Buyer ownership</span><span className="font-medium text-[#1C396A]">{opp.buyerOwnership}%</span></div>
            </div>
            {opp.ejar && (
              <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-[#2E5090]">Occupancy Info</h2>
                  <EjarBadge />
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between"><span className="text-[#64748B]">Occupant</span><span>{opp.ejar.occupantName}</span></div>
                  <div className="flex justify-between"><span className="text-[#64748B]">Usage rent</span><span className="font-medium">{fmt(opp.ejar.usageRentAmount)}/mo</span></div>
                  <div className="flex justify-between"><span className="text-[#64748B]">Ejar ref</span><span className="font-mono text-xs">{opp.ejar.ejarRef}</span></div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
            <h2 className="text-lg font-semibold text-[#2E5090] mb-4">حاسبة العائد / Return Calculator</h2>
            <input type="range" min={opp.minInvestment} max={500000} step={1000} value={investAmount} onChange={(e) => setInvestAmount(Number(e.target.value))} className="w-full accent-[#1C396A]" />
            <p className="text-2xl font-bold text-[#1C396A] mt-2">{fmt(investAmount)}</p>
            <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
              <div className="p-3 bg-[#F8F9FB] rounded-lg"><p className="text-[#64748B] text-xs">Monthly</p><p className="text-lg font-bold text-[#16A34A]">{fmt(preview.monthly)}</p></div>
              <div className="p-3 bg-[#F8F9FB] rounded-lg"><p className="text-[#64748B] text-xs">Share</p><p className="text-lg font-bold">{preview.share}%</p></div>
            </div>
            <button
              type="button"
              onClick={() => setStep('amount')}
              className="w-full mt-6 py-3.5 bg-[#1C396A] text-white font-semibold rounded-xl hover:bg-[#2E5090] transition-colors flex items-center justify-center gap-2"
            >
              Start investment <ArrowRight size={18} />
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
          <h1 className="text-2xl font-bold text-[#1A1A1A]">الفرص / Opportunities</h1>
          <p className="text-sm text-[#64748B] mt-1">Only homes with a signed Musharaka buyer are listed. Co-invest from {fmt(5000)} via your wallet.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1C396A]/5 border border-[#1C396A]/10 text-sm">
          <Users size={16} className="text-[#1C396A]" />
          <span><strong className="text-[#1C396A]">{openCount}</strong> open · buyer assigned</span>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-sm text-[#2E5090] flex items-start gap-2">
        <Shield size={16} className="flex-shrink-0 mt-0.5" />
        <span>Properties appear here only after a home buyer signs a Diminishing Musharaka contract. Your distributions come from their verified usage rent (Ejar).</span>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" />
          <input
            type="text"
            placeholder="Search by name or city…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#2E5090] text-sm"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {[
            { id: 'all', label: 'All' },
            { id: 'open', label: 'Open' },
            { id: 'villa', label: 'Villas' },
            { id: 'apartment', label: 'Apartments' },
          ].map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                filter === f.id ? 'bg-[#1C396A] text-white' : 'bg-white border border-[#E2E8F0] text-[#64748B] hover:border-[#2E5090]'
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
        <div className="text-center py-16 text-[#64748B]">
          <Building2 size={40} className="mx-auto mb-3 opacity-40" />
          <p>No properties match your search.</p>
        </div>
      )}
    </div>
  );
}

function InvestorDistributions() {
  const daysUntil = 17;
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#1A1A1A]">التوزيعات / Distributions</h1>

      <div className="bg-[#1C396A] text-white rounded-xl p-4 flex items-center gap-3">
        <Clock size={20} />
        <span className="font-medium">Next distribution in {daysUntil} days — 1 July 2025</span>
      </div>

      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
        <h2 className="text-lg font-semibold text-[#2E5090] mb-4">Monthly Totals</h2>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={MONTHLY_DISTRIBUTIONS}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748B' }} />
            <YAxis tick={{ fontSize: 12, fill: '#64748B' }} tickFormatter={(v) => fmt(v)} />
            <Tooltip formatter={(v) => fmt(v)} />
            <Bar dataKey="total" fill="#1C396A" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#E2E8F0]">
          <h2 className="text-lg font-semibold text-[#2E5090]">سجل التوزيعات / Distribution History</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#2B3D5F] text-white">
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Property</th>
              <th className="px-4 py-3 text-left">Amount</th>
              <th className="px-4 py-3 text-left">Share %</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {DISTRIBUTIONS.map((d, i) => (
              <tr key={i} className="border-b border-[#E2E8F0] hover:bg-[#F8F9FB]">
                <td className="px-4 py-3">{d.date}</td>
                <td className="px-4 py-3">{d.property}</td>
                <td className="px-4 py-3 font-medium">{fmt(d.amount)}</td>
                <td className="px-4 py-3">{d.share}%</td>
                <td className="px-4 py-3 text-[#16A34A]">{d.status} ✓</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function InvestorSecondary({ onList, activeListing, listingSuspended }) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#1A1A1A]">السوق الثانوي / Secondary Market</h1>

      {listingSuspended && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
          <AlertCircle size={20} className="text-[#C0504D] flex-shrink-0" />
          <div>
            <p className="font-semibold text-[#C0504D]">Listing paused — Jeddah Corniche Apt 5B</p>
            <p className="text-sm text-[#64748B] mt-1">
              The home buyer missed a payment on this property. Your listing is paused until the contract is back on track.
            </p>
          </div>
        </div>
      )}

      <div>
        <h2 className="text-lg font-semibold text-[#2E5090] mb-4">مراكزي / My Positions</h2>
        <div className="space-y-3">
          {INVESTOR.portfolio.map((p, i) => {
            const isJeddah = p.name.includes('Jeddah');
            const suspended = isJeddah && listingSuspended;
            return (
              <div key={i} className={`bg-white rounded-xl border p-4 flex justify-between items-center hover:shadow-sm transition-shadow ${suspended ? 'border-red-200 bg-red-50/30' : 'border-[#E2E8F0]'}`}>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{p.name}</p>
                    {suspended && <span className="text-xs px-2 py-0.5 rounded bg-red-100 text-[#C0504D]">Suspended</span>}
                  </div>
                  <p className="text-sm text-[#64748B]">{p.share}% share · {fmt(p.monthly)}/mo income</p>
                </div>
                <button
                  onClick={() => !suspended && onList(p)}
                  disabled={suspended}
                  className={`px-4 py-2 border rounded-lg text-sm transition-colors ${
                    suspended
                      ? 'border-[#E2E8F0] text-[#64748B] cursor-not-allowed'
                      : 'border-[#1C396A] text-[#1C396A] hover:bg-[#1C396A] hover:text-white'
                  }`}
                >
                  List for Sale
                </button>
              </div>
            );
          })}
          {activeListing && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
              <CircleCheck size={20} className="text-[#16A34A]" />
              <span className="text-sm"><strong>Riyadh Heights — 1.0% share</strong> listed at {fmt(18500)}</span>
            </div>
          )}
          {listingSuspended && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3 opacity-75">
              <AlertCircle size={20} className="text-[#C0504D]" />
              <span className="text-sm line-through"><strong>Jeddah Corniche — 0.5% share</strong> listed at {fmt(8000)} — suspended</span>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#E2E8F0]">
          <h2 className="text-lg font-semibold text-[#2E5090]">تصفح العروض / Browse Listings</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#2B3D5F] text-white">
              <th className="px-4 py-3 text-left">Property</th>
              <th className="px-4 py-3 text-left">Share</th>
              <th className="px-4 py-3 text-left">Asking Price</th>
              <th className="px-4 py-3 text-left">Monthly Income</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {SECONDARY_LISTINGS.map((l, i) => (
              <tr key={i} className="border-b border-[#E2E8F0] hover:bg-[#F8F9FB]">
                <td className="px-4 py-3">{l.property}</td>
                <td className="px-4 py-3">{l.share}</td>
                <td className="px-4 py-3 font-medium">{fmt(l.price)}</td>
                <td className="px-4 py-3">{fmt(l.income)}/mo</td>
                <td className="px-4 py-3">
                  <button className="px-3 py-1.5 bg-[#1C396A] text-white text-xs rounded-lg hover:bg-[#2E5090] transition-colors">Buy Now</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function InvestorWallet({ balance, transactions, onTopUp }) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#1A1A1A]">محفظتي / Wallet</h1>
      <div className="bg-gradient-to-r from-[#1C396A] to-[#2E5090] rounded-xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.08]" style={{
          backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 8px, white 8px, white 9px)',
        }} />
        <div className="relative">
          <p className="text-sm opacity-80">Available Balance</p>
          <p className="text-4xl font-bold mt-1">{fmt(balance)}</p>
          <p className="text-sm opacity-60 mt-2">Last distribution: 1 Jun 2025 — {fmt(480)}</p>
          <button
            type="button"
            onClick={onTopUp}
            className="mt-4 px-6 py-2 bg-white text-[#1C396A] rounded-lg font-semibold hover:bg-white/90 transition-colors flex items-center gap-2"
          >
            <Plus size={16} /> Top Up
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#E2E8F0] p-5 flex items-start gap-3">
        <Banknote size={20} className="text-[#2E5090] flex-shrink-0 mt-0.5" />
        <p className="text-sm text-[#64748B] leading-relaxed">
          Distributions deposit automatically on the 1st of each month. Top up via card, Apple Pay, or bank transfer — all investments are paid from wallet balance only.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#E2E8F0]">
          <h2 className="text-lg font-semibold text-[#2E5090]">سجل المعاملات / Transaction History</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#2B3D5F] text-white">
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Description</th>
              <th className="px-4 py-3 text-left">Amount</th>
              <th className="px-4 py-3 text-left">Balance</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t, i) => (
              <tr key={i} className="border-b border-[#E2E8F0] hover:bg-[#F8F9FB]">
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

function AdminDashboard({ delinquentContracts }) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#1A1A1A]">لوحة العمليات / Operations Dashboard</h1>

      {delinquentContracts.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-5">
          <h2 className="font-semibold text-[#C0504D] flex items-center gap-2 mb-3">
            <AlertCircle size={18} /> Contracts at Risk — {delinquentContracts.length}
          </h2>
          {delinquentContracts.map((d, i) => (
            <div key={i} className="flex flex-wrap justify-between items-center gap-2 text-sm py-2 border-b border-red-100 last:border-0">
              <span><strong>{d.buyer}</strong> — {d.property}</span>
              <span className="text-[#C0504D]">{d.overdue} overdue · {fmt(d.amount)}</span>
              <span className="font-mono text-xs text-[#64748B]">{d.contractId}</span>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard label="Active Properties" value="3" icon={Building2} />
        <StatCard label="Capital Deployed" value={fmt(3200000)} icon={Briefcase} />
        <StatCard label="Total Users" value="147" icon={Users} />
        <StatCard label="Distributions (Month)" value={fmt(14760)} icon={TrendingUp} />
        <StatCard label="Pending KYC" value="6" icon={Shield} accent="bg-amber-50" />
        <StatCard label="Delinquent Contracts" value={String(delinquentContracts.length)} icon={AlertCircle} accent="bg-red-50" />
      </div>

      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
        <h2 className="text-lg font-semibold text-[#2E5090] mb-4">محرك التوزيع / Distribution Engine</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-[#64748B]">Last run</span><span>1 June 2025 — 09:02 AM</span></div>
            <div className="flex justify-between"><span className="text-[#64748B]">Status</span><span className="text-[#16A34A] font-medium">Completed ✓</span></div>
            <div className="flex justify-between"><span className="text-[#64748B]">Total distributed</span><span className="font-medium">{fmt(14760)} to 47 investors</span></div>
            <div className="flex justify-between"><span className="text-[#64748B]">Next run</span><span>1 July 2025</span></div>
          </div>
          <div className="flex items-center">
            <button disabled className="px-6 py-3 bg-[#E2E8F0] text-[#64748B] rounded-lg cursor-not-allowed text-sm">
              Run Manual Distribution
            </button>
            <p className="text-xs text-[#64748B] ml-3">Only active on 1st of month</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminKYC({ kycItems, onApprove, onReject }) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#1A1A1A]">مراجعة KYC / KYC Review Queue</h1>
      <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#2B3D5F] text-white">
              <th className="px-4 py-3 text-left">User</th>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">Path</th>
              <th className="px-4 py-3 text-left">Submitted</th>
              <th className="px-4 py-3 text-left">Documents</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {kycItems.map((item) => (
              <tr
                key={item.id}
                className={`border-b border-[#E2E8F0] transition-colors ${
                  item.status === 'approved' ? 'bg-green-50' :
                  item.status === 'rejected' ? 'bg-red-50' : 'hover:bg-[#F8F9FB]'
                }`}
              >
                <td className="px-4 py-3 font-medium">{item.user}</td>
                <td className="px-4 py-3">{item.type}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                    item.path === 'International' ? 'bg-amber-100 text-[#D97706]' : 'bg-blue-50 text-[#2E5090]'
                  }`}>
                    {item.path}
                  </span>
                </td>
                <td className="px-4 py-3">{item.submitted}</td>
                <td className="px-4 py-3">{item.docs}</td>
                <td className="px-4 py-3">
                  {item.status === 'approved' ? (
                    <span className="text-[#16A34A] font-medium">Approved ✓</span>
                  ) : item.status === 'rejected' ? (
                    <span className="text-[#C0504D] font-medium">Rejected ✗</span>
                  ) : (
                    <div className="flex gap-2">
                      <button onClick={() => onApprove(item.id)} className="px-3 py-1 bg-[#16A34A] text-white text-xs rounded hover:bg-green-700 transition-colors">Approve</button>
                      <button onClick={() => onReject(item.id)} className="px-3 py-1 bg-[#C0504D] text-white text-xs rounded hover:bg-red-700 transition-colors">Reject</button>
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
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: '', address: '', value: '', min: '', ret: '' });

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
        <h1 className="text-2xl font-bold text-[#1A1A1A]">العقارات / Properties</h1>
        <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 px-4 py-2 bg-[#1C396A] text-white rounded-lg hover:bg-[#2E5090] transition-colors">
          <Plus size={16} /> Add New Property
        </button>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-900">
        Properties without an assigned home buyer are <strong>not listed</strong> to investors. Assign a buyer and sign Musharaka before opening co-investment.
      </div>

      <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#2B3D5F] text-white">
              <th className="px-4 py-3 text-left">Property</th>
              <th className="px-4 py-3 text-left">Value</th>
              <th className="px-4 py-3 text-left">Funded</th>
              <th className="px-4 py-3 text-left">Investors</th>
              <th className="px-4 py-3 text-left">Buyer</th>
              <th className="px-4 py-3 text-left">Buyer Own.</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((p, i) => (
              <tr key={i} className={`border-b border-[#E2E8F0] hover:bg-[#F8F9FB] ${p.status === 'Delinquent' ? 'bg-red-50/40' : ''}`}>
                <td className="px-4 py-3 font-medium">{p.name}</td>
                <td className="px-4 py-3">{fmt(p.value)}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-[#E2E8F0] rounded-full overflow-hidden">
                      <div className="h-full bg-[#2E5090] rounded-full" style={{ width: `${p.funded}%` }} />
                    </div>
                    <span>{p.funded}%</span>
                  </div>
                </td>
                <td className="px-4 py-3">{p.investors}</td>
                <td className="px-4 py-3 text-sm">
                  {p.buyer || <span className="text-amber-700">Awaiting buyer</span>}
                  {!p.buyer && <span className="block text-[10px] text-[#64748B] mt-0.5">Not on investor marketplace</span>}
                </td>
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
      </div>

      <Modal open={showAdd} onClose={() => setShowAdd(false)} title="Add New Property">
        <div className="space-y-4">
          {['name', 'address', 'value', 'min', 'ret'].map((field) => (
            <div key={field}>
              <label className="text-sm text-[#64748B] capitalize">{field === 'ret' ? 'Expected Return (%)' : field === 'min' ? 'Minimum Investment' : field === 'value' ? 'Property Value (SAR)' : field}</label>
              <input
                className="w-full mt-1 px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#2E5090]"
                value={form[field]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
              />
            </div>
          ))}
          <button onClick={handleSubmit} className="w-full py-2.5 bg-[#1C396A] text-white rounded-lg hover:bg-[#2E5090] transition-colors">Add Property</button>
        </div>
      </Modal>
    </div>
  );
}

function AdminPlaceholder({ title }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-[#64748B]">
      <BarChart3 size={48} className="mb-4 opacity-40" />
      <h2 className="text-xl font-semibold text-[#1A1A1A]">{title}</h2>
      <p className="mt-2">Demo view — data available in full product</p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// LAYOUTS
// ═══════════════════════════════════════════════════════════════════

function Sidebar({ items, active, onNavigate }) {
  return (
    <aside className="w-56 bg-white border-r border-[#E2E8F0] min-h-screen flex-shrink-0">
      <nav className="p-4 space-y-1">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all ${
                active === item.id
                  ? 'bg-[#1C396A] text-white shadow-md'
                  : 'text-[#64748B] hover:bg-[#F8F9FB] hover:text-[#1C396A]'
              }`}
            >
              <Icon size={18} />
              <span><BilingualLabel ar={item.ar} en={item.en} /></span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

// ═══════════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════════

const ROLES = [
  { id: 'buyer', label: '🏠 Home Buyer', user: 'Ahmad Al-Rashidi' },
  { id: 'investor', label: '📈 Investor', user: 'Sara Al-Otaibi' },
  { id: 'admin', label: '⚙️ Admin / Ops', user: 'Tamlk Operations' },
];

const BUYER_NAV = [
  { id: 'dashboard', ar: 'لوحة التحكم', en: 'Dashboard', icon: LayoutDashboard },
  { id: 'contract', ar: 'عقودي', en: 'My Contracts', icon: FileText },
  { id: 'payment', ar: 'الدفع', en: 'Payment', icon: CreditCard },
  { id: 'wallet', ar: 'محفظتي', en: 'Wallet', icon: Wallet },
  { id: 'support', ar: 'الدعم', en: 'Support', icon: HeadphonesIcon },
];

const INVESTOR_NAV = [
  { id: 'dashboard', ar: 'لوحة التحكم', en: 'Dashboard', icon: LayoutDashboard },
  { id: 'portfolio', ar: 'محفظتي', en: 'My Portfolio', icon: Briefcase },
  { id: 'opportunities', ar: 'الفرص', en: 'Opportunities', icon: TrendingUp },
  { id: 'distributions', ar: 'التوزيعات', en: 'Distributions', icon: BarChart3 },
  { id: 'wallet', ar: 'محفظتي', en: 'Wallet', icon: Wallet },
  { id: 'secondary', ar: 'السوق الثانوي', en: 'Secondary Market', icon: ArrowLeftRight },
];

const ADMIN_NAV = [
  { id: 'dashboard', en: 'Dashboard' },
  { id: 'properties', en: 'Properties' },
  { id: 'users', en: 'Users' },
  { id: 'kyc', en: 'KYC Review' },
  { id: 'distributions', en: 'Distributions' },
  { id: 'reports', en: 'Reports' },
];

export default function TamlkDemo() {
  const [role, setRole] = useState('buyer');
  const [buyerScreen, setBuyerScreen] = useState('dashboard');
  const [investorScreen, setInvestorScreen] = useState('dashboard');
  const [adminScreen, setAdminScreen] = useState('dashboard');
  const [loading, setLoading] = useState(false);

  const [buyerContracts, setBuyerContracts] = useState(BUYER_CONTRACTS);
  const [activeContractId, setActiveContractId] = useState('jeddah');
  const [ownershipMap, setOwnershipMap] = useState({ riyadh: 23.4, jeddah: 11.2, dammam: 100 });
  const [paymentsMap, setPaymentsMap] = useState({ riyadh: 4, jeddah: 8, dammam: 96 });
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [buyerWalletBalance, setBuyerWalletBalance] = useState(BUYER.walletBalance);
  const [investorWalletBalance, setInvestorWalletBalance] = useState(15200);
  const [investorTransactions, setInvestorTransactions] = useState(INVESTOR_WALLET_TRANSACTIONS);
  const [showAllMonths, setShowAllMonths] = useState(false);
  const [exitModal, setExitModal] = useState(false);

  const activeContract = buyerContracts.find((c) => c.id === activeContractId) || buyerContracts[0];
  const activeOwnership = ownershipMap[activeContractId] ?? activeContract.ownership;
  const listingSuspended = buyerContracts.some((c) => c.status === 'delinquent');
  const delinquentContracts = buyerContracts
    .filter((c) => c.status === 'delinquent')
    .map((c) => ({
      buyer: BUYER.name,
      property: c.name,
      overdue: `${Math.abs(c.daysUntilDue)} days`,
      amount: c.monthlyPayment,
      contractId: c.contractId,
    }));

  const [investAmount, setInvestAmount] = useState(50000);
  const [selectedOpportunityId, setSelectedOpportunityId] = useState(null);
  const [opportunities, setOpportunities] = useState(INVESTMENT_OPPORTUNITIES);

  const [topUpModal, setTopUpModal] = useState(false);
  const [topUpTarget, setTopUpTarget] = useState('buyer');
  const [topUpAmount, setTopUpAmount] = useState(5000);
  const [topUpMethod, setTopUpMethod] = useState('card');

  const [listModal, setListModal] = useState(false);
  const [activeListing, setActiveListing] = useState(true);
  const [listPrice, setListPrice] = useState(18500);

  const [kycItems, setKycItems] = useState(KYC_QUEUE.map((k) => ({ ...k, status: 'pending' })));
  const [rejectModal, setRejectModal] = useState(null);
  const [rejectReason, setRejectReason] = useState('');

  const [adminProperties, setAdminProperties] = useState(ADMIN_PROPERTIES);

  const currentScreen = role === 'buyer' ? buyerScreen : role === 'investor' ? investorScreen : adminScreen;
  const setScreen = role === 'buyer' ? setBuyerScreen : role === 'investor' ? setInvestorScreen : setAdminScreen;

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

  const openTopUp = (target, amount = 5000) => {
    setTopUpTarget(target);
    setTopUpAmount(Math.max(1000, amount));
    setTopUpMethod('card');
    setTopUpModal(true);
  };

  const confirmTopUp = () => {
    const today = '14 Jun 2025';
    const methodLabel = TOPUP_METHODS.find((m) => m.id === topUpMethod)?.label || 'Top Up';
    if (topUpTarget === 'buyer') {
      setBuyerWalletBalance((b) => b + topUpAmount);
    } else {
      setInvestorWalletBalance((b) => {
        const newBalance = b + topUpAmount;
        setInvestorTransactions((tx) => [{
          date: today,
          desc: `Top Up — ${methodLabel}`,
          amount: topUpAmount,
          balance: newBalance,
        }, ...tx]);
        return newBalance;
      });
    }
    setTopUpModal(false);
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
      case 'dashboard':
        return (
          <BuyerDashboard
            contracts={buyerContracts}
            ownershipMap={ownershipMap}
            paymentsMap={paymentsMap}
            onSelectContract={setActiveContractId}
            onNavigate={setBuyerScreen}
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
            onTopUp={(shortfall) => openTopUp('buyer', shortfall)}
          />
        );
      case 'wallet': return <BuyerWallet balance={buyerWalletBalance} onTopUp={() => openTopUp('buyer')} />;
      case 'support': return <BuyerSupport />;
      default: return null;
    }
  };

  const renderInvestorContent = () => {
    if (loading) return <LoadingSkeleton />;
    switch (investorScreen) {
      case 'dashboard': return <InvestorDashboard listingSuspended={listingSuspended} onNavigate={setInvestorScreen} />;
      case 'portfolio': return <InvestorPortfolio />;
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
            onTopUp={(shortfall) => openTopUp('investor', shortfall)}
            listingSuspended={listingSuspended}
          />
        );
      case 'distributions': return <InvestorDistributions />;
      case 'wallet': return <InvestorWallet balance={investorWalletBalance} transactions={investorTransactions} onTopUp={() => openTopUp('investor')} />;
      case 'secondary': return <InvestorSecondary onList={() => setListModal(true)} activeListing={activeListing} listingSuspended={listingSuspended} />;
      default: return null;
    }
  };

  const renderAdminContent = () => {
    if (loading) return <LoadingSkeleton />;
    switch (adminScreen) {
      case 'dashboard': return <AdminDashboard delinquentContracts={delinquentContracts} />;
      case 'properties': return <AdminProperties properties={adminProperties} onAdd={(p) => setAdminProperties([...adminProperties, p])} />;
      case 'users': return <AdminPlaceholder title="Users Management" />;
      case 'kyc': return <AdminKYC kycItems={kycItems} onApprove={handleKycApprove} onReject={handleKycReject} />;
      case 'distributions': return <AdminDashboard delinquentContracts={delinquentContracts} />;
      case 'reports': return <AdminPlaceholder title="Reports" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      {/* Demo Role Switcher */}
      <div className="bg-[#2B3D5F] text-white text-center py-2 text-xs tracking-wide">
        DEMO MODE — Switch between user views
      </div>
      <div className="bg-white border-b border-[#E2E8F0] px-4 py-2 flex items-center justify-center gap-2">
        {ROLES.map((r) => (
          <button
            key={r.id}
            onClick={() => { setRole(r.id); setPaymentSuccess(false); setSelectedOpportunityId(null); }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              role === r.id
                ? 'bg-[#1C396A] text-white shadow-md'
                : 'bg-[#F8F9FB] text-[#64748B] hover:bg-[#E2E8F0]'
            }`}
          >
            {r.label} — {r.user}
          </button>
        ))}
      </div>

      {/* Navbar */}
      <header className="bg-[#1C396A] text-white px-6 py-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold">تملك / Tamlk</span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="opacity-80">{currentRole.user}</span>
          <div className="w-8 h-8 rounded-full bg-[#2E5090] flex items-center justify-center text-xs font-bold">
            {currentRole.user.charAt(0)}
          </div>
        </div>
      </header>

      {/* Admin Top Nav */}
      {role === 'admin' && (
        <nav className="bg-white border-b border-[#E2E8F0] px-6 flex gap-1">
          {ADMIN_NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => setAdminScreen(item.id)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                adminScreen === item.id
                  ? 'border-[#1C396A] text-[#1C396A]'
                  : 'border-transparent text-[#64748B] hover:text-[#1C396A]'
              }`}
            >
              {item.en}
            </button>
          ))}
        </nav>
      )}

      <div className="flex">
        {/* Sidebar for buyer/investor */}
        {role !== 'admin' && (
          <Sidebar
            items={role === 'buyer' ? BUYER_NAV : INVESTOR_NAV}
            active={currentScreen}
            onNavigate={setScreen}
          />
        )}

        <main className="flex-1 p-6 overflow-auto">
          {role === 'buyer' && renderBuyerContent()}
          {role === 'investor' && renderInvestorContent()}
          {role === 'admin' && renderAdminContent()}
        </main>
      </div>

      {/* Modals */}
      <Modal open={topUpModal} onClose={() => setTopUpModal(false)} title={`Top Up ${topUpTarget === 'buyer' ? 'Buyer' : 'Investor'} Wallet`}>
        <div className="space-y-4">
          <p className="text-sm text-[#64748B]">Add funds to your wallet. Payments and investments are always deducted from wallet balance.</p>
          <div>
            <label className="text-sm text-[#64748B]">Amount (SAR)</label>
            <input
              type="number" value={topUpAmount} onChange={(e) => setTopUpAmount(Number(e.target.value))}
              className="w-full mt-1 px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#2E5090]"
            />
          </div>
          <div>
            <label className="text-sm text-[#64748B] mb-2 block">Funding method</label>
            <div className="grid grid-cols-1 gap-2">
              {TOPUP_METHODS.map((m) => {
                const Icon = m.icon;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setTopUpMethod(m.id)}
                    className={`flex items-center gap-3 p-3 rounded-lg border-2 text-left text-sm transition-all ${
                      topUpMethod === m.id ? 'border-[#1C396A] bg-[#1C396A]/5' : 'border-[#E2E8F0] hover:border-[#2E5090]'
                    }`}
                  >
                    <Icon size={16} className="text-[#64748B]" />
                    <div>
                      <p className="font-medium">{m.label}</p>
                      <p className="text-xs text-[#64748B]">{m.sub}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
          <button onClick={confirmTopUp} className="w-full py-2.5 bg-[#1C396A] text-white rounded-lg hover:bg-[#2E5090] transition-colors">
            Add {fmt(topUpAmount)} to wallet
          </button>
        </div>
      </Modal>

      <Modal open={listModal} onClose={() => setListModal(false)} title="List for Sale">
        <div className="space-y-4">
          <div>
            <label className="text-sm text-[#64748B]">Share to sell (%)</label>
            <input type="number" defaultValue={1.0} className="w-full mt-1 px-3 py-2 border border-[#E2E8F0] rounded-lg" />
          </div>
          <div>
            <label className="text-sm text-[#64748B]">Asking Price (SAR)</label>
            <input type="number" value={listPrice} onChange={(e) => setListPrice(Number(e.target.value))} className="w-full mt-1 px-3 py-2 border border-[#E2E8F0] rounded-lg" />
          </div>
          <p className="text-sm text-[#64748B]">Estimated monthly income for buyer: {fmt(111)}/mo</p>
          <button onClick={() => { setListModal(false); setActiveListing(true); }} className="w-full py-2.5 bg-[#1C396A] text-white rounded-lg hover:bg-[#2E5090] transition-colors">
            List at {fmt(listPrice)}
          </button>
        </div>
      </Modal>

      <Modal open={!!rejectModal} onClose={() => setRejectModal(null)} title="Reject KYC Application">
        <div className="space-y-4">
          <textarea
            value={rejectReason} onChange={(e) => setRejectReason(e.target.value)}
            placeholder="Reason for rejection..."
            className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg h-24 focus:outline-none focus:border-[#2E5090]"
          />
          <button onClick={confirmReject} className="w-full py-2.5 bg-[#C0504D] text-white rounded-lg hover:bg-red-700 transition-colors">
            Confirm Rejection
          </button>
        </div>
      </Modal>

      <Modal open={exitModal} onClose={() => setExitModal(false)} title="List Ownership Share for Sale">
        <div className="space-y-4">
          <p className="text-sm text-[#64748B]">
            Sell your <strong>{activeOwnership}%</strong> share in {activeContract.name} on the secondary market (PRD §4.1 exit option).
          </p>
          <div>
            <label className="text-sm text-[#64748B]">Asking Price (SAR)</label>
            <input type="number" defaultValue={Math.round(activeOwnership / 100 * activeContract.totalValue)} className="w-full mt-1 px-3 py-2 border border-[#E2E8F0] rounded-lg" />
          </div>
          <button onClick={() => setExitModal(false)} className="w-full py-2.5 bg-[#D97706] text-white rounded-lg hover:bg-amber-700 transition-colors">
            List Share for Sale
          </button>
        </div>
      </Modal>
    </div>
  );
}
