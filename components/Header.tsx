
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Logo from './Logo';
import { NAVIGATION } from '../constants';

interface HeaderProps {
  onNavigate: (view: string) => void;
  currentView: string;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentView }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Institution', id: 'institution' },
    { label: 'Vision & Valeurs', id: 'vision' },
    { label: 'Expertises', id: 'expertises' },
    { label: 'Architecture', id: 'architecture' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || currentView !== 'hero' ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-8'
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
        <button 
          onClick={() => onNavigate('hero')}
          className="hover:opacity-90 transition-opacity"
        >
          <Logo variant="color" size="sm" />
        </button>

        <nav className="hidden lg:flex items-center gap-10">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`relative font-sans text-xs uppercase tracking-[0.15em] font-bold transition-colors group py-2 ${
                currentView === item.id ? 'text-institutional-green' : 'text-institutional-grey hover:text-institutional-green'
              }`}
            >
              {item.label}
              <motion.div 
                className="absolute bottom-0 left-0 h-[2px] bg-institutional-green"
                initial={{ width: 0 }}
                animate={{ width: currentView === item.id ? '100%' : 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            </button>
          ))}
        </nav>

        {/* Action Button - Subtle */}
        <div className="flex items-center gap-6">
          <a 
            href="mailto:contact@mboma.co" 
            className="hidden md:block border border-institutional-green px-6 py-2 text-xs uppercase tracking-widest font-bold text-institutional-green hover:bg-institutional-green hover:text-white transition-all transform hover:scale-105 active:scale-95"
          >
            Nous Contacter
          </a>
          
          {/* Mobile menu trigger */}
          <button className="lg:hidden text-institutional-grey">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
