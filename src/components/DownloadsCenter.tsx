import React, { useState } from 'react';
import { DownloadItem, Language } from '../types';
import { FileText, Download, Search, CheckCircle, FileCheck2, FileSpreadsheet } from 'lucide-react';

interface DownloadsCenterProps {
  downloads: DownloadItem[];
  lang: Language;
}

export const DownloadsCenter: React.FC<DownloadsCenterProps> = ({ downloads, lang }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [downloadSuccessMessage, setDownloadSuccessMessage] = useState<string | null>(null);

  const categories = [
    { id: 'all', label_ne: 'सबै कागजातहरू', label_en: 'All Documents' },
    { id: 'forms', label_ne: 'आवेदन तथा फारमहरू', label_en: 'Application Forms' },
    { id: 'reports', label_ne: 'वार्षिक प्रतिवेदनहरू', label_en: 'Annual Reports' },
    { id: 'bylaws', label_ne: 'विनियम तथा कार्यविधि', label_en: 'Bylaws & Policies' }
  ];

  const filtered = downloads.filter((d) => {
    const matchesCat = selectedCategory === 'all' || d.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch = 
      !searchQuery || 
      d.title_en.toLowerCase().includes(q) || 
      d.title_ne.includes(q);
    return matchesCat && matchesSearch;
  });

  const handleDownload = (item: DownloadItem) => {
    const title = lang === 'ne' ? item.title_ne : item.title_en;
    setDownloadSuccessMessage(
      lang === 'ne' 
        ? `"${title}" सफलतापुर्वक डाउनलोड भयो। (फाइल आकार: ${item.file_size})`
        : `"${title}" has started downloading successfully. (Size: ${item.file_size})`
    );
    setTimeout(() => {
      setDownloadSuccessMessage(null);
    }, 4000);
  };

  return (
    <section className="py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-semibold text-[#146B45] uppercase tracking-wider block mb-1">
              {lang === 'ne' ? 'कागजात तथा फारम केन्द्र' : 'Official Document & Form Center'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#17324D] tracking-tight">
              {lang === 'ne' ? 'महत्वपूर्ण फारम तथा प्रतिवेदन डाउनलोड' : 'Important Forms & Reports Downloads'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {lang === 'ne'
                ? 'सदस्यता, बचत, कर्जा आवेदन, ग्राहक पहिचान (KYC) तथा वित्तीय विवरणहरू डाउनलोड गर्नुहोस्।'
                : 'Download official application forms, KYC packs, annual financial reports, and bylaws.'}
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'ne' ? 'कागजात खोज्नुहोस्...' : 'Search documents...'}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-1 focus:ring-[#146B45]"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>
        </div>

        {/* Download Success Alert */}
        {downloadSuccessMessage && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 animate-in fade-in">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{downloadSuccessMessage}</span>
          </div>
        )}

        {/* Category Tabs - Responsive flex-wrap */}
        <div className="flex flex-wrap items-center gap-2 pb-2 mb-8">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`min-h-[38px] px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                selectedCategory === c.id
                  ? 'bg-[#146B45] text-white shadow-xs'
                  : 'bg-[#F5F7F6] text-slate-600 hover:text-slate-900 border border-slate-200/60'
              }`}
            >
              {lang === 'ne' ? c.label_ne : c.label_en}
            </button>
          ))}
        </div>

        {/* Document Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-[#F5F7F6] border border-slate-200 rounded-xl p-5 hover:border-[#146B45]/50 transition-all hover:bg-white flex flex-col justify-between"
            >
              <div className="flex items-start gap-3.5 mb-4">
                <div className="w-10 h-10 rounded-lg bg-red-100 text-red-700 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#17324D] leading-snug line-clamp-2">
                    {lang === 'ne' ? item.title_ne : item.title_en}
                  </h3>
                  {/* Unboxed Metadata */}
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1 font-mono">
                    <span>{item.file_format}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.file_size}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.download_count} dl</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleDownload(item)}
                className="w-full py-2 px-3 bg-white hover:bg-[#146B45] text-[#146B45] hover:text-white border border-[#146B45]/40 hover:border-transparent text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{lang === 'ne' ? 'कागजात डाउनलोड' : 'Download Document'}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
