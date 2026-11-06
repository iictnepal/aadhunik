import React from 'react';
import { Language } from '../types';
import { CHAIRMAN_IMAGE } from '../data/cooperativeData';
import { Quote, CheckCircle2, Award } from 'lucide-react';

interface ChairmanMessageProps {
  lang: Language;
}

export const ChairmanMessage: React.FC<ChairmanMessageProps> = ({ lang }) => {
  return (
    <section className="py-14 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Chairman Image & Frame */}
          <div className="lg:col-span-5 flex flex-col items-center text-center">
            <div className="relative group">
              <div className="w-64 sm:w-72 md:w-80 h-72 sm:h-80 md:h-96 rounded-2xl overflow-hidden shadow-lg border-4 border-[#146B45]/20 bg-slate-100">
                <img
                  src={CHAIRMAN_IMAGE}
                  alt="Chairman Bishnu Prasad Shrestha"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-102"
                  referrerPolicy="no-referrer"
                />
              </div>
              {/* Badge overlay */}
              <div className="absolute -bottom-4 bg-[#17324D] text-white px-5 py-2 rounded-lg shadow-md border border-[#D6A63C]/30 text-xs">
                <span className="font-bold text-[#D6A63C]">{lang === 'ne' ? 'अध्यक्ष' : 'Chairman'}</span>
                <span className="mx-1.5 opacity-50">·</span>
                <span>{lang === 'ne' ? 'सञ्चालक समिति' : 'Board of Directors'}</span>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-bold text-[#17324D]">
                {lang === 'ne' ? 'विष्णु प्रसाद श्रेष्ठ' : 'Mr. Bishnu Prasad Shrestha'}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {lang === 'ne' ? 'अध्यक्ष, आधुनिक जन बचत तथा ऋण सहकारी संस्था लि.' : 'Chairman, Aadhunik Jana Saving & Credit Co-operative Ltd.'}
              </p>
            </div>
          </div>

          {/* Chairman's Message Text */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#146B45] mb-2 uppercase tracking-wider">
              <Quote className="w-4 h-4 text-[#D6A63C]" />
              <span>{lang === 'ne' ? 'अध्यक्षज्यूको सन्देश' : 'Message From The Chairman'}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-[#17324D] tracking-tight mb-5 leading-snug">
              {lang === 'ne' 
                ? 'विश्वास, पारदर्शिता र सामुदायिक समृद्धिको बलियो आधारशिला' 
                : 'Building Community Prosperity on Trust, Transparency & Mutual Help'}
            </h2>

            <div className="text-sm sm:text-base text-slate-600 space-y-4 leading-relaxed">
              <p>
                {lang === 'ne' ? (
                  <>
                    आधुनिक जन बचत तथा ऋण सहकारी संस्था लि. को आधिकारिक वेबसाइटमा सम्पूर्ण आदरणीय सेयर सदस्य, बचतकर्ता, उद्यमी तथा शुभचिन्तक महानुभावहरूमा हार्दिक नमन तथा न्यानो स्वागत व्यक्त गर्दछु।
                  </>
                ) : (
                  <>
                    On behalf of the Board of Directors, management, and staff of Aadhunik Jana Saving & Credit Co-operative Ltd., I extend my warmest greetings and heartfelt welcome to all our esteemed shareholder members, depositors, and well-wishers.
                  </>
                )}
              </p>

              <p>
                {lang === 'ne' ? (
                  <>
                    हाम्रो संस्था वि.सं. २०६५ मा स्थापना भएदेखि नै नागार्जुन क्षेत्रका बासिन्दाहरूको आर्थिक, सामाजिक तथा व्यावसायिक जीवनस्तर उकास्न निरन्तर समर्पित छ। हामीले स-साना बचतलाई संकलन गरी स्थानीय उद्यमशीलता, कृषि, शिक्षा र व्यापारमा सरल एवं सुलभ कर्जा लगानी गर्दै आइरहेका छौं। सहकारीको मूल मर्म "एकका लागि सबै र सबैका लागि एक" भन्ने भावनालाई आत्मसात् गर्दै सदस्यहरूको पुँजीको सुरक्षा हाम्रो पहिलो प्राथमिकता हो।
                  </>
                ) : (
                  <>
                    Since our establishment in 2065 B.S. in Nagarjun-4, Kathmandu, our cooperative has remained steadfastly committed to elevating the economic, social, and entrepreneurial wellbeing of our community. By mobilizing localized savings into accessible credit for micro-enterprises, modern farming, and education, we have transformed household resilience.
                  </>
                )}
              </p>

              <p>
                {lang === 'ne' ? (
                  <>
                    आजको आधुनिक युगमा हामी सूचना प्रविधिमैत्री सेवा, सुरक्षित बैंकिङ प्रणाली र पारदर्शी वित्तीय कारोबार मार्फत तपाईंको भरोसालाई अझ उच्च बनाउन कटिबद्ध छौं। यहाँहरूको निरन्तर सहयोग, सुझाव र सहभागिताको उच्च सम्मान गर्दछौं।
                  </>
                ) : (
                  <>
                    Embracing modern financial governance and digital member services, we assure you of stringent capital safety, transparent audits, and member-first care. We look forward to your continuous partnership in fostering financial self-reliance.
                  </>
                )}
              </p>
            </div>

            {/* Core Values checklist */}
            <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-[#146B45] shrink-0" />
                <span>{lang === 'ne' ? '१००% पारदर्शी तथा नियमित अडिट' : '100% Transparent & Regularly Audited'}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-[#146B45] shrink-0" />
                <span>{lang === 'ne' ? 'आकर्षक ब्याजदर र सुरक्षित निक्षेप' : 'Competitive Interest & Safe Deposits'}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-[#146B45] shrink-0" />
                <span>{lang === 'ne' ? 'सुलभ कर्जा र सरल प्रक्रिया' : 'Low-Fee Credit & Streamlined Processing'}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-[#146B45] shrink-0" />
                <span>{lang === 'ne' ? 'डिजिटल सदस्य पासबुक तथा पोर्टल' : 'Digital Member Passbook & Portal'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
