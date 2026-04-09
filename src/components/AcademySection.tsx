import { motion } from 'framer-motion';
import { Calculator, BookOpen, Code2, Users, ArrowUpRight } from 'lucide-react';
import { useLang } from '@/context/LangContext';

const icons   = [Calculator, BookOpen, Code2];
const accents = ['primary', 'blue', 'emerald'] as const;

const tokenMap = {
  primary: {
    border:  'border-primary/25',
    iconBg:  'bg-primary/10 border-primary/20',
    iconClr: 'text-primary',
    tag:     'bg-primary/10 text-primary border-primary/20',
    glow:    'from-primary/10 to-transparent',
    bar:     'bg-primary',
    barBg:   'bg-primary/15',
    corner:  'border-r-primary/15',
  },
  blue: {
    border:  'border-blue-500/25',
    iconBg:  'bg-blue-500/10 border-blue-500/20',
    iconClr: 'text-blue-400',
    tag:     'bg-blue-500/10 text-blue-400 border-blue-500/20',
    glow:    'from-blue-500/10 to-transparent',
    bar:     'bg-blue-400',
    barBg:   'bg-blue-500/15',
    corner:  'border-r-blue-500/15',
  },
  emerald: {
    border:  'border-emerald-500/25',
    iconBg:  'bg-emerald-500/10 border-emerald-500/20',
    iconClr: 'text-emerald-400',
    tag:     'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    glow:    'from-emerald-500/10 to-transparent',
    bar:     'bg-emerald-400',
    barBg:   'bg-emerald-500/15',
    corner:  'border-r-emerald-500/15',
  },
};

export default function AcademySection() {
  const { t } = useLang();
  const ac = t.academy;

  const subjects = [
    { ...ac.math,        icon: 0 },
    { ...ac.english,     icon: 1 },
    { ...ac.programming, icon: 2 },
  ];

  return (
    <section id="academy" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-section pointer-events-none" />
      <div className="absolute -right-40 top-0 w-[500px] h-[500px] bg-primary/4 blur-[140px] rounded-full pointer-events-none" />

      {/* Angular decoration */}
      <div className="absolute -right-16 top-0 opacity-[0.04] pointer-events-none">
        <svg width="400" height="400" viewBox="0 0 400 400" fill="none">
          <polygon points="400,0 400,400 0,0" fill="hsl(var(--primary))"/>
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">

        {/* ─── Header ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <span className="inline-flex items-center gap-2 text-xs font-black tracking-[0.35em] uppercase text-primary mb-5">
            <span className="w-10 h-px bg-primary" />
            {ac.badge}
          </span>
          <h2 className="font-display text-5xl md:text-7xl font-black text-foreground leading-[0.9] mb-5">
            {ac.title.split('\n').map((l, i) => (
              <span key={i} className="block">
                {i === 1 ? <span className="gradient-text">{l}</span> : l}
              </span>
            ))}
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl leading-relaxed">
            {ac.subtitle}
          </p>
        </motion.div>

        {/* ─── Cards grid ─── */}
        <div className="grid md:grid-cols-3 gap-5">
          {subjects.map((subject, i) => {
            const Icon   = icons[subject.icon];
            const accent = accents[subject.icon];
            const tk     = tokenMap[accent];

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.13 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className={`group glass-card rounded-2xl border ${tk.border} hover:shadow-glass transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col`}
              >
                {/* Hover glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${tk.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl`} />

                {/* Top accent line */}
                <div className={`absolute top-0 left-0 right-0 h-px ${tk.bar} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                {/* Corner */}
                <div className={`absolute top-0 right-0 w-0 h-0 border-t-[36px] border-r-[36px] border-t-transparent ${tk.corner}`} />

                <div className="relative p-8 flex flex-col flex-1">
                  {/* Icon + level badge */}
                  <div className="flex items-center justify-between mb-8">
                    <div className={`w-12 h-12 rounded-xl ${tk.iconBg} border flex items-center justify-center`}>
                      <Icon size={21} className={tk.iconClr} />
                    </div>
                    <span className={`text-xs font-black px-2.5 py-1 rounded-full border ${tk.tag}`}>
                      {subject.level}
                    </span>
                  </div>

                  {/* Tagline */}
                  <p className={`text-xs font-black tracking-[0.2em] uppercase ${tk.iconClr} opacity-70 mb-2`}>
                    {subject.tagline}
                  </p>

                  {/* Title + arrow */}
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-display text-2xl font-black text-foreground leading-tight">
                      {subject.title}
                    </h3>
                    <ArrowUpRight
                      size={18}
                      className={`${tk.iconClr} opacity-0 group-hover:opacity-100 transition-opacity -mt-0.5 flex-shrink-0`}
                    />
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-1">
                    {subject.desc}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-5 border-t border-border/40">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${tk.tag}`}>
                      {subject.tag}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Users size={11} />
                      <span className="font-medium">Enroll</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ─── Bottom CTA ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 clip-angular bg-primary text-primary-foreground text-sm font-black px-10 py-4 hover:shadow-glow transition-all duration-300 hover:scale-105"
          >
            {t.cta.button}
            <ArrowUpRight size={15} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
