import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, Monitor, Layers, ArrowRight, Send,
  CheckCircle2, Eye, X, MoveRight,
} from 'lucide-react';
import { LangProvider, useLang } from '@/context/LangContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

/* ─── Portfolio case studies ─────────────────────────────────── */
const caseStudiesEN = [
  {
    id: 1,
    category: 'IDENTITY',
    title: 'Autofin Brand System',
    desc: 'Complete visual identity for a fintech-HRM startup — logo, color system, typography, and UI kit that scales from mobile to enterprise dashboards.',
    tags: ['Logo', 'Brand System', 'UI Kit'],
    result: '+340% recognition in first 3 months',
    color: 'from-orange-500/20 to-primary/5',
    accent: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
  },
  {
    id: 2,
    category: 'WEB',
    title: 'Auto Dealership Platform',
    desc: 'High-converting landing + catalog for a regional auto dealer. Built for speed, SEO, and lead generation — 0 to live in 2 weeks.',
    tags: ['Web Design', 'Landing', 'SEO'],
    result: '3× more lead inquiries month-over-month',
    color: 'from-blue-500/15 to-primary/5',
    accent: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  },
  {
    id: 3,
    category: 'SMM',
    title: 'Tech Edu Instagram Grid',
    desc: 'A 30-post content grid and story template system for an online education brand. Cohesive visual language that doubled engagement in 6 weeks.',
    tags: ['Content Grid', 'Stories', 'Templates'],
    result: '2× engagement in 6 weeks',
    color: 'from-purple-500/15 to-primary/5',
    accent: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
  },
  {
    id: 4,
    category: 'IDENTITY',
    title: 'Academy Brand Identity',
    desc: 'Full brand identity for a private tutoring academy — from naming consultation through logo design to stationery and digital assets.',
    tags: ['Naming', 'Logo', 'Stationery'],
    result: 'Enrolled 80+ students in launch month',
    color: 'from-emerald-500/15 to-primary/5',
    accent: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  },
  {
    id: 5,
    category: 'WEB',
    title: 'Personal Portfolio — Developer',
    desc: 'Minimalist, dark-mode portfolio for a senior backend engineer. Designed to attract international remote positions.',
    tags: ['Portfolio', 'Dark Mode', 'Responsive'],
    result: 'Landed 2 remote offers in 1 month',
    color: 'from-primary/15 to-primary/3',
    accent: 'bg-primary/15 text-primary border-primary/30',
  },
  {
    id: 6,
    category: 'SMM',
    title: 'Restaurant Visual Content',
    desc: 'Monthly SMM visual package for a premium restaurant — food photography guidelines, caption templates, and a brand-consistent content calendar.',
    tags: ['Food Visual', 'Calendar', 'Reels'],
    result: '+120% Instagram follower growth',
    color: 'from-rose-500/15 to-primary/5',
    accent: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
  },
];

