import React, { useState } from 'react';
import { Share2, ThumbsUp, MessageSquare, Repeat, Bookmark, Link, Search, CheckCircle, Plus } from 'lucide-react';
import { toast } from '../components/Toast';

export default function Feed({ user, posts, setPosts, savedPosts, setSavedPosts }) {
  // Chat rooms list state
  const [chatRooms, setChatRooms] = useState([
    { id: 1, name: 'Morning Run Club', sport: 'Running', participants: 15, isVerified: true },
    { id: 2, name: 'Evening Stretch & Meditate', sport: 'Wellness', participants: 8, isVerified: false },
    { id: 3, name: 'Tactical Football Debrief', sport: 'Football', participants: 23, isVerified: true },
  ]);
  const [chatSearch, setChatSearch] = useState('');
  const [showVerifiedRoomsOnly, setShowVerifiedRoomsOnly] = useState(false);
  const [joinLinkInput, setJoinLinkInput] = useState('');


  // Post publisher state
  const [newPostText, setNewPostText] = useState('');
  const [commentsOpen, setCommentsOpen] = useState({});
  const [commentsMap, setCommentsMap] = useState({});
  const [commentInput, setCommentInput] = useState({});

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPostText.trim()) return;
    
    const newPost = {
      id: Date.now(),
      author: user?.name || 'Ethan Foster',
      authorRole: 'Athlete',
      authorAvatar: user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop',
      time: 'Just now',
      content: newPostText,
      likes: 0,
      comments: 0,
      reposts: 0,
      saved: false,
      localComments: []
    };
    
    setPosts([newPost, ...posts]);
    setNewPostText('');
    toast('Post published successfully!', 'success');
  };

  const handleLike = (id) => {
    setPosts(prev => prev.map(post => {
      if (post.id === id) {
        const isLiking = !post.hasLiked;
        if (isLiking) toast('Post liked!', 'success');
        return {
          ...post,
          likes: post.hasLiked ? Math.max(0, post.likes - 1) : post.likes + 1,
          hasLiked: isLiking
        };
      }
      return post;
    }));
  };

  const handleBookmark = (post) => {
    const isSaved = savedPosts.find(p => p.id === post.id);
    
    if (isSaved) {
      setSavedPosts(prev => prev.filter(p => p.id !== post.id));
      setPosts(prev => prev.map(p => p.id === post.id ? { ...p, saved: false } : p));
      toast('Post removed from saved', 'info');
    } else {
      setSavedPosts(prev => [{...post, saved: true}, ...prev]);
      setPosts(prev => prev.map(p => p.id === post.id ? { ...p, saved: true } : p));
      toast('Post saved!', 'success');
    }
  };

  const handleJoinRoom = (roomId) => {
    toast(`Successfully joined the room!`, 'success');
  };

  const handleJoinByLink = (e) => {
    e.preventDefault();
    if (!joinLinkInput) return;
    toast(`Joined room from link!`, 'success');
    setJoinLinkInput('');
  };

  const toggleComments = (postId) => {
    const open = !!commentsOpen[postId];
    if (!open) toast('Comments opened', 'info');
    setCommentsOpen({ ...commentsOpen, [postId]: !open });
    
    // Auto-populate local comments array if empty
    if (!open && !commentsMap[postId]) {
      const post = posts.find(p => p.id === postId);
      setCommentsMap(m => ({ ...m, [postId]: post?.localComments || [] }));
    }
  };

  const handleAddComment = (postId) => {
    const text = commentInput[postId] || '';
    if (!text.trim()) return;
    
    const newComment = {
      id: Date.now(),
      author_name: user?.name || 'Ethan Foster',
      author_avatar: user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop',
      content: text.trim(),
      created_at: new Date().toISOString()
    };

    setCommentsMap(m => ({ ...m, [postId]: [...(m[postId] || []), newComment] }));
    setCommentInput(c => ({ ...c, [postId]: '' }));
    
    setPosts(ps => ps.map(p => {
      if (p.id === postId) {
        return { 
          ...p, 
          comments: (p.comments || 0) + 1,
          localComments: [...(p.localComments || []), newComment]
        };
      }
      return p;
    }));
  };

  const handleShare = (post) => {
    const text = `Check out this post on GrowAthlete`;
    if (navigator.share) {
      navigator.share({ title: post.title, text });
    } else {
      navigator.clipboard.writeText(text).then(() => toast('Link copied to clipboard!', 'success'));
    }
  };

  // Filter chat rooms based on search and verified toggle
  const filteredChatRooms = chatRooms.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(chatSearch.toLowerCase()) || 
                          room.sport.toLowerCase().includes(chatSearch.toLowerCase());
    const matchesVerified = !showVerifiedRoomsOnly || room.isVerified;
    return matchesSearch && matchesVerified;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (Stats & Chat Rooms) */}
        <aside className="lg:col-span-4 space-y-6">
          
          {/* Stats Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div>
                <span className="text-3xl font-extrabold text-slate-800">1250</span>
                <span className="text-xs font-semibold text-slate-400 block uppercase mt-0.5">Followers</span>
              </div>
              <div className="border-l border-slate-100 h-10 mx-4" />
              <div>
                <span className="text-3xl font-extrabold text-slate-800">320</span>
                <span className="text-xs font-semibold text-slate-400 block uppercase mt-0.5">Following</span>
              </div>
              <div className="ml-auto bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full text-xs font-semibold">
                15 Mutuals
              </div>
            </div>

            {/* Avatar Stack */}
            <div className="flex items-center space-x-[-10px] mb-6">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop" className="w-10 h-10 rounded-full border-2 border-white object-cover" alt="User 1" />
              <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80&auto=format&fit=crop" className="w-10 h-10 rounded-full border-2 border-white object-cover" alt="User 2" />
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop" className="w-10 h-10 rounded-full border-2 border-white object-cover" alt="User 3" />
              <img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=80&auto=format&fit=crop" className="w-10 h-10 rounded-full border-2 border-white object-cover" alt="User 4" />
              <span className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                +11
              </span>
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-1 gap-2.5">
              <button 
                onClick={() => toast('Followers list will be available soon!', 'info')}
                className="w-full py-2.5 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-colors"
              >
                View followers
              </button>
              <button 
                onClick={() => toast('Following list will be available soon!', 'info')}
                className="w-full py-2.5 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-colors"
              >
                View following
              </button>
            </div>
          </div>

          {/* Live Chat Rooms Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-800 text-base">Live Chat Rooms</h3>
              <button className="text-xs font-semibold text-primary hover:underline flex items-center gap-0.5">
                <Plus className="w-3.5 h-3.5" />
                Create room
              </button>
            </div>

            {/* Search inputs */}
            <div className="relative mb-4">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search rooms..." 
                value={chatSearch}
                onChange={(e) => setChatSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white"
              />
            </div>

            {/* Rooms List */}
            <div className="space-y-3 mb-5">
              {filteredChatRooms.map(room => (
                <div key={room.id} className="flex items-start justify-between p-3 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-100 transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-bold text-slate-800">{room.name}</span>
                      <span className="bg-blue-50 text-[10px] text-blue-600 px-1.5 py-0.5 rounded font-semibold">
                        {room.sport}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-medium">{room.participants} participants</p>
                  </div>
                  <div className="flex items-center gap-1.5 ml-2 flex-shrink-0">
                    <button 
                      onClick={() => handleJoinRoom(room.id)}
                      className="px-3 py-1 bg-white border border-slate-200 rounded text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300"
                    >
                      Join
                    </button>
                    <button className="p-1 hover:bg-white rounded text-slate-400 hover:text-slate-600 border border-transparent hover:border-slate-200">
                      <Link className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
              {filteredChatRooms.length === 0 && (
                <p className="text-xs text-slate-400 text-center py-4">No rooms found matching filters</p>
              )}
            </div>

            {/* Join by Link Form */}
            <form onSubmit={handleJoinByLink} className="flex gap-2 mb-4">
              <input 
                type="text" 
                placeholder="Join by link..." 
                value={joinLinkInput}
                onChange={(e) => setJoinLinkInput(e.target.value)}
                className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white"
              />
              <button 
                type="submit" 
                className="px-3.5 py-1.5 bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-md"
              >
                Join
              </button>
            </form>

            {/* Live messages section */}
            <div className="border-t border-slate-100 pt-4 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Live Now</span>
              </div>
              <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 space-y-2">
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-tight">Last messages from selected room:</p>
                <div className="space-y-1 text-xs">
                  <p className="text-slate-700"><span className="font-bold text-slate-800">Jane:</span> Anyone joining the 6 AM run tomorrow?</p>
                  <p className="text-slate-700"><span className="font-bold text-slate-800">Mark:</span> Yep, I'll be there!</p>
                </div>
              </div>
            </div>

            {/* Verified toggle switch */}
            <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Show only verified/coach rooms</span>
              <button 
                type="button" 
                onClick={() => setShowVerifiedRoomsOnly(!showVerifiedRoomsOnly)}
                className={`relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  showVerifiedRoomsOnly ? 'bg-primary' : 'bg-slate-200'
                }`}
              >
                <span 
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    showVerifiedRoomsOnly ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

          </div>

        </aside>

        {/* Center Column (Feed Stream) */}
        <main className="lg:col-span-8 space-y-6">
          
          {/* Create Post Publisher Box */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 shadow-sm">
            <div className="flex gap-4 items-start">
              <img 
                src={user.avatar} 
                alt="Ethan Foster avatar" 
                className="w-10 h-10 rounded-full object-cover border border-slate-200"
              />
              <form onSubmit={handleCreatePost} className="flex-1 space-y-3">
                <textarea 
                  placeholder="Share your latest achievement or update..."
                  value={newPostText}
                  onChange={(e) => setNewPostText(e.target.value)}
                  className="w-full resize-none bg-slate-50 hover:bg-slate-100/50 border border-slate-100 focus:bg-white focus:border-slate-200 rounded-lg p-3 text-sm focus:outline-none min-h-[80px]"
                />
                <div className="flex justify-end">
                  <button 
                    type="submit" 
                    className="px-5 py-2 bg-primary hover:bg-primary-dark font-semibold text-sm text-white rounded-md transition-colors"
                  >
                    Post Update
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Posts Stream */}
          <div className="space-y-6">
            {posts.map(post => (
              <article key={post.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                
                {/* Author Card Info */}
                <div className="p-4 sm:p-6 flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img 
                      src={post.author_avatar || post.avatar} 
                      alt={post.author_name || post.author} 
                      className="w-11 h-11 rounded-full object-cover border border-slate-200"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span onClick={() => { localStorage.setItem('ga_view_user', post.author_id || post.authorId || post.user_id || post.authorId); window.dispatchEvent(new Event('ga:navigateProfile')); }} className="font-bold text-slate-800 text-sm hover:underline cursor-pointer">{post.author_name || post.author}</span>
                        {post.isVerified && (
                          <div className="inline-flex items-center gap-0.5 bg-blue-50 text-[10px] text-blue-600 px-1.5 py-0.5 rounded font-semibold">
                            <CheckCircle className="w-3 h-3 text-blue-600 fill-current text-white" />
                            <span>Verified</span>
                          </div>
                        )}
                      </div>
                      <span className="text-xs font-semibold text-slate-400">{post.time}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="px-4 sm:px-6 pb-4 space-y-3">
                  <h4 className="font-extrabold text-slate-900 text-base">{post.title}</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{post.content}</p>
                </div>

                {/* Banner Image */}
                {post.image && (
                  <div className="relative aspect-[21/9] w-full overflow-hidden border-y border-slate-100">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.style.display = 'none'; }}
                      className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-500"
                    />
                  </div>
                )}

                {/* Bottom Action Bar */}
                <div className="px-4 sm:px-6 py-3.5 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between text-slate-500">
                  <div className="flex items-center gap-4 sm:gap-6">
                    {/* Likes */}
                    <button 
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-1.5 text-xs font-bold transition-colors ${
                        post.hasLiked ? 'text-blue-600' : 'hover:text-slate-800'
                      }`}
                    >
                      <ThumbsUp className={`w-4 h-4 ${post.hasLiked ? 'fill-blue-100' : ''}`} />
                      <span>{post.likes}</span>
                    </button>

                    {/* Comments */}
                    <button onClick={() => toggleComments(post.id)} className="flex items-center gap-1.5 text-xs font-bold hover:text-slate-800 transition-colors">
                      <MessageSquare className="w-4 h-4" />
                      <span>{post.comments}</span>
                    </button>

                    {/* Reposts */}
                    <button className="flex items-center gap-1.5 text-xs font-bold hover:text-slate-800 transition-colors">
                      <Repeat className="w-4 h-4" />
                      <span>{post.reposts}</span>
                    </button>

                    {/* Bookmark */}
                    <button 
                      onClick={() => handleBookmark(post)}
                      className={`hover:text-slate-800 transition-colors ${
                        post.saved ? 'text-amber-500' : ''
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${post.saved ? 'fill-amber-400' : ''}`} />
                    </button>
                  </div>

                  {/* Share post */}
                  <button onClick={() => handleShare(post)} className="flex items-center gap-1.5 text-xs font-bold hover:text-slate-800 transition-colors text-slate-500">
                    <Share2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Share post</span>
                  </button>
                </div>

                {/* Comments section */}
                {commentsOpen[post.id] && (
                  <div className="p-4 border-t border-slate-100 bg-white space-y-3">
                    <div className="space-y-2">
                      {(commentsMap[post.id] || []).map(c => (
                        <div key={c.id} className="flex items-start gap-3">
                          <img src={c.author_avatar} className="w-8 h-8 rounded-full" />
                          <div>
                            <div className="text-sm font-bold text-slate-800">{c.author_name} <span className="text-xs text-slate-400 font-medium">• {new Date(c.created_at).toLocaleString()}</span></div>
                            <div className="text-sm text-slate-600">{c.content}</div>
                          </div>
                        </div>
                      ))}
                      {(commentsMap[post.id] || []).length === 0 && <p className="text-xs text-slate-400">No comments yet. Be the first to comment.</p>}
                    </div>
                    <div className="flex gap-2">
                      <input value={commentInput[post.id] || ''} onChange={(e) => setCommentInput(c => ({ ...c, [post.id]: e.target.value }))} placeholder="Add a comment..." className="flex-1 px-3 py-2 bg-slate-50 border border-slate-100 rounded-md" />
                      <button onClick={() => handleAddComment(post.id)} className="px-3 py-2 bg-primary text-white rounded-md">Comment</button>
                    </div>
                  </div>
                )}

              </article>
            ))}
          </div>

        </main>
      </div>
    </div>
  );
}
