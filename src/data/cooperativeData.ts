import { 
  SavingsProduct, 
  LoanProduct, 
  Notice, 
  BoardMember, 
  DownloadItem, 
  GalleryItem, 
  MemberProfile, 
  MemberTransaction,
  ContactMessage,
  MemberRequest,
  AuditLogItem
} from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_cooperative_kathmandu_1793976732868.jpg';
export const CHAIRMAN_IMAGE = '/src/assets/images/chairman_portrait_1793976734449.jpg';
export const COMMUNITY_IMAGE = '/src/assets/images/community_empowerment_1793976734211.jpg';
export const BUILDING_IMAGE = '/src/assets/images/cooperative_building_1793976734788.jpg';

export const INITIAL_SAVINGS_PRODUCTS: SavingsProduct[] = [
  {
    id: 1,
    slug: 'regular-savings',
    name_en: 'Regular Savings Account',
    name_ne: 'साधारण बचत खाता',
    interest_rate: 7.50,
    min_balance: 500,
    interest_payout_en: 'Quarterly',
    interest_payout_ne: 'त्रैमासिक',
    summary_en: 'Flexible daily transaction savings account designed for steady liquidity and financial peace of mind.',
    summary_ne: 'दैनिक कारोबार तथा सहज तरलताका लागि तयार गरिएको सर्वसुलभ एवं भरपर्दो बचत खाता।',
    features_en: ['Free Cheque Book upon request', 'Instant SMS Banking Alerts', 'Unlimited Deposits and Withdrawals', 'Nominee Facility available'],
    features_ne: ['निःशुल्क चेकबुक सुविधा', 'तत्काल एसएमएस सूचना अलर्ट', 'असीमित जम्मा तथा झिक्ने सुविधा', 'इच्छाइएको व्यक्ति (हकवाला) व्यवस्था'],
    icon: 'Wallet'
  },
  {
    id: 2,
    slug: 'fixed-deposit',
    name_en: 'Fixed Term Deposit (Muddati)',
    name_ne: 'आवधिक मुद्दती बचत योजना',
    interest_rate: 10.50,
    min_balance: 25000,
    interest_payout_en: 'Quarterly / At Maturity',
    interest_payout_ne: 'त्रैमासिक वा अवधि भुक्तानी',
    summary_en: 'Highest-yield guaranteed savings from 3 months to 5 years for secure wealth compounding.',
    summary_ne: '३ महिनादेखि ५ वर्षसम्मको अवधिमा निश्चित तथा अधिकतम प्रतिफल प्राप्त हुने उच्च बचत योजना।',
    features_en: ['Loan against FD up to 90%', 'Flexible tenure (3 mo - 5 yrs)', 'Automatic rollover option', 'Premature withdrawal provision'],
    features_ne: ['मुद्दती रसिद धितोमा ९०% सम्म कर्जा', 'लचिलो अवधि (३ महिनादेखि ५ वर्ष)', 'स्वतः नवीकरण सुविधा', 'समय अगावै भुक्तानी लिन सकिने'],
    icon: 'PiggyBank'
  },
  {
    id: 3,
    slug: 'monthly-savings',
    name_en: 'Monthly Recurring Savings',
    name_ne: 'मासिक क्रमिक बचत',
    interest_rate: 8.50,
    min_balance: 1000,
    interest_payout_en: 'Quarterly',
    interest_payout_ne: 'त्रैमासिक',
    summary_en: 'Disciplined monthly installment savings for salaried employees, teachers, and small shopkeepers.',
    summary_ne: 'जागिरदार, शिक्षक, कर्मचारी तथा साना व्यापारीहरूका लागि नियमित बचत गर्ने बानी बसाल्ने योजना।',
    features_en: ['Fixed monthly deposit schedule', 'Special bonus on timely installments', 'Tenure from 1 to 5 years', 'Can be linked with loan facility'],
    features_ne: ['मासिक निश्चित रकम जम्मा तालिका', 'नियमित किस्ता तिरेमा विशेष बोनस', '१ देखि ५ वर्षसम्मको अवधि', 'कर्जा सुविधासँग आबद्ध गर्न सकिने'],
    icon: 'Calendar'
  },
  {
    id: 4,
    slug: 'children-savings',
    name_en: 'Bal Bachat (Children Savings)',
    name_ne: 'बाल बचत खाता',
    interest_rate: 8.75,
    min_balance: 500,
    interest_payout_en: 'Quarterly',
    interest_payout_ne: 'त्रैमासिक',
    summary_en: 'Nurturing the habit of thrift from childhood to ensure bright future and higher educational security.',
    summary_ne: 'बाल्यकालदेखि नै बचत गर्ने संस्कार सिकाउँदै उच्च शिक्षा र उज्ज्वल भविष्य सुनिश्चित गर्ने योजना।',
    features_en: ['Free attractive piggy bank at account opening', 'Birthday congratulations cash gift', 'Operated by legal guardian', 'Special education counselling'],
    features_ne: ['खाता खोल्दा निःशुल्क खुत्रुके उपहार', 'जन्मदिनमा विशेष नगद शुभकामना', 'अभिभावकद्वारा सञ्चालन गरिने', 'उच्च शिक्षाका लागि विशेष परामर्श'],
    icon: 'Baby'
  },
  {
    id: 5,
    slug: 'senior-citizen-savings',
    name_en: 'Jestha Nagarik (Senior Citizen) Savings',
    name_ne: 'ज्येष्ठ नागरिक सम्मान बचत',
    interest_rate: 9.00,
    min_balance: 1000,
    interest_payout_en: 'Monthly',
    interest_payout_ne: 'मासिक',
    summary_en: 'Respectful financial security with monthly interest credit for citizens aged 60 and above.',
    summary_ne: '६० वर्ष नाघेका आदरणीय ज्येष्ठ नागरिकहरूलाई मासिक ब्याज भुक्तानी सहितको सम्मान बचत सेवा।',
    features_en: ['Direct monthly interest payout', 'Doorstep document assistance on request', 'Priority counter queue', 'Free annual health checkup camp'],
    features_ne: ['प्रत्येक महिना नियमित ब्याज भुक्तानी', 'अनुरोधमा घरदैलो सेवा सुविधा', 'काउन्टरमा पहिलो प्राथमिकता', 'वार्षिक निःशुल्क स्वास्थ्य परीक्षण'],
    icon: 'HeartHandshake'
  },
  {
    id: 6,
    slug: 'special-business-savings',
    name_en: 'Special Merchant Savings',
    name_ne: 'विशेष व्यापारिक बचत',
    interest_rate: 8.00,
    min_balance: 5000,
    interest_payout_en: 'Quarterly',
    interest_payout_ne: 'त्रैमासिक',
    summary_en: 'Designed specifically for local entrepreneurs, grocery stores, and workshops requiring dynamic limits.',
    summary_ne: 'स्थानीय उद्यमी, पसल, वर्कसप तथा फर्महरूका लागि उच्च कारोबार सीमासहितको विशेष खाता।',
    features_en: ['High daily transaction allowance', 'Complimentary monthly statements', 'QR payment integration assistance', 'Fast-track loan assessment'],
    features_ne: ['उच्च दैनिक कारोबार सीमा', 'निःशुल्क मासिक स्टेटमेन्ट', 'क्यूआर भुक्तानी सहजीकरण', 'द्रुत कर्जा प्रक्रिया'],
    icon: 'Briefcase'
  }
];

