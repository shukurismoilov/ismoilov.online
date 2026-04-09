import { motion } from 'framer-motion';
import { Users, Brain, Globe, ArrowRight, Zap, ExternalLink, CheckCircle2, Cpu, Layers } from 'lucide-react';
import { LangProvider, useLang } from '@/context/LangContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const statusColor: Record<string, string> = {
  'Live Product':   'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  'Работает':       'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  'In Development': 'bg-amber-500/15  text-amber-400  border-amber-500/30',
  'В разработке':   'bg-amber-500/15  text-amber-400  border-amber-500/30',
  'Available':      'bg-primary/15    text-primary    border-primary/30',
  'Доступно':       'bg-primary/15    text-primary    border-primary/30',
};

const techStackEN = ['Python', 'TypeScript', 'React', 'PostgreSQL', 'FastAPI', 'Docker', 'Redis', 'OpenAI API'];
const techStackRU = ['Python', 'TypeScript', 'React', 'PostgreSQL', 'FastAPI', 'Docker', 'Redis', 'OpenAI API'];

const featuresEN = [
  { icon: Cpu, title: 'Engineering Depth', desc: 'We architect for scale, not just for demos. Every system is designed to handle real load.' },
  { icon: Zap, title: 'Speed to Market', desc: 'From whiteboard to production in weeks. No endless iterations — we ship.' },
  { icon: Layers, title: 'Full-Stack', desc: 'Frontend, backend, infra, ML — one team handles everything end-to-end.' },
];

const featuresRU = [
  { icon: Cpu, title: 'Глубина инженерии', desc: 'Архитектура для масштаба, не только для демо. Каждая система рассчитана на реальную нагрузку.' },
  { icon: Zap, title: 'Скорость', desc: 'От концепции до продакшна за недели. Без бесконечных итераций — мы деплоим.' },
  { icon: Layers, title: 'Full-Stack', desc: 'Фронтенд, бэкенд, инфра, ML — одна команда, полный цикл.' },
];

function LabsPageContent() {
  const { t, lang } = useLang();
  const ls = t.labs;
  const features = lang === 'en' ? featuresEN : featuresRU;
  const techStack = lang === 'en' ? techStackEN : techStackRU;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero pointer-events-none" />
        <div className="absolute -left-40 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(-45deg, hsl(var(--primary)) 0, hsl(var(--primary)) 1px, transparent 0, transparent 50%)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="container mx-auto px-6 relative z-10 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-flex items-center gap-2 text-xs font-black tracking-[0.35em] uppercase text-primary mb-6">
              {ls.badge}
              <span className="w-10 h-px bg-primary" />
            </span>
            <h1 className="font-display text-6xl md:text-8xl font-black leading-[0.9] mb-6 tracking-tight">
              {ls.title.split('\n').map((l, i) => (
                <span key={i} className="block">
                  {i === 1 ? <span className="gradient-text">{l}</span> : <span className="text-foreground">{l}</span>}
                </span>
              ))}
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-xl leading-relaxed">
              {ls.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why us */}
      <section className="py-16 border-y border-border/30">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <f.icon size={17} className="text-primary" />
                </div>
                <div>
                  <div className="font-bold text-foreground text-sm mb-1">{f.title}</div>
                  <div className="text-sm text-muted-foreground leading-relaxed">{f.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <h2 className="font-display text-4xl md:text-5xl font-black text-foreground">
              {lang === 'en' ? 'Our Projects' : 'Наши проекты'}
            </h2>
          </motion.div>

          <div className="space-y-5">
            {/* Autofin — featured */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group relative glass-card rounded-2xl p-10 border border-primary/20 hover:border-primary/50 hover:shadow-glow transition-all duration-400 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl" />
              <div className="absolute top-0 left-0 w-px h-24 bg-gradient-to-b from-primary/60 to-transparent" />
              <div className="absolute top-0 left-0 w-24 h-px bg-gradient-to-r from-primary/60 to-transparent" />

              <div className="relative grid md:grid-cols-2 gap-10 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-14 h-14 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center">
                      <Users size={24} className="text-primary" />
                    </div>
                    <span className={`text-xs font-black px-3 py-1.5 rounded-full border ${statusColor[ls.autofin.status]}`}>
                      {ls.autofin.status}
                    </span>
                  </div>
                  <p className="text-xs font-black tracking-[0.25em] uppercase text-primary/60 mb-2">{ls.autofin.tagline}</p>
                  <h3 className="font-display text-3xl font-black text-foreground mb-3">{ls.autofin.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">{ls.autofin.desc}</p>
                  <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                    {ls.autofin.tag}
                  </span>
                </div>
                <div className="space-y-3">
                  {(lang === 'en'
                    ? ['Payroll automation', 'Attendance tracking', 'Performance analytics', 'Multi-branch support', 'Mobile-ready interface']
                    : ['Автоматизация зарплат', 'Учёт посещаемости', 'Аналитика эффективности', 'Поддержка филиалов', 'Мобильный интерфейс']
                  ).map((f, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <CheckCircle2 size={14} className="text-primary" />
                      <span className="text-sm text-muted-foreground">{f}</span>
                    </div>
                  ))}
                  <a
                    href={`https://${ls.autofin.link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 text-sm font-bold text-primary hover:underline"
                  >
                    <ExternalLink size={13} />
                    {ls.autofin.link}
                  </a>
                </div>
              </div>
            </motion.div>

            {/* AI + Software */}
            <div className="grid md:grid-cols-2 gap-5">
              {([
                { data: ls.ai, icon: Brain, key: 'ai' },
                { data: ls.software, icon: Globe, key: 'software' },
              ] as const).map(({ data, icon: Icon, key }, i) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="group glass-card rounded-2xl p-8 border border-border hover:border-primary/30 hover:shadow-glow-sm transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                  <div className="relative">
                    <div className="flex items-start justify-between mb-5">
                      <div className="w-11 h-11 rounded-xl bg-muted border border-border flex items-center justify-center group-hover:border-primary/30 group-hover:bg-primary/10 transition-all duration-300">
                        <Icon size={19} className="text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <span className={`text-xs font-black px-2.5 py-1 rounded-full border ${statusColor[data.status]}`}>
                        {data.status}
                      </span>
                    </div>
                    <p className="text-[10px] font-black tracking-[0.25em] uppercase text-primary/50 mb-1">{data.tagline}</p>
                    <h3 className="font-display text-xl font-black text-foreground mb-3">{data.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-5">{data.desc}</p>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-muted text-muted-foreground border border-border/50">
                      {data.tag}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section className="py-16 border-y border-border/30 overflow-hidden">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-8">
            <span className="text-xs font-black tracking-[0.3em] uppercase text-muted-foreground">
              {lang === 'en' ? 'Our Stack' : 'Наш стек'}
            </span>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="text-sm font-bold px-4 py-2 glass-card rounded-lg border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-4xl md:text-5xl font-black text-foreground mb-4">{t.cta.title}</h2>
            <p className="text-muted-foreground mb-8">{t.cta.subtitle}</p>
            <a href="/contact" className="inline-flex items-center gap-2 clip-angular bg-primary text-primary-foreground font-bold text-sm px-10 py-4 hover:shadow-glow transition-all hover:scale-105">
              {t.cta.button} <ArrowRight size={15} />
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function LabsPage() {
  return (
    <LangProvider>
      <LabsPageContent />
    </LangProvider>
  );
}
