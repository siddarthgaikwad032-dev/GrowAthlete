import React, { useEffect, useState } from 'react';
import api from '../lib/api';

export default function Saved({ user }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user || !user.id) return;
    setLoading(true);
    api.getSavedPosts(user.id).then(res => setPosts(res)).catch(err => console.error(err)).finally(() => setLoading(false));
  }, [user]);

  if (!user) return <div className="max-w-7xl mx-auto px-4 py-8">Please login to view saved posts.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
      <h2 className="text-2xl font-extrabold mb-4">Saved Posts</h2>
      {loading && <p className="text-sm text-slate-500">Loading...</p>}
      {!loading && posts.length === 0 && <p className="text-sm text-slate-400">You have no saved posts.</p>}
      <div className="space-y-4">
        {posts.map(p => (
          <div key={p.id} className="bg-white border border-slate-200 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <img src={p.author_avatar} className="w-10 h-10 rounded-full" />
              <div>
                <div className="font-bold text-sm">{p.author_name}</div>
                <div className="text-xs text-slate-400">{new Date(p.created_at).toLocaleString()}</div>
              </div>
            </div>
            <div className="text-sm text-slate-700">{p.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
