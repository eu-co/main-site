// =============================================================================
// lib/data.js — Server-side data fetching (runs at BUILD TIME, not in browser)
// =============================================================================
//
// KEY ARCHITECTURE CHANGE:
// ────────────────────────
// OLD (CRA): useGoogleSheet hook fetches CSV on EVERY page load in the browser.
//            → Slow: 500ms-2s visible loading spinner on each visit.
//            → Fragile: If Google is slow, your site is slow.
//
// NEW (Next.js): These functions run at BUILD TIME on the server.
//            → The HTML is pre-rendered with the data already embedded.
//            → Users see content instantly — zero loading spinners.
//            → revalidate: 3600 means Next.js re-fetches every hour in the background.
//
// HOW NON-TECHNICAL PEOPLE EDIT DATA:
// ────────────────────────────────────
// 1. They edit the Google Sheet as before (same URL, same columns).
// 2. Within 1 hour, the site automatically picks up changes (ISR).
// 3. For immediate updates, trigger a rebuild from Vercel dashboard or webhook.
//
// EVEN FASTER ALTERNATIVE (if you outgrow Sheets):
//   Replace the Google Sheet URL with a Notion database, Airtable, or simple
//   JSON files in a GitHub repo. The pattern stays identical — only the fetch URL
//   and parser change. The pages don't change at all.
// =============================================================================

const CONCERTS_CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vS_ZGAlSzhm9wryY9FijW82vIfUZFut2mm5_RXI0pqij2prHArPvfAr4lEhegQhATCb35mNNw1a4Sst/pub?gid=0&single=true&output=csv';

const PARTNERS_CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vS_ZGAlSzhm9wryY9FijW82vIfUZFut2mm5_RXI0pqij2prHArPvfAr4lEhegQhATCb35mNNw1a4Sst/pub?gid=1532882504&single=true&output=csv';

// ── CSV Parser (same logic, now runs server-side) ──────────────────────────

function parseCSVLine(text) {
  const result = [];
  let cell = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const next = text[i + 1];
    if (char === '"') {
      if (inQuotes && next === '"') { cell += '"'; i++; }
      else inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(cell); cell = '';
    } else {
      cell += char;
    }
  }
  result.push(cell);
  return result;
}

function parseCSV(csvText) {
  const lines = csvText.split(/\r?\n/).filter(l => l.trim());
  if (lines.length === 0) return [];
  const headers = parseCSVLine(lines[0]).map(h => h.trim());
  return lines.slice(1).map(line => {
    const values = parseCSVLine(line);
    return headers.reduce((obj, header, i) => {
      obj[header] = values[i] ? values[i].trim() : '';
      return obj;
    }, {});
  }).filter(Boolean);
}

// ── Fetch helpers ──────────────────────────────────────────────────────────

async function fetchCSV(url) {
  const res = await fetch(url, { next: { revalidate: 3600 } }); // Cache 1 hour
  if (!res.ok) throw new Error(`Failed to fetch CSV: ${res.status}`);
  const text = await res.text();
  return parseCSV(text);
}

function parseConcertDate(str) {
  if (!str) return null;
  const d = new Date(str);
  return isNaN(d.getTime()) ? null : d;
}

// ── Public API (called from Server Components and generateMetadata) ────────

export async function getConcerts() {
  const data = await fetchCSV(CONCERTS_CSV_URL);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming = [];
  const past = [];

  data.forEach(concert => {
    const dateObj = parseConcertDate(concert.Date);
    if (!dateObj) return;
    const enriched = { ...concert, _dateObj: dateObj, _isoDate: dateObj.toISOString() };
    if (dateObj >= today) upcoming.push(enriched);
    else past.push(enriched);
  });

  upcoming.sort((a, b) => a._dateObj - b._dateObj);
  past.sort((a, b) => b._dateObj - a._dateObj);

  return { upcoming, past };
}

export async function getPartners() {
  const data = await fetchCSV(PARTNERS_CSV_URL);
  
  const categories = {
    mainSponsor: [], sponsors: [], musicCommunity: [],
    raffle: [], university: [], collaboration: [], individuals: [],
  };

  data.forEach(item => {
    const isCurrent = item.Current?.trim().toLowerCase() === 'yes';
    if (!isCurrent) return;
    const cat = item.Category?.trim().toLowerCase() || '';
    if (cat === 'main sponsor') categories.mainSponsor.push(item);
    else if (cat === 'sponsor') categories.sponsors.push(item);
    else if (cat === 'music community') categories.musicCommunity.push(item);
    else if (cat === 'raffle') categories.raffle.push(item);
    else if (cat === 'university') categories.university.push(item);
    else if (cat === 'collaboration') categories.collaboration.push(item);
    else if (cat === 'individuals') categories.individuals.push(item);
  });

  return categories;
}

// ── Image URL cleaner (shared utility) ─────────────────────────────────────

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1519683109079-d5f539e1542f?q=80&w=2670&auto=format&fit=crop';

export function getCleanImageUrl(url) {
  if (!url || url.trim() === '') return FALLBACK_IMAGE;
  try {
    if (url.includes('drive.google.com')) {
      const match = url.match(/\/d\/(.*?)\//);
      if (match?.[1]) return `https://drive.google.com/uc?export=view&id=${match[1]}`;
    }
    return url;
  } catch {
    return FALLBACK_IMAGE;
  }
}
