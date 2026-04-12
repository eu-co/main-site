// app/(main)/about/news/page.jsx
import Link from 'next/link';
import Image from 'next/image';
import { getNews, getCleanImageUrl } from '@/lib/data';

export const metadata = {
  title: 'News',
  description: 'Latest news and updates from the Edinburgh University Chamber Orchestra.',
};

export default async function NewsPage() {
  const news = await getNews();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <p className="text-blue-400 text-xs font-bold tracking-[0.4em] uppercase mb-4">Updates</p>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">News</h1>
        <p className="text-lg text-slate-400 mb-16">The latest from EUCO.</p>

        <div className="space-y-8">
          {news.map((item, i) => {
            const d = new Date(item.date);
            const dateStr = !isNaN(d.getTime())
              ? d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
              : item.date;

            return (
              <article key={i} className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all">
                <div className="flex flex-col md:flex-row">
                  {/* Image (if provided) */}
                  {item.imageUrl && (
                    <div className="w-full md:w-1/3 h-48 md:h-auto relative">
                      <Image src={`/${item.imageUrl}`} alt={item.title} fill sizes="33vw" className="object-cover" loading="lazy" />
                    </div>
                  )}
                  {/* Content */}
                  <div className={`p-6 md:p-8 ${item.imageUrl ? 'md:w-2/3' : 'w-full'}`}>
                    <p className="text-blue-400 text-xs font-semibold tracking-widest uppercase mb-3">{dateStr}</p>
                    <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                      {item.title}
                    </h2>
                    <p className="text-slate-400 leading-relaxed mb-4">{item.excerpt}</p>
                    {item.body && (
                      <p className="text-slate-500 leading-relaxed text-sm">{item.body}</p>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {news.length === 0 && (
          <p className="text-center text-slate-500 py-20">No news yet. Check back soon.</p>
        )}
      </div>
    </div>
  );
}
