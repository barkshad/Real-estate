
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_PROPERTIES, ICONS } from '../constants';
import { Property } from '../types';

export const PropertyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const found = MOCK_PROPERTIES.find(p => p.id === id);
    if (found) setProperty(found);
  }, [id]);

  if (!property) return <div className="p-20 text-center dark:text-white">Property not found...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/listings" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-8 font-medium">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        Back to Listings
      </Link>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="h-[500px] rounded-3xl overflow-hidden shadow-lg">
              <img src={property.images[activeImage]} alt={property.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {property.images.map((img, i) => (
                <button 
                  key={i} 
                  onClick={() => setActiveImage(i)}
                  className={`w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${activeImage === i ? 'border-blue-600' : 'border-transparent'}`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-extrabold dark:text-white mb-2">{property.title}</h1>
                <p className="text-slate-500 dark:text-slate-400 flex items-center gap-2">
                   <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                   {property.location}
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-600">${property.price.toLocaleString()}</div>
                <div className="text-slate-400 text-sm font-medium">Est. Mortgage: $5,240/mo</div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-slate-100 dark:border-slate-700 my-8">
              <div className="flex flex-col items-center">
                <span className="text-slate-400 text-sm mb-1 uppercase tracking-wider font-bold">Bedrooms</span>
                <span className="text-2xl font-bold dark:text-white">{property.bedrooms}</span>
              </div>
              <div className="flex flex-col items-center border-x border-slate-100 dark:border-slate-700 px-4">
                <span className="text-slate-400 text-sm mb-1 uppercase tracking-wider font-bold">Bathrooms</span>
                <span className="text-2xl font-bold dark:text-white">{property.bathrooms}</span>
              </div>
              <div className="flex flex-col items-center border-r border-slate-100 dark:border-slate-700 px-4">
                <span className="text-slate-400 text-sm mb-1 uppercase tracking-wider font-bold">Square Feet</span>
                <span className="text-2xl font-bold dark:text-white">{property.squareFeet}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-slate-400 text-sm mb-1 uppercase tracking-wider font-bold">Lot Size</span>
                <span className="text-2xl font-bold dark:text-white">0.25 ac</span>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold dark:text-white mb-4">About this Property</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                {property.description}
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar / Contact */}
        <aside className="space-y-8">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl sticky top-24">
            <h3 className="text-xl font-bold dark:text-white mb-6">Interested?</h3>
            <form className="space-y-4">
              <input 
                type="text" 
                placeholder="Full Name"
                className="w-full bg-slate-50 dark:bg-slate-900 dark:text-white px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 border-none"
              />
              <input 
                type="email" 
                placeholder="Email Address"
                className="w-full bg-slate-50 dark:bg-slate-900 dark:text-white px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 border-none"
              />
              <textarea 
                rows={4} 
                placeholder="I am interested in this property..."
                className="w-full bg-slate-50 dark:bg-slate-900 dark:text-white px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 border-none"
              ></textarea>
              <button 
                type="button"
                className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30"
              >
                Schedule a Visit
              </button>
              <button 
                type="button"
                className="w-full bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-bold py-4 rounded-xl hover:bg-slate-200 transition-all"
              >
                Inquire via Chat
              </button>
            </form>
            <div className="mt-8 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl flex items-center gap-4">
              <img src="https://picsum.photos/100/100?random=agent" alt="Agent" className="w-16 h-16 rounded-full object-cover" />
              <div>
                <div className="font-bold dark:text-white">Alex Morgan</div>
                <div className="text-sm text-slate-500">Elite Listing Agent</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden">
             <h3 className="text-xl font-bold dark:text-white mb-4">Location</h3>
             <div className="h-48 bg-slate-200 dark:bg-slate-900 rounded-2xl flex items-center justify-center text-slate-400">
               <svg className="w-10 h-10 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path></svg>
               <span className="font-bold ml-2">Google Maps Placeholder</span>
             </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
