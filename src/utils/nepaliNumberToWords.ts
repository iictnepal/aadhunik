/**
 * Utility to convert Nepali Rupee numeric amounts into standard
 * words in both Nepali (देवनागरी) and English (South Asian Lakh/Crore system).
 */

const NEPALI_ONES = [
  'शून्य', 'एक', 'दुई', 'तीन', 'चार', 'पाँच', 'छ', 'सात', 'आठ', 'नौ',
  'दश', 'एघार', 'बाह्र', 'तेह्र', 'चौध', 'पन्ध्र', 'सोह्र', 'सत्र', 'अठार', 'उन्नाइस',
  'बीस', 'एक्काइस', 'बाइस', 'तेइस', 'चौविस', 'पच्चिस', 'छब्बीस', 'सत्ताइस', 'अठ्ठाइस', 'उनन्तिस',
  'तीस', 'एकत्तिस', 'बत्तिस', 'तेत्तिस', 'चौंतीस', 'पैंतीस', 'छत्तिस', 'सैंतीस', 'अड्तीस', 'उनन्चालीस',
  'चालीस', 'एकचालीस', 'बयालीस', 'त्रिचालीस', 'चवालीस', 'पैंतालीस', 'छयालीस', 'सच्चालीस', 'अठचालीस', 'उनन्चास',
  'पचास', 'एकाउन्न', 'बाउन्न', 'त्रिपन्न', 'चवन्न', 'पचपन्न', 'छपन्न', 'सन्ताउन्न', 'अन्ठाउन्न', 'उनन्साठी',
  'साठी', 'एकसट्ठी', 'बासट्ठी', 'त्रिसट्ठी', 'चौंसट्ठी', 'पैंसट्ठी', 'छयसट्ठी', 'सत्सट्ठी', 'अठसट्ठी', 'उनन्सत्तरी',
  'सत्तरी', 'एकहत्तर', 'बहत्तर', 'त्रिहत्तर', 'चौहत्तर', 'पचहत्तर', 'छयहत्तर', 'सतहत्तर', 'अठहत्तर', 'उन्यासी',
  'असी', 'एकासी', 'बयासी', 'त्रियासी', 'चौरासी', 'पचासी', 'छयासी', 'सतासी', 'अठासी', 'उनान्नब्बे',
  'नब्बे', 'एकानब्बे', 'बयानब्बे', 'त्रियानब्बे', 'चौरानब्बे', 'पन्चानब्बे', 'छयानब्बे', 'सन्तानब्बे', 'अन्ठानब्बे', 'उनान्सय'
];

const ENGLISH_ONES = [
  '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
  'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'
];

const ENGLISH_TENS = [
  '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'
];

function convertTwoDigitsEnglish(n: number): string {
  if (n === 0) return '';
  if (n < 20) return ENGLISH_ONES[n];
  const ten = Math.floor(n / 10);
  const rem = n % 10;
  return ENGLISH_TENS[ten] + (rem > 0 ? ' ' + ENGLISH_ONES[rem] : '');
}

/**
 * Converts positive integer to South Asian English (Crore, Lakh, Thousand, Hundred)
 */
export function amountToEnglishWords(num: number): string {
  if (isNaN(num) || num <= 0) return 'Zero Rupees Only';
  const val = Math.floor(num);

  const crore = Math.floor(val / 10000000);
  let remainder = val % 10000000;

  const lakh = Math.floor(remainder / 100000);
  remainder = remainder % 100000;

  const thousand = Math.floor(remainder / 1000);
  remainder = remainder % 1000;

  const hundred = Math.floor(remainder / 100);
  const rest = remainder % 100;

  const parts: string[] = [];

  if (crore > 0) {
    parts.push(`${convertTwoDigitsEnglish(crore)} Crore`);
  }
  if (lakh > 0) {
    parts.push(`${convertTwoDigitsEnglish(lakh)} Lakh`);
  }
  if (thousand > 0) {
    parts.push(`${convertTwoDigitsEnglish(thousand)} Thousand`);
  }
  if (hundred > 0) {
    parts.push(`${ENGLISH_ONES[hundred]} Hundred`);
  }
  if (rest > 0) {
    parts.push(convertTwoDigitsEnglish(rest));
  }

  return parts.join(' ') + ' Rupees Only';
}

/**
 * Converts positive integer to Nepali Devnagari words (करोड, लाख, हजार, सय, रुपैयाँ मात्र)
 */
export function amountToNepaliWords(num: number): string {
  if (isNaN(num) || num <= 0) return 'शून्य रुपैयाँ मात्र।';
  const val = Math.floor(num);

  const crore = Math.floor(val / 10000000);
  let remainder = val % 10000000;

  const lakh = Math.floor(remainder / 100000);
  remainder = remainder % 100000;

  const thousand = Math.floor(remainder / 1000);
  remainder = remainder % 1000;

  const hundred = Math.floor(remainder / 100);
  const rest = remainder % 100;

  const parts: string[] = [];

  if (crore > 0) {
    const word = crore < NEPALI_ONES.length ? NEPALI_ONES[crore] : `${crore}`;
    parts.push(`${word} करोड`);
  }
  if (lakh > 0) {
    const word = lakh < NEPALI_ONES.length ? NEPALI_ONES[lakh] : `${lakh}`;
    parts.push(`${word} लाख`);
  }
  if (thousand > 0) {
    const word = thousand < NEPALI_ONES.length ? NEPALI_ONES[thousand] : `${thousand}`;
    parts.push(`${word} हजार`);
  }
  if (hundred > 0) {
    const word = hundred < NEPALI_ONES.length ? NEPALI_ONES[hundred] : `${hundred}`;
    parts.push(`${word} सय`);
  }
  if (rest > 0) {
    const word = rest < NEPALI_ONES.length ? NEPALI_ONES[rest] : `${rest}`;
    parts.push(word);
  }

  return parts.join(' ') + ' रुपैयाँ मात्र।';
}
