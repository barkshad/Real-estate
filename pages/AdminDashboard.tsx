
import React, { useState, useEffect } from 'react';
import { firebaseService } from '../services/firebaseService';
import { Property, SiteSettings, Inquiry, User } from '../types';
import { useNavigate } from 'react-router-dom';

interface AdminDashboardProps {
  user: User | null;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ user }) => {
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [authError, setAuthError] = useState(false);
  
  const [activeTab, setActiveTab] = useState<'overview' | 'properties' | 'inquiries' | 'settings'>('overview');
  const [properties, setProperties] = useState<Property[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If verified, setup listeners
    if (isVerified) {
      const unsubProperties = firebaseService.subscribeToListings(setProperties);
      const unsubInquiries = firebaseService.subscribeToAllInquiries(setInquiries);
      const unsubSettings = firebaseService.subscribeToSettings(setSettings);

      setLoading(false);

      return () => {
        unsubProperties();
        unsubInquiries();
        unsubSettings();
      };
    } else {
      setLoading(false);
    }
  }, [isVerified]);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessCode === '12345') {
      setIsVerified(true);
      setAuthError(false);
    } else {
      setAuthError(true);
      setAccessCode('');
    }
  };

  const handleUpdateSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    try {
      await firebaseService.updateSettings(settings);
      alert("Settings updated successfully!");
    } catch (err) {
      alert("Error updating settings. Ensure your Firebase project permissions allow admin writes.");
    }
  };

  // 1. PIN Verification Screen
  if (!isVerified) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-900 w-full max-w-md p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl mx-auto flex items-center justify-center text-white text-3xl font-bold mb-6 shadow-xl shadow-blue-500/30">H</div>
          <h1 className="text-2xl font-black dark:text-white mb-2">Admin Access</h1>
          <p className="text-slate-500 text-sm mb-8">Please enter the security PIN to unlock the control center.</p>
          
          <form onSubmit={handleVerify} className="space-y-4">
            <div className="relative">
              <input 
                type="password" 
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                placeholder="Enter PIN"
                className={`w-full bg-slate-100 dark:bg-slate-800 px-6 py-4 rounded-2xl text-center text-xl font-bold tracking-[0.5em] focus:ring-2 focus:ring-blue-500 outline-none dark:text-white border-2 transition-colors ${authError ? 'border-red-500' : 'border-transparent'}`}
                autoFocus
              />
              {authError && <p className="text-red-500 text-xs font-bold mt-2 animate-pulse">Invalid access code. Please try again.</p>}
            </div>
            <button 
              type="submit"
              className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/30 transform active:scale-95"
            >
              Unlock Console
            </button>
          </form>
          
          <button 
            onClick={() => navigate('/')}
            className="mt-6 text-slate-400 hover:text-slate-600 text-sm font-medium transition-colors"
          >
            Return to Homepage
          </button>
        </div>
      </div>
    );
  }

  // 2. Main Dashboard (if verified)
  if (loading) return <div className="h-screen flex items-center justify-center dark:bg-slate-950 text-white">Loading Command Center...</div>;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar Nav - Glass Design */}
        <aside className="lg:w-72 space-y-4">
          <div className="glass dark:bg-white/5 border border-white/10 p-8 rounded-[2.5rem] shadow-2xl backdrop-blur-xl">
             <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">H</div>
                <h2 className="font-extrabold text-xl dark:text-white">Admin Console</h2>
             </div>

             <nav className="space-y-3">
                {[
                  { id: 'overview', label: 'Overview', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
                  { id: 'properties', label: 'Properties', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
                  { id: 'inquiries', label: 'Inquiries', icon: 'M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z' },
                  { id: 'settings', label: 'Site Content', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all ${
                      activeTab === tab.id 
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                        : 'text-slate-500 hover:bg-white/10 hover:text-blue-500'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={tab.icon}></path></svg>
                    {tab.label}
                  </button>
                ))}
                
                <button
                  onClick={() => setIsVerified(false)}
                  className="w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold text-red-500 hover:bg-red-500/10 transition-all mt-10 border border-transparent hover:border-red-500/20"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                  Lock Panel
                </button>
             </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 space-y-8">
          
          {/* Header Stats */}
          <header className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Total Listings', val: properties.length, color: 'blue' },
              { label: 'New Inquiries', val: inquiries.filter(i => i.status === 'pending').length, color: 'emerald' },
              { label: 'Total Sales', val: '$2.4M', color: 'purple' },
              { label: 'Active Users', val: '142', color: 'orange' }
            ].map((stat, i) => (
              <div key={i} className="glass dark:bg-white/5 border border-white/10 p-6 rounded-[2rem] shadow-xl">
                 <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</div>
                 <div className="text-2xl font-black dark:text-white">{stat.val}</div>
              </div>
            ))}
          </header>

          {/* Dynamic Sections */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="glass dark:bg-white/5 border border-white/10 p-10 rounded-[3rem] text-center">
                 <h2 className="text-3xl font-extrabold dark:text-white mb-4">Command Center Active</h2>
                 <p className="text-slate-400 max-w-lg mx-auto mb-8">The market is active today. You have {inquiries.length} inquiries to respond to and {properties.length} live listings.</p>
                 <button className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-blue-500/30">Generate Market Report (AI)</button>
              </div>
            </div>
          )}

          {activeTab === 'properties' && (
            <div className="glass dark:bg-white/5 border border-white/10 rounded-[3rem] overflow-hidden animate-in fade-in duration-500">
               <div className="p-8 border-b border-white/5 flex justify-between items-center">
                  <h3 className="text-xl font-bold dark:text-white">Listing Inventory</h3>
                  <button onClick={() => navigate('/sell')} className="text-sm bg-blue-600/10 text-blue-500 px-4 py-2 rounded-xl font-bold border border-blue-500/20">Add New Property</button>
               </div>
               <div className="divide-y divide-white/5">
                  {properties.map(p => (
                    <div key={p.id} className="p-6 flex items-center gap-6 group hover:bg-white/5 transition-colors">
                       <img src={p.images[0]} className="w-16 h-16 rounded-xl object-cover" />
                       <div className="flex-1">
                          <div className="font-bold dark:text-white">{p.title}</div>
                          <div className="text-xs text-slate-500">{p.location}</div>
                       </div>
                       <div className="text-right">
                          <div className="font-bold text-blue-500">${p.price.toLocaleString()}</div>
                          <button 
                            onClick={() => {
                              if(window.confirm("Delete this listing?")) firebaseService.deleteProperty(p.id)
                            }}
                            className="text-xs text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                          >Delete</button>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="glass dark:bg-white/5 border border-white/10 p-10 rounded-[3rem] animate-in fade-in duration-500">
               <h3 className="text-xl font-bold dark:text-white mb-8">Site Content & Branding</h3>
               <form onSubmit={handleUpdateSettings} className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                     <label className="block text-sm font-bold text-slate-400">Brand Name</label>
                     <input 
                        type="text" 
                        value={settings?.brandName || ''}
                        onChange={e => setSettings(s => s ? {...s, brandName: e.target.value} : null)}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                     />
                  </div>
                  <div className="space-y-4">
                     <label className="block text-sm font-bold text-slate-400">Hero Headline</label>
                     <input 
                        type="text" 
                        value={settings?.heroTitle || ''}
                        onChange={e => setSettings(s => s ? {...s, heroTitle: e.target.value} : null)}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                     />
                  </div>
                  <div className="col-span-2 space-y-4">
                     <label className="block text-sm font-bold text-slate-400">Hero Subtitle</label>
                     <textarea 
                        rows={3}
                        value={settings?.heroSubtitle || ''}
                        onChange={e => setSettings(s => s ? {...s, heroSubtitle: e.target.value} : null)}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                     />
                  </div>
                  <button 
                    type="submit"
                    className="col-span-2 bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-xl shadow-blue-500/30"
                  >
                    Save Changes
                  </button>
               </form>
            </div>
          )}

          {activeTab === 'inquiries' && (
             <div className="space-y-6 animate-in fade-in duration-500">
                {inquiries.length > 0 ? inquiries.map(inq => (
                  <div key={inq.id} className="glass dark:bg-white/5 border border-white/10 p-8 rounded-[2.5rem]">
                     <div className="flex justify-between items-start mb-4">
                        <div>
                           <h4 className="font-bold dark:text-white">{inq.user_name}</h4>
                           <p className="text-sm text-blue-500">{inq.user_email}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${inq.status === 'pending' ? 'bg-orange-500/20 text-orange-500' : 'bg-emerald-500/20 text-emerald-500'}`}>
                           {inq.status}
                        </span>
                     </div>
                     <p className="text-slate-400 text-sm leading-relaxed italic border-l-2 border-white/10 pl-4 mb-4">"{inq.message}"</p>
                     <div className="text-xs text-slate-500 flex justify-between items-center">
                        <span>Property: {inq.property_title || 'General Inquiry'}</span>
                        <button className="text-blue-500 font-bold hover:underline">Reply via Email</button>
                     </div>
                  </div>
                )) : (
                  <div className="text-center py-20 text-slate-500">No inquiries yet.</div>
                )}
             </div>
          )}
        </main>
      </div>
    </div>
  );
};
