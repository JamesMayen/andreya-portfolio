import { Hero, Item, Reveal, Section, Seo, Stagger, Button } from '../components/ui'
import { siteData } from '../data/siteData'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
}

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } }
}

const imageReveal = {
  hidden: { opacity: 0, scale: 0.98 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } }
}

const imageHover = {
  scale: 1.01,
  transition: { duration: 0.3, ease: 'easeOut' }
}

export default function About() {
  const { about } = siteData;
  return <>
    <Seo title="About" description="Biography of Deng Andreya Gang (Andreya Mouratek): Biological Sciences graduate working in freight forwarding and logistics." />
    
    <Hero eyebrow="ABOUT" title={about.heading}>{about.subheading}</Hero>

    <Section>
      <div className="grid gap-10 lg:grid-cols-[1.2fr_.8fr] items-start">
        <div className="relative">
          <motion.div variants={staggerContainer} initial="hidden" animate="show" viewport={{ once: true, margin: '-100px' }}>
            <motion.div variants={fadeInUp} className="max-w-2xl space-y-5 font-serif text-lg leading-relaxed">
              {about.biography.map((p, i) => (
                <Reveal key={i}><p>{p}</p></Reveal>
              ))}
            </motion.div>
            
<motion.div variants={fadeInUp} className="mt-10">
              <Button to="/experience" variant="primary" whileHover={{ x: 4 }}>
                View Professional Journey <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </motion.div>
        </div>

        <div className="relative">
          <motion.div 
            variants={imageReveal} 
            initial="hidden" 
            animate="show" 
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="relative grid gap-6" style={{ 
              gridTemplateRows: '1fr auto',
              gridTemplateColumns: '1fr',
            }}>
              <motion.div 
                whileHover={imageHover}
                className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-forest/10 border border-forest/10"
              >
                <img
                  src={about.primaryImage.src}
                  alt={about.primaryImage.alt}
                  className="h-full w-full object-cover"
                  loading="eager"
                  onError={(e) => {
                    e.currentTarget.src = '/images/profile/placeholder-primary.jpg';
                    e.currentTarget.onError = null;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
              </motion.div>

              <motion.div 
                whileHover={imageHover}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-forest/10 border border-forest/10 self-end -ml-6 md:-ml-8"
                style={{ maxWidth: '85%' }}
              >
                <img
                  src={about.secondaryImage.src}
                  alt={about.secondaryImage.alt}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = '/images/profile/placeholder-secondary.jpg';
                    e.currentTarget.onError = null;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>

    <Section title="Professional Journey" tone="bg-mist">
      <Stagger>
        <ol className="relative space-y-6 border-l border-brass pl-6">
          {about.professionalJourney.map((journey, i) => (
            <Item key={journey.title}>
              <li>
                <span className="absolute -left-[5px] mt-2 h-2.5 w-2.5 rounded-full bg-brass" />
                <h3 className="font-serif text-xl">{i + 1}. {journey.title}</h3>
                <p className="text-muted">{journey.description}</p>
              </li>
            </Item>
          ))}
        </ol>
      </Stagger>
    </Section>

    <Section title="Building a Career Across Disciplines" intro={about.aspirations} />

    <Section title="Beyond Work" tone="bg-mist">
      <ul className="flex flex-wrap gap-3">
        {about.interests.map(i => (
          <li key={i} className="rounded-full border border-forest/20 bg-white px-4 py-2 text-sm">{i}</li>
        ))}
      </ul>
    </Section>
  </>
}