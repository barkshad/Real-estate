
import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { firebaseService } from '../services/firebaseService';
import { PropertyCard } from '../components/PropertyCard';
import { FilterOptions, Property } from '../types';

export const Listings: React.FC = () => {
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterOptions>({
    location: queryParam,
    minPrice: 0,
    maxPrice: 10000000,
    bedrooms: 0
  });

  useEffect(() => {
    // Real-time listener
    const unsubscribe = firebaseService.subscribeToListings((data) => {
      setProperties(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const filteredProperties = useMemo(() => {
    return properties.filter(p => {
      const matchLocation = p.location.toLowerCase().includes(filters.location.toLowerCase()) || 
                            p.title.toLowerCase().includes(filters.location.toLowerCase());
      const matchPrice = p.price >= filters.minPrice && p.price <= filters.maxPrice;
      const matchBeds = filters.bedrooms === 0 || p.bedrooms >= filters.bedrooms;
      return matchLocation && matchPrice && matchBeds;
    });
  }, [filters, properties]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-72 space-y-8 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 h-fit sticky top-24">
          <h2 className="text-lg font-bold dark:text-white mb-6">Filter Properties</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Location</label>
              <input 
                type="text" 
                value={filters.location}
                onChange={(e) => setFilters({...filters, location: e.target.value})}
                className="w-full bg-slate-100 dark:bg-slate-900 dark:text-white px-4 py-2 rounded-lg border-none focus:ring-2 focus:ring-blue-500"
                placeholder="City, State..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Price Range</label>
              <div className="grid grid-cols-2 gap-2">
                <input 
                  type="number" 
                  placeholder="Min"
                  value={filters.minPrice === 0 ? '' : filters.minPrice}
                  onChange={(e) => setFilters({...filters, minPrice: Number(e.target.value)})}
                  className="w-full bg-slate-100 dark:bg-slate-900 dark:text-white px-3 py-2 rounded-lg text-sm border-none"
                />
                <input 
                  type="number" 
                  placeholder="Max"
                  value={filters.maxPrice === 10000000 ? '' : filters.maxPrice}
                  onChange={(e) => setFilters({...filters, maxPrice: Number(e.target.value)})}
                  className="w-full bg-slate-100 dark:bg-slate-900 dark:text-white px-3 py-2 rounded-lg text-sm border-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Minimum Bedrooms</label>
              <div className="flex gap-2">
                {[0, 1, 2, 3, 4].map(num => (
                  <button
                    key={num}
                    onClick={() => setFilters({...filters, bedrooms: num})}
                    className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
                      filters.bedrooms === num 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                    }`}
                  >
                    {num === 0 ? 'Any' : `${num}+`}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={() => setFilters({ location: '', minPrice: 0, maxPrice: 10000000, bedrooms: 0 })}
              className="w-full text-sm text-blue-600 font-semibold hover:underline pt-4"
            >
              Reset All Filters
            </button>
          </div>
        </aside>

        <main className="flex-1">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold dark:text-white">
              {filteredProperties.length} Properties Found
            </h1>
            <div className="flex gap-2">
              <select className="bg-white dark:bg-slate-800 dark:text-white border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm focus:outline-none">
                <option>Newest First</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>

          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredProperties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
              <div className="text-slate-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <h3 className="text-xl font-bold dark:text-white mb-2">No properties match your criteria</h3>
              <p className="text-slate-500">Try adjusting your filters or searching a broader area.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
