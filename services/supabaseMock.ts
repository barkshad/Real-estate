
import { Property, User, Inquiry } from '../types';
import { MOCK_PROPERTIES } from '../constants';

// Simulated database state
let properties: Property[] = [...MOCK_PROPERTIES];
let currentUser: User | null = null;
let inquiries: Inquiry[] = [];

export const supabaseMock = {
  auth: {
    signIn: async (email: string) => {
      currentUser = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        full_name: email.split('@')[0],
        role: 'buyer'
      };
      return { user: currentUser, error: null };
    },
    signOut: async () => {
      currentUser = null;
      return { error: null };
    },
    getUser: () => currentUser,
  },
  from: (table: string) => ({
    select: async (query?: string) => {
      if (table === 'listings') return { data: properties, error: null };
      if (table === 'inquiries') return { data: inquiries, error: null };
      return { data: [], error: null };
    },
    insert: async (data: any) => {
      if (table === 'listings') {
        const newProp = { ...data, id: Math.random().toString(36), createdAt: new Date().toISOString() };
        properties = [newProp, ...properties];
        return { data: newProp, error: null };
      }
      if (table === 'inquiries') {
        const newInq = { ...data, id: Math.random().toString(36), created_at: new Date().toISOString() };
        inquiries = [newInq, ...inquiries];
        return { data: newInq, error: null };
      }
      return { data: null, error: null };
    },
    delete: async (filter: any) => {
       // Mock delete logic
       return { error: null };
    }
  }),
  storage: {
    from: (bucket: string) => ({
      upload: async (path: string, file: File) => {
        return { data: { path }, error: null };
      },
      getPublicUrl: (path: string) => {
        return { data: { publicUrl: `https://picsum.photos/800/600?random=${Math.random()}` } };
      }
    })
  }
};
