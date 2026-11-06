import React, { useState, useMemo } from 'react';
import { Language, ActiveView } from '../types';
import { 
  Calculator, 
  ArrowRight, 
  Table, 
  ChevronDown, 
  ChevronUp, 
  Download, 
  Calendar, 
  CheckCircle2, 
  FileSpreadsheet, 
  Layers, 
  Filter 
} from 'lucide-react';

interface LoanCalculatorProps {
  lang: Language;
  onNavigate?: (view: ActiveView) => void;
  initialPrincipal?: number;
  initialRate?: number;
  initialTenure?: number;
}

interface MonthlyAmortizationRow {
  month: number;
  year: number;
  installment: number;
  principal: number;
  interest: number;
  cumulativePrincipal: number;
  cumulativeInterest: number;
  balance: number;
}

interface YearlyAmortizationSummary {
  year: number;
  totalInstallment: number;
  totalPrincipal: number;
  totalInterest: number;
  endingBalance: number;
}

export const LoanCalculator: React.FC<LoanCalculatorProps> = ({
  lang,
  onNavigate,
  initialPrincipal = 500000,
  initialRate = 12.5,
  initialTenure = 36
}) => {
  const [principal, setPrincipal] = useState<number>(initialPrincipal);
  const [rate, setRate] = useState<number>(initialRate);
  const [tenureMonths, setTenureMonths] = useState<number>(initialTenure);
  
  // Toggle for full life amortization schedule
  const [showAmortization, setShowAmortization] = useState<boolean>(false);
  const [viewType, setViewType] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedYearFilter, setSelectedYearFilter] = useState<number | 'all'>('all');

  // Quick principal presets
  const presets = [
    { label_ne: 'रु. १ लाख', label_en: '1 Lakh', value: 100000 },
    { label_ne: 'रु. ५ लाख', label_en: '5 Lakh', value: 500000 },
    { label_ne: 'रु. १० लाख', label_en: '10 Lakh', value: 1000000 },
    { label_ne: 'रु. २५ लाख', label_en: '25 Lakh', value: 2500000 },
  ];

  // Mathematical Calculation of Monthly EMI: E = P * r * (1+r)^n / ((1+r)^n - 1)
  const results = useMemo(() => {
    const P = principal;
    const monthlyRate = (rate / 100) / 12;
    const n = tenureMonths;

    if (monthlyRate === 0) {
      return {
        emi: Math.round(P / n),
        totalInterest: 0,
        totalPayment: P,
        principalPercent: 100,
        interestPercent: 0
      };
    }

    const emi = (P * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - P;
    const principalPercent = Math.round((P / totalPayment) * 100);
    const interestPercent = 100 - principalPercent;

    return {
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment),
      principalPercent,
      interestPercent
    };
  }, [principal, rate, tenureMonths]);

  // Generate Full-Life Monthly Amortization Schedule for the entire loan duration
  const fullAmortizationSchedule = useMemo(() => {
    const schedule: MonthlyAmortizationRow[] = [];
    let remaining = principal;
    const monthlyRate = (rate / 100) / 12;
    const emi = results.emi;
    let cumulativeP = 0;
    let cumulativeI = 0;

    for (let month = 1; month <= tenureMonths; month++) {
      const year = Math.ceil(month / 12);
      const interestForMonth = Math.round(remaining * monthlyRate);
      
      // On the final month, adjust principal payment to exactly extinguish the balance
      let principalForMonth = (month === tenureMonths) ? remaining : Math.round(emi - interestForMonth);
      if (principalForMonth > remaining) {
        principalForMonth = remaining;
      }
      
      remaining = Math.max(0, remaining - principalForMonth);
      cumulativeP += principalForMonth;
      cumulativeI += interestForMonth;

      schedule.push({
        month,
        year,
        installment: (month === tenureMonths) ? (principalForMonth + interestForMonth) : emi,
        principal: principalForMonth,
        interest: interestForMonth,
        cumulativePrincipal: cumulativeP,
        cumulativeInterest: cumulativeI,
        balance: remaining
      });
    }

    return schedule;
  }, [principal, rate, tenureMonths, results.emi]);

  // Generate Annual / Yearly Summary for the entire loan life
  const yearlySummary = useMemo(() => {
    const map = new Map<number, YearlyAmortizationSummary>();

    fullAmortizationSchedule.forEach((row) => {
      const current = map.get(row.year) || {
        year: row.year,
        totalInstallment: 0,
        totalPrincipal: 0,
        totalInterest: 0,
        endingBalance: row.balance
      };

      current.totalInstallment += row.installment;
      current.totalPrincipal += row.principal;
      current.totalInterest += row.interest;
      current.endingBalance = row.balance;

      map.set(row.year, current);
    });

    return Array.from(map.values());
  }, [fullAmortizationSchedule]);

  // Filtered rows based on selected year
  const displayedMonthlyRows = useMemo(() => {
    if (selectedYearFilter === 'all') {
      return fullAmortizationSchedule;
    }
    return fullAmortizationSchedule.filter((r) => r.year === selectedYearFilter);
  }, [fullAmortizationSchedule, selectedYearFilter]);

  const totalYears = Math.ceil(tenureMonths / 12);

  // Export Amortization Table to CSV
  const handleExportCSV = () => {
    const headers = ['Month', 'Year', 'Installment (NPR)', 'Principal (NPR)', 'Interest (NPR)', 'Cumulative Principal (NPR)', 'Remaining Balance (NPR)'];
    const rows = fullAmortizationSchedule.map((r) => [
      r.month,
      r.year,
      r.installment,
      r.principal,
      r.interest,
      r.cumulativePrincipal,
      r.balance
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [
      headers.join(','),
      ...rows.map(e => e.join(','))
    ].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Loan_Amortization_Schedule_${principal}_${tenureMonths}Months.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-8 border border-slate-200 shadow-sm">
      {/* Title & Badge */}
      <div className="flex items-center gap-2 text-xs font-semibold text-[#17324D] uppercase tracking-wider mb-2">
        <Calculator className="w-4 h-4 text-[#D6A63C]" />
        <span>{lang === 'ne' ? 'कर्जा किस्ता (EMI) क्यालकुलेटर' : 'Cooperative Loan EMI Calculator'}</span>
      </div>

      <h3 className="text-lg sm:text-xl font-bold text-[#17324D] mb-1">
        {lang === 'ne' 
          ? 'मासिक किस्ता र कुल तिर्नुपर्ने रकम गणना गर्नुहोस्' 
          : 'Calculate Monthly Repayments & Full Loan Schedule'}
      </h3>
      <p className="text-xs text-slate-500 mb-6">
        {lang === 'ne'
          ? 'ऋणको साँवा रकम, ब्याजदर र अवधि छनोट गरी तुरुन्तै मासिक किस्ता तथा सम्पूर्ण अवधिको किस्ता तालिका हेर्नुहोस्।'
          : 'Adjust principal, rate, and tenure to inspect your monthly EMI and complete life-of-loan amortization breakdown.'}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Parameters Controls */}
        <div className="lg:col-span-7 space-y-6">
          {/* Principal Amount */}
          <div>
            <div className="flex items-center justify-between text-xs font-medium text-slate-700 mb-1.5">
              <span>{lang === 'ne' ? 'कर्जा रकम (Loan Principal)' : 'Loan Principal Amount (NPR)'}</span>
              <span className="font-mono font-bold text-sm text-[#17324D]">
                NPR {principal.toLocaleString()}
              </span>
            </div>

            <input
              type="range"
              min="50000"
              max="5000000"
              step="25000"
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))}
              className="w-full accent-[#17324D] cursor-pointer"
            />

            <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-1">
              <span>NPR 50,000</span>
              <span>NPR 25,00,000</span>
              <span>NPR 50,00,000</span>
            </div>

            {/* Quick Presets */}
            <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
              <span className="text-[11px] text-slate-400 mr-1">
                {lang === 'ne' ? 'द्रुत छनोट:' : 'Quick Select:'}
              </span>
              {presets.map((preset) => (
                <button
                  key={preset.value}
                  type="button"
                  onClick={() => setPrincipal(preset.value)}
                  className={`px-2.5 py-1 text-[11px] rounded-md font-medium transition-colors ${
                    principal === preset.value
                      ? 'bg-[#17324D] text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {lang === 'ne' ? preset.label_ne : preset.label_en}
                </button>
              ))}
            </div>
          </div>

          {/* Interest Rate & Duration Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Interest Rate */}
            <div>
              <div className="flex justify-between items-center text-xs font-medium text-slate-700 mb-1">
                <span>{lang === 'ne' ? 'वार्षिक ब्याजदर (Rate %)' : 'Annual Interest Rate (%)'}</span>
                <span className="font-mono font-bold text-slate-800">{rate.toFixed(2)}%</span>
              </div>
              <input
                type="number"
                step="0.25"
                min="8"
                max="18"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#17324D] font-mono"
              />
              <span className="block text-[11px] text-slate-400 mt-1">
                {lang === 'ne' ? 'सहकारी मापदण्ड: ११.००% - १४.५०%' : 'Cooperative standard: 11% - 14.5%'}
              </span>
            </div>

            {/* Tenure Select */}
            <div>
              <div className="flex justify-between items-center text-xs font-medium text-slate-700 mb-1">
                <span>{lang === 'ne' ? 'कर्जा अवधि (Tenure)' : 'Repayment Duration'}</span>
                <span className="font-mono font-bold text-slate-800">{tenureMonths} mo</span>
              </div>
              <select
                value={tenureMonths}
                onChange={(e) => setTenureMonths(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#17324D] bg-white font-mono"
              >
                <option value={12}>1 {lang === 'ne' ? 'वर्ष (12 महिना)' : 'Year (12 Months)'}</option>
                <option value={24}>2 {lang === 'ne' ? 'वर्ष (24 महिना)' : 'Years (24 Months)'}</option>
                <option value={36}>3 {lang === 'ne' ? 'वर्ष (36 महिना)' : 'Years (36 Months)'}</option>
                <option value={48}>4 {lang === 'ne' ? 'वर्ष (48 महिना)' : 'Years (48 Months)'}</option>
                <option value={60}>5 {lang === 'ne' ? 'वर्ष (60 महिना)' : 'Years (60 Months)'}</option>
                <option value={84}>7 {lang === 'ne' ? 'वर्ष (84 महिना)' : 'Years (84 Months)'}</option>
                <option value={120}>10 {lang === 'ne' ? 'वर्ष (120 महिना)' : 'Years (120 Months)'}</option>
              </select>
              <span className="block text-[11px] text-slate-400 mt-1">
                {lang === 'ne' ? `कुल ${tenureMonths} किस्ताहरू` : `Total ${tenureMonths} installments`}
              </span>
            </div>
          </div>

          {/* Visual Percentage Split Bar */}
          <div>
            <div className="flex justify-between text-xs text-slate-500 mb-1 font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#146B45]" />
                <span>{lang === 'ne' ? `साँवा (${results.principalPercent}%)` : `Principal (${results.principalPercent}%)`}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D6A63C]" />
                <span>{lang === 'ne' ? `ब्याज (${results.interestPercent}%)` : `Interest (${results.interestPercent}%)`}</span>
              </span>
            </div>

            <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden flex">
              <div 
                style={{ width: `${results.principalPercent}%` }} 
                className="bg-[#146B45] h-full transition-all duration-300"
              />
              <div 
                style={{ width: `${results.interestPercent}%` }} 
                className="bg-[#D6A63C] h-full transition-all duration-300"
              />
            </div>
          </div>
        </div>

        {/* Calculation Result Summary Card */}
        <div className="lg:col-span-5 bg-[#17324D] text-white rounded-2xl p-5 sm:p-6 border border-[#D6A63C]/30 shadow-md">
          <div className="text-xs text-[#D6A63C] font-semibold uppercase tracking-wider mb-2">
            {lang === 'ne' ? 'किस्ता गणना सारांश' : 'Estimated Repayment Summary'}
          </div>

          <div className="mb-4">
            <span className="text-xs text-slate-300 block">
              {lang === 'ne' ? 'मासिक किस्ता रकम (Estimated Monthly EMI):' : 'Estimated Monthly EMI:'}
            </span>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-[#D6A63C] tabular-nums mt-0.5 break-words">
              NPR {results.emi.toLocaleString()}
            </div>
          </div>

          <div className="space-y-2.5 py-3 border-y border-white/10 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-300">{lang === 'ne' ? 'कुल ऋण साँवा' : 'Principal Loan'}:</span>
              <span className="font-mono font-semibold">NPR {principal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">{lang === 'ne' ? 'कुल तिर्नुपर्ने ब्याज' : 'Total Interest'}:</span>
              <span className="font-mono font-semibold text-amber-300">+ NPR {results.totalInterest.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">{lang === 'ne' ? 'कुल भुक्तानी (साँवा+ब्याज)' : 'Total Repayment'}:</span>
              <span className="font-mono font-semibold text-white">NPR {results.totalPayment.toLocaleString()}</span>
            </div>
          </div>

          {/* Action Consultation */}
          <button
            onClick={() => onNavigate && onNavigate('contact')}
            className="w-full mt-5 py-2.5 bg-[#146B45] hover:bg-[#105537] active:bg-[#0c452c] text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm min-h-[42px]"
          >
            <span>{lang === 'ne' ? 'यो कर्जाका लागि सम्पर्क गर्नुहोस्' : 'Request Loan Consultation'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Toggle Full Life Amortization Schedule Button */}
          <button
            type="button"
            onClick={() => setShowAmortization(!showAmortization)}
            className={`w-full mt-2.5 py-2 px-3 text-xs rounded-lg flex items-center justify-center gap-1.5 transition-colors border ${
              showAmortization
                ? 'bg-[#D6A63C] text-[#17324D] font-bold border-[#D6A63C]'
                : 'bg-white/10 hover:bg-white/20 text-slate-200 border-white/20'
            }`}
          >
            <Table className="w-4 h-4" />
            <span>
              {showAmortization
                ? (lang === 'ne' ? 'किस्ता तालिका बन्द गर्नुहोस्' : 'Hide Amortization Table')
                : (lang === 'ne' ? `पूर्ण किस्ता तालिका हेर्नुहोस् (${tenureMonths} महिना)` : `View Full Amortization (${tenureMonths} Mo)`)}
            </span>
            {showAmortization ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
          </button>
        </div>
      </div>

      {/* Extended Life-of-Loan Amortization Schedule Drawer */}
      {showAmortization && (
        <div className="mt-8 pt-6 border-t border-slate-200 animate-in fade-in duration-200">
          {/* Header Controls for Schedule */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <Table className="w-4 h-4 text-[#146B45]" />
                <h4 className="text-sm sm:text-base font-bold text-[#17324D]">
                  {lang === 'ne' 
                    ? `ऋण भुक्तानी तालिका (कुल ${tenureMonths} महिनाको हिसाब)` 
                    : `Full Loan Amortization Schedule (${tenureMonths} Months Lifetime)`}
                </h4>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {lang === 'ne' 
                  ? 'घट्दो दर प्रणाली अनुसार प्रत्येक महिनाको साँवा, ब्याज र बाँकी मौज्दातको विस्तृत विवरण।'
                  : 'Detailed month-by-month principal reduction, interest payout, and remaining balances.'}
              </p>
            </div>

            {/* View Switcher & CSV Download */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center p-0.5 bg-slate-100 rounded-lg border border-slate-200 text-xs">
                <button
                  type="button"
                  onClick={() => setViewType('monthly')}
                  className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                    viewType === 'monthly' ? 'bg-[#17324D] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {lang === 'ne' ? 'मासिक तालिका' : 'Monthly View'}
                </button>
                <button
                  type="button"
                  onClick={() => setViewType('yearly')}
                  className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                    viewType === 'yearly' ? 'bg-[#17324D] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {lang === 'ne' ? 'वार्षिक सारांश' : 'Yearly Summary'}
                </button>
              </div>

              <button
                type="button"
                onClick={handleExportCSV}
                className="px-3 py-1.5 bg-[#146B45] hover:bg-[#105537] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-xs transition-colors"
                title="Download CSV Spreadsheet"
              >
                <Download className="w-3.5 h-3.5" />
                <span>CSV</span>
              </button>
            </div>
          </div>

          {/* Year Filter Tabs (Available when in Monthly view and tenure > 12 months) */}
          {viewType === 'monthly' && totalYears > 1 && (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-3 no-scrollbar text-xs">
              <span className="text-slate-400 text-[11px] mr-1 shrink-0">
                {lang === 'ne' ? 'वर्ष अनुसार छनोट:' : 'Filter Year:'}
              </span>
              <button
                type="button"
                onClick={() => setSelectedYearFilter('all')}
                className={`px-2.5 py-1 rounded-md transition-colors shrink-0 ${
                  selectedYearFilter === 'all'
                    ? 'bg-[#17324D] text-white font-semibold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {lang === 'ne' ? 'सबै महिना (All Months)' : 'All Months'}
              </button>
              {Array.from({ length: totalYears }, (_, i) => i + 1).map((yr) => (
                <button
                  key={yr}
                  type="button"
                  onClick={() => setSelectedYearFilter(yr)}
                  className={`px-2.5 py-1 rounded-md transition-colors shrink-0 ${
                    selectedYearFilter === yr
                      ? 'bg-[#146B45] text-white font-semibold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {lang === 'ne' ? `वर्ष ${yr} (Year ${yr})` : `Year ${yr}`}
                </button>
              ))}
            </div>
          )}

          {/* Dual Layout Container: Mobile Cards (block md:hidden) vs Desktop Table (hidden md:block) */}
          <div className="max-h-[460px] overflow-y-auto border border-slate-200 rounded-xl shadow-xs bg-white">
            {viewType === 'monthly' ? (
              <>
                {/* Mobile View: Responsive Stacked Cards (Zero horizontal scroll) */}
                <div className="block md:hidden p-3 space-y-3 bg-[#F5F7F6]">
                  {displayedMonthlyRows.map((row) => (
                    <div key={row.month} className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-2.5 shadow-2xs">
                      <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-md bg-[#17324D] text-white flex items-center justify-center text-[10px] font-mono font-bold">
                            #{row.month}
                          </span>
                          <div>
                            <span className="font-bold text-slate-800 text-xs">
                              {lang === 'ne' ? `महिना ${row.month}` : `Month ${row.month}`}
                            </span>
                            <span className="text-[10px] text-slate-400 font-sans ml-1.5">(Yr {row.year})</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-slate-400 font-sans block">{lang === 'ne' ? 'मासिक किस्ता' : 'EMI'}</span>
                          <span className="font-mono font-bold text-[#17324D] text-xs">
                            NPR {row.installment.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                        <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                          <span className="text-[10px] text-slate-500 font-sans block">{lang === 'ne' ? 'साँवा कट्टा' : 'Principal'}</span>
                          <span className="font-bold text-emerald-700">NPR {row.principal.toLocaleString()}</span>
                        </div>
                        <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                          <span className="text-[10px] text-slate-500 font-sans block">{lang === 'ne' ? 'ब्याज रकम' : 'Interest'}</span>
                          <span className="font-bold text-amber-700">NPR {row.interest.toLocaleString()}</span>
                        </div>
                        <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                          <span className="text-[10px] text-slate-500 font-sans block">{lang === 'ne' ? 'कुल साँवा' : 'Cumul. Principal'}</span>
                          <span className="text-slate-600">NPR {row.cumulativePrincipal.toLocaleString()}</span>
                        </div>
                        <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                          <span className="text-[10px] text-slate-500 font-sans block">{lang === 'ne' ? 'बाँकी मौज्दात' : 'Remaining Bal.'}</span>
                          <span className="font-bold text-slate-900">NPR {row.balance.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop View: Full Amortization Table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-xs text-left bg-[#F5F7F6] font-mono">
                    <thead className="bg-[#17324D] text-white font-semibold sticky top-0 z-10">
                      <tr>
                        <th className="py-2.5 px-3"># Month</th>
                        <th className="py-2.5 px-3 text-right">Installment (EMI)</th>
                        <th className="py-2.5 px-3 text-right text-emerald-300">Principal</th>
                        <th className="py-2.5 px-3 text-right text-amber-300">Interest</th>
                        <th className="py-2.5 px-3 text-right">Cumulative Principal</th>
                        <th className="py-2.5 px-3 text-right">Remaining Balance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                      {displayedMonthlyRows.map((row) => (
                        <tr key={row.month} className="hover:bg-slate-50 transition-colors">
                          <td className="py-2 px-3 font-semibold text-slate-700">
                            Month {row.month}
                            <span className="text-[10px] text-slate-400 ml-1.5 font-sans">(Yr {row.year})</span>
                          </td>
                          <td className="py-2 px-3 text-right font-bold text-slate-900">
                            NPR {row.installment.toLocaleString()}
                          </td>
                          <td className="py-2 px-3 text-right font-medium text-emerald-700">
                            NPR {row.principal.toLocaleString()}
                          </td>
                          <td className="py-2 px-3 text-right text-amber-700">
                            NPR {row.interest.toLocaleString()}
                          </td>
                          <td className="py-2 px-3 text-right text-slate-500">
                            NPR {row.cumulativePrincipal.toLocaleString()}
                          </td>
                          <td className="py-2 px-3 text-right font-semibold text-slate-800">
                            NPR {row.balance.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <>
                {/* Mobile View: Yearly Summary Cards */}
                <div className="block md:hidden p-3 space-y-3 bg-[#F5F7F6]">
                  {yearlySummary.map((yr) => (
                    <div key={yr.year} className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-2.5 shadow-2xs">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs">
                        <div>
                          <span className="font-bold text-[#17324D] text-sm">
                            {lang === 'ne' ? `वर्ष ${yr.year}` : `Year ${yr.year}`}
                          </span>
                          <span className="text-[10px] text-slate-400 font-sans block">
                            ({yr.year === totalYears ? `Month ${(yr.year - 1) * 12 + 1} - ${tenureMonths}` : `Month ${(yr.year - 1) * 12 + 1} - ${yr.year * 12}`})
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-slate-400 font-sans block">{lang === 'ne' ? 'कुल किस्ता' : 'Yearly EMI'}</span>
                          <span className="font-mono font-bold text-slate-900 text-xs">
                            NPR {yr.totalInstallment.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                        <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                          <span className="text-[10px] text-slate-500 font-sans block">{lang === 'ne' ? 'साँवा भुक्तान' : 'Total Principal'}</span>
                          <span className="font-bold text-emerald-700">NPR {yr.totalPrincipal.toLocaleString()}</span>
                        </div>
                        <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                          <span className="text-[10px] text-slate-500 font-sans block">{lang === 'ne' ? 'ब्याज भुक्तान' : 'Total Interest'}</span>
                          <span className="font-bold text-amber-700">NPR {yr.totalInterest.toLocaleString()}</span>
                        </div>
                        <div className="col-span-2 bg-slate-50 p-2 rounded-lg border border-slate-100 flex items-center justify-between">
                          <span className="text-[10px] text-slate-500 font-sans">{lang === 'ne' ? 'वर्षान्त मौज्दात' : 'Ending Balance'}:</span>
                          <span className="font-bold text-[#17324D]">NPR {yr.endingBalance.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop View: Full Yearly Table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-xs text-left bg-[#F5F7F6] font-mono">
                    <thead className="bg-[#17324D] text-white font-semibold sticky top-0 z-10">
                      <tr>
                        <th className="py-2.5 px-3">Year Period</th>
                        <th className="py-2.5 px-3 text-right">Total Installments (NPR)</th>
                        <th className="py-2.5 px-3 text-right text-emerald-300">Total Principal Paid</th>
                        <th className="py-2.5 px-3 text-right text-amber-300">Total Interest Paid</th>
                        <th className="py-2.5 px-3 text-right">Year-End Loan Balance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                      {yearlySummary.map((yr) => (
                        <tr key={yr.year} className="hover:bg-slate-50 transition-colors">
                          <td className="py-2.5 px-3 font-bold text-slate-800">
                            Year {yr.year} ({yr.year === totalYears ? `Month ${(yr.year - 1) * 12 + 1} - ${tenureMonths}` : `Month ${(yr.year - 1) * 12 + 1} - ${yr.year * 12}`})
                          </td>
                          <td className="py-2.5 px-3 text-right font-bold text-slate-900">
                            NPR {yr.totalInstallment.toLocaleString()}
                          </td>
                          <td className="py-2.5 px-3 text-right font-medium text-emerald-700">
                            NPR {yr.totalPrincipal.toLocaleString()}
                          </td>
                          <td className="py-2.5 px-3 text-right text-amber-700">
                            NPR {yr.totalInterest.toLocaleString()}
                          </td>
                          <td className="py-2.5 px-3 text-right font-bold text-[#17324D]">
                            NPR {yr.endingBalance.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>

          {/* Footer note in schedule */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mt-3 text-[11px] text-slate-500">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#146B45]" />
              <span>
                {lang === 'ne' 
                  ? `अन्तिम महिनामा बाँकी मौज्दात रु. ०.०० मा भुक्तानी चुक्ता हुन्छ।` 
                  : `Loan balance drops to NPR 0.00 at maturity (Month ${tenureMonths}).`}
              </span>
            </div>
            <div className="font-mono">
              Total Principal: NPR {principal.toLocaleString()} · Total Interest: NPR {results.totalInterest.toLocaleString()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
