import React, { useState, useEffect } from 'react';
import { Notice, Language } from '../types';
import { X, Calendar, FileText, Download, BellRing } from 'lucide-react';

interface PopupModalProps {
  notice?: Notice;
  lang: Language;
  onClose: () => void;
}

export const PopupModal: React.FC<PopupModalProps> = ({ notice, lang, onClose }) => {
  const [dontShowAgain, setDontShowAgain] = useState(false);

  if (!notice || !notice.is_popup) return null;

  const handleDismiss = () => {
    if (dontShowAgain) {
      localStorage.setItem('aadhunik_dismissed_popup_' + notice.id, 'true');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="bg-[#146B45] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BellRing className="w-5 h-5 text-[#D6A63C]" />
            <span className="font-semibold text-sm">
              {lang === 'ne' ? 'जरुरी सूचना (Important Notice)' : 'Official Announcement'}
            </span>
          </div>
          <button 
            onClick={handleDismiss}
            className="text-white/80 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors"
            aria-label="Close notification"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <Calendar className="w-3.5 h-3.5" />
            <span>{notice.published_date}</span>
            <span aria-hidden="true">·</span>
            <span className="uppercase tracking-wider font-medium text-[#146B45]">
              {notice.category}
            </span>
          </div>

          <h3 className="text-lg font-bold text-[#17324D] mb-3 leading-snug">
            {lang === 'ne' ? notice.title_ne : notice.title_en}
          </h3>

          <p className="text-sm text-slate-600 leading-relaxed mb-5 max-h-56 overflow-y-auto pr-1">
            {lang === 'ne' ? notice.content_ne : notice.content_en}
          </p>

          {notice.file_name && (
            <div className="mb-5 p-3 rounded-lg bg-[#F5F7F6] border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                <FileText className="w-4 h-4 text-[#146B45]" />
                <span>{notice.file_name}</span>
              </div>
              <button 
                onClick={() => alert(lang === 'ne' ? `सूचना फाइल (${notice.file_name}) डाउनलोड भइरहेको छ...` : `Downloading notice attachment: ${notice.file_name}...`)}
                className="flex items-center gap-1 text-xs text-[#146B45] font-semibold hover:underline"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{lang === 'ne' ? 'डाउनलोड' : 'Download'}</span>
              </button>
            </div>
          )}

          {/* Modal Footer Controls */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <label className="flex items-center gap-2 text-xs text-slate-500 cursor-pointer select-none">
              <input 
                type="checkbox" 
                checked={dontShowAgain} 
                onChange={(e) => setDontShowAgain(e.target.checked)}
                className="rounded-sm border-slate-300 text-[#146B45] focus:ring-[#146B45]"
              />
              <span>{lang === 'ne' ? 'फेरि नदेखाउनुहोस् (Don\'t show again)' : 'Don\'t show again today'}</span>
            </label>

            <button
              onClick={handleDismiss}
              className="px-4 py-2 bg-[#17324D] hover:bg-[#12263a] text-white text-xs font-semibold rounded-lg transition-colors"
            >
              {lang === 'ne' ? 'बन्द गर्नुहोस्' : 'Close'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
