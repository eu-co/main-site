// =============================================================================
// lib/data.js — All data fetching, centralised
// =============================================================================
// GOOGLE SHEETS SETUP:
//   Create one spreadsheet with these tabs (each published as CSV):
//   1. Concerts      2. Conductors   3. Committee   4. SiteContent
//   5. Timeline      6. News         7. Partners
// =============================================================================

const SHEET_URLS = {
  concerts:   process.env.CONCERTS_SHEET_URL || '',
  conductors: process.env.CONDUCTORS_SHEET_URL || '',
  committee:  process.env.COMMITTEE_SHEET_URL || '',
  content:    process.env.CONTENT_SHEET_URL || '',
  timeline:   process.env.TIMELINE_SHEET_URL || '',
  news:       process.env.NEWS_SHEET_URL || '',
  partners:   process.env.PARTNERS_SHEET_URL || '',
};

// ── CSV Parser ──────────────────────────────────────────────────────────────

function parseCSVLine(text) {
  const result = []; let cell = ''; let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i], next = text[i + 1];
    if (ch === '"') { if (inQuotes && next === '"') { cell += '"'; i++; } else inQuotes = !inQuotes; }
    else if (ch === ',' && !inQuotes) { result.push(cell); cell = ''; }
    else cell += ch;
  }
  result.push(cell);
  return result;
}

function parseCSV(csvText) {
  const lines = csvText.split(/\r?\n/).filter(l => l.trim());
  if (!lines.length) return [];
  const headers = parseCSVLine(lines[0]).map(h => h.trim());
  return lines.slice(1).map(line => {
    const values = parseCSVLine(line);
    return headers.reduce((obj, h, i) => { obj[h] = values[i]?.trim() || ''; return obj; }, {});
  }).filter(Boolean);
}

async function fetchSheet(key) {
  const url = SHEET_URLS[key];
  if (!url) return [];
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    return res.ok ? parseCSV(await res.text()) : [];
  } catch { return []; }
}

// ── Utilities ───────────────────────────────────────────────────────────────

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1519683109079-d5f539e1542f?q=80&w=2670&auto=format&fit=crop';

export function getCleanImageUrl(url) {
  if (!url?.trim()) return FALLBACK_IMAGE;
  if (url.includes('drive.google.com')) {
    const m = url.match(/\/d\/(.*?)\//);
    if (m?.[1]) return `https://drive.google.com/uc?export=view&id=${m[1]}`;
  }
  return url;
}

function parseDateSafe(str) {
  if (!str) return null;
  const d = new Date(str);
  return isNaN(d.getTime()) ? null : d;
}

function generateSlug(title, dateStr) {
  const titleSlug = (title || 'concert').toLowerCase()
    .replace(/[&]/g, 'and').replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
  const d = parseDateSafe(dateStr);
  if (d) {
    const month = d.toLocaleString('en', { month: 'long' }).toLowerCase();
    return `${titleSlug}-${month}-${d.getFullYear()}`;
  }
  return titleSlug;
}

// ── Public API ──────────────────────────────────────────────────────────────

export async function getConcerts() {
  const data = await fetchSheet('concerts');
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const upcoming = [], past = [];
  data.forEach(c => {
    const dateObj = parseDateSafe(c.Date);
    if (!dateObj) return;
    const slug = c.Slug?.trim() || generateSlug(c.Title, c.Date);
    const enriched = { ...c, slug, _dateObj: dateObj, _isoDate: dateObj.toISOString() };
    (dateObj >= today ? upcoming : past).push(enriched);
  });
  upcoming.sort((a, b) => a._dateObj - b._dateObj);
  past.sort((a, b) => b._dateObj - a._dateObj);
  return { upcoming, past, all: [...upcoming, ...past] };
}

export async function getConcertBySlug(slug) {
  const { all } = await getConcerts();
  return all.find(c => c.slug === slug) || null;
}

export async function getConductors() {
  const data = await fetchSheet('conductors');
  return data.filter(c => c.current?.toLowerCase() === 'yes');
}

export async function getCommittee() { return fetchSheet('committee'); }

export async function getSiteContent() {
  const data = await fetchSheet('content');
  const content = {};
  data.forEach(row => { if (row.key) content[row.key] = row.value || ''; });
  return content;
}

export async function getTimeline() {
  const data = await fetchSheet('timeline');
  return data.sort((a, b) => parseInt(a.year) - parseInt(b.year));
}

export async function getNews() {
  const data = await fetchSheet('news');
  return data.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export async function getNewsBySlug(slug) {
  return (await getNews()).find(n => n.slug === slug) || null;
}

export async function getPartners() {
  const data = await fetchSheet('partners');
  const cats = { mainSponsor:[], sponsors:[], musicCommunity:[], raffle:[], university:[], collaboration:[], individuals:[] };
  data.forEach(item => {
    if (item.Current?.trim().toLowerCase() !== 'yes') return;
    const c = item.Category?.trim().toLowerCase() || '';
    if (c === 'main sponsor') cats.mainSponsor.push(item);
    else if (c === 'sponsor') cats.sponsors.push(item);
    else if (c === 'music community') cats.musicCommunity.push(item);
    else if (c === 'raffle') cats.raffle.push(item);
    else if (c === 'university') cats.university.push(item);
    else if (c === 'collaboration') cats.collaboration.push(item);
    else if (c === 'individuals') cats.individuals.push(item);
  });
  return cats;
}
