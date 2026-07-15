const BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';

function getToken() {
  return localStorage.getItem('ga_token');
}

function setToken(t) {
  if (t) localStorage.setItem('ga_token', t);
  else localStorage.removeItem('ga_token');
}

async function request(path, opts = {}) {
  const headers = opts.headers || {};
  const token = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;
  headers['Content-Type'] = 'application/json';
  const res = await fetch(BASE + path, { ...opts, headers });
  const text = await res.text();
  try { const json = text ? JSON.parse(text) : null; if (!res.ok) throw json || { error: 'Request failed' }; return json; } catch (err) { throw err; }
}

export async function signup(payload) { return request('/auth/signup', { method: 'POST', body: JSON.stringify(payload) }); }
export async function login(payload) { return request('/auth/login', { method: 'POST', body: JSON.stringify(payload) }); }
export async function googleSignIn(idToken) { return request('/auth/google', { method: 'POST', body: JSON.stringify({ idToken }) }); }

export async function getPosts() { return request('/posts'); }
export async function createPost(payload) { return request('/posts', { method: 'POST', body: JSON.stringify(payload) }); }
export async function likePost(postId) { return request(`/posts/${postId}/like`, { method: 'POST' }); }
export async function savePost(postId) { return request(`/posts/${postId}/save`, { method: 'POST' }); }
export async function addComment(postId, content) { return request(`/posts/${postId}/comment`, { method: 'POST', body: JSON.stringify({ content }) }); }
export async function incrementView(postId) { return request(`/posts/${postId}/view`, { method: 'POST' }); }
export async function getSavedPosts(userId) { return request(`/posts/saved/user/${userId}`); }
export async function getComments(postId) { return request(`/posts/${postId}/comments`); }

export async function getUser(userId) { return request(`/users/${userId}`); }
export async function updateUser(userId, payload) { return request(`/users/${userId}`, { method: 'PUT', body: JSON.stringify(payload) }); }
export async function getUserPosts(userId) { return request(`/users/${userId}/posts`); }
export async function followUser(userId) { return request(`/users/${userId}/follow`, { method: 'POST' }); }
export async function getFollowers(userId) { return request(`/users/${userId}/followers`); }
export async function getNotifications() { return request('/notifications'); }
export async function markNotificationRead(id) { return request(`/notifications/${id}/read`, { method: 'POST' }); }
export async function markAllNotificationsRead() { return request('/notifications/mark-all', { method: 'POST' }); }

export { getToken, setToken };

export default {
  BASE,
  getToken,
  setToken,
  signup,
  login,
  googleSignIn,
  getPosts,
  createPost,
  likePost,
  savePost,
  addComment,
  incrementView,
  getSavedPosts,
  getComments,
  getUser,
  updateUser,
  getUserPosts,
  followUser,
  getFollowers,
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead
};
