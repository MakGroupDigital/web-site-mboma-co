
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

interface HeaderProps {
  onNavigate: (view: string) => void;
  currentView: string;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentView }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const handleMobileNavigate = (id: string) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || currentView !== 'hero' || isMobileMenuOpen ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-8'
        }`}
      >
        <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
          <button 
            onClick={() => {
              onNavigate('hero');
              setIsMobileMenuOpen(false);
            }}
            className="hover:opacity-90 transition-opacity z-50"
          >
            <Logo variant="color" size="sm" />
          </button>

          {/* Desktop Navigation */}
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

          {/* Action Button & Mobile Toggle */}
          <div className="flex items-center gap-6 z-50">
            <a 
              href="mailto:contact@mboma.co" 
              className="hidden md:block border border-institutional-green px-6 py-2 text-xs uppercase tracking-widest font-bold text-institutional-green hover:bg-institutional-green hover:text-white transition-all transform hover:scale-105 active:scale-95"
            >
              Nous Contacter
            </a>
            
            {/* Mobile menu trigger */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-institutional-grey p-2"
              aria-label="Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden bg-white pt-24 px-6 flex flex-col"
          >
            <nav className="flex flex-col gap-6 items-start mt-8">
              {navItems.map((item, index) => (
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  key={item.id}
                  onClick={() => handleMobileNavigate(item.id)}
                  className={`text-2xl font-sans uppercase tracking-[0.1em] font-light py-2 border-b border-gray-100 w-full text-left ${
                    currentView === item.id ? 'text-institutional-green font-semibold' : 'text-institutional-grey'
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
            </nav>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-auto mb-12 flex flex-col gap-8"
            >
              <a 
                href="mailto:contact@mboma.co" 
                className="bg-institutional-green text-white text-center py-4 font-sans uppercase tracking-widest font-bold text-xs"
              >
                Nous Contacter
              </a>
              <div className="flex justify-center gap-6">
                 <span className="text-[10px] uppercase tracking-widest text-gray-400">Brazzaville</span>
                 <span className="text-[10px] uppercase tracking-widest text-gray-400">Kinshasa</span>
                 <span className="text-[10px] uppercase tracking-widest text-gray-400">Paris</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
