import { Truck, FlaskConical, PenLine, Lightbulb, Linkedin, MessageCircle, Mail, ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button, Card, Grid, Item, Reveal, Section, Seo, Stagger, PageHero } from '../components/ui'
import { siteData, pillars, featured } from '../data/siteData'

const Icons = { Truck, FlaskConical, PenLine, Lightbulb }
const SocialIcons = { Linkedin, MessageCircle, Mail }

const Trade = () => (
  <svg viewBox="0 0 400 420" className="h-full w-full" aria-hidden="true">
    <g stroke="#B89A62" fill="none" strokeWidth="1">
      <path d="M60 330 C140 250 200 260 250 180 S330 110 350 70" strokeDasharray="4 6" />
      <path d="M60 330 C160 340 260 300 330 250" strokeDasharray="4 6" />
      <path d="M60 330 C90 230 150 150 200 100" strokeDasharray="4 6" />
    </g>
    <g fill="#B89A62">
      <circle cx="60" cy="330" r="6" />
      <circle cx="350" cy="70" r="4" />
      <circle cx="330" cy="250" r="4" />
      <circle cx="200" cy="100" r="4" />
    </g>
    <text x="72" y="350" fill="#F7F5EF" fontSize="12">Nimule · Elegu</text>
  </svg>
)

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
}

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } }
}

const socialStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } }
}

const highlightStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } }
}

const imageReveal = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } }
}

