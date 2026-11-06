import React, { useState, useMemo } from 'react';
import { Language, ActiveView, LoanProduct } from '../types';
import { 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  ArrowRight, 
  Briefcase, 
  User, 
  DollarSign, 
  Scale, 
  Home, 
  Building2, 
  Coins, 
  Sparkles, 
  FileText, 
  Clock, 
  ChevronRight,
  TrendingUp,
  Percent
} from 'lucide-react';

interface LoanEligibilityProps {
  lang: Language;
  loanProducts?: LoanProduct[];
  onNavigate?: (view: ActiveView) => void;
  className?: string;
}

export const LoanEligibility: React.FC<LoanEligibilityProps> = ({
  lang,
  loanProducts,
  onNavigate,
  className = ''
}) => {
  // Assessment User Inputs
  const [age, setAge] = useState<number>(32);
  const [monthlyIncome, setMonthlyIncome] = useState<number>(65000);
  const [employmentStatus, setEmploymentStatus] = useState<'salaried' | 'business' | 'agriculture' | 'remittance' | 'professional'>('salaried');
  const [membershipStatus, setMembershipStatus] = useState<'existing_good' | 'new_member' | 'non_member'>('existing_good');
  const [existingEMI, setExistingEMI] = useState<number>(0);
  const [desiredAmount, setDesiredAmount] = useState<number>(800000);
  const [collateralType, setCollateralType] = useState<'property' | 'fixed_deposit' | 'gold_silver' | 'personal_guarantee'>('property');
  const [tenureYears, setTenureYears] = useState<number>(5);

  // Income quick presets
  const incomePresets = [
    { label: 'NPR 30K', value: 30000 },
    { label: 'NPR 50K', value: 50000 },
    { label: 'NPR 80K', value: 80000 },
    { label: 'NPR 1.5L', value: 150000 },
    { label: 'NPR 2.5L', value: 250000 },
  ];

  // Desired loan presets
  const loanPresets = [
    { label: 'NPR 2L', value: 200000 },
    { label: 'NPR 5L', value: 500000 },
    { label: 'NPR 10L', value: 1000000 },
    { label: 'NPR 20L', value: 2000000 },
    { label: 'NPR 35L', value: 3500000 },
  ];

  // Mathematical Calculation Engine
  const assessment = useMemo(() => {
    const tenureMonths = tenureYears * 12;
    const assumedAnnualRate = 12.5; // Benchmark diminishing rate in cooperative
    const monthlyRate = (assumedAnnualRate / 100) / 12;

    // Debt to Income Ratio (DTI) - Standard cooperative cap is 55%
    const maxAllowableTotalEMI = monthlyIncome * 0.55;
    const maxAvailableEMIForNewLoan = Math.max(0, maxAllowableTotalEMI - existingEMI);

    // Max Borrowing Capacity based on available EMI
    let maxBorrowingCapacity = 0;
    if (monthlyRate > 0 && maxAvailableEMIForNewLoan > 0) {
      maxBorrowingCapacity = maxAvailableEMIForNewLoan * ((Math.pow(1 + monthlyRate, tenureMonths) - 1) / (monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)));
    }

    // Apply collateral caps
    if (collateralType === 'personal_guarantee') {
      maxBorrowingCapacity = Math.min(maxBorrowingCapacity, 300000); // uncollateralized limit
    } else if (collateralType === 'gold_silver') {
      maxBorrowingCapacity = Math.min(maxBorrowingCapacity, 1500000);
    }

    maxBorrowingCapacity = Math.round(maxBorrowingCapacity / 10000) * 10000;

    // Estimated Monthly EMI for Desired Loan
    let estimatedDesiredEMI = 0;
    if (desiredAmount > 0 && monthlyRate > 0) {
      estimatedDesiredEMI = Math.round(
        (desiredAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
        (Math.pow(1 + monthlyRate, tenureMonths) - 1)
      );
    }

    // Projected DTI ratio with the new desired loan
    const projectedTotalEMI = existingEMI + estimatedDesiredEMI;
    const projectedDTI = Math.round((projectedTotalEMI / monthlyIncome) * 100);

    // Score & Status determination
    let status: 'high' | 'moderate' | 'needs_review' = 'high';
    let statusMessageNe = '';
    let statusMessageEn = '';

    if (age < 18 || age > 70) {
      status = 'needs_review';
      statusMessageNe = 'कर्जा प्राप्त गर्न उमेर सामान्यतया १८ देखि ६५ वर्ष हुनुपर्दछ। ६५ वर्ष माथि सह-ऋणी (Co-borrower) आवश्यक पर्दछ।';
      statusMessageEn = 'Applicant age should ideally be between 18 and 65 years. Above 65 requires an earning co-borrower.';
    } else if (projectedDTI > 60) {
      status = 'needs_review';
      statusMessageNe = `मासिक किस्ता र आम्दानीको अनुपात (${projectedDTI}%) उच्च छ। अधिकतम ५५% सम्म सिफारिस गरिन्छ। कर्जा रकम वा अवधि समायोजन गर्नुहोस्।`;
      statusMessageEn = `Projected Debt-to-Income (${projectedDTI}%) exceeds 55% ceiling. Consider increasing loan tenure or lowering requested amount.`;
    } else if (projectedDTI > 45 || membershipStatus === 'non_member' || collateralType === 'personal_guarantee') {
      status = 'moderate';
      statusMessageNe = `तपाईं सामान्य मापदण्ड अनुसार योग्य देखिनुहुन्छ। सदस्यता दर्ता र आम्दानी प्रमाणीकरण पश्चात कर्जा प्रक्रिया अघि बढ्नेछ।`;
      statusMessageEn = `You meet moderate criteria. Final approval requires regular membership and verifiable income documents.`;
    } else {
      status = 'high';
      statusMessageNe = `तपाईंको आम्दानी र दायित्व अनुपात (${projectedDTI}%) उत्कृष्ट छ। तपाईं संस्थाका विभिन्न कर्जा योजनाहरूका लागि पूर्ण योग्य देखिनुहुन्छ।`;
      statusMessageEn = `Your debt service ratio (${projectedDTI}%) is healthy and well within safe cooperative thresholds. High probability of approval.`;
    }

    // Product eligibility breakdown
    const products = [
      {
        id: 'business',
        name_ne: 'व्यावसायिक कर्जा (Business Loan)',
        name_en: 'Business & Trade Loan',
        rate: '12.50%',
        eligible: monthlyIncome >= 40000 && (employmentStatus === 'business' || employmentStatus === 'professional') && collateralType === 'property',
        limit: Math.min(maxBorrowingCapacity, 5000000),
        reason_ne: collateralType !== 'property' ? 'घर/जग्गा धितो सुरक्षण आवश्यक' : (monthlyIncome < 40000 ? 'मासिक आम्दानी कम्तीमा रु. ४०,००० आवश्यक' : 'योग्य'),
        reason_en: collateralType !== 'property' ? 'Requires immovable property mortgage' : (monthlyIncome < 40000 ? 'Minimum NPR 40K income required' : 'Fully Eligible')
      },
      {
        id: 'general',
        name_ne: 'साधारण कर्जा (General / Personal Loan)',
        name_en: 'General Personal Loan',
        rate: '13.00%',
        eligible: monthlyIncome >= 25000 && age <= 65,
        limit: Math.min(maxBorrowingCapacity, 2500000),
        reason_ne: monthlyIncome < 25000 ? 'मासिक आम्दानी रु. २५,००० आवश्यक' : 'योग्य',
        reason_en: monthlyIncome < 25000 ? 'Minimum NPR 25K income needed' : 'Fully Eligible'
      },
      {
        id: 'agriculture',
        name_ne: 'कृषि तथा पशुपालन कर्जा (Agro Loan)',
        name_en: 'Agriculture & Livestock Loan',
        rate: '11.50%',
        eligible: employmentStatus === 'agriculture' || collateralType === 'property',
        limit: Math.min(maxBorrowingCapacity, 3000000),
        reason_ne: 'सहुलियत ब्याजदर तथा कृषि परियोजनामा आधारित',
        reason_en: 'Concessional rate for agro-enterprises and farming'
      },
      {
        id: 'education',
        name_ne: 'शैक्षिक कर्जा (Education Loan)',
        name_en: 'Higher Education Loan',
        rate: '11.00%',
        eligible: monthlyIncome >= 30000 && (collateralType === 'property' || collateralType === 'fixed_deposit'),
        limit: Math.min(maxBorrowingCapacity, 2000000),
        reason_ne: collateralType === 'personal_guarantee' ? 'घरजग्गा वा मुद्दती रसिद धितो आवश्यक' : 'योग्य',
        reason_en: collateralType === 'personal_guarantee' ? 'Requires property or FD collateral' : 'Fully Eligible'
      },
      {
        id: 'emergency',
        name_ne: 'आकस्मिक कर्जा (Emergency Express Loan)',
        name_en: 'Emergency Instant Loan',
        rate: '14.00%',
        eligible: membershipStatus === 'existing_good' && desiredAmount <= 300000,
        limit: 300000,
        reason_ne: membershipStatus !== 'existing_good' ? 'कम्तीमा ३ महिनाको सक्रिय सदस्य आवश्यक' : '२४-४८ घण्टाभित्रै भुक्तानी',
        reason_en: membershipStatus !== 'existing_good' ? 'Requires active membership for > 3 months' : 'Disbursed in 24-48 hours'
      },
      {
        id: 'fd_loan',
        name_ne: 'मुद्दती बचत धितो कर्जा (Loan Against FD)',
        name_en: 'Loan Against Fixed Deposit',
        rate: 'FD Rate + 2.0%',
        eligible: collateralType === 'fixed_deposit',
        limit: Math.round(desiredAmount * 0.9),
        reason_ne: collateralType !== 'fixed_deposit' ? 'मुद्दती बचत रसिद भएको अवस्थामा ९०% सम्म तुरुन्त उपलब्ध' : '१००% स्वतः स्वीकृत (बिना आम्दानी कागजात)',
        reason_en: collateralType !== 'fixed_deposit' ? 'Select Fixed Deposit collateral to unlock instant 90% loan' : '100% Instant Approval with zero income proof'
      }
    ];

    return {
      maxAllowableTotalEMI: Math.round(maxAllowableTotalEMI),
      maxAvailableEMIForNewLoan: Math.round(maxAvailableEMIForNewLoan),
      maxBorrowingCapacity,
      estimatedDesiredEMI,
      projectedDTI,
      status,
      statusMessageNe,
      statusMessageEn,
      products
    };
  }, [age, monthlyIncome, employmentStatus, membershipStatus, existingEMI, desiredAmount, collateralType, tenureYears]);

  return (
    <div className={`bg-white rounded-2xl p-5 sm:p-8 border border-slate-200 shadow-sm ${className}`}>
      {/* Badge & Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#146B45] uppercase tracking-wider mb-1">
            <Scale className="w-4 h-4 text-[#D6A63C]" />
            <span>{lang === 'ne' ? 'कर्जा योग्यता प्रारम्भिक मूल्यांकन' : 'Preliminary Loan Eligibility Checker'}</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-[#17324D]">
            {lang === 'ne' 
              ? 'आफ्नो आम्दानी तथा क्षमता अनुसार कर्जा योग्यता जाँच्नुहोस्' 
              : 'Assess Your Loan Eligibility & Borrowing Capacity'}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {lang === 'ne'
              ? 'उमेर, आम्दानी, पेशा र धितो विवरण प्रविष्ट गरी कुन-कुन कर्जाका लागि योग्य हुनुहुन्छ र कतिसम्म कर्जा पाउन सक्नुहुन्छ तुरुन्त थाहा पाउनुहोस्।'
              : 'Enter basic income and collateral details to see your maximum borrowing limit and matching loan products.'}
          </p>
        </div>

        <div className="shrink-0 bg-[#F5F7F6] px-3.5 py-1.5 rounded-xl border border-slate-200 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#146B45]" />
          <span className="text-[11px] font-semibold text-slate-700">
            {lang === 'ne' ? 'गोप्य एवं सुरक्षित जाँच' : '100% Confidential'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Inputs (Left Column - 7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* 1. Monthly Net Income */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1.5">
              <span>{lang === 'ne' ? 'मासिक खुद आम्दानी (Monthly Net Income)' : 'Monthly Net Income (NPR)'}</span>
              <span className="font-mono font-bold text-sm text-[#146B45]">
                NPR {monthlyIncome.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min="15000"
              max="500000"
              step="5000"
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(Number(e.target.value))}
              className="w-full accent-[#146B45] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-0.5">
              <span>NPR 15,000</span>
              <span>NPR 250,000</span>
              <span>NPR 500,000</span>
            </div>

            {/* Quick Income Buttons */}
            <div className="flex flex-wrap items-center gap-1.5 mt-2">
              <span className="text-[11px] text-slate-400 mr-1">
                {lang === 'ne' ? 'द्रुत छनोट:' : 'Quick Select:'}
              </span>
              {incomePresets.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => setMonthlyIncome(p.value)}
                  className={`px-2.5 py-1 text-xs rounded-md transition-colors ${
                    monthlyIncome === p.value
                      ? 'bg-[#146B45] text-white font-semibold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Age & Employment Status Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Age */}
            <div>
              <div className="flex justify-between items-center text-xs font-semibold text-slate-700 mb-1">
                <span>{lang === 'ne' ? 'आवेदकको उमेर (Age in Years)' : 'Applicant Age (Years)'}</span>
                <span className="font-mono font-bold text-[#17324D]">{age} {lang === 'ne' ? 'वर्ष' : 'yrs'}</span>
              </div>
              <input
                type="number"
                min="18"
                max="75"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#146B45] font-mono"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                {lang === 'ne' ? 'मानक कर्जा उमेर: १८ देखि ६५ वर्ष' : 'Standard eligible age: 18 - 65 yrs'}
              </span>
            </div>

            {/* Employment Status */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {lang === 'ne' ? 'पेशा / रोजगारीको स्थिति' : 'Employment / Profession'}
              </label>
              <select
                value={employmentStatus}
                onChange={(e) => setEmploymentStatus(e.target.value as any)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#146B45] bg-white"
              >
                <option value="salaried">{lang === 'ne' ? 'जागिरे / कर्मचारी (Salaried)' : 'Salaried Employee'}</option>
                <option value="business">{lang === 'ne' ? 'व्यापार / व्यवसाय (Business Owner)' : 'Business / Trade Owner'}</option>
                <option value="professional">{lang === 'ne' ? 'स्वतन्त्र पेशाकर्मी (Doctor / CA / Lawyer)' : 'Independent Professional'}</option>
                <option value="agriculture">{lang === 'ne' ? 'कृषि / पशुपालन (Agriculture)' : 'Farming / Agriculture'}</option>
                <option value="remittance">{lang === 'ne' ? 'वैदेशिक रोजगार रेमिट्यान्स (Remittance)' : 'Foreign Remittance Household'}</option>
              </select>
            </div>
          </div>

          {/* 3. Desired Loan Amount & Tenure */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between items-center text-xs font-semibold text-slate-700 mb-1">
                <span>{lang === 'ne' ? 'माग गरिएको कर्जा (Desired Loan)' : 'Desired Loan Amount (NPR)'}</span>
                <span className="font-mono font-bold text-[#17324D] text-xs">
                  NPR {desiredAmount.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="50000"
                max="5000000"
                step="25000"
                value={desiredAmount}
                onChange={(e) => setDesiredAmount(Number(e.target.value))}
                className="w-full accent-[#17324D] cursor-pointer"
              />
              <div className="flex flex-wrap gap-1 mt-1.5">
                {loanPresets.map((p) => (
                  <button
                    key={p.value}
                    type="button"
                    onClick={() => setDesiredAmount(p.value)}
                    className={`px-2 py-0.5 text-[10px] rounded-md transition-colors ${
                      desiredAmount === p.value
                        ? 'bg-[#17324D] text-white font-semibold'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {lang === 'ne' ? 'प्रस्तावित कर्जा अवधि (Tenure)' : 'Repayment Period (Years)'}
              </label>
              <select
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#146B45] bg-white font-mono"
              >
                <option value={1}>1 {lang === 'ne' ? 'वर्ष (12 महिना)' : 'Year (12 Months)'}</option>
                <option value={2}>2 {lang === 'ne' ? 'वर्ष (24 महिना)' : 'Years (24 Months)'}</option>
                <option value={3}>3 {lang === 'ne' ? 'वर्ष (36 महिना)' : 'Years (36 Months)'}</option>
                <option value={5}>5 {lang === 'ne' ? 'वर्ष (60 महिना - मानक)' : 'Years (60 Months - Standard)'}</option>
                <option value={7}>7 {lang === 'ne' ? 'वर्ष (84 महिना)' : 'Years (84 Months)'}</option>
                <option value={10}>10 {lang === 'ne' ? 'वर्ष (120 महिना)' : 'Years (120 Months)'}</option>
              </select>
              <span className="text-[10px] text-slate-400 mt-1 block">
                {lang === 'ne' ? `कुल ${tenureYears * 12} महिनाको किस्ता गणना` : `Total ${tenureYears * 12} installments`}
              </span>
            </div>
          </div>

          {/* 4. Collateral & Existing Obligations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {lang === 'ne' ? 'उपलब्ध धितो सुरक्षण (Collateral)' : 'Collateral Available'}
              </label>
              <select
                value={collateralType}
                onChange={(e) => setCollateralType(e.target.value as any)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#146B45] bg-white"
              >
                <option value="property">{lang === 'ne' ? 'घर / जग्गा धितो (Land & Property Lalpurja)' : 'Land / Residential Real Estate'}</option>
                <option value="fixed_deposit">{lang === 'ne' ? 'मुद्दती बचत रसिद (Cooperative Fixed Deposit)' : 'Cooperative Fixed Deposit Certificate'}</option>
                <option value="gold_silver">{lang === 'ne' ? 'सुन / चाँदी धितो (Gold & Silver Ornaments)' : 'Gold / Silver Bullion'}</option>
                <option value="personal_guarantee">{lang === 'ne' ? 'व्यक्तिगत / सामूहिक जमानी (Guarantor Only)' : 'Personal / Member Guarantee'}</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between items-center text-xs font-semibold text-slate-700 mb-1">
                <span>{lang === 'ne' ? 'अन्य ऋणको मासिक किस्ता (Existing EMIs)' : 'Existing Monthly Loan EMIs'}</span>
                <span className="font-mono text-slate-600">NPR {existingEMI.toLocaleString()}</span>
              </div>
              <input
                type="number"
                min="0"
                max="200000"
                step="1000"
                value={existingEMI}
                onChange={(e) => setExistingEMI(Number(e.target.value))}
                placeholder="0"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#146B45] font-mono"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                {lang === 'ne' ? 'अन्य बैंक वा सहकारीमा तिर्दै गरेको मासिक किस्ता' : 'Current active debt obligations'}
              </span>
            </div>
          </div>

          {/* 5. Membership Status */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              {lang === 'ne' ? 'सहकारी संस्थाको सदस्यता स्थिति' : 'Cooperative Membership Standing'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { id: 'existing_good', label_ne: 'सक्रिय सदस्य (>३ महिना)', label_en: 'Active Member (>3 mo)' },
                { id: 'new_member', label_ne: 'नयाँ सदस्य (<३ महिना)', label_en: 'New Member (<3 mo)' },
                { id: 'non_member', label_ne: 'सदस्यता लिन बाँकी', label_en: 'Not Yet a Member' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setMembershipStatus(opt.id as any)}
                  className={`min-h-[38px] p-2 text-xs rounded-lg border text-center transition-all ${
                    membershipStatus === opt.id
                      ? 'border-[#146B45] bg-[#146B45]/10 text-[#146B45] font-bold shadow-2xs'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {lang === 'ne' ? opt.label_ne : opt.label_en}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Real-time Assessment Card (Right Column - 5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#17324D] text-white rounded-2xl p-5 sm:p-6 border border-[#D6A63C]/30 shadow-md">
            {/* Status Header Badge */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#D6A63C]">
                {lang === 'ne' ? 'प्रारम्भिक मूल्यांकन नतिजा' : 'Eligibility Evaluation'}
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1 ${
                assessment.status === 'high' 
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                  : assessment.status === 'moderate'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-red-500/20 text-red-300 border border-red-500/40'
              }`}>
                {assessment.status === 'high' ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                ) : (
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-300" />
                )}
                <span>
                  {assessment.status === 'high'
                    ? (lang === 'ne' ? 'उच्च सम्भावना (Eligible)' : 'Highly Eligible')
                    : assessment.status === 'moderate'
                    ? (lang === 'ne' ? 'सामान्य योग्य (Moderate)' : 'Conditionally Eligible')
                    : (lang === 'ne' ? 'थप परामर्श आवश्यक' : 'Review Needed')}
                </span>
              </span>
            </div>

            {/* Max Borrowing Capacity Headline */}
            <div className="mb-4 pb-4 border-b border-white/10">
              <span className="text-xs text-slate-300 block">
                {lang === 'ne' ? 'अधिकतम अनुमानित कर्जा सीमा (Max Capacity):' : 'Estimated Borrowing Limit:'}
              </span>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-[#D6A63C] tabular-nums mt-0.5 break-words">
                NPR {assessment.maxBorrowingCapacity.toLocaleString()}
              </div>
              <span className="text-[11px] text-slate-300 block mt-1">
                {lang === 'ne' 
                  ? `मासिक किस्ता भुक्तानी क्षमता: NPR ${assessment.maxAvailableEMIForNewLoan.toLocaleString()} सम्म` 
                  : `Monthly EMI repayment headroom: NPR ${assessment.maxAvailableEMIForNewLoan.toLocaleString()}`}
              </span>
            </div>

            {/* Metric Key Factors */}
            <div className="space-y-2.5 text-xs pb-4 border-b border-white/10 font-mono">
              <div className="flex justify-between items-center">
                <span className="text-slate-300 font-sans">{lang === 'ne' ? 'माग गरिएको रकम' : 'Requested Loan'}:</span>
                <span className="font-bold text-white">NPR {desiredAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-300 font-sans">{lang === 'ne' ? 'अनुमानित मासिक किस्ता (EMI)' : 'Estimated Monthly EMI'}:</span>
                <span className="font-bold text-amber-300">NPR {assessment.estimatedDesiredEMI.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-300 font-sans">{lang === 'ne' ? 'ऋण-आम्दानी अनुपात (DTI)' : 'Debt-to-Income (DTI)'}:</span>
                <span className={`font-bold ${assessment.projectedDTI <= 50 ? 'text-emerald-400' : 'text-amber-300'}`}>
                  {assessment.projectedDTI}% {assessment.projectedDTI <= 50 ? '✓ (Safe)' : '⚠ (High)'}
                </span>
              </div>
            </div>

            {/* Assessment Note */}
            <div className="mt-3.5 p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-200 leading-relaxed font-sans">
              <p>
                {lang === 'ne' ? assessment.statusMessageNe : assessment.statusMessageEn}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 mt-5">
              <button
                type="button"
                onClick={() => onNavigate && onNavigate('contact')}
                className="w-full py-2.5 bg-[#146B45] hover:bg-[#105537] active:bg-[#0c452c] text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 shadow-sm transition-colors min-h-[42px]"
              >
                <span>{lang === 'ne' ? 'कर्जा परामर्श तथा आवेदन प्रक्रिया' : 'Proceed to Loan Consultation'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate && onNavigate('downloads')}
                className="w-full py-2 bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 border border-white/15 transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>{lang === 'ne' ? 'कर्जा आवेदन फारम डाउनलोड (PDF)' : 'Download Loan Application Form'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Matching Grid Breakdown */}
      <div className="mt-8 pt-6 border-t border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h4 className="text-sm sm:text-base font-bold text-[#17324D]">
              {lang === 'ne' ? 'संस्थाका कर्जा योजनाहरूसँग योग्यता तुलना' : 'Product-by-Product Loan Match & Limits'}
            </h4>
            <p className="text-xs text-slate-500">
              {lang === 'ne' 
                ? 'तपाईंको प्रोफाइलका आधारमा कुन कर्जा उत्पादनमा कति रकमसम्म स्वीकृत हुन सक्छ:' 
                : 'Eligibility breakdown and maximum limits based on your profile inputs:'}
            </p>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            {lang === 'ne' ? '* अन्तिम स्वीकृति धितो मूल्याङ्कनमा निर्भर रहनेछ।' : '* Subject to formal documentation & valuation.'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {assessment.products.map((prod) => (
            <div
              key={prod.id}
              className={`p-4 rounded-xl border transition-all ${
                prod.eligible 
                  ? 'bg-[#F5F7F6] border-emerald-200/80 hover:bg-white' 
                  : 'bg-slate-50/60 border-slate-200 opacity-90'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <span className="text-xs font-bold text-[#17324D]">
                  {lang === 'ne' ? prod.name_ne : prod.name_en}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                  prod.eligible ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                }`}>
                  {prod.eligible 
                    ? (lang === 'ne' ? 'योग्य' : 'Matched') 
                    : (lang === 'ne' ? 'शर्त आवश्यक' : 'Conditional')}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs py-1.5 border-y border-slate-200/60 font-mono">
                <span className="text-[11px] text-slate-500 font-sans">{lang === 'ne' ? 'ब्याजदर' : 'Rate'}: <strong>{prod.rate}</strong></span>
                <span className="font-bold text-[#146B45]">
                  NPR {prod.limit.toLocaleString()}
                </span>
              </div>

              <div className="text-[11px] text-slate-500 mt-2 flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${prod.eligible ? 'bg-emerald-600' : 'bg-amber-600'}`} />
                <span className="truncate">{lang === 'ne' ? prod.reason_ne : prod.reason_en}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
