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
import CustomCursor from '@/components/CustomCursor';

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
      <div className="relative min-h-screen bg-[#F0EEE7] text-[#171B18] dark:bg-[#070908] dark:text-[#F3F2EC] selection:bg-[#087A5B]/20 selection:text-[#087A5B] dark:selection:bg-[#00A878]/25 dark:selection:text-[#00A878] overflow-x-hidden transition-colors duration-400">
        {/* Desktop Luxury Precision Cursor */}
        <CustomCursor />

        {/* Tactile Micro-Texture Overlay */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.035] dark:opacity-[0.035] bg-[radial-gradient(#171B18_1px,transparent_1px)] dark:bg-[radial-gradient(#F3F2EC_1px,transparent_1px)] [background-size:28px_28px] z-[1]" />

        {/* Sticky Luxury Navbar */}
        <Navbar onOpenScanner={handleOpenScanner} />

        <main className="relative z-[2]">
          {/* Hero Section */}
          <Hero onOpenScanner={handleOpenScanner} />

          {/* About SAFORA */}
          <About />

          {/* Why SAFORA */}
          <WhySafora />

          {/* Features */}
          <Features onOpenScanner={handleOpenScanner} />

          {/* How It Works */}
          <HowItWorks onOpenScanner={handleOpenScanner} />

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
