import { Button, Card, Grid, Hero, Section, Seo, PageHero } from '../components/ui'
import ContactForm from '../components/ContactForm'
import { siteData } from '../data/siteData'
import { motion } from 'framer-motion'

const cardReveal = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

const cardHover = {
  y: -4,
  boxShadow: '0 12px 24px -8px rgba(0,0,0,0.15)',
  transition: { duration: 0.3, ease: 'easeOut' }
}

export default function Logistics() {
  const { logistics } = siteData;
  return <>
    <Seo title="Logistics & Business" description="Freight forwarding, customs clearance support and cross-border coordination around Nimule and Elegu." />
    <PageHero
      eyebrow={logistics.eyebrow}
      title={logistics.headline}
      description={logistics.description}
      image={logistics.heroImage}
      dark
      primaryCta={{ label: 'Discuss a Logistics Requirement', href: '#enquiry', variant: 'light' }}
      secondaryCta={{ label: 'Explore Partnership Opportunities', href: '/contact', variant: 'ghost' }}
    />
    <Section title="Areas of Professional Focus">
      <Grid cols="md:grid-cols-2 lg:grid-cols-4">
        {logistics.focusAreas.map(({ title, description }) => <Card key={title} title={title}>{description}</Card>)}
      </Grid>
    </Section>
    <Section title="Regional Trade Network" intro="Interest focused on South Sudan and neighbouring East African markets. This is an area of professional interest, not a claim about an established network, routes, or volumes." tone="bg-mist">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        className="flex flex-wrap gap-4 md:gap-6"
      >
        {logistics.regionalMarkets.map((country, i) => (
          <motion.div
            key={country.name}
            variants={cardReveal}
            whileHover={cardHover}
            className="flex flex-col items-center gap-3 rounded-xl border border-forest/10 bg-white p-6 min-w-[140px] transition-all duration-300"
          >
            <img
              src={country.flag}
              alt={`Flag of ${country.name}`}
              className="h-12 w-auto object-contain"
              loading="lazy"
            />
            <span className="font-serif text-base text-forest text-center">{country.name}</span>
          </motion.div>
        ))}
      </motion.div>
    </Section>
    <Section title="Building Reliable Business Connections" intro="I am interested in connecting cargo owners, importers, exporters, transporters, clearing agents, and logistics providers. Possible areas of collaboration:">
      <ul className="grid gap-2 sm:grid-cols-2">
        {logistics.collaborationAreas.map(c => <li key={c} className="border-b border-forest/10 py-2">{c}</li>)}
      </ul>
    </Section>
    <Section id="enquiry" title="Let's Discuss Your Logistics Requirements" tone="bg-mist">
      <div className="max-w-2xl"><ContactForm kind="logistics"/></div>
    </Section>
  </>
}