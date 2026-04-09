import { motion } from 'framer-motion';
import { useState } from 'react';
import { Mail, MessageCircle, Send, CheckCircle2, Clock, ArrowRight } from 'lucide-react';
import { LangProvider, useLang } from '@/context/LangContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

function ContactPageContent() {
  const { t, lang } = useLang();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const subjects = lang === 'en'
    ? ['Design Project', 'Software / Labs', 'Academy Enrollment', 'Partnership', 'Other']
    : ['Дизайн-проект', 'Программное решение', 'Поступление в академию', 'Партнёрство', 'Другое'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Compose mailto link
    const mailtoLink = `mailto:shukurismoilovdev@gmail.com?subject=${encodeURIComponent(form.subject || 'New inquiry')}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`;
    window.location.href = mailtoLink;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/6 blur-[100px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            {/* Decorative line */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-transparent to-primary/50" />
              <div className="w-2 h-2 bg-primary rotate-45" />
              <div className="h-px flex-1 max-w-[100px] bg-gradient-to-l from-transparent to-primary/50" />
            </div>

            <span className="inline-flex items-center gap-2 text-xs font-black tracking-[0.35em] uppercase text-primary mb-5">
              {lang === 'en' ? 'Get in Touch' : 'Связаться'}
            </span>
            <h1 className="font-display text-6xl md:text-8xl font-black leading-[0.9] mb-6 tracking-tight">
              <span className="text-foreground">{t.cta.title.split('?')[0]}</span>
              <span className="gradient-text">?</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
              {t.cta.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact channels */}
      <section className="py-12">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="grid sm:grid-cols-3 gap-4 mb-16">
            {[
              {
                icon: Mail,
                label: 'Email',
                value: 'shukurismoilovdev@gmail.com',
                href: 'mailto:shukurismoilovdev@gmail.com',
                sub: lang === 'en' ? 'Reply within 24h' : 'Ответ в течение 24ч',
              },
              {
                icon: MessageCircle,
                label: 'Telegram',
                value: '@shukurismoilov',
                href: 'https://t.me/shukurismoilov',
                sub: lang === 'en' ? 'Fastest response' : 'Самый быстрый ответ',
              },
              {
                icon: Clock,
                label: lang === 'en' ? 'Working Hours' : 'Рабочие часы',
                value: '09:00 — 21:00',
                href: null,
                sub: lang === 'en' ? 'Mon–Sat (UTC+5)' : 'Пн–Сб (UTC+5)',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="group glass-card rounded-xl p-6 border border-border hover:border-primary/40 hover:shadow-glow-sm transition-all duration-300 flex flex-col gap-3 cursor-pointer block"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <item.icon size={17} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">{item.label}</div>
                      <div className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{item.value}</div>
                      <div className="text-xs text-muted-foreground mt-1">{item.sub}</div>
                    </div>
                  </a>
                ) : (
                  <div className="glass-card rounded-xl p-6 border border-border flex flex-col gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <item.icon size={17} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">{item.label}</div>
                      <div className="text-sm font-bold text-foreground">{item.value}</div>
                      <div className="text-xs text-muted-foreground mt-1">{item.sub}</div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Form */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl font-black text-foreground mb-3">
                {lang === 'en' ? 'Send a Message' : 'Написать сообщение'}
              </h2>
              <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
                {lang === 'en'
                  ? 'Tell me what you need. Whether it\'s a new brand, an app, or a course — I\'ll get back to you personally.'
                  : 'Расскажите, что вам нужно. Новый бренд, приложение или курс — отвечу лично.'}
              </p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass-card rounded-2xl p-10 border border-primary/30 text-center"
                >
                  <CheckCircle2 size={40} className="text-primary mx-auto mb-4" />
                  <h3 className="font-display text-xl font-black text-foreground mb-2">
                    {lang === 'en' ? "Email client opened!" : "Почтовый клиент открыт!"}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {lang === 'en' ? "Finish sending your email and I'll be in touch soon." : "Отправьте письмо и я свяжусь с вами."}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">
                        {lang === 'en' ? 'Name' : 'Имя'} *
                      </label>
                      <input
                        required
                        type="text"
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        placeholder={lang === 'en' ? 'Your name' : 'Ваше имя'}
                        className="w-full glass-card rounded-xl border border-border/60 bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">
                        Email *
                      </label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        placeholder="you@example.com"
                        className="w-full glass-card rounded-xl border border-border/60 bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">
                      {lang === 'en' ? 'Subject' : 'Тема'}
                    </label>
                    <select
                      value={form.subject}
                      onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                      className="w-full glass-card rounded-xl border border-border/60 bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                    >
                      <option value="">{lang === 'en' ? 'Select a topic...' : 'Выберите тему...'}</option>
                      {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">
                      {lang === 'en' ? 'Message' : 'Сообщение'} *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      placeholder={lang === 'en' ? 'Tell me about your project or question...' : 'Расскажите о вашем проекте или вопросе...'}
                      className="w-full glass-card rounded-xl border border-border/60 bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full clip-angular bg-primary text-primary-foreground font-bold text-sm py-4 flex items-center justify-center gap-2 hover:shadow-glow transition-all duration-300 hover:scale-[1.02]"
                  >
                    {lang === 'en' ? 'Send Message' : 'Отправить'}
                    <Send size={15} />
                  </button>
                </form>
              )}
            </motion.div>

            {/* Right: FAQ / quick answers */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="font-display text-xl font-black text-foreground mb-6">
                {lang === 'en' ? 'Quick Answers' : 'Быстрые ответы'}
              </h3>
              {(lang === 'en' ? [
                { q: 'How fast do you respond?', a: 'Usually within a few hours on Telegram, and within 24h by email.' },
                { q: 'Do you work with international clients?', a: 'Yes. I work remotely with clients globally — in English and Russian.' },
                { q: 'How do I start a project?', a: 'Send a brief message describing what you need. We\'ll schedule a free 30-min discovery call.' },
                { q: 'What are your rates?', a: 'Rates depend on scope. Send your brief and I\'ll send a custom proposal within 24h.' },
              ] : [
                { q: 'Как быстро вы отвечаете?', a: 'Обычно в течение нескольких часов в Telegram, и в течение 24ч по email.' },
                { q: 'Работаете с зарубежными клиентами?', a: 'Да. Работаю удалённо с клиентами по всему миру на русском и английском.' },
                { q: 'Как начать проект?', a: 'Напишите краткое описание задачи. Запланируем бесплатный 30-минутный звонок.' },
                { q: 'Каковы расценки?', a: 'Зависит от объёма. Пришлите бриф — пришлю предложение в течение 24ч.' },
              ]).map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="glass-card rounded-xl p-5 border border-border/50 hover:border-primary/25 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <ArrowRight size={13} className="text-primary mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-bold text-foreground text-sm mb-1">{item.q}</div>
                      <div className="text-xs text-muted-foreground leading-relaxed">{item.a}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function ContactPage() {
  return (
    <LangProvider>
      <ContactPageContent />
    </LangProvider>
  );
}
