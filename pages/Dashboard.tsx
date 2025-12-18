
import React from 'react';
import { User, Property } from '../types';
import { MOCK_PROPERTIES, ICONS } from '../constants';

interface DashboardProps {
  user: User | null;
}

export const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  if (!user) return <div className="p-20 text-center">Please login to view your dashboard.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-64 space-y-2">
          <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 mb-6 flex flex-col items-center">
            <div className="w-20 h-20 bg-blue-600 text-white text-3xl font-bold flex items-center justify-center rounded-full mb-4">
              {user.full_name[0].toUpperCase()}
            </div>
            <h3 className="font-bold dark:text-white">{user.full_name}</h3>
            <span className="text-xs text-slate-500 uppercase font-bold tracking-widest">{user.role}</span>
          </div>
          
          <nav className="space-y-2">
            <button className="w-full text-left px-4 py-3 bg-blue-600 text-white rounded-xl font-bold">Overview</button>
            <button className="w-full text-left px-4 py-3 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all">My Favorites</button>
            <button className="w-full text-left px-4 py-3 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all">Saved Searches</button>
            <button className="w-full text-left px-4 py-3 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all">My Listings</button>
            <button className="w-full text-left px-4 py-3 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all">Messages</button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700">
               <div className="text-slate-400 text-sm font-bold uppercase mb-1">Active Searches</div>
               <div className="text-3xl font-extrabold dark:text-white">4</div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700">
               <div className="text-slate-400 text-sm font-bold uppercase mb-1">Favorited Homes</div>
               <div className="text-3xl font-extrabold dark:text-white">12</div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700">
               <div className="text-slate-400 text-sm font-bold uppercase mb-1">New Matches</div>
               <div className="text-3xl font-extrabold text-blue-600">3</div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
              <h3 className="text-xl font-bold dark:text-white">My Favorite Listings</h3>
              <button className="text-blue-600 text-sm font-bold">View All</button>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-slate-700">
              {MOCK_PROPERTIES.slice(0, 2).map((p) => (
                <div key={p.id} className="p-6 flex items-center gap-6 group">
                  <img src={p.images[0]} alt={p.title} className="w-24 h-24 rounded-2xl object-cover" />
                  <div className="flex-1">
                    <h4 className="font-bold dark:text-white group-hover:text-blue-600 transition-colors">{p.title}</h4>
                    <p className="text-sm text-slate-500">{p.location}</p>
                    <div className="flex gap-4 mt-2">
                      <span className="text-xs font-bold dark:text-slate-400">{p.bedrooms} Beds</span>
                      <span className="text-xs font-bold dark:text-slate-400">{p.bathrooms} Baths</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-blue-600">${p.price.toLocaleString()}</div>
                    <button className="text-xs text-red-500 font-bold mt-2 hover:underline">Remove</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Thinking of selling your current home?</h3>
              <p className="text-slate-400">Get a free, instant valuation based on current market data.</p>
            </div>
            <button className="bg-white text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-slate-200 transition-all flex-shrink-0">Evaluate Property</button>
          </div>
        </div>
      </div>
    </div>
  );
};
