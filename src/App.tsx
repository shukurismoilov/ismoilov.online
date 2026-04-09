import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LangProvider } from "@/context/LangContext";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";

// Lazy load routes for code splitting
const DesignPage = lazy(() => import("./pages/DesignPage.tsx"));
const AcademyPage = lazy(() => import("./pages/AcademyPage.tsx"));
const LabsPage = lazy(() => import("./pages/LabsPage.tsx"));
const AboutPage = lazy(() => import("./pages/AboutPage.tsx"));
const ContactPage = lazy(() => import("./pages/ContactPage.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="animate-pulse">
      <div className="h-12 w-12 bg-primary rounded-full" />
    </div>
  </div>
);

const App = () => (
  <LangProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/" element={<Index />} />
          
          <Route
            path="/design"
            element={
              <Suspense fallback={<PageLoader />}>
                <DesignPage />
              </Suspense>
            }
          />
          
          <Route
            path="/academy"
            element={
              <Suspense fallback={<PageLoader />}>
                <AcademyPage />
              </Suspense>
            }
          />
          
          <Route
            path="/labs"
            element={
              <Suspense fallback={<PageLoader />}>
                <LabsPage />
              </Suspense>
            }
          />
          
          <Route
            path="/about"
            element={
              <Suspense fallback={<PageLoader />}>
                <AboutPage />
              </Suspense>
            }
          />
          
          <Route
            path="/contact"
            element={
              <Suspense fallback={<PageLoader />}>
                <ContactPage />
              </Suspense>
            }
          />
          
          <Route
            path="*"
            element={
              <Suspense fallback={<PageLoader />}>
                <NotFound />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </LangProvider>
);

export default App;
