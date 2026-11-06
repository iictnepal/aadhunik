import React, { useState, useMemo } from 'react';
import { Language, ActiveView } from '../types';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Search, 
  UserCheck, 
  Coins, 
  Wallet, 
  Phone, 
  CheckCircle2, 
  FileText, 
  ShieldCheck, 
  X,
  Sparkles
} from 'lucide-react';

export interface FAQItem {
  id: string;
  category: 'membership' | 'loans' | 'savings';
  question_ne: string;
  question_en: string;
  answer_ne: string;
  answer_en: string;
  highlights_ne?: string[];
  highlights_en?: string[];
}

const FAQ_DATA: FAQItem[] = [
  // Membership FAQs
  {
    id: 'mem-1',
    category: 'membership',
    question_ne: 'आधुनिक जन सहकारीको सदस्यता कसरी प्राप्त गर्न सकिन्छ?',
    question_en: 'How do I become a member of Aadhunik Jana Co-operative?',
    answer_ne: 'नागार्जुन नगरपालिका वा काठमाडौँ उपत्यकामा स्थायी वा अस्थायी बसोबास गर्ने, पेशा, व्यवसाय वा रोजगारीमा संलग्न कुनै पनि नेपाली नागरिकले सदस्यता फारम भरी आवश्यक कागजात पेश गरी सदस्यता प्राप्त गर्न सक्नुहुन्छ। सदस्यता स्वीकृत भएपछि न्यूनतम १० कित्ता सेयर (रु. १०० का दरले रु. १,०००) खरिद गरी नियमित बचत सुरु गर्न सकिनेछ।',
    answer_en: 'Any Nepali citizen residing, working, or running a business in Nagarjun Municipality or the Kathmandu Valley can apply. You need to submit the membership application along with required KYC documents and purchase a minimum of 10 share units (NPR 1,000 at NPR 100/unit) plus a nominal entrance fee.',
    highlights_ne: [
      'नेपाली नागरिकताको प्रतिलिपि (२ प्रति)',
      'हालसालै खिचिएको पासपोर्ट साइजको फोटो (२ प्रति)',
      'स्थानीय बसोबास प्रमाणित हुने कागजात वा विद्युत/खानेपानी बिल',
      'इच्छाएको व्यक्तिको नागरिकता र फोटो (KYC)'
    ],
    highlights_en: [
      'Copy of Nepali Citizenship Certificate (2 copies)',
      'Recent passport-size photographs (2 copies)',
      'Proof of local residence or utility bill',
      'Nominee details, photograph, and citizenship copy'
    ]
  },
  {
    id: 'mem-2',
    category: 'membership',
    question_ne: 'सहकारी सदस्य बन्दा प्राप्त हुने मुख्य सेवा तथा सुविधाहरू के-के हुन्?',
    question_en: 'What are the core benefits of becoming a cooperative member?',
    answer_ne: 'संस्थाको सेयर सदस्य बनेपछि आकर्षक त्रैमासिक ब्याज प्राप्त हुने विभिन्न बचत खाता सञ्चालन, सहुलियतपूर्ण दरमा तत्काल कर्जा सुविधा, वार्षिक साधारण सभाबाट पारित हुने सेयर लाभांश (Dividend) र संरक्षित पुँजी फिर्ता कोषबाट बोनस प्राप्त हुन्छ। साथै सदस्य राहत कोष तथा बालबालिका छात्रवृत्ति कार्यक्रममा समेत सहभागी हुन पाइन्छ।',
    answer_en: 'Members enjoy competitive quarterly interest on savings, rapid low-interest credit facilities, annual AGM-approved share dividends, Patronage Refund bonuses, welfare medical assistance, and educational scholarships for children.',
    highlights_ne: [
      'वार्षिक आकर्षक सेयर लाभांश तथा बोनस',
      'सुलभ र झन्झटरहित व्यावसायिक तथा घरायसी कर्जा',
      'सदस्य कल्याण तथा आपतकालीन राहत कोष सुविधा',
      'साधारण सभामा मतदान तथा संस्थागत सुशासनमा मताधिकार'
    ],
    highlights_en: [
      'Annual share dividends and patronage return bonuses',
      'Hassle-free micro, business, and housing loans',
      'Emergency member welfare assistance fund',
      'Voting rights and democratic governance participation'
    ]
  },
  {
    id: 'mem-3',
    category: 'membership',
    question_ne: 'नाबालिग (१८ वर्ष मुनिका बालबालिका) को नाममा बचत खाता खोल्न सकिन्छ?',
    question_en: 'Can minor accounts be opened for children under 18?',
    answer_ne: 'हो, बालबालिकाको उज्ज्वल भविष्य, शिक्षा र बचत बानी विकास गर्न "बाल जनकल्याण बचत खाता" सञ्चालनमा छ। बाबु, आमा वा कानुनी संरक्षकले बालबालिकाको जन्मदर्ता प्रमाणपत्र र संरक्षकको नागरिकता पेश गरी यो खाता खोल्न सक्नुहुन्छ। यसमा नियमित बचत भन्दा थप ०.५% बढी ब्याज प्रदान गरिन्छ।',
    answer_en: 'Yes. Our "Bal Janakalyan Children Savings Account" can be opened by parents or legal guardians using the child birth certificate and guardian citizenship. It offers an additional 0.5% interest bonus to foster early financial planning.'
  },
  {
    id: 'mem-4',
    category: 'membership',
    question_ne: 'सहकारीको सदस्यता त्याग गर्न वा सेयर रकम फिर्ता लिन के प्रक्रिया छ?',
    question_en: 'What is the procedure to withdraw membership or refund shares?',
    answer_ne: 'सहकारी ऐन २०७४ तथा संस्थाको विनियम अनुसार कुनै पनि सदस्यले आफ्नो सम्पूर्ण कर्जा वा जमानी दायित्व चुक्ता भएको अवस्थामा १ महिना अगावै लिखित निवेदन दिएर सेयर रकम फिर्ता वा अन्य सदस्यलाई हस्तान्तरण गरी सम्मानपूर्वक सदस्यता त्याग गर्न सक्नुहुन्छ।',
    answer_en: 'Per the Cooperative Act 2074, a member with zero outstanding loan liabilities or third-party guarantor commitments may submit a 1-month advance written notice to transfer or refund share capital.'
  },

  // Loan Requirements FAQs
  {
    id: 'loan-1',
    category: 'loans',
    question_ne: 'कर्जा प्राप्त गर्नका लागि के कस्ता योग्यता तथा धितो कागजात आवश्यक पर्छ?',
    question_en: 'What eligibility and collateral documents are required to obtain a loan?',
    answer_ne: 'कर्जा आवेदनका लागि कम्तीमा ३ महिनादेखि नियमित बचत कारोबार गरेको सदस्य हुनुपर्दछ। कर्जाको प्रकार अनुसार व्यक्तिगत आयस्रोत, व्यवसाय दर्ता तथा कर चुक्ता, र धितो रहने घरजग्गाको लालपुर्जा, चारकिल्ला, तिरो तिरेको रसिद तथा ट्रेस/नक्सा आवश्यक पर्दछ। धितो मूल्याङ्कन संस्थाको इन्जिनियर/मूल्याङ्कनकर्ताबाट गरिन्छ।',
    answer_en: 'Applicants should have active membership with regular savings for at least 3 months. Depending on the product, you need income verification (salary slip, audited business accounts, tax clearance), collateral property documents (Lalpurja land deed, boundary certificate, tax receipts, blue-print map), and internal engineering valuation.',
    highlights_ne: [
      'जग्गा/घरको सक्कल लालपुर्जा (धनीपुर्जा)',
      'सम्बन्धित वडा कार्यालयको चारकिल्ला र चालु आ.व.को मालपोत रसिद',
      'ऋणी तथा परिवारका सदस्यहरूको नागरिकता प्रतिलिपि',
      'व्यवसाय दर्ता, प्यान दर्ता तथा आयस्रोत प्रमाणित कागजात'
    ],
    highlights_en: [
      'Original Land/Building Ownership Deed (Lalpurja)',
      'Ward-issued boundary certificate and current land-tax clearance',
      'Citizenship copies of applicant and family members',
      'Business registration, PAN, and verifiable cashflow records'
    ]
  },
  {
    id: 'loan-2',
    category: 'loans',
    question_ne: 'कर्जा आवेदन दिएपछि स्वीकृत हुन कति समय लाग्छ?',
    question_en: 'How long does the loan approval and disbursement process take?',
    answer_ne: 'आवश्यक सम्पूर्ण कागजात पेश भएको अवस्थामा आपतकालीन तथा सुनधितो कर्जा २४ देखि ४८ घण्टाभित्रै स्वीकृत गरी प्रवाह गरिन्छ। व्यापारिक, कृषि, घर निर्माण वा अन्य धितो कर्जाको हकमा स्थलगत निरीक्षण, धितो मूल्याङ्कन र उपसमितिको सिफारिस पश्चात सामान्यतया ३ देखि ५ कार्यदिनभित्र कर्जा रकम खातामा उपलब्ध हुन्छ।',
    answer_en: 'For emergency, express, or gold-backed loans, disbursement occurs within 24 to 48 hours. For commercial, housing, and agricultural mortgages requiring on-site valuation and committee approval, disbursement is completed in 3 to 5 business days.'
  },
  {
    id: 'loan-3',
    category: 'loans',
    question_ne: 'कर्जाको ब्याज कुन प्रणालीबाट गणना गरिन्छ र मासिक किस्ता (EMI) कसरी निर्धारण हुन्छ?',
    question_en: 'How is loan interest calculated and how is the monthly EMI determined?',
    answer_ne: 'हाम्रो संस्थाले नेपाल राष्ट्र बैंक र सहकारी विभागको सिद्धान्त अनुसार "घट्दो दर प्रणाली" (Diminishing Balance Method) बाट दैनिक बाँकी साँवामा मात्र ब्याज गणना गर्दछ। यसले गर्दा सदस्यले तिर्दै गएको साँवा रकम कट्टा भई बाँकी रकममा मात्र ब्याज लाग्ने हुँदा कुल लागत निकै कम पर्न आउँछ।',
    answer_en: 'We calculate loan interest strictly on the Diminishing Balance Method based on daily outstanding principal. As you pay down principal each month, interest charges decrease proportionally, preventing unfair compounding flat charges.'
  },
  {
    id: 'loan-4',
    category: 'loans',
    question_ne: 'समय भन्दा अगावै कर्जा चुक्ता गर्दा कुनै थप जरिवाना वा पूर्व-भुक्तानी शुल्क लाग्छ?',
    question_en: 'Is there any prepayment penalty or lock-in fee for early loan clearance?',
    answer_ne: 'लाग्दैन। आधुनिक जन सहकारीले सदस्यहरूलाई कर्जा छिटो चुक्ता गर्न प्रोत्साहित गर्दछ। कुनै पनि सदस्यले आफ्नो सुविधा अनुसार थप साँवा रकम जम्मा गर्न वा अवधि अगावै कर्जा चुक्ता गर्न सक्नुहुन्छ; यसमा कुनै पनि पूर्व-भुक्तानी शुल्क (Prepayment Penalty) लिइँदैन। ब्याज केवल भुक्तानी भएको दिनसम्मको मात्र हिसाब गरिन्छ।',
    answer_en: 'No prepayment penalty or lock-in fee is charged. Members can make lump-sum principal payments or liquidate the entire loan ahead of schedule anytime with interest computed precisely up to the settlement date.'
  },

  // Savings & Interest FAQs
  {
    id: 'sav-1',
    category: 'savings',
    question_ne: 'बचत खाताहरूमा ब्याजको गणना कसरी गरिन्छ र कहिले खातामा जम्मा हुन्छ?',
    question_en: 'How is savings interest calculated and when is it credited to member accounts?',
    answer_ne: 'संस्थामा रहेका सबै बचत खाताहरूमा दैनिक अन्तिम मौज्दात (Daily Minimum Closing Balance) का आधारमा कम्प्युटर सफ्टवेयर मार्फत स्वचालित रूपमा ब्याज गणना गरिन्छ। अर्जित ब्याज प्रत्येक त्रैमास (आश्विन, पुस, चैत्र र असार मसान्त) मा सदस्यको खातामा स्वतः पुँजीकृत (Credit) गरिन्छ।',
    answer_en: 'All savings schemes accrue interest daily on the end-of-day closing balance using verified core-banking software. The accumulated interest is automatically credited and capitalized directly to the member passbook on a quarterly basis (end of Ashwin, Poush, Chaitra, and Ashad).'
  },
  {
    id: 'sav-2',
    category: 'savings',
    question_ne: 'सहकारीमा जम्मा गरेको बचत रकमको सुरक्षा प्रत्याभूति कसरी गरिएको छ?',
    question_en: 'How is the security and liquidity of member deposits guaranteed?',
    answer_ne: 'हाम्रो संस्था अन्तर्राष्ट्रिय सहकारी वित्तीय अनुगमन प्रणाली (PEARLS Monitoring System) अनुसार पूर्ण रूपमा सञ्चालित छ। संस्थामा १५% भन्दा बढी अनिवार्य तरलता कोष (Statutory Liquidity), बलियो जगेडा कोष (Reserve Fund) र जोखिम व्यवस्थापन नीति कडाइका साथ लागू गरिएको छ। साथै स्थानीय सरकार (नागार्जुन नगरपालिका) तथा सहकारी विभागको निरन्तर नियमनमा संस्था सञ्चालित छ।',
    answer_en: 'Our cooperative operates under the international PEARLS prudential standards, maintaining statutory liquid reserves above 15%, substantial capital reserve funds, and conservative loan-to-deposit ratios under the regulatory supervision of the Department of Cooperatives and Nagarjun Municipality.'
  },
  {
    id: 'sav-3',
    category: 'savings',
    question_ne: 'बचतबाट प्राप्त हुने ब्याज रकममा कति प्रतिशत आयकर (TDS) कट्टी हुन्छ?',
    question_en: 'What is the applicable withholding tax (TDS) on savings interest?',
    answer_ne: 'नेपाल सरकारको आयकर ऐन २०५८ अनुसार दर्तावाला सहकारी संस्थाका प्राकृतिक व्यक्ति सदस्यहरूको बचतबाट आर्जन हुने ब्याजमा ५% अग्रिम आयकर (TDS) कट्टा गरी आन्तरिक राजस्व कार्यालयमा दाखिला गरिन्छ।',
    answer_en: 'As mandated by the Nepal Income Tax Act 2058 for cooperative financial institutions, a 5% Tax Deducted at Source (TDS) is withheld on interest payouts and deposited directly to the Inland Revenue Department.'
  },
  {
    id: 'sav-4',
    category: 'savings',
    question_ne: 'मुद्दती बचत (Fixed Deposit) को अवधि पूरा नहुँदै रकम आवश्यक परेमा के गर्न सकिन्छ?',
    question_en: 'What happens if I need funds before my Fixed Deposit matures?',
    answer_ne: 'अचानक रकम आवश्यक परेमा मुद्दती रसिद धितो राखी जम्मा रकमको ९०% सम्म तुरुन्तै सरल प्रक्रियाबाट कर्जा लिन सकिन्छ, जसले गर्दा मुद्दती बचतको उच्च ब्याजदर पनि गुम्दैन। यदि मुद्दती नै तोड्नुपरेमा संस्थाको कार्यविधि अनुसार साधारण बचत दरमा हिसाब गरी भुक्तानी दिने सुविधा उपलब्ध छ।',
    answer_en: 'Members can instantly avail a loan against their fixed deposit certificate for up to 90% of the deposit amount at a slight margin (+2%), retaining their attractive FD yield. Alternatively, premature redemption is permitted with interest adjusted to the regular savings rate.'
  }
];

