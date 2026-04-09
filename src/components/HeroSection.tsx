import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLang } from '@/context/LangContext';
import logoIcon from '@/assets/logo-icon.png';

export default function HeroSection() {
  const { t } = useLang();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero pointer-events-none" />

      {/* Primary glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/6 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/5 blur-[120px] pointer-events-none" />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Diagonal accent lines */}
      <div className="absolute top-20 right-10 md:right-20 opacity-15 pointer-events-none">
        <svg width="220" height="220" viewBox="0 0 220 220" fill="none">
          <line x1="0" y1="220" x2="220" y2="0" stroke="hsl(var(--primary))" strokeWidth="1.5"/>
          <line x1="35" y1="220" x2="220" y2="35" stroke="hsl(var(--primary))" strokeWidth="0.8" opacity="0.5"/>
          <line x1="70" y1="220" x2="220" y2="70" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.3"/>
        </svg>
      </div>
      <div className="absolute bottom-28 left-8 md:left-20 opacity-10 pointer-events-none rotate-180">
        <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
          <line x1="0" y1="160" x2="160" y2="0" stroke="hsl(var(--primary))" strokeWidth="1.5"/>
          <line x1="30" y1="160" x2="160" y2="30" stroke="hsl(var(--primary))" strokeWidth="0.8" opacity="0.5"/>
        </svg>
      </div>

      {/* Scanning line */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-15">
        <motion.div
          className="w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent"
          animate={{ y: ['-10vh', '110vh'] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'linear', repeatDelay: 5 }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        <div className="flex flex-col items-center text-center">

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center mb-10"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-[2]" />
              <img src={logoIcon} alt="Ismoilov Online" className="relative h-16 w-auto animate-float" />
            </div>
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="inline-flex items-center gap-3 glass-card px-5 py-2 rounded-full mb-10 border-primary/20"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
            <span className="text-xs font-bold tracking-[0.25em] text-muted-foreground uppercase">
              {t.hero.badge}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-6xl sm:text-7xl md:text-9xl font-black leading-[0.88] mb-8 tracking-tight"
          >
            {t.hero.title.split('\n').map((line, i) => (
              <span key={i} className="block">
                {i === 1 ? (
                  <span className="gradient-text">{line}</span>
                ) : (
                  <span className="text-foreground">{line}</span>
                )}
              </span>
            ))}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-14 leading-relaxed"
          >
            {t.hero.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
          >
            <a
              href="#design"
              className="group flex items-center gap-2.5 clip-angular bg-primary text-primary-foreground font-bold px-9 py-4 text-sm tracking-wide hover:shadow-glow transition-all duration-300 hover:scale-105"
            >
              {t.hero.cta_primary}
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#contact"
              className="flex items-center gap-2 glass-card clip-angular-bl px-9 py-4 font-bold text-sm tracking-wide text-foreground hover:border-primary/50 hover:text-primary transition-all duration-300"
            >
              {t.hero.cta_secondary}
            </a>
          </motion.div>

          {/* 3 Pillars strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="w-full max-w-2xl grid grid-cols-3 gap-px glass-card rounded-xl overflow-hidden border border-border/50"
          >
            {t.hero.pillars.map((p, i) => (
              <a
                key={i}
                href={`#${p.label.toLowerCase().replace('дизайн','design').replace('лаборатория','labs').replace('академия','academy')}`}
                className="group relative flex flex-col items-center py-5 px-4 text-center hover:bg-primary/10 transition-colors duration-300 cursor-pointer"
              >
                {i < 2 && <div className="absolute right-0 top-1/4 h-1/2 w-px bg-border/50" />}
                <span className="font-mono text-xs font-bold text-primary/60 mb-1">{p.num}</span>
                <span className="font-display text-sm font-bold text-foreground group-hover:text-primary transition-colors">{p.label}</span>
                <span className="text-xs text-muted-foreground mt-0.5">{p.desc}</span>
              </a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-px h-10 bg-gradient-to-b from-transparent to-primary/50" />
        <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground/50">Scroll</span>
      </motion.div>
    </section>
  );
}
