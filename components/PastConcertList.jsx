// components/PastConcertList.jsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarDaysIcon, MapPinIcon, XMarkIcon, MusicalNoteIcon, ArchiveBoxIcon } from '@heroicons/react/24/outline';

const FALLBACK = '/backgrounds/members-photo.jpg';
function cleanUrl(url) {
  if (!url?.trim()) return FALLBACK;
  if (url.includes('drive.google.com')) {
    const m = url.match(/\/d\/(.*?)\//);
    if (m?.[1]) return `https://drive.google.com/uc?export=view&id=${m[1]}`;
  }
  return url;
}

function PastModal({ data, onClose }) {
  if (!data) return null;
  const { Title, Date: ds, Programme, Description, Venue, ShowImage } = data;
  const d = new Date(ds);
  const fullDate = !isNaN(d.getTime()) ? d.toLocaleDateString('en-GB', { weekday:'long', day:'numeric', month:'long', year:'numeric' }) : ds;
  const programmeList = Programme ? Programme.split(',').map(s => s.trim()) : [];

  return (
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <motion.div initial={{ scale:0.95, y:20 }} animate={{ scale:1, y:0 }} exit={{ scale:0.95, y:20 }}
        className="relative w-full max-w-4xl bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-700 flex flex-col md:flex-row max-h-[90vh]"
        onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 z-20 p-2 bg-black/50 rounded-full text-white">
          <XMarkIcon className="w-6 h-6" />
        </button>
        <div className="w-full md:w-2/5 h-48 md:h-auto relative bg-slate-800">
          <Image src={cleanUrl(ShowImage)} alt={Title} fill sizes="40vw" className="object-cover grayscale" />
        </div>
        <div className="w-full md:w-3/5 p-8 overflow-y-auto">
          <p className="flex items-center gap-2 text-slate-400 font-bold tracking-wider text-sm mb-2">
            <ArchiveBoxIcon className="w-5 h-5" /> ARCHIVED EVENT
          </p>
          <h2 className="text-3xl font-bold text-white mb-2">{Title}</h2>
          <p className="text-violet-400 font-medium mb-6 flex items-center gap-2">
            <CalendarDaysIcon className="w-5 h-5" /> {fullDate}
          </p>
          {programmeList.length > 0 && (
            <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700 mb-6">
              <h4 className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase mb-3">
                <MusicalNoteIcon className="w-4 h-4" /> Repertoire
              </h4>
              <ul className="space-y-2">
                {programmeList.map((p, i) => (
                  <li key={i} className="text-slate-200 text-sm italic border-b border-slate-700/50 last:border-0 pb-1">{p}</li>
                ))}
              </ul>
            </div>
          )}
          {Description && <p className="text-slate-300 leading-relaxed">{Description}</p>}
          <p className="mt-8 flex items-center gap-2 text-sm text-slate-500">
            <MapPinIcon className="w-4 h-4" /> Performed at {Venue}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function PastConcertList({ concerts }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {concerts.map((c, i) => {
          const d = new Date(c.Date);
          const year = !isNaN(d.getTime()) ? d.getFullYear() : '';
          const dateStr = !isNaN(d.getTime()) ? d.toLocaleDateString('en-GB', { month:'long', day:'numeric' }) : c.Date;
          const preview = c.Programme ? c.Programme.split(',').slice(0,2).join(', ') + (c.Programme.split(',').length > 2 ? '...' : '') : '';

          return (
            <div key={i} onClick={() => setSelected(c)}
              className="group bg-slate-900 border border-slate-800 rounded-xl overflow-hidden cursor-pointer hover:border-violet-500/50 hover:shadow-2xl transition-all flex flex-col h-full">
              <div className="h-48 overflow-hidden relative bg-slate-800">
                <Image src={cleanUrl(c.ShowImage)} alt={c.Title} fill sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
                <span className="absolute top-0 right-0 bg-slate-900/80 backdrop-blur px-3 py-1 m-2 rounded text-xs font-bold text-white border border-slate-700">
                  {year}
                </span>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <p className="text-violet-400 text-sm font-medium mb-1">{dateStr}</p>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-violet-300 transition-colors">{c.Title}</h3>
                {preview && <p className="text-slate-400 text-sm line-clamp-2 mb-4 italic">&quot;{preview}&quot;</p>}
                <div className="mt-auto pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1"><MapPinIcon className="w-3 h-3" /> {c.Venue}</span>
                  <span className="group-hover:text-white transition-colors">View Details →</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <AnimatePresence>
        {selected && <PastModal data={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </>
  );
}
