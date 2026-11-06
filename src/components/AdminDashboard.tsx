import React, { useState } from 'react';
import { 
  Language, 
  Notice, 
  ContactMessage, 
  MemberRequest, 
  AuditLogItem, 
  SavingsProduct, 
  LoanProduct, 
  DownloadItem 
} from '../types';
import { 
  ShieldCheck, 
  LayoutDashboard, 
  BellRing, 
  Mail, 
  UserCheck, 
  Settings, 
  FileText, 
  LogOut, 
  Plus, 
  Trash2, 
  Edit, 
  CheckCircle, 
  X, 
  Lock, 
  Building, 
  Eye, 
  History,
  MessageSquare,
  AlertCircle
} from 'lucide-react';

interface AdminDashboardProps {
  lang: Language;
  notices: Notice[];
  contactMessages: ContactMessage[];
  memberRequests: MemberRequest[];
  auditLogs: AuditLogItem[];
  savingsProducts: SavingsProduct[];
  loanProducts: LoanProduct[];
  downloads: DownloadItem[];
  onAddNotice: (notice: Omit<Notice, 'id' | 'views_count'>) => void;
  onDeleteNotice: (id: number) => void;
  onReplyMessage: (id: number, reply: string) => void;
  onApproveRequest: (id: number, status: 'approved' | 'rejected') => void;
  onUpdateSavingsRate: (id: number, newRate: number) => void;
  onUpdateLoanRate: (id: number, newRate: number) => void;
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  lang,
  notices,
  contactMessages,
  memberRequests,
  auditLogs,
  savingsProducts,
  loanProducts,
  downloads,
  onAddNotice,
  onDeleteNotice,
  onReplyMessage,
  onApproveRequest,
  onUpdateSavingsRate,
  onUpdateLoanRate,
  onLogout
}) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminUser, setAdminUser] = useState('admin');
  const [adminPassword, setAdminPassword] = useState('admin123');
  const [authError, setAuthError] = useState('');

  // Active Admin Module Tab
  const [activeTab, setActiveTab] = useState<'overview' | 'notices' | 'rates' | 'messages' | 'requests' | 'settings' | 'audit'>('overview');

  // New Notice Modal Form State
  const [isAddNoticeOpen, setIsAddNoticeOpen] = useState(false);
  const [newNoticeCategory, setNewNoticeCategory] = useState<Notice['category']>('general');
  const [newNoticeTitleEn, setNewNoticeTitleEn] = useState('');
  const [newNoticeTitleNe, setNewNoticeTitleNe] = useState('');
  const [newNoticeContentEn, setNewNoticeContentEn] = useState('');
  const [newNoticeContentNe, setNewNoticeContentNe] = useState('');
  const [newNoticeIsPopup, setNewNoticeIsPopup] = useState(false);
  const [newNoticeIsFeatured, setNewNoticeIsFeatured] = useState(false);

  // Message Reply State
  const [replyMessageId, setReplyMessageId] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');

  // Settings State
  const [settingsOrgNameEn, setSettingsOrgNameEn] = useState('Aadhunik Jana Saving & Credit Co-operative Ltd.');
  const [settingsOrgNameNe, setSettingsOrgNameNe] = useState('आधुनिक जन बचत तथा ऋण सहकारी संस्था लि.');
  const [settingsPhone, setSettingsPhone] = useState('+977-01-4880000');
  const [settingsEmail, setSettingsEmail] = useState('info@aadhuniksaving.com.np');
  const [settingsSaved, setSettingsSaved] = useState(false);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminUser === 'admin' && adminPassword === 'admin123') {
      setIsAdminLoggedIn(true);
      setAuthError('');
    } else {
      setAuthError('Invalid credentials. Use demo: admin / admin123');
    }
  };

  const handleCreateNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoticeTitleEn || !newNoticeTitleNe) return;

    onAddNotice({
      category: newNoticeCategory,
      title_en: newNoticeTitleEn,
      title_ne: newNoticeTitleNe,
      content_en: newNoticeContentEn || newNoticeTitleEn,
      content_ne: newNoticeContentNe || newNoticeTitleNe,
      published_date: new Date().toISOString().split('T')[0],
      is_popup: newNoticeIsPopup,
      is_featured: newNoticeIsFeatured
    });

    setIsAddNoticeOpen(false);
    setNewNoticeTitleEn('');
    setNewNoticeTitleNe('');
    setNewNoticeContentEn('');
    setNewNoticeContentNe('');
    setNewNoticeIsPopup(false);
    setNewNoticeIsFeatured(false);
  };

  const handleSendReply = (msgId: number) => {
    if (!replyText.trim()) return;
    onReplyMessage(msgId, replyText.trim());
    setReplyMessageId(null);
    setReplyText('');
  };

  if (!isAdminLoggedIn) {
    return (
      <div className="py-16 sm:py-24 bg-[#F5F7F6] flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <img 
                src="/assets/aistudio/logo_aj-removebg-preview_9a0d83cb.png" 
                alt="Aadhunik Jana Saving & Credit Co-operative Ltd." 
                className="h-11 sm:h-12 w-auto object-contain"
              />
            </div>
            <h2 className="text-xl font-bold text-[#17324D]">
              {lang === 'ne' ? 'प्रशासकीय नियन्त्रण कक्ष' : 'Administrator Control Panel'}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Aadhunik Jana Saving & Credit Co-operative Ltd.
            </p>
          </div>

          <div className="mb-6 p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600">
            <span className="font-semibold text-[#17324D] block mb-1">
              Admin Demo Access (Pre-filled):
            </span>
            <div className="flex justify-between font-mono text-[11px] text-slate-700">
              <span>Username: <strong>admin</strong></span>
              <span>Password: <strong>admin123</strong></span>
            </div>
          </div>

          {authError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Admin Username
              </label>
              <input
                type="text"
                required
                value={adminUser}
                onChange={(e) => setAdminUser(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#17324D] font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#17324D]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#17324D] hover:bg-[#12263a] text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Lock className="w-3.5 h-3.5 text-[#D6A63C]" />
              <span>Login to Admin Panel</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  const unreadMessagesCount = contactMessages.filter(m => m.status === 'unread').length;
  const pendingRequestsCount = memberRequests.filter(r => r.status === 'pending').length;

  return (
    <div className="py-8 bg-[#F5F7F6] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Top Control Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-xs mb-5 sm:mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold text-[#17324D]">
                Cooperative Control Panel
              </h1>
              <span className="text-[10px] bg-[#146B45] text-white font-mono px-2 py-0.5 rounded-sm">
                Super Admin
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Aadhunik Jana Saving & Credit Co-operative Ltd. · Nagarjun-4, Kathmandu
            </p>
          </div>

          <button
            onClick={() => {
              setIsAdminLoggedIn(false);
              onLogout();
            }}
            className="self-start sm:self-auto min-h-[40px] px-3.5 py-2 border border-slate-300 hover:bg-slate-100 active:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Admin Logout</span>
          </button>
        </div>

        {/* Admin Navigation Tabs - Mobile Touch Friendly */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {[
            { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
            { id: 'notices', icon: BellRing, label: `Notices (${notices.length})` },
            { id: 'rates', icon: Settings, label: 'Rates & Products' },
            { id: 'messages', icon: Mail, label: `Inquiries (${unreadMessagesCount})` },
            { id: 'requests', icon: UserCheck, label: `Requests (${pendingRequestsCount})` },
            { id: 'settings', icon: Building, label: 'Settings' },
            { id: 'audit', icon: History, label: 'Audit Logs' }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`min-h-[40px] px-3.5 py-2 text-xs font-semibold rounded-xl flex items-center gap-2 whitespace-nowrap transition-colors shrink-0 ${
                  activeTab === tab.id
                    ? 'bg-[#17324D] text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5 text-[#D6A63C]" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white p-5 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 block">Total Active Members</span>
                <span className="text-2xl font-bold font-mono text-[#146B45]">3,450</span>
                <span className="text-[11px] text-slate-400 block mt-1">Verified Share Members</span>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 block">Published Notices</span>
                <span className="text-2xl font-bold font-mono text-[#17324D]">{notices.length}</span>
                <span className="text-[11px] text-slate-400 block mt-1">Active Announcements</span>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 block">Pending Inquiries</span>
                <span className="text-2xl font-bold font-mono text-amber-600">{unreadMessagesCount}</span>
                <span className="text-[11px] text-slate-400 block mt-1">Requires Admin Reply</span>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 block">Member Approval Requests</span>
                <span className="text-2xl font-bold font-mono text-indigo-600">{pendingRequestsCount}</span>
                <span className="text-[11px] text-slate-400 block mt-1">Profile / KYC Updates</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200">
              <h3 className="text-sm font-bold text-[#17324D] uppercase tracking-wider mb-4">
                Administrative Quick Actions
              </h3>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => { setActiveTab('notices'); setIsAddNoticeOpen(true); }}
                  className="px-4 py-2 bg-[#146B45] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Publish New Notice</span>
                </button>
                <button
                  onClick={() => setActiveTab('messages')}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  <span>View Member Messages</span>
                </button>
                <button
                  onClick={() => setActiveTab('rates')}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1.5"
                >
                  <Settings className="w-3.5 h-3.5 text-slate-500" />
                  <span>Update Interest Rates</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Notice Management */}
        {activeTab === 'notices' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#17324D]">Notice & Circular Management</h3>
                <p className="text-xs text-slate-500">Manage notices, AGM declarations, and homepage popup modals.</p>
              </div>
              <button
                onClick={() => setIsAddNoticeOpen(true)}
                className="px-3.5 py-2 bg-[#146B45] hover:bg-[#105537] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create Notice</span>
              </button>
            </div>

            {/* Notice List: Mobile Cards vs Desktop Table */}
            <div>
              {/* Mobile View: Cards */}
              <div className="block md:hidden space-y-3">
                {notices.map((n) => (
                  <div key={n.id} className="bg-[#F5F7F6] border border-slate-200 rounded-xl p-3.5 space-y-2">
                    <div className="flex items-center justify-between pb-1.5 border-b border-slate-200/80 text-xs">
                      <span className="font-mono text-slate-500 text-[11px]">{n.published_date}</span>
                      <span className="uppercase text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#146B45]/10 text-[#146B45]">
                        {n.category}
                      </span>
                    </div>

                    <div>
                      <div className="font-bold text-slate-800 text-xs leading-snug">{n.title_en}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">{n.title_ne}</div>
                    </div>

                    <div className="flex items-center justify-between pt-1 text-xs">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        n.is_popup ? 'bg-amber-100 text-amber-800' : 'bg-slate-200/60 text-slate-500'
                      }`}>
                        {n.is_popup ? 'Active Modal Popup' : 'Standard Feed'}
                      </span>
                      <button
                        onClick={() => onDeleteNotice(n.id)}
                        className="px-2.5 py-1 text-red-600 hover:bg-red-50 border border-red-200 rounded-md transition-colors flex items-center gap-1 text-[11px] font-medium"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop View: Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#F5F7F6] text-slate-600 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-3">Date</th>
                      <th className="py-2.5 px-3">Category</th>
                      <th className="py-2.5 px-3">Title (EN / NE)</th>
                      <th className="py-2.5 px-3 text-center">Popup Modal</th>
                      <th className="py-2.5 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {notices.map((n) => (
                      <tr key={n.id} className="hover:bg-slate-50">
                        <td className="py-3 px-3 font-mono text-slate-500">{n.published_date}</td>
                        <td className="py-3 px-3 uppercase text-[11px] font-semibold text-[#146B45]">{n.category}</td>
                        <td className="py-3 px-3">
                          <div className="font-semibold text-slate-800">{n.title_en}</div>
                          <div className="text-[11px] text-slate-500">{n.title_ne}</div>
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            n.is_popup ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-500'
                          }`}>
                            {n.is_popup ? 'Active Popup' : 'No'}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={() => onDeleteNotice(n.id)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                            title="Delete notice"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Create Notice Modal */}
            {isAddNoticeOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
                <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-6 border border-slate-200">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
                    <h4 className="text-base font-bold text-[#17324D]">Create New Notice</h4>
                    <button onClick={() => setIsAddNoticeOpen(false)} className="text-slate-400 hover:text-slate-600">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleCreateNotice} className="space-y-4 text-xs">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Category</label>
                      <select
                        value={newNoticeCategory}
                        onChange={(e) => setNewNoticeCategory(e.target.value as any)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                      >
                        <option value="general">General Notice</option>
                        <option value="agm">AGM Announcement</option>
                        <option value="financial">Financial Report</option>
                        <option value="member">Member Advisory</option>
                        <option value="holiday">Holiday Notice</option>
                        <option value="vacancy">Vacancy</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Title (English) *</label>
                      <input
                        type="text"
                        required
                        value={newNoticeTitleEn}
                        onChange={(e) => setNewNoticeTitleEn(e.target.value)}
                        placeholder="Notice headline in English"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Title (नेपाली) *</label>
                      <input
                        type="text"
                        required
                        value={newNoticeTitleNe}
                        onChange={(e) => setNewNoticeTitleNe(e.target.value)}
                        placeholder="नेपालीमा सूचना शीर्षक"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Details (English)</label>
                      <textarea
                        rows={3}
                        value={newNoticeContentEn}
                        onChange={(e) => setNewNoticeContentEn(e.target.value)}
                        placeholder="Full body text in English..."
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Details (नेपाली)</label>
                      <textarea
                        rows={3}
                        value={newNoticeContentNe}
                        onChange={(e) => setNewNoticeContentNe(e.target.value)}
                        placeholder="नेपाली व्यहोरा..."
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                      />
                    </div>

                    <div className="flex items-center gap-6 pt-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={newNoticeIsPopup}
                          onChange={(e) => setNewNoticeIsPopup(e.target.checked)}
                          className="rounded-sm border-slate-300 text-[#146B45]"
                        />
                        <span>Show as Homepage Popup Notice</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={newNoticeIsFeatured}
                          onChange={(e) => setNewNoticeIsFeatured(e.target.checked)}
                          className="rounded-sm border-slate-300 text-[#146B45]"
                        />
                        <span>Mark as Featured</span>
                      </label>
                    </div>

                    <div className="flex justify-end gap-2 pt-4 border-t border-slate-200">
                      <button
                        type="button"
                        onClick={() => setIsAddNoticeOpen(false)}
                        className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-[#146B45] text-white font-semibold rounded-lg"
                      >
                        Publish Notice
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Rates & Products Manager */}
        {activeTab === 'rates' && (
          <div className="space-y-6">
            {/* Savings Rates */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
              <h3 className="text-base font-bold text-[#17324D] mb-4">
                Savings Products & Interest Rate Management
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                {savingsProducts.map((p) => (
                  <div key={p.id} className="p-4 bg-[#F5F7F6] rounded-xl border border-slate-200">
                    <div className="font-bold text-slate-800">{p.name_en}</div>
                    <div className="text-[11px] text-slate-500 mb-3">{p.name_ne}</div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-slate-500">Rate (% p.a.):</span>
                      <input
                        type="number"
                        step="0.1"
                        value={p.interest_rate}
                        onChange={(e) => onUpdateSavingsRate(p.id, Number(e.target.value))}
                        className="w-20 px-2 py-1 text-xs border border-slate-300 rounded-md font-mono text-right"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Loan Rates */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
              <h3 className="text-base font-bold text-[#17324D] mb-4">
                Loan Products & Interest Rate Management
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                {loanProducts.map((p) => (
                  <div key={p.id} className="p-4 bg-[#F5F7F6] rounded-xl border border-slate-200">
                    <div className="font-bold text-slate-800">{p.name_en}</div>
                    <div className="text-[11px] text-slate-500 mb-3">{p.name_ne}</div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-slate-500">Rate (% p.a.):</span>
                      <input
                        type="number"
                        step="0.1"
                        value={p.interest_rate}
                        onChange={(e) => onUpdateLoanRate(p.id, Number(e.target.value))}
                        className="w-20 px-2 py-1 text-xs border border-slate-300 rounded-md font-mono text-right"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Messages / Inquiries */}
        {activeTab === 'messages' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-[#17324D]">
              Member & Visitor Public Inquiries ({contactMessages.length})
            </h3>

            <div className="space-y-4">
              {contactMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-4 rounded-xl border transition-colors ${
                    msg.status === 'unread' ? 'bg-amber-50/50 border-amber-200' : 'bg-[#F5F7F6] border-slate-200'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div>
                      <span className="font-bold text-sm text-[#17324D]">{msg.full_name}</span>
                      <span className="text-xs text-slate-500 ml-2 font-mono">{msg.phone} · {msg.email}</span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono">{msg.created_at}</span>
                  </div>

                  <div className="text-xs font-semibold text-slate-700 mb-1">
                    Subject: {msg.subject}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    {msg.message}
                  </p>

                  {msg.admin_reply && (
                    <div className="p-3 bg-white border border-emerald-200 rounded-lg text-xs text-emerald-900 mb-3">
                      <span className="font-semibold block text-[11px] text-emerald-700">Cooperative Admin Reply:</span>
                      {msg.admin_reply}
                    </div>
                  )}

                  {replyMessageId === msg.id ? (
                    <div className="space-y-2 mt-2">
                      <textarea
                        rows={3}
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Type response to be recorded and sent to member..."
                        className="w-full p-2 text-xs border border-slate-300 rounded-lg"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSendReply(msg.id)}
                          className="px-3 py-1 bg-[#146B45] text-white text-xs font-semibold rounded-md"
                        >
                          Submit Reply
                        </button>
                        <button
                          onClick={() => setReplyMessageId(null)}
                          className="px-3 py-1 border border-slate-300 text-slate-600 text-xs rounded-md"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setReplyMessageId(msg.id);
                        setReplyText(msg.admin_reply || '');
                      }}
                      className="text-xs font-semibold text-[#146B45] hover:underline flex items-center gap-1"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{msg.admin_reply ? 'Edit Response' : 'Reply to Inquiry'}</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Member Requests */}
        {activeTab === 'requests' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-[#17324D]">
              Member Self-Service Approval Queue
            </h3>

            {/* Member Requests: Mobile Cards vs Desktop Table */}
            <div>
              {/* Mobile View: Cards */}
              <div className="block md:hidden space-y-3">
                {memberRequests.map((r) => (
                  <div key={r.id} className="bg-[#F5F7F6] border border-slate-200 rounded-xl p-3.5 space-y-2.5">
                    <div className="flex items-center justify-between pb-1.5 border-b border-slate-200/80 text-xs">
                      <div>
                        <div className="font-bold text-slate-800 text-xs">{r.member_name}</div>
                        <div className="text-[11px] font-mono text-slate-500">{r.member_code} · {r.created_at}</div>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        r.status === 'approved' ? 'bg-emerald-100 text-emerald-800' :
                        r.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {r.status.toUpperCase()}
                      </span>
                    </div>

                    <div className="text-xs">
                      <span className="uppercase text-[10px] font-mono font-bold bg-slate-200/70 text-slate-700 px-1.5 py-0.5 rounded-sm inline-block mb-1">
                        {r.type.replace('_', ' ')}
                      </span>
                      <p className="text-slate-600 leading-relaxed text-xs">
                        {r.details}
                      </p>
                    </div>

                    {r.status === 'pending' ? (
                      <div className="flex items-center gap-2 pt-1 border-t border-slate-200/60">
                        <button
                          onClick={() => onApproveRequest(r.id, 'approved')}
                          className="flex-1 py-1.5 bg-[#146B45] text-white rounded-lg text-xs font-semibold text-center"
                        >
                          Approve Request
                        </button>
                        <button
                          onClick={() => onApproveRequest(r.id, 'rejected')}
                          className="flex-1 py-1.5 bg-red-600 text-white rounded-lg text-xs font-semibold text-center"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <div className="text-right text-[11px] text-slate-400 font-mono">
                        Status finalized
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Desktop View: Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#F5F7F6] text-slate-600 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-3">Date</th>
                      <th className="py-2.5 px-3">Member</th>
                      <th className="py-2.5 px-3">Type</th>
                      <th className="py-2.5 px-3">Request Details</th>
                      <th className="py-2.5 px-3 text-center">Status</th>
                      <th className="py-2.5 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {memberRequests.map((r) => (
                      <tr key={r.id} className="hover:bg-slate-50">
                        <td className="py-3 px-3 font-mono text-slate-500">{r.created_at}</td>
                        <td className="py-3 px-3">
                          <div className="font-semibold text-slate-800">{r.member_name}</div>
                          <div className="text-[11px] font-mono text-slate-400">{r.member_code}</div>
                        </td>
                        <td className="py-3 px-3 uppercase font-mono text-[11px]">{r.type}</td>
                        <td className="py-3 px-3 text-slate-600 max-w-xs">{r.details}</td>
                        <td className="py-3 px-3 text-center">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            r.status === 'approved' ? 'bg-emerald-100 text-emerald-800' :
                            r.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {r.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          {r.status === 'pending' ? (
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => onApproveRequest(r.id, 'approved')}
                                className="px-2.5 py-1 bg-[#146B45] text-white rounded-md text-[11px] font-semibold"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => onApproveRequest(r.id, 'rejected')}
                                className="px-2.5 py-1 bg-red-600 text-white rounded-md text-[11px] font-semibold"
                              >
                                Reject
                              </button>
                            </div>
                          ) : (
                            <span className="text-slate-400 text-[11px]">Completed</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 6: Settings */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs max-w-2xl mx-auto space-y-4">
            <h3 className="text-base font-bold text-[#17324D]">
              Cooperative Institutional Settings
            </h3>

            {settingsSaved && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Settings updated successfully!</span>
              </div>
            )}

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Organization Name (English)</label>
                <input
                  type="text"
                  value={settingsOrgNameEn}
                  onChange={(e) => setSettingsOrgNameEn(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Organization Name (नेपाली)</label>
                <input
                  type="text"
                  value={settingsOrgNameNe}
                  onChange={(e) => setSettingsOrgNameNe(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Official Helpline</label>
                <input
                  type="text"
                  value={settingsPhone}
                  onChange={(e) => setSettingsPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Official Email</label>
                <input
                  type="email"
                  value={settingsEmail}
                  onChange={(e) => setSettingsEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono"
                />
              </div>

              <button
                onClick={() => {
                  setSettingsSaved(true);
                  setTimeout(() => setSettingsSaved(false), 3000);
                }}
                className="px-5 py-2.5 bg-[#146B45] text-white font-semibold rounded-lg text-xs"
              >
                Save Settings Changes
              </button>
            </div>
          </div>
        )}

        {/* Tab 7: Audit Logs */}
        {activeTab === 'audit' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-[#17324D]">
              System Audit & Security Logs
            </h3>
            {/* Audit Logs: Mobile Cards vs Desktop Table */}
            <div>
              {/* Mobile View: Cards */}
              <div className="block md:hidden space-y-2.5">
                {auditLogs.map((log) => (
                  <div key={log.id} className="bg-[#F5F7F6] border border-slate-200 rounded-xl p-3 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] pb-1 border-b border-slate-200/80 font-mono">
                      <span className="text-slate-500">{log.timestamp}</span>
                      <span className="font-semibold text-slate-800 bg-white px-2 py-0.5 rounded-sm border border-slate-200">
                        {log.user}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-sm text-[10px] font-bold font-mono uppercase bg-[#146B45]/10 text-[#146B45]">
                        {log.action}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 font-sans leading-relaxed pt-0.5">
                      {log.details}
                    </p>
                  </div>
                ))}
              </div>

              {/* Desktop View: Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#F5F7F6] text-slate-600 font-semibold border-b border-slate-200 font-mono">
                    <tr>
                      <th className="py-2.5 px-3">Timestamp</th>
                      <th className="py-2.5 px-3">User / Identity</th>
                      <th className="py-2.5 px-3">Action</th>
                      <th className="py-2.5 px-3">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono">
                    {auditLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 text-slate-500">{log.timestamp}</td>
                        <td className="py-2.5 px-3 font-semibold text-slate-800">{log.user}</td>
                        <td className="py-2.5 px-3 text-[#146B45] font-bold">{log.action}</td>
                        <td className="py-2.5 px-3 font-sans text-slate-600">{log.details}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
