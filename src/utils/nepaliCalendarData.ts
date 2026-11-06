/**
 * Dual Nepali (Bikram Sambat) and English (Gregorian) Calendar Engine
 * Covers BS years 2081, 2082, 2083, 2084 with bi-directional date conversions,
 * tithis, national holidays, and cooperative banking schedules.
 */

import { CalendarEvent } from '../types';

export interface NepaliMonthMeta {
  monthIndex: number; // 0 to 11
  name_ne: string;
  name_en: string;
  engMonths: string; // e.g. "Apr / May"
}

export const NEPALI_MONTHS: NepaliMonthMeta[] = [
  { monthIndex: 0, name_ne: 'बैशाख', name_en: 'Baishakh', engMonths: 'Apr / May' },
  { monthIndex: 1, name_ne: 'जेठ', name_en: 'Jestha', engMonths: 'May / Jun' },
  { monthIndex: 2, name_ne: 'असार', name_en: 'Ashadh', engMonths: 'Jun / Jul' },
  { monthIndex: 3, name_ne: 'साउन', name_en: 'Shrawan', engMonths: 'Jul / Aug' },
  { monthIndex: 4, name_ne: 'भदौ', name_en: 'Bhadra', engMonths: 'Aug / Sep' },
  { monthIndex: 5, name_ne: 'असोज', name_en: 'Ashoj', engMonths: 'Sep / Oct' },
  { monthIndex: 6, name_ne: 'कात्तिक', name_en: 'Kartik', engMonths: 'Oct / Nov' },
  { monthIndex: 7, name_ne: 'मंसिर', name_en: 'Mangsir', engMonths: 'Nov / Dec' },
  { monthIndex: 8, name_ne: 'पुस', name_en: 'Poush', engMonths: 'Dec / Jan' },
  { monthIndex: 9, name_ne: 'माघ', name_en: 'Magh', engMonths: 'Jan / Feb' },
  { monthIndex: 10, name_ne: 'फागुन', name_en: 'Falgun', engMonths: 'Feb / Mar' },
  { monthIndex: 11, name_ne: 'चैत', name_en: 'Chaitra', engMonths: 'Mar / Apr' },
];

export const ENGLISH_MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const WEEKDAYS = [
  { dayIndex: 0, name_ne: 'आइतवार', short_ne: 'आइत', name_en: 'Sunday', short_en: 'Sun', is_weekend: false },
  { dayIndex: 1, name_ne: 'सोमवार', short_ne: 'सोम', name_en: 'Monday', short_en: 'Mon', is_weekend: false },
  { dayIndex: 2, name_ne: 'मङ्गलवार', short_ne: 'मङ्गल', name_en: 'Tuesday', short_en: 'Tue', is_weekend: false },
  { dayIndex: 3, name_ne: 'बुधवार', short_ne: 'बुध', name_en: 'Wednesday', short_en: 'Wed', is_weekend: false },
  { dayIndex: 4, name_ne: 'बिहीवार', short_ne: 'बिही', name_en: 'Thursday', short_en: 'Thu', is_weekend: false },
  { dayIndex: 5, name_ne: 'शुक्रवार', short_ne: 'शुक्र', name_en: 'Friday', short_en: 'Fri', is_weekend: false },
  { dayIndex: 6, name_ne: 'शनिवार', short_ne: 'शनि', name_en: 'Saturday', short_en: 'Sat', is_weekend: true },
];

export const TITHI_NAMES = [
  'प्रतिपदा', 'द्वितीया', 'तृतीया', 'चतुर्थी', 'पञ्चमी', 'षष्ठी', 'सप्तमी', 'अष्टमी',
  'नवमी', 'दशमी', 'एकादशी', 'द्वादशी', 'त्रयोदशी', 'चतुर्दशी', 'पूर्णिमा', 'औंसी'
];

// Number of days per Nepali month for recent years
// [Baishakh, Jestha, Ashadh, Shrawan, Bhadra, Ashoj, Kartik, Mangsir, Poush, Magh, Falgun, Chaitra]
export const BS_YEAR_DAYS_DATA: { [year: number]: number[] } = {
  2081: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
  2082: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2083: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2084: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 31],
};

