
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = () => {
      setMobileMenuOpen(false);
    };
    if (mobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => document.removeEventListener('click', handleClickOutside);
  }, [mobileMenuOpen]);

  const navItems = [
    { label: 'Institution', path: '/institution' },
    { label: 'Vision & Valeurs', path: '/vision' },
    { label: 'Expertises', path: '/expertises' },
    { label: 'Architecture', path: '/architecture' },
    { label: 'Rapports', path: '/rapports' },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || location.pathname !== '/' ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-8'
        }`}
      >
        <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
          <button 
            onClick={() => navigate('/')}
            className="hover:opacity-90 transition-opacity"
          >
            <Logo variant="color" size="sm" />
          </button>

          <nav className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`relative font-sans text-xs uppercase tracking-[0.15em] font-bold transition-colors group py-2 ${
                  location.pathname === item.path ? 'text-institutional-green' : 'text-institutional-grey hover:text-institutional-green'
                }`}
              >
                {item.label}
                <motion.div 
                  className="absolute bottom-0 left-0 h-[2px] bg-institutional-green"
                  initial={{ width: 0 }}
                  animate={{ width: location.pathname === item.path ? '100%' : 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            <a 
              href="mailto:co@mboma.org" 
              className="hidden md:block border border-institutional-green px-6 py-2 text-xs uppercase tracking-widest font-bold text-institutional-green hover:bg-institutional-green hover:text-white transition-all transform hover:scale-105 active:scale-95"
            >
              Nous Contacter
            </a>
            
            <button
              onClick={() => handleNavigation('/audit-booking')}
              className="hidden lg:block bg-institutional-orange text-white px-6 py-2 text-xs uppercase tracking-widest font-bold hover:bg-institutional-orange/90 transition-all transform hover:scale-105 active:scale-95"
            >
              Audit Gratuit
            </button>
            
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="lg:hidden text-institutional-grey hover:text-institutional-green transition-colors relative z-60"
            >
              <motion.div
                animate={mobileMenuOpen ? { rotate: 180 } : { rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                {mobileMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
                )}
              </motion.div>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 lg:hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8 pt-24">
              <nav className="space-y-6">
                {navItems.map((item, i) => (
                  <motion.button
                    key={item.path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => handleNavigation(item.path)}
                    className={`block w-full text-left font-sans text-lg font-bold transition-colors py-3 border-b border-gray-100 ${
                      location.pathname === item.path ? 'text-institutional-green' : 'text-institutional-grey hover:text-institutional-green'
                    }`}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </nav>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-12 pt-8 border-t border-gray-100 space-y-4"
              >
                <a 
                  href="mailto:co@mboma.org" 
                  className="block w-full text-center border border-institutional-green px-6 py-3 text-sm uppercase tracking-widest font-bold text-institutional-green hover:bg-institutional-green hover:text-white transition-all"
                >
                  Nous Contacter
                </a>
                
                <button
                  onClick={() => handleNavigation('/audit-booking')}
                  className="block w-full text-center bg-institutional-orange text-white px-6 py-3 text-sm uppercase tracking-widest font-bold hover:bg-institutional-orange/90 transition-all"
                >
                  Audit Gratuit
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
