import React from 'react';
import { Language, ActiveView } from '../types';
import { MapPin, Phone, Mail, Clock, ShieldCheck, ChevronRight, Facebook, Youtube } from 'lucide-react';

interface FooterProps {
  lang: Language;
  onNavigate: (view: ActiveView) => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onNavigate }) => {
  return (
    <footer className="bg-[#17324D] text-white border-t border-white/10 pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Organization Introduction */}
          <div className="lg:col-span-4 space-y-4">
            {/* Horizontal Official Logo with Transparency */}
            <button 
              onClick={() => {
                onNavigate('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-block p-2.5 sm:p-3 bg-white/95 hover:bg-white rounded-xl shadow-xs border border-white/20 transition-all text-left group"
              aria-label="Aadhunik Jana Saving & Credit Co-operative Ltd."
            >
              <img 
                src="/assets/aistudio/logo_aj-removebg-preview_9a0d83cb.png" 
                alt="Aadhunik Jana Saving & Credit Co-operative Ltd." 
                className="h-10 sm:h-12 w-auto object-contain max-w-[240px] sm:max-w-[280px] transition-transform group-hover:scale-[1.01]" 
              />
            </button>

            <p className="text-xs text-slate-300 leading-relaxed">
              {lang === 'ne' 
                ? 'नागार्जुन-४, काठमाडौँमा वि.सं. २०६५ मा विधिवत दर्ता भएको यस संस्थाले समुदायमा बचत परिचालन, सहुलियतपूर्ण कर्जा तथा वित्तीय सशक्तीकरणका लागि निरन्तर सेवा प्रदान गर्दै आइरहेको छ।'
                : 'Registered in 2065 B.S. in Nagarjun-4, Kathmandu, providing trusted financial solutions, secure savings, and accessible credit for community prosperity.'}
            </p>

            <div className="text-xs text-slate-400 font-mono space-y-1">
              <div>{lang === 'ne' ? 'दर्ता नं.: १०२४/०६५/०६६' : 'Reg. No.: 1024/065/066'}</div>
              <div>{lang === 'ne' ? 'स्थायी लेखा नं. (PAN): ३०२९४८५७१' : 'PAN / VAT: 302948571'}</div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook Page"
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#146B45] text-white flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube Channel"
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-red-600 text-white flex items-center justify-center transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-[#D6A63C] uppercase tracking-wider">
              {lang === 'ne' ? 'उपयोगी लिङ्कहरू' : 'Quick Navigation'}
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-[#D6A63C]" />
                  <span>{lang === 'ne' ? 'गृहपृष्ठ' : 'Home'}</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-[#D6A63C]" />
                  <span>{lang === 'ne' ? 'हाम्रो बारेमा' : 'About Us'}</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('savings')} className="hover:text-white transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-[#D6A63C]" />
                  <span>{lang === 'ne' ? 'बचत योजनाहरू' : 'Savings Schemes'}</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('loans')} className="hover:text-white transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-[#D6A63C]" />
                  <span>{lang === 'ne' ? 'कर्जा सुविधाहरू' : 'Loan Facilities'}</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('notices')} className="hover:text-white transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-[#D6A63C]" />
                  <span>{lang === 'ne' ? 'सूचना तथा समाचार' : 'Notices & News'}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Member Services */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-[#D6A63C] uppercase tracking-wider">
              {lang === 'ne' ? 'सदस्य तथा सेवा केन्द्र' : 'Member Services'}
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button onClick={() => onNavigate('member_portal')} className="hover:text-white transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-[#D6A63C]" />
                  <span>{lang === 'ne' ? 'सदस्य अनलाइन पोर्टल' : 'Member Login Portal'}</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('downloads')} className="hover:text-white transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-[#D6A63C]" />
                  <span>{lang === 'ne' ? 'फारम तथा प्रतिवेदन डाउनलोड' : 'Forms & Document Downloads'}</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('gallery')} className="hover:text-white transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-[#D6A63C]" />
                  <span>{lang === 'ne' ? 'कार्यक्रम तस्बिर ग्यालरी' : 'Photo Gallery'}</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('note_counter')} className="hover:text-white transition-colors flex items-center gap-1 text-[#D6A63C]">
                  <ChevronRight className="w-3 h-3 text-[#D6A63C]" />
                  <span>{lang === 'ne' ? 'नोट काउन्टर (क्यास भौचर)' : 'Note Counter & Voucher'}</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-[#D6A63C]" />
                  <span>{lang === 'ne' ? 'गुनासो तथा सोधपुछ' : 'Inquiries & Feedback'}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Office Hours */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-[#D6A63C] uppercase tracking-wider">
              {lang === 'ne' ? 'सम्पर्क ठेगाना' : 'Contact Information'}
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D6A63C] shrink-0 mt-0.5" />
                <span>{lang === 'ne' ? 'नागार्जुन-४, काठमाडौँ, नेपाल' : 'Nagarjun-4, Kathmandu, Nepal'}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D6A63C] shrink-0" />
                <span className="font-mono">+977-01-4880000 / 9851000000</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D6A63C] shrink-0" />
                <span className="font-mono">info@aadhuniksaving.com.np</span>
              </li>
              <li className="flex items-start gap-2 pt-1 border-t border-white/10">
                <Clock className="w-4 h-4 text-[#D6A63C] shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-white">
                    {lang === 'ne' ? 'कार्यालय समय:' : 'Office Hours:'}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {lang === 'ne' ? 'आइतबार - शुक्रबार: १०:०० - ५:००' : 'Sun - Fri: 10:00 AM - 5:00 PM'}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} Aadhunik Jana Saving & Credit Co-operative Ltd. All Rights Reserved.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Privacy Policy</span>
            <span aria-hidden="true">·</span>
            <span>Terms of Service</span>
            <span aria-hidden="true">·</span>
            <span>Regulated by Dept. of Cooperatives</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
