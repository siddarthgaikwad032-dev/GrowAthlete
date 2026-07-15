import React, { useState, useEffect } from 'react';
import { Pencil, MapPin, Check, ChevronRight, ThumbsUp, MessageSquare, Repeat, Send, Save, Plus, Calendar, Trash2, X } from 'lucide-react';
import { toast } from '../components/Toast';

export default function Profile({ user, onUserUpdate, onNavigate }) {
  // Bio/General Edit State
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [editedName, setEditedName] = useState(user.name);
  const [editedBio, setEditedBio] = useState(user.bio);
  const [editedLocation, setEditedLocation] = useState(user.location);
  const [editedSport, setEditedSport] = useState(user.sport);

  // Athletic details state
  const [isEditingDetails, setIsEditingDetails] = useState(false);
  const [athleticDetails, setAthleticDetails] = useState(user.athleticDetails || {
    primarySport: user.sport || 'Basketball',
    position: user.sport === 'Basketball' ? 'Point Guard' : 'Striker',
    yearStarted: '2008',
    height: '185',
    weight: '75',
    dominantHand: 'Right Hand',
    currentTeam: user.sport === 'Basketball' ? 'Los Angeles Rockets' : 'Knights Academy'
  });
  const [tempDetails, setTempDetails] = useState({ ...athleticDetails });

  // Expandable post details
  const [expandedPostId, setExpandedPostId] = useState(null);

  // Activity likes toggle
  const [activityLikes, setActivityLikes] = useState({ post1: 19, post2: 19 });
  const [hasLikedActivity, setHasLikedActivity] = useState({ post1: false, post2: false });

  // Achievements Edit/Add Modal states
  const [isEditingAchievements, setIsEditingAchievements] = useState(false);
  const [showAddAchievementModal, setShowAddAchievementModal] = useState(false);
  const [newAchievement, setNewAchievement] = useState({ date: '', title: '' });

  const [profileUser, setProfileUser] = useState(user);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);

  useEffect(() => {
    const viewId = localStorage.getItem('ga_view_user');
    const viewData = localStorage.getItem('ga_view_user_data');
    if (viewId && (!user || String(viewId) !== String(user.id))) {
      if (viewData) {
        try { setProfileUser(JSON.parse(viewData)); } catch (e) { localStorage.removeItem('ga_view_user_data'); }
      } else {
        // Mock another user
        setProfileUser({
          id: viewId,
          name: 'Jane Doe',
          sport: 'Football',
          location: 'Delhi, India',
          bio: 'Passionate athlete looking for the next challenge.',
          avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&auto=format&fit=crop',
          achievements: []
        });
      }
    } else {
      setProfileUser(user);
    }
  }, [user]);

  useEffect(() => {
    if (!profileUser || !user) return;
    if (profileUser.id === user.id) return;
    
    // Mock following state
    const follows = JSON.parse(localStorage.getItem('ga_follows') || '{}');
    setIsFollowing(!!follows[profileUser.id]);
  }, [profileUser, user]);

  const handleSaveBio = () => {
    const updated = {
      ...user,
      name: editedName,
      bio: editedBio,
      location: editedLocation,
      sport: editedSport
    };
    
    onUserUpdate(updated);
    toast('Profile updated successfully!', 'success');
    setIsEditingBio(false);
  };

  const handleSaveDetails = () => {
    setAthleticDetails({ ...tempDetails });
    setIsEditingDetails(false);
    onUserUpdate({
      ...user,
      athleticDetails: { ...tempDetails }
    });
    toast('Athletic details saved!', 'success');
  };

  const handleCancelDetails = () => {
    setTempDetails({ ...athleticDetails });
    setIsEditingDetails(false);
  };

  const handleActivityLikeToggle = (postId) => {
    const isLiked = hasLikedActivity[postId];
    setHasLikedActivity({
      ...hasLikedActivity,
      [postId]: !isLiked
    });
    setActivityLikes({
      ...activityLikes,
      [postId]: isLiked ? activityLikes[postId] - 1 : activityLikes[postId] + 1
    });
  };

  // Add achievement function
  const handleAddAchievement = (e) => {
    e.preventDefault();
    if (!newAchievement.date.trim() || !newAchievement.title.trim()) return;

    const updatedAchievements = [
      ...(user.achievements || []),
      {
        id: Date.now(),
        date: newAchievement.date.trim(),
        title: newAchievement.title.trim()
      }
    ];

    onUserUpdate({
      ...user,
      achievements: updatedAchievements
    });

    setNewAchievement({ date: '', title: '' });
    setShowAddAchievementModal(false);
    toast('Achievement added!', 'success');
  };

  // Delete achievement function
  const handleDeleteAchievement = (id) => {
    const updatedAchievements = user.achievements.filter(ach => ach.id !== id);
    onUserUpdate({
      ...user,
      achievements: updatedAchievements
    });
    toast('Achievement deleted.', 'info');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans space-y-6">
      
      {/* Profile Summary Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm relative">
        
        {/* Edit Button upper right */}
        <div className="absolute top-6 right-6 flex items-center gap-3">
          {profileUser && user && profileUser.id === user.id ? (
            isEditingBio ? (
              <button 
                onClick={handleSaveBio}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-xs font-semibold text-white rounded-md shadow-sm transition-colors"
              >
                <Save className="w-3.5 h-3.5" />
                Save
              </button>
            ) : (
              <button 
                onClick={() => setIsEditingBio(true)}
                className="p-1.5 border border-slate-200 hover:bg-slate-50 rounded-md text-slate-500 hover:text-slate-700 transition-colors"
              >
                <Pencil className="w-4 h-4" />
              </button>
            )
          ) : (
            <button onClick={() => {
              if (!user || !profileUser) return;
              const follows = JSON.parse(localStorage.getItem('ga_follows') || '{}');
              const nowFollowing = !follows[profileUser.id];
              follows[profileUser.id] = nowFollowing;
              localStorage.setItem('ga_follows', JSON.stringify(follows));
              
              setIsFollowing(nowFollowing);
              setProfileUser(p => ({ ...p, followers: (p.followers || 0) + (nowFollowing ? 1 : -1) }));
              toast(nowFollowing ? `You are now following ${profileUser.name}` : `Unfollowed ${profileUser.name}`, 'info');
            }} className="px-4 py-1.5 bg-primary hover:bg-primary-dark text-xs font-bold text-white rounded-md shadow-sm transition-all">
              {isFollowing ? 'Following' : 'Follow'}
            </button>
          )}

          <button 
            onClick={() => toast("Resume downloaded successfully!", 'success')}
            className="px-4 py-1.5 bg-primary hover:bg-primary-dark text-xs font-bold text-white rounded-md shadow-sm transition-all"
          >
            Resume
          </button>
        </div>

        {/* Profile Info Grid Layout */}
        <div className="flex flex-col md:flex-row gap-6 items-start">
          
          {/* Avatar Picture */}
            <div className="relative flex-shrink-0 mx-auto md:mx-0">
            <img 
              src={(profileUser && profileUser.avatar) || user.avatar} 
              alt="Athlete avatar" 
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-slate-50 shadow-md"
            />
            <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
          </div>

          {/* Texts Info */}
          <div className="flex-1 space-y-3 w-full text-center md:text-left">
                {isEditingBio ? (
              <div className="space-y-2 max-w-md mx-auto md:mx-0">
                <input 
                  type="text" 
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="w-full px-2 py-1 text-lg font-bold border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={editedSport}
                    onChange={(e) => setEditedSport(e.target.value)}
                    className="w-1/2 px-2 py-1 text-sm border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Sport"
                  />
                  <input 
                    type="text" 
                    value={editedLocation}
                    onChange={(e) => setEditedLocation(e.target.value)}
                    className="w-1/2 px-2 py-1 text-sm border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Location"
                  />
                </div>
              </div>
            ) : (
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{(profileUser && profileUser.name) || user.name}</h1>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-1.5">
                  <span className="text-sm font-bold text-primary">{(profileUser && profileUser.sport) || user.sport}</span>
                  <span className="text-slate-300 hidden sm:inline">•</span>
                  <div className="flex items-center gap-1 text-sm text-slate-500 font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{(profileUser && profileUser.location) || user.location}</span>
                  </div>
                  <span className="text-slate-300 hidden sm:inline">•</span>
                  <span className="inline-flex items-center gap-1 bg-teal-50 text-teal-600 px-2.5 py-0.5 rounded-full text-xs font-bold border border-teal-200">
                    <Check className="w-3 h-3 text-teal-600 stroke-[3]" />
                    <span>Available for Trials (Next 3 months)</span>
                  </span>
                </div>
              </div>
            )}

            {/* Bio text paragraph */}
            {isEditingBio ? (
              <textarea 
                value={editedBio}
                onChange={(e) => setEditedBio(e.target.value)}
                className="w-full p-2 text-sm border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-primary min-h-[80px]"
              />
            ) : (
              <p className="text-sm text-slate-500 leading-relaxed max-w-4xl font-medium">
                {user.bio}
              </p>
            )}

          </div>

        </div>

      </div>

      {/* Primary Action Buttons Bar */}
      <div className="flex items-center gap-3">
        <button onClick={() => toast('Status updated successfully!', 'success')} className="px-5 py-2.5 bg-primary hover:bg-primary-dark text-xs font-bold text-white rounded-lg shadow-sm hover:shadow transition-colors">
          Open to
        </button>
        <button onClick={() => toast('Profile sections editor coming soon!', 'info')} className="px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 rounded-lg transition-colors">
          Add profile Section
        </button>
      </div>

      {/* Athletic Details Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm relative">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-extrabold text-slate-800 text-lg">Athletic Details</h3>
          
          {isEditingDetails ? (
            <div className="flex gap-2">
              <button 
                onClick={handleSaveDetails}
                className="flex items-center gap-1 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-xs font-semibold text-white rounded-md"
              >
                <Save className="w-3.5 h-3.5" />
                Save
              </button>
              <button 
                onClick={handleCancelDetails}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 rounded-md"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setIsEditingDetails(true)}
              className="p-1.5 border border-slate-200 hover:bg-slate-50 rounded-md text-slate-500 hover:text-slate-700 transition-colors"
            >
              <Pencil className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Inputs Layout Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          
          {/* Primary Sport */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Primary Sport</label>
            {isEditingDetails ? (
              <select 
                value={tempDetails.primarySport}
                onChange={(e) => setTempDetails({ ...tempDetails, primarySport: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white"
              >
                <option value="Basketball">Basketball</option>
                <option value="Football">Football</option>
                <option value="Cricket">Cricket</option>
                <option value="Tennis">Tennis</option>
                <option value="Badminton">Badminton</option>
                <option value="Athletics">Athletics</option>
                <option value="Volleyball">Volleyball</option>
                <option value="Kabaddi">Kabaddi</option>
              </select>
            ) : (
              <p className="text-sm font-bold text-slate-800 bg-slate-50 border border-slate-100 rounded-lg px-3 py-2">
                {athleticDetails.primarySport}
              </p>
            )}
          </div>

          {/* Position */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Position / Specialization</label>
            {isEditingDetails ? (
              <input 
                type="text" 
                value={tempDetails.position}
                onChange={(e) => setTempDetails({ ...tempDetails, position: e.target.value })}
                placeholder="e.g., Striker, Midfielder, Point Guard"
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white"
              />
            ) : (
              <p className="text-sm font-semibold text-slate-800 bg-slate-50 border border-slate-100 rounded-lg px-3 py-2 min-h-[38px]">
                {athleticDetails.position || '—'}
              </p>
            )}
          </div>

          {/* Year Started */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Year Started</label>
            {isEditingDetails ? (
              <input 
                type="text" 
                value={tempDetails.yearStarted}
                onChange={(e) => setTempDetails({ ...tempDetails, yearStarted: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white"
              />
            ) : (
              <p className="text-sm font-bold text-slate-800 bg-slate-50 border border-slate-100 rounded-lg px-3 py-2">
                {athleticDetails.yearStarted}
              </p>
            )}
          </div>

          {/* Height */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Height (cm)</label>
            {isEditingDetails ? (
              <input 
                type="number" 
                value={tempDetails.height}
                onChange={(e) => setTempDetails({ ...tempDetails, height: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white"
              />
            ) : (
              <p className="text-sm font-semibold text-slate-800 bg-slate-50 border border-slate-100 rounded-lg px-3 py-2">
                {athleticDetails.height}
              </p>
            )}
          </div>

          {/* Weight */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Weight (kg)</label>
            {isEditingDetails ? (
              <input 
                type="number" 
                value={tempDetails.weight}
                onChange={(e) => setTempDetails({ ...tempDetails, weight: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white"
              />
            ) : (
              <p className="text-sm font-semibold text-slate-800 bg-slate-50 border border-slate-100 rounded-lg px-3 py-2">
                {athleticDetails.weight}
              </p>
            )}
          </div>

          {/* Dominant Hand/Foot */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Dominant Hand/Foot</label>
            {isEditingDetails ? (
              <select 
                value={tempDetails.dominantHand}
                onChange={(e) => setTempDetails({ ...tempDetails, dominantHand: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white"
              >
                <option value="Right Hand">Right Hand</option>
                <option value="Left Hand">Left Hand</option>
                <option value="Both Hands/Ambidextrous">Ambidextrous</option>
              </select>
            ) : (
              <p className="text-sm font-bold text-slate-800 bg-slate-50 border border-slate-100 rounded-lg px-3 py-2">
                {athleticDetails.dominantHand}
              </p>
            )}
          </div>

          {/* Current Team */}
          <div className="sm:col-span-2 md:col-span-3">
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Current Team/Club/School (if applicable)</label>
            {isEditingDetails ? (
              <input 
                type="text" 
                value={tempDetails.currentTeam}
                onChange={(e) => setTempDetails({ ...tempDetails, currentTeam: e.target.value })}
                placeholder="e.g., New York Knights"
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white"
              />
            ) : (
              <p className="text-sm font-semibold text-slate-800 bg-slate-50 border border-slate-100 rounded-lg px-3 py-2 min-h-[38px]">
                {athleticDetails.currentTeam || '—'}
              </p>
            )}
          </div>

        </div>

        {/* Show More link */}
        <div className="border-t border-slate-100 mt-6 pt-4 flex justify-center">
          <button onClick={() => { if (onNavigate) { localStorage.setItem('ga_show_user_posts', user.id); onNavigate('feed'); } }} className="flex items-center gap-1 text-slate-500 hover:text-slate-800 text-sm font-bold transition-colors">
            Show all posts
            <ChevronRight className="w-4 h-4 rotate-90" />
          </button>
        </div>

      </div>

      {/* Activity Section */}
      <div className="space-y-4">
        <h3 className="font-extrabold text-slate-800 text-lg">Activity</h3>
        
        {/* Responsive Flex/Grid list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Activity Post 1 */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between shadow-sm space-y-4">
            
            {/* Header info */}
            <div className="flex gap-3">
              <img src={user.avatar} className="w-10 h-10 rounded-full object-cover border" />
              <div>
                <span className="font-extrabold text-sm text-slate-800 block leading-tight">{user.name}</span>
                <span className="text-xs font-bold text-primary">{user.sport}</span>
              </div>
            </div>

            {/* Quotes/Post text */}
            <div className="space-y-1">
              <h4 className="text-sm font-black text-slate-900 leading-tight">Every bounce of the ball is a heartbeat</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                {expandedPostId === 'act1' ? (
                  "When I step onto the court, the world fades away. The ball in my hands, the squeak of shoes, the ring. It is more than a game, it is breathing."
                ) : (
                  <>
                    When I step onto the court, the world fades away. The ball in my h ...
                    <button 
                      onClick={() => setExpandedPostId('act1')}
                      className="text-primary font-bold hover:underline ml-1 focus:outline-none"
                    >
                      more
                    </button>
                  </>
                )}
              </p>
            </div>

            {/* Post image */}
            <div className="aspect-[16/9] bg-slate-100 rounded-lg overflow-hidden border border-slate-100">
              <img 
                src="https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500&auto=format&fit=crop" 
                alt="Basketball court play action" 
                onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.style.display = 'none'; }}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Likes count info */}
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold border-b border-slate-100 pb-3">
              <ThumbsUp className="w-3.5 h-3.5 fill-slate-100" />
              <span>{activityLikes.post1} • 2 reposts</span>
            </div>

            {/* Interaction Bar */}
            <div className="flex justify-between items-center text-slate-400 font-bold text-xs pt-1">
              <button 
                onClick={() => handleActivityLikeToggle('post1')}
                className={`flex items-center gap-1.5 hover:text-slate-800 transition-colors ${
                  hasLikedActivity.post1 ? 'text-blue-600' : ''
                }`}
              >
                <ThumbsUp className="w-4 h-4" />
                <span>Like</span>
              </button>
              <button className="flex items-center gap-1.5 hover:text-slate-800 transition-colors">
                <MessageSquare className="w-4 h-4" />
                <span>Comment</span>
              </button>
              <button className="flex items-center gap-1.5 hover:text-slate-800 transition-colors">
                <Repeat className="w-4 h-4" />
                <span>Repost</span>
              </button>
              <button className="flex items-center gap-1.5 hover:text-slate-800 transition-colors">
                <Send className="w-4 h-4" />
                <span>Send</span>
              </button>
            </div>

          </div>

          {/* Activity Post 2 */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between shadow-sm space-y-4">
            
            {/* Header info */}
            <div className="flex gap-3">
              <img src={user.avatar} className="w-10 h-10 rounded-full object-cover border" />
              <div>
                <span className="font-extrabold text-sm text-slate-800 block leading-tight">{user.name}</span>
                <span className="text-xs font-bold text-primary">{user.sport}</span>
              </div>
            </div>

            {/* Quotes/Post text */}
            <div className="space-y-1">
              <h4 className="text-sm font-black text-slate-900 leading-tight">sweat turns into hope</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                {expandedPostId === 'act2' ? (
                  "The roar of the crowd is thunder, but inside, it's quiet focus: the hoops we shoot in empty gyms are the ones that count on game nights."
                ) : (
                  <>
                    The roar of the crowd is thunder, but inside, it's quiet focus: the ho ...
                    <button 
                      onClick={() => setExpandedPostId('act2')}
                      className="text-primary font-bold hover:underline ml-1 focus:outline-none"
                    >
                      more
                    </button>
                  </>
                )}
              </p>
            </div>

            {/* Post image */}
            <div className="aspect-[16/9] bg-slate-100 rounded-lg overflow-hidden border border-slate-100">
              <img 
                src="https://images.unsplash.com/photo-1505666287802-931dc83948e9?w=500&auto=format&fit=crop" 
                alt="Basketball team huddle play" 
                onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.style.display = 'none'; }}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Likes count info */}
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold border-b border-slate-100 pb-3">
              <ThumbsUp className="w-3.5 h-3.5 fill-slate-100" />
              <span>{activityLikes.post2} • 2 reposts</span>
            </div>

            {/* Interaction Bar */}
            <div className="flex justify-between items-center text-slate-400 font-bold text-xs pt-1">
              <button 
                onClick={() => handleActivityLikeToggle('post2')}
                className={`flex items-center gap-1.5 hover:text-slate-800 transition-colors ${
                  hasLikedActivity.post2 ? 'text-blue-600' : ''
                }`}
              >
                <ThumbsUp className="w-4 h-4" />
                <span>Like</span>
              </button>
              <button onClick={() => toast('Comments opened', 'info')} className="flex items-center gap-1.5 hover:text-slate-800 transition-colors">
                <MessageSquare className="w-4 h-4" />
                <span>Comment</span>
              </button>
              <button onClick={() => toast('Reposted successfully!', 'success')} className="flex items-center gap-1.5 hover:text-slate-800 transition-colors">
                <Repeat className="w-4 h-4" />
                <span>Repost</span>
              </button>
              <button onClick={() => toast('Shared with network!', 'success')} className="flex items-center gap-1.5 hover:text-slate-800 transition-colors">
                <Send className="w-4 h-4" />
                <span>Send</span>
              </button>
            </div>

          </div>

        </div>

        {/* Center Card Show All Posts Link Bar */}
        <div className="bg-white rounded-xl border border-slate-200 py-3.5 text-center shadow-sm">
          <button 
            onClick={() => { toast("Loading all activities...", 'info'); setTimeout(() => onNavigate('feed'), 500); }}
            className="text-slate-700 hover:text-slate-900 font-extrabold text-sm transition-colors inline-flex items-center gap-1"
          >
            Show all posts <span className="font-sans">→</span>
          </button>
        </div>

      </div>

      {/* Recent Achievements Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm relative">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-extrabold text-slate-800 text-lg">Recent Achievements</h3>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowAddAchievementModal(true)}
              className="p-1.5 border border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-slate-700 rounded-md transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setIsEditingAchievements(!isEditingAchievements)}
              className={`p-1.5 border hover:bg-slate-50 rounded-md transition-colors ${
                isEditingAchievements ? 'border-primary text-primary' : 'border-slate-200 text-slate-500 hover:text-slate-700'
              }`}
            >
              <Pencil className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Achievements list */}
        <div className="space-y-3">
          {user.achievements && user.achievements.map((ach) => (
            <div 
              key={ach.id} 
              className="bg-slate-50 border border-slate-100 rounded-lg p-3 flex items-center justify-between group transition-all hover:bg-slate-100/50"
            >
              <div className="flex items-center gap-4">
                {/* Calendar Icon wrapper */}
                <div className="w-10 h-10 bg-white border border-slate-200 rounded flex items-center justify-center text-slate-400 flex-shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight block">
                    {ach.date}
                  </span>
                  <span className="text-sm font-extrabold text-slate-800 leading-snug">
                    {ach.title}
                  </span>
                </div>
              </div>

              {/* Editing/Delete Action */}
              {isEditingAchievements && (
                <button
                  onClick={() => handleDeleteAchievement(ach.id)}
                  className="p-2 text-red-500 hover:text-red-700 hover:bg-white border border-transparent hover:border-slate-200 rounded-md transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}

          {(!user.achievements || user.achievements.length === 0) && (
            <p className="text-xs text-slate-400 text-center py-6">No achievements recorded yet. Click "+" to add one!</p>
          )}
        </div>

      </div>

      {/* Add Achievement Modal Dialog */}
      {showAddAchievementModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl border border-slate-200 flex flex-col animate-in fade-in zoom-in-95 duration-150">
            
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-extrabold text-slate-800 text-base">Add Achievement</h3>
              <button 
                onClick={() => setShowAddAchievementModal(false)}
                className="p-1.5 bg-slate-50 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 border border-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddAchievement} className="p-6 space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Season / Date</label>
                <input 
                  type="text" 
                  placeholder="e.g. 2024 Season or Feb 2023"
                  required
                  value={newAchievement.date}
                  onChange={(e) => setNewAchievement({...newAchievement, date: e.target.value})}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Achievement Description</label>
                <input 
                  type="text" 
                  placeholder="e.g. NBA Rookie of the Year"
                  required
                  value={newAchievement.title}
                  onChange={(e) => setNewAchievement({...newAchievement, title: e.target.value})}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button 
                  type="submit"
                  className="flex-1 py-2 bg-primary hover:bg-primary-dark text-xs font-bold text-white rounded-lg transition-colors uppercase tracking-wider"
                >
                  Add Achievement
                </button>
                <button 
                  type="button"
                  onClick={() => setShowAddAchievementModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
