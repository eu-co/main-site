// app/(main)/contact-us/page.jsx — All contact functionality on one page
import { SITE_CONFIG } from '@/lib/config';
import ContactForm from '@/components/ContactForm';
import SignupForm from '@/components/SignupForm';
import FAQAccordion from '@/components/FAQAccordion';

export const metadata = {
  title: 'Contact',
  description: 'Get in touch with EUCO. Send us a message, find answers to FAQs, or join our mailing list.',
  alternates: { canonical: '/contact-us' },
};

const faqData = [
  { q: 'When and where are rehearsals?', a: 'Rehearsals are held weekly on Tuesday evenings from 6:15 PM to 9:15 PM at the Reid Music Hall. We also have occasional sectional rehearsals on weekends leading up to a concert.' },
  { q: 'What is the attendance policy?', a: 'We expect members to attend all rehearsals. We understand that academic commitments can arise, so we allow for a certain number of excused absences per term. Please communicate any potential absences with your section principal in advance.' },
  { q: 'Are there any membership fees?', a: 'Yes, there is a small membership fee collected at the beginning of each semester. This fee helps cover costs such as music hire, venue booking, and conductor fees. Financial assistance is available if needed.' },
  { q: 'What kind of social events do you have?', a: 'We have a vibrant social calendar! This includes post-rehearsal pub trips, a formal music ball, a yearly ceilidh, and other fun events throughout the year.' },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      {/* Header */}
      <div className="py-20 px-6 text-center border-b border-slate-800">
        <p className="text-blue-400 text-xs font-bold tracking-[0.4em] uppercase mb-6">Get in touch</p>
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Contact Us</h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          Whether you are a prospective member, a potential sponsor, or a loyal audience member — we are here to help.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Contact Form + Quick Links Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {/* Quick links */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-4">Quick links</h2>
            <a href={SITE_CONFIG.contact.instagramDM}
              className="flex items-center gap-4 p-5 rounded-xl border border-slate-800 hover:border-blue-500/30 hover:bg-slate-800/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-400">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.057 1.644-.069 4.85-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12s.014 3.668.072 4.948c.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24s3.668-.014 4.948-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </div>
              <div>
                <p className="font-semibold text-white">Message us on Instagram</p>
                <p className="text-sm text-slate-400">Quickest response for general queries</p>
              </div>
            </a>
            <a href={`mailto:${SITE_CONFIG.contact.email}`}
              className="flex items-center gap-4 p-5 rounded-xl border border-slate-800 hover:border-blue-500/30 hover:bg-slate-800/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              </div>
              <div>
                <p className="font-semibold text-white">{SITE_CONFIG.contact.email}</p>
                <p className="text-sm text-slate-400">For formal enquiries and sponsorship</p>
              </div>
            </a>
          </div>

          {/* Form */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Send a message</h2>
            <ContactForm />
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-white mb-8">Frequently asked questions</h2>
          <FAQAccordion items={faqData} />
          <div className="mt-6 text-center">
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSe9Ln-8lq-9UX1C8SskSfX3zguY-__xLYeUj-S2j-ePVgZsVQ/viewform"
              target="_blank" rel="noopener noreferrer"
              className="text-blue-400 text-sm hover:text-blue-300 transition-colors">
              Absence form for current members →
            </a>
          </div>
        </div>

        {/* Mailing list */}
        <SignupForm />
      </div>
    </main>
  );
}
