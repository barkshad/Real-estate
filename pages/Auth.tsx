
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  updateProfile 
} from 'firebase/auth';
import { auth } from '../services/firebase';

export const Auth: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCred.user, { displayName: name });
      }
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || "An authentication error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-20">
      <div className="bg-white dark:bg-slate-800 w-full max-w-md p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-700 shadow-2xl">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl mx-auto flex items-center justify-center text-white text-3xl font-bold mb-4 shadow-xl shadow-blue-500/30">H</div>
          <h1 className="text-3xl font-extrabold dark:text-white">{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
          <p className="text-slate-500 mt-2">Find your perfect place with HomeQuest</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Full Name</label>
              <input 
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-900 px-5 py-4 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 dark:text-white" 
                placeholder="John Doe"
              />
            </div>
          )}

          <div className="space-y-1">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-900 px-5 py-4 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 dark:text-white" 
              placeholder="name@example.com"
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-900 px-5 py-4 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 dark:text-white" 
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-extrabold py-4 rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/30 transform active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-700">
           <p className="text-center text-slate-500">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-600 font-bold ml-2 hover:underline"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
           </p>
        </div>
      </div>
    </div>
  );
};
