import React from 'react';
import Landing from './pages/Landing';
import Feed from './pages/Feed';
import Profile from './pages/Profile';
import News from './pages/News';
import Tournaments from './pages/Tournaments';
import About from './pages/About';
import Articles from './pages/Articles';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import GetApp from './pages/GetApp';
import SavedPosts from './pages/SavedPosts';
import Header from './components/Header';
import ToastContainer, { toast } from './components/Toast';
import { useLocalStorage } from './hooks/useLocalStorage';

export default function App() {
  const [activeView, setActiveView] = useLocalStorage('ga_active_view_v2', 'landing');
  const [user, setUser] = useLocalStorage('ga_user_v2', null);
  const [isAuthenticated, setIsAuthenticated] = useLocalStorage('ga_is_authenticated_v2', false);
  const [usersDb, setUsersDb] = useLocalStorage('ga_users_db_v2', {});

  const [posts, setPosts] = useLocalStorage('ga_posts_v2', [
    {
      id: 1,
      author: 'Rohit Sharma',
      authorRole: 'Cricket Coach at Mumbai Indians Academy',
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop',
      time: '2 hours ago',
      content: 'Just finished an incredible session with the U-16 squad. The talent coming through the ranks in Mumbai is absolutely phenomenal! Keep your eyes on these kids.',
      image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&auto=format&fit=crop',
      likes: 124,
      comments: 18,
      reposts: 5,
      saved: false
    },
    {
      id: 2,
      author: 'Priya Singh',
      authorRole: 'National Level Sprinter',
      authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop',
      time: '5 hours ago',
      content: 'New personal best in the 100m sprint today! 11.45s 🏃‍♀️🔥 Hard work is finally paying off. Thanks to my coach and everyone supporting my journey to the nationals.',
      likes: 342,
      comments: 45,
      reposts: 12,
      saved: false
    },
    {
      id: 3,
      author: 'Sports Science Institute',
      authorRole: 'Official Partner',
      authorAvatar: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=150&auto=format&fit=crop',
      time: '1 day ago',
      content: 'Recovery is just as important as training. Here are 5 scientifically proven ways to speed up muscle recovery post-match:',
      link: {
        title: '5 Scientific Recovery Methods for Athletes',
        url: 'growathlete.com/blog/recovery-methods',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop'
      },
      likes: 56,
      comments: 4,
      reposts: 8,
      saved: false
    }
  ]);

  const [savedPosts, setSavedPosts] = useLocalStorage('ga_saved_posts_v2', []);

  const [notifications, setNotifications] = useLocalStorage('ga_notifications_v2', [
    { id: 1, type: 'like', message: 'Rohit Sharma liked your post.', time: '2h ago', read: false, view: 'feed' },
    { id: 2, type: 'tournament', message: 'Registration for Mumbai Open ends tomorrow.', time: '5h ago', read: false, view: 'tournaments' },
    { id: 3, type: 'follow', message: 'Priya Singh started following you.', time: '1d ago', read: true, view: 'profile' }
  ]);

  const handleLogin = (userData) => {
    const emailKey = userData.email || 'default@growathlete.com';
    const existingUser = usersDb[emailKey];
    const userToLogin = existingUser || { ...userData, id: userData.id || Date.now() };

    if (!existingUser) {
      setUsersDb(prev => ({ ...prev, [emailKey]: userToLogin }));
    }

    setUser(userToLogin);
    setIsAuthenticated(true);
    setActiveView('feed');
    toast(`Welcome back, ${userToLogin.name}!`, 'success');
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setActiveView('landing');
    toast('You have been logged out.', 'info');
  };

  const handleUserUpdate = (updatedData) => {
    setUser({ ...user, ...updatedData });
    if (updatedData.email) {
      setUsersDb(prev => ({ ...prev, [updatedData.email]: { ...user, ...updatedData } }));
    }
  };

  const handleNavigate = (view) => {
    setActiveView(view);
    window.scrollTo(0, 0);
  };

  const handleUnsavePost = (postId) => {
    setSavedPosts(prev => prev.filter(p => p.id !== postId));
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, saved: false } : p));
  };

  const renderView = () => {
    if (!isAuthenticated || activeView === 'landing') {
      return <Landing onLogin={handleLogin} onNavigate={handleNavigate} />;
    }

    switch (activeView) {
      case 'feed':
        return <Feed user={user} posts={posts} setPosts={setPosts} savedPosts={savedPosts} setSavedPosts={setSavedPosts} />;
      case 'profile':
        return <Profile user={user} onUserUpdate={handleUserUpdate} onNavigate={handleNavigate} />;
      case 'news':
        return <News />;
      case 'tournaments':
        return <Tournaments user={user} />;
      case 'about':
        return <About onBack={() => handleNavigate('landing')} />;
      case 'articles':
        return <Articles onBack={() => handleNavigate('landing')} />;
      case 'blog':
        return <Blog onBack={() => handleNavigate('landing')} />;
      case 'contact':
        return <Contact onBack={() => handleNavigate('landing')} />;
      case 'getapp':
        return <GetApp onBack={() => handleNavigate('landing')} />;
      case 'savedposts':
        return <SavedPosts savedPosts={savedPosts} setSavedPosts={setSavedPosts} onBack={() => handleNavigate('feed')} onUnsave={handleUnsavePost} />;
      default:
        return <Feed user={user} posts={posts} setPosts={setPosts} savedPosts={savedPosts} setSavedPosts={setSavedPosts} />;
    }
  };

  return (
    <div className="min-h-screen bg-grow-bg font-sans text-slate-900">
      <ToastContainer />
      {isAuthenticated && activeView !== 'landing' && (
        <Header 
          activeTab={activeView} 
          onTabChange={handleNavigate} 
          onLogout={handleLogout}
          user={user}
          notifications={notifications}
          setNotifications={setNotifications}
        />
      )}
      <main className="w-full">
        {renderView()}
      </main>
    </div>
  );
}
