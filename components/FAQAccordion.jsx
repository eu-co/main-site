'use client';
import { useState } from 'react';

export default function FAQAccordion({ items }) {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className={`rounded-xl border transition-all ${openIdx === i ? 'border-blue-500/30 bg-slate-900' : 'border-slate-800'}`}>
          <button onClick={() => setOpenIdx(openIdx === i ? null : i)}
            className="w-full flex justify-between items-center text-left p-5">
            <span className="font-semibold text-white pr-4">{item.q}</span>
            <svg className={`w-5 h-5 text-blue-400 flex-shrink-0 transition-transform ${openIdx === i ? 'rotate-180' : ''}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div className={`accordion-content ${openIdx === i ? 'open' : ''}`}>
            <div className="accordion-inner">
              <p className="px-5 pb-5 text-slate-400 leading-relaxed">{item.a}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
