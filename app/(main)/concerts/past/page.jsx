// app/(main)/concerts/past/page.jsx
import { getConcerts } from '@/lib/data';
import Section from '@/components/Section';
import PastConcertList from '@/components/PastConcertList';

export const metadata = {
  title: 'Past Concerts',
  description: 'Explore the rich history of performances by EUCO.',
  alternates: { canonical: '/concerts/past' },
};

export default async function PastConcertsPage() {
  const { past } = await getConcerts();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <Section title="Concert Archive">
        <p className="max-w-3xl mx-auto text-center text-slate-400 text-lg mb-16">
          Explore our history of performances. Click on any concert for full details.
        </p>
        {past.length > 0 ? (
          <PastConcertList concerts={JSON.parse(JSON.stringify(past))} />
        ) : (
          <p className="text-center text-slate-500 py-20">No archive data found.</p>
        )}
      </Section>
    </main>
  );
}
