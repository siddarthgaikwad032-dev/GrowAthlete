import React, { useState } from 'react';
import { ArrowLeft, Search, Bookmark, Share2, X, Clock, User } from 'lucide-react';
import { toast } from '../components/Toast';
import { useLocalStorage } from '../hooks/useLocalStorage';

const ALL_ARTICLES = [
  { id: 1, sport: 'Cricket', title: 'The Mental Game: How India\'s Top Cricketers Train Their Minds', author: 'Priya Sharma', date: 'July 10, 2024', readTime: '6 min', image: 'https://images.unsplash.com/photo-1531415080290-bc9b899dd8ea?w=800&auto=format&fit=crop', excerpt: 'Beyond physical training, mental toughness separates good players from great ones. We explore the psychological training routines of India\'s cricket elite.', content: 'Mental conditioning has become a cornerstone of elite cricket training in India. Sports psychologists now work alongside batting and bowling coaches in every IPL franchise. Techniques range from mindfulness meditation to visualisation exercises before match day. The Indian cricket board has invested heavily in this area, establishing dedicated mental performance centres in three cities. Coaches report that players who embrace mental training show 40% better performance under pressure situations. Key techniques include pre-match routines, breathing exercises during play, and debriefing sessions after losses to reframe setbacks as learning opportunities.' },
  { id: 2, sport: 'Football', title: '5 Drills Every Young Footballer Must Master', author: 'Rahul Nair', date: 'July 8, 2024', readTime: '5 min', image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop', excerpt: 'From ball control to positioning, these five drills will transform any young footballer\'s game. Perfect for ages 12-18.', content: '1. Rondo (Keep-Away): The Spanish drill used by Barcelona\'s La Masia academy. Groups of 5-7 players in a circle pass quickly while 1-2 defenders try to intercept. Develops quick thinking and first touch.\n\n2. Cone Dribbling Slalom: Set 10 cones 1 metre apart. Dribble through at increasing speeds. Focus on keeping the ball close and using both feet.\n\n3. Wall Passing: Find a flat wall and practice one-touch and two-touch passes. 200 passes daily for 3 months will dramatically improve your touch.\n\n4. Shooting on the Turn: Receive a ball with your back to goal, turn quickly, and shoot. Essential for strikers and attacking midfielders.\n\n5. Defensive Shadowing: Pair up — one attacks, one defends without tackling. Focus only on positioning, body shape, and cutting off passing lanes.' },
  { id: 3, sport: 'Athletics', title: 'Running Economy: Why Your Form Matters More Than Your Speed', author: 'Dr. Anika Singh', date: 'July 6, 2024', readTime: '7 min', image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&auto=format&fit=crop', excerpt: 'Research shows that improving running form can cut your marathon time by 15 minutes without changing your training volume. Here\'s how.', content: 'Running economy refers to the energy cost of running at a given pace. Athletes with better running economy use less oxygen and less energy at the same speed. Key form corrections that improve economy include: maintaining a forward lean of 5-10 degrees from the ankles (not the waist), landing with your foot under your hips (not in front), keeping arm swing compact and driving elbows backward, and maintaining a cadence of 170-180 steps per minute. Research from the Sports Science Institute of India found that correcting these four elements alone reduced the energy cost of running by an average of 8%, equivalent to approximately 12-15 minutes in a half marathon.' },
  { id: 4, sport: 'Badminton', title: 'PV Sindhu\'s Training Secrets: Inside the Gopichand Academy', author: 'Sports Desk', date: 'July 4, 2024', readTime: '4 min', image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&auto=format&fit=crop', excerpt: 'An exclusive look at the rigorous daily training schedule at the Pullela Gopichand Badminton Academy in Hyderabad.', content: 'The academy opens at 4:30 AM. By 5 AM, players are already on the courts for their first session of multi-shuttle drills. The training philosophy is built on three pillars: technical perfection, physical conditioning, and match simulation. Students train 6-7 hours daily, six days a week. The academy now has 15 permanent courts, a fully equipped gym, and a physiotherapy centre. Gopichand\'s coaching methodology emphasises footwork as the foundation of all badminton — players spend 30% of court time on footwork drills alone. Nutrition is strictly monitored, with a full-time dietitian managing meal plans for all residential students.' },
  { id: 5, sport: 'Basketball', title: 'The Rise of Indian Basketball: Is the NBA Ready for India?', author: 'Vikram Tiwari', date: 'July 2, 2024', readTime: '5 min', image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&auto=format&fit=crop', excerpt: 'With the NBA opening academies in India and homegrown talent rising, Indian basketball is having its moment. But is the infrastructure keeping pace?', content: 'The NBA India Academy, established in 2019, has already produced its first crop of internationally competitive players. Three Indian-born players have now signed with European professional leagues, an unprecedented milestone. The Basketball Federation of India has launched a national grassroots programme targeting 10,000 new players by 2026. However, challenges remain: India has only 3 world-standard indoor courts per million people, compared to 47 in the United States. Corporate investment is growing, with three major FMCG brands now sponsoring the Indian Basketball League. The league will expand from 8 to 12 teams in the 2025 season.' },
  { id: 6, sport: 'Tennis', title: 'Developing a Net Game: Forgotten Skill of Modern Tennis', author: 'Coach Arun Das', date: 'June 30, 2024', readTime: '6 min', image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800&auto=format&fit=crop', excerpt: 'As baseline play dominates the modern game, net skills have become a secret weapon for players who master them. Here\'s why you should start volleying more.', content: 'Statistics from the ATP Tour show that points won at the net have a success rate of 72% — far higher than the 54% from the baseline. Yet most recreational and junior players neglect net approach shots and volleys entirely. The reason: modern coaching has over-indexed on groundstroke consistency, influenced by the extreme baseline play popularised by Djokovic and Nadal. However, coaches like Roger Federer\'s Severin Luthi argue that a complete game still requires net proficiency. Volley drills to incorporate into training: crosscourt volley exchanges, half-volley pick-ups, and approach-volley combinations from mid-court. Adding just 20 minutes of net practice per session can transform your doubles game within 3 months.' },
];

const SPORTS = ['All', 'Cricket', 'Football', 'Athletics', 'Badminton', 'Basketball', 'Tennis'];

export default function Articles({ onBack }) {
  const [search, setSearch] = useState('');
  const [sport, setSport] = useState('All');
  const [active, setActive] = useState(null);
  const [saved, setSaved] = useLocalStorage('ga_saved_articles', []);

  const filtered = ALL_ARTICLES.filter(a => {
    const matchSport = sport === 'All' || a.sport === sport;
    const matchSearch = !search || a.title.toLowerCase().includes(search.toLowerCase()) || a.author.toLowerCase().includes(search.toLowerCase());
    return matchSport && matchSearch;
  });

  const isSaved = (id) => saved.includes(id);

  const toggleSave = (id) => {
    setSaved(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    toast(isSaved(id) ? 'Article removed from saved' : 'Article saved!');
  };

  const handleShare = (article) => {
    const text = `Check out: ${article.title}`;
    if (navigator.share) {
      navigator.share({ title: article.title, text });
    } else {
      navigator.clipboard.writeText(text).then(() => toast('Link copied to clipboard!'));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <button onClick={onBack} className="flex items-center gap-2 text-sm font-semibold text-blue-200 hover:text-white transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <h1 className="text-4xl font-extrabold mb-2">Sports Articles</h1>
          <p className="text-blue-200">Expert insights, training tips, and sports analysis for Indian athletes.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search & filter bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={sport}
            onChange={e => setSport(e.target.value)}
            className="px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {SPORTS.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <Search className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="font-semibold">No articles match your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(a => (
              <div key={a.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
                <div className="aspect-[16/9] overflow-hidden">
                  <img src={a.image} alt={a.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" onError={e => { e.target.src = 'https://images.unsplash.com/photo-1571019613914-85f342c6a11e?w=800&auto=format&fit=crop'; }} />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{a.sport}</span>
                    <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                      <Clock className="w-3 h-3" /> {a.readTime}
                    </div>
                  </div>
                  <h2 className="font-extrabold text-slate-900 text-sm leading-snug mb-2 cursor-pointer hover:text-blue-600 transition-colors flex-1" onClick={() => setActive(a)}>
                    {a.title}
                  </h2>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4 line-clamp-2">{a.excerpt}</p>
                  <div className="flex items-center justify-between border-t border-slate-100 pt-3 mt-auto">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <User className="w-3.5 h-3.5" /> <span className="font-semibold">{a.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => toggleSave(a.id)} className={`p-1.5 rounded-lg transition-colors ${isSaved(a.id) ? 'text-blue-600 bg-blue-50' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}>
                        <Bookmark className={`w-4 h-4 ${isSaved(a.id) ? 'fill-blue-200' : ''}`} />
                      </button>
                      <button onClick={() => handleShare(a)} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors">
                        <Share2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => setActive(a)} className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors">
                        Read
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Article Modal */}
      {active && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={e => e.target === e.currentTarget && setActive(null)}>
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl flex flex-col max-h-[90vh]">
            <div className="relative flex-shrink-0">
              <img src={active.image} alt={active.title} className="w-full h-48 object-cover rounded-t-2xl" onError={e => { e.target.src = 'https://images.unsplash.com/photo-1571019613914-85f342c6a11e?w=800&auto=format&fit=crop'; }} />
              <button onClick={() => setActive(null)} className="absolute top-3 right-3 p-2 bg-white/90 rounded-full text-slate-700 hover:text-slate-900 shadow border border-slate-200">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded mb-3 inline-block">{active.sport}</span>
              <h2 className="text-2xl font-extrabold text-slate-900 leading-tight mb-2">{active.title}</h2>
              <div className="flex items-center gap-4 text-xs text-slate-400 font-medium mb-4 border-b border-slate-100 pb-4">
                <span className="flex items-center gap-1"><User className="w-3 h-3" />{active.author}</span>
                <span>{active.date}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{active.readTime} read</span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed italic mb-4 bg-slate-50 p-3 rounded-lg border-l-4 border-blue-500">{active.excerpt}</p>
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">{active.content}</p>
            </div>
            <div className="px-6 py-4 border-t border-slate-100 flex gap-2 flex-shrink-0">
              <button onClick={() => { toggleSave(active.id); }} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-colors border ${isSaved(active.id) ? 'border-blue-200 text-blue-600 bg-blue-50' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                <Bookmark className={`w-4 h-4 ${isSaved(active.id) ? 'fill-blue-200' : ''}`} /> {isSaved(active.id) ? 'Saved' : 'Save'}
              </button>
              <button onClick={() => handleShare(active)} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-slate-600 border border-slate-200 hover:bg-slate-50 transition-colors">
                <Share2 className="w-4 h-4" /> Share
              </button>
              <button onClick={() => setActive(null)} className="ml-auto px-5 py-2 bg-slate-100 hover:bg-slate-200 text-sm font-semibold text-slate-700 rounded-lg transition-colors">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
