
import React from 'react';
import { Link } from 'react-router-dom';
import { Property } from '../types';
import { ICONS } from '../constants';

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <div className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300">
      <Link to={`/property/${property.id}`} className="block relative h-64 overflow-hidden">
        <img 
          src={property.images[0]} 
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            {property.status === 'for_sale' ? 'For Sale' : 'Sold'}
          </span>
        </div>
      </Link>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold dark:text-white truncate pr-4">{property.title}</h3>
          <p className="text-blue-600 dark:text-blue-400 font-bold text-lg">
            ${property.price.toLocaleString()}
          </p>
        </div>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          {property.location}
        </p>
        
        <div className="grid grid-cols-3 gap-4 border-t border-slate-100 dark:border-slate-700 pt-4">
          <div className="flex flex-col items-center">
            <ICONS.Bed className="w-5 h-5 text-slate-400 mb-1" />
            <span className="text-xs font-semibold dark:text-slate-300">{property.bedrooms} Beds</span>
          </div>
          <div className="flex flex-col items-center border-x border-slate-100 dark:border-slate-700">
            <ICONS.Bath className="w-5 h-5 text-slate-400 mb-1" />
            <span className="text-xs font-semibold dark:text-slate-300">{property.bathrooms} Baths</span>
          </div>
          <div className="flex flex-col items-center">
            <ICONS.Area className="w-5 h-5 text-slate-400 mb-1" />
            <span className="text-xs font-semibold dark:text-slate-300">{property.squareFeet} sqft</span>
          </div>
        </div>

        <Link 
          to={`/property/${property.id}`}
          className="mt-6 block w-full text-center bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 py-3 rounded-xl font-bold hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};
