
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User } from '../types';
import { uploadToCloudinary } from '../services/cloudinaryService';
import { firebaseService } from '../services/firebaseService';

export const BuyPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-20">
      <div className="text-center space-y-6 max-w-3xl mx-auto">
        <h1 className="text-5xl font-extrabold dark:text-white">The Smart Way to Buy a Home</h1>
        <p className="text-xl text-slate-500 dark:text-slate-400">We don't just find you a house; we find you the future you've been dreaming of. Our end-to-end buying service makes the complex simple.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-12">
        {[
          { step: "01", title: "Market Research", desc: "Use our AI tools to understand neighborhood trends, school districts, and future property value forecasts." },
          { step: "02", title: "Smart Matching", desc: "Our matching engine pairs you with listings that fit not just your budget, but your lifestyle needs." },
          { step: "03", title: "Guided Closing", desc: "From inspections to final paperwork, our veteran agents handle the heavy lifting to ensure a smooth transition." }
        ].map((item, i) => (
          <div key={i} className="relative p-8 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="text-6xl font-black text-blue-600 opacity-10 absolute top-4 right-4">{item.step}</div>
            <h3 className="text-2xl font-bold dark:text-white mb-4 relative z-10">{item.title}</h3>
            <p className="text-slate-600 dark:text-slate-400 relative z-10">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-blue-600 rounded-[3rem] p-12 text-white text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to find your forever home?</h2>
        <Link to="/listings" className="inline-block bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-slate-100 transition-all">Start Browsing</Link>
      </div>
    </div>
  );
};

interface SellPageProps {
  user: User | null;
}

export const SellPage: React.FC<SellPageProps> = ({ user }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    bedrooms: '2',
    bathrooms: '2',
    squareFeet: '1500',
    description: ''
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return navigate('/login');
    if (!selectedFile) return alert("Please upload at least one image.");

    setLoading(true);
    try {
      // 1. Upload to Cloudinary
      const imageUrl = await uploadToCloudinary(selectedFile);
      
      // 2. Save to Firestore
      await firebaseService.addProperty({
        title: formData.title,
        location: formData.location,
        price: Number(formData.price),
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms),
        squareFeet: Number(formData.squareFeet),
        description: formData.description,
        images: [imageUrl],
        owner_id: user.id,
      });

      alert("Property listed successfully!");
      navigate('/listings');
    } catch (err) {
      console.error(err);
      alert("Failed to list property. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-20">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <h1 className="text-5xl font-extrabold dark:text-white leading-tight">Maximize Your Profit, Minimize Your Stress</h1>
          <p className="text-xl text-slate-500 dark:text-slate-400">HomeQuest sellers get more. Our average listing sells for 4.2% above market value thanks to our precision pricing and high-impact marketing.</p>
          
          <div className="space-y-4">
            {['Expert Staging Advice', 'Cinematic Marketing', 'Global Reach'].map((text, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-bold">{i + 1}</span>
                </div>
                <div>
                  <h4 className="font-bold dark:text-white">{text}</h4>
                  <p className="text-slate-500 text-sm">Professional services included standard for every HomeQuest listing.</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-8 sm:p-10 rounded-[3rem] shadow-2xl border border-slate-200 dark:border-slate-700">
           <h3 className="text-2xl font-bold dark:text-white mb-6">List Your Property</h3>
           <form onSubmit={handleSubmit} className="space-y-4">
              <input 
                type="text" 
                required
                placeholder="Property Title (e.g., Luxury Modern Villa)" 
                className="w-full bg-slate-100 dark:bg-slate-900 px-4 py-3 rounded-xl border-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
              />
              <input 
                type="text" 
                required
                placeholder="Location (e.g., Beverly Hills, CA)" 
                className="w-full bg-slate-100 dark:bg-slate-900 px-4 py-3 rounded-xl border-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                value={formData.location}
                onChange={e => setFormData({...formData, location: e.target.value})}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="number" 
                  required
                  placeholder="Price ($)" 
                  className="bg-slate-100 dark:bg-slate-900 px-4 py-3 rounded-xl border-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                  value={formData.price}
                  onChange={e => setFormData({...formData, price: e.target.value})}
                />
                <input 
                  type="number" 
                  required
                  placeholder="Sq Ft" 
                  className="bg-slate-100 dark:bg-slate-900 px-4 py-3 rounded-xl border-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                  value={formData.squareFeet}
                  onChange={e => setFormData({...formData, squareFeet: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <select 
                  className="bg-slate-100 dark:bg-slate-900 px-4 py-3 rounded-xl border-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                  value={formData.bedrooms}
                  onChange={e => setFormData({...formData, bedrooms: e.target.value})}
                >
                  {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} Beds</option>)}
                </select>
                <select 
                  className="bg-slate-100 dark:bg-slate-900 px-4 py-3 rounded-xl border-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                  value={formData.bathrooms}
                  onChange={e => setFormData({...formData, bathrooms: e.target.value})}
                >
                  {[1,1.5,2,2.5,3,4,5].map(n => <option key={n} value={n}>{n} Baths</option>)}
                </select>
              </div>

              <textarea 
                placeholder="Describe your home..."
                rows={3}
                className="w-full bg-slate-100 dark:bg-slate-900 px-4 py-3 rounded-xl border-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
              />

              <div className="relative group">
                <input 
                  type="file" 
                  id="imageUpload"
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                />
                <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-6 text-center group-hover:border-blue-500 transition-colors">
                  {preview ? (
                    <img src={preview} alt="Preview" className="w-full h-32 object-cover rounded-xl" />
                  ) : (
                    <div className="text-slate-400">
                      <svg className="w-10 h-10 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                      <span className="text-sm font-bold">Add Property Image/Video</span>
                    </div>
                  )}
                </div>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/30 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading && <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
                {loading ? 'Listing Property...' : 'Get Free Valuation & List'}
              </button>
           </form>
        </div>
      </div>
    </div>
  );
};