const caseStudiesRU = [
  {
    id: 1,
    category: 'IDENTITY',
    title: 'Бренд-система Autofin',
    desc: 'Полная визуальная идентика для fintech-HRM стартапа — логотип, цветовая система, типографика и UI-кит для мобайла и enterprise-дашбордов.',
    tags: ['Логотип', 'Бренд-система', 'UI Kit'],
    result: '+340% узнаваемости за первые 3 месяца',
    color: 'from-orange-500/20 to-primary/5',
    accent: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
  },
  {
    id: 2,
    category: 'WEB',
    title: 'Платформа автодилера',
    desc: 'Конверсионный лендинг + каталог для регионального автодилера. Скорость, SEO и лидогенерация — от нуля до запуска за 2 недели.',
    tags: ['Веб-дизайн', 'Лендинг', 'SEO'],
    result: '3× больше обращений в месяц',
    color: 'from-blue-500/15 to-primary/5',
    accent: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  },
  {
    id: 3,
    category: 'SMM',
    title: 'Instagram-сетка Tech Edu',
    desc: '30 постов и система шаблонов сторис для образовательного бренда. Единый визуальный язык удвоил вовлечённость за 6 недель.',
    tags: ['Сетка', 'Сторис', 'Шаблоны'],
    result: 'Вовлечённость ×2 за 6 недель',
    color: 'from-purple-500/15 to-primary/5',
    accent: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
  },
  {
    id: 4,
    category: 'IDENTITY',
    title: 'Идентика для учебного центра',
    desc: 'Полный фирменный стиль для частного центра подготовки — от консультации по неймингу до логотипа и цифровых материалов.',
    tags: ['Нейминг', 'Логотип', 'Полиграфия'],
    result: '80+ студентов в первый месяц',
    color: 'from-emerald-500/15 to-primary/5',
    accent: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  },
  {
    id: 5,
    category: 'WEB',
    title: 'Портфолио разработчика',
    desc: 'Минималистичное портфолио в тёмной теме для старшего backend-инженера. Для привлечения международных удалённых предложений.',
    tags: ['Портфолио', 'Тёмная тема', 'Адаптив'],
    result: '2 удалённых оффера за 1 месяц',
    color: 'from-primary/15 to-primary/3',
    accent: 'bg-primary/15 text-primary border-primary/30',
  },
  {
    id: 6,
    category: 'SMM',
    title: 'Визуальный контент ресторана',
    desc: 'Ежемесячный SMM-пакет для премиум-ресторана — гайдлайны фотосъёмки, шаблоны подписей и брендовый контент-календарь.',
    tags: ['Еда', 'Календарь', 'Reels'],
    result: '+120% подписчиков в Instagram',
    color: 'from-rose-500/15 to-primary/5',
    accent: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
  },
];

const categories = ['ALL', 'IDENTITY', 'WEB', 'SMM'];

/* ─── Services strip ─────────────────────────────────────────── */
const services = [
  { icon: Sparkles, key: 'smm'      },
  { icon: Monitor,  key: 'web'      },
  { icon: Layers,   key: 'identity' },
] as const;