export const INITIAL_LOAN_PRODUCTS: LoanProduct[] = [
  {
    id: 1,
    slug: 'business-loan',
    name_en: 'Small Business & Trade Loan',
    name_ne: 'साना व्यवसाय तथा व्यापार कर्जा',
    interest_rate: 12.50,
    max_tenure_months: 60,
    service_charge: 1.00,
    summary_en: 'Working capital and asset expansion financing for registered enterprises and retail shops in Kathmandu.',
    summary_ne: 'काठमाडौँ उपत्यकाभित्र दर्ता भएका व्यापार तथा पसलहरूको चालु पुँजी र व्यवसाय विस्तारका लागि।',
    requirements_en: ['Valid Business Registration & PAN/VAT', 'Tax clearance certificate', 'Real estate collateral valuation', 'Member guarantee and KYC'],
    requirements_ne: ['व्यवसाय दर्ता तथा स्थायी लेखा नं (प्यान/भ्याट)', 'अद्यावधिक कर चुक्ता प्रमाणपत्र', 'धितो राखिने घर/जग्गाको मूल्याङ्कन', 'संस्थाका २ जना सदस्यको व्यक्तिगत जमानी'],
    icon: 'Store'
  },
  {
    id: 2,
    slug: 'agriculture-loan',
    name_en: 'Agricultural & Livestock Loan',
    name_ne: 'कृषि तथा पशुपालन कर्जा',
    interest_rate: 11.50,
    max_tenure_months: 48,
    service_charge: 0.75,
    summary_en: 'Subsidized credit for vegetable tunnels, organic farming, poultry, dairy cattle, and modern agro-tools.',
    summary_ne: 'तरकारी टनेल खेती, अर्गानिक कृषि, कुखुरापालन, गाईभैँसी पालन तथा आधुनिक कृषि औजारका लागि सहुलियत कर्जा।',
    requirements_en: ['Land ownership certificate (Lalpurja)', 'Clear agricultural business plan', 'Local ward recommendation', 'Cooperative membership of 3+ months'],
    requirements_ne: ['जग्गाधनी प्रमाणपुर्जा (लालपुर्जा)', 'स्पष्ट कृषि व्यवसाय योजना', 'सम्बन्धित वडा कार्यालयको सिफारिस', 'कम्तीमा ३ महिनाको संस्थागत सदस्यता'],
    icon: 'Sprout'
  },
  {
    id: 3,
    slug: 'emergency-loan',
    name_en: 'Instant Emergency Relief Loan',
    name_ne: 'आकस्मिक राहत कर्जा',
    interest_rate: 12.00,
    max_tenure_months: 12,
    service_charge: 0.50,
    summary_en: 'Immediate disbursement within 24 hours for urgent medical expenses, hospitalizations, or family crises.',
    summary_ne: 'स्वास्थ्य उपचार, आकस्मिक अस्पताल भर्ना वा अप्रत्याशित संकटमा २४ घण्टाभित्रै उपलब्ध हुने तत्काल कर्जा।',
    requirements_en: ['Active regular savings record for 6 months', 'Hospital bill or emergency proof', 'Immediate member guarantee', 'Simplified single-page application'],
    requirements_ne: ['कम्तीमा ६ महिनाको नियमित बचत रेकर्ड', 'अस्पताल बिल वा संकट पुष्टि कागजात', 'सक्रिय सदस्यको सिफारिस र जमानी', 'सरल एक-पाने आवेदन'],
    icon: 'ShieldAlert'
  },
  {
    id: 4,
    slug: 'education-loan',
    name_en: 'Higher Education Loan',
    name_ne: 'उच्च शिक्षा तथा प्राविधिक कर्जा',
    interest_rate: 11.00,
    max_tenure_months: 84,
    service_charge: 1.00,
    summary_en: 'Supporting members children pursuing medical, engineering, IT, and university studies in Nepal and abroad.',
    summary_ne: 'सदस्यहरूका छोराछोरीलाई स्वदेश तथा विदेशमा चिकित्सा, इन्जिनियरिङ, आईटी तथा उच्च अध्ययन गर्न सहयोग।',
    requirements_en: ['College/University admission letter', 'Academic transcripts and fee estimate', 'Parental guarantee and income documentation', 'Collateral assessment report'],
    requirements_ne: ['कलेज/विश्वविद्यालयको भर्ना स्वीकृति पत्र', 'शैक्षिक प्रमाणपत्र तथा शुल्क विवरण', 'अभिभावकको जमानी र आयस्रोत कागजात', 'धितो मूल्याङ्कन प्रतिवेदन'],
    icon: 'GraduationCap'
  },
  {
    id: 5,
    slug: 'housing-loan',
    name_en: 'Home Construction & Renovation Loan',
    name_ne: 'घर निर्माण तथा मर्मत कर्जा',
    interest_rate: 13.00,
    max_tenure_months: 120,
    service_charge: 1.00,
    summary_en: 'Affordable long-term financing for building a dream home, purchasing land, or upgrading apartments in Nagarjun.',
    summary_ne: 'नागार्जुन क्षेत्रमा नयाँ घर निर्माण, जग्गा खरिद वा पुरानो घरको मर्मत सम्भारका लागि सुलभ दीर्घकालीन कर्जा।',
    requirements_en: ['Approved municipality architectural blueprint', 'Lalpurja and four-boundary certificate', 'Verified household income proof', '10 to 15 years flexible repayment'],
    requirements_ne: ['नगरपालिकाबाट स्वीकृत नक्सा पास कागजात', 'लालपुर्जा, नापी नक्सा र चारकिल्ला प्रमाणित', 'पारिवारिक आम्दानीको प्रमाणित स्रोत', '१० देखि १५ वर्षसम्मको लचिलो भुक्तानी'],
    icon: 'Home'
  }
];

