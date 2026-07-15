import React from 'react';
import { Target, Users, Star, Zap, Award, Globe, Mail, ArrowLeft } from 'lucide-react';

const stats = [
  { label: 'Athletes', value: '50,000+' },
  { label: 'Tournaments Listed', value: '1,200+' },
  { label: 'States Covered', value: '28' },
  { label: 'Coaches & Scouts', value: '3,000+' },
];

const team = [
  { name: 'Arjun Mehta', role: 'Co-Founder & CEO', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop', bio: 'Former national-level sprinter, IIM Ahmedabad alumnus.' },
  { name: 'Sneha Patel', role: 'Co-Founder & CTO', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop', bio: 'Ex-Google engineer passionate about sports technology.' },
  { name: 'Rahul Nair', role: 'Head of Sports Partnerships', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop', bio: 'Former ISL football player, 10+ years in sports management.' },
];

const values = [
  { icon: Target, title: 'Mission', desc: 'To democratise access to sports opportunities for every young athlete across India, regardless of background or geography.' },
  { icon: Globe, title: 'Vision', desc: 'A future where no Indian sports talent goes undiscovered — every athlete has a platform to be seen, supported, and celebrated.' },
  { icon: Zap, title: 'Innovation', desc: 'We leverage technology to bridge the gap between grassroots athletes and top-tier coaches, scouts, and tournaments.' },
  { icon: Star, title: 'Excellence', desc: 'We hold ourselves and our athlete community to the highest standard of performance, integrity, and sportsmanship.' },
];

export default function About({ onBack }) {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Hero */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <button onClick={onBack} className="flex items-center gap-2 text-sm font-semibold text-blue-300 hover:text-white transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <div className="max-w-3xl">
            <span className="text-xs font-extrabold uppercase tracking-widest text-blue-400 mb-3 block">About GrowAthlete</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-6">
              Empowering Every Young Athlete in India
            </h1>
            <p className="text-lg text-blue-100 leading-relaxed">
              GrowAthlete is India's premier digital sports platform, built to connect grassroots athletes with the opportunities, networks, and resources they need to grow into champions.
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map(s => (
            <div key={s.label} className="bg-white rounded-xl border border-slate-200 p-5 text-center shadow-sm">
              <div className="text-3xl font-extrabold text-blue-600">{s.value}</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wide mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Story */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Our Story</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              GrowAthlete was founded in 2021 by Arjun Mehta and Sneha Patel — a former national-level sprinter and a tech entrepreneur — who witnessed firsthand how talented young athletes in India struggled to get noticed due to lack of visibility and access.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              The idea was simple but powerful: create a single, unified digital space where athletes can build their profile, showcase achievements, discover tournaments, and connect with coaches and scouts — regardless of whether they're from Mumbai or a small town in rural Bihar.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Today, GrowAthlete serves over 50,000 athletes across all 28 states in India, covering 15+ sports disciplines from cricket and football to kabaddi and athletics.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-100">
            <img
              src="https://images.unsplash.com/photo-1571019613914-85f342c6a11e?w=700&auto=format&fit=crop"
              alt="Athletes training together"
              className="w-full h-64 object-cover"
              onError={e => { e.target.src = 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=700&auto=format&fit=crop'; }}
            />
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-white border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-10">Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map(v => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="flex gap-4 p-5 rounded-xl border border-slate-100 hover:border-blue-100 hover:bg-blue-50/30 transition-colors">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-800 mb-1">{v.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* How it Works */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-3">How GrowAthlete Works</h2>
        <p className="text-slate-500 text-center mb-10 max-w-xl mx-auto">Four simple steps to unlock your athletic potential.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { step: '01', title: 'Create Your Profile', desc: 'Sign up and build a comprehensive athlete profile with your sport, stats, achievements, and bio.' },
            { step: '02', title: 'Showcase Your Talent', desc: 'Post updates, share videos, and highlight your achievements to attract coaches and scouts.' },
            { step: '03', title: 'Discover Tournaments', desc: 'Browse hundreds of tournaments across India filtered by sport, location, and category.' },
            { step: '04', title: 'Connect & Grow', desc: 'Follow other athletes, join live chat rooms, read news, and build your sports network.' },
          ].map(s => (
            <div key={s.step} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm text-center">
              <div className="text-3xl font-black text-blue-100 mb-3">{s.step}</div>
              <h3 className="font-extrabold text-slate-800 text-sm mb-2">{s.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div className="bg-white border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-10">Meet the Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {team.map(m => (
              <div key={m.name} className="text-center">
                <img src={m.avatar} alt={m.name} className="w-20 h-20 rounded-full object-cover mx-auto mb-3 border-4 border-slate-50 shadow-md" onError={e => { e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop'; }} />
                <h3 className="font-extrabold text-slate-800">{m.name}</h3>
                <p className="text-xs font-bold text-blue-600 mb-1">{m.role}</p>
                <p className="text-xs text-slate-500">{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <Award className="w-10 h-10 text-blue-600 mx-auto mb-4" />
        <h2 className="text-3xl font-extrabold text-slate-900 mb-3">Ready to Grow?</h2>
        <p className="text-slate-500 mb-6 max-w-md mx-auto">Join 50,000+ athletes already on GrowAthlete and take your sports journey to the next level.</p>
        <button onClick={onBack} className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-sm">
          Get Started — It's Free
        </button>
        <div className="flex items-center justify-center gap-2 mt-6 text-xs text-slate-400">
          <Mail className="w-3.5 h-3.5" />
          <span>Questions? Email us at <a href="mailto:hello@growathlete.in" className="text-blue-600 hover:underline">hello@growathlete.in</a></span>
        </div>
      </div>
    </div>
  );
}
