import { motion } from 'framer-motion';
import { useLang } from '@/context/LangContext';
import logoStacked from '@/assets/logo-stacked.png';

export default function AboutSection() {
  const { t } = useLang();

  return (
    <section id="about" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-section pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative glass-card rounded-2xl p-12 border border-border overflow-hidden">
              {/* Background geometric */}
              <div className="absolute inset-0 opacity-5">
                <svg width="100%" height="100%" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
                  <line x1="0" y1="400" x2="400" y2="0" stroke="hsl(var(--primary))" strokeWidth="1"/>
                  <line x1="50" y1="400" x2="400" y2="50" stroke="hsl(var(--primary))" strokeWidth="0.5"/>
                  <line x1="100" y1="400" x2="400" y2="100" stroke="hsl(var(--primary))" strokeWidth="0.5"/>
                  <line x1="150" y1="400" x2="400" y2="150" stroke="hsl(var(--primary))" strokeWidth="0.5"/>
                  <line x1="0" y1="0" x2="400" y2="400" stroke="hsl(var(--primary))" strokeWidth="0.3" opacity="0.5"/>
                </svg>
              </div>

              {/* Logo centered */}
              <div className="relative flex flex-col items-center">
                <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full" />
                <img src={logoStacked} alt="Ismoilov Online" className="relative w-48 h-auto animate-float mb-8" />

                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-4 w-full">
                  {t.about.stats.map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      className="glass-card rounded-lg p-4 text-center border border-border/50"
                    >
                      <div className="font-display text-2xl font-bold gradient-text">{stat.value}</div>
                      <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.3em] uppercase text-primary mb-6">
              <span className="w-8 h-px bg-primary" />
              {t.about.badge}
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              {t.about.title.split('\n').map((line, i) => (
                <span key={i} className="block">
                  {i === 1 ? <span className="gradient-text">{line}</span> : line}
                </span>
              ))}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              {t.about.bio}
            </p>

            {/* Tech stack visual */}
            <div className="flex flex-wrap gap-2">
              {['Python', 'TypeScript', 'React', 'PostgreSQL', 'AI/ML', 'Node.js'].map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-semibold px-3 py-1.5 glass-card rounded-md border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
