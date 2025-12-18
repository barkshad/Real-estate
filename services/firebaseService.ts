
import { 
  collection, 
  addDoc, 
  setDoc,
  query, 
  onSnapshot, 
  orderBy, 
  doc, 
  getDoc,
  where,
  deleteDoc,
  updateDoc
} from 'firebase/firestore';
import { db } from './firebase';
import { Property, SiteSettings, Inquiry } from '../types';

const PROPERTIES_COLLECTION = 'properties';
const SETTINGS_COLLECTION = 'settings';
const INQUIRIES_COLLECTION = 'inquiries';

export const firebaseService = {
  // Properties
  subscribeToListings: (callback: (properties: Property[]) => void) => {
    const q = query(collection(db, PROPERTIES_COLLECTION), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const properties = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Property[];
      callback(properties);
    });
  },

  subscribeToUserListings: (userId: string, callback: (properties: Property[]) => void) => {
    const q = query(
      collection(db, PROPERTIES_COLLECTION), 
      where('owner_id', '==', userId),
      orderBy('createdAt', 'desc')
    );
    return onSnapshot(q, (snapshot) => {
      const properties = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Property[];
      callback(properties);
    });
  },

  addProperty: async (propertyData: Omit<Property, 'id' | 'createdAt' | 'status'>) => {
    return await addDoc(collection(db, PROPERTIES_COLLECTION), {
      ...propertyData,
      createdAt: new Date().toISOString(),
      status: 'for_sale'
    });
  },

  deleteProperty: async (id: string) => {
    const docRef = doc(db, PROPERTIES_COLLECTION, id);
    return await deleteDoc(docRef);
  },

  getProperty: async (id: string): Promise<Property | null> => {
    const docRef = doc(db, PROPERTIES_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Property;
    }
    return null;
  },

  // Site Settings
  getSettings: async (): Promise<SiteSettings | null> => {
    const docRef = doc(db, SETTINGS_COLLECTION, 'general');
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? (docSnap.data() as SiteSettings) : null;
  },

  updateSettings: async (settings: Partial<SiteSettings>) => {
    const docRef = doc(db, SETTINGS_COLLECTION, 'general');
    return await setDoc(docRef, settings, { merge: true });
  },

  subscribeToSettings: (callback: (settings: SiteSettings) => void) => {
    return onSnapshot(doc(db, SETTINGS_COLLECTION, 'general'), (doc) => {
      if (doc.exists()) {
        callback(doc.data() as SiteSettings);
      }
    });
  },

  // Inquiries
  submitInquiry: async (inquiryData: Omit<Inquiry, 'id' | 'created_at' | 'status'>) => {
    return await addDoc(collection(db, INQUIRIES_COLLECTION), {
      ...inquiryData,
      status: 'pending',
      created_at: new Date().toISOString()
    });
  },

  subscribeToAllInquiries: (callback: (inquiries: Inquiry[]) => void) => {
    const q = query(collection(db, INQUIRIES_COLLECTION), orderBy('created_at', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const inquiries = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Inquiry[];
      callback(inquiries);
    });
  }
};
