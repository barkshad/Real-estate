
import React, { useState, useEffect } from 'react';
import { User, Property } from '../types';
import { firebaseService } from '../services/firebaseService';
import { Link } from 'react-router-dom';

interface DashboardProps {
  user: User | null;
}

export const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [userListings, setUserListings] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const unsubscribe = firebaseService.subscribeToUserListings(user.id, (data) => {
      setUserListings(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  if (!user) return (
    <div className="p-20 text-center dark:text-white">
      <h2 className="text-2xl font-bold mb-4">Please login to view your dashboard</h2>
      <Link to="/login" className="text-blue-600 hover:underline">Go to Login</Link>
    </div>
  );

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to remove this listing?")) {
      try {
        await firebaseService.deleteProperty(id);
      } catch (error) {
        console.error("Delete error", error);
        alert("Failed to delete listing.");
      }
    }
  };

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
            <Link to="/sell" className="block w-full text-left px-4 py-3 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all">Add New Listing</Link>
            <button className="w-full text-left px-4 py-3 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all">Messages</button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700">
               <div className="text-slate-400 text-sm font-bold uppercase mb-1">Active Listings</div>
               <div className="text-3xl font-extrabold dark:text-white">{userListings.length}</div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700">
               <div className="text-slate-400 text-sm font-bold uppercase mb-1">Favorited Homes</div>
               <div className="text-3xl font-extrabold dark:text-white">12</div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700">
               <div className="text-slate-400 text-sm font-bold uppercase mb-1">Inquiries</div>
               <div className="text-3xl font-extrabold text-blue-600">0</div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
              <h3 className="text-xl font-bold dark:text-white">My Property Listings</h3>
              <Link to="/listings" className="text-blue-600 text-sm font-bold">View Public Listings</Link>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-slate-700">
              {loading ? (
                <div className="p-10 text-center dark:text-slate-400">Loading your listings...</div>
              ) : userListings.length > 0 ? (
                userListings.map((p) => (
                  <div key={p.id} className="p-6 flex items-center gap-6 group">
                    <img src={p.images[0]} alt={p.title} className="w-24 h-24 rounded-2xl object-cover" />
                    <div className="flex-1">
                      <Link to={`/property/${p.id}`} className="font-bold dark:text-white hover:text-blue-600 transition-colors">{p.title}</Link>
                      <p className="text-sm text-slate-500">{p.location}</p>
                      <div className="flex gap-4 mt-2">
                        <span className="text-xs font-bold dark:text-slate-400">{p.bedrooms} Beds</span>
                        <span className="text-xs font-bold dark:text-slate-400">{p.bathrooms} Baths</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-blue-600">${p.price.toLocaleString()}</div>
                      <button 
                        onClick={() => handleDelete(p.id)}
                        className="text-xs text-red-500 font-bold mt-2 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-10 text-center text-slate-500">
                  <p className="mb-4">You haven't listed any properties yet.</p>
                  <Link to="/sell" className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold">List Your First Home</Link>
                </div>
              )}
            </div>
          </div>

          <div className="bg-slate-900 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Thinking of selling another home?</h3>
              <p className="text-slate-400">Our AI assistant can help you write the perfect description.</p>
            </div>
            <Link to="/sell" className="bg-white text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-slate-200 transition-all flex-shrink-0">Create Listing</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
