// =============================================================================
// app/(main)/layout.jsx — Layout for all non-education pages
// =============================================================================
// WHAT CHANGED:
//   - This replaces the <PageLayout> component (Header + Outlet + Footer)
//   - Next.js route groups: (main) is invisible in the URL
//   - {children} replaces <Outlet />
// =============================================================================

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function MainLayout({ children }) {
  return (
    <>
      <Header />
      <main className="pt-0 md:pt-12">
        {children}
      </main>
      <Footer />
    </>
  );
}
