import { motion } from 'framer-motion';
import { Send, MessageCircle, Mail } from 'lucide-react';
import { useLang } from '@/context/LangContext';

export default function ContactSection() {
  const { t } = useLang();

  return (
    <section id="contact" className="relative py-28 overflow-hidden">
      {/* Hero glow from bottom */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/8 blur-[100px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Decorative top line */}
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-primary/50" />
            <div className="w-2 h-2 bg-primary rotate-45" />
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-primary/50" />
          </div>

          <h2 className="font-display text-5xl md:text-7xl font-bold mb-6">
            <span className="text-foreground">{t.cta.title.split('?')[0]}</span>
            <span className="gradient-text">?</span>
          </h2>
          <p className="text-muted-foreground text-xl mb-12 leading-relaxed">
            {t.cta.subtitle}
          </p>

          {/* Contact cards */}
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            <motion.a
              href="mailto:ismoilovshakhzod00@gmail.com"
              whileHover={{ scale: 1.02 }}
              className="group glass-card rounded-xl p-6 border border-border hover:border-primary/40 hover:shadow-glow-sm transition-all duration-300 flex items-center gap-4 text-left"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                <Mail size={18} className="text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-0.5 uppercase tracking-wider">Email</div>
                <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  ismoilovshakhzod00@gmail.com
                </div>
              </div>
            </motion.a>

            <motion.a
              href="https://t.me/ismoilov_online"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              className="group glass-card rounded-xl p-6 border border-border hover:border-primary/40 hover:shadow-glow-sm transition-all duration-300 flex items-center gap-4 text-left"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                <MessageCircle size={18} className="text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-0.5 uppercase tracking-wider">Telegram</div>
                <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  @ismoilov_online
                </div>
              </div>
            </motion.a>
          </div>

          <motion.a
            href="mailto:ismoilovshakhzod00@gmail.com"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 clip-angular bg-primary text-primary-foreground font-bold text-lg px-12 py-4 hover:shadow-glow transition-all duration-300"
          >
            {t.cta.button}
            <Send size={18} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
