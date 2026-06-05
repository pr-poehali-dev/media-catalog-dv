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

const queryClient = new QueryClient();

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Layout() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Suspense fallback={null}>
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