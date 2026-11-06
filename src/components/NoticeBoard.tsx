import React, { useState } from 'react';
import { Notice, Language } from '../types';
import { Search, Calendar, FileText, Download, Eye, BellRing, Filter, X } from 'lucide-react';

interface NoticeBoardProps {
  notices: Notice[];
  lang: Language;
  initialSearch?: string;
}

export const NoticeBoard: React.FC<NoticeBoardProps> = ({ notices, lang, initialSearch = '' }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [activeNoticeModal, setActiveNoticeModal] = useState<Notice | null>(null);

  const categories = [
    { id: 'all', label_ne: 'सबै सूचनाहरू', label_en: 'All Notices' },
    { id: 'agm', label_ne: 'साधारण सभा (AGM)', label_en: 'AGM Notices' },
    { id: 'financial', label_ne: 'वित्तीय विवरण', label_en: 'Financial Reports' },
    { id: 'member', label_ne: 'सदस्य सूचना', label_en: 'Member Notices' },
    { id: 'holiday', label_ne: 'बिदा सम्बन्धी', label_en: 'Holiday Notices' },
    { id: 'vacancy', label_ne: 'कर्मचारी आवश्यकता', label_en: 'Vacancies' },
    { id: 'general', label_ne: 'साधारण सूचना', label_en: 'General' },
  ];

  const filteredNotices = notices.filter((n) => {
    const matchesCategory = selectedCategory === 'all' || n.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch = 
      !searchQuery ||
      n.title_en.toLowerCase().includes(q) ||
      n.title_ne.includes(q) ||
      n.content_en.toLowerCase().includes(q) ||
      n.content_ne.includes(q);
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#146B45] uppercase tracking-wider mb-1">
              <BellRing className="w-4 h-4 text-[#D6A63C]" />
              <span>{lang === 'ne' ? 'संस्थागत सूचना तथा परिपत्र' : 'Official Notices & Circulars'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#17324D] tracking-tight">
              {lang === 'ne' ? 'ताजा सूचना तथा जानकारीहरू' : 'Latest Notices & Announcements'}
            </h2>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'ne' ? 'सूचना खोज्नुहोस्...' : 'Search notices...'}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-1 focus:ring-[#146B45]"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Tabs - Responsive flex-wrap */}
        <div className="flex flex-wrap items-center gap-1.5 pb-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`min-h-[36px] px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-[#146B45] text-white shadow-xs font-semibold'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              {lang === 'ne' ? cat.label_ne : cat.label_en}
            </button>
          ))}
        </div>

        {/* Notice Items List */}
        {filteredNotices.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-slate-300 rounded-xl">
            <p className="text-sm text-slate-500">
              {lang === 'ne' ? 'कुनै पनि सूचना फेला परेन।' : 'No notices match your selected criteria.'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredNotices.map((n) => (
              <div
                key={n.id}
                className="bg-[#F5F7F6] border border-slate-200 rounded-xl p-5 hover:border-[#146B45]/40 transition-all hover:bg-white flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex-1">
                  {/* Unboxed Metadata (Zero-pill rule: quiet inline text with bullet separators) */}
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5">
                    <span className="flex items-center gap-1 font-mono">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{n.published_date}</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="uppercase text-[#146B45] font-semibold text-[11px] tracking-wider">
                      {n.category}
                    </span>
                    {n.is_featured && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="text-amber-700 font-medium">
                          {lang === 'ne' ? 'महत्वपूर्ण' : 'Featured'}
                        </span>
                      </>
                    )}
                  </div>

                  <h3 
                    onClick={() => setActiveNoticeModal(n)}
                    className="text-base sm:text-lg font-bold text-[#17324D] hover:text-[#146B45] cursor-pointer transition-colors leading-snug"
                  >
                    {lang === 'ne' ? n.title_ne : n.title_en}
                  </h3>

                  <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                    {lang === 'ne' ? n.content_ne : n.content_en}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2.5 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-200">
                  <button
                    onClick={() => setActiveNoticeModal(n)}
                    className="px-3.5 py-1.5 bg-white border border-slate-300 hover:border-[#146B45] text-slate-700 hover:text-[#146B45] text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{lang === 'ne' ? 'पुरा पढ्नुहोस्' : 'Read Notice'}</span>
                  </button>

                  {n.file_name && (
                    <button
                      onClick={() => alert(lang === 'ne' ? `फाइल डाउनलोड भइरहेको छ: ${n.file_name}` : `Downloading notice attachment: ${n.file_name}`)}
                      className="px-3 py-1.5 bg-[#146B45] hover:bg-[#105537] text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
                      title={n.file_name}
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">PDF</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Notice Detail Modal */}
        {activeNoticeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-slate-200 max-h-[90vh] flex flex-col">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-[#17324D] text-white rounded-t-xl">
                <div>
                  <span className="text-[11px] font-mono text-[#D6A63C] uppercase tracking-wider block">
                    {activeNoticeModal.category} Notice · {activeNoticeModal.published_date}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white mt-0.5 leading-snug">
                    {lang === 'ne' ? activeNoticeModal.title_ne : activeNoticeModal.title_en}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveNoticeModal(null)}
                  className="text-white/70 hover:text-white p-1 rounded-md"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto space-y-4 text-sm text-slate-700 leading-relaxed">
                <div>
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    {lang === 'ne' ? 'नेपाली व्यहोरा' : 'Nepali Text'}
                  </h4>
                  <p className="bg-[#F5F7F6] p-3.5 rounded-lg border border-slate-200">
                    {activeNoticeModal.content_ne}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    {lang === 'ne' ? 'अंग्रेजी व्यहोरा (English Version)' : 'English Translation'}
                  </h4>
                  <p className="bg-[#F5F7F6] p-3.5 rounded-lg border border-slate-200">
                    {activeNoticeModal.content_en}
                  </p>
                </div>

                {activeNoticeModal.file_name && (
                  <div className="p-3.5 rounded-lg border border-[#146B45]/30 bg-[#146B45]/5 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-800">
                      <FileText className="w-4 h-4 text-[#146B45]" />
                      <span>{activeNoticeModal.file_name}</span>
                    </div>
                    <button
                      onClick={() => alert(`Downloading ${activeNoticeModal.file_name}`)}
                      className="px-3 py-1 bg-[#146B45] text-white text-xs font-semibold rounded-md flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{lang === 'ne' ? 'फाइल डाउनलोड' : 'Download PDF'}</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="p-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setActiveNoticeModal(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg"
                >
                  {lang === 'ne' ? 'बन्द गर्नुहोस्' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
