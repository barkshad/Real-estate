
import React, { useState, useEffect, useRef } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './services/firebase';
import { firebaseService } from './services/firebaseService';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { GeminiAssistant } from './components/GeminiAssistant';
import { Home } from './pages/Home';
import { Listings } from './pages/Listings';
import { PropertyDetails } from './pages/PropertyDetails';
import { BuyPage, SellPage } from './pages/BuySell';
import { Auth } from './pages/Auth';
import { Dashboard } from './pages/Dashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { Theme, User, SiteSettings } from './types';

const DEFAULT_SETTINGS: SiteSettings = {
  brandName: "HomeQuest",
  heroTitle: "Find the Perfect Place to Call Home",
  heroSubtitle: "Browse premium properties in the world's most desirable locations. Luxury living tailored to you.",
  primaryColor: "#2563eb",
  contactEmail: "hello@homequest.realty",
  footerText: "Redefining real estate with technology and trust."
};

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(Theme.LIGHT);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const hasAttemptedInit = useRef(false);

  useEffect(() => {
    // Persistent theme
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === Theme.DARK);
    }

    // Subscribe to settings for real-time updates (if rules allow)
    const unsubSettings = firebaseService.subscribeToSettings((updated) => {
      if (updated) setSiteSettings(updated);
    });

    // Firebase Auth Listener
    const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser) => {
      let currentUser: User | null = null;
      
      if (firebaseUser) {
        currentUser = {
          id: firebaseUser.uid,
          email: firebaseUser.email || '',
          full_name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
          role: firebaseUser.email === 'admin@homequest.com' ? 'admin' : 'seller'
        };
        setUser(currentUser);
      } else {
        setUser(null);
      }

      // Initialize/Sync Site Settings once we know auth state
      if (!hasAttemptedInit.current) {
        hasAttemptedInit.current = true;
        try {
          const settings = await firebaseService.getSettings();
          if (settings) {
            setSiteSettings(settings);
          } else if (currentUser?.role === 'admin') {
            // Only seed the database if the user is the master admin
            await firebaseService.updateSettings(DEFAULT_SETTINGS);
          }
        } catch (err) {
          // Fail silently and use DEFAULT_SETTINGS
        }
      }

      setLoading(false);
    });

    return () => {
      unsubscribeAuth();
      unsubSettings();
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === Theme.DARK);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Sign out error", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-medium animate-pulse">Establishing Secure Session...</p>
        </div>
      </div>
    );
  }

  return (
    <HashRouter>
      <div className={`min-h-screen transition-colors duration-300 ${theme === Theme.DARK ? 'dark bg-slate-950' : 'bg-slate-50'}`}>
        <Navbar 
          theme={theme} 
          onToggleTheme={toggleTheme} 
          user={user} 
          onLogout={handleLogout} 
        />
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/listings" element={<Listings />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
            <Route path="/buy" element={<BuyPage />} />
            <Route path="/sell" element={<SellPage user={user} />} />
            <Route path="/login" element={<Auth />} />
            <Route 
              path="/dashboard" 
              element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} 
            />
            {/* Admin route now handles its own verification via PIN "12345" */}
            <Route 
              path="/admin" 
              element={<AdminDashboard user={user} />} 
            />
          </Routes>
        </main>

        <Footer />
        <GeminiAssistant />
      </div>
    </HashRouter>
  );
};

export default App;
