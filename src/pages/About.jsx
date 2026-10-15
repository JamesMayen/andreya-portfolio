import { Hero, Item, Reveal, Section, Seo, Stagger, Button } from '../components/ui'
import { fadeUp as fadeInUp, stagger as staggerContainer, imageReveal, viewportOnce } from '../components/motion'
import { siteData } from '../data/siteData'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

function GalleryImage({ image, fallback, className = '', eager = false }) {
  return (
    <motion.figure variants={imageReveal} className={`group relative overflow-hidden rounded-2xl border border-forest/10 bg-forest/10 shadow-sm ${className}`}>
      <img
        src={image.src}
        alt={image.alt}
        loading={eager ? 'eager' : 'lazy'}
        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none"
        onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = fallback }}
      />
    </motion.figure>
  )
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

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mx-auto grid w-full max-w-md gap-4 sm:gap-5 lg:sticky lg:top-24 lg:max-w-none"
        >
          <GalleryImage image={about.primaryImage} fallback="/images/profile/placeholder-primary.jpg" className="aspect-[5/4]" eager />
          <GalleryImage image={about.secondaryImage} fallback="/images/profile/placeholder-secondary.jpg" className="ml-auto aspect-[4/3] w-[80%]" />
        </motion.div>
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