import React, { useState } from 'react';
import { Language } from '../types';
import { 
  amountToNepaliWords, 
  amountToEnglishWords 
} from '../utils/nepaliNumberToWords';
import { 
  Banknote, 
  RotateCcw, 
  Copy, 
  Check, 
  Printer, 
  FileText, 
  Coins, 
  Wallet, 
  Layers, 
  Plus, 
  Minus, 
  Share2, 
  Sparkles, 
  Building2,
  Calendar,
  User,
  ArrowRight
} from 'lucide-react';

interface NoteCounterProps {
  lang: Language;
  onNavigateToMemberPortal?: () => void;
}

interface DenominationItem {
  val: number;
  label_ne: string;
  label_en: string;
  colorClass: string;
  badgeBg: string;
}

const DENOMINATIONS: DenominationItem[] = [
  { val: 1000, label_ne: 'रु १०००', label_en: 'Rs. 1000', colorClass: 'text-sky-800', badgeBg: 'bg-sky-50 border-sky-200' },
  { val: 500, label_ne: 'रु ५००', label_en: 'Rs. 500', colorClass: 'text-amber-900', badgeBg: 'bg-amber-50 border-amber-200' },
  { val: 100, label_ne: 'रु १००', label_en: 'Rs. 100', colorClass: 'text-emerald-800', badgeBg: 'bg-emerald-50 border-emerald-200' },
  { val: 50, label_ne: 'रु ५०', label_en: 'Rs. 50', colorClass: 'text-purple-800', badgeBg: 'bg-purple-50 border-purple-200' },
  { val: 20, label_ne: 'रु २०', label_en: 'Rs. 20', colorClass: 'text-orange-800', badgeBg: 'bg-orange-50 border-orange-200' },
  { val: 10, label_ne: 'रु १०', label_en: 'Rs. 10', colorClass: 'text-stone-800', badgeBg: 'bg-stone-100 border-stone-200' },
  { val: 5, label_ne: 'रु ५', label_en: 'Rs. 5', colorClass: 'text-rose-800', badgeBg: 'bg-rose-50 border-rose-200' },
  { val: 2, label_ne: 'रु २', label_en: 'Rs. 2', colorClass: 'text-slate-700', badgeBg: 'bg-slate-100 border-slate-200' },
  { val: 1, label_ne: 'रु १', label_en: 'Rs. 1', colorClass: 'text-slate-700', badgeBg: 'bg-slate-100 border-slate-200' },
];

