import { motion } from 'framer-motion';
import { Calculator, BookOpen, Code2, Users, CheckCircle2, ArrowRight, Clock, Star } from 'lucide-react';
import { LangProvider } from '@/context/LangContext';
import { useLang } from '@/context/LangContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const icons = [Calculator, BookOpen, Code2];

const tokenMap = {
  primary: {
    border: 'border-primary/25',
    iconBg: 'bg-primary/10 border-primary/20',
    iconClr: 'text-primary',
    tag: 'bg-primary/10 text-primary border-primary/20',
    glow: 'from-primary/10 to-transparent',
    bar: 'bg-primary',
    dot: 'bg-primary',
  },
  blue: {
    border: 'border-blue-500/25',
    iconBg: 'bg-blue-500/10 border-blue-500/20',
    iconClr: 'text-blue-400',
    tag: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    glow: 'from-blue-500/10 to-transparent',
    bar: 'bg-blue-400',
    dot: 'bg-blue-400',
  },
  emerald: {
    border: 'border-emerald-500/25',
    iconBg: 'bg-emerald-500/10 border-emerald-500/20',
    iconClr: 'text-emerald-400',
    tag: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    glow: 'from-emerald-500/10 to-transparent',
    bar: 'bg-emerald-400',
    dot: 'bg-emerald-400',
  },
};
const accents = ['primary', 'blue', 'emerald'] as const;

const curriculumEN = [
  {
    highlights: ['Algebra & Functions', 'Calculus & Derivatives', 'Probability & Statistics', 'Logical Reasoning', 'Problem-Solving Patterns'],
    duration: '3 months',
    sessions: '24 sessions',
  },
  {
    highlights: ['Grammar Mastery', 'Professional Writing', 'Speaking Confidence', 'IELTS Preparation', 'Technical Vocabulary'],
    duration: '4 months',
    sessions: '32 sessions',
  },
  {
    highlights: ['Python Fundamentals', 'Data Structures & Algorithms', 'JavaScript & Web Dev', 'REST APIs & Databases', 'Real Project Portfolio'],
    duration: '6 months',
    sessions: '48 sessions',
  },
];

const curriculumRU = [
  {
    highlights: ['Алгебра и функции', 'Математический анализ', 'Вероятность и статистика', 'Логическое мышление', 'Методы решения задач'],
    duration: '3 месяца',
    sessions: '24 занятия',
  },
  {
    highlights: ['Грамматика', 'Деловое письмо', 'Разговорная практика', 'Подготовка к IELTS', 'Технический словарь'],
    duration: '4 месяца',
    sessions: '32 занятия',
  },
  {
    highlights: ['Основы Python', 'Алгоритмы и структуры данных', 'JavaScript и веб-разработка', 'REST API и базы данных', 'Реальный портфель проектов'],
    duration: '6 месяцев',
    sessions: '48 занятий',
  },
];

