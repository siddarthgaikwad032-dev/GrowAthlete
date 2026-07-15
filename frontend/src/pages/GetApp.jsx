import React, { useState } from 'react';
import { ArrowLeft, Smartphone, Bell, CheckCircle, Download, Apple, Play } from 'lucide-react';
import { toast } from '../components/Toast';

export default function GetApp({ onBack }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast('Please enter a valid email address.', 'error');
      return;
    }
    setSubscribed(true);
    toast('You\'re on the list! We\'ll notify you when the app drops.', 'success');
    
    // Store in localStorage for demo persistence
    const existing = JSON.parse(localStorage.getItem('ga_app_waitlist') || '[]');
    existing.push({ email, date: new Date().toISOString() });
    localStorage.setItem('ga_app_waitlist', JSON.stringify(existing));
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 py-4 px-4 sm:px-6 lg:px-8 flex-shrink-0">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Website
          </button>
          <div className="flex items-baseline text-xl font-bold tracking-tight">
            <span className="text-orange-600">Grow</span>
            <span className="text-slate-900 ml-0.5">Athlete</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        
        {/* Left: Text & CTA */}
        <div className="flex-1 text-center lg:text-left space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider mb-2">
            <Smartphone className="w-4 h-4" /> Coming Soon to iOS & Android
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-tight">
            Your Sports Career,<br />In Your Pocket.
          </h1>
          
          <p className="text-lg text-slate-500 leading-relaxed max-w-xl mx-auto lg:mx-0">
            We're building the ultimate mobile experience for Indian athletes. Instant tournament alerts, live chat rooms, quick video uploads, and push notifications when a scout views your profile.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
            <button disabled className="flex items-center gap-3 px-6 py-3.5 bg-slate-900 text-white rounded-xl opacity-50 cursor-not-allowed">
              <Apple className="w-6 h-6" />
              <div className="text-left">
                <div className="text-[10px] uppercase font-bold tracking-wider opacity-80">Coming to</div>
                <div className="text-sm font-bold leading-none mt-0.5">App Store</div>
              </div>
            </button>
            <button disabled className="flex items-center gap-3 px-6 py-3.5 bg-slate-900 text-white rounded-xl opacity-50 cursor-not-allowed">
              <Play className="w-6 h-6" />
              <div className="text-left">
                <div className="text-[10px] uppercase font-bold tracking-wider opacity-80">Coming to</div>
                <div className="text-sm font-bold leading-none mt-0.5">Google Play</div>
              </div>
            </button>
          </div>

          <div className="pt-8 border-t border-slate-200">
            <h3 className="font-extrabold text-slate-800 mb-4">Get early access & launch updates</h3>
            {subscribed ? (
              <div className="flex items-center justify-center lg:justify-start gap-3 text-green-600 bg-green-50 px-4 py-3 rounded-xl border border-green-200 w-full max-w-md mx-auto lg:mx-0">
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm font-bold">You're on the waitlist! We'll be in touch.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md mx-auto lg:mx-0">
                <input 
                  type="email" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email address" 
                  className="flex-1 px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm"
                />
                <button type="submit" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-sm whitespace-nowrap">
                  Notify Me
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right: App Mockup illustration */}
        <div className="flex-1 relative w-full max-w-md mx-auto lg:max-w-none">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-indigo-50 rounded-full blur-3xl opacity-70 transform -translate-y-10 scale-110" />
          
          <div className="relative mx-auto w-[280px] h-[580px] bg-slate-900 rounded-[3rem] border-[8px] border-slate-800 shadow-2xl overflow-hidden flex flex-col">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-2xl z-20" />
            
            {/* Screen Content Mockup */}
            <div className="flex-1 bg-slate-50 relative">
              <div className="bg-blue-600 pt-12 pb-6 px-5 text-white">
                <div className="flex justify-between items-center mb-6">
                  <div className="w-8 h-8 rounded-full bg-white/20" />
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"><Bell className="w-4 h-4" /></div>
                  </div>
                </div>
                <div className="h-4 w-32 bg-white/20 rounded mb-2" />
                <div className="h-8 w-48 bg-white/30 rounded" />
              </div>
              
              <div className="px-5 py-6 space-y-4">
                <div className="flex gap-4 mb-2">
                  <div className="h-10 w-24 bg-blue-100 rounded-full" />
                  <div className="h-10 w-24 bg-slate-200 rounded-full" />
                  <div className="h-10 w-24 bg-slate-200 rounded-full" />
                </div>
                
                {[1, 2, 3].map(i => (
                  <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                    <div className="flex gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-slate-200" />
                      <div className="space-y-2 flex-1">
                        <div className="h-3 w-24 bg-slate-200 rounded" />
                        <div className="h-2 w-16 bg-slate-100 rounded" />
                      </div>
                    </div>
                    <div className="h-24 w-full bg-slate-100 rounded-lg" />
                  </div>
                ))}
              </div>

              {/* Bottom Nav Mockup */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-white border-t border-slate-200 flex justify-around items-center px-6">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className={`w-6 h-6 rounded ${i === 1 ? 'bg-blue-500' : 'bg-slate-300'}`} />
                ))}
              </div>
            </div>
          </div>

          {/* Floating feature cards */}
          <div className="absolute top-20 -left-8 sm:-left-12 bg-white p-4 rounded-xl shadow-xl border border-slate-100 flex items-center gap-3 animate-bounce" style={{ animationDuration: '3s' }}>
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600"><CheckCircle className="w-5 h-5" /></div>
            <div>
              <div className="text-xs font-bold text-slate-800">Scout Viewed Profile</div>
              <div className="text-[10px] text-slate-500">2 mins ago</div>
            </div>
          </div>

          <div className="absolute bottom-32 -right-8 sm:-right-12 bg-white p-4 rounded-xl shadow-xl border border-slate-100 flex items-center gap-3 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-600"><Bell className="w-5 h-5" /></div>
            <div>
              <div className="text-xs font-bold text-slate-800">Tournament Alert</div>
              <div className="text-[10px] text-slate-500">U19 Football - Mumbai</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