export const INITIAL_NOTICES: Notice[] = [
  {
    id: 1,
    category: 'agm',
    title_en: 'Notice of 16th Annual General Meeting (AGM)',
    title_ne: 'संस्थाको १६ औं वार्षिक साधारण सभा सम्बन्धी अत्यन्त जरुरी सूचना',
    content_en: 'Respected shareholder members of Aadhunik Jana Saving & Credit Co-operative Ltd. are cordially requested to attend the 16th Annual General Meeting on Saturday, Mangsir 20, 2083 at Nagarjun Community Hall, Sitapaila, Kathmandu. Key agendas include discussion on FY 2081/82 audited financial statements, distribution of dividends, and approval of upcoming fiscal year budgets.',
    content_ne: 'आधुनिक जन बचत तथा ऋण सहकारी संस्था लि. का सम्पूर्ण आदरणीय सेयर सदस्यज्यूहरूमा संस्थाको १६ औं वार्षिक साधारण सभा यही मिति २०८३ मंसिर २० गते शनिबार बिहान ११:०० बजे नागार्जुन सामुदायिक भवन, सीतापाइला, काठमाडौँमा आयोजना गरिने भएकाले सम्पूर्ण सदस्यज्यूहरूलाई उपस्थित भई संस्थाको आ.व. २०८१/८२ को लेखापरीक्षण प्रतिवेदन, लाभांश वितरण तथा आगामी कार्यदिशामा छलफल गर्न हार्दिक निमन्त्रणा गर्दछौं।',
    published_date: '2026-10-15',
    is_popup: true,
    is_featured: true,
    file_name: 'agm_16th_notice_agenda.pdf',
    views_count: 842
  },
  {
    id: 2,
    category: 'financial',
    title_en: 'Unaudited Financial Indicators for 1st Quarter Published',
    title_ne: 'चालु आ.व. को प्रथम त्रैमासिक वित्तीय सूचकाङ्क प्रकाशन सम्बन्धमा',
    content_en: 'Pursuant to the Department of Cooperatives disclosure norms, the unaudited financial highlights for the first quarter of the current fiscal year have been officially published. Key figures: Total Share Capital: NPR 18.42 Crore, Total Deposits: NPR 1.12 Arba, Total Loan Investment: NPR 98.6 Crore, Capital Adequacy: 16.4%.',
    content_ne: 'सहकारी विभागको निर्देशन तथा वित्तीय सुशासन मापदण्ड अनुसार संस्थाको चालु आर्थिक वर्षको प्रथम त्रैमासिक वित्तीय विवरण सार्वजनिक गरिएको छ। जसअनुसार कुल सेयर पुँजी रु. १८ करोड ४२ लाख, कुल बचत निक्षेप रु. १ अर्ब १२ करोड तथा कर्जा लगानी रु. ९८ करोड ६० लाख पुगेको छ।',
    published_date: '2026-10-01',
    is_popup: false,
    is_featured: true,
    file_name: 'financial_q1_disclosure.pdf',
    views_count: 520
  },
  {
    id: 3,
    category: 'holiday',
    title_en: 'Festive Office Closure and Counter Operations Notice',
    title_ne: 'बडादशैं तथा शुभ दीपावलीको पावन अवसरमा कार्यालय बिदा सम्बन्धी सूचना',
    content_en: 'On the auspicious occasion of Vijaya Dashami and Tihar 2083, our corporate office in Nagarjun-4 will remain closed from Ashwin 24 to Kartik 02. Member digital inquiry and emergency helpline will remain operational.',
    content_ne: 'विजयादशमी तथा शुभ दीपावली २०८३ को पावन अवसरमा संस्थाको मुख्य कार्यालय तथा काउन्टर सेवा मिति २०८३ असोज २४ गतेदेखि कात्तिक ०२ गतेसम्म बन्द रहने व्यहोरा जानकारी गराइन्छ। सदस्यहरूको सुविधाका लागि डिजिटल सोधपुछ तथा आपतकालीन हटलाइन चालु रहनेछ।',
    published_date: '2026-09-28',
    is_popup: false,
    is_featured: false,
    views_count: 310
  },
  {
    id: 4,
    category: 'member',
    title_en: 'Urgent Call for KYC and Member Information Updating',
    title_ne: 'सम्पूर्ण सदस्यज्यूहरूको ग्राहक पहिचान (KYC) अद्यावधिक गर्ने बारे',
    content_en: 'All cooperative members who have not re-validated their personal records or updated citizenship and family details within the last two years are requested to complete KYC verification either through the Member Portal or by visiting our Nagarjun counter.',
    content_ne: 'विगत २ वर्षदेखि आफ्नो व्यक्तिगत विवरण, नागरिकता प्रतिलिपि तथा ठेगाना अद्यावधिक नगर्नुभएका सम्पूर्ण सदस्य महानुभावहरूले संस्थाको सदस्य पोर्टल मार्फत वा कार्यालयमा उपस्थित भई अनिवार्य रूपमा KYC फारम भरी अद्यावधिक गरिदिनुहुन अनुरोध छ।',
    published_date: '2026-09-10',
    is_popup: false,
    is_featured: true,
    file_name: 'kyc_update_form_instructions.pdf',
    views_count: 674
  }
];

