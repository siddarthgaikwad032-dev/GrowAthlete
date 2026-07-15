import React from 'react';
import { X } from 'lucide-react';

const policies = {
  'User Agreement': `GROWATHLETE USER AGREEMENT

Last updated: July 2024

1. ACCEPTANCE OF TERMS
By accessing or using GrowAthlete, you agree to be bound by these Terms.

2. DESCRIPTION OF SERVICE
GrowAthlete is a digital platform for young athletes in India to showcase their talent, connect with coaches, follow sports news, and discover tournaments.

3. USER ACCOUNTS
You are responsible for maintaining the confidentiality of your account credentials. You must provide accurate and complete information when creating an account.

4. ACCEPTABLE USE
You agree not to: post offensive or harmful content, impersonate others, spam other users, or use the platform for any unlawful purpose.

5. CONTENT OWNERSHIP
You retain ownership of content you post. By posting, you grant GrowAthlete a non-exclusive licence to display your content on the platform.

6. TERMINATION
GrowAthlete reserves the right to suspend or terminate accounts that violate these terms.

7. CHANGES TO TERMS
We may update these terms periodically. Continued use after changes constitutes acceptance.

8. CONTACT
For queries, email: legal@growathlete.in`,

  'Privacy Policy': `GROWATHLETE PRIVACY POLICY

Last updated: July 2024

1. INFORMATION WE COLLECT
We collect information you provide (name, email, sport, location) and usage data (pages visited, interactions).

2. HOW WE USE YOUR INFORMATION
- To personalise your experience
- To display your profile to relevant coaches and scouts
- To send platform updates and notifications
- To improve our services

3. DATA SHARING
We do not sell your personal data. We may share data with trusted service partners for platform operations.

4. DATA SECURITY
We implement industry-standard security measures to protect your data.

5. YOUR RIGHTS
You have the right to access, correct, or delete your personal data by contacting us at privacy@growathlete.in.

6. COOKIES
We use cookies to maintain session state and improve user experience. You can control cookie settings in your browser.

7. CONTACT
privacy@growathlete.in`,

  'Cookie Policy': `GROWATHLETE COOKIE POLICY

Last updated: July 2024

1. WHAT ARE COOKIES
Cookies are small text files stored on your device to help websites remember your preferences.

2. COOKIES WE USE
- Session cookies: Keep you logged in during your visit
- Preference cookies: Remember your settings and filters
- Analytics cookies: Help us understand how the platform is used

3. MANAGING COOKIES
You can disable cookies in your browser settings. Note that disabling cookies may affect platform functionality.

4. CONSENT
By continuing to use GrowAthlete, you consent to our use of cookies as described in this policy.

5. CONTACT
For cookie-related queries: privacy@growathlete.in`,
};

export default function PolicyModal({ type, onClose }) {
  if (!type) return null;
  const content = policies[type] || 'Policy content not available.';

  return (
    <div
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl border border-slate-200 flex flex-col max-h-[80vh]">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between flex-shrink-0">
          <h3 className="font-extrabold text-slate-800 text-base">{type}</h3>
          <button onClick={onClose} className="p-1.5 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          <pre className="text-xs text-slate-600 leading-relaxed whitespace-pre-wrap font-sans">{content}</pre>
        </div>
        <div className="px-6 py-4 border-t border-slate-100 flex justify-end flex-shrink-0">
          <button onClick={onClose} className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-colors">
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
