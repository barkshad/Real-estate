
/**
 * FIRESTORE SECURITY RULES (COPY & PASTE INTO FIREBASE CONSOLE):
 * 
 * rules_version = '2';
 * service cloud.firestore {
 *   match /databases/{database}/documents {
 *     
 *     // Properties: Anyone can read, only authenticated users can write/delete their own
 *     match /properties/{propertyId} {
 *       allow read: if true;
 *       allow create: if request.auth != null;
 *       allow update, delete: if request.auth != null && (request.auth.uid == resource.data.owner_id || request.auth.token.email == 'admin@homequest.com');
 *     }
 *     
 *     // Settings: Anyone can read, only the master admin email can write
 *     match /settings/{settingId} {
 *       allow read: if true;
 *       allow write: if request.auth != null && request.auth.token.email == 'admin@homequest.com';
 *     }
 *     
 *     // Inquiries: Anyone can create (submit contact form), only admin can read the inbox
 *     match /inquiries/{inquiryId} {
 *       allow create: if true;
 *       allow read: if request.auth != null && request.auth.token.email == 'admin@homequest.com';
 *       allow update, delete: if request.auth != null && request.auth.token.email == 'admin@homequest.com';
 *     }
 *   }
 * }
 */

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
  deleteDoc
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
    return onSnapshot(q, 
      (snapshot) => {
        const properties = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Property[];
        callback(properties);
      },
      (error) => {
        // Log once, then provide empty array to prevent UI hang
        if (error.code !== 'permission-denied') {
           console.error("Firestore Error (Listings):", error.message);
        }
        callback([]); 
      }
    );
  },

  subscribeToUserListings: (userId: string, callback: (properties: Property[]) => void) => {
    const q = query(
      collection(db, PROPERTIES_COLLECTION), 
      where('owner_id', '==', userId),
      orderBy('createdAt', 'desc')
    );
    return onSnapshot(q, 
      (snapshot) => {
        const properties = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Property[];
        callback(properties);
      },
      (error) => {
        if (error.code !== 'permission-denied') {
          console.error("Firestore Error (User Listings):", error.message);
        }
        callback([]);
      }
    );
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
    try {
      const docRef = doc(db, PROPERTIES_COLLECTION, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Property;
      }
    } catch (e: any) {
      if (e.code !== 'permission-denied') console.error("Error fetching property:", e);
    }
    return null;
  },

  // Site Settings
  getSettings: async (): Promise<SiteSettings | null> => {
    try {
      const docRef = doc(db, SETTINGS_COLLECTION, 'general');
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? (docSnap.data() as SiteSettings) : null;
    } catch (e: any) {
      // Permission errors on settings fetch usually mean the collection hasn't been set up with public read yet
      return null;
    }
  },

  updateSettings: async (settings: Partial<SiteSettings>) => {
    const docRef = doc(db, SETTINGS_COLLECTION, 'general');
    return await setDoc(docRef, settings, { merge: true });
  },

  subscribeToSettings: (callback: (settings: SiteSettings) => void) => {
    return onSnapshot(doc(db, SETTINGS_COLLECTION, 'general'), 
      (doc) => {
        if (doc.exists()) {
          callback(doc.data() as SiteSettings);
        }
      },
      (error) => {
        // Silence permission errors for settings as we handle this with defaults in App.tsx
      }
    );
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
    return onSnapshot(q, 
      (snapshot) => {
        const inquiries = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Inquiry[];
        callback(inquiries);
      },
      (error) => {
        if (error.code !== 'permission-denied') {
          console.error("Firestore Error (Inquiries):", error.message);
        }
        callback([]);
      }
    );
  }
};
