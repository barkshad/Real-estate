
import { 
  collection, 
  addDoc, 
  query, 
  onSnapshot, 
  orderBy, 
  doc, 
  getDoc,
  where,
  deleteDoc
} from 'firebase/firestore';
import { db } from './firebase';
import { Property } from '../types';

const PROPERTIES_COLLECTION = 'properties';

export const firebaseService = {
  /**
   * Listen to all real-time property listings
   */
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

  /**
   * Listen to real-time property listings for a specific user
   */
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

  /**
   * Create a new property listing
   */
  addProperty: async (propertyData: Omit<Property, 'id' | 'createdAt' | 'status'>) => {
    return await addDoc(collection(db, PROPERTIES_COLLECTION), {
      ...propertyData,
      createdAt: new Date().toISOString(),
      status: 'for_sale'
    });
  },

  /**
   * Delete a property listing
   */
  deleteProperty: async (id: string) => {
    const docRef = doc(db, PROPERTIES_COLLECTION, id);
    return await deleteDoc(docRef);
  },

  /**
   * Get a single property by ID
   */
  getProperty: async (id: string): Promise<Property | null> => {
    const docRef = doc(db, PROPERTIES_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Property;
    }
    return null;
  }
};
