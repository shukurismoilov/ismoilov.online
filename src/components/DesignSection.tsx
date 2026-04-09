import { motion } from 'framer-motion';
import { Monitor, Layers, Sparkles, MoveRight } from 'lucide-react';
import { useLang } from '@/context/LangContext';

const services = [
  { key: 'smm',      num: '01', icon: Sparkles },
  { key: 'web',      num: '02', icon: Monitor  },
  { key: 'identity', num: '03', icon: Layers   },
] as const;

export default function DesignSection() {
  const { t } = useLang();
  const ds = t.design;

  const items = services.map(s => ({
    ...s,
    data: ds[s.key],
  }));

  return (
    <section id="design" className="relative py-32 overflow-hidden">
      {/* Full-bleed diagonal background stripe */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[700px] h-[700px] bg-primary/4 blur-[160px] rounded-full" />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'repeating-linear-gradient(-45deg, hsl(var(--primary)) 0, hsl(var(--primary)) 1px, transparent 0, transparent 50%)',
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">

        {/* ─── Header ─── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 text-xs font-black tracking-[0.35em] uppercase text-primary mb-5">
              <span className="w-10 h-px bg-primary" />
              {ds.badge}
            </span>
            <h2 className="font-display text-5xl md:text-7xl font-black text-foreground leading-[0.9]">
              {ds.title.split('\n').map((l, i) => (
                <span key={i} className="block">
                  {i === 0 ? l : <span className="gradient-text">{l}</span>}
                </span>
              ))}
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground text-base md:text-lg max-w-sm md:text-right leading-relaxed"
          >
            {ds.subtitle}
          </motion.p>
        </div>

        {/* ─── Services ─── */}
        <div className="space-y-0">
          {items.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.key}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="group relative flex items-stretch border-t border-border/40 last:border-b hover:border-primary/30 transition-colors duration-300 cursor-pointer overflow-hidden"
              >
                {/* Hover fill */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/6 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                />

                {/* Number */}
                <div className="relative flex-shrink-0 w-20 md:w-32 flex items-center py-12 pr-4 md:pr-8">
                  <span className="font-mono text-4xl md:text-6xl font-black text-border/40 group-hover:text-primary/25 transition-colors duration-400 select-none leading-none">
                    {s.num}
                  </span>
                </div>

                {/* Vertical line */}
                <div className="relative flex-shrink-0 w-px bg-border/30 my-8 group-hover:bg-primary/30 transition-colors duration-300" />

                {/* Icon + label */}
                <div className="relative flex-shrink-0 flex items-center px-6 md:px-10 w-16 md:w-52">
                  <div className="flex flex-col items-center md:items-start gap-2">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-300">
                      <Icon size={16} className="text-primary" />
                    </div>
                    <div className="hidden md:block">
                      <p className="text-[10px] font-black tracking-[0.3em] uppercase text-primary leading-none mb-1">
                        {s.data.label}
                      </p>
                      <p className="text-sm font-bold text-foreground whitespace-nowrap">
                        {s.data.name}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Second vertical line */}
                <div className="relative flex-shrink-0 w-px bg-border/20 my-8 hidden md:block" />

                {/* Content */}
                <div className="relative flex-1 flex flex-col md:flex-row md:items-center gap-3 md:gap-10 py-12 px-6 md:px-10">
                  {/* Mobile label */}
                  <div className="md:hidden">
                    <p className="text-[10px] font-black tracking-[0.3em] uppercase text-primary mb-0.5">{s.data.label}</p>
                    <p className="text-base font-bold text-foreground">{s.data.name}</p>
                  </div>

                  {/* Tagline */}
                  <p className="text-foreground/70 font-semibold text-sm md:text-base italic md:w-56 flex-shrink-0">
                    "{s.data.tagline}"
                  </p>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                    {s.data.desc}
                  </p>
                </div>

                {/* Arrow */}
                <div className="relative flex-shrink-0 flex items-center pr-8 pl-4">
                  <MoveRight
                    size={20}
                    className="text-primary opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ─── CTA strip ─── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 relative overflow-hidden glass-card border border-primary/25 rounded-2xl px-8 md:px-12 py-8 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-primary/8 to-transparent pointer-events-none" />
          <p className="text-foreground font-semibold text-base md:text-lg relative z-10">
            {ds.cta_text}
          </p>
          <a
            href="#contact"
            className="relative z-10 clip-angular bg-primary text-primary-foreground text-sm font-black px-8 py-3 hover:shadow-glow-sm transition-all duration-300 flex items-center gap-2 flex-shrink-0 hover:scale-105"
          >
            {ds.cta_btn}
            <MoveRight size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
