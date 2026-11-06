import React, { useState, useEffect } from 'react';
import { 
  Language, 
  ActiveView, 
  Notice, 
  SavingsProduct, 
  LoanProduct, 
  DownloadItem, 
  GalleryItem, 
  ContactMessage, 
  MemberRequest, 
  AuditLogItem, 
  MemberTransaction 
} from './types';
import { 
  INITIAL_SAVINGS_PRODUCTS, 
  INITIAL_LOAN_PRODUCTS, 
  INITIAL_NOTICES, 
  INITIAL_BOARD_MEMBERS, 
  INITIAL_DOWNLOADS, 
  INITIAL_GALLERY, 
  DEMO_MEMBER_PROFILE, 
  INITIAL_MEMBER_TRANSACTIONS, 
  INITIAL_CONTACT_MESSAGES, 
  INITIAL_MEMBER_REQUESTS, 
  INITIAL_AUDIT_LOGS,
  COMMUNITY_IMAGE,
  BUILDING_IMAGE
} from './data/cooperativeData';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HeroSlider } from './components/HeroSlider';
import { PopupModal } from './components/PopupModal';
import { ChairmanMessage } from './components/ChairmanMessage';
import { SavingsAndLoans } from './components/SavingsAndLoans';
import { NoticeBoard } from './components/NoticeBoard';
import { AboutSection } from './components/AboutSection';
import { DownloadsCenter } from './components/DownloadsCenter';
import { GalleryView } from './components/GalleryView';
import { ContactView } from './components/ContactView';
import { MemberPortal } from './components/MemberPortal';
import { AdminDashboard } from './components/AdminDashboard';
import { NoteCounter } from './components/NoteCounter';

import { 
  ShieldCheck, 
  Users, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2, 
  Award, 
  Building2, 
  FileCheck2, 
  Quote, 
  ExternalLink 
} from 'lucide-react';