// Start Gregorian dates for Baishakh 1 of each BS year
export const BS_TO_AD_ANCHOR: { [year: number]: { year: number; month: number; day: number } } = {
  2081: { year: 2024, month: 3, day: 13 }, // 2024-04-13
  2082: { year: 2025, month: 3, day: 14 }, // 2025-04-14
  2083: { year: 2026, month: 3, day: 14 }, // 2026-04-14
  2084: { year: 2027, month: 3, day: 14 }, // 2027-04-14
};

// Convert English numbers to Nepali Devnagari numerals
export function toNepaliDigits(num: number | string): string {
  const nepaliDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
  return String(num).replace(/[0-9]/g, (digit) => nepaliDigits[parseInt(digit, 10)]);
}

/**
 * Calculates Gregorian date corresponding to a given BS Date
 */
export function getGregorianDateFromBs(yearBs: number, monthBsIndex: number, dayBs: number): Date {
  const anchor = BS_TO_AD_ANCHOR[yearBs] || BS_TO_AD_ANCHOR[2083];
  const daysInMonths = BS_YEAR_DAYS_DATA[yearBs] || BS_YEAR_DAYS_DATA[2083];

  let elapsedDays = 0;
  for (let m = 0; m < monthBsIndex; m++) {
    elapsedDays += daysInMonths[m];
  }
  elapsedDays += (dayBs - 1);

  const d = new Date(anchor.year, anchor.month, anchor.day);
  d.setDate(d.getDate() + elapsedDays);
  return d;
}

/**
 * Converts a Gregorian Date into Bikram Sambat Date
 */
export function getBsDateFromGregorian(date: Date): { yearBs: number; monthBsIndex: number; dayBs: number } {
  const targetTime = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();

  const years = [2081, 2082, 2083, 2084];
  for (let i = 0; i < years.length; i++) {
    const y = years[i];
    const anchor = BS_TO_AD_ANCHOR[y];
    const startDate = new Date(anchor.year, anchor.month, anchor.day);
    const daysInYear = (BS_YEAR_DAYS_DATA[y] || BS_YEAR_DAYS_DATA[2083]).reduce((a, b) => a + b, 0);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + daysInYear);

    if (targetTime >= startDate.getTime() && targetTime < endDate.getTime()) {
      const diffTime = targetTime - startDate.getTime();
      let diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      const daysInMonths = BS_YEAR_DAYS_DATA[y];
      for (let m = 0; m < 12; m++) {
        if (diffDays < daysInMonths[m]) {
          return { yearBs: y, monthBsIndex: m, dayBs: diffDays + 1 };
        }
        diffDays -= daysInMonths[m];
      }
    }
  }

  // Fallback to default
  return { yearBs: 2083, monthBsIndex: 6, dayBs: 21 }; // 2083 Kartik 21
}