export default function Home() {
  const { hero } = siteData;
  return <>
    <Seo title="Home" description="Andreya Mouratek: Biological Sciences graduate, freight forwarding and logistics professional, entrepreneur, and emerging writer." />
    
    <section className="relative min-h-screen flex items-center bg-deep overflow-hidden" aria-labelledby="hero-title">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute -top-1/2 -right-1/2 w-[60vw] h-[60vw] max-w-[500px] max-h-[500px] rounded-full bg-forest/40 blur-[120px]" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[50vw] h-[50vw] max-w-[400px] max-h-[400px] rounded-full bg-brass/10 blur-[100px]" />
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-[radial-gradient(ellipse_at_center,_var(--color-deep)_0%,#021512_70%,#000807_100%)]" />
      </div>

      <div className="relative z-10 w-full px-5 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="relative rounded-2xl border border-brass/20 bg-forest/50 backdrop-blur-sm p-6 md:p-10 lg:p-12">
            <div className="grid gap-8 md:grid-cols-[1.15fr_.85fr] items-start">
              <div className="relative z-10">
                <motion.div variants={staggerContainer} initial="hidden" animate="show" viewport={{ once: true, margin: '-100px' }}>
                  <motion.p variants={fadeInUp} className="mb-4 text-xs tracking-[.25em] uppercase text-brass">
                    {hero.eyebrow}
                  </motion.p>
                  <motion.h1 id="hero-title" variants={fadeInUp} className="font-serif text-4xl leading-[1.1] md:text-5xl lg:text-6xl xl:text-7xl max-w-xl text-ivory">
                    {hero.headline}
                  </motion.h1>
                  <motion.p variants={fadeInUp} className="mt-6 max-w-xl text-lg md:text-xl text-ivory/80 leading-relaxed">
                    {hero.description}
                  </motion.p>
                  <motion.div variants={fadeInUp} className="mt-8 flex flex-wrap items-center gap-3">
                    <Button to={hero.primaryCta.href} variant={hero.primaryCta.variant}>{hero.primaryCta.label}</Button>
                    <Button to={hero.secondaryCta.href} variant={hero.secondaryCta.variant} className="border-ivory/30 text-ivory hover:bg-white/10">{hero.secondaryCta.label}</Button>
                  </motion.div>

                  <motion.div variants={socialStagger} className="mt-10 flex items-center gap-6" role="list" aria-label="Social links">
                    {siteData.socialLinks.map((social) => {
                      const Icon = SocialIcons[social.icon];
                      return (
                        <motion.a
                          key={social.key}
                          variants={fadeInUp}
                          href={social.href}
                          target={social.external ? '_blank' : undefined}
                          rel={social.external ? 'noopener noreferrer' : undefined}
                          aria-label={social.label}
                          className="flex items-center justify-center w-10 h-10 rounded-full border border-ivory/20 text-ivory/70 hover:border-brass hover:text-brass hover:bg-brass/10 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass"
                        >
                          <Icon size={18} aria-hidden="true" />
                        </motion.a>
                      );
                    })}
                  </motion.div>
                </motion.div>

                <motion.div variants={highlightStagger} className="mt-16 pt-10 border-t border-brass/20" role="list" aria-label="Professional highlights">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-center">
                    {hero.highlights.map((highlight, i) => (
                      <motion.div key={highlight.key} variants={fadeInUp} className="flex flex-col items-center md:items-start text-center md:text-left min-w-0" style={{ transitionDelay: `${0.1 * i}s` }}>
                        <p className="font-serif text-3xl md:text-4xl text-brass" role="listitem">{highlight.value}</p>
                        <p className="mt-1.5 text-xs tracking-[.1em] uppercase text-ivory/60">{highlight.label}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              <motion.div variants={imageReveal} className="relative" initial="hidden" animate="show" viewport={{ once: true, margin: '-100px' }} transition={{ delay: 0.2 }}>
                <div className="relative aspect-[4/5] md:aspect-[3/4] rounded-xl border border-brass/30 bg-deep/50 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-brass/5 via-transparent to-forest/10" aria-hidden="true" />
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 400%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22 opacity=%220.03%22/%3E%3C/svg%3E')]" aria-hidden="true" />
                  <div className="relative h-full w-full flex items-center justify-center p-6">
                    <img
                      src={hero.portrait.src}
                      alt={hero.portrait.alt}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-xs text-ivory/40 text-center">
                    Professional portrait
                  </div>
                </div>

                <div className="absolute -bottom-6 -right-6 md:-bottom-8 md:-right-8 w-24 h-24 md:w-32 md:h-32 rounded-full border border-brass/30 bg-forest/30 backdrop-blur-sm opacity-60 blur-[1px]" aria-hidden="true" />
                <div className="absolute -top-4 -left-4 md:-top-6 md:-left-6 w-16 h-16 md:w-20 md:h-20 rounded-full border border-brass/20 bg-brass/10 opacity-50" aria-hidden="true" />
              </motion.div>
            </div>
          </div>

          <motion.a
            href="#intro"
            aria-label="Scroll to introduction"
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-brass/70 hover:text-brass transition-colors"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            whileHover={{ y: -2 }}
          >
            <span className="text-xs tracking-[.2em] uppercase hidden sm:block">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-6 h-6 flex items-center justify-center"
            >
              <ChevronDown size={20} />
            </motion.div>
          </motion.a>
        </div>
      </div>
    </section>

    <Section id="intro" title="A Little About What I Do" intro="I am a Biological Sciences graduate whose professional interests extend across freight forwarding, logistics, entrepreneurship, research, and creative writing. My work and interests are united by a commitment to practical problem-solving, continuous learning, and exploring ideas that can create value for businesses and communities.">
      <Grid cols="md:grid-cols-2 lg:grid-cols-4">{pillars.map(([t, d, to, i], n) => { const I = Icons[i]; return <Card key={t} title={t} to={to} icon={<I />}>{d}</Card> })}</Grid>
    </Section>

    <section className="bg-deep py-20 text-ivory">
      <Reveal className="mx-auto max-w-4xl px-5 text-center">
        <h2 className="font-serif text-3xl md:text-5xl">Different Disciplines. One Purpose.</h2>
        <blockquote className="mt-8 border-l-2 border-brass pl-6 text-left font-serif text-xl italic leading-relaxed">
          I believe that knowledge becomes more valuable when it connects with real-world challenges.
        </blockquote>
        <p className="mt-6 text-left opacity-85">
          Whether through trade, scientific inquiry, enterprise, or storytelling, I am interested in ideas and relationships that help people understand problems, discover opportunities, and move forward.
        </p>
      </Reveal>
    </section>

    <Section title="Featured Work">
      <Grid>{featured.map(([t, d, to]) => <Card key={t} title={t} to={to}>{d}</Card>)}</Grid>
    </Section>

    <section className="bg-mist py-16 text-center">
      <Reveal className="mx-auto max-w-2xl px-5">
        <h2 className="font-serif text-3xl">Have an Idea, Opportunity, or Project in Mind?</h2>
        <p className="mt-3 text-muted">Let's explore how our interests, experience, and professional networks might create mutual value.</p>
        <div className="mt-6"><Button to="/contact">Start a Conversation</Button></div>
      </Reveal>
    </section>
  </>
}