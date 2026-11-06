import React, { useState } from 'react';
import { GalleryItem, Language } from '../types';
import { Image as ImageIcon, Video, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

interface GalleryViewProps {
  items: GalleryItem[];
  lang: Language;
}

export const GalleryView: React.FC<GalleryViewProps> = ({ items, lang }) => {
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', label_ne: 'सबै तस्बिरहरू', label_en: 'All Photos' },
    { id: 'agm', label_ne: 'साधारण सभा (AGM)', label_en: 'AGM Events' },
    { id: 'csr', label_ne: 'सामाजिक उत्तरदायित्व (CSR)', label_en: 'Community CSR' },
    { id: 'trainings', label_ne: 'तालिम तथा गोष्ठी', label_en: 'Workshops' },
    { id: 'office', label_ne: 'कार्यालय तथा शाखा', label_en: 'Office & Facilities' }
  ];

  const filtered = items.filter(
    (item) => selectedCat === 'all' || item.category === selectedCat
  );

  return (
    <section className="py-14 sm:py-20 bg-[#F5F7F6]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold text-[#146B45] uppercase tracking-wider">
            {lang === 'ne' ? 'तस्बिर तथा भिडियो ग्यालरी' : 'Photo & Event Showcase'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#17324D] mt-1 tracking-tight">
            {lang === 'ne' ? 'संस्थागत कार्यक्रम तथा गतिविधिहरू' : 'Cooperative Milestones & Activities'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            {lang === 'ne'
              ? 'साधारण सभा, सामाजिक उत्तरदायित्व, तालिम तथा समुदाय विकासका झलकहरू।'
              : 'Snapshots from our AGMs, financial workshops, blood donation drives, and community events.'}
          </p>

          {/* Categories */}
          <div className="flex items-center justify-center gap-1.5 flex-wrap mt-6">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCat(c.id)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  selectedCat === c.id
                    ? 'bg-[#146B45] text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-200'
                }`}
              >
                {lang === 'ne' ? c.label_ne : c.label_en}
              </button>
            ))}
          </div>
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setActiveLightboxIndex(idx)}
              className="group relative bg-white rounded-xl overflow-hidden border border-slate-200 shadow-xs cursor-pointer hover:shadow-md transition-all"
            >
              <div className="h-48 overflow-hidden bg-slate-100">
                <img
                  src={item.image_url}
                  alt={item.title_en}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-3">
                <h4 className="text-xs font-bold text-[#17324D] line-clamp-1 group-hover:text-[#146B45] transition-colors">
                  {lang === 'ne' ? item.title_ne : item.title_en}
                </h4>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block mt-0.5">
                  {item.category}
                </span>
              </div>
              <div className="absolute top-2 right-2 bg-black/60 text-white p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activeLightboxIndex !== null && filtered[activeLightboxIndex] && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xs">
            <button
              onClick={() => setActiveLightboxIndex(null)}
              className="absolute top-4 right-4 text-white hover:text-slate-300 p-2 z-50"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev button */}
            <button
              onClick={() => setActiveLightboxIndex((prev) => (prev! - 1 + filtered.length) % filtered.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2 rounded-full bg-black/50"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next button */}
            <button
              onClick={() => setActiveLightboxIndex((prev) => (prev! + 1) % filtered.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2 rounded-full bg-black/50"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="max-w-4xl max-h-[85vh] flex flex-col items-center">
              <img
                src={filtered[activeLightboxIndex].image_url}
                alt="Enlarged photo"
                className="max-h-[70vh] object-contain rounded-lg"
                referrerPolicy="no-referrer"
              />
              <div className="text-center text-white mt-4 max-w-xl">
                <h3 className="text-sm sm:text-base font-bold">
                  {lang === 'ne' 
                    ? filtered[activeLightboxIndex].title_ne 
                    : filtered[activeLightboxIndex].title_en}
                </h3>
                <span className="text-xs text-[#D6A63C] uppercase tracking-wider mt-1 block">
                  {filtered[activeLightboxIndex].category} · Photo {activeLightboxIndex + 1} of {filtered.length}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
