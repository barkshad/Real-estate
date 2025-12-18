
import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 pt-20 pb-10 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-1">
             <Link to="/" className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">H</div>
                <span className="font-bold text-2xl tracking-tight dark:text-white">HomeQuest</span>
             </Link>
             <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
               Redefining real estate with technology and trust. Find your perfect home or sell with confidence.
             </p>
             <div className="flex gap-4">
                {['facebook', 'twitter', 'instagram', 'linkedin'].map(social => (
                  <a key={social} href="#" className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-500 hover:bg-blue-600 hover:text-white transition-all">
                    <span className="sr-only">{social}</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.493-1.1-1.1s.493-1.1 1.1-1.1 1.1.493 1.1 1.1-.493 1.1-1.1 1.1zm8 6.891h-2v-3.4c0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5v3.4h-2v-6h2v.945c.44-.727 1.258-1.245 2.155-1.245 1.571 0 2.845 1.274 2.845 2.845v3.455z"/></svg>
                  </a>
                ))}
             </div>
          </div>
          
          <div>
            <h4 className="font-bold dark:text-white mb-6">Company</h4>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-slate-500 hover:text-blue-600">About Us</Link></li>
              <li><Link to="/team" className="text-slate-500 hover:text-blue-600">Our Team</Link></li>
              <li><Link to="/careers" className="text-slate-500 hover:text-blue-600">Careers</Link></li>
              <li><Link to="/contact" className="text-slate-500 hover:text-blue-600">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold dark:text-white mb-6">Resources</h4>
            <ul className="space-y-4">
              <li><Link to="/blog" className="text-slate-500 hover:text-blue-600">Blog</Link></li>
              <li><Link to="/guides" className="text-slate-500 hover:text-blue-600">Home Buying Guide</Link></li>
              <li><Link to="/market" className="text-slate-500 hover:text-blue-600">Market Trends</Link></li>
              <li><Link to="/faq" className="text-slate-500 hover:text-blue-600">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold dark:text-white mb-6">Newsletter</h4>
            <p className="text-slate-500 mb-6 text-sm">Get the latest property market insights delivered weekly.</p>
            <form className="space-y-4">
              <input type="email" placeholder="Email address" className="w-full bg-slate-100 dark:bg-slate-800 px-4 py-3 rounded-xl border-none text-sm dark:text-white" />
              <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-all">Subscribe</button>
            </form>
          </div>
        </div>
        
        <div className="pt-10 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
           <p>© 2024 HomeQuest Realty Inc. All rights reserved.</p>
           <div className="flex gap-8">
              <a href="#" className="hover:text-blue-600">Privacy Policy</a>
              <a href="#" className="hover:text-blue-600">Terms of Service</a>
              <a href="#" className="hover:text-blue-600">Cookie Policy</a>
           </div>
        </div>
      </div>
    </footer>
  );
};
