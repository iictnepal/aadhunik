import React, { useState } from 'react';
import { 
  Language, 
  MemberProfile, 
  MemberTransaction, 
  MemberRequest 
} from '../types';
import { MemberKYCForm } from './MemberKYCForm';
import { NoteCounter } from './NoteCounter';
import { 
  User, 
  Lock, 
  Wallet, 
  Coins, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Calendar, 
  FileText, 
  Download, 
  Send, 
  LogOut, 
  CheckCircle, 
  ShieldCheck, 
  Clock, 
  Building2, 
  RefreshCw,
  AlertCircle,
  FileBadge,
  Banknote
} from 'lucide-react';

interface MemberPortalProps {
  lang: Language;
  memberProfile: MemberProfile;
  transactions: MemberTransaction[];
  onAddRequest: (req: Omit<MemberRequest, 'id' | 'created_at' | 'status'>) => void;
  onLogout: () => void;
}

export const MemberPortal: React.FC<MemberPortalProps> = ({
  lang,
  memberProfile,
  transactions,
  onAddRequest,
  onLogout
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginCode, setLoginCode] = useState('AJ-10024');
  const [loginPassword, setLoginPassword] = useState('member123');
  const [authError, setAuthError] = useState('');

  // Portal active tabs
  const [currentTab, setCurrentTab] = useState<'overview' | 'savings' | 'loan' | 'statements' | 'kyc' | 'note_counter' | 'requests'>('overview');

  // Request form state
  const [requestType, setRequestType] = useState<'profile_update' | 'kyc_update' | 'loan_inquiry' | 'cheque_book' | 'statement'>('profile_update');
  const [requestDetails, setRequestDetails] = useState('');
  const [requestSuccess, setRequestSuccess] = useState(false);

  // Statement date range
  const [statementStart, setStatementStart] = useState('2026-09-01');
  const [statementEnd, setStatementEnd] = useState('2026-11-06');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginCode.trim().toUpperCase() === 'AJ-10024' && loginPassword === 'member123') {
      setIsLoggedIn(true);
      setAuthError('');
    } else {
      setAuthError(lang === 'ne' ? 'अमान्य सदस्य कोड वा पासवर्ड।' : 'Invalid Member ID or Password. Try demo: AJ-10024 / member123');
    }
  };

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestDetails.trim()) return;

    onAddRequest({
      member_code: memberProfile.member_code,
      member_name: lang === 'ne' ? memberProfile.full_name_ne : memberProfile.full_name_en,
      type: requestType,
      details: requestDetails.trim()
    });

    setRequestSuccess(true);
    setRequestDetails('');
    setTimeout(() => setRequestSuccess(false), 5000);
  };

  // If not logged in, show secure login card
  if (!isLoggedIn) {
    return (
      <div className="py-16 sm:py-24 bg-[#F5F7F6] flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <img 
                src="/assets/aistudio/logo_aj-removebg-preview_9a0d83cb.png" 
                alt="Aadhunik Jana Saving & Credit Co-operative Ltd." 
                className="h-11 sm:h-12 w-auto object-contain"
              />
            </div>
            <h2 className="text-xl font-bold text-[#17324D]">
              {lang === 'ne' ? 'सदस्य लगइन पोर्टल' : 'Member Secure Portal'}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {lang === 'ne'
                ? 'आधुनिक जन बचत तथा ऋण सहकारी संस्था लि.'
                : 'Aadhunik Jana Saving & Credit Co-operative Ltd.'}
            </p>
          </div>

          {/* Demo Credentials Info Box */}
          <div className="mb-6 p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600">
            <span className="font-semibold text-[#146B45] block mb-1">
              {lang === 'ne' ? 'प्रमाणीकरण डेमो विवरण (Pre-filled):' : 'Demo Credentials (Pre-filled):'}
            </span>
            <div className="flex justify-between font-mono text-[11px] text-slate-700">
              <span>Member ID: <strong>AJ-10024</strong></span>
              <span>Password: <strong>member123</strong></span>
            </div>
          </div>

          {authError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {lang === 'ne' ? 'सदस्य कोड / खाता नं. (Member ID)' : 'Member ID / Account Number'}
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={loginCode}
                  onChange={(e) => setLoginCode(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#146B45] font-mono uppercase"
                  placeholder="AJ-10024"
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {lang === 'ne' ? 'गोप्य पासवर्ड (Password)' : 'Password'}
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#146B45]"
                  placeholder="••••••••"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#146B45] hover:bg-[#105537] text-white text-xs font-semibold rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-[#D6A63C]" />
              <span>{lang === 'ne' ? 'सुरक्षित लगइन गर्नुहोस्' : 'Secure Member Login'}</span>
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-100 text-center text-[11px] text-slate-500">
            {lang === 'ne'
              ? 'पासवर्ड बिर्सनुभयो? मुख्य कार्यालयमा सम्पर्क गर्नुहोस्: +977-01-4880000'
              : 'Forgot password? Please contact cooperative branch support.'}
          </div>
        </div>
      </div>
    );
  }

  // Calculate totals
  const totalSavings = memberProfile.savings_accounts.reduce((sum, a) => sum + a.balance, 0);

  return (
    <div className="py-10 sm:py-14 bg-[#F5F7F6] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Top Header Card */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 border border-slate-200 shadow-xs mb-6 sm:mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#17324D] text-white flex items-center justify-center font-bold text-xl sm:text-2xl border-2 border-[#D6A63C] shrink-0">
              {memberProfile.full_name_en.charAt(0)}
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-lg sm:text-2xl font-bold text-[#17324D] truncate">
                  {lang === 'ne' ? memberProfile.full_name_ne : memberProfile.full_name_en}
                </h1>
                <button
                  type="button"
                  onClick={() => setCurrentTab('kyc')}
                  title={lang === 'ne' ? 'KYC विवरण हेर्नुहोस् वा अद्यावधिक गर्नुहोस्' : 'View or update your KYC record'}
                  className="text-[10px] sm:text-[11px] bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-semibold px-2.5 py-0.5 rounded-full shrink-0 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <ShieldCheck className="w-3 h-3 text-[#146B45]" />
                  <span>KYC Verified</span>
                </button>
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] sm:text-xs text-slate-500 mt-1 font-mono">
                <span>ID: {memberProfile.member_code}</span>
                <span aria-hidden="true">·</span>
                <span>Citizen: {memberProfile.citizenship_no}</span>
                <span aria-hidden="true" className="hidden sm:inline">·</span>
                <span className="hidden sm:inline">{memberProfile.address_ne}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 self-end md:self-auto shrink-0">
            <button
              onClick={() => {
                setIsLoggedIn(false);
                onLogout();
              }}
              className="min-h-[40px] px-3.5 py-2 border border-slate-300 hover:bg-slate-100 active:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{lang === 'ne' ? 'लगआउट (Logout)' : 'Logout'}</span>
            </button>
          </div>
        </div>

        {/* Member Portal Nav Tabs - Touch friendly horizontal scroll */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 mb-6 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {[
            { id: 'overview', label_ne: 'खाता सारांश', label_en: 'Overview' },
            { id: 'savings', label_ne: 'बचत खाताहरू', label_en: 'Savings' },
            { id: 'loan', label_ne: 'कर्जा विवरण', label_en: 'Loan & EMI' },
            { id: 'statements', label_ne: 'स्टेटमेन्ट', label_en: 'Statements' },
            { id: 'kyc', label_ne: 'केवाइसी (KYC) फारम', label_en: 'KYC Form' },
            { id: 'note_counter', label_ne: 'नोट काउन्टर (क्यास)', label_en: 'Note Counter' },
            { id: 'requests', label_ne: 'अनुरोध तथा सोधपुछ', label_en: 'Service Requests' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id as any)}
              className={`min-h-[40px] px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl whitespace-nowrap transition-colors flex items-center shrink-0 ${
                currentTab === tab.id
                  ? 'bg-[#146B45] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {lang === 'ne' ? tab.label_ne : tab.label_en}
            </button>
          ))}
        </div>

        {/* Tab 1: Overview Dashboard */}
        {currentTab === 'overview' && (
          <div className="space-y-8">
            {/* KPI Metric Strips */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Total Savings */}
              <div className="bg-white p-5 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-500 font-medium">
                    {lang === 'ne' ? 'कुल बचत मौज्दात' : 'Total Savings Balance'}
                  </span>
                  <Wallet className="w-4 h-4 text-[#146B45]" />
                </div>
                <div className="text-xl font-bold font-mono text-[#146B45] tabular-nums">
                  NPR {totalSavings.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  2 {lang === 'ne' ? 'खाताहरू सक्रिय' : 'Active Accounts'}
                </div>
              </div>

              {/* Active Loan */}
              <div className="bg-white p-5 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-500 font-medium">
                    {lang === 'ne' ? 'बाँकी कर्जा रकम' : 'Outstanding Loan Balance'}
                  </span>
                  <Coins className="w-4 h-4 text-[#17324D]" />
                </div>
                <div className="text-xl font-bold font-mono text-[#17324D] tabular-nums">
                  NPR {memberProfile.active_loan?.outstanding.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </div>
                <div className="text-[11px] text-amber-700 mt-1">
                  {lang === 'ne' ? `अर्को किस्ता: ${memberProfile.active_loan?.next_due_date}` : `Due: ${memberProfile.active_loan?.next_due_date}`}
                </div>
              </div>

              {/* Share Capital */}
              <div className="bg-white p-5 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-500 font-medium">
                    {lang === 'ne' ? 'सेयर पुँजी' : 'Member Share Capital'}
                  </span>
                  <Building2 className="w-4 h-4 text-[#D6A63C]" />
                </div>
                <div className="text-xl font-bold font-mono text-slate-800 tabular-nums">
                  NPR {memberProfile.share_amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  {memberProfile.share_count} {lang === 'ne' ? 'कित्ता सेयर' : 'Units'}
                </div>
              </div>

              {/* Membership Status */}
              <div className="bg-white p-5 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-500 font-medium">
                    {lang === 'ne' ? 'सदस्यता स्थिति' : 'Membership Status'}
                  </span>
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-lg font-bold text-slate-800">
                  {lang === 'ne' ? 'सक्रिय (Active)' : 'Active Good Standing'}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  {lang === 'ne' ? `सदस्यता: ${memberProfile.membership_date}` : `Member since ${memberProfile.membership_date}`}
                </div>
              </div>
            </div>

            {/* KYC Profile Verification Banner */}
            <div className="bg-linear-to-r from-[#17324D] to-[#1a446c] rounded-2xl p-4 sm:p-5 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
              <div className="flex items-start sm:items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-white/10 text-[#D6A63C] flex items-center justify-center shrink-0">
                  <FileBadge className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold">
                      {lang === 'ne' ? 'सदस्य व्यक्तिगत विवरण (KYC) स्थिति' : 'Member KYC Compliance & Records'}
                    </h4>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-semibold px-2 py-0.5 rounded-full border border-emerald-400/30">
                      Active Verified
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-0.5">
                    {lang === 'ne' 
                      ? 'नागरिकता, ठेगाना, परिवार तथा हकवाला विवरण अद्यावधिक गर्न यहाँ क्लिक गर्नुहोस्।' 
                      : 'Review citizenship, residential address, nominee and identification documents.'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setCurrentTab('kyc')}
                className="px-4 py-2 bg-[#D6A63C] hover:bg-[#c29532] text-slate-900 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 shrink-0"
              >
                <span>{lang === 'ne' ? 'KYC फारम खोल्नुहोस्' : 'Open KYC Portal'}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Recent Passbook Transactions */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-[#17324D]">
                  {lang === 'ne' ? 'पछिल्ला कारोबारहरू (Recent Passbook Transactions)' : 'Recent Passbook Transactions'}
                </h3>
                <button
                  onClick={() => setCurrentTab('statements')}
                  className="text-xs font-semibold text-[#146B45] hover:underline"
                >
                  {lang === 'ne' ? 'सबै स्टेटमेन्ट हेर्नुहोस्' : 'View Full Statement'}
                </button>
              </div>

              {/* Passbook Transactions: Mobile Cards (block md:hidden) vs Desktop Table (hidden md:block) */}
              <div>
                {/* Mobile View: Cards */}
                <div className="block md:hidden space-y-3">
                  {transactions.slice(0, 5).map((t) => (
                    <div key={t.id} className="bg-[#F5F7F6] border border-slate-200 rounded-xl p-3.5 space-y-2">
                      <div className="flex items-center justify-between pb-1.5 border-b border-slate-200/80 text-xs">
                        <div className="flex items-center gap-1.5 font-mono text-slate-500 text-[11px]">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{t.date}</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${
                          t.type === 'credit' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {t.type === 'credit' ? <ArrowDownLeft className="w-3 h-3" /> : <ArrowUpRight className="w-3 h-3" />}
                          <span>{t.type}</span>
                        </span>
                      </div>

                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-slate-800 leading-snug">
                            {lang === 'ne' ? t.narration_ne : t.narration_en}
                          </p>
                          <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono mt-0.5">
                            <span>ID: {t.id}</span>
                            <span>·</span>
                            <span>{t.method}</span>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <div className={`text-xs font-bold font-mono ${
                            t.type === 'credit' ? 'text-emerald-600' : 'text-red-600'
                          }`}>
                            {t.type === 'credit' ? '+' : '-'} NPR {t.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                          </div>
                          <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                            Bal: NPR {t.balance_after.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop View: Table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[#F5F7F6] text-slate-600 font-semibold border-b border-slate-200">
                      <tr>
                        <th className="py-2.5 px-3">Date</th>
                        <th className="py-2.5 px-3">Transaction ID</th>
                        <th className="py-2.5 px-3">Narration</th>
                        <th className="py-2.5 px-3">Method</th>
                        <th className="py-2.5 px-3 text-right">Credit / Debit</th>
                        <th className="py-2.5 px-3 text-right">Balance After</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-mono">
                      {transactions.slice(0, 5).map((t) => (
                        <tr key={t.id} className="hover:bg-slate-50">
                          <td className="py-3 px-3 text-slate-600">{t.date}</td>
                          <td className="py-3 px-3 font-semibold text-slate-700">{t.id}</td>
                          <td className="py-3 px-3 font-sans text-slate-800">
                            {lang === 'ne' ? t.narration_ne : t.narration_en}
                          </td>
                          <td className="py-3 px-3 text-slate-500 font-sans">{t.method}</td>
                          <td className={`py-3 px-3 text-right font-bold ${
                            t.type === 'credit' ? 'text-emerald-600' : 'text-red-600'
                          }`}>
                            {t.type === 'credit' ? '+' : '-'} NPR {t.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                          </td>
                          <td className="py-3 px-3 text-right font-semibold text-slate-800">
                            NPR {t.balance_after.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Savings Accounts Detail */}
        {currentTab === 'savings' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {memberProfile.savings_accounts.map((acc, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="text-[11px] font-mono text-slate-400 block">
                        Account No: {acc.account_number}
                      </span>
                      <h3 className="text-lg font-bold text-[#17324D] mt-0.5">
                        {lang === 'ne' ? acc.product_name_ne : acc.product_name_en}
                      </h3>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#146B45] bg-[#146B45]/10 px-2 py-1 rounded-md">
                      {acc.interest_rate}% p.a.
                    </span>
                  </div>

                  <div className="p-4 bg-[#F5F7F6] rounded-xl mb-4">
                    <span className="text-xs text-slate-500 block">Available Balance</span>
                    <span className="text-2xl font-bold font-mono text-[#146B45] tabular-nums">
                      NPR {acc.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                    <span>Interest Payout: Quarterly</span>
                    <button
                      onClick={() => setCurrentTab('statements')}
                      className="text-[#146B45] font-semibold hover:underline"
                    >
                      View Mini Statement →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Loan Schedule Detail */}
        {currentTab === 'loan' && memberProfile.active_loan && (
          <div className="space-y-6">
            {/* Loan Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                <div>
                  <span className="text-[11px] font-mono text-slate-400">
                    Loan No: {memberProfile.active_loan.loan_number}
                  </span>
                  <h3 className="text-xl font-bold text-[#17324D]">
                    {lang === 'ne' 
                      ? memberProfile.active_loan.product_name_ne 
                      : memberProfile.active_loan.product_name_en}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500 block">Monthly Installment (EMI)</span>
                  <span className="text-2xl font-bold font-mono text-[#D6A63C] tabular-nums">
                    NPR {memberProfile.active_loan.monthly_emi.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-5 text-xs">
                <div>
                  <span className="text-slate-400 block">Principal Disbursed:</span>
                  <span className="font-mono font-bold text-slate-800">
                    NPR {memberProfile.active_loan.principal.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">Remaining Balance:</span>
                  <span className="font-mono font-bold text-red-600">
                    NPR {memberProfile.active_loan.outstanding.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">Interest Rate:</span>
                  <span className="font-mono font-bold text-slate-800">
                    {memberProfile.active_loan.interest_rate}% p.a.
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">Next Due Date:</span>
                  <span className="font-mono font-bold text-amber-700">
                    {memberProfile.active_loan.next_due_date}
                  </span>
                </div>
              </div>

              {/* Repayment Schedule Table */}
              <div className="mt-4">
                <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-3">
                  {lang === 'ne' ? 'किस्ता भुक्तानी तालिका (Installment Schedule)' : 'Installment Schedule'}
                </h4>
                {/* Member Loan Schedule: Mobile Cards vs Desktop Table */}
                <div>
                  {/* Mobile Cards */}
                  <div className="block md:hidden space-y-3">
                    {memberProfile.active_loan.schedule.map((s, idx) => (
                      <div key={idx} className="bg-[#F5F7F6] border border-slate-200 rounded-xl p-3.5 space-y-2">
                        <div className="flex items-center justify-between pb-1.5 border-b border-slate-200/80 text-xs">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-md bg-[#17324D] text-white flex items-center justify-center text-[10px] font-bold font-mono">
                              #{s.month}
                            </span>
                            <span className="font-semibold text-slate-800">
                              {lang === 'ne' ? `किस्ता ${s.month}` : `Installment ${s.month}`}
                            </span>
                            <span className="text-[11px] text-slate-500 font-mono">({s.dueDate})</span>
                          </div>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-sans font-bold ${
                            s.status === 'paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {s.status === 'paid' ? 'PAID' : 'UPCOMING'}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                          <div className="bg-white p-2 rounded-lg border border-slate-100">
                            <span className="text-[10px] text-slate-500 font-sans block">{lang === 'ne' ? 'साँवा' : 'Principal'}</span>
                            <span className="font-bold text-slate-800">NPR {s.principal.toLocaleString()}</span>
                          </div>
                          <div className="bg-white p-2 rounded-lg border border-slate-100">
                            <span className="text-[10px] text-slate-500 font-sans block">{lang === 'ne' ? 'ब्याज' : 'Interest'}</span>
                            <span className="font-bold text-amber-700">NPR {s.interest.toLocaleString()}</span>
                          </div>
                          <div className="bg-white p-2 rounded-lg border border-slate-100">
                            <span className="text-[10px] text-slate-500 font-sans block">{lang === 'ne' ? 'कुल किस्ता' : 'Installment'}</span>
                            <span className="font-bold text-[#17324D]">NPR {s.installment.toLocaleString()}</span>
                          </div>
                          <div className="bg-white p-2 rounded-lg border border-slate-100">
                            <span className="text-[10px] text-slate-500 font-sans block">{lang === 'ne' ? 'बाँकी मौज्दात' : 'Remaining Bal.'}</span>
                            <span className="font-bold text-slate-700">NPR {s.remainingBalance.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Desktop Table */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-[#F5F7F6] text-slate-600 font-semibold border-b border-slate-200">
                        <tr>
                          <th className="py-2.5 px-3">Inst. #</th>
                          <th className="py-2.5 px-3">Due Date</th>
                          <th className="py-2.5 px-3 text-right">Principal</th>
                          <th className="py-2.5 px-3 text-right">Interest</th>
                          <th className="py-2.5 px-3 text-right">Total Installment</th>
                          <th className="py-2.5 px-3 text-right">Remaining Bal</th>
                          <th className="py-2.5 px-3 text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-mono">
                        {memberProfile.active_loan.schedule.map((s, idx) => (
                          <tr key={idx} className="hover:bg-slate-50">
                            <td className="py-3 px-3 font-semibold text-slate-700">{s.month}</td>
                            <td className="py-3 px-3 text-slate-600">{s.dueDate}</td>
                            <td className="py-3 px-3 text-right">NPR {s.principal.toLocaleString()}</td>
                            <td className="py-3 px-3 text-right text-slate-500">NPR {s.interest.toLocaleString()}</td>
                            <td className="py-3 px-3 text-right font-bold text-slate-800">NPR {s.installment.toLocaleString()}</td>
                            <td className="py-3 px-3 text-right text-slate-600">NPR {s.remainingBalance.toLocaleString()}</td>
                            <td className="py-3 px-3 text-center">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-sans font-bold ${
                                s.status === 'paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                              }`}>
                                {s.status === 'paid' ? 'PAID' : 'UPCOMING'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Account Statement Generator */}
        {currentTab === 'statements' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-[#17324D]">
                  {lang === 'ne' ? 'आधिकारिक खाता स्टेटमेन्ट' : 'Official Member Statement Generator'}
                </h3>
                <p className="text-xs text-slate-500">
                  {lang === 'ne'
                    ? 'कुनै पनि मिति अवधिको स्टेटमेन्ट हेर्नुहोस् तथा डाउनलोड गर्नुहोस्।'
                    : 'Filter and export your official verified transaction records.'}
                </p>
              </div>

              {/* Date Filter & Export - Responsive on mobile */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <input
                    type="date"
                    value={statementStart}
                    onChange={(e) => setStatementStart(e.target.value)}
                    className="flex-1 sm:flex-none px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg font-mono"
                  />
                  <span className="text-xs text-slate-400">to</span>
                  <input
                    type="date"
                    value={statementEnd}
                    onChange={(e) => setStatementEnd(e.target.value)}
                    className="flex-1 sm:flex-none px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg font-mono"
                  />
                </div>
                <button
                  onClick={() => alert('Exporting official PDF statement with digital cooperative stamp...')}
                  className="w-full sm:w-auto min-h-[38px] px-3.5 py-1.5 bg-[#146B45] hover:bg-[#105537] text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Statement (PDF)</span>
                </button>
              </div>
            </div>

            {/* Statement Printable Preview */}
            <div className="border border-slate-200 rounded-xl p-4 sm:p-5 bg-[#F5F7F6]">
              <div className="text-center pb-4 border-b border-slate-200">
                <h4 className="text-base font-bold text-[#17324D]">
                  Aadhunik Jana Saving & Credit Co-operative Ltd.
                </h4>
                <p className="text-xs text-slate-500">Nagarjun-4, Kathmandu · Member Account Statement</p>
                <div className="text-xs font-mono text-slate-600 mt-1 break-words">
                  Account: SB-01-002489 · Name: Ram Bahadur Shrestha · Period: {statementStart} to {statementEnd}
                </div>
              </div>

              {/* Dual Layout: Mobile Cards vs Desktop Table */}
              <div className="mt-4">
                {/* Mobile Cards */}
                <div className="block md:hidden space-y-2.5">
                  {transactions.map((t) => (
                    <div key={t.id} className="bg-white border border-slate-200 rounded-lg p-3 space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] pb-1 border-b border-slate-100 font-mono">
                        <span className="text-slate-500">{t.date}</span>
                        <span className="font-semibold text-slate-700">{t.id}</span>
                      </div>
                      <div className="text-xs text-slate-800 font-medium">
                        {t.narration_en}
                      </div>
                      <div className="flex items-center justify-between text-xs font-mono pt-1">
                        <div>
                          {t.type === 'debit' ? (
                            <span className="text-red-600 font-bold">Dr: NPR {t.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                          ) : (
                            <span className="text-emerald-600 font-bold">Cr: NPR {t.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                          )}
                        </div>
                        <div className="text-slate-700 font-semibold">
                          Bal: NPR {t.balance_after.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-xs text-left bg-white rounded-lg">
                    <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                      <tr>
                        <th className="py-2.5 px-3">Date</th>
                        <th className="py-2.5 px-3">Txn Code</th>
                        <th className="py-2.5 px-3">Description</th>
                        <th className="py-2.5 px-3 text-right">Debit (NPR)</th>
                        <th className="py-2.5 px-3 text-right">Credit (NPR)</th>
                        <th className="py-2.5 px-3 text-right">Balance (NPR)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-mono">
                      {transactions.map((t) => (
                        <tr key={t.id}>
                          <td className="py-2.5 px-3 text-slate-600">{t.date}</td>
                          <td className="py-2.5 px-3 text-slate-800">{t.id}</td>
                          <td className="py-2.5 px-3 font-sans text-slate-800">{t.narration_en}</td>
                          <td className="py-2.5 px-3 text-right text-red-600">
                            {t.type === 'debit' ? t.amount.toLocaleString(undefined, { minimumFractionDigits: 2 }) : '-'}
                          </td>
                          <td className="py-2.5 px-3 text-right text-emerald-600">
                            {t.type === 'credit' ? t.amount.toLocaleString(undefined, { minimumFractionDigits: 2 }) : '-'}
                          </td>
                          <td className="py-2.5 px-3 text-right font-bold text-slate-800">
                            {t.balance_after.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Member KYC Form */}
        {currentTab === 'kyc' && (
          <MemberKYCForm
            lang={lang}
            memberProfile={memberProfile}
            onSubmitKYC={(_kycData, summaryReq) => {
              onAddRequest(summaryReq);
            }}
            onNavigateTab={(tab) => setCurrentTab(tab as any)}
          />
        )}

        {/* Tab: Note Counter & Cash Voucher */}
        {currentTab === 'note_counter' && (
          <NoteCounter
            lang={lang}
            onNavigateToMemberPortal={() => setCurrentTab('overview')}
          />
        )}

        {/* Tab 5: Service Requests & Profile Update */}
        {currentTab === 'requests' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs max-w-2xl mx-auto">
            <h3 className="text-lg font-bold text-[#17324D] mb-1">
              {lang === 'ne' ? 'अनुरोध तथा सेवा सोधपुछ दर्ता' : 'Submit Service Request / Profile Update'}
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              {lang === 'ne'
                ? 'सुरक्षाका खातिर सदस्यको व्यक्तिगत वा वित्तीय विवरण परिवर्तन व्यवस्थापकको स्वीकृति पश्चात मात्र लागू हुन्छ।'
                : 'For financial security, member detail modifications require administrative verification before taking effect.'}
            </p>

            {requestSuccess && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  {lang === 'ne' 
                    ? 'तपाईंको अनुरोध व्यवस्थापन समक्ष दर्ता भयो। स्वीकृति पश्चात अपडेट हुनेछ।' 
                    : 'Your request has been submitted to cooperative management for review.'}
                </span>
              </div>
            )}

            <form onSubmit={handleRequestSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {lang === 'ne' ? 'अनुरोधको प्रकार (Request Type)' : 'Request Category'}
                </label>
                <select
                  value={requestType}
                  onChange={(e) => setRequestType(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#146B45] bg-white"
                >
                  <option value="profile_update">{lang === 'ne' ? 'ठेगाना / फोन परिवर्तन (Profile Update)' : 'Contact / Address Update'}</option>
                  <option value="kyc_update">{lang === 'ne' ? 'केवाइसी विवरण अद्यावधिक (KYC Update)' : 'KYC Verification & Records Update'}</option>
                  <option value="cheque_book">{lang === 'ne' ? 'नयाँ चेकबुक माग (Cheque Book Request)' : 'Cheque Book Requisition'}</option>
                  <option value="loan_inquiry">{lang === 'ne' ? 'कर्जा थप सोधपुछ (Loan Limit Inquiry)' : 'Loan Extension Inquiry'}</option>
                  <option value="statement">{lang === 'ne' ? 'प्रमाणित स्टेटमेन्ट कपी माग' : 'Certified Physical Statement'}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {lang === 'ne' ? 'विस्तृत विवरण (Details of Request) *' : 'Request Details / New Information *'}
                </label>
                <textarea
                  rows={4}
                  required
                  value={requestDetails}
                  onChange={(e) => setRequestDetails(e.target.value)}
                  placeholder={lang === 'ne' ? 'कृपया परिवर्तन गर्नुपर्ने फोन वा ठेगाना यहाँ खुलाउनुहोस्...' : 'State your updated address, contact phone or required service...'}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#146B45]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#146B45] hover:bg-[#105537] text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{lang === 'ne' ? 'अनुरोध दर्ता गर्नुहोस्' : 'Submit Request'}</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
