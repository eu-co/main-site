// =============================================================================
// components/ConcertList.jsx — Client Component (modal state + animation)
// =============================================================================
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CalendarDaysIcon, MapPinIcon, ClockIcon,
  TicketIcon, XMarkIcon, MusicalNoteIcon,
} from '@heroicons/react/24/outline';

function getCleanImageUrl(url) {
  const FALLBACK = 'https://images.unsplash.com/photo-1519683109079-d5f539e1542f?q=80&w=2670&auto=format&fit=crop';
  if (!url || url.trim() === '') return FALLBACK;
  if (url.includes('drive.google.com')) {
    const match = url.match(/\/d\/(.*?)\//);
    if (match?.[1]) return `https://drive.google.com/uc?export=view&id=${match[1]}`;
  }
  return url;
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

// ── Modal ────────────────────────────────────────────────────────────────────
function ConcertModal({ data, onClose }) {
  if (!data) return null;
  const { Title, Date: dateStr, Time, Programme, Description, Venue, City, TicketLink, ShowImage } = data;
  const img = getCleanImageUrl(ShowImage);
  const programmeList = Programme ? Programme.split(',').map(s => s.trim()) : [];

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="relative w-full max-w-4xl bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-700 flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white">
          <XMarkIcon className="w-6 h-6" />
        </button>

        <div className="w-full md:w-2/5 h-48 md:h-auto relative">
          <Image src={img} alt={Title} fill sizes="40vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent md:bg-gradient-to-r" />
        </div>

        <div className="w-full md:w-3/5 p-8 overflow-y-auto">
          <p className="flex items-center gap-2 text-blue-400 font-bold tracking-wider text-sm mb-2">
            <CalendarDaysIcon className="w-5 h-5" /> {formatDate(dateStr)}
          </p>
          <h2 className="text-3xl font-bold text-white mb-4">{Title}</h2>
          <div className="flex flex-wrap gap-4 text-slate-300 text-sm mb-6">
            {Time && <span className="flex items-center gap-1"><ClockIcon className="w-4 h-4 text-blue-500" /> {Time}</span>}
            <span className="flex items-center gap-1"><MapPinIcon className="w-4 h-4 text-blue-500" /> {Venue}{City ? `, ${City}` : ''}</span>
          </div>

          {programmeList.length > 0 && (
            <div className="bg-slate-800/50 p-4 rounded-xl border-l-4 border-blue-500 mb-6">
              <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Programme</h4>
              <ul className="space-y-1">
                {programmeList.map((item, i) => (
                  <li key={i} className="text-slate-200 italic font-medium">{item}</li>
                ))}
              </ul>
            </div>
          )}

          {Description && <p className="text-slate-300 leading-relaxed mb-8">{Description}</p>}

          {TicketLink ? (
            <a href={TicketLink} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg">
              <TicketIcon className="w-6 h-6" /> Book Tickets Now
            </a>
          ) : (
            <p className="text-center text-slate-500 italic pt-6 border-t border-slate-700">Tickets available soon.</p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Concert Row ──────────────────────────────────────────────────────────────
function ConcertRow({ concert, onOpen }) {
  const { Title, Date: dateStr, Time, Venue, Programme, TicketLink } = concert;
  const d = new Date(dateStr);
  const day = !isNaN(d.getTime()) ? d.getDate() : '';
  const month = !isNaN(d.getTime()) ? d.toLocaleString('default', { month: 'short' }).toUpperCase() : '';
  const programmeList = Programme ? Programme.split(',').map(s => s.trim()) : [];

  return (
    <div
      onClick={() => onOpen(concert)}
      className="group bg-slate-900/50 border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-blue-500/30 hover:bg-slate-800/80 cursor-pointer transition-all flex flex-col md:flex-row gap-8 items-start md:items-center"
    >
      <div className="flex-shrink-0 flex md:flex-col items-center gap-2 md:gap-0 bg-slate-800 group-hover:bg-slate-700 transition-colors rounded-xl p-4 min-w-[100px] text-center border border-slate-700">
        <span className="text-2xl md:text-3xl font-bold text-white">{day}</span>
        <span className="text-sm md:text-base text-blue-400 font-bold uppercase">{month}</span>
      </div>
      <div className="flex-grow">
        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">{Title}</h3>
        <div className="flex items-center gap-4 text-slate-400 text-sm mb-4">
          {Time && <span className="flex items-center gap-1"><ClockIcon className="w-4 h-4" /> {Time}</span>}
          <span className="flex items-center gap-1"><MapPinIcon className="w-4 h-4" /> {Venue}</span>
        </div>
        {programmeList.length > 0 && (
          <p className="text-slate-300 text-sm italic">
            <span className="text-blue-500 font-bold not-italic text-xs uppercase tracking-wide mr-2">Featuring:</span>
            {programmeList.join(' • ')}
          </p>
        )}
      </div>
      <div className="flex-shrink-0">
        {TicketLink ? (
          <a href={TicketLink} target="_blank" rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full shadow-lg text-sm">
            <TicketIcon className="w-5 h-5" /> Tickets
          </a>
        ) : (
          <span className="inline-flex items-center gap-2 px-6 py-2 bg-slate-700 text-slate-400 font-semibold rounded-full text-sm">
            <ClockIcon className="w-5 h-5" /> Soon
          </span>
        )}
      </div>
    </div>
  );
}

// ── Main Export ───────────────────────────────────────────────────────────────
export default function ConcertList({ concerts }) {
  const [selected, setSelected] = useState(null);

  const chamber = concerts.filter(c => c.Title?.toLowerCase().includes('chamber'));
  const orchestra = concerts.filter(c => !c.Title?.toLowerCase().includes('chamber'));

  return (
    <>
      {orchestra.length > 0 && (
        <div className="max-w-5xl mx-auto mb-20">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px bg-slate-800 flex-1" />
            <h3 className="text-2xl font-bold text-white uppercase tracking-widest">Orchestra Season</h3>
            <div className="h-px bg-slate-800 flex-1" />
          </div>
          <div className="space-y-6">
            {orchestra.map((c, i) => <ConcertRow key={i} concert={c} onOpen={setSelected} />)}
          </div>
        </div>
      )}

      {chamber.length > 0 && (
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px bg-slate-800 flex-1" />
            <h3 className="text-2xl font-bold text-blue-400 uppercase tracking-widest flex items-center gap-3">
              <MusicalNoteIcon className="w-6 h-6" /> Chamber Series
            </h3>
            <div className="h-px bg-slate-800 flex-1" />
          </div>
          <div className="space-y-6">
            {chamber.map((c, i) => <ConcertRow key={i} concert={c} onOpen={setSelected} />)}
          </div>
        </div>
      )}

      <AnimatePresence>
        {selected && <ConcertModal data={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </>
  );
}
