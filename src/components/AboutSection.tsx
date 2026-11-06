import React, { useState } from 'react';
import { BoardMember, Language, ActiveView } from '../types';
import { BUILDING_IMAGE, COMMUNITY_IMAGE } from '../data/cooperativeData';
import { FAQSection } from './FAQSection';
import { Target, Compass, Heart, Users, Award, Shield, Phone, ChevronRight, HelpCircle } from 'lucide-react';

interface AboutSectionProps {
  lang: Language;
  boardMembers: BoardMember[];
  onNavigate?: (view: ActiveView) => void;
  defaultSubTab?: 'profile' | 'team' | 'faq';
}

export const AboutSection: React.FC<AboutSectionProps> = ({ 
  lang, 
  boardMembers, 
  onNavigate,
  defaultSubTab = 'profile'
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'profile' | 'team' | 'faq'>(defaultSubTab);

  const board = boardMembers.filter(m => m.role_group === 'board');
  const accountCommittee = boardMembers.filter(m => m.role_group === 'account');
  const management = boardMembers.filter(m => m.role_group === 'management');

  return (
    <section className="py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-semibold text-[#146B45] uppercase tracking-wider">
            {lang === 'ne' ? 'हाम्रो परिचय, संरचना तथा सेवा सम्बन्धी जानकारी' : 'Institutional Overview, Leadership & Member Guidance'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#17324D] mt-1 tracking-tight">
            {lang === 'ne' 
              ? 'आधुनिक जन बचत तथा ऋण सहकारी संस्था लि.' 
              : 'Aadhunik Jana Saving & Credit Co-operative Ltd.'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            {lang === 'ne'
              ? 'नागार्जुन-४, काठमाडौँमा वि.सं. २०६५ मा विधिवत दर्ता भई सञ्चालित एक भरपर्दो एवं समुदाय-केन्द्रित वित्तीय संस्था।'
              : 'Registered in 2065 B.S. in Nagarjun-4, Kathmandu, fostering financial stability and collective progress.'}
          </p>

          {/* Sub Navigation - Responsive on mobile */}
          <div className="flex flex-col sm:flex-row w-full sm:w-auto sm:inline-flex items-stretch sm:items-center p-1 bg-slate-100 rounded-xl mt-6 gap-1 sm:gap-0 border border-slate-200/60 shadow-2xs">
            <button
              onClick={() => setActiveSubTab('profile')}
              className={`flex-1 sm:flex-none px-4 sm:px-5 py-2.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors text-center ${
                activeSubTab === 'profile'
                  ? 'bg-white text-[#17324D] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {lang === 'ne' ? 'इतिहास, दृष्टिकोण र मूल्यमान्यता' : 'History & Values'}
            </button>
            <button
              onClick={() => setActiveSubTab('team')}
              className={`flex-1 sm:flex-none px-4 sm:px-5 py-2.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors text-center ${
                activeSubTab === 'team'
                  ? 'bg-white text-[#17324D] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {lang === 'ne' ? 'सञ्चालक समिति तथा टिम' : 'Board & Leadership'}
            </button>
            <button
              onClick={() => setActiveSubTab('faq')}
              className={`flex-1 sm:flex-none px-4 sm:px-5 py-2.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors text-center flex items-center justify-center gap-1.5 ${
                activeSubTab === 'faq'
                  ? 'bg-[#146B45] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{lang === 'ne' ? 'सोधिने प्रश्नहरू (FAQs)' : 'FAQs'}</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Profile & Vision */}
        {activeSubTab === 'profile' && (
          <div className="space-y-14">
            {/* Split Story Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7 space-y-4 text-sm text-slate-700 leading-relaxed">
                <h3 className="text-xl font-bold text-[#17324D]">
                  {lang === 'ne' ? 'हाम्रो गौरवमय इतिहास र यात्रा' : 'Our Legacy & Commitment Since 2065 B.S.'}
                </h3>
                <p>
                  {lang === 'ne' ? (
                    <>
                      आधुनिक जन बचत तथा ऋण सहकारी संस्था लि. को स्थापना वि.सं. २०६५ सालमा काठमाडौँको नागार्जुन नगरपालिका (साविक सीतापाइला गा.वि.स.) मा समुदायका जागरुक, पेशाकर्मी तथा उद्यमीहरूको अग्रसरतामा भएको हो। प्रारम्भिक चरणमा सानो पुँजीबाट सुरु भएको यो संस्था आज नागार्जुन क्षेत्रकै एक विश्वसनीय, पारदर्शी र आर्थिक रूपमा सबल वित्तीय संस्थाको रूपमा स्थापित भएको छ।
                    </>
                  ) : (
                    <>
                      Aadhunik Jana Saving & Credit Co-operative Ltd. was founded in 2065 B.S. in Nagarjun Municipality-4 (formerly Sitapaila), Kathmandu, by vision-driven local professionals and entrepreneurs. From modest beginnings, it has evolved into a cornerstone of community financial resilience, with thousands of empowered member households.
                    </>
                  )}
                </p>
                <p>
                  {lang === 'ne' ? (
                    <>
                      हामी सहकारीका सात अन्तर्राष्ट्रिय सिद्धान्तहरू, सहकारी ऐन तथा नेपाल राष्ट्र बैंक र सहकारी विभागका निर्देशनहरूलाई पूर्ण परिपालना गर्दै सदस्यहरूको निक्षेपलाई सुरक्षित र लाभदायी बनाउन प्रतिबद्ध छौं।
                    </>
                  ) : (
                    <>
                      Upholding the international cooperative principles and regulatory directives from the Department of Cooperatives, we safeguard member savings and disburse credit prudently to promote productive local enterprises.
                    </>
                  )}
                </p>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-2xl overflow-hidden shadow-md border border-slate-200">
                  <img
                    src={BUILDING_IMAGE}
                    alt="Aadhunik Jana Building Nagarjun"
                    className="w-full h-64 object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="p-4 bg-[#17324D] text-white text-xs flex justify-between items-center">
                    <span>{lang === 'ne' ? 'मुख्य कार्यालय, नागार्जुन-४, काठमाडौँ' : 'Corporate HQ, Nagarjun-4, Kathmandu'}</span>
                    <span className="font-mono text-[#D6A63C]">Reg: 1024/065/066</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Vision, Mission, Objectives Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Vision */}
              <div className="bg-[#F5F7F6] rounded-xl p-6 border border-slate-200">
                <div className="w-10 h-10 rounded-lg bg-[#146B45]/10 flex items-center justify-center mb-4">
                  <Target className="w-5 h-5 text-[#146B45]" />
                </div>
                <h4 className="text-base font-bold text-[#17324D] mb-2">
                  {lang === 'ne' ? 'दूरदृष्टि (Vision)' : 'Our Vision'}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {lang === 'ne'
                    ? 'नागार्जुन क्षेत्र तथा काठमाडौँ उपत्यकाकै एक अग्रणी, प्रविधिमैत्री र समुदायको पहिलो रोजाइको सुरक्षित वित्तीय सहकारी संस्था बन्ने।'
                    : 'To be the premier, technology-driven, and member-trusted financial cooperative fostering community self-reliance in Kathmandu.'}
                </p>
              </div>

              {/* Mission */}
              <div className="bg-[#F5F7F6] rounded-xl p-6 border border-slate-200">
                <div className="w-10 h-10 rounded-lg bg-[#17324D]/10 flex items-center justify-center mb-4">
                  <Compass className="w-5 h-5 text-[#17324D]" />
                </div>
                <h4 className="text-base font-bold text-[#17324D] mb-2">
                  {lang === 'ne' ? 'ध्येय (Mission)' : 'Our Mission'}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {lang === 'ne'
                    ? 'सदस्यहरूको पुँजीको उच्चतम सुरक्षा, प्रतिस्पर्धी प्रतिफल र सरल कर्जा लगानी मार्फत स्थानीय उद्यमशीलता र दिगो जीवनस्तर विकास गर्ने।'
                    : 'Delivering secure savings, accessible micro-credit, and exemplary cooperative governance to advance socio-economic upliftment.'}
                </p>
              </div>

              {/* Core Values */}
              <div className="bg-[#F5F7F6] rounded-xl p-6 border border-slate-200">
                <div className="w-10 h-10 rounded-lg bg-[#D6A63C]/15 flex items-center justify-center mb-4">
                  <Heart className="w-5 h-5 text-amber-700" />
                </div>
                <h4 className="text-base font-bold text-[#17324D] mb-2">
                  {lang === 'ne' ? 'मूल मान्यता (Core Values)' : 'Core Values'}
                </h4>
                <ul className="text-xs text-slate-600 space-y-1.5">
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#146B45]" />
                    <span>{lang === 'ne' ? 'पारदर्शिता र जवाफदेहिता' : 'Transparency & Accountability'}</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#146B45]" />
                    <span>{lang === 'ne' ? 'पारस्परिक सहयोग र समानता' : 'Mutual Self-Help & Equality'}</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#146B45]" />
                    <span>{lang === 'ne' ? 'सदस्य-केन्द्रित सेवा' : 'Member-First Stewardship'}</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#146B45]" />
                    <span>{lang === 'ne' ? 'सामाजिक उत्तरदायित्व' : 'Social Responsibility'}</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Quick Link to FAQs Banner */}
            <div className="p-5 sm:p-6 bg-[#F5F7F6] rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#146B45]/10 text-[#146B45] flex items-center justify-center shrink-0">
                  <HelpCircle className="w-5 h-5 text-[#146B45]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#17324D]">
                    {lang === 'ne' ? 'संस्थाको सदस्यता, बचत वा कर्जा सम्बन्धी कुनै जिज्ञासा छ?' : 'Questions about membership, loans, or savings returns?'}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {lang === 'ne' ? 'हाम्रा सामान्य प्रश्नोत्तर (FAQs) हेर्नुहोस् र तुरुन्तै आवश्यक जानकारी प्राप्त गर्नुहोस्।' : 'Explore our comprehensive Frequently Asked Questions for quick answers.'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setActiveSubTab('faq');
                  window.scrollTo({ top: 120, behavior: 'smooth' });
                }}
                className="px-4 py-2 bg-[#146B45] hover:bg-[#105537] text-white text-xs font-semibold rounded-lg shrink-0 flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
              >
                <span>{lang === 'ne' ? 'प्रश्नोत्तर (FAQ) हेर्नुहोस्' : 'Explore FAQs'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Board & Management Team */}
        {activeSubTab === 'team' && (
          <div className="space-y-12">
            {/* Board of Directors */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Award className="w-5 h-5 text-[#146B45]" />
                <h3 className="text-lg font-bold text-[#17324D]">
                  {lang === 'ne' ? 'सञ्चालक समिति (Board of Directors)' : 'Board of Directors'}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {board.map((m) => (
                  <div
                    key={m.id}
                    className="bg-[#F5F7F6] border border-slate-200 rounded-xl p-5 flex items-center gap-4 hover:shadow-xs transition-shadow"
                  >
                    <div className="w-14 h-14 rounded-full bg-slate-300 overflow-hidden shrink-0 border-2 border-white shadow-xs">
                      {m.photo ? (
                        <img 
                          src={m.photo} 
                          alt={m.name_en} 
                          className="w-full h-full object-cover" 
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-bold text-slate-500 text-lg bg-slate-200">
                          {m.name_en.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#17324D]">
                        {lang === 'ne' ? m.name_ne : m.name_en}
                      </h4>
                      <p className="text-xs font-semibold text-[#146B45]">
                        {lang === 'ne' ? m.designation_ne : m.designation_en}
                      </p>
                      {m.phone && (
                        <p className="text-[11px] text-slate-500 font-mono mt-1 flex items-center gap-1">
                          <Phone className="w-3 h-3 text-slate-400" />
                          <span>{m.phone}</span>
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Account Supervision & Management */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-slate-200">
              {/* Account Committee */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="w-4 h-4 text-[#17324D]" />
                  <h4 className="text-base font-bold text-[#17324D]">
                    {lang === 'ne' ? 'लेखा सुपरीवेक्षण समिति' : 'Account Supervision Committee'}
                  </h4>
                </div>
                <div className="space-y-3">
                  {accountCommittee.map((m) => (
                    <div key={m.id} className="bg-[#F5F7F6] p-4 rounded-xl border border-slate-200">
                      <div className="text-sm font-bold text-[#17324D]">
                        {lang === 'ne' ? m.name_ne : m.name_en}
                      </div>
                      <div className="text-xs text-[#146B45] font-medium">
                        {lang === 'ne' ? m.designation_ne : m.designation_en}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Management Team */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-4 h-4 text-[#146B45]" />
                  <h4 className="text-base font-bold text-[#17324D]">
                    {lang === 'ne' ? 'प्रमुख कार्यकारी तथा व्यवस्थापन' : 'Management & Key Staff'}
                  </h4>
                </div>
                <div className="space-y-3">
                  {management.map((m) => (
                    <div key={m.id} className="bg-[#F5F7F6] p-4 rounded-xl border border-slate-200">
                      <div className="text-sm font-bold text-[#17324D]">
                        {lang === 'ne' ? m.name_ne : m.name_en}
                      </div>
                      <div className="text-xs text-[#17324D] font-semibold">
                        {lang === 'ne' ? m.designation_ne : m.designation_en}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Link to FAQs Banner */}
            <div className="p-5 sm:p-6 bg-[#F5F7F6] rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#146B45]/10 text-[#146B45] flex items-center justify-center shrink-0">
                  <HelpCircle className="w-5 h-5 text-[#146B45]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#17324D]">
                    {lang === 'ne' ? 'सदस्यता, कर्जा वा बचत सम्बन्धी कुनै प्रश्न छ?' : 'Have questions about membership, loans, or savings?'}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {lang === 'ne' ? 'हाम्रा सामान्य प्रश्नोत्तर (FAQs) हेर्नुहोस् र तुरुन्तै जानकारी पाउनुहोस्।' : 'Browse our Frequently Asked Questions section for clear guidelines.'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setActiveSubTab('faq');
                  window.scrollTo({ top: 120, behavior: 'smooth' });
                }}
                className="px-4 py-2 bg-[#146B45] hover:bg-[#105537] text-white text-xs font-semibold rounded-lg shrink-0 flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
              >
                <span>{lang === 'ne' ? 'प्रश्नोत्तर (FAQ) हेर्नुहोस्' : 'Explore FAQs'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Frequently Asked Questions (FAQ) */}
        {activeSubTab === 'faq' && (
          <div className="pt-2 animate-in fade-in duration-200">
            <FAQSection lang={lang} onNavigate={onNavigate} />
          </div>
        )}
      </div>
    </section>
  );
};
