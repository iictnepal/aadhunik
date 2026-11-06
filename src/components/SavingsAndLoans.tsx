import React, { useState, useEffect } from 'react';
import { Language, SavingsProduct, LoanProduct, ActiveView } from '../types';
import { LoanCalculator } from './LoanCalculator';
import { LoanEligibility } from './LoanEligibility';
import { NoteCounter } from './NoteCounter';
import { 
  Wallet, 
  PiggyBank, 
  Calendar, 
  Baby, 
  HeartHandshake, 
  Briefcase, 
  Store, 
  Sprout, 
  ShieldAlert, 
  GraduationCap, 
  Home, 
  Calculator, 
  Check, 
  ArrowRight,
  Percent,
  Clock,
  Coins,
  Scale,
  Banknote
} from 'lucide-react';

interface SavingsAndLoansProps {
  lang: Language;
  savingsProducts: SavingsProduct[];
  loanProducts: LoanProduct[];
  onNavigate: (view: ActiveView) => void;
  defaultTab?: 'savings' | 'loans';
}

export const SavingsAndLoans: React.FC<SavingsAndLoansProps> = ({
  lang,
  savingsProducts,
  loanProducts,
  onNavigate,
  defaultTab = 'savings'
}) => {
  const [activeTab, setActiveTab] = useState<'savings' | 'loans'>(defaultTab);
  const [loanTool, setLoanTool] = useState<'calculator' | 'eligibility' | 'note_counter'>('eligibility');

  useEffect(() => {
    if (defaultTab) {
      setActiveTab(defaultTab);
    }
  }, [defaultTab]);

  // Savings Calculator State
  const [calcDepositAmount, setCalcDepositAmount] = useState<number>(100000);
  const [calcDepositRate, setCalcDepositRate] = useState<number>(10.5);
  const [calcDepositMonths, setCalcDepositMonths] = useState<number>(12);
  const [calcPayoutFrequency, setCalcPayoutFrequency] = useState<'quarterly' | 'maturity'>('maturity');

  // Savings Maturity Math
  const calculateSavingsMaturity = () => {
    const P = calcDepositAmount;
    const r = calcDepositRate / 100;
    const t = calcDepositMonths / 12;
    // Simple or quarterly compound
    const n = 4; // quarterly compounding standard in cooperatives
    const maturityAmount = P * Math.pow(1 + r / n, n * t);
    const totalInterest = maturityAmount - P;
    const taxDeduction = totalInterest * 0.05; // 5% TDS in Nepal
    const netMaturity = maturityAmount - taxDeduction;
    return {
      grossInterest: Math.round(totalInterest),
      taxDeduction: Math.round(taxDeduction),
      netMaturity: Math.round(netMaturity)
    };
  };

  const savingsResult = calculateSavingsMaturity();

  const getSavingsIcon = (iconName: string) => {
    switch (iconName) {
      case 'PiggyBank': return <PiggyBank className="w-5 h-5 text-[#146B45]" />;
      case 'Calendar': return <Calendar className="w-5 h-5 text-[#146B45]" />;
      case 'Baby': return <Baby className="w-5 h-5 text-[#146B45]" />;
      case 'HeartHandshake': return <HeartHandshake className="w-5 h-5 text-[#146B45]" />;
      case 'Briefcase': return <Briefcase className="w-5 h-5 text-[#146B45]" />;
      default: return <Wallet className="w-5 h-5 text-[#146B45]" />;
    }
  };

  const getLoanIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sprout': return <Sprout className="w-5 h-5 text-[#17324D]" />;
      case 'ShieldAlert': return <ShieldAlert className="w-5 h-5 text-[#17324D]" />;
      case 'GraduationCap': return <GraduationCap className="w-5 h-5 text-[#17324D]" />;
      case 'Home': return <Home className="w-5 h-5 text-[#17324D]" />;
      default: return <Store className="w-5 h-5 text-[#17324D]" />;
    }
  };

  return (
    <section className="py-14 sm:py-20 bg-[#F5F7F6]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <span className="text-xs font-semibold text-[#146B45] uppercase tracking-wider">
            {lang === 'ne' ? 'हाम्रा वित्तीय उत्पादनहरू' : 'Our Financial Products'}
          </span>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#17324D] mt-1.5 tracking-tight leading-snug">
            {lang === 'ne' 
              ? 'आकर्षक बचत योजनाहरू तथा सहज कर्जा सुविधाहरू' 
              : 'Competitive Savings Schemes & Flexible Loan Facilities'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            {lang === 'ne'
              ? 'सदस्यहरूको आवश्यकता अनुसार सुरक्षित निक्षेप र सुलभ कर्जा लगानी।'
              : 'Tailored financial solutions designed to empower our cooperative members.'}
          </p>

          {/* Tab Selector - Responsive on mobile */}
          <div className="flex w-full sm:w-auto sm:inline-flex items-center p-1 bg-slate-200/80 rounded-xl mt-5 sm:mt-6 shadow-inner">
            <button
              onClick={() => setActiveTab('savings')}
              className={`flex-1 sm:flex-none min-h-[42px] px-3 sm:px-5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center justify-center ${
                activeTab === 'savings'
                  ? 'bg-[#146B45] text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              {lang === 'ne' ? 'बचत योजनाहरू' : 'Savings Schemes'}
            </button>
            <button
              onClick={() => setActiveTab('loans')}
              className={`flex-1 sm:flex-none min-h-[42px] px-3 sm:px-5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center justify-center ${
                activeTab === 'loans'
                  ? 'bg-[#17324D] text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              {lang === 'ne' ? 'कर्जा सुविधाहरू' : 'Loan Facilities'}
            </button>
          </div>
        </div>

        {/* Tab 1: Savings Schemes Grid */}
        {activeTab === 'savings' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
              {savingsProducts.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-xl p-6 border border-slate-200 hover:border-[#146B45]/50 transition-all hover:shadow-md flex flex-col justify-between"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-[#146B45]/10 flex items-center justify-center shrink-0">
                        {getSavingsIcon(p.icon)}
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold font-mono text-[#146B45] tabular-nums">
                          {p.interest_rate.toFixed(2)}%
                        </span>
                        <span className="block text-[11px] text-slate-500">
                          {lang === 'ne' ? 'वार्षिक ब्याजदर' : 'p.a. Interest'}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-[#17324D] mb-1.5">
                      {lang === 'ne' ? p.name_ne : p.name_en}
                    </h3>

                    <p className="text-xs text-slate-600 mb-4 leading-relaxed line-clamp-2">
                      {lang === 'ne' ? p.summary_ne : p.summary_en}
                    </p>

                    {/* Meta info (Unboxed metadata with separators - zero pill rule) */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 py-2 border-y border-slate-100 mb-4">
                      <span>{lang === 'ne' ? `न्यूनतम: रु. ${p.min_balance}` : `Min: NPR ${p.min_balance}`}</span>
                      <span aria-hidden="true">·</span>
                      <span>{lang === 'ne' ? p.interest_payout_ne : p.interest_payout_en}</span>
                    </div>

                    {/* Features list */}
                    <ul className="space-y-1.5 mb-6 text-xs text-slate-600">
                      {(lang === 'ne' ? p.features_ne : p.features_en).slice(0, 3).map((f, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#146B45] shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => onNavigate('contact')}
                    className="w-full py-2 px-3 text-xs font-semibold rounded-lg border border-[#146B45] text-[#146B45] hover:bg-[#146B45] hover:text-white transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>{lang === 'ne' ? 'खाता खोल्न सम्पर्क गर्नुहोस्' : 'Open This Account'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Interactive Savings Maturity Calculator */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#146B45] uppercase tracking-wider mb-2">
                <Calculator className="w-4 h-4 text-[#D6A63C]" />
                <span>{lang === 'ne' ? 'बचत तथा मुद्दती क्यालकुलेटर' : 'Fixed Deposit & Savings Maturity Calculator'}</span>
              </div>
              <h3 className="text-xl font-bold text-[#17324D] mb-6">
                {lang === 'ne' ? 'आफ्नो बचतको प्रतिफल गणना गर्नुहोस्' : 'Calculate Your Deposit Returns & Maturity Value'}
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Inputs */}
                <div className="lg:col-span-7 space-y-5">
                  <div>
                    <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                      <span>{lang === 'ne' ? 'बचत रकम (Deposit Amount)' : 'Deposit Amount (NPR)'}</span>
                      <span className="font-mono font-bold text-[#146B45]">
                        NPR {calcDepositAmount.toLocaleString()}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="10000"
                      max="5000000"
                      step="10000"
                      value={calcDepositAmount}
                      onChange={(e) => setCalcDepositAmount(Number(e.target.value))}
                      className="w-full accent-[#146B45] cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-1">
                      <span>NPR 10,000</span>
                      <span>NPR 25,00,000</span>
                      <span>NPR 50,00,000</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        {lang === 'ne' ? 'ब्याजदर (Annual Rate %)' : 'Annual Interest Rate (%)'}
                      </label>
                      <input
                        type="number"
                        step="0.25"
                        min="5"
                        max="15"
                        value={calcDepositRate}
                        onChange={(e) => setCalcDepositRate(Number(e.target.value))}
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#146B45]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        {lang === 'ne' ? 'अवधि (Duration in Months)' : 'Duration (Months)'}
                      </label>
                      <select
                        value={calcDepositMonths}
                        onChange={(e) => setCalcDepositMonths(Number(e.target.value))}
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#146B45] bg-white"
                      >
                        <option value={3}>3 {lang === 'ne' ? 'महिना' : 'Months'}</option>
                        <option value={6}>6 {lang === 'ne' ? 'महिना' : 'Months'}</option>
                        <option value={12}>1 {lang === 'ne' ? 'वर्ष (12 महिना)' : 'Year (12 Months)'}</option>
                        <option value={24}>2 {lang === 'ne' ? 'वर्ष (24 महिना)' : 'Years (24 Months)'}</option>
                        <option value={36}>3 {lang === 'ne' ? 'वर्ष (36 महिना)' : 'Years (36 Months)'}</option>
                        <option value={60}>5 {lang === 'ne' ? 'वर्ष (60 महिना)' : 'Years (60 Months)'}</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Calculation Results Card */}
                <div className="lg:col-span-5 bg-[#17324D] text-white rounded-xl p-6 border border-[#D6A63C]/30">
                  <div className="text-xs text-[#D6A63C] font-semibold uppercase tracking-wider mb-3">
                    {lang === 'ne' ? 'अनुमानित प्रतिफल' : 'Estimated Return Summary'}
                  </div>

                  <div className="space-y-3 pb-4 border-b border-white/10 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-300">{lang === 'ne' ? 'मूल साँवा रकम' : 'Principal Amount'}:</span>
                      <span className="font-mono font-semibold">NPR {calcDepositAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">{lang === 'ne' ? 'अर्जित कुल ब्याज' : 'Total Gross Interest'}:</span>
                      <span className="font-mono font-semibold text-emerald-400">+ NPR {savingsResult.grossInterest.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">{lang === 'ne' ? '५% ब्याज कर कट्टी (TDS)' : '5% Tax Deduction (TDS)'}:</span>
                      <span className="font-mono text-slate-400">- NPR {savingsResult.taxDeduction.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <div className="text-xs text-slate-300 mb-1">
                      {lang === 'ne' ? 'परिपक्वतामा प्राप्त हुने कुल रकम (Net Maturity Value):' : 'Net Maturity Payout (After Tax):'}
                    </div>
                    <div className="text-2xl font-bold font-mono text-[#D6A63C] tabular-nums">
                      NPR {savingsResult.netMaturity.toLocaleString()}
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigate('contact')}
                    className="w-full mt-5 py-2.5 bg-[#146B45] hover:bg-[#105537] text-white text-xs font-semibold rounded-lg transition-colors"
                  >
                    {lang === 'ne' ? 'यो योजनामा बचत सुरु गर्नुहोस्' : 'Start Saving With This Plan'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Loan Facilities Grid */}
        {activeTab === 'loans' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
              {loanProducts.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-xl p-6 border border-slate-200 hover:border-[#17324D]/50 transition-all hover:shadow-md flex flex-col justify-between"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-[#17324D]/10 flex items-center justify-center shrink-0">
                        {getLoanIcon(p.icon)}
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold font-mono text-[#17324D] tabular-nums">
                          {p.interest_rate.toFixed(2)}%
                        </span>
                        <span className="block text-[11px] text-slate-500">
                          {lang === 'ne' ? 'वार्षिक ब्याजदर' : 'p.a. Interest'}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-[#17324D] mb-1.5">
                      {lang === 'ne' ? p.name_ne : p.name_en}
                    </h3>

                    <p className="text-xs text-slate-600 mb-4 leading-relaxed line-clamp-2">
                      {lang === 'ne' ? p.summary_ne : p.summary_en}
                    </p>

                    {/* Meta info (Unboxed metadata with separators) */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 py-2 border-y border-slate-100 mb-4">
                      <span>{lang === 'ne' ? `अवधि: ${p.max_tenure_months} महिना` : `Tenure: ${p.max_tenure_months} mo`}</span>
                      <span aria-hidden="true">·</span>
                      <span>{lang === 'ne' ? `सेवा शुल्क: ${p.service_charge}%` : `Fee: ${p.service_charge}%`}</span>
                    </div>

                    {/* Requirements */}
                    <div className="text-xs font-semibold text-slate-700 mb-2">
                      {lang === 'ne' ? 'आवश्यक कागजातहरू:' : 'Key Requirements:'}
                    </div>
                    <ul className="space-y-1.5 mb-6 text-xs text-slate-600">
                      {(lang === 'ne' ? p.requirements_ne : p.requirements_en).slice(0, 3).map((r, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#17324D] shrink-0 mt-0.5" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setLoanTool('eligibility');
                        const el = document.getElementById('loan-tools-anchor');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="min-h-[38px] py-2 px-2 text-xs font-semibold rounded-lg bg-[#146B45]/10 text-[#146B45] hover:bg-[#146B45] hover:text-white transition-colors flex items-center justify-center gap-1 text-center"
                    >
                      <Scale className="w-3.5 h-3.5" />
                      <span>{lang === 'ne' ? 'योग्यता जाँच्नुहोस्' : 'Check Eligibility'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onNavigate('contact')}
                      className="min-h-[38px] py-2 px-2 text-xs font-semibold rounded-lg bg-[#17324D] text-white hover:bg-[#10273f] transition-colors flex items-center justify-center gap-1 text-center"
                    >
                      <span>{lang === 'ne' ? 'आवेदन दिनुहोस्' : 'Apply Now'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Loan Financial Tools Sub-Navigation (Eligibility Checker vs EMI Calculator vs Note Counter) */}
            <div id="loan-tools-anchor" className="mb-6 scroll-mt-24">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-2 bg-white rounded-2xl border border-slate-200 shadow-2xs">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <button
                    type="button"
                    onClick={() => setLoanTool('eligibility')}
                    className={`min-h-[42px] px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl flex items-center gap-2 transition-all ${
                      loanTool === 'eligibility'
                        ? 'bg-[#146B45] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <Scale className="w-4 h-4 text-[#D6A63C]" />
                    <span>{lang === 'ne' ? 'कर्जा योग्यता' : 'Loan Eligibility'}</span>
                    <span className="text-[10px] bg-[#D6A63C] text-[#17324D] font-bold px-1.5 py-0.2 rounded-full">
                      NEW
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setLoanTool('calculator')}
                    className={`min-h-[42px] px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl flex items-center gap-2 transition-all ${
                      loanTool === 'calculator'
                        ? 'bg-[#17324D] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <Calculator className="w-4 h-4 text-[#D6A63C]" />
                    <span>{lang === 'ne' ? 'किस्ता (EMI) क्यालकुलेटर' : 'EMI Calculator'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setLoanTool('note_counter')}
                    className={`min-h-[42px] px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl flex items-center gap-2 transition-all ${
                      loanTool === 'note_counter'
                        ? 'bg-[#146B45] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <Banknote className="w-4 h-4 text-[#D6A63C]" />
                    <span>{lang === 'ne' ? 'नोट काउन्टर तथा भौचर' : 'Note Counter & Voucher'}</span>
                  </button>
                </div>

                <div className="text-[11px] text-slate-400 font-medium px-2 hidden sm:block">
                  {lang === 'ne' ? 'नगद गन्ती, दरबन्दी तथा किस्ता तालिका' : 'Cash tally, denomination & EMI schedule'}
                </div>
              </div>
            </div>

            {/* Tool Render: Eligibility Checker or EMI Calculator or Note Counter */}
            {loanTool === 'eligibility' && (
              <div className="space-y-4">
                <LoanEligibility 
                  lang={lang} 
                  loanProducts={loanProducts} 
                  onNavigate={onNavigate} 
                />
                
                {/* Switcher Helper */}
                <div className="p-4 bg-white rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <span className="text-slate-600">
                    {lang === 'ne' 
                      ? 'मासिक किस्ता तथा सम्पूर्ण अवधिको किस्ता तालिका (Amortization Schedule) हेर्न चाहनुहुन्छ?' 
                      : 'Looking for a month-by-month repayment schedule and EMI breakdown?'}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setLoanTool('calculator');
                      window.scrollTo({ top: 600, behavior: 'smooth' });
                    }}
                    className="px-3.5 py-1.5 bg-[#17324D] text-white font-semibold rounded-lg shrink-0 flex items-center gap-1.5 hover:bg-[#12283e] transition-colors"
                  >
                    <Calculator className="w-3.5 h-3.5 text-[#D6A63C]" />
                    <span>{lang === 'ne' ? 'किस्ता (EMI) क्यालकुलेटर खोल्नुहोस्' : 'Open EMI Calculator'}</span>
                  </button>
                </div>
              </div>
            )}

            {loanTool === 'calculator' && (
              <div className="space-y-4">
                <LoanCalculator 
                  lang={lang} 
                  onNavigate={onNavigate} 
                />

                {/* Switcher Helper */}
                <div className="p-4 bg-white rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <span className="text-slate-600">
                    {lang === 'ne' 
                      ? 'नगद दरबन्दी गन्ती (Note Counter) वा भौचर तयार गर्न चाहनुहुन्छ?' 
                      : 'Want to count cash note denominations or generate a cash deposit slip?'}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setLoanTool('note_counter');
                      window.scrollTo({ top: 600, behavior: 'smooth' });
                    }}
                    className="px-3.5 py-1.5 bg-[#146B45] text-white font-semibold rounded-lg shrink-0 flex items-center gap-1.5 hover:bg-[#105537] transition-colors"
                  >
                    <Banknote className="w-3.5 h-3.5 text-[#D6A63C]" />
                    <span>{lang === 'ne' ? 'नोट काउन्टर खोल्नुहोस्' : 'Open Note Counter'}</span>
                  </button>
                </div>
              </div>
            )}

            {loanTool === 'note_counter' && (
              <div className="space-y-4">
                <NoteCounter 
                  lang={lang} 
                  onNavigateToMemberPortal={() => onNavigate('member_portal')}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
