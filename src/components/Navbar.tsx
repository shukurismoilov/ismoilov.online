import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLang } from '@/context/LangContext';
import { useLocation, Link } from 'react-router-dom';
import logoWide from '@/assets/logo-wide.png';

export default function Navbar() {
  const { lang, setLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const location = useLocation();
  const _isHome = location.pathname === '/';

  const navItems = [
    { label: t.nav.design,   href: '/design'  },
    { label: t.nav.labs,     href: '/labs'    },
    { label: t.nav.academy,  href: '/academy' },
    { label: t.nav.about,    href: '/about'   },
    { label: t.nav.contact,  href: '/contact' },
  ];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass-card border-b border-border/50 shadow-glass'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logoWide} alt="Ismoilov Online" className="h-8 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 relative group"
            >
              {item.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        {/* Right side: Lang toggle + CTA */}
        <div className="hidden md:flex items-center gap-4">
          {/* Language toggle */}
          <button
            onClick={() => setLang(lang === 'en' ? 'ru' : 'en')}
            className="flex items-center gap-1 glass-card px-3 py-1.5 rounded-md text-xs font-semibold tracking-wider hover:border-primary/50 transition-colors duration-200"
          >
            <span className={lang === 'en' ? 'text-primary' : 'text-muted-foreground'}>EN</span>
            <span className="text-border mx-0.5">|</span>
            <span className={lang === 'ru' ? 'text-primary' : 'text-muted-foreground'}>RU</span>
          </button>

          <a
            href="#contact"
            className="clip-angular bg-primary text-primary-foreground text-sm font-semibold px-5 py-2 hover:shadow-glow-sm transition-all duration-300"
          >
            {t.nav.contact}
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-muted-foreground hover:text-foreground"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-card border-t border-border/50"
          >
            <div className="container mx-auto px-6 py-4 flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-1"
                >
                  {item.label}
                </a>
              ))}
              <div className="flex items-center gap-3 pt-2 border-t border-border/50">
                <button
                  onClick={() => setLang(lang === 'en' ? 'ru' : 'en')}
                  className="text-sm font-semibold text-primary"
                >
                  {lang === 'en' ? '→ Switch to RU' : '→ Переключить на EN'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
