import { useLang } from '@/context/LangContext';
import logoWide from '@/assets/logo-wide.png';

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="relative border-t border-border py-12 overflow-hidden">
      <div className="absolute inset-0 bg-card/40 pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-3 gap-8 items-start mb-10">
          {/* Brand */}
          <div>
            <img src={logoWide} alt="Ismoilov Online" className="h-7 w-auto mb-3" />
            <p className="text-muted-foreground text-sm">{t.footer.tagline}</p>
          </div>

          {/* Links */}
          <div>
            <div className="text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground mb-4">{t.footer.links}</div>
            <div className="flex flex-col gap-2">
            {[
                { label: t.nav.design,   href: '/#design'   },
                { label: t.nav.labs,     href: '/labs'     },
                { label: t.nav.academy,  href: '/academy'  },
                { label: t.nav.about,    href: '/about'    },
                { label: t.nav.contact,  href: '/contact'  },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <div className="text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground mb-4">Connect</div>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <a href="https://t.me/shukurismoilov" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Telegram</a>
              <a href="mailto:shukurismoilovdev@gmail.com" className="hover:text-primary transition-colors">Email</a>
              <a href="https://github.com/shukurismoilov" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">GitHub</a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border/50 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">{t.footer.rights.replace('2025', String(new Date().getFullYear()))}</p>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-xs text-muted-foreground">ismoilov.online</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
