import React, { useState } from 'react';
import { ArrowLeft, Search, Clock, User, X, Share2, Bookmark, Tag } from 'lucide-react';
import { toast } from '../components/Toast';
import { useLocalStorage } from '../hooks/useLocalStorage';

const POSTS = [
  { id: 1, category: 'Training', title: 'How I Went from State Level to National: My 3-Year Journey', author: 'Ethan Foster', authorRole: 'Basketball Player', date: 'July 12, 2024', readTime: '8 min', image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=900&auto=format&fit=crop', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop', excerpt: 'Three years ago I was playing district-level basketball with no realistic path to national competition. Today I\'m a national-level player. Here\'s exactly what changed.', content: 'The turning point wasn\'t a single dramatic moment — it was a series of small, deliberate decisions made over 36 months.\n\nYear One: Foundation\nI stopped training to impress others and started training to improve myself. I hired a personal trainer for just 2 sessions per week and focused those sessions entirely on my weaknesses — my left hand and defensive footwork. I shot 300 free throws every single morning, alone, before school.\n\nYear Two: Network\nI started attending every open tryout and tournament I could find, even ones I had no realistic chance of making. Each one taught me something. More importantly, I met coaches and players who became mentors. Sports is as much about who you know as what you know.\n\nYear Three: Mindset\nI finally understood that the gap between where I was and where I wanted to be was entirely mental, not physical. I worked with a sports psychologist for 6 months. I learned to perform under pressure, to use mistakes as information rather than defeat.\n\nThe result: selected for the state squad in my third year, and national trials the year after.\n\nIf you\'re reading this and feeling stuck at your current level, know that the ceiling you see isn\'t real. It\'s built from your current beliefs, not your actual limits.' },
  { id: 2, category: 'Nutrition', title: 'The Diet Plan That Helped Me Gain 8kg of Muscle in 4 Months', author: 'Priya Singh', authorRole: 'Swimmer', date: 'July 9, 2024', readTime: '6 min', image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=900&auto=format&fit=crop', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop', excerpt: 'As a competitive swimmer trying to add lean muscle without sacrificing speed in water, I tried dozens of approaches. This is what actually worked.', content: 'Before I share the specifics, let me be clear: this was a supervised programme developed with a registered sports dietitian. Do not attempt aggressive dietary changes without professional guidance.\n\nThe Core Principles\n1. Caloric surplus of 300-400 calories above maintenance — enough to build muscle without excessive fat gain.\n2. Protein at 2.2g per kg of bodyweight, distributed across 5 meals.\n3. Carbohydrate timing — highest carb intake around training sessions.\n4. Sleep as a nutritional tool — 8-9 hours minimum, non-negotiable.\n\nSample Day:\n- 6 AM: Oats with banana, 3 boiled eggs, 250ml milk\n- 9 AM: Greek yoghurt with mixed berries\n- 12 PM: 200g chicken breast, 1 cup brown rice, salad\n- Pre-swim: Banana + peanut butter on wholegrain bread\n- Post-swim: Whey protein + 300ml milk within 30 minutes\n- Dinner: 200g paneer or fish, vegetables, 1 chapati\n\nThe key insight: consistency trumps perfection. I hit 90% of my targets most days rather than 100% some days and failing others. Four months later, I was 8kg heavier with a faster 100m butterfly time than when I started.' },
  { id: 3, category: 'Mental Health', title: 'Dealing with Injury: What Nobody Tells Young Athletes', author: 'Vikram Tiwari', authorRole: 'Football Player', date: 'July 6, 2024', readTime: '7 min', image: 'https://images.unsplash.com/photo-1571019613914-85f342c6a11e?w=900&auto=format&fit=crop', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop', excerpt: 'When I tore my ACL at 19, I lost more than my season. I nearly lost my love for the game. Here\'s how I got both back.', content: 'Nobody in sports talks enough about the psychological dimensions of injury recovery. We discuss the physical — the surgery, the physiotherapy, the return-to-play protocols. But the mental journey is often harder than the physical one.\n\nThe day I got my MRI results confirming an ACL tear was one of the lowest of my life. I was 19, starting to attract attention from ISL scouts, and suddenly facing 9-12 months away from the game.\n\nThe first month: denial and grief. I kept turning up to training and watching, which was both comforting and agonising. My physio eventually encouraged me to stay away for the first 4 weeks and focus entirely on the early rehabilitation process.\n\nMonths 2-5: the grind. This is where most injured athletes either grow mentally or fall apart. The progress is invisible to everyone except you and your physio. You\'re doing leg presses in a gym while your teammates are playing matches. I channelled my frustration into studying the game — I watched 3-4 matches per week and kept a tactical journal.\n\nMonths 6-9: fear of re-injury. This is the hardest phase that nobody warns you about. The physical recovery is largely complete but your mind holds you back. Working with a sports psychologist in this phase was transformative. She taught me to distinguish between protective pain (stop) and fear-based hesitation (continue safely).\n\nMonth 10: return to play. My first training session back, I cried in the car before going in. And again afterwards, from relief.\n\nIf you\'re currently injured: it will end. Use the time to become a smarter athlete, a better student of the game, and a more resilient person.' },
  { id: 4, category: 'Equipment', title: 'A Realistic Guide to Sports Gear on an Indian Student Budget', author: 'Ananya Mehta', authorRole: 'Badminton Player', date: 'July 3, 2024', readTime: '5 min', image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=900&auto=format&fit=crop', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&auto=format&fit=crop', excerpt: 'You don\'t need to spend ₹50,000 on equipment to be a serious athlete. Here\'s how to invest smartly on ₹8,000-15,000 total.', content: 'The sports equipment industry in India has a marketing problem: it convinces amateur and developing athletes that professional equipment equals professional performance. It doesn\'t.\n\nHere\'s what actually matters:\n\nBadminton Budget: ₹8,000-12,000\n- Racquet: Li-Ning Turbo X 80 or Yonex Arcsaber (₹2,500-4,000). Avoid anything below ₹2,000 — the frame flex and string quality suffer significantly.\n- String: Get racquet re-strung by a professional every 3-4 months (₹400-600). Playing with worn strings is like driving on flat tyres.\n- Footwear: THIS is where you should not compromise. Yonex SHB-65 or Victor SH-A920 (₹3,500-5,000). Court movement injuries are career-ending. Buy real badminton shoes.\n- Shuttles: Mavis 350 (nylon) for practice, feather for tournaments. Budget ₹200/week for practice shuttles.\n\nGeneral Principle: Spend most on what touches your body (shoes, grip) and less on what you carry (bags, racquet cases). The professional-grade ₹15,000 racquet makes a 2% difference. The right shoes make a 20% difference in your agility and a 100% difference in your injury risk.' },
];

