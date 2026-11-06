import React, { useState, useEffect } from 'react';
import { Language, ActiveView } from '../types';
import { HERO_IMAGE, BUILDING_IMAGE, COMMUNITY_IMAGE } from '../data/cooperativeData';
import { ChevronLeft, ChevronRight, ShieldCheck, ArrowRight, TrendingUp, Users, PiggyBank } from 'lucide-react';

interface HeroSliderProps {
  lang: Language;
  onNavigate: (view: ActiveView) => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ lang, onNavigate }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: HERO_IMAGE,
      badge_ne: 'समुदाय-आधारित भरपर्दो वित्तीय संस्था',
      badge_en: 'Trusted Community Financial Co-operative',
      title_ne: 'सबल बचत र सुलभ कर्जाका साथ तपाईंको आर्थिक समृद्धिको सहयात्री',
      title_en: 'Your Trusted Partner in Sustainable Savings & Accessible Credit',
      description_ne: 'नागार्जुन-४, काठमाडौँमा अवस्थित आधुनिक जन बचत तथा ऋण सहकारी संस्था लि. ले विगत १८ वर्षदेखि आफ्ना सेयर सदस्यहरूलाई सुरक्षित निक्षेप र आकर्षक ब्याजदर प्रदान गर्दै आइरहेको छ।',
      description_en: 'Located at Nagarjun-4, Kathmandu, Aadhunik Jana Saving & Credit Co-operative Ltd. provides secure deposits, attractive returns, and responsible credit facilities to empower our community.',
      primary_cta_ne: 'बचत योजनाहरू हेर्नुहोस्',
      primary_cta_en: 'Explore Savings Schemes',
      primary_view: 'savings' as ActiveView,
      secondary_cta_ne: 'कर्जा सुविधा',
      secondary_cta_en: 'Loan Facilities',
      secondary_view: 'loans' as ActiveView
    },
    {
      image: BUILDING_IMAGE,
      badge_ne: 'पारदर्शिता र आधुनिक वित्तीय सुशासन',
      badge_en: 'Transparency & Modern Financial Governance',
      title_ne: 'नागार्जुन क्षेत्रको अग्रणी आधुनिक सहकारी संस्था',
      title_en: 'Leading Modern Co-operative Institution in Nagarjun',
      description_ne: 'नियमित साधारण बचत, आवधिक मुद्दती, बालबचत तथा ज्येष्ठ नागरिक सम्मान बचत मार्फत सुरक्षित भविष्य सुनिश्चित गर्नुहोस्।',
      description_en: 'Secure your family financial future with our regular savings, fixed deposits, children bachat, and senior citizen priority accounts.',
      primary_cta_ne: 'हाम्रो बारेमा थप जान्नुहोस्',
      primary_cta_en: 'About Our Cooperative',
      primary_view: 'about' as ActiveView,
      secondary_cta_ne: 'कागजात डाउनलोड',
      secondary_cta_en: 'Download Forms',
      secondary_view: 'downloads' as ActiveView
    },
    {
      image: COMMUNITY_IMAGE,
      badge_ne: 'उद्यमी र स्थानीय व्यवसायको प्रोत्साहन',
      badge_en: 'Empowering Local Entrepreneurs & Micro-Enterprises',
      title_ne: 'कृषि, व्यापार र उद्यमशीलता विस्तारका लागि सहज कर्जा',
      title_en: 'Subsidized Loans for Agriculture, Retail & Entrepreneurship',
      description_ne: 'व्यवसाय विस्तार, कृषि आधुनिकीकरण तथा आकस्मिक राहत कर्जा न्यूनतम कागजी प्रक्रियामा २४ देखि ४८ घण्टाभित्र उपलब्ध।',
      description_en: 'Low-interest credit for small trade, organic agriculture, education, and emergency requirements processed swiftly within 24 to 48 hours.',
      primary_cta_ne: 'कर्जा क्यालकुलेटर चलाउनुहोस्',
      primary_cta_en: 'Try Loan EMI Calculator',
      primary_view: 'loans' as ActiveView,
      secondary_cta_ne: 'सम्पर्क गर्नुहोस्',
      secondary_cta_en: 'Contact Our Office',
      secondary_view: 'contact' as ActiveView
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[currentSlide];

  return (
    <div className="relative w-full bg-slate-900 overflow-hidden">
      {/* Background Image Carousel with measured contrast scrim */}
      <div className="relative min-h-[460px] sm:min-h-[520px] lg:min-h-[580px] w-full flex items-center">
        {slides.map((s, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <img
              src={s.image}
              alt="Aadhunik Jana Saving & Credit Co-operative"
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            {/* Measured contrast scrim: at least 4.5:1 text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-900/40" />
          </div>
        ))}

        {/* Content Container */}
        <div className="relative max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-8 py-12 sm:py-16 z-10">
          <div className="max-w-2xl text-white">
            {/* Unboxed Metadata Kicker (Anti-slop zero pill rule) */}
            <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold text-[#D6A63C] mb-2 sm:mb-3 uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span className="truncate">{lang === 'ne' ? slide.badge_ne : slide.badge_en}</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-300 normal-case shrink-0">{lang === 'ne' ? 'काठमाडौँ' : 'Kathmandu'}</span>
            </div>

            {/* Headline with text-wrap balance */}
            <h1 className="text-xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-white mb-3 sm:mb-4 leading-tight sm:leading-tight" style={{ textWrap: 'balance' }}>
              {lang === 'ne' ? slide.title_ne : slide.title_en}
            </h1>

            {/* Description */}
            <p className="text-xs sm:text-sm md:text-base text-slate-200 mb-6 sm:mb-8 leading-relaxed max-w-xl line-clamp-3 sm:line-clamp-none">
              {lang === 'ne' ? slide.description_ne : slide.description_en}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
              <button
                onClick={() => onNavigate(slide.primary_view)}
                className="min-h-[44px] px-5 py-2.5 bg-[#146B45] hover:bg-[#0f5436] active:bg-[#0c452c] text-white text-xs sm:text-sm font-semibold rounded-lg shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>{lang === 'ne' ? slide.primary_cta_ne : slide.primary_cta_en}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate(slide.secondary_view)}
                className="min-h-[44px] px-5 py-2.5 bg-white/10 hover:bg-white/20 active:bg-white/30 text-white border border-white/25 text-xs sm:text-sm font-semibold rounded-lg transition-colors flex items-center justify-center"
              >
                {lang === 'ne' ? slide.secondary_cta_ne : slide.secondary_cta_en}
              </button>
            </div>
          </div>
        </div>

        {/* Slide Controls */}
        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
            aria-label="Previous slide"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center border border-white/20 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <div className="flex items-center gap-1 sm:gap-1.5 px-1 sm:px-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 sm:h-2 rounded-full transition-all ${
                  i === currentSlide ? 'w-5 sm:w-6 bg-[#D6A63C]' : 'w-1.5 sm:w-2 bg-white/50 hover:bg-white'
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
            aria-label="Next slide"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center border border-white/20 transition-colors"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* Trust & Highlights Ribbon - Responsive 2x2 grid on mobile */}
      <div className="bg-[#17324D] text-white py-3 sm:py-5 px-3 sm:px-4 md:px-8 border-t border-[#D6A63C]/30">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
          <div className="p-1.5 sm:p-2">
            <div className="text-base sm:text-xl lg:text-2xl font-bold font-mono text-[#D6A63C] tabular-nums">
              {lang === 'ne' ? 'रु. १८.४+ करोड' : 'NPR 18.4+ Cr'}
            </div>
            <div className="text-[10px] sm:text-xs text-slate-300 mt-0.5">
              {lang === 'ne' ? 'सेयर पुँजी' : 'Share Capital'}
            </div>
          </div>
          <div className="p-1.5 sm:p-2">
            <div className="text-base sm:text-xl lg:text-2xl font-bold font-mono text-white tabular-nums">
              {lang === 'ne' ? 'रु. १.१२+ अर्ब' : 'NPR 1.12+ Arba'}
            </div>
            <div className="text-[10px] sm:text-xs text-slate-300 mt-0.5">
              {lang === 'ne' ? 'कुल बचत निक्षेप' : 'Total Deposits'}
            </div>
          </div>
          <div className="p-1.5 sm:p-2 pt-2 sm:pt-2">
            <div className="text-base sm:text-xl lg:text-2xl font-bold font-mono text-white tabular-nums">
              {lang === 'ne' ? 'रु. ९८.६+ करोड' : 'NPR 98.6+ Cr'}
            </div>
            <div className="text-[10px] sm:text-xs text-slate-300 mt-0.5">
              {lang === 'ne' ? 'कर्जा लगानी' : 'Credit Disbursed'}
            </div>
          </div>
          <div className="p-1.5 sm:p-2 pt-2 sm:pt-2">
            <div className="text-base sm:text-xl lg:text-2xl font-bold font-mono text-[#D6A63C] tabular-nums">
              {lang === 'ne' ? '३,४५०+ सदस्य' : '3,450+ Members'}
            </div>
            <div className="text-[10px] sm:text-xs text-slate-300 mt-0.5">
              {lang === 'ne' ? 'सक्रिय सदस्य' : 'Active Members'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
