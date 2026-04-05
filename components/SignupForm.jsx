// components/SignupForm.jsx
'use client';

import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { SITE_CONFIG } from '@/lib/config';

export default function SignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ state: null, message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus({ state: 'sending', message: 'Sending...' });

    emailjs.send(
      SITE_CONFIG.emailjs.serviceId,
      SITE_CONFIG.emailjs.templateId,
      { name, email, message: `New mailing list subscriber:\nName: ${name}\nEmail: ${email}` },
      SITE_CONFIG.emailjs.publicKey,
    ).then(() => {
      setStatus({ state: 'success', message: 'Subscribed! Thank you.' });
      setName(''); setEmail('');
    }).catch(() => {
      setStatus({ state: 'error', message: 'Failed to subscribe. Please try again.' });
    });
  };

  return (
    <div className="bg-gray-800 py-20">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-white">Join Our Mailing List</h2>
        <p className="text-gray-300 mt-2">Get updates on concerts, tickets, and special events.</p>
        <form onSubmit={handleSubmit} className="mt-4 max-w-lg mx-auto">
          <div className="flex flex-col md:flex-row justify-center items-center gap-2">
            <input type="text" placeholder="Your Name" required value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full md:w-auto px-4 py-2 text-gray-800 bg-gray-100 rounded-md" />
            <input type="email" placeholder="Your email address" required value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full md:w-auto px-4 py-2 text-gray-800 bg-gray-100 rounded-md" />
            <button type="submit" disabled={status.state === 'sending'}
              className="w-full md:w-auto px-6 py-2 bg-blue-600 text-black font-bold rounded-md hover:bg-blue-500 transition-colors disabled:bg-gray-500">
              Subscribe
            </button>
          </div>
          {status.state === 'success' && <p className="text-green-400 mt-2">{status.message}</p>}
          {status.state === 'error' && <p className="text-red-400 mt-2">{status.message}</p>}
        </form>
      </div>
    </div>
  );
}
