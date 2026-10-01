import React, { useState } from 'react';
import Navbar from '@/components/safora/Navbar';
import Hero from '@/components/safora/Hero';
import About from '@/components/safora/About';
import WhySafora from '@/components/safora/WhySafora';
import Features from '@/components/safora/Features';
import HowItWorks from '@/components/safora/HowItWorks';
import RiskLevels from '@/components/safora/RiskLevels';
import WhoIsItFor from '@/components/safora/WhoIsItFor';
import Team from '@/components/safora/Team';
import ProductMessage from '@/components/safora/ProductMessage';
import CTA from '@/components/safora/CTA';
import Footer from '@/components/safora/Footer';
import LiveScannerDemo from '@/components/LiveScannerDemo';

import { ThemeProvider } from '@/context/ThemeContext';

export default function App() {
  const [scannerOpen, setScannerOpen] = useState(false);

  const handleOpenScanner = () => setScannerOpen(true);
  const handleCloseScanner = () => setScannerOpen(false);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-[#F7F7F2] text-[#121614] dark:bg-[#050706] dark:text-slate-200 selection:bg-emerald-500/20 selection:text-emerald-400 overflow-x-hidden transition-colors duration-400">
      {/* Sticky Luxury Navbar */}
      <Navbar onOpenScanner={handleOpenScanner} />

      <main>
        {/* Hero Section */}
        <Hero onOpenScanner={handleOpenScanner} />

        {/* About SAFORA */}
        <About />

        {/* Why SAFORA */}
        <WhySafora />

        {/* Features */}
        <Features onOpenScanner={handleOpenScanner} />

        {/* How It Works */}
        <HowItWorks />

        {/* Risk Levels */}
        <RiskLevels />

        {/* Who Is It For */}
        <WhoIsItFor />

        {/* Team Section (Photo-Ready) */}
        <Team />

        {/* Product Message */}
        <ProductMessage />

        {/* Call to Action */}
        <CTA onExplore={() => scrollToSection('about')} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Live URL Scanner Tool Modal */}
      <LiveScannerDemo
        isOpen={scannerOpen}
        onClose={handleCloseScanner}
      />
    </div>
    </ThemeProvider>
  );
}
