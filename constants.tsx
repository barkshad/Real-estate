
import React from 'react';
import { Property } from './types';

export const MOCK_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Modern Minimalist Villa',
    description: 'A stunning contemporary villa with open spaces and natural light. Featuring floor-to-ceiling windows and a private infinity pool.',
    price: 1250000,
    location: 'Beverly Hills, CA',
    bedrooms: 4,
    bathrooms: 3.5,
    squareFeet: 3200,
    images: ['https://picsum.photos/id/101/800/600', 'https://picsum.photos/id/102/800/600'],
    status: 'for_sale',
    owner_id: 'user1',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Rustic Lakeside Cabin',
    description: 'Escape to the serenity of nature in this beautiful cedar cabin. Private dock access and mountain views included.',
    price: 450000,
    location: 'Lake Tahoe, NV',
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1500,
    images: ['https://picsum.photos/id/103/800/600', 'https://picsum.photos/id/104/800/600'],
    status: 'for_sale',
    owner_id: 'user2',
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Luxury Downtown Penthouse',
    description: 'Experience city living at its finest. This 50th-floor penthouse offers 360-degree views of the skyline.',
    price: 3800000,
    location: 'Manhattan, NY',
    bedrooms: 3,
    bathrooms: 4,
    squareFeet: 2800,
    images: ['https://picsum.photos/id/106/800/600', 'https://picsum.photos/id/107/800/600'],
    status: 'for_sale',
    owner_id: 'user3',
    createdAt: new Date().toISOString()
  },
  {
    id: '4',
    title: 'Spanish Colonial Estate',
    description: 'Historic charm meets modern luxury in this meticulously restored estate featuring original tile work.',
    price: 2100000,
    location: 'Santa Barbara, CA',
    bedrooms: 5,
    bathrooms: 5,
    squareFeet: 4500,
    images: ['https://picsum.photos/id/108/800/600', 'https://picsum.photos/id/109/800/600'],
    status: 'for_sale',
    owner_id: 'user1',
    createdAt: new Date().toISOString()
  }
];

export const ICONS = {
  Bed: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  ),
  Bath: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-2.124-7.721H21c0-4.694-3.806-8.5-8.5-8.5S4 6.056 4 10.75v3.375c0 .621.504 1.125 1.125 1.125h2.25c.621 0 1.125-.504 1.125-1.125V10.75c0-2.135.845-4.07 2.234-5.5" />
    </svg>
  ),
  Area: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v16.5h16.5V3.75H3.75zM12 3.75v16.5M3.75 12h16.5" />
    </svg>
  ),
  Search: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  ),
  Sun: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M3 12h2.25m.386-4.773l1.591-1.591M12 7.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9z" />
    </svg>
  ),
  Moon: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
    </svg>
  ),
  Sparkles: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.456-2.454L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  )
};
