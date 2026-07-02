import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { useTranslation } from 'react-i18next';

/**
 * Navbar - Barra de navegación fija con efecto glassmorphism
 * Incluye logo, enlaces de navegación, botón CTA, y selector de idioma
 * Se vuelve semi-transparente al hacer scroll
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t, i18n } = useTranslation();

  // Detecta scroll para cambiar el estilo del navbar
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cambiar idioma
  const toggleLang = () => {
    const newLang = i18n.language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLang);
  };

  const navLinks = [
    { name: t('nav.whyTung'), href: '#why-tung' },
    { name: t('nav.tokenomics'), href: '#tokenomics' },
    { name: t('nav.rewards'), href: '#passive-income' },
    { name: t('nav.game'), href: '#nova-game' },
    { name: t('nav.roadmap'), href: '#roadmap' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#050505]/90 backdrop-blur-xl border-b border-[#9EFF00]/10 shadow-lg shadow-[#9EFF00]/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <img
              src="https://photos.pinksale.finance/file/pinksale-logo-upload/1779894309304-a76860620da420652c14230ae807e126.png"
              alt="TUNG Logo"
              className="w-12 h-12 lg:w-14 lg:h-14 object-contain"
            />
            <span className="text-2xl lg:text-3xl font-bold font-[Space_Grotesk] gradient-text">
              TUNG
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-300 hover:text-[#9EFF00] transition-colors duration-300 font-[Space_Grotesk] tracking-wide"
              >
                {link.name}
              </a>
            ))}
            
            {/* Whitepaper */}
            <a
              href={i18n.language === 'es' ? '/whitepaper/es/index.html' : '/whitepaper/index.html'}
              className="text-sm font-medium text-gray-400 hover:text-[#9EFF00] transition-colors duration-300 font-[Space_Grotesk] tracking-wide"
            >
              {t('nav.whitepaper')}
            </a>

            {/* Selector de idioma */}
            <button
              onClick={toggleLang}
              className="px-3 py-1.5 rounded-full text-xs font-bold font-[Space_Grotesk]
                         border border-[#9EFF00]/30 text-[#9EFF00] 
                         hover:bg-[#9EFF00]/10 hover:border-[#9EFF00] transition-all duration-300"
              aria-label="Change language"
            >
              {i18n.language === 'en' ? 'ES' : 'EN'}
            </button>

            {/* Redes Sociales - Desktop */}
            <a
              href="https://x.com/TungeTungSahur"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300"
              aria-label="X (Twitter)"
              title="X / Twitter"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a
              href="https://t.me/TrungTungMeme"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300"
              aria-label="Telegram"
              title="Telegram"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.66-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.41-.88.03-.24.37-.49 1.02-.74 3.98-1.73 6.63-2.87 7.96-3.43 3.79-1.58 4.58-1.85 5.09-1.86.11 0 .37.03.54.17.14.12.18.28.2.45-.01.06.01.24 0 .38z"/>
              </svg>
            </a>

            <a
              href="https://swap.falcox.net/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 bg-[#9EFF00] text-[#050505] font-bold rounded-full text-sm
                         hover:bg-[#F5C542] hover:shadow-lg hover:shadow-[#F5C542]/30
                         transition-all duration-300 font-[Space_Grotesk] tracking-wide"
            >
              {t('nav.buyTung')}
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-3 md:hidden">
            {/* Redes Sociales - Mobile */}
            <a
              href="https://x.com/TungeTungSahur"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300"
              aria-label="X (Twitter)"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a
              href="https://t.me/TrungTungMeme"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300"
              aria-label="Telegram"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.66-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.41-.88.03-.24.37-.49 1.02-.74 3.98-1.73 6.63-2.87 7.96-3.43 3.79-1.58 4.58-1.85 5.09-1.86.11 0 .37.03.54.17.14.12.18.28.2.45-.01.06.01.24 0 .38z"/>
              </svg>
            </a>
            {/* Selector de idioma móvil */}
            <button
              onClick={toggleLang}
              className="px-2.5 py-1 rounded-full text-xs font-bold font-[Space_Grotesk]
                         border border-[#9EFF00]/30 text-[#9EFF00]
                         hover:bg-[#9EFF00]/10 transition-all duration-300"
              aria-label="Change language"
            >
              {i18n.language === 'en' ? 'ES' : 'EN'}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-white p-2 hover:text-[#9EFF00] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#050505]/95 backdrop-blur-xl border-t border-[#9EFF00]/10"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-gray-300 hover:text-[#9EFF00] transition-colors py-2 font-[Space_Grotesk]"
                >
                  {link.name}
                </a>
              ))}
              <a
                href={i18n.language === 'es' ? '/whitepaper/es/index.html' : '/whitepaper/index.html'}
                onClick={() => setMobileOpen(false)}
                className="block text-gray-300 hover:text-[#9EFF00] transition-colors py-2 font-[Space_Grotesk]"
              >
                {t('nav.whitepaper')}
              </a>
              <a
                href="https://swap.falcox.net/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center px-5 py-3 bg-[#9EFF00] text-[#050505] font-bold rounded-full
                           hover:bg-[#F5C542] transition-all duration-300 font-[Space_Grotesk]"
              >
                {t('nav.buyTung')}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