export const NoteCounter: React.FC<NoteCounterProps> = ({
  lang,
  onNavigateToMemberPortal
}) => {
  // Counts state for each denomination
  const [counts, setCounts] = useState<{ [key: number]: number }>({
    1000: 50,
    500: 20,
    100: 50,
    50: 20,
    20: 10,
    10: 20,
    5: 10,
    2: 0,
    1: 0
  });

  // Loose coins total in rupees
  const [coinsAmount, setCoinsAmount] = useState<number>(150);

  // Active view mode: 'counter' or 'voucher'
  const [viewMode, setViewMode] = useState<'counter' | 'voucher'>('counter');

  // Copy notification state
  const [copied, setCopied] = useState<boolean>(false);

  // Voucher details state
  const [voucherData, setVoucherData] = useState({
    accountNumber: 'SB-01-002489',
    memberName: 'रामबहादुर श्रेष्ठ (Ram Bahadur Shrestha)',
    phone: '9841234567',
    purpose: 'नियमित बचत निक्षेप (Regular Savings Deposit)',
    date: new Date().toISOString().split('T')[0]
  });

  // Updates count for a specific note denomination
  const handleCountChange = (val: number, newCount: number) => {
    const safeCount = Math.max(0, isNaN(newCount) ? 0 : Math.floor(newCount));
    setCounts(prev => ({ ...prev, [val]: safeCount }));
  };

  const incrementCount = (val: number, delta: number) => {
    setCounts(prev => ({
      ...prev,
      [val]: Math.max(0, (prev[val] || 0) + delta)
    }));
  };

  // Reset all counts
  const handleReset = () => {
    const emptyCounts: { [key: number]: number } = {};
    DENOMINATIONS.forEach(d => {
      emptyCounts[d.val] = 0;
    });
    setCounts(emptyCounts);
    setCoinsAmount(0);
  };

  // Preset loaders
  const loadPreset = (type: '1lakh' | '50k' | 'retail') => {
    if (type === '1lakh') {
      setCounts({ 1000: 100, 500: 0, 100: 0, 50: 0, 20: 0, 10: 0, 5: 0, 2: 0, 1: 0 });
      setCoinsAmount(0);
    } else if (type === '50k') {
      setCounts({ 1000: 30, 500: 30, 100: 45, 50: 10, 20: 0, 10: 0, 5: 0, 2: 0, 1: 0 });
      setCoinsAmount(0);
    } else {
      setCounts({ 1000: 10, 500: 20, 100: 50, 50: 40, 20: 50, 10: 100, 5: 40, 2: 25, 1: 50 });
      setCoinsAmount(125);
    }
  };

  // Math totals
  const totalNotesCount = Object.values(counts).reduce((acc, c) => acc + (c || 0), 0);
  const totalNotesAmount = DENOMINATIONS.reduce((acc, d) => {
    const count = counts[d.val] || 0;
    return acc + (d.val * count);
  }, 0);
  const grandTotal = totalNotesAmount + (Number(coinsAmount) || 0);

  // Full bundles count (100 notes = 1 bundle/gaddi)
  const fullBundlesCount = Object.values(counts).reduce((acc, c) => acc + Math.floor((c || 0) / 100), 0);
  const looseNotesCount = Object.values(counts).reduce((acc, c) => acc + ((c || 0) % 100), 0);

  // Words
  const amountNepaliWords = amountToNepaliWords(grandTotal);
  const amountEnglishWords = amountToEnglishWords(grandTotal);

  // Copy summary handler
  const handleCopySummary = () => {
    let summaryText = `*Aadhunik Jana Saving & Credit Co-operative Ltd.*\n`;
    summaryText += `*Cash Denomination Breakdown / नोट काउन्टर विवरण*\n`;
    summaryText += `-------------------------------------------\n`;
    DENOMINATIONS.forEach(d => {
      const c = counts[d.val] || 0;
      if (c > 0) {
        summaryText += `Rs. ${d.val} x ${c} = NPR ${(d.val * c).toLocaleString()}\n`;
      }
    });
    if (coinsAmount > 0) {
      summaryText += `Coins / सिक्का: NPR ${coinsAmount.toLocaleString()}\n`;
    }
    summaryText += `-------------------------------------------\n`;
    summaryText += `Total Pieces: ${totalNotesCount} Notes\n`;
    summaryText += `Grand Total: NPR ${grandTotal.toLocaleString()}\n`;
    summaryText += `In Words (NE): ${amountNepaliWords}\n`;
    summaryText += `In Words (EN): ${amountEnglishWords}\n`;

    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Mode Switcher */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-[#146B45]/10 text-[#146B45] flex items-center justify-center shrink-0">
              <Banknote className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-xl font-bold text-[#17324D]">
                  {lang === 'ne' ? 'नेपाली नोट काउन्टर तथा दरबन्दी क्यालकुलेटर' : 'NPR Note Counter & Denomination Calculator'}
                </h2>
                <span className="text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  {lang === 'ne' ? 'लाइभ' : 'Live Tool'}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {lang === 'ne' 
                  ? 'सहकारी काउन्टर नगद जम्मा, भुक्तानी, गड्डी गन्ती तथा भौचर प्रमाणीकरणका लागि आधिकारिक दरबन्दी गणना।' 
                  : 'Fast, error-free Nepalese currency note counting, bundle tally, and printable deposit voucher generator.'}
              </p>
            </div>
          </div>

          {/* Switcher & Action buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => setViewMode('counter')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                  viewMode === 'counter'
                    ? 'bg-[#146B45] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{lang === 'ne' ? 'काउन्टर' : 'Live Counter'}</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('voucher')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                  viewMode === 'voucher'
                    ? 'bg-[#17324D] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>{lang === 'ne' ? 'नगद भौचर (Voucher)' : 'Deposit Voucher'}</span>
              </button>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-red-700 hover:bg-red-50 border border-slate-200 rounded-lg transition-colors flex items-center gap-1"
              title="Reset all note counts to 0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{lang === 'ne' ? 'खाली' : 'Reset'}</span>
            </button>
          </div>
        </div>

        {/* Quick presets strip */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex flex-wrap items-center gap-1.5 text-slate-500">
            <span className="font-medium mr-1">{lang === 'ne' ? 'छिटो नमुना लोड:' : 'Quick Presets:'}</span>
            <button
              type="button"
              onClick={() => loadPreset('1lakh')}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-mono text-[11px] transition-colors"
            >
              100 × Rs 1000 (१ लाख)
            </button>
            <button
              type="button"
              onClick={() => loadPreset('50k')}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-mono text-[11px] transition-colors"
            >
              Mixed Rs 50,000 (५० हजार)
            </button>
            <button
              type="button"
              onClick={() => loadPreset('retail')}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-mono text-[11px] transition-colors"
            >
              Counter Petty Cash (खुद्रा मौज्दात)
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopySummary}
              className="px-3 py-1 text-xs font-semibold text-[#146B45] hover:bg-[#146B45]/10 border border-[#146B45]/30 rounded-md transition-colors flex items-center gap-1"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? (lang === 'ne' ? 'कपी गरियो!' : 'Copied!') : (lang === 'ne' ? 'विवरण कपी' : 'Copy Breakdown')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Aggregate KPI Strip (Always visible, prominent) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Cash Amount */}
        <div className="bg-linear-to-br from-[#146B45] to-[#0c4029] text-white p-5 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between opacity-90 mb-1 text-xs font-medium">
            <span>{lang === 'ne' ? 'कुल जम्मा रकम (Total Amount)' : 'Grand Total Cash'}</span>
            <Wallet className="w-4 h-4 text-[#D6A63C]" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-white tabular-nums my-1">
            NPR {grandTotal.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-100/90 truncate">
            {lang === 'ne' ? 'नेपाली रुपैयाँ' : 'Nepalese Rupees'}
          </div>
        </div>

        {/* Total Notes Count */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-1 text-xs font-medium">
            <span>{lang === 'ne' ? 'कुल नोट संख्या (Total Notes)' : 'Total Banknote Pieces'}</span>
            <Banknote className="w-4 h-4 text-[#17324D]" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-[#17324D] tabular-nums my-1">
            {totalNotesCount} <span className="text-sm font-normal text-slate-500">{lang === 'ne' ? 'थान' : 'Pcs'}</span>
          </div>
          <div className="text-[11px] text-slate-500">
            {fullBundlesCount > 0 
              ? `${fullBundlesCount} ${lang === 'ne' ? 'गड्डी' : 'Bundles'} + ${looseNotesCount} ${lang === 'ne' ? 'खुद्रा नोट' : 'Loose Notes'}` 
              : `${totalNotesCount} ${lang === 'ne' ? 'खुद्रा थान' : 'Loose Pieces'}`}
          </div>
        </div>

        {/* Bundles (१०० थान = १ गड्डी) */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-1 text-xs font-medium">
            <span>{lang === 'ne' ? 'गड्डी संख्या (Bundles of 100)' : 'Packets (100 Notes)'}</span>
            <Layers className="w-4 h-4 text-[#D6A63C]" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-slate-800 tabular-nums my-1">
            {fullBundlesCount} <span className="text-sm font-normal text-slate-500">{lang === 'ne' ? 'गड्डी' : 'Packets'}</span>
          </div>
          <div className="text-[11px] text-amber-700 font-medium">
            {lang === 'ne' ? `खुद्रा नोट: ${looseNotesCount} थान` : `Loose Notes: ${looseNotesCount} pcs`}
          </div>
        </div>

        {/* Coins / Small Change */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-1 text-xs font-medium">
            <span>{lang === 'ne' ? 'सिक्का तथा खुद्रा (Coins)' : 'Coins & Loose Change'}</span>
            <Coins className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-slate-800 tabular-nums my-1">
            NPR {Number(coinsAmount || 0).toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400">
            {lang === 'ne' ? 'सिक्का जम्मा रकम' : 'Custom Coins Subtotal'}
          </div>
        </div>
      </div>

      {/* Words Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 border border-amber-200/90 text-slate-800 text-xs sm:text-sm space-y-1.5 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900">
          <Sparkles className="w-3.5 h-3.5 text-[#D6A63C]" />
          <span>{lang === 'ne' ? 'अक्षरूपी कुल रकम (Amount in Words)' : 'Amount in Words (Standard Cooperative Legal Format)'}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
          <div className="p-2.5 bg-white rounded-xl border border-amber-200 font-medium text-slate-900">
            <span className="text-[10px] text-slate-400 block font-sans uppercase font-bold mb-0.5">नेपालीमा (Devnagari):</span>
            <span className="text-sm text-[#146B45] font-bold">{amountNepaliWords}</span>
          </div>
          <div className="p-2.5 bg-white rounded-xl border border-amber-200 font-medium text-slate-900">
            <span className="text-[10px] text-slate-400 block font-sans uppercase font-bold mb-0.5">In English (South Asian System):</span>
            <span className="text-sm text-[#17324D] font-bold">{amountEnglishWords}</span>
          </div>
        </div>
      </div>

      {/* VIEW MODE 1: Interactive Denomination Live Counter */}
      {viewMode === 'counter' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-[#17324D]">
                {lang === 'ne' ? 'नोट दरबन्दी तथा थान प्रविष्टि (Denomination Note Inputs)' : 'Denomination Note Quantity Input'}
              </h3>
              <p className="text-xs text-slate-500">
                {lang === 'ne' ? 'प्रत्येक दरको नोट थान लेख्नुहोस् वा + बटन थिच्नुहोस्' : 'Type the number of pieces for each note or use quick packet multipliers'}
              </p>
            </div>
            <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md hidden sm:inline">
              1 Packet (गड्डी) = 100 Notes
            </span>
          </div>

          {/* Denominations List / Grid */}
          <div className="space-y-3">
            {DENOMINATIONS.map((d) => {
              const count = counts[d.val] || 0;
              const subtotal = d.val * count;
              const percentOfTotal = grandTotal > 0 ? ((subtotal / grandTotal) * 100).toFixed(1) : '0';

              return (
                <div 
                  key={d.val}
                  className={`p-3.5 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    count > 0 ? 'bg-white border-[#146B45]/40 shadow-xs' : 'bg-[#F5F7F6]/60 border-slate-200'
                  }`}
                >
                  {/* Left: Denomination Badge & Quick Packets */}
                  <div className="flex items-center gap-3 min-w-[170px]">
                    <div className={`px-3 py-1.5 rounded-lg border font-mono font-bold text-sm sm:text-base ${d.badgeBg} ${d.colorClass} shadow-2xs`}>
                      {lang === 'ne' ? d.label_ne : d.label_en}
                    </div>
                    <div className="text-xs text-slate-500">
                      <span className="font-semibold text-slate-700 block font-mono">
                        {count > 0 ? `${count} ${lang === 'ne' ? 'थान' : 'pcs'}` : '0'}
                      </span>
                      {count >= 100 && (
                        <span className="text-[10px] text-amber-700 font-medium">
                          {Math.floor(count / 100)} {lang === 'ne' ? 'गड्डी' : 'pkts'}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Middle: Steppers and Input */}
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Steppers */}
                    <div className="flex items-center border border-slate-300 rounded-lg bg-white overflow-hidden shadow-2xs">
                      <button
                        type="button"
                        onClick={() => incrementCount(d.val, -1)}
                        disabled={count <= 0}
                        className="px-2.5 py-2 hover:bg-slate-100 disabled:opacity-40 text-slate-600 transition-colors"
                        title="Subtract 1"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <input
                        type="number"
                        min="0"
                        value={count === 0 ? '' : count}
                        onChange={(e) => handleCountChange(d.val, parseInt(e.target.value, 10))}
                        placeholder="0"
                        className="w-18 sm:w-24 py-1.5 text-center text-xs sm:text-sm font-bold font-mono text-slate-800 focus:outline-hidden"
                      />
                      <button
                        type="button"
                        onClick={() => incrementCount(d.val, 1)}
                        className="px-2.5 py-2 hover:bg-slate-100 text-slate-600 transition-colors"
                        title="Add 1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Quick increment packet chips */}
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => incrementCount(d.val, 10)}
                        className="px-2 py-1 text-[11px] font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition-colors"
                      >
                        +10
                      </button>
                      <button
                        type="button"
                        onClick={() => incrementCount(d.val, 50)}
                        className="px-2 py-1 text-[11px] font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition-colors"
                      >
                        +50
                      </button>
                      <button
                        type="button"
                        onClick={() => incrementCount(d.val, 100)}
                        className="px-2.5 py-1 text-[11px] font-semibold bg-emerald-50 hover:bg-emerald-100 text-[#146B45] border border-emerald-200 rounded-md transition-colors flex items-center gap-0.5"
                        title="Add 1 Packet (100 Notes)"
                      >
                        <span>+100 (१ गड्डी)</span>
                      </button>
                    </div>
                  </div>

                  {/* Right: Subtotal Amount */}
                  <div className="flex items-center justify-between sm:justify-end gap-3 min-w-[160px] text-right pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <div>
                      <div className="text-xs sm:text-sm font-bold font-mono text-slate-900 tabular-nums">
                        NPR {subtotal.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {count > 0 ? `${percentOfTotal}% of total` : '-'}
                      </div>
                    </div>
                    {count > 0 && (
                      <button
                        type="button"
                        onClick={() => handleCountChange(d.val, 0)}
                        className="text-slate-300 hover:text-red-600 p-1 transition-colors"
                        title="Clear this denomination"
                      >
                        &times;
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Coins Input Row */}
            <div className="p-3.5 rounded-xl border border-slate-200 bg-[#F5F7F6]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-[170px]">
                <div className="px-3 py-1.5 rounded-lg border font-mono font-bold text-xs sm:text-sm bg-slate-100 border-slate-300 text-slate-800 flex items-center gap-1.5 shadow-2xs">
                  <Coins className="w-3.5 h-3.5 text-amber-600" />
                  <span>{lang === 'ne' ? 'सिक्का / चिल्लर' : 'Coins & Loose'}</span>
                </div>
                <span className="text-xs text-slate-500">{lang === 'ne' ? 'खुद्रा रकम (रु)' : 'Loose Amount (NPR)'}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-600 font-semibold">NPR:</span>
                <input
                  type="number"
                  min="0"
                  value={coinsAmount === 0 ? '' : coinsAmount}
                  onChange={(e) => setCoinsAmount(Math.max(0, parseInt(e.target.value, 10) || 0))}
                  placeholder="0"
                  className="w-28 sm:w-36 px-3 py-1.5 border border-slate-300 bg-white rounded-lg text-xs sm:text-sm font-mono font-bold focus:outline-hidden focus:ring-1 focus:ring-[#146B45]"
                />
                <button
                  type="button"
                  onClick={() => setCoinsAmount(0)}
                  className="px-2 py-1 text-xs text-slate-400 hover:text-red-600"
                >
                  {lang === 'ne' ? 'खाली' : 'Clear'}
                </button>
              </div>

              <div className="text-right min-w-[160px]">
                <div className="text-xs sm:text-sm font-bold font-mono text-slate-900 tabular-nums">
                  NPR {Number(coinsAmount || 0).toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-400">
                  {lang === 'ne' ? 'सिक्का मौज्दात' : 'Coins Subtotal'}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-slate-500 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>{lang === 'ne' ? 'गणना स्वचालित रूपमा सुरक्षित हुन्छ।' : 'Calculation auto-updates in real time.'}</span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setViewMode('voucher')}
                className="flex-1 sm:flex-none px-4 py-2.5 bg-[#17324D] hover:bg-[#12283e] text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <FileText className="w-3.5 h-3.5 text-[#D6A63C]" />
                <span>{lang === 'ne' ? 'नगद जम्मा भौचर बनाउनुहोस्' : 'Generate Deposit Slip'}</span>
              </button>

              <button
                type="button"
                onClick={handleCopySummary}
                className="flex-1 sm:flex-none px-4 py-2.5 bg-[#146B45] hover:bg-[#105537] text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? (lang === 'ne' ? 'कपी भयो' : 'Copied') : (lang === 'ne' ? 'विवरण कपी' : 'Copy')}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW MODE 2: Cooperative Cash Deposit Voucher (नगद जम्मा भौचर) */}
      {viewMode === 'voucher' && (
        <div className="bg-white rounded-2xl border border-slate-300 p-5 sm:p-8 shadow-md space-y-6 max-w-4xl mx-auto print:shadow-none print:border-none">
          {/* Printable Action Bar (Hidden in Print) */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200 print:hidden">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider bg-slate-100 px-2.5 py-1 rounded-md flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#146B45]" />
                <span>{lang === 'ne' ? 'सहकारी नगद जम्मा भौचर (Cash Deposit Slip)' : 'Cooperative Cash Deposit Voucher'}</span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 bg-[#146B45] hover:bg-[#105537] text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <Printer className="w-3.5 h-3.5 text-[#D6A63C]" />
                <span>{lang === 'ne' ? 'प्रिन्ट भौचर (Print Slip)' : 'Print Voucher'}</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('counter')}
                className="px-3.5 py-2 border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
              >
                {lang === 'ne' ? 'काउन्टरमा फर्कनुहोस्' : 'Back to Counter'}
              </button>
            </div>
          </div>

          {/* Editable Voucher Meta Bar (Hidden in Print) */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs print:hidden">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {lang === 'ne' ? 'खाता / सदस्य नं. :' : 'Account / Member No:'}
              </label>
              <input
                type="text"
                value={voucherData.accountNumber}
                onChange={(e) => setVoucherData(prev => ({ ...prev, accountNumber: e.target.value }))}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-md font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {lang === 'ne' ? 'जम्माकर्ता / सदस्यको नाम :' : 'Depositor Name:'}
              </label>
              <input
                type="text"
                value={voucherData.memberName}
                onChange={(e) => setVoucherData(prev => ({ ...prev, memberName: e.target.value }))}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-md"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {lang === 'ne' ? 'जम्मा प्रयोजन :' : 'Deposit Purpose:'}
              </label>
              <select
                value={voucherData.purpose}
                onChange={(e) => setVoucherData(prev => ({ ...prev, purpose: e.target.value }))}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-md"
              >
                <option value="नियमित बचत निक्षेप (Regular Savings Deposit)">नियमित बचत निक्षेप (Savings Deposit)</option>
                <option value="मासिक ऋण किस्ता भुक्तानी (Monthly Loan EMI)">मासिक ऋण किस्ता भुक्तानी (Loan EMI)</option>
                <option value="सदस्य सेयर खरिद (Share Capital Purchase)">सदस्य सेयर खरिद (Share Capital)</option>
                <option value="मुद्दती निक्षेप (Fixed Deposit)">मुद्दती निक्षेप (Fixed Deposit)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {lang === 'ne' ? 'मिति :' : 'Date:'}
              </label>
              <input
                type="date"
                value={voucherData.date}
                onChange={(e) => setVoucherData(prev => ({ ...prev, date: e.target.value }))}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-md font-mono"
              />
            </div>
          </div>

          {/* Official Voucher Printable Document */}
          <div className="border-2 border-[#146B45] p-5 sm:p-7 rounded-xl space-y-4">
            {/* Voucher Header */}
            <div className="border-b-2 border-[#146B45] pb-3 text-center">
              <div className="flex justify-center mb-1.5">
                <img 
                  src="/assets/aistudio/logo_aj-removebg-preview_9a0d83cb.png" 
                  alt="Cooperative Logo" 
                  className="h-12 sm:h-14 w-auto object-contain"
                />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-[#17324D]">
                आधुनिक जन बचत तथा ऋण सहकारी संस्था लि.
              </h2>
              <p className="text-[11px] text-slate-600 font-medium">
                Aadhunik Jana Saving & Credit Co-operative Ltd. · Nagarjun-4, Kathmandu · Ph: 01-4880000
              </p>
              <div className="inline-block mt-1.5 px-3 py-0.5 bg-[#146B45] text-white text-[11px] font-bold rounded-md uppercase tracking-wider">
                {lang === 'ne' ? 'नगद जम्मा भौचर (CASH DEPOSIT VOUCHER)' : 'OFFICIAL CASH DEPOSIT SLIP'}
              </div>
            </div>

            {/* Member and Slip Details Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-50 p-3 rounded-lg border border-slate-200 font-mono">
              <div>
                <span className="text-[10px] text-slate-500 block font-sans">Date (मिति):</span>
                <span className="font-bold text-slate-800">{voucherData.date}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block font-sans">A/C No. (खाता नं.):</span>
                <span className="font-bold text-[#146B45]">{voucherData.accountNumber}</span>
              </div>
              <div className="sm:col-span-2">
                <span className="text-[10px] text-slate-500 block font-sans">Name (नाम):</span>
                <span className="font-bold text-slate-800 font-sans">{voucherData.memberName}</span>
              </div>
              <div className="col-span-2 sm:col-span-4 pt-1 border-t border-slate-200/80">
                <span className="text-[10px] text-slate-500 inline mr-2 font-sans">Purpose (प्रयोजन):</span>
                <span className="font-medium text-slate-800 font-sans">{voucherData.purpose}</span>
              </div>
            </div>

            {/* Denomination Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border border-slate-200">
                <thead className="bg-[#17324D] text-white">
                  <tr>
                    <th className="py-2 px-3">{lang === 'ne' ? 'क्र.सं.' : 'S.N.'}</th>
                    <th className="py-2 px-3">{lang === 'ne' ? 'दर (Denomination)' : 'Note (NPR)'}</th>
                    <th className="py-2 px-3 text-center">{lang === 'ne' ? 'थान (Pieces / Qty)' : 'Pieces (Qty)'}</th>
                    <th className="py-2 px-3 text-right">{lang === 'ne' ? 'जम्मा रकम (NPR)' : 'Amount (NPR)'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-mono">
                  {DENOMINATIONS.map((d, idx) => {
                    const count = counts[d.val] || 0;
                    const subtotal = d.val * count;
                    if (count === 0 && d.val < 10) return null; // keep slip clean
                    return (
                      <tr key={d.val} className={count > 0 ? 'bg-emerald-50/30' : 'bg-white'}>
                        <td className="py-1.5 px-3 text-slate-500">{idx + 1}</td>
                        <td className="py-1.5 px-3 font-semibold text-slate-800">Rs. {d.val}</td>
                        <td className="py-1.5 px-3 text-center font-bold text-slate-700">
                          {count > 0 ? count : '-'}
                        </td>
                        <td className="py-1.5 px-3 text-right font-bold text-slate-900">
                          {count > 0 ? subtotal.toLocaleString() : '-'}
                        </td>
                      </tr>
                    );
                  })}
                  {coinsAmount > 0 && (
                    <tr className="bg-amber-50/40">
                      <td className="py-1.5 px-3 text-slate-500">-</td>
                      <td className="py-1.5 px-3 font-semibold text-slate-800">{lang === 'ne' ? 'सिक्का (Coins)' : 'Coins & Loose'}</td>
                      <td className="py-1.5 px-3 text-center">-</td>
                      <td className="py-1.5 px-3 text-right font-bold text-slate-900">{coinsAmount.toLocaleString()}</td>
                    </tr>
                  )}
                  {/* Total Row */}
                  <tr className="bg-slate-100 font-bold text-slate-900 border-t-2 border-slate-300">
                    <td colSpan={2} className="py-2 px-3 font-sans text-right uppercase">
                      {lang === 'ne' ? 'कुल जम्मा (Total Amount):' : 'Grand Total Amount:'}
                    </td>
                    <td className="py-2 px-3 text-center font-mono">
                      {totalNotesCount} {lang === 'ne' ? 'थान' : 'Pcs'}
                    </td>
                    <td className="py-2 px-3 text-right font-mono text-sm text-[#146B45]">
                      NPR {grandTotal.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Amount In Words in Voucher */}
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
              <span className="font-semibold text-slate-700 block mb-0.5">
                {lang === 'ne' ? 'अक्षरूपी रकम (In Words):' : 'Amount in Words:'}
              </span>
              <p className="font-bold text-[#146B45] text-xs sm:text-sm">
                {amountNepaliWords}
              </p>
              <p className="font-medium text-slate-600 text-xs mt-0.5">
                ({amountEnglishWords})
              </p>
            </div>

            {/* Signatures Grid */}
            <div className="pt-8 grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs text-center text-slate-600">
              <div>
                <div className="h-12 border-b border-dashed border-slate-400 mb-1"></div>
                <p className="font-semibold text-slate-800">{lang === 'ne' ? 'जम्माकर्ताको दस्तखत' : 'Depositor Signature'}</p>
                <p className="text-[10px] text-slate-400">Deposited By</p>
              </div>

              <div className="hidden sm:block">
                <div className="h-12 border-b border-dashed border-slate-400 mb-1 flex items-end justify-center text-[10px] text-emerald-800 font-bold">
                  [ CASH VERIFIED ]
                </div>
                <p className="font-semibold text-slate-800">{lang === 'ne' ? 'क्यासियर / टेलर' : 'Cashier / Teller'}</p>
                <p className="text-[10px] text-slate-400">Aadhunik Jana</p>
              </div>

              <div>
                <div className="h-12 border-b border-dashed border-slate-400 mb-1"></div>
                <p className="font-semibold text-slate-800">{lang === 'ne' ? 'अधिकृत हस्ताक्षर' : 'Authorized Officer'}</p>
                <p className="text-[10px] text-slate-400">Manager / Officer</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
