import React, { useState } from 'react';
import { ContactMessage, Language } from '../types';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';

interface ContactViewProps {
  lang: Language;
  onSendMessage: (msg: Omit<ContactMessage, 'id' | 'created_at' | 'status'>) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ lang, onSendMessage }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !message) {
      alert(lang === 'ne' ? 'कृपया आवश्यक विवरणहरू भर्नुहोस्।' : 'Please fill all required fields.');
      return;
    }

    onSendMessage({
      full_name: fullName,
      email: email || 'not_provided@example.com',
      phone,
      subject: subject || (lang === 'ne' ? 'सामान्य सोधपुछ' : 'General Inquiry'),
      message
    });

    setSubmitted(true);
    setFullName('');
    setEmail('');
    setPhone('');
    setSubject('');
    setMessage('');

    setTimeout(() => {
      setSubmitted(false);
    }, 6000);
  };

  return (
    <section className="py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold text-[#146B45] uppercase tracking-wider block mb-1">
            {lang === 'ne' ? 'हामीलाई सम्पर्क गर्नुहोस्' : 'Get In Touch'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#17324D] tracking-tight">
            {lang === 'ne' 
              ? 'आधुनिक जन सहकारीमा तपाईंलाई स्वागत छ' 
              : 'Contact Aadhunik Jana Saving & Credit Co-operative'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            {lang === 'ne'
              ? 'बचत, कर्जा, सदस्यता वा अन्य कुनै जिज्ञासा भएमा हामीलाई निसंकोच सम्पर्क गर्नुहोस्।'
              : 'Visit our office in Nagarjun-4, call our member helpline, or submit an online inquiry.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Contact Details & Info Cards */}
          <div className="lg:col-span-5 space-y-5">
            {/* Address */}
            <div className="p-5 bg-[#F5F7F6] rounded-xl border border-slate-200 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#146B45]/10 text-[#146B45] flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#17324D]">
                  {lang === 'ne' ? 'संस्थाको ठेगाना' : 'Office Location'}
                </h3>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  {lang === 'ne' 
                    ? 'नागार्जुन नगरपालिका वडा नं. ४, काठमाडौँ, बागमती प्रदेश, नेपाल' 
                    : 'Nagarjun Municipality Ward-4, Kathmandu, Bagmati Province, Nepal'}
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="p-5 bg-[#F5F7F6] rounded-xl border border-slate-200 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#17324D]/10 text-[#17324D] flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#17324D]">
                  {lang === 'ne' ? 'सम्पर्क टेलिफोन' : 'Telephone & Mobile'}
                </h3>
                <p className="text-xs text-slate-600 mt-0.5 font-mono">
                  +977-01-4880000 / +977-9851000000
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="p-5 bg-[#F5F7F6] rounded-xl border border-slate-200 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#D6A63C]/15 text-amber-800 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#17324D]">
                  {lang === 'ne' ? 'आधिकारिक इमेल' : 'Official Email'}
                </h3>
                <p className="text-xs text-slate-600 mt-0.5 font-mono">
                  info@aadhuniksaving.com.np
                </p>
              </div>
            </div>

            {/* Working Hours */}
            <div className="p-5 bg-[#F5F7F6] rounded-xl border border-slate-200 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#17324D]">
                  {lang === 'ne' ? 'कार्यालय समय' : 'Office Business Hours'}
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  {lang === 'ne' 
                    ? 'आइतबार देखि शुक्रबार: बिहान १०:०० बजे देखि साँझ ५:०० बजेसम्म (शनिबार तथा सार्वजनिक बिदा बन्द)' 
                    : 'Sunday - Friday: 10:00 AM - 5:00 PM (Closed on Saturdays & Public Holidays)'}
                </p>
              </div>
            </div>
          </div>

          {/* Contact Inquiry Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#146B45] uppercase tracking-wider mb-2">
              <MessageSquare className="w-4 h-4 text-[#D6A63C]" />
              <span>{lang === 'ne' ? 'अनलाइन सोधपुछ फारम' : 'Online Member Inquiry Form'}</span>
            </div>
            <h3 className="text-xl font-bold text-[#17324D] mb-5">
              {lang === 'ne' ? 'हामीलाई आफ्नो सन्देश पठाउनुहोस्' : 'Send Us Your Feedback or Inquiry'}
            </h3>

            {submitted && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  {lang === 'ne'
                    ? 'धन्यवाद! तपाईंको सोधपुछ दर्ता भयो। हाम्रो टोलीले छिट्टै सम्पर्क गर्नेछ।'
                    : 'Thank you! Your inquiry has been logged in our system. Our team will contact you shortly.'}
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {lang === 'ne' ? 'पूरा नाम *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={lang === 'ne' ? 'उदा. राम श्रेष्ठ' : 'e.g. Ram Shrestha'}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#146B45]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {lang === 'ne' ? 'सम्पर्क मोबाइल नं. *' : 'Phone / Mobile No. *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="98XXXXXXXX"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#146B45]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {lang === 'ne' ? 'इमेल ठेगाना' : 'Email Address'}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#146B45]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {lang === 'ne' ? 'विषय (Subject)' : 'Subject'}
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder={lang === 'ne' ? 'उदा. मुद्दती बचत सोधपुछ' : 'e.g. Fixed Deposit Inquiry'}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#146B45]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {lang === 'ne' ? 'तपाईंको सन्देश / जिज्ञासा *' : 'Your Message / Inquiry *'}
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={lang === 'ne' ? 'यहाँ आफ्नो सन्देश लेख्नुहोस्...' : 'Write your inquiry details here...'}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#146B45]"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 bg-[#146B45] hover:bg-[#0f5436] text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{lang === 'ne' ? 'सन्देश पठाउनुहोस्' : 'Submit Inquiry'}</span>
              </button>
            </form>
          </div>
        </div>

        {/* Google Maps Embed Section */}
        <div className="mt-12 rounded-2xl overflow-hidden border border-slate-200 shadow-xs">
          <div className="bg-[#17324D] text-white p-3 px-5 text-xs font-medium flex items-center justify-between">
            <span className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#D6A63C]" />
              <span>{lang === 'ne' ? 'हाम्रो मुख्य कार्यालय नक्सा (Nagarjun-4, Kathmandu)' : 'Google Maps Location (Nagarjun-4, Kathmandu)'}</span>
            </span>
            <span className="text-[11px] text-slate-300 font-mono">GPS: 27.7282° N, 85.2638° E</span>
          </div>
          <iframe
            title="Aadhunik Jana Saving & Credit Co-operative Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14127.873215682855!2d85.263884!3d27.72825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb189914704b11%3A0x6b4ef84c718b5286!2sNagarjun%2C%20Kathmandu!5e0!3m2!1sen!2snp!4v1700000000000"
            width="100%"
            height="320"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
};
