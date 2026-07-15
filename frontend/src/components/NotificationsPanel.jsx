import React from 'react';
import { X, Bell, ThumbsUp, MessageSquare, UserPlus, Trophy, CheckCheck } from 'lucide-react';

const typeIcon = {
  like: <ThumbsUp className="w-4 h-4 text-blue-500" />,
  comment: <MessageSquare className="w-4 h-4 text-green-500" />,
  follow: <UserPlus className="w-4 h-4 text-purple-500" />,
  tournament: <Trophy className="w-4 h-4 text-amber-500" />,
};

export default function NotificationsPanel({ notifications, onClose, onMarkAll, onMarkOne, onNavigate }) {
  const unread = notifications.filter(n => !n.read).length;

  return (
    <div className="fixed inset-0 z-50" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="absolute top-16 right-4 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col max-h-[80vh]">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-slate-600" />
            <h3 className="font-extrabold text-slate-800 text-sm">Notifications</h3>
            {unread > 0 && (
              <span className="bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{unread}</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {unread > 0 && (
              <button onClick={onMarkAll} className="text-[11px] text-blue-600 hover:underline font-semibold flex items-center gap-1">
                <CheckCheck className="w-3 h-3" /> Mark all read
              </button>
            )}
            <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-full text-slate-400">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* List */}
        <div className="overflow-y-auto flex-1">
          {notifications.length === 0 ? (
            <div className="py-12 text-center">
              <Bell className="w-8 h-8 text-slate-200 mx-auto mb-2" />
              <p className="text-sm text-slate-400 font-medium">No notifications yet</p>
              <p className="text-xs text-slate-300 mt-1">Activity will appear here</p>
            </div>
          ) : (
            notifications.map(n => (
              <div
                key={n.id}
                onClick={() => { onMarkOne(n.id); if (n.view) onNavigate(n.view); onClose(); }}
                className={`flex items-start gap-3 px-5 py-3.5 border-b border-slate-50 cursor-pointer transition-colors hover:bg-slate-50 ${!n.read ? 'bg-blue-50/40' : ''}`}
              >
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  {typeIcon[n.type] || <Bell className="w-4 h-4 text-slate-400" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-700 leading-snug">{n.message}</p>
                  <p className="text-[10px] text-slate-400 font-medium mt-0.5">{n.time}</p>
                </div>
                {!n.read && <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1.5" />}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
