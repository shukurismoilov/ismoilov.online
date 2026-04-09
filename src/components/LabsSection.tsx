import { motion } from 'framer-motion';
import { Users, Brain, Globe, ArrowUpRight, Zap, ExternalLink } from 'lucide-react';
import { useLang } from '@/context/LangContext';

export default function LabsSection() {
  const { t } = useLang();
  const ls = t.labs;

  const statusColor: Record<string, string> = {
    'Live Product':   'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    'Работает':       'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    'In Development': 'bg-amber-500/15  text-amber-400  border-amber-500/30',
    'В разработке':   'bg-amber-500/15  text-amber-400  border-amber-500/30',
    'Available':      'bg-primary/15    text-primary    border-primary/30',
    'Доступно':       'bg-primary/15    text-primary    border-primary/30',
  };

  return (
    <section id="labs" className="relative py-32 overflow-hidden">
      {/* BG glow left */}
      <div className="absolute -left-40 bottom-0 w-[500px] h-[500px] bg-primary/4 blur-[140px] rounded-full pointer-events-none" />

      {/* Angular decoration */}
      <div className="absolute -left-20 bottom-20 opacity-[0.04] pointer-events-none rotate-180">
        <svg width="400" height="400" viewBox="0 0 400 400" fill="none">
          <polygon points="400,0 400,400 0,400" fill="hsl(var(--primary))"/>
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">

        {/* ─── Header ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20 text-right"
        >
          <span className="inline-flex items-center gap-2 text-xs font-black tracking-[0.35em] uppercase text-primary mb-5">
            {ls.badge}
            <span className="w-10 h-px bg-primary" />
          </span>
          <h2 className="font-display text-5xl md:text-7xl font-black text-foreground leading-[0.9] mb-5">
            {ls.title.split('\n').map((l, i) => (
              <span key={i} className="block">
                {i === 1 ? <span className="gradient-text">{l}</span> : l}
              </span>
            ))}
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-md ml-auto leading-relaxed">
            {ls.subtitle}
          </p>
        </motion.div>

        {/* ─── Layout: featured left, 2 stacked right ─── */}
        <div className="grid md:grid-cols-2 gap-5">

          {/* ── Autofin — large featured card ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
            className="group relative glass-card rounded-2xl p-10 border border-primary/20 hover:border-primary/50 hover:shadow-glow transition-all duration-400 overflow-hidden md:row-span-2 flex flex-col justify-between cursor-pointer"
          >
            {/* Glow bg */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl" />
            {/* Corner accent */}
            <div className="absolute top-0 left-0 w-px h-24 bg-gradient-to-b from-primary/60 to-transparent" />
            <div className="absolute top-0 left-0 w-24 h-px bg-gradient-to-r from-primary/60 to-transparent" />

            {/* Top */}
            <div className="relative">
              <div className="flex items-start justify-between mb-10">
                <div className="w-14 h-14 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center group-hover:bg-primary/25 transition-colors duration-300">
                  <Users size={24} className="text-primary" />
                </div>
                <div className="flex items-center gap-2">
                  <Zap size={11} className="text-primary" />
                  <span className={`text-xs font-black px-3 py-1 rounded-full border tracking-wide ${statusColor[ls.autofin.status]}`}>
                    {ls.autofin.status}
                  </span>
                </div>
              </div>

              <p className="text-xs font-black tracking-[0.25em] uppercase text-primary/60 mb-2">
                {ls.autofin.tagline}
              </p>
              <h3 className="font-display text-3xl md:text-4xl font-black text-foreground mb-4 leading-tight">
                {ls.autofin.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-8 text-base">
                {ls.autofin.desc}
              </p>
              <span className="inline-flex text-xs font-bold px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                {ls.autofin.tag}
              </span>
            </div>

            {/* Bottom */}
            <div className="relative mt-10 pt-6 border-t border-border/40 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                <ExternalLink size={13} className="text-primary" />
                {ls.autofin.link}
              </div>
              <ArrowUpRight size={20} className="text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-1 group-hover:translate-y-0" />
            </div>

            {/* Corner clip */}
            <div className="absolute bottom-0 right-0 w-0 h-0 border-b-[56px] border-r-[56px] border-b-transparent border-r-primary/10" />
          </motion.div>

          {/* ── AI + Software cards ── */}
          {([
            { data: ls.ai,       icon: Brain,  key: 'ai'       },
            { data: ls.software, icon: Globe,  key: 'software' },
          ] as const).map(({ data, icon: Icon, key }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className="group glass-card rounded-2xl p-8 border border-border hover:border-primary/30 hover:shadow-glow-sm transition-all duration-300 cursor-pointer relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              {/* Top accent */}
              <div className="absolute top-0 right-8 w-8 h-px bg-primary/40" />

              <div className="relative flex items-start justify-between mb-5">
                <div className="w-11 h-11 rounded-xl bg-muted border border-border flex items-center justify-center group-hover:border-primary/30 group-hover:bg-primary/10 transition-all duration-300">
                  <Icon size={19} className="text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                </div>
                <span className={`text-xs font-black px-2.5 py-1 rounded-full border tracking-wide ${statusColor[data.status]}`}>
                  {data.status}
                </span>
              </div>

              <div className="relative">
                <p className="text-[10px] font-black tracking-[0.25em] uppercase text-primary/50 mb-1">{data.tagline}</p>
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-display text-xl font-black text-foreground">{data.title}</h3>
                  <ArrowUpRight size={16} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-0.5" />
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">{data.desc}</p>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-muted text-muted-foreground border border-border/50">
                  {data.tag}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
