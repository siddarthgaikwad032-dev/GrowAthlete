import React from 'react';
import { ArrowLeft, BookmarkMinus, MessageSquare, ThumbsUp, Repeat, ExternalLink, Image as ImageIcon } from 'lucide-react';
import { toast } from '../components/Toast';

export default function SavedPosts({ savedPosts, setSavedPosts, onBack, onUnsave }) {
  const handleUnsave = (postId) => {
    onUnsave(postId);
    toast('Post removed from saved items', 'info');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-12">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 py-4 px-4 sm:px-6 lg:px-8 sticky top-0 z-10 shadow-sm">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-extrabold text-slate-900">Saved Posts</h1>
          </div>
          <span className="text-sm font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            {savedPosts.length} saved
          </span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {savedPosts.length === 0 ? (
          <div className="text-center py-20 px-4">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookmarkMinus className="w-10 h-10 text-slate-300" />
            </div>
            <h2 className="text-xl font-extrabold text-slate-800 mb-2">No saved posts yet</h2>
            <p className="text-slate-500 max-w-sm mx-auto">
              When you see a post, article, or drill you want to keep for later, tap the save icon and it will appear here.
            </p>
            <button onClick={onBack} className="mt-6 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-sm">
              Discover Content
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {savedPosts.map(post => (
              <div key={post.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                {/* Post Header */}
                <div className="p-4 flex items-center justify-between border-b border-slate-50">
                  <div className="flex items-center gap-3">
                    <img src={post.authorAvatar} alt={post.author} className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                    <div>
                      <h3 className="font-bold text-sm text-slate-900">{post.author}</h3>
                      <p className="text-[11px] text-slate-500 font-medium">{post.authorRole} • {post.time}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleUnsave(post.id)}
                    className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors border border-red-100"
                  >
                    <BookmarkMinus className="w-3.5 h-3.5" /> Unsave
                  </button>
                </div>

                {/* Post Content */}
                <div className="p-4">
                  <p className="text-sm text-slate-800 leading-relaxed whitespace-pre-line mb-3">
                    {post.content}
                  </p>
                  
                  {post.image && (
                    <div className="rounded-lg overflow-hidden border border-slate-100 bg-slate-50 mb-3">
                      <img src={post.image} alt="Post attachment" className="w-full max-h-96 object-contain" />
                    </div>
                  )}

                  {post.link && (
                    <a href={post.link.url} target="_blank" rel="noopener noreferrer" className="block p-3 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors mb-3 group">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded shadow-sm flex items-center justify-center border border-slate-200 group-hover:border-blue-300">
                          {post.link.image ? (
                            <img src={post.link.image} alt="" className="w-full h-full object-cover rounded" />
                          ) : (
                            <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-blue-500" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-slate-800 truncate">{post.link.title}</p>
                          <p className="text-[11px] text-slate-500 truncate">{post.link.url}</p>
                        </div>
                      </div>
                    </a>
                  )}
                </div>

                {/* Stats Footer */}
                <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex items-center gap-6">
                  <button onClick={() => toast('Liked saved post', 'success')} className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors">
                    <ThumbsUp className="w-4 h-4" /> {post.likes}
                  </button>
                  <button onClick={() => toast('Comments opened for saved post', 'info')} className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors">
                    <MessageSquare className="w-4 h-4" /> {post.comments}
                  </button>
                  <button onClick={() => toast('Reposted saved post', 'success')} className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors">
                    <Repeat className="w-4 h-4" /> {post.reposts}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
