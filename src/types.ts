export type Language = 'ne' | 'en';

export type ActiveView = 
  | 'home' 
  | 'about' 
  | 'services' 
  | 'savings' 
  | 'loans' 
  | 'note_counter'
  | 'calendar'
  | 'notices' 
  | 'downloads' 
  | 'gallery' 
  | 'reports' 
  | 'contact' 
  | 'member_portal' 
  | 'admin_portal';

export interface CalendarEvent {
  id: number;
  date_bs: string;
  date_ad: string;
  title_ne: string;
  title_en: string;
  type: 'holiday' | 'cooperative' | 'agm' | 'installment' | 'festival';
  is_holiday: boolean;
  description_ne?: string;
  description_en?: string;
}

export interface SavingsProduct {
  id: number;
  slug: string;
  name_en: string;
  name_ne: string;
  interest_rate: number;
  min_balance: number;
  interest_payout_en: string;
  interest_payout_ne: string;
  summary_en: string;
  summary_ne: string;
  features_en: string[];
  features_ne: string[];
  icon: string;
}

export interface LoanProduct {
  id: number;
  slug: string;
  name_en: string;
  name_ne: string;
  interest_rate: number;
  max_tenure_months: number;
  service_charge: number;
  summary_en: string;
  summary_ne: string;
  requirements_en: string[];
  requirements_ne: string[];
  icon: string;
}

export interface Notice {
  id: number;
  category: 'general' | 'agm' | 'financial' | 'member' | 'vacancy' | 'holiday';
  title_en: string;
  title_ne: string;
  content_en: string;
  content_ne: string;
  published_date: string;
  is_popup: boolean;
  is_featured: boolean;
  file_name?: string;
  views_count: number;
}

export interface BoardMember {
  id: number;
  name_en: string;
  name_ne: string;
  designation_en: string;
  designation_ne: string;
  role_group: 'board' | 'account' | 'management';
  phone?: string;
  photo?: string;
}

export interface DownloadItem {
  id: number;
  category: 'forms' | 'reports' | 'bylaws' | 'financials';
  title_en: string;
  title_ne: string;
  file_size: string;
  file_format: string;
  download_count: number;
}

export interface GalleryItem {
  id: number;
  title_en: string;
  title_ne: string;
  category: 'agm' | 'csr' | 'trainings' | 'office';
  image_url: string;
}

export interface MemberTransaction {
  id: string;
  account_number: string;
  date: string;
  type: 'credit' | 'debit';
  amount: number;
  balance_after: number;
  narration_en: string;
  narration_ne: string;
  method: string;
}

export interface MemberLoanSchedule {
  month: number;
  dueDate: string;
  installment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
  status: 'paid' | 'upcoming';
}

export interface MemberProfile {
  member_code: string;
  citizenship_no: string;
  full_name_en: string;
  full_name_ne: string;
  father_name_en: string;
  address_en: string;
  address_ne: string;
  phone: string;
  email: string;
  membership_date: string;
  kyc_status: 'verified' | 'pending';
  share_count: number;
  share_amount: number;
  savings_accounts: {
    account_number: string;
    product_name_en: string;
    product_name_ne: string;
    balance: number;
    interest_rate: number;
  }[];
  active_loan?: {
    loan_number: string;
    product_name_en: string;
    product_name_ne: string;
    principal: number;
    outstanding: number;
    monthly_emi: number;
    interest_rate: number;
    next_due_date: string;
    schedule: MemberLoanSchedule[];
  };
}

export interface ContactMessage {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  created_at: string;
  status: 'unread' | 'read' | 'replied';
  admin_reply?: string;
}

export interface MemberKYCData {
  full_name_en: string;
  full_name_ne: string;
  date_of_birth_bs: string;
  date_of_birth_ad: string;
  gender: 'male' | 'female' | 'other';
  marital_status: 'married' | 'unmarried' | 'other';
  citizenship_no: string;
  citizenship_issued_district: string;
  citizenship_issued_date_bs: string;
  father_name: string;
  mother_name: string;
  grandfather_name: string;
  spouse_name?: string;
  permanent_province: string;
  permanent_district: string;
  permanent_municipality: string;
  permanent_ward: string;
  permanent_tole: string;
  current_same_as_permanent: boolean;
  current_province: string;
  current_district: string;
  current_municipality: string;
  current_ward: string;
  current_tole: string;
  phone: string;
  email: string;
  occupation: string;
  annual_income_range: string;
  pan_number?: string;
  nominee_name: string;
  nominee_relation: string;
  nominee_citizenship_no: string;
  documents: {
    citizenship_front?: string;
    citizenship_back?: string;
    passport_photo?: string;
    utility_bill?: string;
  };
}

export interface MemberRequest {
  id: number;
  member_code: string;
  member_name: string;
  type: 'profile_update' | 'kyc_update' | 'loan_inquiry' | 'cheque_book' | 'statement';
  details: string;
  created_at: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface AuditLogItem {
  id: number;
  timestamp: string;
  user: string;
  action: string;
  details: string;
}