// Cooperative & National Events dataset
export const COOPERATIVE_CALENDAR_EVENTS: CalendarEvent[] = [
  // Baishakh
  {
    id: 1,
    date_bs: '२०८३-०१-०१',
    date_ad: '2026-04-14',
    title_ne: 'नयाँ वर्ष २०८३ प्रारम्भ',
    title_en: 'Nepali New Year 2083',
    type: 'holiday',
    is_holiday: true,
    description_ne: 'सार्वजनिक बिदा · सहकारी काउन्टर सेवा बन्द'
  },
  {
    id: 2,
    date_bs: '२०८३-०१-१८',
    date_ad: '2026-05-01',
    title_ne: 'अन्तर्राष्ट्रिय मजदुर दिवस',
    title_en: 'International Labour Day',
    type: 'holiday',
    is_holiday: true
  },
  {
    id: 3,
    date_bs: '२०८३-०१-३१',
    date_ad: '2026-05-14',
    title_ne: 'मासिक बचत तथा किस्ता मसान्त',
    title_en: 'Monthly Loan EMI & Savings Cutoff',
    type: 'installment',
    is_holiday: false,
    description_ne: 'बैशाख महिनाको किस्ता तथा बचत जम्मा गर्ने अन्तिम दिन'
  },
  // Jestha
  {
    id: 4,
    date_bs: '२०८३-०२-१५',
    date_ad: '2026-05-29',
    title_ne: 'गणतन्त्र दिवस',
    title_en: 'Republic Day',
    type: 'holiday',
    is_holiday: true
  },
  {
    id: 5,
    date_bs: '२०८३-०२-३१',
    date_ad: '2026-06-14',
    title_ne: 'मासिक बचत तथा किस्ता मसान्त',
    title_en: 'Monthly Loan EMI Cutoff',
    type: 'installment',
    is_holiday: false
  },
  // Ashadh
  {
    id: 6,
    date_bs: '२०८३-०३-१५',
    date_ad: '2026-06-29',
    title_ne: 'राष्ट्रिय धान दिवस (दही चिउरा खाने दिन)',
    title_en: 'National Paddy Day',
    type: 'festival',
    is_holiday: false
  },
  {
    id: 7,
    date_bs: '२०८३-०३-३२',
    date_ad: '2026-07-16',
    title_ne: 'आर्थिक वर्ष २०८२/८३ अन्त्य तथा ब्याज पुँजीकरण',
    title_en: 'Fiscal Year Closing & Interest Capitalization',
    type: 'cooperative',
    is_holiday: false,
    description_ne: 'वार्षिक हिसाब मिलान तथा बचत खाताहरूमा ब्याज भुक्तानी'
  },
  // Shrawan
  {
    id: 8,
    date_bs: '२०८३-०४-०१',
    date_ad: '2026-07-17',
    title_ne: 'साउने संक्रान्ति (नयाँ आर्थिक वर्ष प्रारम्भ)',
    title_en: 'Shrawan Sankranti / New FY Start',
    type: 'festival',
    is_holiday: false
  },
  {
    id: 9,
    date_bs: '२०८३-०४-३१',
    date_ad: '2026-08-16',
    title_ne: 'मासिक किस्ता मसान्त',
    title_en: 'Monthly EMI Cutoff',
    type: 'installment',
    is_holiday: false
  },
  // Bhadra
  {
    id: 10,
    date_bs: '२०८३-०५-१८',
    date_ad: '2026-09-03',
    title_ne: 'हरितालिका तीज पर्व',
    title_en: 'Haritalika Teej Festival',
    type: 'festival',
    is_holiday: true,
    description_ne: 'महिला कर्मचारी तथा सदस्यहरूका लागि बिदा'
  },
  {
    id: 11,
    date_bs: '२०८३-०५-३१',
    date_ad: '2026-09-16',
    title_ne: 'मासिक किस्ता मसान्त',
    title_en: 'Monthly EMI Cutoff',
    type: 'installment',
    is_holiday: false
  },
  // Ashoj
  {
    id: 12,
    date_bs: '२०८३-०६-०३',
    date_ad: '2026-09-19',
    title_ne: 'संविधान दिवस (राष्ट्रिय दिवस)',
    title_en: 'Constitution Day',
    type: 'holiday',
    is_holiday: true
  },
  {
    id: 13,
    date_bs: '२०८३-०६-२४',
    date_ad: '2026-10-10',
    title_ne: 'बडादशैं (विजयादशमी)',
    title_en: 'Dashain Festival (Vijaya Dashami)',
    type: 'festival',
    is_holiday: true,
    description_ne: 'बडादशैं सार्वजनिक बिदा'
  },
  {
    id: 14,
    date_bs: '२०८३-०६-३०',
    date_ad: '2026-10-16',
    title_ne: 'त्रैमासिक ब्याज पुँजीकरण (१st Quarter Closing)',
    title_en: 'Q1 Interest Settlement Day',
    type: 'cooperative',
    is_holiday: false
  },
  // Kartik
  {
    id: 15,
    date_bs: '२०८३-०७-१४',
    date_ad: '2026-10-30',
    title_ne: 'लक्ष्मीपूजा (दीपावली पर्व)',
    title_en: 'Laxmi Puja (Diwali)',
    type: 'festival',
    is_holiday: true
  },
  {
    id: 16,
    date_bs: '२०८३-०७-१६',
    date_ad: '2026-11-01',
    title_ne: 'भाइटीका (तिहार समापन)',
    title_en: 'Bhai Tika (Tihar)',
    type: 'festival',
    is_holiday: true
  },
  {
    id: 17,
    date_bs: '२०८३-०७-२१',
    date_ad: '2026-11-06',
    title_ne: 'आज: सहकारी विशेष वित्तीय साक्षरता गोष्ठी',
    title_en: 'Financial Literacy & Member Workshop',
    type: 'cooperative',
    is_holiday: false,
    description_ne: 'आधुनिक जन सहकारी मुख्य कार्यालय, नागार्जुन-४'
  },
  {
    id: 18,
    date_bs: '२०८३-०७-३०',
    date_ad: '2026-11-15',
    title_ne: 'कात्तिक मसान्त किस्ता बुझाउने अन्तिम मिति',
    title_en: 'Kartik Monthly Installment Due Date',
    type: 'installment',
    is_holiday: false
  },
  // Mangsir
  {
    id: 19,
    date_bs: '२०८३-०८-१२',
    date_ad: '2026-11-27',
    title_ne: 'आधुनिक जन सहकारी १७औं वार्षिक साधारण सभा (AGM)',
    title_en: '17th Annual General Meeting (AGM)',
    type: 'agm',
    is_holiday: false,
    description_ne: 'समस्त सेयर सदस्यहरूको गरिमामय उपस्थितिका लागि अनुरोध'
  },
  {
    id: 20,
    date_bs: '२०८३-०८-२९',
    date_ad: '2026-12-14',
    title_ne: 'मंसिर मसान्त किस्ता म्याद',
    title_en: 'Monthly EMI Cutoff',
    type: 'installment',
    is_holiday: false
  },
  // Poush
  {
    id: 21,
    date_bs: '२०८३-०९-३०',
    date_ad: '2027-01-14',
    title_ne: 'दोस्रो त्रैमासिक ब्याज पुँजीकरण (Q2 Closing)',
    title_en: 'Q2 Interest Capitalization',
    type: 'cooperative',
    is_holiday: false
  },
  // Magh
  {
    id: 22,
    date_bs: '२०८३-१०-०१',
    date_ad: '2027-01-15',
    title_ne: 'माघे संक्रान्ति (मकर संक्रान्ति)',
    title_en: 'Maghe Sankranti',
    type: 'festival',
    is_holiday: true
  },
  {
    id: 23,
    date_bs: '२०८३-१०-१६',
    date_ad: '2027-01-30',
    title_ne: 'सहिद दिवस',
    title_en: 'Martyr\'s Day',
    type: 'holiday',
    is_holiday: true
  },
  // Falgun
  {
    id: 24,
    date_bs: '२०८३-११-२१',
    date_ad: '2027-03-05',
    title_ne: 'महाशिवरात्रि पर्व',
    title_en: 'Maha Shivaratri',
    type: 'festival',
    is_holiday: true
  },
  {
    id: 25,
    date_bs: '२०८३-११-२९',
    date_ad: '2027-03-13',
    title_ne: 'फागु पूर्णिमा (होली पर्व)',
    title_en: 'Holi Festival',
    type: 'festival',
    is_holiday: true
  },
  // Chaitra
  {
    id: 26,
    date_bs: '२०८३-१२-२०',
    date_ad: '2027-04-03',
    title_ne: '६९औं राष्ट्रिय सहकारी दिवस',
    title_en: '69th National Cooperative Day',
    type: 'cooperative',
    is_holiday: false,
    description_ne: 'स्वावलम्बन, सहकार्य र समृद्धिका लागि सहकारी अभियान'
  },
  {
    id: 27,
    date_bs: '२०८३-१२-३०',
    date_ad: '2027-04-13',
    title_ne: 'चैत मसान्त (तेस्रो त्रैमासिक ब्याज भुक्तानी)',
    title_en: 'Q3 Interest Settlement & Annual Closing Prep',
    type: 'cooperative',
    is_holiday: false
  }
];

export function getEventsForBsDate(yearBs: number, monthBsIndex: number, dayBs: number): CalendarEvent[] {
  const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
  const formattedBs = `${toNepaliDigits(yearBs)}-${toNepaliDigits(pad(monthBsIndex + 1))}-${toNepaliDigits(pad(dayBs))}`;
  const asciiBs = `${yearBs}-${pad(monthBsIndex + 1)}-${pad(dayBs)}`;

  return COOPERATIVE_CALENDAR_EVENTS.filter(
    (e) => e.date_bs === formattedBs || e.date_bs === asciiBs
  );
}
