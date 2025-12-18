
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './services/firebase';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { GeminiAssistant } from './components/GeminiAssistant';
import { Home } from './pages/Home';
import { Listings } from './pages/Listings';
import { PropertyDetails } from './pages/PropertyDetails';
import { BuyPage, SellPage } from './pages/BuySell';
import { Auth } from './pages/Auth';
import { Dashboard } from './pages/Dashboard';
import { Theme, User } from './types';

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(Theme.LIGHT);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Persistent theme
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === Theme.DARK);
    }

    // Firebase Auth Listener
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          id: firebaseUser.uid,
          email: firebaseUser.email || '',
          full_name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
          role: 'buyer' // Default role
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
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
          </Routes>
        </main>

        <Footer />
        <GeminiAssistant />
      </div>
    </HashRouter>
  );
};

export default App;