export const INITIAL_BOARD_MEMBERS: BoardMember[] = [
  {
    id: 1,
    name_en: 'Bishnu Prasad Shrestha',
    name_ne: 'विष्णु प्रसाद श्रेष्ठ',
    designation_en: 'Chairman',
    designation_ne: 'अध्यक्ष',
    role_group: 'board',
    phone: '+977-9851000001',
    photo: CHAIRMAN_IMAGE
  },
  {
    id: 2,
    name_en: 'Sita Devi Adhikari',
    name_ne: 'सीता देवी अधिकारी',
    designation_en: 'Vice Chairperson',
    designation_ne: 'उपाध्यक्ष',
    role_group: 'board',
    phone: '+977-9851000002'
  },
  {
    id: 3,
    name_en: 'Ramesh Kumar KC',
    name_ne: 'रमेश कुमार केसी',
    designation_en: 'Secretary',
    designation_ne: 'सचिव',
    role_group: 'board',
    phone: '+977-9851000003'
  },
  {
    id: 4,
    name_en: 'Dipendra Manandhar',
    name_ne: 'दिपेन्द्र मानन्धर',
    designation_en: 'Treasurer',
    designation_ne: 'कोषाध्यक्ष',
    role_group: 'board',
    phone: '+977-9851000004'
  },
  {
    id: 5,
    name_en: 'Gita Sharma',
    name_ne: 'गीता शर्मा',
    designation_en: 'Director / Board Member',
    designation_ne: 'सञ्चालक सदस्य',
    role_group: 'board',
    phone: '+977-9851000005'
  },
  {
    id: 6,
    name_en: 'Niranjan Khadka',
    name_ne: 'निरन्जन खड्का',
    designation_en: 'Account Committee Coordinator',
    designation_ne: 'लेखा सुपरीवेक्षण समिति संयोजक',
    role_group: 'account',
    phone: '+977-9851000006'
  },
  {
    id: 7,
    name_en: 'Prakash Raj Joshi',
    name_ne: 'प्रकाश राज जोशी',
    designation_en: 'General Manager / CEO',
    designation_ne: 'प्रमुख कार्यकारी अधिकृत / व्यवस्थापक',
    role_group: 'management',
    phone: '+977-9851000007'
  }
];

