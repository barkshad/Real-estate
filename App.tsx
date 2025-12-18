
import React, { useState, useEffect } from 'react';
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

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(Theme.LIGHT);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    // Persistent theme
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === Theme.DARK);
    }

    // Initialize Site Settings
    const initSettings = async () => {
      const settings = await firebaseService.getSettings();
      if (!settings) {
        // First-time setup default settings
        const defaults: SiteSettings = {
          brandName: "HomeQuest",
          heroTitle: "Find the Perfect Place to Call Home",
          heroSubtitle: "Browse premium properties in the world's most desirable locations. Luxury living tailored to you.",
          primaryColor: "#2563eb",
          contactEmail: "hello@homequest.realty",
          footerText: "Redefining real estate with technology and trust."
        };
        await firebaseService.updateSettings(defaults);
        setSiteSettings(defaults);
      } else {
        setSiteSettings(settings);
      }
    };
    initSettings();

    // Subscribe to settings for real-time brand updates
    const unsubSettings = firebaseService.subscribeToSettings(setSiteSettings);

    // Firebase Auth Listener
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // In this implementation, the first user or specific emails could be admin.
        // For demonstration, we'll mark all logged in users as admins if they match a pattern or just assign it.
        // In production, roles are usually handled via Firestore user document or Custom Claims.
        setUser({
          id: firebaseUser.uid,
          email: firebaseUser.email || '',
          full_name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
          role: firebaseUser.email === 'admin@homequest.com' ? 'admin' : 'seller' // Demo logic
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
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
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
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
