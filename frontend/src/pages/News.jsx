import React, { useState } from 'react';
import { Bookmark, Share2, ExternalLink, X } from 'lucide-react';
import { toast } from '../components/Toast';

export default function News() {
  // Filters state
  const [selectedSport, setSelectedSport] = useState('All');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [tempSport, setTempSport] = useState('All');
  const [tempRegion, setTempRegion] = useState('All');

  // Active reading modal article
  const [activeArticle, setActiveArticle] = useState(null);

  // News Articles state
  const [articles, setArticles] = useState([
    {
      id: 1,
      sport: 'Cricket',
      region: 'National',
      title: 'Indian Cricket Team Dominates West Indies in Thrilling Series Decider',
      snippet: "India's cricketing prowess was on full display as they secured a dominant victory over West Indies in the final match of the series, clinching the championship title. Key performances from Virat Kohli and Jasprit Bumrah sealed the win.",
      content: "The final match at the stadium witnessed an extraordinary exhibition of cricketing mastery. Captain Virat Kohli led from the front with a spectacular century, while Jasprit Bumrah dismantled the opposition batting lineup with a lethal opening spell. The team completed the chase with 5 overs to spare, sparking nationwide celebrations. Analysts praise the team's balance, noting that the young debutants also showed immense composure in pressure situations. The board has announced a cash bonus for the coaching staff and players.",
      source: 'ESPN India',
      date: 'May 22, 2024',
      image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&auto=format&fit=crop',
      saved: false
    },
    {
      id: 2,
      sport: 'Football',
      region: 'West',
      title: 'ISL Final: Mumbai City FC Lifts Trophy After Nail-Biting Clash',
      snippet: 'Mumbai City FC emerged victorious in a dramatic Indian Super League final, defeating rivals ATK Mohun Bagan in a penalty shootout. The intense match showcased exceptional talent and strategic gameplay from both sides.',
      content: "After a grueling 120 minutes of high-octane football that ended in a 2-2 draw, the match went into a tense penalty shootout. Mumbai City FC goalkeeper saved two crucial penalties, while their star striker clinical finish secured the title. This marks Mumbai City FC's second championship title in three years, solidifying their dominance in Indian club football. Over 40,000 fans packed the stadium, creating a vibrant atmosphere that will be remembered for years.",
      source: 'Football Times India',
      date: 'May 20, 2024',
      image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop',
      saved: false
    },
    {
      id: 3,
      sport: 'Athletics',
      region: 'National',
      title: 'National Athletics Championships See New Records Shattered in Sprint Events',
      snippet: 'Young Indian athletes made headlines at the National Athletics Championships, setting new national records in both the 100m and 200m sprints. The future of Indian track and field looks brighter than ever.',
      content: "Under perfect weather conditions, the sprint finals saw unprecedented speed. A 19-year-old sprinter from Kerala broke the long-standing national record in the 100m sprint, clocking a timing of 10.12 seconds. In the 200m category, a Haryana athlete set a new high of 20.45 seconds. Chief Athletics Coach remarked that these timings indicate Olympic qualification potential. The government has promised immediate funding and specialized high-performance coaching in Europe to prepare these sprinters for the international circuit.",
      source: 'Athletics Today',
      date: 'May 18, 2024',
      image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&auto=format&fit=crop',
      saved: false
    },
    {
      id: 4,
      sport: 'Basketball',
      region: 'North',
      title: 'Indian Basketball League Gears Up for Exciting New Season',
      snippet: 'The Indian Basketball League (IBL) announced its schedule for the upcoming season, promising more action, new teams, and enhanced fan engagement. Preparations are in full swing across all franchises.',
      content: "The fifth season of the IBL is slated to expand to 10 teams, introducing franchises from Chennai and Kolkata. The tournament will feature a double round-robin league format followed by playoffs. The inclusion of international players has also been expanded to allow three players per roster, raising the competitive standard. A new broadcasting deal has also been signed to televise matches in prime-time slots, aiming to popularize basketball among youth in the country.",
      source: 'Basket Ball India',
      date: 'May 16, 2024',
      image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&auto=format&fit=crop',
      saved: false
    }
  ]);

  const trendingNews = [
    { title: "Kohli's Century Leads India to Victory", source: "CricketNow", sport: "Cricket" },
    { title: "Mumbai City FC Clinches ISL Title", source: "FootballTimes", sport: "Football" },
    { title: "Neeraj Chopra Breaks Javelin Record", source: "AthleticsWeekly", sport: "Athletics" },
    { title: "PV Sindhu Secures Badminton Gold", source: "BadmintonWorld", sport: "Badminton" }
  ];

  const handleSaveToggle = (id) => {
    setArticles(articles.map(art => {
      if (art.id === id) {
        const newSaved = !art.saved;
        toast(newSaved ? 'Article saved!' : 'Article removed from saved', newSaved ? 'success' : 'info');
        return { ...art, saved: newSaved };
      }
      return art;
    }));
  };

  const handleShare = (article) => {
    const text = `Check out this article: ${article.title}`;
    if (navigator.share) {
      navigator.share({ title: article.title, text });
    } else {
      navigator.clipboard.writeText(text).then(() => toast('Link copied to clipboard!', 'success'));
    }
  };

  const handleApplyFilters = () => {
    setSelectedSport(tempSport);
    setSelectedRegion(tempRegion);
  };

  const handleClearFilters = () => {
    setTempSport('All');
    setTempRegion('All');
    setSelectedSport('All');
    setSelectedRegion('All');
  };

  const handleTrendingClick = (sport) => {
    setTempSport(sport);
    setSelectedSport(sport);
  };

  // Filter logic
  const filteredArticles = articles.filter(art => {
    const matchesSport = selectedSport === 'All' || art.sport === selectedSport;
    const matchesRegion = selectedRegion === 'All' || art.region === selectedRegion;
    return matchesSport && matchesRegion;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (Filters & Trending News) */}
        <aside className="lg:col-span-4 space-y-6">
          
          {/* Filter Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-bold text-slate-800 text-base mb-4">Filter News</h3>
            
            <div className="space-y-4">
              {/* Sport Filter */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">Sport</label>
                <select 
                  value={tempSport}
                  onChange={(e) => setTempSport(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white"
                >
                  <option value="All">Select a Sport</option>
                  <option value="Cricket">Cricket</option>
                  <option value="Football">Football</option>
                  <option value="Athletics">Athletics</option>
                  <option value="Basketball">Basketball</option>
                </select>
              </div>

              {/* Region Filter */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">Region</label>
                <select 
                  value={tempRegion}
                  onChange={(e) => setTempRegion(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white"
                >
                  <option value="All">Select a Region</option>
                  <option value="National">National</option>
                  <option value="North">North India</option>
                  <option value="West">West India</option>
                  <option value="South">South India</option>
                  <option value="East">East India</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <button 
                  onClick={handleApplyFilters}
                  className="flex-1 py-2 bg-primary hover:bg-primary-dark text-xs font-semibold text-white rounded-md transition-colors"
                >
                  Apply Filters
                </button>
                <button 
                  onClick={handleClearFilters}
                  className="px-3 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 rounded-md transition-colors"
                >
                  Clear
                </button>
              </div>

            </div>
          </div>

          {/* Trending News Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-bold text-slate-800 text-base mb-4">Trending News</h3>
            
            <div className="space-y-4">
              {trendingNews.map((item, idx) => (
                <div 
                  key={idx}
                  onClick={() => handleTrendingClick(item.sport)}
                  className="group cursor-pointer pb-3 border-b border-slate-100 last:border-0 last:pb-0"
                >
                  <h4 className="text-sm font-bold text-slate-800 group-hover:text-primary transition-colors leading-tight mb-1">
                    {item.title}
                  </h4>
                  <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400">
                    <span>{item.source}</span>
                    <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-500 font-medium">
                      {item.sport}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </aside>

        {/* Center Column (Latest Sports News stream) */}
        <main className="lg:col-span-8 space-y-6">
          <div className="flex justify-between items-baseline mb-2">
            <h1 className="text-2xl font-extrabold text-slate-900">Latest Sports News</h1>
            {selectedSport !== 'All' && (
              <span className="text-xs bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full font-bold">
                Filtered: {selectedSport}
              </span>
            )}
          </div>

          <div className="space-y-6">
            {filteredArticles.map(article => (
              <article key={article.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
                
                {/* News Image Header */}
                <div className="relative aspect-[21/9] w-full overflow-hidden border-b border-slate-100">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.style.display = 'none'; }}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded text-xs font-bold text-slate-700 shadow-sm border border-slate-200">
                    {article.sport}
                  </div>
                </div>

                {/* Article Info */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900 leading-snug mb-3 hover:text-primary cursor-pointer transition-colors" onClick={() => setActiveArticle(article)}>
                      {article.title}
                    </h2>
                    <p className="text-sm text-slate-500 leading-relaxed mb-4">
                      {article.snippet}
                    </p>
                  </div>

                  {/* Detail Meta */}
                  <div>
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-400 border-b border-slate-100 pb-4 mb-4">
                      <span>Source: {article.source}</span>
                      <span>{article.date}</span>
                    </div>

                    {/* Actions Panel */}
                    <div className="flex items-center justify-between">
                      <div className="flex gap-4">
                        <button 
                          onClick={() => handleSaveToggle(article.id)}
                          className={`flex items-center gap-1.5 text-xs font-bold transition-colors ${
                            article.saved ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'
                          }`}
                        >
                          <Bookmark className={`w-4.5 h-4.5 ${article.saved ? 'fill-blue-100' : ''}`} />
                          <span>{article.saved ? 'Saved' : 'Save'}</span>
                        </button>
                        <button onClick={() => handleShare(article)} className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors">
                          <Share2 className="w-4.5 h-4.5" />
                          <span>Share</span>
                        </button>
                      </div>

                      <button 
                        onClick={() => setActiveArticle(article)}
                        className="px-4 py-2 bg-primary hover:bg-primary-dark font-bold text-xs text-white rounded-md transition-colors"
                      >
                        Read More
                      </button>
                    </div>
                  </div>

                </div>

              </article>
            ))}

            {filteredArticles.length === 0 && (
              <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-400">
                No articles matches your filter combinations. Click "Clear" to reset filters.
              </div>
            )}
          </div>

        </main>
      </div>

      {/* Read More Article Modal Dialog */}
      {activeArticle && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200">
            <div className="relative aspect-[16/7] w-full bg-slate-100 flex-shrink-0">
              <img src={activeArticle.image} alt={activeArticle.title} className="w-full h-full object-cover" />
              <button 
                onClick={() => setActiveArticle(null)}
                className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur rounded-full text-slate-700 hover:text-slate-900 border border-slate-200 shadow"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-4">
              <span className="text-[10px] uppercase font-extrabold tracking-widest text-primary bg-blue-50 px-2 py-0.5 rounded">
                {activeArticle.sport} • {activeArticle.region}
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
                {activeArticle.title}
              </h2>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-400 border-y border-slate-100 py-2">
                <span>Source: {activeArticle.source}</span>
                <span>{activeArticle.date}</span>
              </div>
              <p className="text-sm font-semibold text-slate-600 leading-relaxed italic bg-slate-50 p-3 rounded-lg border-l-4 border-primary">
                {activeArticle.snippet}
              </p>
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                {activeArticle.content}
              </p>
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button 
                onClick={() => setActiveArticle(null)}
                className="px-5 py-2 bg-slate-200 hover:bg-slate-300 font-semibold text-sm text-slate-700 rounded-lg transition-colors"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
