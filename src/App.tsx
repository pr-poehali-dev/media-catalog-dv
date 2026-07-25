import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import CookieBanner from "@/components/CookieBanner";
import PageLoader from "@/components/PageLoader";

const Communities = lazy(() => import("@/pages/Communities"));
const Bloggers = lazy(() => import("@/pages/Bloggers"));
const Outdoor = lazy(() => import("@/pages/Outdoor"));
const Merch = lazy(() => import("@/pages/Merch"));
const Platforms = lazy(() => import("@/pages/Platforms"));
const SocialPage = lazy(() => import("@/pages/SocialPage"));
const CityPage = lazy(() => import("@/pages/CityPage"));
const Formats = lazy(() => import("@/pages/Formats"));
const Cases = lazy(() => import("@/pages/Cases"));
const FAQ = lazy(() => import("@/pages/FAQ"));
const Contacts = lazy(() => import("@/pages/Contacts"));
const Legal = lazy(() => import("@/pages/Legal"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const PoliticalHome = lazy(() => import("@/pages/political/Home"));
const PoliticalCommunities = lazy(() => import("@/pages/political/Communities"));
const PoliticalBloggers = lazy(() => import("@/pages/political/Bloggers"));
const PoliticalOutdoor = lazy(() => import("@/pages/political/Outdoor"));
const PoliticalMerch = lazy(() => import("@/pages/political/Merch"));
const PoliticalPlatforms = lazy(() => import("@/pages/political/Platforms"));
const PoliticalSocialPage = lazy(() => import("@/pages/political/SocialPage"));
const PoliticalCityPage = lazy(() => import("@/pages/political/CityPage"));
const PoliticalFormats = lazy(() => import("@/pages/political/Formats"));
const PoliticalCases = lazy(() => import("@/pages/political/Cases"));
const PoliticalFAQ = lazy(() => import("@/pages/political/FAQ"));
const PoliticalContacts = lazy(() => import("@/pages/political/Contacts"));

const queryClient = new QueryClient();

declare global {
  interface Window {
    ym?: (...args: unknown[]) => void;
  }
}

const YM_COUNTER_ID = 109797633;

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    if (typeof window.ym === 'function') {
      window.ym(YM_COUNTER_ID, 'hit', window.location.href);
    }
  }, [pathname]);
  return null;
}

function Layout() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* 4 направления */}
          <Route path="/communities" element={<Communities />} />
          <Route path="/bloggers" element={<Bloggers />} />
          <Route path="/outdoor" element={<Outdoor />} />
          <Route path="/merch" element={<Merch />} />
          {/* Подразделы сообществ */}
          <Route path="/platforms" element={<Platforms />} />
          <Route path="/socials/:socialId" element={<SocialPage />} />
          <Route path="/cities/:cityId" element={<CityPage />} />
          {/* Общие */}
          <Route path="/formats" element={<Formats />} />
          <Route path="/cases" element={<Cases />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/legal/:pageId" element={<Legal />} />
          {/* Политический раздел */}
          <Route path="/political" element={<PoliticalHome />} />
          <Route path="/political/communities" element={<PoliticalCommunities />} />
          <Route path="/political/bloggers" element={<PoliticalBloggers />} />
          <Route path="/political/outdoor" element={<PoliticalOutdoor />} />
          <Route path="/political/merch" element={<PoliticalMerch />} />
          <Route path="/political/platforms" element={<PoliticalPlatforms />} />
          <Route path="/political/socials/:socialId" element={<PoliticalSocialPage />} />
          <Route path="/political/cities/:cityId" element={<PoliticalCityPage />} />
          <Route path="/political/formats" element={<PoliticalFormats />} />
          <Route path="/political/cases" element={<PoliticalCases />} />
          <Route path="/political/faq" element={<PoliticalFAQ />} />
          <Route path="/political/contacts" element={<PoliticalContacts />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </main>
      <Footer />
      <CookieBanner />
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;