interface FAQSectionProps {
  lang: Language;
  onNavigate?: (view: ActiveView) => void;
  className?: string;
  defaultCategory?: 'all' | 'membership' | 'loans' | 'savings';
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  lang,
  onNavigate,
  className = '',
  defaultCategory = 'all'
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'membership' | 'loans' | 'savings'>(defaultCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>('mem-1');

  const categories = [
    { id: 'all' as const, label_ne: 'सबै प्रश्नहरू', label_en: 'All Questions', count: FAQ_DATA.length },
    { id: 'membership' as const, label_ne: 'सदस्यता सम्बन्धी', label_en: 'Membership', count: FAQ_DATA.filter(f => f.category === 'membership').length },
    { id: 'loans' as const, label_ne: 'कर्जा सुविधा', label_en: 'Loan Facilities', count: FAQ_DATA.filter(f => f.category === 'loans').length },
    { id: 'savings' as const, label_ne: 'बचत तथा ब्याज', label_en: 'Savings & Interest', count: FAQ_DATA.filter(f => f.category === 'savings').length },
  ];

  const filteredFAQs = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCat;

      const matchesSearch = 
        item.question_en.toLowerCase().includes(q) ||
        item.question_ne.includes(q) ||
        item.answer_en.toLowerCase().includes(q) ||
        item.answer_ne.includes(q);

      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const toggleAccordion = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const expandAll = () => {
    if (filteredFAQs.length > 0) {
      setExpandedId(expandedId ? null : filteredFAQs[0].id);
    }
  };

  const getCategoryBadge = (cat: FAQItem['category']) => {
    switch (cat) {
      case 'membership':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#146B45] bg-[#146B45]/10 px-2 py-0.5 rounded-md">
            <UserCheck className="w-3 h-3" />
            <span>{lang === 'ne' ? 'सदस्यता' : 'Membership'}</span>
          </span>
        );
      case 'loans':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#17324D] bg-[#17324D]/10 px-2 py-0.5 rounded-md">
            <Coins className="w-3 h-3" />
            <span>{lang === 'ne' ? 'कर्जा' : 'Loans'}</span>
          </span>
        );
      case 'savings':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 bg-[#D6A63C]/20 px-2 py-0.5 rounded-md">
            <Wallet className="w-3 h-3" />
            <span>{lang === 'ne' ? 'बचत र ब्याज' : 'Savings'}</span>
          </span>
        );
    }
  };

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#146B45] uppercase tracking-wider mb-1">
            <HelpCircle className="w-4 h-4 text-[#D6A63C]" />
            <span>{lang === 'ne' ? 'जिज्ञासा तथा उत्तरहरू' : 'Frequently Asked Questions'}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#17324D] tracking-tight">
            {lang === 'ne' ? 'बारम्बार सोधिने प्रश्नहरू (FAQs)' : 'Cooperative Information & Help Guide'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            {lang === 'ne'
              ? 'सदस्यता योग्यता, कर्जा प्रक्रिया तथा बचतको ब्याज हिसाब सम्बन्धी सम्पूर्ण स्पष्ट जानकारी।'
              : 'Clear, transparent guidance on membership criteria, loan requirements, and daily savings interest calculations.'}
          </p>
        </div>

        {/* Quick Search Box */}
        <div className="relative w-full md:w-72 shrink-0">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'ne' ? 'प्रश्न वा शब्द खोज्नुहोस्...' : 'Search questions or keywords...'}
            className="w-full pl-9 pr-8 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-1 focus:ring-[#146B45] bg-white shadow-2xs"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 p-0.5"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Category Pills & Quick Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`min-h-[38px] px-3.5 sm:px-4 py-2 text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap shadow-2xs ${
                selectedCategory === cat.id
                  ? 'bg-[#17324D] text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <span>{lang === 'ne' ? cat.label_ne : cat.label_en}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                selectedCategory === cat.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Counter & Expand Helper */}
        <div className="flex items-center justify-between sm:justify-end gap-3 text-xs text-slate-500">
          <span>
            {lang === 'ne' 
              ? `${filteredFAQs.length} प्रश्नहरू उपलब्ध` 
              : `${filteredFAQs.length} questions listed`}
          </span>
          <button
            onClick={() => setExpandedId(expandedId ? null : filteredFAQs[0]?.id || null)}
            className="text-[#146B45] hover:underline font-semibold text-xs"
          >
            {expandedId 
              ? (lang === 'ne' ? 'सबै संकुचित गर्नुहोस्' : 'Collapse All') 
              : (lang === 'ne' ? 'विस्तार गर्नुहोस्' : 'Expand')}
          </button>
        </div>
      </div>

      {/* Accordion List */}
      {filteredFAQs.length === 0 ? (
        <div className="text-center py-12 px-4 border border-dashed border-slate-300 rounded-2xl bg-[#F5F7F6]">
          <HelpCircle className="w-10 h-10 text-slate-400 mx-auto mb-2" />
          <h4 className="text-sm font-bold text-slate-700">
            {lang === 'ne' ? 'कुनै नतिजा फेला परेन' : 'No matching questions found'}
          </h4>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            {lang === 'ne' 
              ? 'कृपया फरक शब्द खोज्नुहोस् वा सिधै हाम्रो सदस्य सेवा केन्द्रमा सम्पर्क गर्नुहोस्।' 
              : 'Try using another keyword or speak directly to our customer care desk.'}
          </p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
            className="mt-4 px-4 py-1.5 bg-[#146B45] text-white text-xs font-semibold rounded-lg"
          >
            {lang === 'ne' ? 'सबै प्रश्नहरू हेर्नुहोस्' : 'Reset Search Filters'}
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredFAQs.map((faq, index) => {
            const isOpen = expandedId === faq.id;
            return (
              <div
                key={faq.id}
                className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
                  isOpen 
                    ? 'border-[#146B45] bg-white shadow-sm ring-1 ring-[#146B45]/20' 
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                {/* Accordion Trigger Header */}
                <button
                  type="button"
                  onClick={() => toggleAccordion(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-3 min-h-[52px]"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <span className="w-6 h-6 rounded-lg bg-[#F5F7F6] text-[#17324D] flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5 border border-slate-200">
                      {index + 1}
                    </span>
                    <div className="min-w-0">
                      <div className="mb-1">
                        {getCategoryBadge(faq.category)}
                      </div>
                      <h4 className="text-sm sm:text-base font-bold text-[#17324D] leading-snug">
                        {lang === 'ne' ? faq.question_ne : faq.question_en}
                      </h4>
                    </div>
                  </div>

                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors mt-0.5 ${
                    isOpen ? 'bg-[#146B45] text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {/* Collapsible Content Body */}
                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 animate-in fade-in duration-150">
                    <p className="bg-[#F5F7F6] p-4 rounded-xl border border-slate-200/80 text-slate-700 leading-relaxed font-sans">
                      {lang === 'ne' ? faq.answer_ne : faq.answer_en}
                    </p>

                    {/* Bullet Highlights / Checklist */}
                    {(faq.highlights_ne || faq.highlights_en) && (
                      <div className="mt-3.5 pl-1">
                        <div className="text-[11px] font-semibold text-[#17324D] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#146B45]" />
                          <span>{lang === 'ne' ? 'आवश्यक मुख्य बुँदाहरू:' : 'Key Information Checklist:'}</span>
                        </div>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          {(lang === 'ne' ? faq.highlights_ne : faq.highlights_en)?.map((point, pIdx) => (
                            <li key={pIdx} className="flex items-start gap-2 bg-white p-2 rounded-lg border border-slate-200/70">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#146B45] shrink-0 mt-1.5" />
                              <span className="text-slate-700">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Inquiry Helpline Callout Box */}
      <div className="bg-[#17324D] text-white rounded-2xl p-5 sm:p-7 border border-[#D6A63C]/30 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#D6A63C] uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>{lang === 'ne' ? 'अन्य कुनै प्रश्न वा थप जानकारी चाहिन्छ?' : 'Have specific questions not answered here?'}</span>
          </div>
          <h4 className="text-base sm:text-lg font-bold text-white">
            {lang === 'ne' 
              ? 'हाम्रो सदस्य सेवा कक्ष तपाईंको सहयोगका लागि सधैं तयार छ' 
              : 'Our cooperative helpdesk is at your service'}
          </h4>
          <p className="text-xs text-slate-300 max-w-xl">
            {lang === 'ne'
              ? 'कार्यालय समय (१०:०० - ५:००) मा प्रत्यक्ष फोन गर्नुहोस् वा अनलाइन सोधपुछ फारम भर्नुहोस्।'
              : 'Call our direct helpline +977-01-4880000 or submit an inquiry through our member desk.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <a
            href="tel:+977014880000"
            className="min-h-[42px] px-4 py-2 bg-[#146B45] hover:bg-[#105537] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#D6A63C]" />
            <span className="font-mono">+977-01-4880000</span>
          </a>
          {onNavigate && (
            <button
              onClick={() => onNavigate('contact')}
              className="min-h-[42px] px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl border border-white/20 transition-colors"
            >
              {lang === 'ne' ? 'अनलाइन सोधपुछ फारम' : 'Online Inquiry Form'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