const CATEGORIES = ['All', 'Training', 'Nutrition', 'Mental Health', 'Equipment'];

export default function Blog({ onBack }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [active, setActive] = useState(null);
  const [saved, setSaved] = useLocalStorage('ga_saved_blogs', []);

  const filtered = POSTS.filter(p => {
    const matchCat = category === 'All' || p.category === category;
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.author.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const isSaved = (id) => saved.includes(id);
  const toggleSave = (id) => {
    setSaved(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    toast(isSaved(id) ? 'Removed from saved' : 'Blog post saved!');
  };
  const handleShare = (p) => {
    if (navigator.share) navigator.share({ title: p.title, text: p.excerpt });
    else navigator.clipboard.writeText(p.title).then(() => toast('Copied to clipboard!'));
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <div className="bg-gradient-to-r from-indigo-700 to-purple-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <button onClick={onBack} className="flex items-center gap-2 text-sm font-semibold text-indigo-200 hover:text-white transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <h1 className="text-4xl font-extrabold mb-2">GrowAthlete Blog</h1>
          <p className="text-indigo-200">Athlete stories, training guides, and life lessons from India's sports community.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Search blog posts..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <select value={category} onChange={e => setCategory(e.target.value)} className="px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-slate-400"><p className="font-semibold">No posts match your search.</p></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map(p => (
              <div key={p.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
                <div className="aspect-[16/7] overflow-hidden cursor-pointer" onClick={() => setActive(p)}>
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" onError={e => { e.target.src = 'https://images.unsplash.com/photo-1571019613914-85f342c6a11e?w=800&auto=format&fit=crop'; }} />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                      <Tag className="w-2.5 h-2.5" />{p.category}
                    </span>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1"><Clock className="w-3 h-3" />{p.readTime}</span>
                  </div>
                  <h2 className="font-extrabold text-slate-900 text-base leading-snug mb-2 cursor-pointer hover:text-indigo-700 transition-colors flex-1" onClick={() => setActive(p)}>{p.title}</h2>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4 line-clamp-2">{p.excerpt}</p>
                  <div className="flex items-center justify-between border-t border-slate-100 pt-3 mt-auto">
                    <div className="flex items-center gap-2">
                      <img src={p.avatar} alt={p.author} className="w-7 h-7 rounded-full object-cover border border-slate-200" onError={e => { e.target.src = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop'; }} />
                      <div>
                        <p className="text-[11px] font-bold text-slate-700">{p.author}</p>
                        <p className="text-[10px] text-slate-400">{p.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => toggleSave(p.id)} className={`p-1.5 rounded-lg transition-colors ${isSaved(p.id) ? 'text-indigo-600 bg-indigo-50' : 'text-slate-400 hover:bg-slate-50'}`}><Bookmark className={`w-4 h-4 ${isSaved(p.id) ? 'fill-indigo-200' : ''}`} /></button>
                      <button onClick={() => handleShare(p)} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-50 transition-colors"><Share2 className="w-4 h-4" /></button>
                      <button onClick={() => setActive(p)} className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg transition-colors">Read</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {active && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={e => e.target === e.currentTarget && setActive(null)}>
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl flex flex-col max-h-[90vh]">
            <div className="relative flex-shrink-0">
              <img src={active.image} alt={active.title} className="w-full h-48 object-cover rounded-t-2xl" onError={e => { e.target.src = 'https://images.unsplash.com/photo-1571019613914-85f342c6a11e?w=800&auto=format&fit=crop'; }} />
              <button onClick={() => setActive(null)} className="absolute top-3 right-3 p-2 bg-white/90 rounded-full shadow border border-slate-200 text-slate-700 hover:text-slate-900"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-6 overflow-y-auto">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded mb-3 inline-block">{active.category}</span>
              <h2 className="text-2xl font-extrabold text-slate-900 leading-tight mb-3">{active.title}</h2>
              <div className="flex items-center gap-3 mb-4 border-b border-slate-100 pb-4">
                <img src={active.avatar} alt={active.author} className="w-8 h-8 rounded-full object-cover border border-slate-200" onError={e => { e.target.src = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop'; }} />
                <div>
                  <p className="text-xs font-bold text-slate-700">{active.author} <span className="text-slate-400 font-normal">· {active.authorRole}</span></p>
                  <p className="text-[10px] text-slate-400">{active.date} · {active.readTime} read</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed italic mb-4 bg-slate-50 p-3 rounded-lg border-l-4 border-indigo-500">{active.excerpt}</p>
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">{active.content}</p>
            </div>
            <div className="px-6 py-4 border-t border-slate-100 flex gap-2 flex-shrink-0">
              <button onClick={() => toggleSave(active.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold border transition-colors ${isSaved(active.id) ? 'border-indigo-200 text-indigo-600 bg-indigo-50' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}><Bookmark className={`w-4 h-4 ${isSaved(active.id) ? 'fill-indigo-200' : ''}`} />{isSaved(active.id) ? 'Saved' : 'Save'}</button>
              <button onClick={() => handleShare(active)} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-slate-600 border border-slate-200 hover:bg-slate-50 transition-colors"><Share2 className="w-4 h-4" />Share</button>
              <button onClick={() => setActive(null)} className="ml-auto px-5 py-2 bg-slate-100 hover:bg-slate-200 text-sm font-semibold text-slate-700 rounded-lg transition-colors">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
