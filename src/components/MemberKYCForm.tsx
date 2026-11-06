import React, { useState } from 'react';
import { 
  Language, 
  MemberProfile, 
  MemberKYCData, 
  MemberRequest 
} from '../types';
import { 
  ShieldCheck, 
  CheckCircle, 
  AlertCircle, 
  User, 
  FileText, 
  MapPin, 
  Home, 
  Briefcase, 
  Upload, 
  Check, 
  Printer, 
  ArrowRight, 
  Clock, 
  Info, 
  ChevronRight,
  FileCheck,
  RefreshCw,
  Eye,
  Trash2
} from 'lucide-react';

interface MemberKYCFormProps {
  lang: Language;
  memberProfile: MemberProfile;
  onSubmitKYC: (kycData: MemberKYCData, requestSummary: Omit<MemberRequest, 'id' | 'created_at' | 'status'>) => void;
  onNavigateTab?: (tab: string) => void;
}

export const MemberKYCForm: React.FC<MemberKYCFormProps> = ({
  lang,
  memberProfile,
  onSubmitKYC,
  onNavigateTab
}) => {
  // Prepopulate form data with existing member profile
  const [formData, setFormData] = useState<MemberKYCData>({
    full_name_en: memberProfile.full_name_en || 'Ram Bahadur Shrestha',
    full_name_ne: memberProfile.full_name_ne || 'रामबहादुर श्रेष्ठ',
    date_of_birth_bs: '२०४५-०४-१२',
    date_of_birth_ad: '1988-07-27',
    gender: 'male',
    marital_status: 'married',
    citizenship_no: memberProfile.citizenship_no || '27-01-72-04512',
    citizenship_issued_district: 'काठमाडौं (Kathmandu)',
    citizenship_issued_date_bs: '२०६३-०१-१८',
    father_name: memberProfile.father_name_en || 'Hari Prasad Shrestha',
    mother_name: 'Maya Devi Shrestha',
    grandfather_name: 'Bhakta Bahadur Shrestha',
    spouse_name: 'Sita Shrestha',
    permanent_province: 'बागमती प्रदेश (Bagmati Province)',
    permanent_district: 'काठमाडौं (Kathmandu)',
    permanent_municipality: 'नागार्जुन नगरपालिका (Nagarjun Municipality)',
    permanent_ward: '०४',
    permanent_tole: 'सितापाईला (Sitapaila)',
    current_same_as_permanent: true,
    current_province: 'बागमती प्रदेश (Bagmati Province)',
    current_district: 'काठमाडौं (Kathmandu)',
    current_municipality: 'नागार्जुन नगरपालिका (Nagarjun Municipality)',
    current_ward: '०४',
    current_tole: 'सितापाईला (Sitapaila)',
    phone: memberProfile.phone || '9841234567',
    email: memberProfile.email || 'ram.shrestha@example.com',
    occupation: 'व्यापार / व्यवसाय (Business / Trading)',
    annual_income_range: 'रु ५ लाख देखि रु १० लाख सम्म (NPR 500,000 - 1,000,000)',
    pan_number: '109845621',
    nominee_name: 'Sita Shrestha',
    nominee_relation: 'पत्नी (Wife)',
    nominee_citizenship_no: '27-01-75-08921',
    documents: {
      citizenship_front: 'citizenship_front_scan.pdf',
      citizenship_back: 'citizenship_back_scan.pdf',
      passport_photo: 'passport_photo_ram.jpg',
      utility_bill: 'electricity_bill_sitapaila.pdf'
    }
  });

  const [activeStep, setActiveStep] = useState<number>(1);
  const [agreementChecked, setAgreementChecked] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState<boolean>(false);
  const [printPreviewMode, setPrintPreviewMode] = useState<boolean>(false);

  // Field change handler
  const handleInputChange = (field: keyof MemberKYCData, value: any) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === 'current_same_as_permanent' && value === true) {
        updated.current_province = updated.permanent_province;
        updated.current_district = updated.permanent_district;
        updated.current_municipality = updated.permanent_municipality;
        updated.current_ward = updated.permanent_ward;
        updated.current_tole = updated.permanent_tole;
      }
      return updated;
    });
  };

  // Mock file upload handler
  const handleFileUpload = (docKey: keyof MemberKYCData['documents'], fileName: string) => {
    setFormData((prev) => ({
      ...prev,
      documents: {
        ...prev.documents,
        [docKey]: fileName
      }
    }));
  };

  const handleRemoveDoc = (docKey: keyof MemberKYCData['documents']) => {
    setFormData((prev) => ({
      ...prev,
      documents: {
        ...prev.documents,
        [docKey]: undefined
      }
    }));
  };

  // Progress calculation
  const totalWeight = 10;
  let completedCount = 0;
  if (formData.full_name_ne && formData.full_name_en) completedCount += 2;
  if (formData.citizenship_no && formData.citizenship_issued_district) completedCount += 2;
  if (formData.date_of_birth_bs) completedCount += 1;
  if (formData.permanent_municipality && formData.permanent_ward) completedCount += 2;
  if (formData.father_name && formData.mother_name) completedCount += 1;
  if (formData.occupation) completedCount += 1;
  if (formData.documents.citizenship_front && formData.documents.passport_photo) completedCount += 1;
  const progressPercent = Math.min(100, Math.round((completedCount / totalWeight) * 100));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreementChecked) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmittedSuccess(true);

      const summaryDetails = `[KYC UPDATE] Submitted by ${formData.full_name_en} (${memberProfile.member_code}). Citizen No: ${formData.citizenship_no}, Dist: ${formData.citizenship_issued_district}. Perm Addr: ${formData.permanent_municipality}-${formData.permanent_ward}, ${formData.permanent_district}. Phone: ${formData.phone}. Nominee: ${formData.nominee_name} (${formData.nominee_relation}).`;

      onSubmitKYC(formData, {
        member_code: memberProfile.member_code,
        member_name: lang === 'ne' ? formData.full_name_ne : formData.full_name_en,
        type: 'kyc_update',
        details: summaryDetails
      });
    }, 800);
  };

  const steps = [
    { id: 1, title_ne: '१. व्यक्तिगत विवरण', title_en: '1. Personal Info', icon: User },
    { id: 2, title_ne: '२. नागरिकता र ठेगाना', title_en: '2. Citizenship & Address', icon: MapPin },
    { id: 3, title_ne: '३. परिवार तथा हकवाला', title_en: '3. Family & Nominee', icon: Home },
    { id: 4, title_ne: '४. पेशा तथा कागजात', title_en: '4. Occupation & Docs', icon: FileCheck }
  ];

  if (printPreviewMode) {
    return (
      <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-300 shadow-lg space-y-6 max-w-4xl mx-auto print:border-none print:shadow-none">
        {/* Printable Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200 print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-md">
              {lang === 'ne' ? 'प्रिन्ट तथा अभिलेख प्रारूप' : 'Printable Verification Summary'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-[#146B45] text-white text-xs font-semibold rounded-lg hover:bg-[#105537] flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{lang === 'ne' ? 'प्रिन्ट गर्नुहोस् (Print)' : 'Print Form'}</span>
            </button>
            <button
              onClick={() => setPrintPreviewMode(false)}
              className="px-4 py-2 border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
            >
              {lang === 'ne' ? 'फारममा फर्कनुहोस्' : 'Back to Form'}
            </button>
          </div>
        </div>

        {/* Printable Official Header */}
        <div className="text-center border-b-2 border-[#146B45] pb-4">
          <div className="flex justify-center mb-2">
            <img 
              src="/assets/aistudio/logo_aj-removebg-preview_9a0d83cb.png" 
              alt="Cooperative Logo" 
              className="h-14 sm:h-16 w-auto object-contain"
            />
          </div>
          <h2 className="text-xl font-bold text-[#17324D]">
            आधुनिक जन बचत तथा ऋण सहकारी संस्था लि.
          </h2>
          <p className="text-xs text-slate-600">
            Aadhunik Jana Saving & Credit Co-operative Ltd. · Nagarjun-4, Kathmandu · Ph: 01-4880000
          </p>
          <div className="inline-block mt-2 px-3 py-1 bg-slate-100 border border-slate-300 rounded-md text-xs font-bold text-slate-800 uppercase tracking-wider">
            {lang === 'ne' ? 'ग्राहक पहिचान फारम (KYC - Member Information Form)' : 'Member KYC Verification Form'}
          </div>
        </div>

        {/* Summary Content Sheet */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="font-semibold text-slate-700 block mb-1">
              {lang === 'ne' ? 'सदस्य परिचय' : 'Member Identity'}:
            </span>
            <p><strong>Member ID:</strong> {memberProfile.member_code}</p>
            <p><strong>Full Name (NE):</strong> {formData.full_name_ne}</p>
            <p><strong>Full Name (EN):</strong> {formData.full_name_en}</p>
            <p><strong>DOB:</strong> {formData.date_of_birth_bs} BS ({formData.date_of_birth_ad} AD)</p>
            <p><strong>Gender / Status:</strong> {formData.gender.toUpperCase()} / {formData.marital_status.toUpperCase()}</p>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="font-semibold text-slate-700 block mb-1">
              {lang === 'ne' ? 'नागरिकता तथा सम्पर्क' : 'Citizenship & Contact'}:
            </span>
            <p><strong>Citizenship No:</strong> {formData.citizenship_no}</p>
            <p><strong>Issued District / Date:</strong> {formData.citizenship_issued_district} · {formData.citizenship_issued_date_bs}</p>
            <p><strong>Phone:</strong> {formData.phone}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>PAN No:</strong> {formData.pan_number || 'N/A'}</p>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="font-semibold text-slate-700 block mb-1">
              {lang === 'ne' ? 'ठेगाना विवरण' : 'Address Details'}:
            </span>
            <p><strong>Permanent:</strong> {formData.permanent_tole}, Ward {formData.permanent_ward}, {formData.permanent_municipality}, {formData.permanent_district}</p>
            <p><strong>Current:</strong> {formData.current_same_as_permanent ? 'Same as Permanent' : `${formData.current_tole}, Ward ${formData.current_ward}, ${formData.current_municipality}, ${formData.current_district}`}</p>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="font-semibold text-slate-700 block mb-1">
              {lang === 'ne' ? 'परिवार तथा हकवाला' : 'Family & Nominee'}:
            </span>
            <p><strong>Father:</strong> {formData.father_name}</p>
            <p><strong>Mother:</strong> {formData.mother_name}</p>
            <p><strong>Grandfather:</strong> {formData.grandfather_name}</p>
            <p><strong>Nominee:</strong> {formData.nominee_name} ({formData.nominee_relation}) - ID: {formData.nominee_citizenship_no}</p>
          </div>
        </div>

        {/* Verification & Signature Box */}
        <div className="pt-8 border-t border-slate-200 grid grid-cols-2 gap-8 text-xs text-center text-slate-600">
          <div>
            <div className="h-16 border-b border-dashed border-slate-400 mb-1 flex items-end justify-center font-script text-slate-800">
              {formData.full_name_en}
            </div>
            <p className="font-semibold text-slate-800">{lang === 'ne' ? 'सदस्यको दस्तखत' : 'Member Signature'}</p>
            <p className="text-[10px] text-slate-400">Date: {new Date().toISOString().split('T')[0]}</p>
          </div>
          <div>
            <div className="h-16 border-b border-dashed border-slate-400 mb-1 flex items-end justify-center text-[11px] text-emerald-800 font-bold">
              [ VERIFIED OFFICIAL STAMP ]
            </div>
            <p className="font-semibold text-slate-800">{lang === 'ne' ? 'सहकारी अधिकृत प्रमाणीकरण' : 'Authorized Officer'}</p>
            <p className="text-[10px] text-slate-400">Aadhunik Jana Saving & Credit</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Banner Card */}
      <div className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-[#146B45]/10 text-[#146B45] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-base sm:text-xl font-bold text-[#17324D]">
                  {lang === 'ne' 
                    ? 'सदस्य व्यक्तिगत विवरण (KYC) अद्यावधिक' 
                    : 'Member KYC (Know Your Customer) Portal'}
                </h2>
                <span className={`text-[10px] sm:text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                  isSubmittedSuccess
                    ? 'bg-amber-100 text-amber-800 border border-amber-300'
                    : memberProfile.kyc_status === 'verified'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    : 'bg-amber-100 text-amber-800 border border-amber-200'
                }`}>
                  <CheckCircle className="w-3 h-3" />
                  <span>
                    {isSubmittedSuccess
                      ? (lang === 'ne' ? 'प्रमाणीकरण विचाराधीन (Pending Approval)' : 'Update Pending Verification')
                      : memberProfile.kyc_status === 'verified'
                      ? (lang === 'ne' ? 'प्रमाणित (Verified KYC)' : 'KYC Verified')
                      : (lang === 'ne' ? 'अद्यावधिक आवश्यक (Update Required)' : 'Update Required')}
                  </span>
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {lang === 'ne'
                  ? 'सहकारी ऐन २०७४ तथा सम्पत्ति शुद्धीकरण (निवारण) ऐनको निर्देशन अनुसार आफ्नो विवरण समयमै अद्यावधिक राख्नुहोस्।'
                  : 'Maintain updated identification and beneficiary records in compliance with the Nepal Cooperative Act.'}
              </p>
            </div>
          </div>

          {/* Quick Action buttons */}
          <div className="flex items-center gap-2 self-start lg:self-center shrink-0">
            <button
              type="button"
              onClick={() => setPrintPreviewMode(true)}
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span>{lang === 'ne' ? 'प्रारूप हेर्नुहोस्' : 'Print Preview'}</span>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-5 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
            <span className="text-slate-600">
              {lang === 'ne' ? 'फारम पूर्णता स्तर (Completeness):' : 'KYC Profile Completeness:'}
            </span>
            <span className="font-mono font-bold text-[#146B45]">{progressPercent}%</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-linear-to-r from-[#146B45] to-[#D6A63C] rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Success Alert Banner when submitted */}
      {isSubmittedSuccess && (
        <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs sm:text-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-200/80 text-emerald-800 flex items-center justify-center shrink-0">
              <Check className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <p className="font-bold text-emerald-900">
                {lang === 'ne'
                  ? 'तपाईंको KYC विवरण सफलतापूर्वक दर्ता भयो!'
                  : 'KYC Update Request Registered Successfully!'}
              </p>
              <p className="text-xs text-emerald-700 mt-0.5">
                {lang === 'ne'
                  ? 'प्रशासनिक शाखाले कागजात रुजु गरी २४ घण्टाभित्र प्रमाणीकरण स्वीकृत गर्नेछ।'
                  : 'Cooperative administration has queued your submission for review.'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={() => onNavigateTab && onNavigateTab('requests')}
              className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-lg transition-colors"
            >
              {lang === 'ne' ? 'अनुरोध सूची हेर्नुहोस्' : 'View in Requests'}
            </button>
            <button
              onClick={() => setPrintPreviewMode(true)}
              className="px-3 py-1.5 bg-white border border-emerald-300 text-emerald-800 text-xs font-semibold rounded-lg hover:bg-emerald-50 transition-colors"
            >
              {lang === 'ne' ? 'प्रमाण प्रिन्ट' : 'Print Receipt'}
            </button>
          </div>
        </div>
      )}

      {/* Multi-step Visual Nav */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
        {steps.map((s) => {
          const StepIcon = s.icon;
          const isActive = activeStep === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setActiveStep(s.id)}
              className={`p-3 rounded-xl border text-left transition-all flex items-center gap-2.5 ${
                isActive
                  ? 'bg-white border-[#146B45] shadow-xs ring-1 ring-[#146B45]'
                  : 'bg-white/70 hover:bg-white border-slate-200 text-slate-600'
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                isActive ? 'bg-[#146B45] text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                <StepIcon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className={`block text-xs font-bold truncate ${isActive ? 'text-[#146B45]' : 'text-slate-700'}`}>
                  {lang === 'ne' ? s.title_ne : s.title_en}
                </span>
                <span className="text-[10px] text-slate-400 block">
                  {lang === 'ne' ? `चरण ${s.id}` : `Step ${s.id}`}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Form Form Body */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-8 shadow-xs space-y-6">
        
        {/* Step 1: Personal Information */}
        {activeStep === 1 && (
          <div className="space-y-5">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#17324D]">
                  {lang === 'ne' ? '१. व्यक्तिगत विवरण (Personal Information)' : '1. Personal Information'}
                </h3>
                <p className="text-xs text-slate-500">
                  {lang === 'ne' ? 'नागरिकता प्रमाणपत्र अनुसारको आधिकारिक नाम र जन्ममिति' : 'Official personal particulars matching legal identification'}
                </p>
              </div>
              <span className="text-[11px] font-mono font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-sm">
                ID: {memberProfile.member_code}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              {/* Full Name in Nepali */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {lang === 'ne' ? 'पूरा नाम (देवनागरीमा) *' : 'Full Name (in Nepali Devnagari) *'}
                </label>
                <input
                  type="text"
                  required
                  value={formData.full_name_ne}
                  onChange={(e) => handleInputChange('full_name_ne', e.target.value)}
                  placeholder="उदा: रामबहादुर श्रेष्ठ"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#146B45]"
                />
              </div>

              {/* Full Name in English */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {lang === 'ne' ? 'पूरा नाम (अंग्रेजी ठूला अक्षर) *' : 'Full Name (English BLOCK LETTERS) *'}
                </label>
                <input
                  type="text"
                  required
                  value={formData.full_name_en}
                  onChange={(e) => handleInputChange('full_name_en', e.target.value.toUpperCase())}
                  placeholder="e.g. RAM BAHADUR SHRESTHA"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#146B45] uppercase font-mono"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {lang === 'ne' ? 'लिङ्ग (Gender) *' : 'Gender *'}
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#146B45] bg-white"
                >
                  <option value="male">{lang === 'ne' ? 'पुरुष (Male)' : 'Male'}</option>
                  <option value="female">{lang === 'ne' ? 'महिला (Female)' : 'Female'}</option>
                  <option value="other">{lang === 'ne' ? 'अन्य (Other)' : 'Other'}</option>
                </select>
              </div>

              {/* Date of Birth (BS) */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {lang === 'ne' ? 'जन्म मिति (वि.सं.) *' : 'Date of Birth (B.S.) *'}
                </label>
                <input
                  type="text"
                  required
                  value={formData.date_of_birth_bs}
                  onChange={(e) => handleInputChange('date_of_birth_bs', e.target.value)}
                  placeholder="२०४५-०४-१२"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#146B45] font-mono"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">Format: YYYY-MM-DD (e.g. २०४५-०४-१२)</span>
              </div>

              {/* Date of Birth (AD) */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {lang === 'ne' ? 'जन्म मिति (ई.सं. A.D.) *' : 'Date of Birth (A.D.) *'}
                </label>
                <input
                  type="date"
                  required
                  value={formData.date_of_birth_ad}
                  onChange={(e) => handleInputChange('date_of_birth_ad', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#146B45] font-mono"
                />
              </div>

              {/* Marital Status */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {lang === 'ne' ? 'वैवाहिक स्थिति (Marital Status) *' : 'Marital Status *'}
                </label>
                <select
                  value={formData.marital_status}
                  onChange={(e) => handleInputChange('marital_status', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#146B45] bg-white"
                >
                  <option value="married">{lang === 'ne' ? 'विवाहित (Married)' : 'Married'}</option>
                  <option value="unmarried">{lang === 'ne' ? 'अविवाहित (Unmarried)' : 'Unmarried'}</option>
                  <option value="other">{lang === 'ne' ? 'अन्य / एकल (Single/Other)' : 'Single / Other'}</option>
                </select>
              </div>

              {/* Mobile Phone */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {lang === 'ne' ? 'सम्पर्क मोबाइल नं. *' : 'Mobile Number *'}
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="98XXXXXXXX"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#146B45] font-mono"
                />
              </div>

              {/* Email Address */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {lang === 'ne' ? 'इमेल ठेगाना (Email)' : 'Email Address'}
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="yourname@gmail.com"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#146B45]"
                />
              </div>

              {/* PAN Number */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {lang === 'ne' ? 'स्थायी लेखा नं. (PAN Number)' : 'Permanent Account No. (PAN)'}
                </label>
                <input
                  type="text"
                  value={formData.pan_number || ''}
                  onChange={(e) => handleInputChange('pan_number', e.target.value)}
                  placeholder="9-digit PAN"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#146B45] font-mono"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveStep(2)}
                className="px-5 py-2.5 bg-[#146B45] hover:bg-[#105537] text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
              >
                <span>{lang === 'ne' ? 'नागरिकता र ठेगानामा जानुहोस्' : 'Continue to Citizenship & Address'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Citizenship & Addresses */}
        {activeStep === 2 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-[#17324D]">
                {lang === 'ne' ? '२. नागरिकता तथा ठेगाना विवरण (Citizenship & Address)' : '2. Citizenship & Address Details'}
              </h3>
              <p className="text-xs text-slate-500">
                {lang === 'ne' ? 'नेपाली नागरिकता र हाल तथा स्थायी बसोबासको प्रमाणित स्थान' : 'Official citizenship record, permanent location and current residence'}
              </p>
            </div>

            {/* Citizenship sub-box */}
            <div className="bg-[#F5F7F6] p-4 sm:p-5 rounded-xl border border-slate-200 space-y-4">
              <h4 className="text-xs font-bold text-[#17324D] uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#146B45]" />
                <span>{lang === 'ne' ? 'नागरिकता विवरण (Citizenship Details)' : 'Citizenship Identification'}</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {lang === 'ne' ? 'नागरिकता प्रमाणपत्र नं. *' : 'Citizenship Certificate No. *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.citizenship_no}
                    onChange={(e) => handleInputChange('citizenship_no', e.target.value)}
                    placeholder="27-01-72-XXXXX"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#146B45] font-mono font-semibold text-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {lang === 'ne' ? 'जारी जिल्ला *' : 'Issued District *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.citizenship_issued_district}
                    onChange={(e) => handleInputChange('citizenship_issued_district', e.target.value)}
                    placeholder="उदा: काठमाडौं (Kathmandu)"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#146B45]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {lang === 'ne' ? 'जारी मिति (वि.सं.) *' : 'Issue Date (B.S.) *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.citizenship_issued_date_bs}
                    onChange={(e) => handleInputChange('citizenship_issued_date_bs', e.target.value)}
                    placeholder="२०६३-०१-१८"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#146B45] font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Permanent Address */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-[#17324D] uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#146B45]" />
                <span>{lang === 'ne' ? 'स्थायी ठेगाना (Permanent Address as per Citizenship)' : 'Permanent Address'}</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">{lang === 'ne' ? 'प्रदेश (Province) *' : 'Province *'}</label>
                  <input
                    type="text"
                    required
                    value={formData.permanent_province}
                    onChange={(e) => handleInputChange('permanent_province', e.target.value)}
                    placeholder="उदा: बागमती प्रदेश"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#146B45]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">{lang === 'ne' ? 'जिल्ला (District) *' : 'District *'}</label>
                  <input
                    type="text"
                    required
                    value={formData.permanent_district}
                    onChange={(e) => handleInputChange('permanent_district', e.target.value)}
                    placeholder="उदा: काठमाडौं"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#146B45]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">{lang === 'ne' ? 'गाउँपालिका / नगरपालिका *' : 'Municipality / Rural Municipality *'}</label>
                  <input
                    type="text"
                    required
                    value={formData.permanent_municipality}
                    onChange={(e) => handleInputChange('permanent_municipality', e.target.value)}
                    placeholder="उदा: नागार्जुन नगरपालिका"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#146B45]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">{lang === 'ne' ? 'वडा नं. (Ward No) *' : 'Ward No. *'}</label>
                  <input
                    type="text"
                    required
                    value={formData.permanent_ward}
                    onChange={(e) => handleInputChange('permanent_ward', e.target.value)}
                    placeholder="उदा: ०४"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#146B45]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">{lang === 'ne' ? 'टोल / मार्ग (Tole / Street) *' : 'Tole / Street *'}</label>
                  <input
                    type="text"
                    required
                    value={formData.permanent_tole}
                    onChange={(e) => handleInputChange('permanent_tole', e.target.value)}
                    placeholder="उदा: सितापाईला, नागार्जुन"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#146B45]"
                  />
                </div>
              </div>
            </div>

            {/* Current Address Toggle */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-[#17324D] uppercase tracking-wider flex items-center gap-1.5">
                  <Home className="w-3.5 h-3.5 text-[#146B45]" />
                  <span>{lang === 'ne' ? 'हालको बसोबास ठेगाना (Current / Residential Address)' : 'Current Residential Address'}</span>
                </h4>
              </div>

              <label className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.current_same_as_permanent}
                  onChange={(e) => handleInputChange('current_same_as_permanent', e.target.checked)}
                  className="w-4 h-4 rounded-sm border-slate-300 text-[#146B45] focus:ring-[#146B45]"
                />
                <span className="font-semibold text-slate-700">
                  {lang === 'ne'
                    ? 'स्थायी ठेगाना र हालको ठेगाना एउटै छ (Current address is identical to permanent address)'
                    : 'Current address is identical to permanent address'}
                </span>
              </label>

              {!formData.current_same_as_permanent && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs pt-2">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">{lang === 'ne' ? 'हालको प्रदेश *' : 'Current Province *'}</label>
                    <input
                      type="text"
                      required
                      value={formData.current_province}
                      onChange={(e) => handleInputChange('current_province', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">{lang === 'ne' ? 'हालको जिल्ला *' : 'Current District *'}</label>
                    <input
                      type="text"
                      required
                      value={formData.current_district}
                      onChange={(e) => handleInputChange('current_district', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">{lang === 'ne' ? 'हालको गाउँ/नगरपालिका *' : 'Current Municipality *'}</label>
                    <input
                      type="text"
                      required
                      value={formData.current_municipality}
                      onChange={(e) => handleInputChange('current_municipality', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">{lang === 'ne' ? 'वडा नं. *' : 'Ward No *'}</label>
                    <input
                      type="text"
                      required
                      value={formData.current_ward}
                      onChange={(e) => handleInputChange('current_ward', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block font-semibold text-slate-700 mb-1">{lang === 'ne' ? 'टोल / स्थान *' : 'Tole / Street *'}</label>
                    <input
                      type="text"
                      required
                      value={formData.current_tole}
                      onChange={(e) => handleInputChange('current_tole', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setActiveStep(1)}
                className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg"
              >
                {lang === 'ne' ? 'पछाडि' : 'Back'}
              </button>
              <button
                type="button"
                onClick={() => setActiveStep(3)}
                className="px-5 py-2.5 bg-[#146B45] hover:bg-[#105537] text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
              >
                <span>{lang === 'ne' ? 'परिवार तथा हकवाला विवरणमा जानुहोस्' : 'Continue to Family & Nominee'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Family & Nominee Details */}
        {activeStep === 3 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-[#17324D]">
                {lang === 'ne' ? '३. पारिवारिक तथा हकवाला विवरण (Family & Nominee)' : '3. Family & Nominee Details'}
              </h3>
              <p className="text-xs text-slate-500">
                {lang === 'ne' ? 'सहकारी बचत तथा सेयर हकदावी प्रयोजनका लागि परिवार तथा इच्छाएको व्यक्तिको विवरण' : 'Legal lineage and cooperative beneficiary details'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {lang === 'ne' ? 'बाबुको नाम (Father\'s Full Name) *' : 'Father\'s Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={formData.father_name}
                  onChange={(e) => handleInputChange('father_name', e.target.value)}
                  placeholder="उदा: हरिप्रसाद श्रेष्ठ"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#146B45]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {lang === 'ne' ? 'आमाको नाम (Mother\'s Full Name) *' : 'Mother\'s Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={formData.mother_name}
                  onChange={(e) => handleInputChange('mother_name', e.target.value)}
                  placeholder="उदा: मायादेवी श्रेष्ठ"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#146B45]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {lang === 'ne' ? 'हजुरबुबाको नाम (Grandfather\'s Full Name) *' : 'Grandfather\'s Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={formData.grandfather_name}
                  onChange={(e) => handleInputChange('grandfather_name', e.target.value)}
                  placeholder="उदा: भक्तबहादुर श्रेष्ठ"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#146B45]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {lang === 'ne' ? 'पति / पत्नीको नाम (Spouse\'s Name, if married)' : 'Spouse\'s Name (if married)'}
                </label>
                <input
                  type="text"
                  value={formData.spouse_name || ''}
                  onChange={(e) => handleInputChange('spouse_name', e.target.value)}
                  placeholder="उदा: सीता श्रेष्ठ"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#146B45]"
                />
              </div>
            </div>

            {/* Nominee Box */}
            <div className="bg-amber-50/60 p-4 sm:p-5 rounded-xl border border-amber-200 space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D6A63C]"></span>
                <h4 className="text-xs font-bold text-[#17324D] uppercase tracking-wider">
                  {lang === 'ne' ? 'इच्छाएको व्यक्ति / हकवाला (Nominee / Beneficiary Details)' : 'Nominee / Beneficiary Particulars'}
                </h4>
              </div>
              <p className="text-[11px] text-slate-600">
                {lang === 'ne'
                  ? 'कुनै अप्रत्याशित अवस्थामा सदस्यको बचत तथा सेयर दावी गर्न हकवाला व्यक्तिको विवरण अनिवार्य छ।'
                  : 'Designated legal beneficiary for share capital and deposit claims.'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {lang === 'ne' ? 'हकवालाको पूरा नाम *' : 'Nominee Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nominee_name}
                    onChange={(e) => handleInputChange('nominee_name', e.target.value)}
                    placeholder="उदा: सीता श्रेष्ठ"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#146B45]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {lang === 'ne' ? 'सदस्यसँगको नाता *' : 'Relationship with Member *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nominee_relation}
                    onChange={(e) => handleInputChange('nominee_relation', e.target.value)}
                    placeholder="उदा: पत्नी / छोरा / छोरी"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#146B45]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {lang === 'ne' ? 'हकवालाको नागरिकता नं. / सम्पर्क' : 'Nominee ID / Citizenship No.'}
                  </label>
                  <input
                    type="text"
                    value={formData.nominee_citizenship_no}
                    onChange={(e) => handleInputChange('nominee_citizenship_no', e.target.value)}
                    placeholder="27-01-XX-XXXXX"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#146B45] font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setActiveStep(2)}
                className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg"
              >
                {lang === 'ne' ? 'पछाडि' : 'Back'}
              </button>
              <button
                type="button"
                onClick={() => setActiveStep(4)}
                className="px-5 py-2.5 bg-[#146B45] hover:bg-[#105537] text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
              >
                <span>{lang === 'ne' ? 'पेशा तथा कागजात अपलोडमा जानुहोस्' : 'Continue to Occupation & Documents'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Occupation, Financials & Document Verification */}
        {activeStep === 4 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-[#17324D]">
                {lang === 'ne' ? '४. पेशा, आय तथा कागजात प्रमाणिकरण' : '4. Occupation, Income & Documents'}
              </h3>
              <p className="text-xs text-slate-500">
                {lang === 'ne' ? 'सम्पत्ति शुद्धीकरण (AML) नियम अनुसार आम्दानीको स्रोत र कागजात अपलोड' : 'Anti-money laundering source of income compliance and verified document scans'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {lang === 'ne' ? 'मुख्य पेशा / व्यवसाय *' : 'Primary Profession / Occupation *'}
                </label>
                <select
                  value={formData.occupation}
                  onChange={(e) => handleInputChange('occupation', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#146B45] bg-white"
                >
                  <option value="व्यापार / व्यवसाय (Business / Trading)">{lang === 'ne' ? 'व्यापार / व्यवसाय (Business / Trading)' : 'Business / Trading'}</option>
                  <option value="कृषि तथा पशुपालन (Agriculture)">{lang === 'ne' ? 'कृषि तथा पशुपालन (Agriculture)' : 'Agriculture & Livestock'}</option>
                  <option value="सरकारी / निजी जागिर (Service / Employment)">{lang === 'ne' ? 'सरकारी वा निजी जागिर (Employment)' : 'Government / Private Service'}</option>
                  <option value="वैदेशिक रोजगार (Foreign Employment)">{lang === 'ne' ? 'वैदेशिक रोजगार (Foreign Employment)' : 'Foreign Employment'}</option>
                  <option value="पेशागत विशेषज्ञ (Doctor / Engineer / CA)">{lang === 'ne' ? 'पेशागत विशेषज्ञ (Professional)' : 'Professional Practice'}</option>
                  <option value="अन्य (Other)">{lang === 'ne' ? 'अन्य (Other)' : 'Other'}</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {lang === 'ne' ? 'वार्षिक अनुमानित आम्दानी दायरा *' : 'Annual Income Range *'}
                </label>
                <select
                  value={formData.annual_income_range}
                  onChange={(e) => handleInputChange('annual_income_range', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#146B45] bg-white"
                >
                  <option value="रु ३ लाख भन्दा कम (Under NPR 300,000)">{lang === 'ne' ? 'रु ३ लाख भन्दा कम (Under NPR 3 Lakhs)' : 'Below NPR 300,000'}</option>
                  <option value="रु ३ लाख देखि रु ५ लाख सम्म (NPR 300,000 - 500,000)">{lang === 'ne' ? 'रु ३ लाख देखि रु ५ लाख सम्म' : 'NPR 300,000 - 500,000'}</option>
                  <option value="रु ५ लाख देखि रु १० लाख सम्म (NPR 500,000 - 1,000,000)">{lang === 'ne' ? 'रु ५ लाख देखि रु १० लाख सम्म' : 'NPR 500,000 - 1,000,000'}</option>
                  <option value="रु १० लाख भन्दा माथि (Above NPR 1,000,000)">{lang === 'ne' ? 'रु १० लाख भन्दा माथि (Above NPR 10 Lakhs)' : 'Above NPR 1,000,000'}</option>
                </select>
              </div>
            </div>

            {/* Document Uploads Grid */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-[#17324D] uppercase tracking-wider flex items-center gap-1.5">
                  <Upload className="w-3.5 h-3.5 text-[#146B45]" />
                  <span>{lang === 'ne' ? 'कागजात फाइल प्रमाण (Document Attachments)' : 'Document Uploads & Attachments'}</span>
                </h4>
                <span className="text-[11px] text-slate-400">PDF, JPG, PNG (Max 5MB)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* 1. Citizenship Front */}
                <div className="p-3.5 rounded-xl border border-slate-200 bg-[#F5F7F6] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-slate-800">
                        {lang === 'ne' ? 'नागरिकताको अगाडिको भाग *' : 'Citizenship Card (Front) *'}
                      </span>
                      {formData.documents.citizenship_front ? (
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Check className="w-3 h-3" /> Attached
                        </span>
                      ) : (
                        <span className="text-[10px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full">Required</span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 mb-2">
                      {formData.documents.citizenship_front || (lang === 'ne' ? 'फाइल संलग्न छैन' : 'No file attached')}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-200/80">
                    <label className="cursor-pointer px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-md transition-colors flex items-center gap-1">
                      <Upload className="w-3.5 h-3.5 text-[#146B45]" />
                      <span>{lang === 'ne' ? 'अपलोड' : 'Upload'}</span>
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload('citizenship_front', file.name);
                        }}
                      />
                    </label>
                    {formData.documents.citizenship_front && (
                      <button
                        type="button"
                        onClick={() => handleRemoveDoc('citizenship_front')}
                        className="p-1.5 text-slate-400 hover:text-red-600 transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* 2. Citizenship Back */}
                <div className="p-3.5 rounded-xl border border-slate-200 bg-[#F5F7F6] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-slate-800">
                        {lang === 'ne' ? 'नागरिकताको पछाडिको भाग *' : 'Citizenship Card (Back) *'}
                      </span>
                      {formData.documents.citizenship_back ? (
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Check className="w-3 h-3" /> Attached
                        </span>
                      ) : (
                        <span className="text-[10px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full">Required</span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 mb-2">
                      {formData.documents.citizenship_back || (lang === 'ne' ? 'फाइल संलग्न छैन' : 'No file attached')}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-200/80">
                    <label className="cursor-pointer px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-md transition-colors flex items-center gap-1">
                      <Upload className="w-3.5 h-3.5 text-[#146B45]" />
                      <span>{lang === 'ne' ? 'अपलोड' : 'Upload'}</span>
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload('citizenship_back', file.name);
                        }}
                      />
                    </label>
                    {formData.documents.citizenship_back && (
                      <button
                        type="button"
                        onClick={() => handleRemoveDoc('citizenship_back')}
                        className="p-1.5 text-slate-400 hover:text-red-600 transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* 3. Passport Photo */}
                <div className="p-3.5 rounded-xl border border-slate-200 bg-[#F5F7F6] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-slate-800">
                        {lang === 'ne' ? 'पासपोर्ट साइजको फोटो *' : 'Passport-size Photo *'}
                      </span>
                      {formData.documents.passport_photo ? (
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Check className="w-3 h-3" /> Attached
                        </span>
                      ) : (
                        <span className="text-[10px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full">Required</span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 mb-2">
                      {formData.documents.passport_photo || (lang === 'ne' ? 'फाइल संलग्न छैन' : 'No file attached')}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-200/80">
                    <label className="cursor-pointer px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-md transition-colors flex items-center gap-1">
                      <Upload className="w-3.5 h-3.5 text-[#146B45]" />
                      <span>{lang === 'ne' ? 'अपलोड' : 'Upload'}</span>
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload('passport_photo', file.name);
                        }}
                      />
                    </label>
                    {formData.documents.passport_photo && (
                      <button
                        type="button"
                        onClick={() => handleRemoveDoc('passport_photo')}
                        className="p-1.5 text-slate-400 hover:text-red-600 transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* 4. Utility Bill */}
                <div className="p-3.5 rounded-xl border border-slate-200 bg-[#F5F7F6] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-slate-800">
                        {lang === 'ne' ? 'बिजुली / खानेपानी महसुल रसिद' : 'Utility Bill (Electricity/Water)'}
                      </span>
                      {formData.documents.utility_bill ? (
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Check className="w-3 h-3" /> Attached
                        </span>
                      ) : (
                        <span className="text-[10px] bg-slate-200 text-slate-500 px-2 py-0.5 rounded-full">Optional</span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 mb-2">
                      {formData.documents.utility_bill || (lang === 'ne' ? 'ऐच्छिक प्रमाण' : 'Optional address proof')}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-200/80">
                    <label className="cursor-pointer px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-md transition-colors flex items-center gap-1">
                      <Upload className="w-3.5 h-3.5 text-[#146B45]" />
                      <span>{lang === 'ne' ? 'अपलोड' : 'Upload'}</span>
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload('utility_bill', file.name);
                        }}
                      />
                    </label>
                    {formData.documents.utility_bill && (
                      <button
                        type="button"
                        onClick={() => handleRemoveDoc('utility_bill')}
                        className="p-1.5 text-slate-400 hover:text-red-600 transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Declaration and Legal Agreement */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  required
                  checked={agreementChecked}
                  onChange={(e) => setAgreementChecked(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded-sm border-slate-300 text-[#146B45] focus:ring-[#146B45] shrink-0"
                />
                <span className="text-slate-700 leading-relaxed">
                  {lang === 'ne'
                    ? 'म यस संस्थाको सदस्यको रूपमा स्वघोषणा गर्दछु कि माथि उल्लिखित व्यक्तिगत, नागरिकता, ठेगाना र पारिवारिक विवरण सम्पूर्ण रूपमा सत्य तथ्य हुन्। संस्थाको विनियम र प्रचलित कानुन अनुसार कुनै कुरा ढाँटेको वा लुकाएको पाइए कानुन बमोजिम व्यहोर्न मन्जुर छु।'
                    : 'I hereby declare that all information furnished in this KYC form is true, correct, and complete. I undertake to notify the cooperative of any changes therein immediately.'}
                </span>
              </label>
            </div>

            {/* Form Footer Action */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setActiveStep(3)}
                className="w-full sm:w-auto px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg"
              >
                {lang === 'ne' ? 'पछाडि' : 'Back'}
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setPrintPreviewMode(true)}
                  className="flex-1 sm:flex-none px-4 py-2.5 border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5 text-slate-500" />
                  <span>{lang === 'ne' ? 'सारांश हेर्नुहोस्' : 'Preview'}</span>
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting || !agreementChecked}
                  className="flex-1 sm:flex-none px-6 py-2.5 bg-[#146B45] hover:bg-[#105537] active:bg-[#0c4029] disabled:bg-slate-400 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>{lang === 'ne' ? 'दर्ता हुँदैछ...' : 'Submitting...'}</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-3.5 h-3.5 text-[#D6A63C]" />
                      <span>{lang === 'ne' ? 'KYC विवरण सुरक्षित दर्ता गर्नुहोस्' : 'Submit KYC Update'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

      </form>
    </div>
  );
};
