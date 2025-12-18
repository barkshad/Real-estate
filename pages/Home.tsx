
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MOCK_PROPERTIES, ICONS } from '../constants';
import { PropertyCard } from '../components/PropertyCard';

export const Home: React.FC = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/listings?q=${encodeURIComponent(search)}`);
  };

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000" 
            alt="Hero Background"
            className="w-full h-full object-cover brightness-[0.4]"
          />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-8">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Find the Perfect Place to <span className="text-blue-500">Call Home</span>
          </h1>
          <p className="text-xl text-slate-200 font-light">
            Browse premium properties in the world's most desirable locations. Luxury living tailored to you.
          </p>

          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20">
            <div className="flex-1 flex items-center gap-3 px-4 py-2">
              <ICONS.Search className="w-6 h-6 text-slate-300" />
              <input 
                type="text" 
                placeholder="City, Neighborhood, or Zip Code"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent text-white placeholder-slate-400 w-full focus:outline-none text-lg"
              />
            </div>
            <button 
              type="submit"
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
            >
              Search Now
            </button>
          </form>

          <div className="flex flex-wrap justify-center gap-8 pt-8">
            <div className="text-white text-center">
              <div className="text-3xl font-bold">12k+</div>
              <div className="text-sm text-slate-300">Active Listings</div>
            </div>
            <div className="text-white text-center">
              <div className="text-3xl font-bold">5k+</div>
              <div className="text-sm text-slate-300">Happy Families</div>
            </div>
            <div className="text-white text-center">
              <div className="text-3xl font-bold">4.9/5</div>
              <div className="text-sm text-slate-300">Customer Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold dark:text-white mb-2">Featured Properties</h2>
            <p className="text-slate-500 dark:text-slate-400">Hand-picked homes from our exclusive collection.</p>
          </div>
          <Link to="/listings" className="text-blue-600 font-bold hover:underline hidden sm:block">View All Properties →</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_PROPERTIES.slice(0, 3).map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      {/* Call to Action - Selling */}
      <section className="bg-slate-900 dark:bg-slate-950 py-24 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-400 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest">
                Sell Your Property
              </div>
              <h2 className="text-4xl font-bold text-white leading-tight">Ready to sell your home for the best price?</h2>
              <p className="text-slate-400 text-lg">
                Our expert agents use advanced market analysis and AI-driven insights to ensure your property reaches the right buyers fast.
              </p>
              <ul className="space-y-4">
                {['Free property valuation', 'Professional photography', 'Strategic marketing', 'Expert negotiation'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300">
                    <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs">✓</div>
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/sell" className="inline-block bg-white text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-slate-200 transition-all">Get Started</Link>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1000" 
                alt="Selling house"
                className="rounded-3xl shadow-2xl"
              />
              <div className="absolute -bottom-8 -left-8 bg-blue-600 p-8 rounded-3xl text-white shadow-xl hidden lg:block">
                <div className="text-4xl font-bold mb-1">98%</div>
                <div className="text-sm opacity-80">Success Rate in Selling</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-3xl font-bold text-center dark:text-white mb-16">What Our Clients Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Sarah Johnson", role: "First-time Buyer", text: "HomeQuest made finding my first condo so easy. The AI assistant answered all my late-night questions about taxes and neighborhoods!" },
            { name: "Michael Chen", role: "Real Estate Investor", text: "Professionalism at its peak. The dashboard tools for tracking my listings are superior to anything else I've used." },
            { name: "The Williams Family", role: "Home Sellers", text: "We sold our family home in just 2 weeks for 5% over asking. Highly recommend their strategic marketing team." }
          ].map((t, i) => (
            <div key={i} className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm relative">
              <div className="absolute -top-4 left-8 text-6xl text-blue-600 opacity-20">"</div>
              <p className="text-slate-600 dark:text-slate-300 italic mb-6 relative z-10">"{t.text}"</p>
              <div>
                <div className="font-bold dark:text-white">{t.name}</div>
                <div className="text-sm text-blue-600 font-medium">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
