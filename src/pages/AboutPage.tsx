import { motion } from 'framer-motion';
import { ArrowRight, Code2, Palette, GraduationCap, Rocket, Globe } from 'lucide-react';
import { LangProvider, useLang } from '@/context/LangContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import logoStacked from '@/assets/logo-stacked.png';

function AboutPageContent() {
  const { t, lang } = useLang();
  const ab = t.about;

  const timeline = lang === 'en' ? [
    { year: '2018', icon: GraduationCap, title: 'Started Teaching', desc: 'Began tutoring mathematics and programming to university students.' },
    { year: '2020', icon: Code2, title: 'Software Engineering', desc: 'Built first production SaaS product. Shipped Autofin HRM to the automotive sector.' },
    { year: '2022', icon: Rocket, title: 'Launched The Labs', desc: 'Expanded into AI & ML projects. Built custom automation systems for businesses.' },
    { year: '2023', icon: Palette, title: 'Added Design', desc: 'Formalized design services — brand identity, SMM, and web design for clients.' },
    { year: '2024', icon: Globe, title: 'Ismoilov.Online', desc: 'Unified all three disciplines under one platform for global clients.' },
  ] : [
    { year: '2018', icon: GraduationCap, title: 'Начал преподавать', desc: 'Репетиторство по математике и программированию для студентов университета.' },
    { year: '2020', icon: Code2, title: 'Инженерия', desc: 'Разработал первый SaaS-продукт. Запустил Autofin HRM для автомобильной отрасли.' },
    { year: '2022', icon: Rocket, title: 'Запуск Labs', desc: 'Расширение в AI и ML. Системы автоматизации для бизнеса.' },
    { year: '2023', icon: Palette, title: 'Дизайн', desc: 'Фирменный стиль, SMM и веб-дизайн для клиентов.' },
    { year: '2024', icon: Globe, title: 'Ismoilov.Online', desc: 'Объединил все три направления на одной платформе.' },
  ];

  const disciplines = lang === 'en' ? [
    { label: 'Engineering', items: ['Python', 'TypeScript', 'React', 'PostgreSQL', 'FastAPI', 'Docker'] },
    { label: 'Design', items: ['Brand Identity', 'UI/UX', 'SMM Content', 'Figma', 'Typography'] },
    { label: 'Education', items: ['Mathematics', 'English / IELTS', 'Programming', 'Mentoring', 'Curriculum Design'] },
  ] : [
    { label: 'Инженерия', items: ['Python', 'TypeScript', 'React', 'PostgreSQL', 'FastAPI', 'Docker'] },
    { label: 'Дизайн', items: ['Фирменный стиль', 'UI/UX', 'SMM контент', 'Figma', 'Типографика'] },
    { label: 'Образование', items: ['Математика', 'Английский / IELTS', 'Программирование', 'Менторинг'] },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero pointer-events-none" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 blur-[140px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <span className="inline-flex items-center gap-2 text-xs font-black tracking-[0.35em] uppercase text-primary mb-6">
                <span className="w-8 h-px bg-primary" />
                {ab.badge}
              </span>
              <h1 className="font-display text-5xl md:text-7xl font-black leading-[0.9] mb-6 tracking-tight">
                {ab.title.split('\n').map((l, i) => (
                  <span key={i} className="block">
                    {i === 1 ? <span className="gradient-text">{l}</span> : <span className="text-foreground">{l}</span>}
                  </span>
                ))}
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed mb-10">{ab.bio}</p>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {ab.stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="glass-card rounded-xl p-4 text-center border border-border/50"
                  >
                    <div className="font-display text-2xl font-black gradient-text">{stat.value}</div>
                    <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: visual card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative glass-card rounded-2xl p-12 border border-border overflow-hidden">
                <div className="absolute inset-0 opacity-5">
                  <svg width="100%" height="100%" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
                    <line x1="0" y1="400" x2="400" y2="0" stroke="hsl(var(--primary))" strokeWidth="1"/>
                    <line x1="50" y1="400" x2="400" y2="50" stroke="hsl(var(--primary))" strokeWidth="0.5"/>
                    <line x1="100" y1="400" x2="400" y2="100" stroke="hsl(var(--primary))" strokeWidth="0.5"/>
                    <line x1="0" y1="0" x2="400" y2="400" stroke="hsl(var(--primary))" strokeWidth="0.3" opacity="0.5"/>
                  </svg>
                </div>
                <div className="relative flex flex-col items-center">
                  <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full" />
                  <img src={logoStacked} alt="Ismoilov Online" className="relative w-40 h-auto animate-float mb-6" />
                  <p className="text-center text-muted-foreground text-sm italic leading-relaxed max-w-xs">
                    {lang === 'en'
                      ? '"Engineer. Educator. Designer. These aren\'t three jobs — they\'re one philosophy."'
                      : '"Инженер. Педагог. Дизайнер. Это не три профессии — это одна философия."'}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Disciplines */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-section pointer-events-none" />
        <div className="container mx-auto px-6 max-w-5xl relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl font-black text-foreground mb-10"
          >
            {lang === 'en' ? 'What I Do' : 'Что я делаю'}
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-5">
            {disciplines.map((d, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-2xl p-7 border border-border/50 hover:border-primary/30 transition-colors"
              >
                <h3 className="font-display text-lg font-black text-primary mb-4">{d.label}</h3>
                <div className="space-y-2">
                  {d.items.map((item, j) => (
                    <div key={j} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                      <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl font-black text-foreground mb-12"
          >
            {lang === 'en' ? 'The Journey' : 'Путь'}
          </motion.h2>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-border/40" />
            <div className="space-y-10">
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative flex gap-6 pl-16"
                >
                  <div className="absolute left-0 w-12 h-12 rounded-xl glass-card border border-primary/20 flex items-center justify-center">
                    <item.icon size={17} className="text-primary" />
                  </div>
                  <div>
                    <span className="text-xs font-black text-primary tracking-widest">{item.year}</span>
                    <h3 className="font-bold text-foreground text-base mt-0.5 mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-border/30">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-4xl font-black text-foreground mb-4">{t.cta.title}</h2>
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

export default function AboutPage() {
  return (
    <LangProvider>
      <AboutPageContent />
    </LangProvider>
  );
}