export const INITIAL_DOWNLOADS: DownloadItem[] = [
  {
    id: 1,
    category: 'forms',
    title_en: 'General Membership Application Form',
    title_ne: 'साधारण सदस्यता आवेदन फारम',
    file_size: '340 KB',
    file_format: 'PDF',
    download_count: 1420
  },
  {
    id: 2,
    category: 'forms',
    title_en: 'Know Your Customer (KYC) Detail Form',
    title_ne: 'ग्राहक पहिचान (KYC) विवरण फारम',
    file_size: '280 KB',
    file_format: 'PDF',
    download_count: 2190
  },
  {
    id: 3,
    category: 'forms',
    title_en: 'Cooperative Loan Application & Appraisal Dossier',
    title_ne: 'ऋण माग तथा धितो मूल्याङ्कन फारम',
    file_size: '490 KB',
    file_format: 'PDF',
    download_count: 980
  },
  {
    id: 4,
    category: 'reports',
    title_en: '15th Annual Report & Financial Statements (FY 2081/82)',
    title_ne: '१५ औं वार्षिक प्रतिवेदन तथा वित्तीय विवरण (आ.व. २०८१/८२)',
    file_size: '4.8 MB',
    file_format: 'PDF',
    download_count: 730
  },
  {
    id: 5,
    category: 'reports',
    title_en: 'Independent Auditor Report and Management Letter',
    title_ne: 'स्वतन्त्र लेखापरीक्षकको प्रतिवेदन तथा सुझाव पत्र',
    file_size: '2.6 MB',
    file_format: 'PDF',
    download_count: 450
  },
  {
    id: 6,
    category: 'bylaws',
    title_en: 'Cooperative Bye-laws & Credit Operation Directives',
    title_ne: 'संस्थाको विनियम तथा बचत-ऋण सञ्चालन कार्यविधि',
    file_size: '1.9 MB',
    file_format: 'PDF',
    download_count: 810
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 1,
    title_en: '15th Annual General Meeting Assembly at Nagarjun',
    title_ne: 'नागार्जुनमा सम्पन्न १५ औं वार्षिक साधारण सभा',
    category: 'agm',
    image_url: HERO_IMAGE
  },
  {
    id: 2,
    title_en: 'Community Women Micro-Enterprise Training',
    title_ne: 'स्थानीय महिला लघु उद्यमशीलता तालिम',
    category: 'trainings',
    image_url: COMMUNITY_IMAGE
  },
  {
    id: 3,
    title_en: 'Headquarters Building & Counter in Nagarjun-4',
    title_ne: 'नागार्जुन-४ स्थित संस्थाको मुख्य कार्यालय भवन',
    category: 'office',
    image_url: BUILDING_IMAGE
  },
  {
    id: 4,
    title_en: 'Annual Humanitarian Blood Donation Campaign',
    title_ne: 'सहकारी दिवसको अवसरमा आयोजित बृहत् रक्तदान कार्यक्रम',
    category: 'csr',
    image_url: COMMUNITY_IMAGE
  }
];