export default function App() {
  // Default to Nepali ('ne') as strictly required by prompt
  const [lang, setLang] = useState<Language>('ne');
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Cooperative Dynamic State
  const [savingsProducts, setSavingsProducts] = useState<SavingsProduct[]>(INITIAL_SAVINGS_PRODUCTS);
  const [loanProducts, setLoanProducts] = useState<LoanProduct[]>(INITIAL_LOAN_PRODUCTS);
  const [notices, setNotices] = useState<Notice[]>(INITIAL_NOTICES);
  const [downloads, setDownloads] = useState<DownloadItem[]>(INITIAL_DOWNLOADS);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>(INITIAL_CONTACT_MESSAGES);
  const [memberRequests, setMemberRequests] = useState<MemberRequest[]>(INITIAL_MEMBER_REQUESTS);
  const [transactions, setTransactions] = useState<MemberTransaction[]>(INITIAL_MEMBER_TRANSACTIONS);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(INITIAL_AUDIT_LOGS);

  // Popup Modal Control
  const [showPopup, setShowPopup] = useState(false);
  const activePopupNotice = notices.find(n => n.is_popup);

  useEffect(() => {
    // Check if dismissed previously
    if (activePopupNotice) {
      const dismissed = localStorage.getItem('aadhunik_dismissed_popup_' + activePopupNotice.id);
      if (!dismissed) {
        const timer = setTimeout(() => setShowPopup(true), 1200);
        return () => clearTimeout(timer);
      }
    }
  }, [activePopupNotice]);

  // Log Audit helper
  const addAuditLog = (user: string, action: string, details: string) => {
    const newLog: AuditLogItem = {
      id: Date.now(),
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      user,
      action,
      details
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Admin Notice Actions
  const handleAddNotice = (noticeData: Omit<Notice, 'id' | 'views_count'>) => {
    const newNotice: Notice = {
      ...noticeData,
      id: Date.now(),
      views_count: 0
    };
    setNotices(prev => [newNotice, ...prev]);
    addAuditLog('Admin', 'NOTICE_CREATED', `Created notice: ${newNotice.title_en}`);
  };

  const handleDeleteNotice = (id: number) => {
    setNotices(prev => prev.filter(n => n.id !== id));
    addAuditLog('Admin', 'NOTICE_DELETED', `Deleted notice ID #${id}`);
  };

  // Inquiries Actions
  const handleSendMessage = (msgData: Omit<ContactMessage, 'id' | 'created_at' | 'status'>) => {
    const newMsg: ContactMessage = {
      ...msgData,
      id: Date.now(),
      created_at: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'unread'
    };
    setContactMessages(prev => [newMsg, ...prev]);
    addAuditLog('Public Visitor', 'INQUIRY_SUBMITTED', `Inquiry received from ${newMsg.full_name} (${newMsg.phone})`);
  };

  const handleReplyMessage = (id: number, reply: string) => {
    setContactMessages(prev => prev.map(m => {
      if (m.id === id) {
        return { ...m, status: 'replied', admin_reply: reply };
      }
      return m;
    }));
    addAuditLog('Admin', 'INQUIRY_REPLIED', `Replied to inquiry ID #${id}`);
  };

  // Member Request Actions
  const handleAddMemberRequest = (reqData: Omit<MemberRequest, 'id' | 'created_at' | 'status'>) => {
    const newReq: MemberRequest = {
      ...reqData,
      id: Date.now(),
      created_at: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'pending'
    };
    setMemberRequests(prev => [newReq, ...prev]);
    addAuditLog(reqData.member_name, 'MEMBER_REQUEST', `Submitted ${reqData.type} request`);
  };

  const handleApproveRequest = (id: number, status: 'approved' | 'rejected') => {
    setMemberRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    addAuditLog('Admin', `REQUEST_${status.toUpperCase()}`, `Updated member request #${id} to ${status}`);
  };

  // Rate Updates
  const handleUpdateSavingsRate = (id: number, newRate: number) => {
    setSavingsProducts(prev => prev.map(p => p.id === id ? { ...p, interest_rate: newRate } : p));
    addAuditLog('Admin', 'SAVINGS_RATE_UPDATE', `Updated product #${id} rate to ${newRate}%`);
  };

  const handleUpdateLoanRate = (id: number, newRate: number) => {
    setLoanProducts(prev => prev.map(p => p.id === id ? { ...p, interest_rate: newRate } : p));
    addAuditLog('Admin', 'LOAN_RATE_UPDATE', `Updated loan #${id} rate to ${newRate}%`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7F6] text-slate-800">
      {/* Top Header */}
      <Header
        lang={lang}
        onLanguageChange={setLang}
        activeView={activeView}
        onNavigate={(view) => {
          setActiveView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSearch={(query) => setSearchQuery(query)}
      />

      {/* Popup Notification Modal (Admin-controlled Section 8) */}
      {showPopup && activePopupNotice && (
        <PopupModal
          notice={activePopupNotice}
          lang={lang}
          onClose={() => setShowPopup(false)}
        />
      )}

      {/* Main Content Router */}
      <main className="flex-1 pb-16 md:pb-0">
        {activeView === 'home' && (
          <div>
            {/* Hero Slider with Real Kathmandu Images */}
            <HeroSlider
              lang={lang}
              onNavigate={(view) => {
                setActiveView(view);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Welcome & Cooperative Introduction */}
            <section className="py-12 bg-white border-b border-slate-200">
              <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 rounded-xl bg-[#F5F7F6] border border-slate-200 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#146B45]/10 text-[#146B45] flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#17324D] mb-1">
                        {lang === 'ne' ? 'सुरक्षित निक्षेप तथा बचत' : '100% Safe Savings'}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {lang === 'ne'
                          ? 'सहकारी ऐन तथा सिद्धान्तहरूको पूर्ण परिपालनाका साथ सदस्यहरूको निक्षेप उच्चतम रूपमा सुरक्षित।'
                          : 'Stringent compliance with cooperative laws and safety reserves safeguarding member deposits.'}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 rounded-xl bg-[#F5F7F6] border border-slate-200 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#17324D]/10 text-[#17324D] flex items-center justify-center shrink-0">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#17324D] mb-1">
                        {lang === 'ne' ? 'आकर्षक वार्षिक ब्याजदर' : 'High Competitive Returns'}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {lang === 'ne'
                          ? 'मुद्दती बचतमा १०.५०% सम्म तथा मासिक क्रमिक बचतमा ८.५०% सम्मको सुनिश्चित प्रतिफल।'
                          : 'Up to 10.50% p.a. on fixed deposits with quarterly or monthly compound payout options.'}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 rounded-xl bg-[#F5F7F6] border border-slate-200 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#D6A63C]/15 text-amber-800 flex items-center justify-center shrink-0">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#17324D] mb-1">
                        {lang === 'ne' ? 'सुलभ तथा छिटो कर्जा' : 'Fast & Accessible Loans'}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {lang === 'ne'
                          ? 'व्यापार, कृषि, शिक्षा तथा आकस्मिक कर्जा न्यून सेवा शुल्क तथा सहज कागजी प्रक्रियामा उपलब्ध।'
                          : 'Low-interest credit for small trade, agriculture, home renovation, and urgent relief.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Chairman's Message Section with Portrait */}
            <ChairmanMessage lang={lang} />

            {/* Savings & Loan Highlights with Calculators */}
            <SavingsAndLoans
              lang={lang}
              savingsProducts={savingsProducts}
              loanProducts={loanProducts}
              onNavigate={(view) => {
                setActiveView(view);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Latest Notices on Homepage */}
            <NoticeBoard
              notices={notices.slice(0, 4)}
              lang={lang}
              initialSearch=""
            />

            {/* Membership Benefits / Community Callout */}
            <section className="py-14 sm:py-20 bg-[#17324D] text-white">
              <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                  <div className="lg:col-span-7 space-y-4">
                    <span className="text-xs font-semibold text-[#D6A63C] uppercase tracking-wider block">
                      {lang === 'ne' ? 'सहकारी सदस्यताको फाइदा' : 'Why Become A Member?'}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                      {lang === 'ne' 
                        ? 'आजै आधुनिक जन सहकारीको सेयर सदस्य बन्नुहोस्' 
                        : 'Join Aadhunik Jana Saving & Credit Co-operative Today'}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      {lang === 'ne'
                        ? 'हाम्रो संस्था नागार्जुन-४, काठमाडौँका हजारौं परिवारको आर्थिक संवाहक हो। सदस्य बनेर वार्षिक आकर्षक लाभांश, सहुलियत कर्जा र सुरक्षित बचतको फाइदा लिनुहोस्।'
                        : 'Empowering over 3,450 local households across Nagarjun. Enjoy annual dividend shares, low-fee emergency credit, and modern digital passbook access.'}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className="flex items-center gap-2 text-xs text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-[#D6A63C] shrink-0" />
                        <span>{lang === 'ne' ? 'वार्षिक सेयर लाभांश भुक्तानी' : 'Annual Share Dividend Distribution'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-[#D6A63C] shrink-0" />
                        <span>{lang === 'ne' ? '२४ घण्टाभित्र आकस्मिक कर्जा' : '24-Hour Emergency Loan Relief'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-[#D6A63C] shrink-0" />
                        <span>{lang === 'ne' ? 'निःशुल्क मोबाइल एसएमएस सूचना' : 'Free Instant SMS Banking Alerts'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-[#D6A63C] shrink-0" />
                        <span>{lang === 'ne' ? 'वार्षिक सदस्य स्वास्थ्य शिविर' : 'Annual Health & Wellness Checkup'}</span>
                      </div>
                    </div>

                    <div className="pt-4 flex flex-wrap gap-3">
                      <button
                        onClick={() => setActiveView('downloads')}
                        className="px-5 py-2.5 bg-[#146B45] hover:bg-[#105537] text-white text-xs font-semibold rounded-lg flex items-center gap-2 shadow-sm"
                      >
                        <span>{lang === 'ne' ? 'सदस्यता फारम डाउनलोड' : 'Download Membership Form'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setActiveView('contact')}
                        className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-semibold rounded-lg"
                      >
                        {lang === 'ne' ? 'शाखा कार्यालय सम्पर्क' : 'Contact Nagarjun Office'}
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-5">
                    <div className="rounded-2xl overflow-hidden shadow-xl border border-white/10">
                      <img
                        src={COMMUNITY_IMAGE}
                        alt="Community Empowerment"
                        className="w-full h-72 sm:h-80 object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* View 2: About Us */}
        {activeView === 'about' && (
          <AboutSection 
            lang={lang} 
            boardMembers={INITIAL_BOARD_MEMBERS} 
            onNavigate={(view) => {
              setActiveView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* View 3: Services General */}
        {activeView === 'services' && (
          <SavingsAndLoans
            lang={lang}
            savingsProducts={savingsProducts}
            loanProducts={loanProducts}
            onNavigate={(view) => {
              setActiveView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* View 4: Savings Specific */}
        {activeView === 'savings' && (
          <SavingsAndLoans
            lang={lang}
            savingsProducts={savingsProducts}
            loanProducts={loanProducts}
            onNavigate={(view) => {
              setActiveView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            defaultTab="savings"
          />
        )}

        {/* View 5: Loans Specific */}
        {activeView === 'loans' && (
          <SavingsAndLoans
            lang={lang}
            savingsProducts={savingsProducts}
            loanProducts={loanProducts}
            onNavigate={(view) => {
              setActiveView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            defaultTab="loans"
          />
        )}

        {/* View: Note Counter & Cash Voucher */}
        {activeView === 'note_counter' && (
          <div className="py-12 sm:py-16 bg-[#F5F7F6]">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
              <NoteCounter
                lang={lang}
                onNavigateToMemberPortal={() => {
                  setActiveView('member_portal');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </div>
          </div>
        )}

        {/* View 6: Notices & Announcements */}
        {activeView === 'notices' && (
          <NoticeBoard
            notices={notices}
            lang={lang}
            initialSearch={searchQuery}
          />
        )}

        {/* View 7: Downloads Center */}
        {activeView === 'downloads' && (
          <DownloadsCenter
            downloads={downloads}
            lang={lang}
          />
        )}

        {/* View 8: Gallery */}
        {activeView === 'gallery' && (
          <GalleryView
            items={INITIAL_GALLERY}
            lang={lang}
          />
        )}

        {/* View 9: Reports & Financials */}
        {activeView === 'reports' && (
          <DownloadsCenter
            downloads={downloads.filter(d => d.category === 'reports' || d.category === 'bylaws')}
            lang={lang}
          />
        )}

        {/* View 10: Contact Us */}
        {activeView === 'contact' && (
          <ContactView
            lang={lang}
            onSendMessage={handleSendMessage}
          />
        )}

        {/* View 11: Member Portal */}
        {activeView === 'member_portal' && (
          <MemberPortal
            lang={lang}
            memberProfile={DEMO_MEMBER_PROFILE}
            transactions={transactions}
            onAddRequest={handleAddMemberRequest}
            onLogout={() => setActiveView('home')}
          />
        )}

        {/* View 12: Admin Dashboard */}
        {activeView === 'admin_portal' && (
          <AdminDashboard
            lang={lang}
            notices={notices}
            contactMessages={contactMessages}
            memberRequests={memberRequests}
            auditLogs={auditLogs}
            savingsProducts={savingsProducts}
            loanProducts={loanProducts}
            downloads={downloads}
            onAddNotice={handleAddNotice}
            onDeleteNotice={handleDeleteNotice}
            onReplyMessage={handleReplyMessage}
            onApproveRequest={handleApproveRequest}
            onUpdateSavingsRate={handleUpdateSavingsRate}
            onUpdateLoanRate={handleUpdateLoanRate}
            onLogout={() => setActiveView('home')}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        lang={lang}
        onNavigate={(view) => {
          setActiveView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Mobile Floating Quick Dock (Under 15% sticky cap) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-1.5 flex items-center justify-around shadow-lg">
        <button
          onClick={() => {
            setActiveView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] text-[10px] font-semibold transition-colors ${
            activeView === 'home' ? 'text-[#146B45]' : 'text-slate-600'
          }`}
        >
          <Building2 className="w-4 h-4 mb-0.5" />
          <span>{lang === 'ne' ? 'गृह' : 'Home'}</span>
        </button>

        <button
          onClick={() => {
            setActiveView('savings');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] text-[10px] font-semibold transition-colors ${
            activeView === 'savings' ? 'text-[#146B45]' : 'text-slate-600'
          }`}
        >
          <TrendingUp className="w-4 h-4 mb-0.5" />
          <span>{lang === 'ne' ? 'बचत' : 'Savings'}</span>
        </button>

        <button
          onClick={() => {
            setActiveView('member_portal');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] text-[10px] font-semibold transition-colors ${
            activeView === 'member_portal' ? 'text-[#146B45] font-bold' : 'text-slate-700'
          }`}
        >
          <div className="w-7 h-7 rounded-full bg-[#146B45] text-white flex items-center justify-center shadow-xs">
            <Users className="w-3.5 h-3.5" />
          </div>
          <span className="mt-0.5">{lang === 'ne' ? 'सदस्य' : 'Portal'}</span>
        </button>

        <button
          onClick={() => {
            setActiveView('notices');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] text-[10px] font-semibold transition-colors ${
            activeView === 'notices' ? 'text-[#146B45]' : 'text-slate-600'
          }`}
        >
          <FileCheck2 className="w-4 h-4 mb-0.5" />
          <span>{lang === 'ne' ? 'सूचना' : 'Notices'}</span>
        </button>

        <a
          href="tel:+977014880000"
          className="flex flex-col items-center justify-center min-w-[56px] min-h-[44px] text-[10px] font-semibold text-slate-600 hover:text-[#146B45] transition-colors"
        >
          <div className="w-4 h-4 flex items-center justify-center mb-0.5">
            📞
          </div>
          <span>{lang === 'ne' ? 'फोन' : 'Call'}</span>
        </a>
      </div>
    </div>
  );
}
