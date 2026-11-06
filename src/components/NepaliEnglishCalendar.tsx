import React, { useState } from 'react';
import { Language, CalendarEvent } from '../types';
import { 
  NEPALI_MONTHS, 
  WEEKDAYS, 
  TITHI_NAMES, 
  BS_YEAR_DAYS_DATA, 
  toNepaliDigits, 
  getGregorianDateFromBs, 
  getBsDateFromGregorian,
  COOPERATIVE_CALENDAR_EVENTS,
  getEventsForBsDate
} from '../utils/nepaliCalendarData';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  Printer, 
  Clock, 
  Building2, 
  Sparkles, 
  CalendarCheck, 
  ArrowLeftRight, 
  AlertCircle, 
  Info,
  CalendarDays,
  FileText
} from 'lucide-react';

interface NepaliEnglishCalendarProps {
  lang: Language;
  onNavigateToView?: (view: string) => void;
}

export const NepaliEnglishCalendar: React.FC<NepaliEnglishCalendarProps> = ({
  lang,
  onNavigateToView
}) => {
  // Current date anchor: 2026-11-06 (Kartik 21, 2083 BS)
  const todayDate = new Date(2026, 10, 6);
  const todayBs = getBsDateFromGregorian(todayDate);

  // Active calendar view month and year
  const [currentYearBs, setCurrentYearBs] = useState<number>(todayBs.yearBs);
  const [currentMonthIndex, setCurrentMonthIndex] = useState<number>(todayBs.monthBsIndex);

  // Selected date for detailed preview
  const [selectedDayBs, setSelectedDayBs] = useState<number>(todayBs.dayBs);

  // Display mode: 'bs_primary' (Bikram Sambat big) or 'ad_primary' (English Gregorian big)
  const [displayMode, setDisplayMode] = useState<'bs_primary' | 'ad_primary'>('bs_primary');

  // Sub-tabs: 'calendar' | 'converter' | 'events'
  const [activeSubTab, setActiveSubTab] = useState<'calendar' | 'converter' | 'events'>('calendar');

  // Date Converter State
  const [convBsYear, setConvBsYear] = useState<number>(2083);
  const [convBsMonth, setConvBsMonth] = useState<number>(6); // Kartik
  const [convBsDay, setConvBsDay] = useState<number>(21);
  const [convAdInput, setConvAdInput] = useState<string>('2026-11-06');

  // Month navigation handlers
  const handlePrevMonth = () => {
    if (currentMonthIndex === 0) {
      if (BS_YEAR_DAYS_DATA[currentYearBs - 1]) {
        setCurrentYearBs(currentYearBs - 1);
        setCurrentMonthIndex(11);
      }
    } else {
      setCurrentMonthIndex(currentMonthIndex - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonthIndex === 11) {
      if (BS_YEAR_DAYS_DATA[currentYearBs + 1]) {
        setCurrentYearBs(currentYearBs + 1);
        setCurrentMonthIndex(0);
      }
    } else {
      setCurrentMonthIndex(currentMonthIndex + 1);
    }
  };

  const handleJumpToday = () => {
    setCurrentYearBs(todayBs.yearBs);
    setCurrentMonthIndex(todayBs.monthBsIndex);
    setSelectedDayBs(todayBs.dayBs);
  };

  // Days in currently selected BS month
  const daysInCurrentMonth = (BS_YEAR_DAYS_DATA[currentYearBs] || BS_YEAR_DAYS_DATA[2083])[currentMonthIndex];
  const currentMonthMeta = NEPALI_MONTHS[currentMonthIndex];

  // First day of this BS month in Gregorian to find day of week (0 = Sun, 6 = Sat)
  const firstDayGregorian = getGregorianDateFromBs(currentYearBs, currentMonthIndex, 1);
  const startDayOfWeek = firstDayGregorian.getDay();

  // Selected date details
  const selectedGregorian = getGregorianDateFromBs(currentYearBs, currentMonthIndex, selectedDayBs);
  const selectedDayOfWeek = WEEKDAYS[selectedGregorian.getDay()];
  const selectedEvents = getEventsForBsDate(currentYearBs, currentMonthIndex, selectedDayBs);

  // Month range in Gregorian (e.g. "October / November 2026")
  const lastDayGregorian = getGregorianDateFromBs(currentYearBs, currentMonthIndex, daysInCurrentMonth);
  const gregMonthsText = `${firstDayGregorian.toLocaleString('en-US', { month: 'short' })} - ${lastDayGregorian.toLocaleString('en-US', { month: 'short' })} ${firstDayGregorian.getFullYear()}`;

  // Converter Calculations
  const convertedAdDate = getGregorianDateFromBs(convBsYear, convBsMonth, convBsDay);
  const parsedAd = new Date(convAdInput);
  const convertedBsDate = isNaN(parsedAd.getTime()) ? todayBs : getBsDateFromGregorian(parsedAd);

  return (
    <div className="space-y-6">
      {/* Top Banner Card */}
      <div className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-[#146B45]/10 text-[#146B45] flex items-center justify-center shrink-0">
              <CalendarIcon className="w-6 h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-base sm:text-xl font-bold text-[#17324D]">
                  {lang === 'ne' ? 'नेपाली तथा अंग्रेजी क्यालेन्डर (पात्रो)' : 'Nepali & English Cooperative Calendar'}
                </h2>
                <span className="text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  {lang === 'ne' ? 'वि.सं. २०८३ / 2026 AD' : 'BS 2083 / 2026 AD'}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {lang === 'ne' 
                  ? 'सहकारी वित्तीय क्यालेन्डर, सार्वजनिक बिदा, तिथि, साधारण सभा तथा किस्ता भुक्तानी म्याद।' 
                  : 'Bilingual Patro with Bikram Sambat, Gregorian dates, cooperative events, AGM schedules, and tithi.'}
              </p>
            </div>
          </div>

          {/* Quick Sub-Tab Selector */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => setActiveSubTab('calendar')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                  activeSubTab === 'calendar'
                    ? 'bg-[#146B45] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <CalendarDays className="w-3.5 h-3.5" />
                <span>{lang === 'ne' ? 'पात्रो (Calendar)' : 'Patro View'}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSubTab('converter')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                  activeSubTab === 'converter'
                    ? 'bg-[#17324D] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ArrowLeftRight className="w-3.5 h-3.5" />
                <span>{lang === 'ne' ? 'मिति रूपान्तरण' : 'Date Converter'}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSubTab('events')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                  activeSubTab === 'events'
                    ? 'bg-[#D6A63C] text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{lang === 'ne' ? 'सहकारी बिदा' : 'Holidays & AGM'}</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => window.print()}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1"
              title="Print Monthly Calendar"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span>{lang === 'ne' ? 'प्रिन्ट' : 'Print'}</span>
            </button>
          </div>
        </div>

        {/* Today's Live Date Banner */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-semibold text-slate-800">
              {lang === 'ne' ? 'आजको मिति :' : 'Today\'s Official Date :'}
            </span>
            <span className="font-bold text-[#146B45] font-mono">
              २०८३ कार्तिक २१ गते, शुक्रवार
            </span>
            <span className="text-slate-400">·</span>
            <span className="font-medium text-slate-600 font-mono">
              Friday, 06 November 2026
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full font-medium">
              {lang === 'ne' ? 'काउन्टर सेवा समय: १०:०० - ४:००' : 'Office Banking: 10:00 AM - 4:00 PM'}
            </span>
          </div>
        </div>
      </div>

      {/* SUB-TAB 1: Full Interactive Calendar */}
      {activeSubTab === 'calendar' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Calendar Viewport (lg:col-span-8) */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-xs p-4 sm:p-6 space-y-4">
            
            {/* Calendar Month Navigation Header */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-4 border-b border-slate-100">
              {/* Month & Year Title */}
              <div className="text-center sm:text-left">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#17324D]">
                    {currentMonthMeta.name_ne} {toNepaliDigits(currentYearBs)}
                  </h3>
                  <span className="text-sm font-semibold text-slate-500 font-mono">
                    ({currentMonthMeta.name_en} {currentYearBs})
                  </span>
                </div>
                <p className="text-xs font-mono text-[#146B45] font-semibold mt-0.5">
                  {gregMonthsText}
                </p>
              </div>

              {/* Controls: Prev, Next, Today, Year/Month Selectors */}
              <div className="flex flex-wrap items-center gap-1.5">
                {/* Year Selector */}
                <select
                  value={currentYearBs}
                  onChange={(e) => setCurrentYearBs(parseInt(e.target.value, 10))}
                  className="px-2 py-1.5 text-xs font-bold font-mono border border-slate-300 rounded-lg bg-white"
                >
                  <option value={2081}>२०८१ (2024/25)</option>
                  <option value={2082}>२०८२ (2025/26)</option>
                  <option value={2083}>२०८३ (2026/27)</option>
                  <option value={2084}>२०८४ (2027/28)</option>
                </select>

                {/* Month Selector */}
                <select
                  value={currentMonthIndex}
                  onChange={(e) => setCurrentMonthIndex(parseInt(e.target.value, 10))}
                  className="px-2 py-1.5 text-xs font-semibold border border-slate-300 rounded-lg bg-white"
                >
                  {NEPALI_MONTHS.map((m) => (
                    <option key={m.monthIndex} value={m.monthIndex}>
                      {m.name_ne} ({m.name_en})
                    </option>
                  ))}
                </select>

                <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden">
                  <button
                    type="button"
                    onClick={handlePrevMonth}
                    className="p-1.5 hover:bg-slate-100 text-slate-700 transition-colors"
                    title="Previous Month"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextMonth}
                    className="p-1.5 hover:bg-slate-100 text-slate-700 transition-colors"
                    title="Next Month"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleJumpToday}
                  className="px-3 py-1.5 text-xs font-semibold bg-[#146B45] text-white rounded-lg hover:bg-[#105537] transition-colors"
                >
                  {lang === 'ne' ? 'आज' : 'Today'}
                </button>
              </div>
            </div>

            {/* Display Mode Pill Toggle (Bikram Sambat vs English Gregorian) */}
            <div className="flex items-center justify-between text-xs pb-1">
              <span className="text-slate-500 hidden sm:inline">
                {lang === 'ne' ? 'शनिवार रातो रङ्गले सार्वजनिक बिदा जनाउँछ।' : 'Saturdays and festivals marked in red indicate holidays.'}
              </span>
              <div className="flex items-center gap-1 ml-auto">
                <span className="text-slate-500 mr-1 text-[11px]">{lang === 'ne' ? 'मुख्य अङ्क:' : 'Primary Display:'}</span>
                <button
                  type="button"
                  onClick={() => setDisplayMode('bs_primary')}
                  className={`px-2 py-1 rounded-md text-[11px] font-bold ${
                    displayMode === 'bs_primary'
                      ? 'bg-[#146B45] text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  वि.सं. (BS)
                </button>
                <button
                  type="button"
                  onClick={() => setDisplayMode('ad_primary')}
                  className={`px-2 py-1 rounded-md text-[11px] font-bold ${
                    displayMode === 'ad_primary'
                      ? 'bg-[#17324D] text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  ई.सं. (AD)
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              {/* Day of Week Headers */}
              <div className="grid grid-cols-7 bg-[#17324D] text-white text-center text-xs font-bold divide-x divide-white/10">
                {WEEKDAYS.map((w) => (
                  <div 
                    key={w.dayIndex} 
                    className={`py-2 px-1 ${w.is_weekend ? 'bg-red-900/80 text-rose-200' : ''}`}
                  >
                    <span className="block">{lang === 'ne' ? w.name_ne : w.name_en}</span>
                    <span className="text-[10px] font-normal opacity-75 hidden sm:block">
                      {lang === 'ne' ? w.short_en : w.short_ne}
                    </span>
                  </div>
                ))}
              </div>

              {/* Calendar Days Matrix */}
              <div className="grid grid-cols-7 divide-x divide-y divide-slate-100 text-xs bg-slate-50/50">
                {/* Empty cells before startDayOfWeek */}
                {Array.from({ length: startDayOfWeek }).map((_, i) => (
                  <div key={`empty-${i}`} className="min-h-[72px] sm:min-h-[88px] bg-slate-100/50 p-1.5 opacity-40"></div>
                ))}

                {/* Day cells for currently selected month */}
                {Array.from({ length: daysInCurrentMonth }).map((_, i) => {
                  const dayNum = i + 1;
                  const gregDate = getGregorianDateFromBs(currentYearBs, currentMonthIndex, dayNum);
                  const dayOfWeek = (startDayOfWeek + i) % 7;
                  const isSaturday = dayOfWeek === 6;

                  const isToday = 
                    currentYearBs === todayBs.yearBs && 
                    currentMonthIndex === todayBs.monthBsIndex && 
                    dayNum === todayBs.dayBs;

                  const isSelected = dayNum === selectedDayBs;

                  // Tithi cycle
                  const tithiIndex = (dayNum + 4) % TITHI_NAMES.length;
                  const tithiName = TITHI_NAMES[tithiIndex];

                  // Events on this day
                  const dayEvents = getEventsForBsDate(currentYearBs, currentMonthIndex, dayNum);
                  const hasHoliday = isSaturday || dayEvents.some(e => e.is_holiday);
                  const hasCoopEvent = dayEvents.some(e => e.type === 'cooperative' || e.type === 'agm' || e.type === 'installment');

                  return (
                    <button
                      key={`day-${dayNum}`}
                      type="button"
                      onClick={() => setSelectedDayBs(dayNum)}
                      className={`min-h-[72px] sm:min-h-[88px] p-1.5 sm:p-2 text-left transition-all relative flex flex-col justify-between group ${
                        isSelected 
                          ? 'bg-amber-50 ring-2 ring-inset ring-[#D6A63C] z-10' 
                          : isToday 
                          ? 'bg-emerald-50/70 hover:bg-emerald-100/60' 
                          : 'bg-white hover:bg-slate-50'
                      }`}
                    >
                      {/* Top Row: Date Numerals */}
                      <div className="flex items-start justify-between w-full">
                        {/* Primary Numeral */}
                        <span className={`text-base sm:text-xl font-bold font-mono leading-none ${
                          hasHoliday ? 'text-red-600' : 'text-slate-800'
                        }`}>
                          {displayMode === 'bs_primary' ? toNepaliDigits(dayNum) : gregDate.getDate()}
                        </span>

                        {/* Secondary Subscript Numeral */}
                        <span className="text-[10px] font-mono text-slate-400 font-medium">
                          {displayMode === 'bs_primary' 
                            ? `${gregDate.toLocaleString('en-US', { month: 'short' })} ${gregDate.getDate()}` 
                            : `वि.सं. ${toNepaliDigits(dayNum)}`}
                        </span>
                      </div>

                      {/* Middle: Tithi */}
                      <div className="text-[9px] sm:text-[10px] text-slate-500 truncate leading-tight my-0.5">
                        {tithiName}
                      </div>

                      {/* Bottom Event Badge / Dots */}
                      <div className="w-full">
                        {isToday && (
                          <span className="inline-block px-1.5 py-0.2 rounded-xs bg-[#146B45] text-white text-[9px] font-bold uppercase tracking-wider mb-0.5">
                            {lang === 'ne' ? 'आज' : 'Today'}
                          </span>
                        )}
                        {dayEvents.length > 0 && (
                          <div className="w-full truncate text-[9px] sm:text-[10px] font-medium leading-tight">
                            {dayEvents[0].is_holiday ? (
                              <span className="text-red-600 block truncate" title={dayEvents[0].title_ne}>
                                • {lang === 'ne' ? dayEvents[0].title_ne : dayEvents[0].title_en}
                              </span>
                            ) : (
                              <span className="text-[#146B45] block truncate font-semibold" title={dayEvents[0].title_ne}>
                                • {lang === 'ne' ? dayEvents[0].title_ne : dayEvents[0].title_en}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Calendar Legend */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-600"></span>
                <span>{lang === 'ne' ? 'शनिवार / सार्वजनिक बिदा' : 'Public Holiday / Saturday'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#146B45]"></span>
                <span>{lang === 'ne' ? 'सहकारी कार्यक्रम / किस्ता म्याद' : 'Cooperative Event / EMI Cutoff'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#D6A63C]"></span>
                <span>{lang === 'ne' ? 'छानिएको मिति' : 'Selected Date'}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Selected Date Inspector & Cooperative Info (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Inspector Box */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h4 className="text-xs font-bold text-[#17324D] uppercase tracking-wider flex items-center gap-1.5">
                  <CalendarCheck className="w-4 h-4 text-[#146B45]" />
                  <span>{lang === 'ne' ? 'छानिएको मिति विवरण' : 'Selected Day Overview'}</span>
                </h4>
                <span className="text-xs font-mono font-bold text-slate-500">
                  {selectedDayOfWeek.name_en}
                </span>
              </div>

              {/* Big Date Header */}
              <div className="p-4 rounded-xl bg-linear-to-br from-[#17324D] to-[#204468] text-white space-y-1">
                <span className="text-xs text-[#D6A63C] font-semibold">
                  {lang === 'ne' ? 'नेपाली वि.सं. मिति :' : 'Bikram Sambat (BS):'}
                </span>
                <div className="text-xl sm:text-2xl font-bold font-mono text-white">
                  {toNepaliDigits(currentYearBs)} {currentMonthMeta.name_ne} {toNepaliDigits(selectedDayBs)} गते
                </div>
                <div className="text-xs text-slate-300 font-mono pt-1 border-t border-white/10 flex items-center justify-between">
                  <span>{selectedDayOfWeek.name_ne}</span>
                  <span>{selectedGregorian.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
              </div>

              {/* Tithi & Panchanga Info */}
              <div className="p-3 bg-[#F5F7F6] rounded-xl border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">{lang === 'ne' ? 'तिथि / पञ्चाङ्ग :' : 'Tithi / Lunar Phase:'}</span>
                  <span className="font-bold text-slate-800">
                    {TITHI_NAMES[(selectedDayBs + 4) % TITHI_NAMES.length]}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">{lang === 'ne' ? 'कार्यालय काउन्टर :' : 'Counter Banking Status:'}</span>
                  <span className={`font-bold ${
                    selectedDayOfWeek.is_weekend || selectedEvents.some(e => e.is_holiday)
                      ? 'text-red-600'
                      : 'text-[#146B45]'
                  }`}>
                    {selectedDayOfWeek.is_weekend || selectedEvents.some(e => e.is_holiday)
                      ? (lang === 'ne' ? 'सार्वजनिक बिदा (बन्द)' : 'Closed (Holiday)')
                      : (lang === 'ne' ? 'काउन्टर खुला (१०:०० - ४:००)' : 'Open (10 AM - 4 PM)')}
                  </span>
                </div>
              </div>

              {/* Events on this selected day */}
              <div>
                <h5 className="text-xs font-bold text-slate-700 mb-2">
                  {lang === 'ne' ? 'यस दिनका कार्यक्रम तथा पर्वहरू:' : 'Events on this Day:'}
                </h5>

                {selectedEvents.length > 0 ? (
                  <div className="space-y-2">
                    {selectedEvents.map((evt) => (
                      <div 
                        key={evt.id}
                        className={`p-3 rounded-xl border text-xs ${
                          evt.is_holiday 
                            ? 'bg-red-50 border-red-200 text-red-900' 
                            : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                        }`}
                      >
                        <div className="font-bold">
                          {lang === 'ne' ? evt.title_ne : evt.title_en}
                        </div>
                        {evt.description_ne && (
                          <p className="text-[11px] text-slate-600 mt-0.5">
                            {lang === 'ne' ? evt.description_ne : evt.description_en}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 bg-slate-50 rounded-lg text-slate-500 text-xs text-center border border-slate-200">
                    {lang === 'ne' ? 'यस दिन कुनै विशेष पर्व वा बिदा छैन (नियमित कार्य दिन)।' : 'Regular banking business day.'}
                  </div>
                )}
              </div>

              {/* Quick Action: Online Member Portal */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onNavigateToView && onNavigateToView('member_portal')}
                  className="w-full py-2.5 bg-[#146B45] hover:bg-[#105537] text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Building2 className="w-3.5 h-3.5 text-[#D6A63C]" />
                  <span>{lang === 'ne' ? 'सदस्य पोर्टलमा लगइन गर्नुहोस्' : 'Open Member Portal'}</span>
                </button>
              </div>
            </div>

            {/* Upcoming Cooperative Milestones */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
              <h4 className="text-xs font-bold text-[#17324D] uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#D6A63C]" />
                <span>{lang === 'ne' ? 'आगामी सहकारी मितिहरू' : 'Key Cooperative Dates'}</span>
              </h4>

              <div className="space-y-2.5 text-xs">
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="font-bold text-[#146B45] block">कात्तिक मसान्त (Nov 15, 2026)</span>
                  <span className="text-slate-600 text-[11px]">मासिक बचत तथा ऋण किस्ता बुझाउने म्याद</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="font-bold text-[#17324D] block">मंसिर १२ गते (Nov 27, 2026)</span>
                  <span className="text-slate-600 text-[11px]">सहकारीको १७औं वार्षिक साधारण सभा (AGM)</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="font-bold text-amber-800 block">पुस मसान्त (Jan 14, 2027)</span>
                  <span className="text-slate-600 text-[11px]">दोस्रो त्रैमासिक ब्याज पुँजीकरण दिन</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: Date Converter Tool (BS ⇄ AD) */}
      {activeSubTab === 'converter' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs max-w-4xl mx-auto space-y-8">
          <div className="text-center max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-full bg-[#146B45]/10 text-[#146B45] flex items-center justify-center mx-auto mb-2">
              <ArrowLeftRight className="w-6 h-6" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[#17324D]">
              {lang === 'ne' ? 'नेपाली वि.सं. र अंग्रेजी ई.सं. मिति रूपान्तरण' : 'BS to AD & AD to BS Date Converter'}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {lang === 'ne' 
                ? 'कागजात, चेक, नागरिकता जारी मिति तथा वित्तीय विवरणका लागि तत्काल सही मिति रूपान्तरण गर्नुहोस्।' 
                : 'Convert Bikram Sambat dates to English Gregorian and vice-versa instantly.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Box 1: BS to AD */}
            <div className="p-5 rounded-xl border border-slate-200 bg-[#F5F7F6] space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-sm bg-[#146B45] text-white text-[10px] font-bold">1</span>
                <h4 className="text-sm font-bold text-[#17324D]">
                  {lang === 'ne' ? 'वि.सं. बाट ई.सं. मा रूपान्तरण (BS to AD)' : 'Convert BS to AD'}
                </h4>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">वर्ष (Year BS)</label>
                  <select
                    value={convBsYear}
                    onChange={(e) => setConvBsYear(parseInt(e.target.value, 10))}
                    className="w-full px-2 py-1.5 border border-slate-300 rounded-md font-mono bg-white"
                  >
                    <option value={2081}>२०८१</option>
                    <option value={2082}>२०८२</option>
                    <option value={2083}>२०८३</option>
                    <option value={2084}>२०८४</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">महिना (Month)</label>
                  <select
                    value={convBsMonth}
                    onChange={(e) => setConvBsMonth(parseInt(e.target.value, 10))}
                    className="w-full px-2 py-1.5 border border-slate-300 rounded-md bg-white"
                  >
                    {NEPALI_MONTHS.map((m) => (
                      <option key={m.monthIndex} value={m.monthIndex}>
                        {m.name_ne}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">गते (Day)</label>
                  <input
                    type="number"
                    min="1"
                    max="32"
                    value={convBsDay}
                    onChange={(e) => setConvBsDay(Math.min(32, Math.max(1, parseInt(e.target.value, 10) || 1)))}
                    className="w-full px-2 py-1.5 border border-slate-300 rounded-md font-mono bg-white text-center"
                  />
                </div>
              </div>

              {/* Conversion Output Box */}
              <div className="p-4 bg-white rounded-lg border border-slate-200">
                <span className="text-[11px] text-slate-500 block uppercase font-bold mb-1">
                  {lang === 'ne' ? 'अंग्रेजी मिति (Gregorian AD):' : 'Converted AD Date:'}
                </span>
                <div className="text-base sm:text-lg font-bold font-mono text-[#146B45]">
                  {convertedAdDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
                <div className="text-xs text-slate-500 font-mono mt-0.5">
                  ISO Format: {convertedAdDate.toISOString().split('T')[0]}
                </div>
              </div>
            </div>

            {/* Box 2: AD to BS */}
            <div className="p-5 rounded-xl border border-slate-200 bg-[#F5F7F6] space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-sm bg-[#17324D] text-white text-[10px] font-bold">2</span>
                <h4 className="text-sm font-bold text-[#17324D]">
                  {lang === 'ne' ? 'ई.सं. बाट वि.सं. मा रूपान्तरण (AD to BS)' : 'Convert AD to BS'}
                </h4>
              </div>

              <div className="text-xs">
                <label className="block text-slate-600 font-semibold mb-1">अंग्रेजी मिति छान्नुहोस् (AD Date)</label>
                <input
                  type="date"
                  value={convAdInput}
                  onChange={(e) => setConvAdInput(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md font-mono bg-white"
                />
              </div>

              {/* Conversion Output Box */}
              <div className="p-4 bg-white rounded-lg border border-slate-200">
                <span className="text-[11px] text-slate-500 block uppercase font-bold mb-1">
                  {lang === 'ne' ? 'नेपाली मिति (Bikram Sambat BS):' : 'Converted BS Date:'}
                </span>
                <div className="text-base sm:text-lg font-bold font-mono text-[#17324D]">
                  {toNepaliDigits(convertedBsDate.yearBs)} साल {NEPALI_MONTHS[convertedBsDate.monthBsIndex].name_ne} {toNepaliDigits(convertedBsDate.dayBs)} गते
                </div>
                <div className="text-xs text-slate-500 font-mono mt-0.5">
                  BS Code: {convertedBsDate.yearBs}-{convertedBsDate.monthBsIndex + 1}-{convertedBsDate.dayBs}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: Cooperative Holidays & AGM Schedule List */}
      {activeSubTab === 'events' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-lg font-bold text-[#17324D]">
              {lang === 'ne' ? 'वार्षिक क्यालेन्डर कार्यक्रम, सार्वजनिक बिदा तथा साधारण सभा' : 'Annual Cooperative Event Schedule & Public Holidays'}
            </h3>
            <p className="text-xs text-slate-500">
              {lang === 'ne' ? 'सहकारी विभाग, नेपाल सरकार तथा संस्थाको कार्यसञ्चालन क्यालेन्डर' : 'Cooperative operations, interest capitalization dates, and official holidays'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {COOPERATIVE_CALENDAR_EVENTS.map((evt) => (
              <div
                key={evt.id}
                className={`p-4 rounded-xl border flex flex-col justify-between ${
                  evt.is_holiday
                    ? 'bg-red-50/60 border-red-200'
                    : evt.type === 'agm'
                    ? 'bg-amber-50/70 border-amber-300'
                    : 'bg-[#F5F7F6] border-slate-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[11px] font-mono font-bold text-slate-700 bg-white/80 px-2 py-0.5 rounded-md border border-slate-200">
                      {evt.date_bs}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                      evt.is_holiday 
                        ? 'bg-red-100 text-red-800' 
                        : evt.type === 'agm'
                        ? 'bg-amber-100 text-amber-900'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {evt.type}
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-slate-900 mb-1">
                    {lang === 'ne' ? evt.title_ne : evt.title_en}
                  </h4>
                  {evt.description_ne && (
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {lang === 'ne' ? evt.description_ne : evt.description_en}
                    </p>
                  )}
                </div>

                <div className="text-[11px] font-mono text-slate-400 pt-3 border-t border-slate-200/60 mt-3">
                  AD: {evt.date_ad}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