export const DEMO_MEMBER_PROFILE: MemberProfile = {
  member_code: 'AJ-10024',
  citizenship_no: '27-01-72-04821',
  full_name_en: 'Ram Bahadur Shrestha',
  full_name_ne: 'रामबहादुर श्रेष्ठ',
  father_name_en: 'Krishna Bahadur Shrestha',
  address_en: 'Nagarjun-4, Sitapaila, Kathmandu',
  address_ne: 'नागार्जुन-४, सीतापाइला, काठमाडौँ',
  phone: '9841234567',
  email: 'ram.shrestha@example.com',
  membership_date: '2069-04-12 B.S.',
  kyc_status: 'verified',
  share_count: 250,
  share_amount: 25000,
  savings_accounts: [
    {
      account_number: 'SB-01-002489',
      product_name_en: 'Regular Savings Account',
      product_name_ne: 'साधारण बचत खाता',
      balance: 84520.50,
      interest_rate: 7.50
    },
    {
      account_number: 'FD-03-000812',
      product_name_en: 'Fixed Deposit (1 Year)',
      product_name_ne: '१ वर्षे आवधिक मुद्दती बचत',
      balance: 300000.00,
      interest_rate: 10.50
    }
  ],
  active_loan: {
    loan_number: 'LN-2024-00194',
    product_name_en: 'Small Business & Trade Loan',
    product_name_ne: 'साना व्यवसाय तथा व्यापार कर्जा',
    principal: 500000,
    outstanding: 342150,
    monthly_emi: 16726,
    interest_rate: 12.50,
    next_due_date: '2026-11-25',
    schedule: [
      { month: 14, dueDate: '2026-09-25', installment: 16726, principal: 13165, interest: 3561, remainingBalance: 358876, status: 'paid' },
      { month: 15, dueDate: '2026-10-25', installment: 16726, principal: 13302, interest: 3424, remainingBalance: 345574, status: 'paid' },
      { month: 16, dueDate: '2026-11-25', installment: 16726, principal: 13424, interest: 3302, remainingBalance: 332150, status: 'upcoming' },
      { month: 17, dueDate: '2026-12-25', installment: 16726, principal: 13564, interest: 3162, remainingBalance: 318586, status: 'upcoming' }
    ]
  }
};

