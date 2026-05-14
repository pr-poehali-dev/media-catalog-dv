import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import Communities from "@/pages/Communities";
import Bloggers from "@/pages/Bloggers";
import Outdoor from "@/pages/Outdoor";
import Merch from "@/pages/Merch";
import Platforms from "@/pages/Platforms";
import SocialPage from "@/pages/SocialPage";
import CityPage from "@/pages/CityPage";
import Formats from "@/pages/Formats";
import Cases from "@/pages/Cases";
import FAQ from "@/pages/FAQ";
import Contacts from "@/pages/Contacts";
import Legal from "@/pages/Legal";
import NotFound from "@/pages/NotFound";

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
      </main>
      <Footer />
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