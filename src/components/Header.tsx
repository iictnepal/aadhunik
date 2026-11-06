import React, { useState } from 'react';
import { Language, ActiveView } from '../types';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Globe, 
  Search, 
  User, 
  ShieldCheck, 
  Menu, 
  X, 
  ChevronDown,
  Calendar
} from 'lucide-react';

interface HeaderProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  activeView: ActiveView;
  onNavigate: (view: ActiveView) => void;
  onSearch: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onLanguageChange,
  activeView,
  onNavigate,
  onSearch
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [servicesDropdown, setServicesDropdown] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
      onNavigate('notices');
    }
  };

  const navLinks = [
    { id: 'home' as ActiveView, label_ne: 'गृहपृष्ठ', label_en: 'Home' },
    { id: 'about' as ActiveView, label_ne: 'हाम्रो बारेमा', label_en: 'About Us' },
    { id: 'services' as ActiveView, label_ne: 'सेवाहरू', label_en: 'Services', hasDropdown: true },
    { id: 'savings' as ActiveView, label_ne: 'बचत योजनाहरू', label_en: 'Savings' },
    { id: 'loans' as ActiveView, label_ne: 'कर्जा सुविधाहरू', label_en: 'Loans' },
    { id: 'calendar' as ActiveView, label_ne: 'पात्रो / क्यालेन्डर', label_en: 'Calendar' },
    { id: 'notices' as ActiveView, label_ne: 'सूचना तथा समाचार', label_en: 'Notices' },
    { id: 'downloads' as ActiveView, label_ne: 'डाउनलोडहरू', label_en: 'Downloads' },
    { id: 'gallery' as ActiveView, label_ne: 'ग्यालरी', label_en: 'Gallery' },
    { id: 'contact' as ActiveView, label_ne: 'सम्पर्क', label_en: 'Contact' },
  ];

  return (
    <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      {/* Utility Top Bar - Compact on Mobile */}
      <div className="bg-[#17324D] text-white text-[11px] sm:text-xs py-1.5 sm:py-2 px-3 sm:px-4 md:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Contact Details & Dual Date Indicator */}
          <div className="flex items-center gap-2 sm:gap-4 text-slate-200 min-w-0">
            <a href="tel:+977014880000" className="flex items-center gap-1 sm:gap-1.5 hover:text-white transition-colors shrink-0">
              <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#D6A63C]" />
              <span className="font-mono">+977-01-4880000</span>
            </a>

            {/* Clickable Dual Calendar Indicator */}
            <button
              type="button"
              onClick={() => onNavigate('calendar')}
              className="flex items-center gap-1.5 text-slate-200 hover:text-white transition-colors cursor-pointer text-[10px] sm:text-xs bg-white/10 hover:bg-white/15 px-2 py-0.5 rounded-sm shrink-0"
              title={lang === 'ne' ? 'नेपाली तथा अंग्रेजी पात्रो हेर्नुहोस्' : 'View Nepali & English Calendar'}
            >
              <Calendar className="w-3 h-3 text-[#D6A63C]" />
              <span className="font-mono">
                {lang === 'ne' ? '२०८३ कार्तिक २१' : '21 Kartik 2083 | 06 Nov'}
              </span>
            </button>

            <span className="hidden lg:flex items-center gap-1.5 text-slate-300 truncate">
              <MapPin className="w-3.5 h-3.5 text-[#D6A63C] shrink-0" />
              <span className="truncate">{lang === 'ne' ? 'नागार्जुन-४, काठमाडौँ' : 'Nagarjun-4, Kathmandu'}</span>
            </span>
          </div>

          {/* Quick Actions & Language Switcher */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Search Bar (desktop) */}
            <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center relative">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === 'ne' ? 'खोज्नुहोस्...' : 'Search...'}
                className="bg-white/10 text-white placeholder-slate-300 text-xs rounded-md pl-7 pr-3 py-1 focus:outline-hidden focus:ring-1 focus:ring-[#D6A63C] w-36 lg:w-48 transition-all"
              />
              <Search className="w-3.5 h-3.5 text-slate-300 absolute left-2 pointer-events-none" />
            </form>

            {/* Language Switcher */}
            <div className="flex items-center bg-white/10 rounded-md p-0.5">
              <button 
                onClick={() => onLanguageChange('ne')} 
                className={`px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs rounded-sm transition-colors ${lang === 'ne' ? 'bg-[#146B45] text-white font-semibold' : 'text-slate-300 hover:text-white'}`}
                title="नेपाली भाषा"
              >
                नेपाली
              </button>
              <button 
                onClick={() => onLanguageChange('en')} 
                className={`px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs rounded-sm transition-colors ${lang === 'en' ? 'bg-[#146B45] text-white font-semibold' : 'text-slate-300 hover:text-white'}`}
                title="English Language"
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-8 py-2.5 sm:py-3.5">
        <div className="flex items-center justify-between gap-3 sm:gap-6">
          {/* Zone 1: Brand Lockup */}
          {/* Zone 1: Official Horizontal Brand Logo with Transparency */}
          <button 
            onClick={() => onNavigate('home')} 
            className="flex items-center text-left group shrink-0 py-0.5"
            aria-label="Aadhunik Jana Saving & Credit Co-operative Ltd."
          >
            <img 
              src="/assets/aistudio/logo_aj-removebg-preview_9a0d83cb.png" 
              alt="Aadhunik Jana Saving & Credit Co-operative Ltd." 
              className="h-10 sm:h-12 md:h-14 w-auto object-contain max-w-[210px] xs:max-w-[270px] sm:max-w-[340px] md:max-w-[390px] transition-transform group-hover:scale-[1.01]" 
            />
          </button>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden xl:flex items-center gap-5 text-sm font-medium text-slate-700">
            {navLinks.map((link) => {
              const isActive = activeView === link.id;
              if (link.hasDropdown) {
                return (
                  <div 
                    key={link.id} 
                    className="relative"
                    onMouseEnter={() => setServicesDropdown(true)}
                    onMouseLeave={() => setServicesDropdown(false)}
                  >
                    <button 
                      onClick={() => onNavigate('services')}
                      className={`flex items-center gap-1 py-1 hover:text-[#146B45] transition-colors whitespace-nowrap ${
                        isActive ? 'text-[#146B45] font-semibold border-b-2 border-[#146B45]' : ''
                      }`}
                    >
                      <span>{lang === 'ne' ? link.label_ne : link.label_en}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    </button>

                    {/* Dropdown Menu */}
                    {servicesDropdown && (
                      <div className="absolute top-full left-0 w-60 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-1">
                        <button 
                          onClick={() => { onNavigate('savings'); setServicesDropdown(false); }}
                          className="w-full text-left px-4 py-2 text-xs hover:bg-[#F5F7F6] text-slate-700 hover:text-[#146B45] flex items-center justify-between"
                        >
                          <span>{lang === 'ne' ? 'बचत खाताहरू (Savings)' : 'Savings Schemes'}</span>
                          <span className="text-[10px] text-slate-400 font-mono">6 schemes</span>
                        </button>
                        <button 
                          onClick={() => { onNavigate('loans'); setServicesDropdown(false); }}
                          className="w-full text-left px-4 py-2 text-xs hover:bg-[#F5F7F6] text-slate-700 hover:text-[#146B45] flex items-center justify-between"
                        >
                          <span>{lang === 'ne' ? 'कर्जा सुविधाहरू (Loans)' : 'Loan Facilities'}</span>
                          <span className="text-[10px] text-slate-400 font-mono">5 facilities</span>
                        </button>
                        <button 
                          onClick={() => { onNavigate('note_counter'); setServicesDropdown(false); }}
                          className="w-full text-left px-4 py-2 text-xs hover:bg-[#F5F7F6] text-slate-700 hover:text-[#146B45] flex items-center justify-between"
                        >
                          <span className="font-medium text-[#146B45]">{lang === 'ne' ? 'नोट काउन्टर (Note Counter)' : 'Note Counter & Voucher'}</span>
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded-full font-bold">New</span>
                        </button>
                        <button 
                          onClick={() => { onNavigate('services'); setServicesDropdown(false); }}
                          className="w-full text-left px-4 py-2 text-xs hover:bg-[#F5F7F6] text-slate-700 hover:text-[#146B45] border-t border-slate-100"
                        >
                          <span>{lang === 'ne' ? 'सबै सेवाहरू तथा क्यालकुलेटर' : 'All Services & Calculators'}</span>
                        </button>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={`py-1 hover:text-[#146B45] transition-colors whitespace-nowrap ${
                    isActive ? 'text-[#146B45] font-semibold border-b-2 border-[#146B45]' : ''
                  }`}
                >
                  {lang === 'ne' ? link.label_ne : link.label_en}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action & Portal Access */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Member Portal Button */}
            <button
              onClick={() => onNavigate('member_portal')}
              className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold rounded-lg transition-all shadow-xs ${
                activeView === 'member_portal'
                  ? 'bg-[#146B45] text-white ring-2 ring-[#D6A63C]'
                  : 'bg-[#146B45] hover:bg-[#105537] text-white'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>{lang === 'ne' ? 'सदस्य' : 'Login'}</span>
            </button>

            {/* Admin Portal Button */}
            <button
              onClick={() => onNavigate('admin_portal')}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-colors ${
                activeView === 'admin_portal'
                  ? 'bg-[#17324D] text-white border-[#17324D]'
                  : 'border-slate-300 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#146B45]" />
              <span>{lang === 'ne' ? 'प्रशासक' : 'Admin'}</span>
            </button>

            {/* Mobile Menu Toggle Button (minimum 44px touch target) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden w-10 h-10 flex items-center justify-center text-slate-700 hover:bg-slate-100 active:bg-slate-200 rounded-lg transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-slate-900" /> : <Menu className="w-5 h-5 text-slate-900" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden pt-3 pb-4 border-t border-slate-200 mt-2.5 flex flex-col gap-1 max-h-[calc(100vh-120px)] overflow-y-auto animate-in fade-in duration-150">
            {/* Horizontal logo in mobile drawer */}
            <div className="pb-2.5 mb-1 px-1 flex items-center justify-between border-b border-slate-100">
              <img 
                src="/assets/aistudio/logo_aj-removebg-preview_9a0d83cb.png" 
                alt="Aadhunik Jana Saving & Credit Co-operative Ltd." 
                className="h-9 w-auto object-contain max-w-[220px]" 
              />
              <span className="text-[10px] font-mono text-slate-400">Reg. 1024</span>
            </div>

            {/* Search form in mobile drawer */}
            <form onSubmit={(e) => { handleSearchSubmit(e); setMobileMenuOpen(false); }} className="relative mb-2">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === 'ne' ? 'सूचना, सेवा वा फारम खोज्नुहोस्...' : 'Search notices, services, forms...'}
                className="w-full pl-9 pr-4 py-2.5 text-xs bg-slate-100 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#146B45]"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
            </form>

            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2.5 text-xs sm:text-sm rounded-lg transition-colors min-h-[44px] flex items-center justify-between ${
                  activeView === link.id
                    ? 'bg-[#146B45]/10 text-[#146B45] font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{lang === 'ne' ? link.label_ne : link.label_en}</span>
                {activeView === link.id && <span className="w-1.5 h-1.5 rounded-full bg-[#146B45]" />}
              </button>
            ))}

            <div className="pt-3 border-t border-slate-200 flex flex-col gap-2 mt-2">
              <button
                onClick={() => {
                  onNavigate('member_portal');
                  setMobileMenuOpen(false);
                }}
                className="w-full min-h-[44px] py-2.5 px-3 text-xs font-semibold bg-[#146B45] text-white rounded-lg flex items-center justify-center gap-2 shadow-xs"
              >
                <User className="w-4 h-4 text-[#D6A63C]" />
                <span>{lang === 'ne' ? 'सदस्य लगइन पोर्टल (Member Portal)' : 'Member Login Portal'}</span>
              </button>
              <button
                onClick={() => {
                  onNavigate('admin_portal');
                  setMobileMenuOpen(false);
                }}
                className="w-full min-h-[44px] py-2.5 px-3 text-xs font-semibold border border-[#17324D] text-[#17324D] bg-white rounded-lg flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-[#146B45]" />
                <span>{lang === 'ne' ? 'प्रशासक नियन्त्रण कक्ष (Admin Dashboard)' : 'Admin Dashboard'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
