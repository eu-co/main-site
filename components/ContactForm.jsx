'use client';
import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { SITE_CONFIG } from '@/lib/config';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    emailjs.send(
      SITE_CONFIG.emailjs.serviceId, SITE_CONFIG.emailjs.templateId,
      { from_name: form.name, from_email: form.email, message: form.message },
      SITE_CONFIG.emailjs.publicKey,
    ).then(() => {
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    }).catch(() => setStatus('error'));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Full name</label>
        <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
          className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2.5 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
        <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
          className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2.5 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Message</label>
        <textarea rows="4" required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
          className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2.5 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <button type="submit" disabled={status === 'sending'}
        className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-500 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed">
        {status === 'sending' ? 'Sending...' : 'Send message'}
      </button>
      {status === 'success' && <p className="text-green-400 text-center text-sm">Message sent! Thank you.</p>}
      {status === 'error' && <p className="text-red-400 text-center text-sm">Failed to send. Please try again or message us on Instagram.</p>}
    </form>
  );
}