function AcademyPageContent() {
  const { t, lang } = useLang();
  const ac = t.academy;
  const curriculum = lang === 'en' ? curriculumEN : curriculumRU;

  const subjects = [
    { ...ac.math, icon: 0 },
    { ...ac.english, icon: 1 },
    { ...ac.programming, icon: 2 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/5 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />
        <div className="container mx-auto px-6 relative z-10 max-w-5xl text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-flex items-center gap-2 text-xs font-black tracking-[0.35em] uppercase text-primary mb-6">
              <span className="w-8 h-px bg-primary" />
              {ac.badge}
              <span className="w-8 h-px bg-primary" />
            </span>
            <h1 className="font-display text-6xl md:text-8xl font-black leading-[0.9] mb-6 tracking-tight">
              {ac.title.split('\n').map((l, i) => (
                <span key={i} className="block">
                  {i === 1 ? <span className="gradient-text">{l}</span> : <span className="text-foreground">{l}</span>}
                </span>
              ))}
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              {ac.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Courses */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-6">
            {subjects.map((subject, i) => {
              const Icon = icons[subject.icon];
              const accent = accents[subject.icon];
              const tk = tokenMap[accent];
              const curr = curriculum[i];

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.13 }}
                  className={`group glass-card rounded-2xl border ${tk.border} hover:shadow-glass transition-all duration-300 overflow-hidden flex flex-col`}
                >
                  {/* Top bar */}
                  <div className={`h-1 w-full ${tk.bar} opacity-60`} />

                  <div className="p-8 flex flex-col flex-1">
                    {/* Icon + level */}
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-12 h-12 rounded-xl ${tk.iconBg} border flex items-center justify-center`}>
                        <Icon size={21} className={tk.iconClr} />
                      </div>
                      <span className={`text-xs font-black px-2.5 py-1 rounded-full border ${tk.tag}`}>
                        {subject.level}
                      </span>
                    </div>

                    <p className={`text-xs font-black tracking-[0.2em] uppercase ${tk.iconClr} opacity-70 mb-2`}>
                      {subject.tagline}
                    </p>
                    <h3 className="font-display text-2xl font-black text-foreground mb-3">{subject.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">{subject.desc}</p>

                    {/* Curriculum highlights */}
                    <div className="space-y-2 mb-6 flex-1">
                      {curr.highlights.map((item, j) => (
                        <div key={j} className="flex items-center gap-2.5">
                          <CheckCircle2 size={13} className={tk.iconClr} />
                          <span className="text-sm text-muted-foreground">{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Meta */}
                    <div className="flex items-center gap-4 pt-5 border-t border-border/40 text-xs text-muted-foreground mb-5">
                      <div className="flex items-center gap-1.5">
                        <Clock size={11} className={tk.iconClr} />
                        <span>{curr.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users size={11} className={tk.iconClr} />
                        <span>{curr.sessions}</span>
                      </div>
                    </div>

                    <a
                      href="/contact"
                      className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm ${tk.iconBg} border ${tk.border} ${tk.iconClr} hover:opacity-80 transition-opacity`}
                    >
                      {lang === 'en' ? 'Enroll Now' : 'Записаться'}
                      <ArrowRight size={14} />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-section pointer-events-none" />
        <div className="container mx-auto px-6 max-w-5xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="font-display text-4xl md:text-5xl font-black text-foreground mb-4">
              {lang === 'en' ? 'Why students choose us' : 'Почему выбирают нас'}
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {(lang === 'en'
              ? [
                  { icon: Star, label: 'Mentor-led', desc: 'Real 1-on-1 guidance, not pre-recorded videos.' },
                  { icon: Code2, label: 'Project-based', desc: 'Build real things from day one.' },
                  { icon: Users, label: '500+ Alumni', desc: 'A network that helps you land jobs.' },
                  { icon: CheckCircle2, label: 'Proven Results', desc: 'Students placed at top companies.' },
                ]
              : [
                  { icon: Star, label: 'С наставником', desc: 'Личное сопровождение, не просто видео.' },
                  { icon: Code2, label: 'На практике', desc: 'Строите реальные проекты с первого дня.' },
                  { icon: Users, label: '500+ выпускников', desc: 'Сеть для поиска работы и роста.' },
                  { icon: CheckCircle2, label: 'Результат', desc: 'Студенты в ведущих компаниях.' },
                ]
            ).map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-xl p-6 border border-border/50 text-center hover:border-primary/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-3">
                  <item.icon size={18} className="text-primary" />
                </div>
                <div className="font-bold text-foreground text-sm mb-1">{item.label}</div>
                <div className="text-xs text-muted-foreground">{item.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-4xl md:text-5xl font-black text-foreground mb-4">
              {t.cta.title}
            </h2>
            <p className="text-muted-foreground mb-8">{t.cta.subtitle}</p>
            <a href="/contact" className="inline-flex items-center gap-2 clip-angular bg-primary text-primary-foreground font-bold text-sm px-10 py-4 hover:shadow-glow transition-all duration-300 hover:scale-105">
              {t.cta.button}
              <ArrowRight size={15} />
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function AcademyPage() {
  return (
    <LangProvider>
      <AcademyPageContent />
    </LangProvider>
  );
}
