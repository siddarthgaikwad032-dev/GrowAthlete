import React, { useState } from 'react';
import { ArrowLeft, Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

const SUBJECTS = ['General Inquiry', 'Partnership Opportunity', 'Tournament Listing Request', 'Report a Bug', 'Press & Media', 'Career Opportunity', 'Other'];

function validate(form) {
  const errs = {};
  if (!form.name.trim()) errs.name = 'Name is required.';
  if (!form.email.trim()) errs.email = 'Email is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email address.';
  if (!form.subject) errs.subject = 'Please select a subject.';
  if (!form.message.trim()) errs.message = 'Message is required.';
  else if (form.message.trim().length < 20) errs.message = 'Message must be at least 20 characters.';
  return errs;
}

export default function Contact({ onBack }) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => {
    setForm(f => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors(err => ({ ...err, [k]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    // Simulate network delay — replace with real API call (EmailJS / Formspree / backend endpoint)
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
    // Store in localStorage for demo persistence
    const existing = JSON.parse(localStorage.getItem('ga_contact_messages') || '[]');
    existing.push({ ...form, submittedAt: new Date().toISOString() });
    localStorage.setItem('ga_contact_messages', JSON.stringify(existing));
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Hero */}
      <div className="bg-gradient-to-r from-teal-700 to-emerald-800 text-white py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <button onClick={onBack} className="flex items-center gap-2 text-sm font-semibold text-teal-200 hover:text-white transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <h1 className="text-4xl font-extrabold mb-2">Contact Us</h1>
          <p className="text-teal-100">Have a question, idea, or partnership proposal? We'd love to hear from you.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Contact Info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-extrabold text-slate-800 mb-4">Get in Touch</h2>
              <p className="text-sm text-slate-500 leading-relaxed">We typically respond within 24 hours on business days. For urgent technical issues, include "URGENT" in your subject line.</p>
            </div>
            {[
              { icon: Mail, label: 'Email', value: 'hello@growathlete.in', href: 'mailto:hello@growathlete.in' },
              { icon: Phone, label: 'Phone', value: '+91 98765 43210', href: 'tel:+919876543210' },
              { icon: MapPin, label: 'Office', value: 'GrowAthlete HQ, Koramangala, Bengaluru, Karnataka 560034' },
              { icon: Clock, label: 'Business Hours', value: 'Mon–Fri: 9 AM – 6 PM IST' },
            ].map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-start gap-3">
                <div className="w-9 h-9 bg-teal-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-teal-600" />
                </div>
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-wide text-slate-400">{label}</p>
                  {href ? (
                    <a href={href} className="text-sm font-semibold text-slate-700 hover:text-teal-600 transition-colors">{value}</a>
                  ) : (
                    <p className="text-sm font-semibold text-slate-700">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
              {submitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto border-2 border-green-200">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-800">Message Received!</h3>
                  <p className="text-sm text-slate-500 max-w-sm mx-auto">Thank you, <strong>{form.name}</strong>! We've received your message and will reply to <strong>{form.email}</strong> within 24 hours.</p>
                  <p className="text-xs text-slate-400 bg-amber-50 border border-amber-100 rounded-lg px-4 py-2 inline-block">
                    ℹ️ <strong>Demo notice:</strong> This is a frontend-only demo. In production, connect to an email service such as EmailJS, Formspree, or a backend endpoint.
                  </p>
                  <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }} className="mt-2 px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold rounded-xl transition-colors">
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <h2 className="text-xl font-extrabold text-slate-800 mb-6">Send a Message</h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Your Name *</label>
                      <input type="text" value={form.name} onChange={set('name')} placeholder="Full name" className={`w-full px-4 py-3 text-sm border rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all ${errors.name ? 'border-red-300 bg-red-50' : 'border-slate-200'}`} />
                      {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Email Address *</label>
                      <input type="email" value={form.email} onChange={set('email')} placeholder="you@email.com" className={`w-full px-4 py-3 text-sm border rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all ${errors.email ? 'border-red-300 bg-red-50' : 'border-slate-200'}`} />
                      {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Subject *</label>
                    <select value={form.subject} onChange={set('subject')} className={`w-full px-4 py-3 text-sm border rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all text-slate-700 ${errors.subject ? 'border-red-300 bg-red-50' : 'border-slate-200'}`}>
                      <option value="">Select a subject</option>
                      {SUBJECTS.map(s => <option key={s}>{s}</option>)}
                    </select>
                    {errors.subject && <p className="text-xs text-red-500 mt-1">{errors.subject}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Message *</label>
                    <textarea value={form.message} onChange={set('message')} placeholder="Tell us what's on your mind... (minimum 20 characters)" rows={5} className={`w-full px-4 py-3 text-sm border rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all resize-none ${errors.message ? 'border-red-300 bg-red-50' : 'border-slate-200'}`} />
                    <div className="flex justify-between items-center mt-1">
                      {errors.message ? <p className="text-xs text-red-500">{errors.message}</p> : <span />}
                      <span className="text-xs text-slate-400">{form.message.length} chars</span>
                    </div>
                  </div>

                  <button type="submit" disabled={loading} className="w-full py-3.5 bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm text-sm">
                    {loading ? (
                      <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Sending...</>
                    ) : (
                      <><Send className="w-4 h-4" /> Send Message</>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