/* ─── Main component ─────────────────────────────────────────── */
function DesignPageContent() {
  const { t, lang } = useLang();
  const ds = t.design;

  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [activeCase, setActiveCase] = useState<(typeof caseStudiesEN)[0] | null>(null);
  const [form, setForm] = useState({ name: '', email: '', service: '', brief: '' });
  const [submitted, setSubmitted] = useState(false);

  const cases = lang === 'en' ? caseStudiesEN : caseStudiesRU;
  const filtered = activeFilter === 'ALL' ? cases : cases.filter(c => c.category === activeFilter);

  const serviceOptions = lang === 'en'
    ? ['SMM & Content Design', 'Website Design', 'Brand Identity', 'Full Brand Package', 'Other']
    : ['SMM и контент-дизайн', 'Дизайн сайта', 'Фирменный стиль', 'Полный брендинг', 'Другое'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `Name: ${form.name}\nEmail: ${form.email}\nService: ${form.service}\n\n${form.brief}`;
    window.location.href = `mailto:ismoilovshakhzod00@gmail.com?subject=${encodeURIComponent(`Design Brief — ${form.service || 'New Project'}`)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ─── Hero ────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero pointer-events-none" />
        <div className="absolute -right-60 top-0 w-[700px] h-[700px] bg-primary/6 blur-[180px] rounded-full pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(-45deg, hsl(var(--primary)) 0, hsl(var(--primary)) 1px, transparent 0, transparent 50%)',
            backgroundSize: '24px 24px',
          }}
        />

        <div className="container mx-auto px-6 relative z-10 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-flex items-center gap-2 text-xs font-black tracking-[0.35em] uppercase text-primary mb-6">
              {ds.badge}
              <span className="w-10 h-px bg-primary" />
            </span>
            <h1 className="font-display text-6xl md:text-8xl font-black leading-[0.9] mb-6 tracking-tight">
              {ds.title.split('\n').map((l, i) => (
                <span key={i} className="block">
                  {i === 1 ? <span className="gradient-text">{l}</span> : <span className="text-foreground">{l}</span>}
                </span>
              ))}
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-xl leading-relaxed">
              {ds.subtitle}
            </p>
          </motion.div>

          {/* Services row */}
          <div className="grid sm:grid-cols-3 gap-4 mt-16">
            {services.map(({ icon: Icon, key }, i) => {
              const data = ds[key];
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="group glass-card rounded-2xl p-6 border border-border hover:border-primary/40 hover:shadow-glow-sm transition-all duration-300 relative overflow-hidden cursor-default"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/6 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                  <div className="relative">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all">
                      <Icon size={17} className="text-primary" />
                    </div>
                    <div className="text-[10px] font-black tracking-[0.3em] uppercase text-primary mb-1">{data.label}</div>
                    <div className="font-bold text-foreground text-base mb-2">{data.name}</div>
                    <div className="text-xs text-muted-foreground leading-relaxed">"{data.tagline}"</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Portfolio / Case Studies ────────────────────────── */}
      <section className="py-24 border-t border-border/30">
        <div className="container mx-auto px-6 max-w-6xl">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="text-xs font-black tracking-[0.3em] uppercase text-primary mb-3 block">
                {lang === 'en' ? 'Portfolio' : 'Портфолио'}
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-black text-foreground">
                {lang === 'en' ? 'Selected Work' : 'Избранные работы'}
              </h2>
            </motion.div>

            {/* Filter tabs */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex gap-2 flex-wrap"
            >
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`text-xs font-black px-4 py-2 rounded-full border transition-all duration-200 ${
                    activeFilter === cat
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'glass-card border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          </div>

          {/* Grid */}
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((c, i) => (
                <motion.div
                  key={c.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="group glass-card rounded-2xl border border-border hover:border-primary/35 hover:shadow-glow-sm transition-all duration-300 overflow-hidden cursor-pointer"
                  onClick={() => setActiveCase(c)}
                >
                  {/* Visual top */}
                  <div className={`relative h-44 bg-gradient-to-br ${c.color} flex items-center justify-center overflow-hidden`}>
                    <div className="absolute inset-0 opacity-[0.04]"
                      style={{
                        backgroundImage: 'repeating-linear-gradient(-45deg, hsl(var(--primary)) 0, hsl(var(--primary)) 1px, transparent 0, transparent 50%)',
                        backgroundSize: '16px 16px',
                      }}
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`text-[10px] font-black tracking-[0.3em] px-2.5 py-1 rounded-full border ${c.accent}`}>
                        {c.category}
                      </span>
                    </div>
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                        <Eye size={13} className="text-primary-foreground" />
                      </div>
                    </div>
                    {/* Abstract shape */}
                    <div className="w-20 h-20 rounded-2xl border border-primary/20 bg-primary/8 rotate-12 group-hover:rotate-6 transition-transform duration-500" />
                    <div className="absolute w-12 h-12 rounded-xl border border-primary/15 bg-primary/5 -rotate-6 group-hover:rotate-3 transition-transform duration-500" />
                  </div>

                  <div className="p-6">
                    <h3 className="font-display text-lg font-black text-foreground mb-2 group-hover:text-primary transition-colors">
                      {c.title}
                    </h3>
                    <p className="text-muted-foreground text-xs leading-relaxed mb-4 line-clamp-2">{c.desc}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {c.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border/50">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-primary font-bold">
                      <CheckCircle2 size={11} />
                      {c.result}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ─── Case Study Modal ────────────────────────────────── */}
      <AnimatePresence>
        {activeCase && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setActiveCase(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 30 }}
              transition={{ duration: 0.3 }}
              className="relative glass-card rounded-2xl border border-primary/30 max-w-xl w-full p-8 shadow-glow overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${activeCase.color} opacity-40 rounded-2xl pointer-events-none`} />
              <button
                onClick={() => setActiveCase(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full glass-card border border-border flex items-center justify-center hover:border-primary/40 transition-colors z-10"
              >
                <X size={14} className="text-muted-foreground" />
              </button>

              <div className="relative z-10">
                <span className={`text-[10px] font-black tracking-[0.3em] px-2.5 py-1 rounded-full border ${activeCase.accent} mb-4 inline-block`}>
                  {activeCase.category}
                </span>
                <h3 className="font-display text-2xl font-black text-foreground mb-3">{activeCase.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">{activeCase.desc}</p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {activeCase.tags.map(tag => (
                    <span key={tag} className="text-xs font-bold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="glass-card rounded-xl p-4 border border-primary/20 flex items-center gap-3 mb-6">
                  <CheckCircle2 size={16} className="text-primary flex-shrink-0" />
                  <span className="text-sm font-bold text-foreground">{activeCase.result}</span>
                </div>

                <a
                  href="#inquiry"
                  onClick={() => setActiveCase(null)}
                  className="inline-flex items-center gap-2 clip-angular bg-primary text-primary-foreground font-bold text-sm px-6 py-3 hover:shadow-glow transition-all duration-300"
                >
                  {lang === 'en' ? 'Start a Similar Project' : 'Начать похожий проект'}
                  <MoveRight size={14} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Process strip ───────────────────────────────────── */}
      <section className="py-16 border-y border-border/30 bg-muted/20">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="text-xs font-black tracking-[0.3em] uppercase text-primary">
              {lang === 'en' ? 'How it works' : 'Как это работает'}
            </span>
          </motion.div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {(lang === 'en'
              ? [
                  { n: '01', title: 'Brief',      desc: 'You tell me about your project, goals, and audience.' },
                  { n: '02', title: 'Strategy',   desc: 'I define the visual direction and present a concept.' },
                  { n: '03', title: 'Design',      desc: 'Full execution with 2 rounds of revisions included.' },
                  { n: '04', title: 'Delivery',   desc: 'Source files, brand guidelines, and ongoing support.' },
                ]
              : [
                  { n: '01', title: 'Бриф',       desc: 'Вы рассказываете о проекте, целях и аудитории.' },
                  { n: '02', title: 'Стратегия',  desc: 'Определяю визуальное направление, показываю концепт.' },
                  { n: '03', title: 'Дизайн',     desc: 'Полная реализация — 2 раунда правок включены.' },
                  { n: '04', title: 'Доставка',   desc: 'Исходники, бренд-гайдлайн и дальнейшая поддержка.' },
                ]
            ).map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col gap-3"
              >
                <div className="font-mono text-4xl font-black text-border/40 leading-none">{step.n}</div>
                <div className="font-bold text-foreground text-sm">{step.title}</div>
                <div className="text-xs text-muted-foreground leading-relaxed">{step.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Project Inquiry Form ────────────────────────────── */}
      <section id="inquiry" className="py-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="grid lg:grid-cols-2 gap-12 items-start">

            {/* Left: intro */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="text-xs font-black tracking-[0.3em] uppercase text-primary mb-5 block">
                {lang === 'en' ? 'Start a Design Project' : 'Начать дизайн-проект'}
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-black text-foreground leading-[1] mb-5">
                {lang === 'en'
                  ? <>Let's build a brand<br /><span className="gradient-text">worth remembering.</span></>
                  : <>Создадим бренд,<br /><span className="gradient-text">который запомнят.</span></>
                }
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                {lang === 'en'
                  ? "Send a brief and I'll respond within 24 hours with a tailored proposal. No templates, no generic pitches — just real creative direction."
                  : 'Отправьте бриф — отвечу в течение 24 часов с персональным предложением. Без шаблонов, только настоящее творческое направление.'}
              </p>

              {/* Packages */}
              <div className="space-y-3">
                {(lang === 'en' ? [
                  { name: 'SMM Package',      items: 'Content grid · Story templates · 30 posts/mo' },
                  { name: 'Website',           items: 'Design + Dev · SEO · Responsive · Launch ready' },
                  { name: 'Brand Identity',    items: 'Logo · Colors · Typography · Brand guide' },
                  { name: 'Full Brand',        items: 'Identity + Web + SMM — everything in one' },
                ] : [
                  { name: 'SMM-пакет',         items: 'Сетка постов · Шаблоны сторис · 30 постов/мес' },
                  { name: 'Сайт',              items: 'Дизайн + Разработка · SEO · Адаптив · Запуск' },
                  { name: 'Фирменный стиль',   items: 'Логотип · Цвета · Типографика · Гайдлайн' },
                  { name: 'Полный брендинг',   items: 'Стиль + Сайт + SMM — всё в одном' },
                ]).map((pkg, i) => (
                  <div key={i} className="flex items-start gap-3 glass-card rounded-xl p-4 border border-border/50">
                    <div className="w-5 h-5 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    </div>
                    <div>
                      <div className="font-bold text-foreground text-sm">{pkg.name}</div>
                      <div className="text-[11px] text-muted-foreground">{pkg.items}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: form */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass-card rounded-2xl p-10 border border-primary/30 text-center"
                >
                  <CheckCircle2 size={44} className="text-primary mx-auto mb-4" />
                  <h3 className="font-display text-xl font-black text-foreground mb-2">
                    {lang === 'en' ? 'Brief sent!' : 'Бриф отправлен!'}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {lang === 'en' ? "Send the email to complete. I'll respond within 24 hours." : 'Завершите отправку письма. Отвечу в течение 24 часов.'}
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-sm text-primary hover:underline font-bold"
                  >
                    {lang === 'en' ? 'Submit another' : 'Отправить ещё'}
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 border border-border space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-wider text-muted-foreground block mb-1.5">
                        {lang === 'en' ? 'Your Name' : 'Ваше имя'} *
                      </label>
                      <input
                        required
                        type="text"
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        placeholder={lang === 'en' ? 'Alex Smith' : 'Александр'}
                        className="w-full rounded-xl border border-border/60 bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-wider text-muted-foreground block mb-1.5">
                        Email *
                      </label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        placeholder="you@example.com"
                        className="w-full rounded-xl border border-border/60 bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-black uppercase tracking-wider text-muted-foreground block mb-1.5">
                      {lang === 'en' ? 'Service' : 'Услуга'}
                    </label>
                    <select
                      value={form.service}
                      onChange={e => setForm(f => ({ ...f, service: e.target.value }))}
                      className="w-full rounded-xl border border-border/60 bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                    >
                      <option value="">{lang === 'en' ? 'Select a service...' : 'Выберите услугу...'}</option>
                      {serviceOptions.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-black uppercase tracking-wider text-muted-foreground block mb-1.5">
                      {lang === 'en' ? 'Project Brief' : 'Бриф проекта'} *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.brief}
                      onChange={e => setForm(f => ({ ...f, brief: e.target.value }))}
                      placeholder={lang === 'en'
                        ? 'Describe your project — what you do, who your audience is, what you need, timeline...'
                        : 'Опишите проект — чем занимаетесь, кто ваша аудитория, что нужно, сроки...'}
                      className="w-full rounded-xl border border-border/60 bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full clip-angular bg-primary text-primary-foreground font-bold text-sm py-4 flex items-center justify-center gap-2 hover:shadow-glow transition-all duration-300 hover:scale-[1.02]"
                  >
                    {lang === 'en' ? 'Send Design Brief' : 'Отправить бриф'}
                    <Send size={14} />
                  </button>

                  <p className="text-center text-[10px] text-muted-foreground">
                    {lang === 'en' ? 'No commitment. Free consultation included.' : 'Без обязательств. Консультация бесплатна.'}
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Bottom CTA ──────────────────────────────────────── */}
      <section className="py-16 border-t border-border/30">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-4xl md:text-5xl font-black text-foreground mb-4">{t.cta.title}</h2>
            <p className="text-muted-foreground mb-8">{t.cta.subtitle}</p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 clip-angular bg-primary text-primary-foreground font-bold text-sm px-10 py-4 hover:shadow-glow transition-all hover:scale-105"
            >
              {t.cta.button} <ArrowRight size={15} />
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function DesignPage() {
  return (
    <LangProvider>
      <DesignPageContent />
    </LangProvider>
  );
}
