import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`relative inline-flex items-center justify-center p-2 rounded-full transition-all duration-300 cursor-pointer ${
        isDark
          ? 'bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-[#00A878] hover:text-[#34D399] shadow-xs'
          : 'bg-black/[0.04] hover:bg-black/[0.08] border border-black/[0.08] text-[#087A5B] hover:text-[#064D3D] shadow-xs'
      } ${className}`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <motion.div
        key={theme}
        initial={{ rotate: -45, scale: 0.7, opacity: 0 }}
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        exit={{ rotate: 45, scale: 0.7, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="w-4 h-4 flex items-center justify-center"
      >
        {isDark ? (
          <Sun className="w-4 h-4 stroke-[1.6]" />
        ) : (
          <Moon className="w-4 h-4 stroke-[1.6]" />
        )}
      </motion.div>
    </button>
  );
}
