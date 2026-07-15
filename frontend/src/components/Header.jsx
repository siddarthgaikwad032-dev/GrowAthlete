import React, { useState, useRef, useEffect } from 'react';
import { User, Rss, Newspaper, Trophy, Bell, Search, LogOut, Bookmark, ChevronDown } from 'lucide-react';
import NotificationsPanel from './NotificationsPanel';
import api from '../lib/api';
import { toast } from './Toast';

export default function Header({ activeTab, onTabChange, onLogout, user, notifications, setNotifications }) {
  const [showNotifs, setShowNotifs] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const profileMenuRef = useRef(null);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'feed', label: 'Feed', icon: Rss },
    { id: 'news', label: 'News', icon: Newspaper },
    { id: 'tournaments', label: 'Tournaments', icon: Trophy },
  ];

  const unreadCount = notifications ? notifications.filter(n => !n.read).length : 0;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markOneRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast(`Search for "${searchQuery}" coming soon!`, 'info');
      setSearchQuery('');
    }
  };

  return (
    <header className="border-b border-grow-border bg-white sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Logo left */}
        <div className="flex items-center gap-2 cursor-pointer flex-shrink-0" onClick={onLogout}>
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-800 rounded-lg flex items-center justify-center text-white shadow-md">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M19.5 9.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5M16 12.2l-.7 2.1-2.8-2.8-1.5 1.5 2.5 2.5-.7 2.1c-.2.7-.9 1.1-1.6.9L7 15.6V21h-2v-6.6l4.2.9 1.3-4-2-2v4H6.5V7.5L10 4c.4-.4 1-.4 1.4 0l3 3 2.1-.7c.7-.2 1.4.2 1.6.9.2.8-.2 1.5-.9 1.7l-1.2.3z" />
            </svg>
          </div>
          <div className="flex items-baseline text-2xl font-bold tracking-tight">
            <span className="text-grow-orange">Grow</span>
            <span className="text-grow-navy ml-0.5">Athlete</span>
          </div>
        </div>

        {/* Middle Navigation Tabs */}
        <nav className="flex items-center space-x-1 sm:space-x-4 md:space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-1.5 px-2 sm:px-3 py-2 text-sm font-medium transition-colors relative ${
                  isActive 
                    ? 'text-primary' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-primary' : 'text-slate-400'}`} />
                <span className="hidden sm:inline">{tab.label}</span>
                {isActive && (
                  <span className="absolute bottom-[-16px] left-0 right-0 h-0.5 bg-primary" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right tools (Search, Notifications, Profile) */}
        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          
          {/* Search bar */}
          <form onSubmit={handleSearchSubmit} className="relative hidden md:block w-48 lg:w-60">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..." 
              className="w-full pl-9 pr-4 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white transition-all"
            />
          </form>

          {/* Notifications bell */}
          <button 
            onClick={() => setShowNotifs(true)}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors relative"
          >
            <Bell className="w-5 h-5 pointer-events-none" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full pointer-events-none" />
            )}
          </button>

          {/* User Profile Avatar with Dropdown */}
          <div className="relative" ref={profileMenuRef}>
            <button 
              onClick={() => setShowProfileMenu(!showProfileMenu)} 
              className="flex items-center gap-2 focus:outline-none group"
            >
              <div className="relative">
                <img 
                  src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop"} 
                  alt="User Avatar" 
                  className="w-9 h-9 rounded-full object-cover border border-slate-200 group-hover:border-primary transition-colors"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" />
              </div>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
            </button>

            {/* Profile Dropdown Menu */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-4 py-2 border-b border-slate-50 mb-1">
                  <p className="text-sm font-bold text-slate-800 truncate">{user?.name || 'User'}</p>
                  <p className="text-[10px] text-slate-400 truncate">{user?.email || 'user@growathlete.com'}</p>
                </div>
                
                <button 
                  onClick={() => { onTabChange('profile'); setShowProfileMenu(false); }}
                  className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <User className="w-4 h-4" /> My Profile
                </button>
                
                <button 
                  onClick={() => { onTabChange('savedposts'); setShowProfileMenu(false); }}
                  className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <Bookmark className="w-4 h-4" /> Saved Posts
                </button>
                
                <div className="my-1 border-t border-slate-50" />
                
                <button 
                  onClick={() => { onLogout(); setShowProfileMenu(false); }}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" /> Sign out
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

      {showNotifs && (
        <NotificationsPanel 
          notifications={notifications || []}
          onClose={() => setShowNotifs(false)}
          onMarkAll={markAllRead}
          onMarkOne={markOneRead}
          onNavigate={onTabChange}
        />
      )}
    </header>
  );
}