export const INITIAL_MEMBER_TRANSACTIONS: MemberTransaction[] = [
  {
    id: 'TXN-839201',
    account_number: 'SB-01-002489',
    date: '2026-11-01',
    type: 'credit',
    amount: 25000.00,
    balance_after: 84520.50,
    narration_en: 'Cash deposit at Nagarjun-4 counter',
    narration_ne: 'नागार्जुन-४ काउन्टरमा नगद जम्मा',
    method: 'Counter Cash'
  },
  {
    id: 'TXN-838112',
    account_number: 'SB-01-002489',
    date: '2026-10-15',
    type: 'credit',
    amount: 1540.50,
    balance_after: 59520.50,
    narration_en: 'Quarterly interest accrued and credited',
    narration_ne: 'त्रैमासिक बचत ब्याज जम्मा',
    method: 'Auto Interest'
  },
  {
    id: 'TXN-837409',
    account_number: 'SB-01-002489',
    date: '2026-10-04',
    type: 'debit',
    amount: 10000.00,
    balance_after: 57980.00,
    narration_en: 'Cheque withdrawal #004812',
    narration_ne: 'चेक नं ००४८१२ मार्फत भुक्तानी',
    method: 'Cheque'
  },
  {
    id: 'TXN-836102',
    account_number: 'SB-01-002489',
    date: '2026-09-25',
    type: 'debit',
    amount: 16726.00,
    balance_after: 67980.00,
    narration_en: 'Auto debit for Loan EMI installment #14',
    narration_ne: 'कर्जा किस्ता नं १४ बापत रकम कट्टी',
    method: 'Standing Order'
  }
];

export const INITIAL_CONTACT_MESSAGES: ContactMessage[] = [
  {
    id: 1,
    full_name: 'Narayan Prasad Gautam',
    email: 'narayan.gautam@gmail.com',
    phone: '9841882200',
    subject: 'Inquiry regarding Fixed Deposit Interest Rates for 3 Years',
    message: 'Namaste, I want to deposit NPR 500,000 for 3 years. Does the cooperative offer compound quarterly interest or monthly payout?',
    created_at: '2026-11-04 14:22',
    status: 'replied',
    admin_reply: 'Namaste Narayan Ji, for a 3-year term deposit we offer 10.50% p.a. with your choice of quarterly compound credit or direct monthly disbursement into your regular savings account. Please visit our Nagarjun counter with your citizenship copy.'
  },
  {
    id: 2,
    full_name: 'Sunita Maharjan',
    email: 'sunita.m@outlook.com',
    phone: '9851123499',
    subject: 'Women Entrepreneurship Loan Scheme Requirements',
    message: 'Hello, our group runs a handicraft tailoring enterprise in Nagarjun-4. We are looking for working capital of 3 Lakhs.',
    created_at: '2026-11-05 10:15',
    status: 'unread'
  }
];

export const INITIAL_MEMBER_REQUESTS: MemberRequest[] = [
  {
    id: 1,
    member_code: 'AJ-10024',
    member_name: 'Ram Bahadur Shrestha',
    type: 'profile_update',
    details: 'Requesting to update contact mobile number to 9841234567 and temporary address to Nagarjun-4, Sitapaila.',
    created_at: '2026-11-02 09:30',
    status: 'approved'
  },
  {
    id: 2,
    member_code: 'AJ-10024',
    member_name: 'Ram Bahadur Shrestha',
    type: 'kyc_update',
    details: '[KYC UPDATE] Submitted by Ram Bahadur Shrestha (AJ-10024). Citizen No: 27-01-72-04512, Dist: Kathmandu. Perm Addr: Nagarjun-4, Kathmandu. Nominee: Sita Shrestha (Wife). Document scans verified.',
    created_at: '2026-11-04 11:15',
    status: 'approved'
  },
  {
    id: 3,
    member_code: 'AJ-10024',
    member_name: 'Ram Bahadur Shrestha',
    type: 'cheque_book',
    details: 'Requesting a fresh 25-leaf Cheque Book for Regular Savings Account SB-01-002489.',
    created_at: '2026-11-05 15:40',
    status: 'pending'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: 1,
    timestamp: '2026-11-06 06:15:20',
    user: 'System Admin (admin)',
    action: 'LOGIN_SUCCESS',
    details: 'Administrative session authenticated from IP 127.0.0.1'
  },
  {
    id: 2,
    timestamp: '2026-11-05 16:30:10',
    user: 'Content Manager',
    action: 'NOTICE_PUBLISHED',
    details: 'Published 16th AGM Notice with popup modal trigger'
  },
  {
    id: 3,
    timestamp: '2026-11-04 11:20:45',
    user: 'Member (AJ-10024)',
    action: 'PORTAL_LOGIN',
    details: 'Member authenticated to view passbook and statement'
  }
];
