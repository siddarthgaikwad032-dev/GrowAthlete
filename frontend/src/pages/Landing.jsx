import React, { useState } from 'react';
import { Users, FileText, Smartphone, Phone, Globe, X, Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import PolicyModal from '../components/PolicyModal';
// ── SVG Logos ──────────────────────────────────────────────────────────────
const GoogleIcon = () => (
  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.03-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

const MicrosoftIcon = () => (
  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 23 23">
    <path fill="#f35325" d="M0 0h11v11H0z" />
    <path fill="#81bc06" d="M12 0h11v11H12z" />
    <path fill="#05a6f0" d="M0 12h11v11H0z" />
    <path fill="#ffba08" d="M12 12h11v11H12z" />
  </svg>
);

// ── Divider ─────────────────────────────────────────────────────────────────
const OrDivider = ({ label = 'or' }) => (
  <div className="flex items-center gap-3 my-2">
    <div className="flex-1 h-px bg-slate-200" />
    <span className="text-xs text-slate-400 font-semibold uppercase tracking-wide">{label}</span>
    <div className="flex-1 h-px bg-slate-200" />
  </div>
);

// ── Social Buttons ───────────────────────────────────────────────────────────
const SocialButtons = ({ onGoogle, onMicrosoft, onSuccess }) => (
  <div className="space-y-3">
    <button
      type="button"
      onClick={onGoogle || onSuccess}
      className="w-full flex items-center gap-3 px-4 py-3 border border-slate-300 rounded-xl bg-white hover:bg-slate-50 hover:border-slate-400 transition-all text-sm font-medium text-slate-700 shadow-sm"
    >
      <GoogleIcon />
      <span>Continue with Google</span>
    </button>
    <button
      type="button"
      onClick={onMicrosoft || onSuccess}
      className="w-full flex items-center gap-3 px-4 py-3 border border-slate-300 rounded-xl bg-white hover:bg-slate-50 hover:border-slate-400 transition-all text-sm font-medium text-slate-700 shadow-sm"
    >
      <MicrosoftIcon />
      <span>Continue with Microsoft</span>
    </button>
  </div>
);

// ── Login Modal ──────────────────────────────────────────────────────────────
function LoginModal({ onClose, onSuccess, onSwitchToSignUp, onGoogleSignIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) { setError('Please fill in all fields.'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    
    // Mock login since there's no backend
    setError('');
    onSuccess({
      name: email.split('@')[0],
      email: email,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop'
    });
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">Welcome back</h2>
            <p className="text-sm text-slate-500 mt-1">Sign in to your GrowAthlete account</p>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 pb-6 space-y-4">
          {/* Social */}
          <SocialButtons onGoogle={onGoogleSignIn} onSuccess={onSuccess} />

          <OrDivider label="or sign in with email" />

          {/* Email form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {error && <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>}

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type={showPw ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-3 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <div className="text-right">
              <a href="#" className="text-xs text-blue-600 hover:underline font-medium">Forgot password?</a>
            </div>

            <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-sm text-sm">
              Sign In
            </button>
          </form>

          <p className="text-center text-sm text-slate-600">
            Don't have an account?{' '}
            <button onClick={onSwitchToSignUp} className="text-blue-600 font-bold hover:underline">
              Create account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Sign Up Modal ────────────────────────────────────────────────────────────
function SignUpModal({ onClose, onSuccess, onSwitchToLogin, onGoogleSignIn }) {
  const [form, setForm] = useState({ name: '', email: '', password: '', sport: 'Basketball' });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email || !form.password) { setError('Please fill in all required fields.'); return; }
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    
    // Mock signup since there's no backend
    setError('');
    onSuccess({
      name: form.name.trim(),
      email: form.email,
      sport: form.sport,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop'
    });
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">Create account</h2>
            <p className="text-sm text-slate-500 mt-1">Join thousands of athletes on GrowAthlete</p>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 pb-6 space-y-4">
          {/* Social */}
          <SocialButtons onGoogle={onGoogleSignIn} onSuccess={() => onSuccess(null)} />

          <OrDivider label="or create with email" />

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {error && <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>}

            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Full name"
                value={form.name}
                onChange={set('name')}
                className="w-full pl-10 pr-4 py-3 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                placeholder="Email address"
                value={form.email}
                onChange={set('email')}
                className="w-full pl-10 pr-4 py-3 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type={showPw ? 'text' : 'password'}
                placeholder="Password (min. 6 characters)"
                value={form.password}
                onChange={set('password')}
                className="w-full pl-10 pr-10 py-3 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <select
              value={form.sport}
              onChange={set('sport')}
              className="w-full px-4 py-3 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-700"
            >
              {['Basketball','Football','Cricket','Badminton','Athletics','Tennis','Running','Volleyball','Kabaddi'].map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

            <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-sm text-sm">
              Create Account
            </button>
          </form>

          <p className="text-xs text-slate-400 text-center">
            By signing up you agree to our policies.
          </p>

          <p className="text-center text-sm text-slate-600">
            Already have an account?{' '}
            <button onClick={onSwitchToLogin} className="text-blue-600 font-bold hover:underline">
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Google Account Selection Modal ───────────────────────────────────────────
function GoogleAccountModal({ onClose, onSuccess }) {
  const accounts = [
    { name: 'Ethan Foster', email: 'ethan.foster@gmail.com', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop' },
    { name: 'Ethan Foster (Work)', email: 'ethan.work@company.com', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop' }
  ];

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl border border-slate-200 overflow-hidden">
        <div className="px-6 pt-6 pb-4 flex items-center justify-center border-b border-slate-100 relative">
          <button onClick={onClose} className="absolute left-4 p-1.5 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <GoogleIcon />
            <h2 className="text-lg font-extrabold text-slate-800">Sign in with Google</h2>
          </div>
        </div>

        <div className="p-2 space-y-1">
          <div className="px-4 py-2 text-sm text-slate-500 font-medium text-center">Choose an account to continue</div>
          {accounts.map((acc, i) => (
            <button 
              key={i} 
              onClick={() => onSuccess(acc)}
              className="w-full flex items-center gap-4 px-4 py-3 hover:bg-slate-50 transition-colors rounded-lg text-left"
            >
              <img src={acc.avatar} className="w-10 h-10 rounded-full object-cover border border-slate-200" />
              <div>
                <div className="text-sm font-bold text-slate-800">{acc.name}</div>
                <div className="text-xs text-slate-500">{acc.email}</div>
              </div>
            </button>
          ))}
          <button 
            onClick={() => onSuccess(accounts[0])}
            className="w-full flex items-center gap-4 px-4 py-3 hover:bg-slate-50 transition-colors rounded-lg text-left"
          >
            <div className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-500">
              <User className="w-5 h-5" />
            </div>
            <div className="text-sm font-bold text-slate-800">Use another account</div>
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Landing Page ─────────────────────────────────────────────────────────────
export default function Landing({ onLogin, onNavigate }) {
  // 'none' | 'login' | 'signup' | 'google_select'
  const [modal, setModal] = useState('none');
  const [policyType, setPolicyType] = useState(null);

  const close = () => setModal('none');

  // Mock Google sign in
  const handleGoogleClick = () => {
    setModal('google_select');
  };

  const handleLoginSuccess = (userData) => {
    onLogin(userData || {
      name: 'Ethan Foster',
      email: 'ethan.foster@growathlete.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop'
    });
    close();
  };

  const handleSignUpSuccess = (userData) => {
    onLogin(userData);
    close();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">

      {/* ── Header ── */}
      <header className="border-b border-slate-100 sticky top-0 bg-white z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-800 rounded-lg flex items-center justify-center text-white shadow-md">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M19.5 9.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5M16 12.2l-.7 2.1-2.8-2.8-1.5 1.5 2.5 2.5-.7 2.1c-.2.7-.9 1.1-1.6.9L7 15.6V21h-2v-6.6l4.2.9 1.3-4-2-2v4H6.5V7.5L10 4c.4-.4 1-.4 1.4 0l3 3 2.1-.7c.7-.2 1.4.2 1.6.9.2.8-.2 1.5-.9 1.7l-1.2.3z" />
              </svg>
            </div>
            <div className="flex items-baseline text-2xl font-bold tracking-tight">
              <span className="text-orange-500">Grow</span>
              <span className="text-slate-900 ml-0.5">Athlete</span>
            </div>
          </div>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { icon: <Users className="w-5 h-5" />, label: 'About Us', view: 'about' },
              { icon: <FileText className="w-5 h-5" />, label: 'Articles', view: 'articles' },
              { icon: <Smartphone className="w-5 h-5" />, label: 'Get the app', view: 'getapp' },
              { icon: <Phone className="w-5 h-5" />, label: 'Contact Us', view: 'contact' },
              { icon: <Globe className="w-5 h-5" />, label: 'Blogs', view: 'blog' },
            ].map(({ icon, label, view }) => (
              <button key={label} onClick={() => onNavigate(view)} className="flex flex-col items-center text-slate-500 hover:text-slate-900 transition-colors group">
                <span className="text-slate-400 group-hover:text-slate-800">{icon}</span>
                <span className="text-[11px] font-medium mt-1">{label}</span>
              </button>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setModal('login')}
              className="px-5 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 hover:border-slate-400 transition-colors"
            >
              Login
            </button>
            <button
              onClick={() => setModal('signup')}
              className="px-5 py-2 text-sm font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm transition-colors"
            >
              Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <main className="flex-1 flex items-center py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-extrabold text-slate-900 leading-tight mb-8">
                Empowering Young Sports Talents Across India
              </h1>

              <div className="space-y-3 max-w-md">
                <button
                  onClick={() => handleGoogleClick()}
                  className="w-full flex items-center justify-center gap-3 px-6 py-3.5 border border-slate-300 rounded-full bg-white hover:bg-slate-50 hover:border-slate-400 transition-all font-medium text-slate-700 shadow-sm"
                >
                  <GoogleIcon />
                  <span>Continue with Google</span>
                </button>
                <button
                  onClick={() => setModal('signup')}
                  className="w-full flex items-center justify-center gap-3 px-6 py-3.5 border border-slate-300 rounded-full bg-white hover:bg-slate-50 hover:border-slate-400 transition-all font-medium text-slate-700 shadow-sm"
                >
                  <MicrosoftIcon />
                  <span>Continue with Microsoft</span>
                </button>
                <button
                  onClick={() => setModal('signup')}
                  className="w-full flex items-center justify-center gap-3 px-6 py-3.5 border border-slate-300 rounded-full bg-white hover:bg-slate-50 hover:border-slate-400 transition-all font-medium text-slate-700 shadow-sm"
                >
                  <Mail className="w-5 h-5 text-slate-500" />
                  <span>Sign up with Email</span>
                </button>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed mt-6 max-w-sm">
                By clicking Continue to join or sign in, you agree to GrowAthlete's{' '}
                <button onClick={() => setPolicyType('User Agreement')} className="text-blue-600 hover:underline font-medium">User Agreement</button>,{' '}
                <button onClick={() => setPolicyType('Privacy Policy')} className="text-blue-600 hover:underline font-medium">Privacy Policy</button>, and{' '}
                <button onClick={() => setPolicyType('Cookie Policy')} className="text-blue-600 hover:underline font-medium">Cookie Policy</button>.
              </p>

              <div className="mt-6 text-sm text-slate-700">
                Already on GrowAthlete?{' '}
                <button onClick={() => setModal('login')} className="text-blue-600 hover:underline font-semibold">
                  Sign in
                </button>
              </div>
            </div>

            {/* Right */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative w-full max-w-md lg:max-w-lg aspect-square sm:aspect-[4/3] lg:aspect-square overflow-hidden rounded-2xl shadow-xl border border-slate-100">
                <img
                  src="/soccer_player_hero.png"
                  alt="Young Soccer Player Controlling Ball"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop'; }}
                />
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-100 bg-slate-50 py-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-6">
            Trusted by Top Organizations and Brands
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 grayscale hover:opacity-60 transition-opacity">
            {['SPORTS INDIA','ATHLETICS CLUB','NOC INDIA','KICKSTART','PULSE SPORTS'].map(b => (
              <span key={b} className="font-extrabold text-lg text-slate-700">{b}</span>
            ))}
          </div>
        </div>
      </footer>

      {/* ── Modals ── */}
      {modal === 'login' && (
        <LoginModal
          onClose={close}
          onSuccess={handleLoginSuccess}
          onGoogleSignIn={handleGoogleClick}
          onSwitchToSignUp={() => setModal('signup')}
        />
      )}
      {modal === 'signup' && (
        <SignUpModal
          onClose={close}
          onSuccess={handleSignUpSuccess}
          onGoogleSignIn={handleGoogleClick}
          onSwitchToLogin={() => setModal('login')}
        />
      )}
      {modal === 'google_select' && (
        <GoogleAccountModal
          onClose={close}
          onSuccess={handleLoginSuccess}
        />
      )}
      {policyType && (
        <PolicyModal type={policyType} onClose={() => setPolicyType(null)} />
      )}

    </div>
  );
}
