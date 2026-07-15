import React, { useState, useEffect } from 'react';
import { Search, Calendar, MapPin, Trophy, Star, CheckCircle, X } from 'lucide-react';
import { toast } from '../components/Toast';

export default function Tournaments({ user }) {
  // Tournaments list data
  const initialTournaments = [
    {
      id: 1,
      title: 'All India Football Championship',
      sport: 'Football',
      location: 'Mumbai, Maharashtra',
      city: 'Mumbai',
      dates: 'Oct 20-25, 2024',
      status: 'Open', // Open, Upcoming, Closed
      category: 'Open',
      image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=500&auto=format&fit=crop'
    },
    {
      id: 2,
      title: 'National Cricket League U19',
      sport: 'Cricket',
      location: 'Delhi, NCR',
      city: 'Delhi',
      dates: 'Nov 10-17, 2024',
      status: 'Open',
      category: 'U19',
      image: 'https://images.unsplash.com/photo-1531415080290-bc9b899dd8ea?w=500&auto=format&fit=crop'
    },
    {
      id: 3,
      title: 'Bengaluru Badminton Open',
      sport: 'Badminton',
      location: 'Bengaluru, Karnataka',
      city: 'Bengaluru',
      dates: 'Dec 01-05, 2024',
      status: 'Upcoming',
      category: 'Open',
      image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500&auto=format&fit=crop'
    },
    {
      id: 4,
      title: 'Chennai Athletics Meet',
      sport: 'Athletics',
      location: 'Chennai, Tamil Nadu',
      city: 'Chennai',
      dates: 'Jan 15-18, 2025',
      status: 'Upcoming',
      category: 'Open',
      image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=500&auto=format&fit=crop'
    },
    {
      id: 5,
      title: 'Pune Basketball Challenge',
      sport: 'Basketball',
      location: 'Pune, Maharashtra',
      city: 'Pune',
      dates: 'Feb 01-07, 2025',
      status: 'Upcoming',
      category: 'U19',
      image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500&auto=format&fit=crop'
    },
    {
      id: 6,
      title: 'Hyderabad Tennis Masters',
      sport: 'Tennis',
      location: 'Hyderabad, Telangana',
      city: 'Hyderabad',
      dates: 'Mar 01-08, 2025',
      status: 'Closed',
      category: 'Elite',
      image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=500&auto=format&fit=crop'
    },
    {
      id: 7,
      title: 'Kolkata Marathon 2024',
      sport: 'Running',
      location: 'Kolkata, West Bengal',
      city: 'Kolkata',
      dates: 'Nov 20, 2024',
      status: 'Open',
      category: 'Open',
      image: 'https://images.unsplash.com/photo-1502224562085-639556652f33?w=500&auto=format&fit=crop'
    },
    {
      id: 8,
      title: 'Goa Beach Volleyball Cup',
      sport: 'Volleyball',
      location: 'Goa',
      city: 'Goa',
      dates: 'Dec 10-12, 2024',
      status: 'Open',
      category: 'Open',
      image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=500&auto=format&fit=crop'
    },
    {
      id: 9,
      title: 'Jaipur Kabaddi League',
      sport: 'Kabaddi',
      location: 'Jaipur, Rajasthan',
      city: 'Jaipur',
      dates: 'Jan 05-10, 2025',
      status: 'Upcoming',
      category: 'U19',
      image: 'https://images.unsplash.com/photo-1605296867304-46d5465a25f1?w=500&auto=format&fit=crop'
    }
  ];

  // Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [sportFilter, setSportFilter] = useState('All');
  const [locationFilter, setLocationFilter] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Date (Upcoming)');

  // Filter application triggers (temp values for forms)
  const [appliedSearch, setAppliedSearch] = useState('');
  const [appliedSport, setAppliedSport] = useState('All');
  const [appliedLocation, setAppliedLocation] = useState('');
  const [appliedCategory, setAppliedCategory] = useState('All');
  const [selectedMapCity, setSelectedMapCity] = useState(null);

  // Registration Modal State
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [regForm, setRegForm] = useState({ 
    name: user?.name || 'Ethan Foster', 
    email: user?.email || 'ethan.foster@growathlete.com', 
    phone: '', 
    category: 'Open' 
  });
  const [regSuccess, setRegSuccess] = useState(false);

  // Update form if user changes
  useEffect(() => {
    if (user) {
      setRegForm(prev => ({ ...prev, name: user.name, email: user.email }));
    }
  }, [user]);

  // Handle filter submissions
  const handleApplyFilters = (e) => {
    if (e) e.preventDefault();
    setAppliedSearch(searchTerm);
    setAppliedSport(sportFilter);
    setAppliedLocation(locationFilter);
    setAppliedCategory(categoryFilter);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSportFilter('All');
    setLocationFilter('');
    setStartDate('');
    setEndDate('');
    setCategoryFilter('All');
    setSortBy('Date (Upcoming)');
    setAppliedSearch('');
    setAppliedSport('All');
    setAppliedLocation('');
    setAppliedCategory('All');
    setSelectedMapCity(null);
  };

  // Filter logic
  const filteredTournaments = initialTournaments.filter(tour => {
    const matchesSearch = appliedSearch === '' || tour.title.toLowerCase().includes(appliedSearch.toLowerCase());
    const matchesSport = appliedSport === 'All' || tour.sport === appliedSport;
    const matchesLocation = appliedLocation === '' || 
                            tour.location.toLowerCase().includes(appliedLocation.toLowerCase()) || 
                            tour.city.toLowerCase().includes(appliedLocation.toLowerCase());
    const matchesCategory = appliedCategory === 'All' || tour.category === appliedCategory;
    const matchesMapCity = !selectedMapCity || tour.city.toLowerCase() === selectedMapCity.toLowerCase();
    
    return matchesSearch && matchesSport && matchesLocation && matchesCategory && matchesMapCity;
  }).sort((a, b) => {
    if (sortBy === 'Date (Upcoming)') {
      // Keep static indices or sorting logic
      return a.id - b.id;
    } else if (sortBy === 'Name (A-Z)') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  // Map Pins Coordinates
  const mapPins = [
    { name: 'DELHI', top: '32%', left: '46%', align: 'left' },
    { name: 'MUMBAI', top: '56%', left: '33%', align: 'right' },
    { name: 'PUNE', top: '63%', left: '36%', align: 'left' },
    { name: 'GOA', top: '74%', left: '37%', align: 'right' },
    { name: 'BENGALURU', top: '79%', left: '43%', align: 'left' },
    { name: 'CHENNAI', top: '80%', left: '48%', align: 'right' },
    { name: 'KOLKATA', top: '48%', left: '68%', align: 'left' },
    { name: 'JAIPUR', top: '38%', left: '39%', align: 'right' }
  ];

  // Handle map pin selection
  const handlePinClick = (cityName) => {
    if (selectedMapCity === cityName) {
      setSelectedMapCity(null); // Deselect
    } else {
      setSelectedMapCity(cityName);
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    
    // Persist registration to local storage
    const registrations = JSON.parse(localStorage.getItem('ga_tournament_registrations') || '[]');
    registrations.push({
      tournamentId: selectedTournament.id,
      tournamentTitle: selectedTournament.title,
      date: new Date().toISOString(),
      ...regForm
    });
    localStorage.setItem('ga_tournament_registrations', JSON.stringify(registrations));
    
    setRegSuccess(true);
    toast(`Registered for ${selectedTournament.title}!`, 'success');
    
    setTimeout(() => {
      setRegSuccess(false);
      setSelectedTournament(null);
    }, 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (Filter Sidebar) */}
        <aside className="lg:col-span-3">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-xl font-extrabold text-slate-800 mb-6">Filter Tournaments</h2>

            <form onSubmit={handleApplyFilters} className="space-y-5">
              
              {/* Search tournaments */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  placeholder="Search tournaments..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white"
                />
              </div>

              {/* Sport Dropdown */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">Sport</label>
                <select 
                  value={sportFilter}
                  onChange={(e) => setSportFilter(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white"
                >
                  <option value="All">Select a sport</option>
                  <option value="Football">Football</option>
                  <option value="Cricket">Cricket</option>
                  <option value="Badminton">Badminton</option>
                  <option value="Athletics">Athletics</option>
                  <option value="Basketball">Basketball</option>
                  <option value="Tennis">Tennis</option>
                  <option value="Running">Running</option>
                  <option value="Volleyball">Volleyball</option>
                  <option value="Kabaddi">Kabaddi</option>
                </select>
              </div>

              {/* Location Input */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">Location</label>
                <input 
                  type="text" 
                  placeholder="e.g., Mumbai, Delhi" 
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white"
                />
              </div>

              {/* Date Range Inputs */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">Date Range</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="text" 
                    placeholder="Start Date" 
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white text-center"
                  />
                  <span className="text-slate-400">-</span>
                  <input 
                    type="text" 
                    placeholder="End Date" 
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white text-center"
                  />
                </div>
              </div>

              {/* Category Dropdown */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">Category</label>
                <select 
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white"
                >
                  <option value="All">Select category</option>
                  <option value="Open">Open</option>
                  <option value="U19">U-19</option>
                  <option value="Elite">Elite</option>
                </select>
              </div>

              {/* Sort By Dropdown */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">Sort By</label>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white"
                >
                  <option value="Date (Upcoming)">Date (Upcoming)</option>
                  <option value="Name (A-Z)">Name (A-Z)</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="space-y-2.5 pt-2">
                <button 
                  type="submit"
                  className="w-full py-2.5 bg-primary hover:bg-primary-dark font-semibold text-sm text-white rounded-lg transition-colors shadow-sm"
                >
                  Apply Filters
                </button>
                <button 
                  type="button"
                  onClick={handleClearFilters}
                  className="w-full py-2.5 bg-white border border-slate-200 hover:bg-slate-50 font-semibold text-sm text-slate-700 rounded-lg transition-colors"
                >
                  Clear Filters
                </button>
              </div>

            </form>
          </div>

          {/* My Registrations Panel */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm mt-8">
            <h2 className="text-xl font-extrabold text-slate-800 mb-4">My Registrations</h2>
            <div className="space-y-3">
              {(() => {
                const regs = JSON.parse(localStorage.getItem('ga_tournament_registrations') || '[]');
                if (regs.length === 0) {
                  return <p className="text-sm text-slate-400">You haven't registered for any tournaments yet.</p>;
                }
                return regs.map((reg, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-100 rounded-lg p-3">
                    <h4 className="font-bold text-slate-800 text-sm">{reg.tournamentTitle}</h4>
                    <div className="text-xs text-slate-500 mt-1 flex justify-between">
                      <span>{reg.category} Category</span>
                      <span>{new Date(reg.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                ));
              })()}
            </div>
          </div>
        </aside>

        {/* Right Column (Map & Card Grid) */}
        <main className="lg:col-span-9 space-y-8">
          
          {/* Map Section */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-extrabold text-slate-800 text-lg mb-4">Tournament Locations</h3>
            
            {/* Map Container */}
            <div className="relative aspect-[21/9] w-full bg-slate-950 rounded-xl overflow-hidden border border-slate-900 select-none">
              
              {/* SVG Dotted / Outline of India Map */}
              <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" viewBox="0 0 800 450" fill="none">
                {/* Simplified Vector representation of India map border for decoration */}
                <path d="M400,50 L420,70 L430,100 L440,110 L480,120 L500,150 L520,170 L530,200 L560,205 L580,220 L570,240 L530,250 L500,260 L460,280 L440,310 L430,340 L410,380 L398,420 L385,380 L380,330 L350,310 L340,290 L320,270 L280,260 L270,240 L285,220 L290,200 L260,195 L270,180 L290,170 L300,150 L330,140 L350,130 L360,100 L380,80 Z" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3"/>
                {/* Visual grid background */}
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>

              {/* Glowing radar pulses at key locations */}
              <div className="absolute top-[32%] left-[46%] w-3 h-3 bg-red-500 rounded-full animate-ping opacity-75" />
              <div className="absolute top-[56%] left-[33%] w-3 h-3 bg-red-500 rounded-full animate-ping opacity-75" />
              <div className="absolute top-[79%] left-[43%] w-3 h-3 bg-red-500 rounded-full animate-ping opacity-75" />

              {/* Map Pins */}
              {mapPins.map((pin) => {
                const isActive = selectedMapCity?.toLowerCase() === pin.name.toLowerCase();
                return (
                  <button
                    key={pin.name}
                    onClick={() => handlePinClick(pin.name)}
                    style={{ top: pin.top, left: pin.left }}
                    className={`absolute flex items-center -translate-x-1/2 -translate-y-1/2 z-10 transition-all ${
                      isActive ? 'scale-110' : 'hover:scale-105'
                    }`}
                  >
                    {/* Location Pin Icon */}
                    <div className="relative flex items-center group">
                      
                      {/* Label tooltip */}
                      <span className={`absolute bg-white text-[9px] font-black text-slate-800 px-1.5 py-0.5 rounded shadow border border-slate-300 pointer-events-none transition-all ${
                        pin.align === 'left' ? 'right-4 mr-0.5' : 'left-4 ml-0.5'
                      } ${isActive ? 'bg-amber-100 border-amber-400 scale-105' : ''}`}>
                        {pin.name}
                      </span>
                      
                      {/* Red Pin Dot */}
                      <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center border-2 border-white shadow-md transition-all ${
                        isActive ? 'bg-amber-500 scale-125' : 'bg-red-500 group-hover:bg-red-600'
                      }`} />
                    </div>
                  </button>
                );
              })}

              {/* Help tip text overlay bottom right */}
              <div className="absolute bottom-3 right-4 bg-slate-900/80 backdrop-blur px-2.5 py-1.5 rounded text-[10px] text-slate-400 font-semibold border border-slate-800">
                {selectedMapCity ? (
                  <span>Active Map Filter: <span className="text-white font-bold">{selectedMapCity}</span> (Click pin to clear)</span>
                ) : (
                  <span>Click map pin markers to filter by city</span>
                )}
              </div>

            </div>
          </div>

          {/* Tournament Grid */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-extrabold text-slate-800 text-base">Active Tournaments ({filteredTournaments.length})</h3>
              {selectedMapCity && (
                <button 
                  onClick={() => setSelectedMapCity(null)}
                  className="text-xs bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800 px-2.5 py-1 rounded font-semibold flex items-center gap-1"
                >
                  City: {selectedMapCity} <X className="w-3 h-3" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTournaments.map(tournament => (
                <div key={tournament.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                  
                  {/* Card Header Image */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-slate-100 bg-slate-50">
                    <img 
                      src={tournament.image} 
                      alt={tournament.title} 
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Status Badge */}
                    <div className="absolute top-3 left-3">
                      <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded border shadow-sm ${
                        tournament.status === 'Open' 
                          ? 'bg-green-50 text-green-700 border-green-200' 
                          : tournament.status === 'Upcoming'
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : 'bg-red-50 text-red-700 border-red-200'
                      }`}>
                        {tournament.status}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    
                    <div className="space-y-3">
                      <h4 className="font-extrabold text-slate-900 text-base leading-snug group-hover:text-primary transition-colors min-h-[44px]">
                        {tournament.title}
                      </h4>
                      
                      {/* Meta List */}
                      <div className="space-y-1.5 text-xs text-slate-500 font-semibold">
                        <div className="flex items-center gap-2">
                          <Trophy className="w-4 h-4 text-slate-400 flex-shrink-0" />
                          <span>{tournament.sport}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
                          <span>{tournament.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-slate-400 flex-shrink-0" />
                          <span>{tournament.dates}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action button */}
                    <button 
                      onClick={() => tournament.status !== 'Closed' && setSelectedTournament(tournament)}
                      disabled={tournament.status === 'Closed'}
                      className={`w-full py-2.5 font-bold text-xs rounded-md transition-all uppercase tracking-wider ${
                        tournament.status === 'Closed'
                          ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                          : 'bg-primary hover:bg-primary-dark text-white shadow-sm hover:shadow'
                      }`}
                    >
                      {tournament.status === 'Closed' ? 'Closed' : 'Register Now'}
                    </button>

                  </div>

                </div>
              ))}
            </div>

            {filteredTournaments.length === 0 && (
              <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-400">
                No tournaments found matching current search filters. Click "Clear Filters" to restore list.
              </div>
            )}
          </div>

        </main>
      </div>

      {/* Register Modal Dialog */}
      {selectedTournament && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl border border-slate-200 flex flex-col animate-in fade-in zoom-in-95 duration-150">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-extrabold text-slate-800 text-base">Tournament Registration</h3>
              <button 
                onClick={() => setSelectedTournament(null)}
                className="p-1.5 bg-slate-50 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 border border-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            {regSuccess ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-14 h-14 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto border-2 border-green-200 animate-bounce">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-lg">Registration Successful!</h4>
                  <p className="text-xs text-slate-400 mt-1">We've saved your details for {selectedTournament.title}. See you there!</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="p-6 space-y-4">
                <div className="bg-slate-50 border border-slate-100 p-3 rounded-lg flex gap-3">
                  <img src={selectedTournament.image} className="w-16 h-12 object-cover rounded" />
                  <div>
                    <h5 className="font-extrabold text-slate-800 text-xs leading-tight mb-1">{selectedTournament.title}</h5>
                    <div className="flex items-center gap-1 text-[10px] text-slate-400 font-semibold">
                      <MapPin className="w-3 h-3 text-slate-300" />
                      <span>{selectedTournament.location}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Athlete Name</label>
                    <input 
                      type="text" 
                      required 
                      value={regForm.name}
                      onChange={(e) => setRegForm({...regForm, name: e.target.value})}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Email Address</label>
                    <input 
                      type="email" 
                      required 
                      value={regForm.email}
                      onChange={(e) => setRegForm({...regForm, email: e.target.value})}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="e.g. +91 9876543210" 
                      required 
                      pattern="^\+?\d{10,15}$"
                      title="Please enter a valid phone number (10 to 15 digits)"
                      value={regForm.phone}
                      onChange={(e) => setRegForm({...regForm, phone: e.target.value})}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Division/Category</label>
                    <select 
                      value={regForm.category}
                      onChange={(e) => setRegForm({...regForm, category: e.target.value})}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white"
                    >
                      <option value="Open">Open Category</option>
                      <option value="U19">Under-19</option>
                      <option value="Elite">Elite Masters</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button 
                    type="submit" 
                    className="flex-1 py-2.5 bg-primary hover:bg-primary-dark text-xs font-bold text-white rounded-lg transition-colors uppercase tracking-wider shadow-sm"
                  >
                    Confirm Registration
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setSelectedTournament(null)}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 rounded-lg transition-colors uppercase tracking-wider"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
