import { useState } from 'react'
import { motion } from 'framer-motion'
import { PageHero, Section, Seo } from '../components/ui'
import { siteData } from '../data/siteData'
import { fadeUp as cardReveal, stagger, cardHover, viewportOnce } from '../components/motion'

export default function Science() {
  const { science } = siteData;
  const [expandedCard, setExpandedCard] = useState(null)

  return <>
    <Seo title="Science & Research" description="Biological Sciences foundations: microbiology, public health, environmental sustainability and evidence-based thinking." />
    <PageHero
      eyebrow={science.eyebrow}
      title={science.headline}
      description={science.description}
      image={science.heroImage}
      dark
    />
    <Section title="Areas of Interest" intro="An academic foundation and evolving interests, presented without implying completed research projects.">
      <motion.div
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={stagger}
      >
        {science.researchCards.map((card, index) => {
          const expanded = expandedCard === index
          return <motion.article
            key={card.title}
            variants={cardReveal}
            whileHover={cardHover}
            className="overflow-hidden rounded-xl border border-forest/10 bg-white transition-shadow hover:shadow-lg"
          >
            <div className="aspect-[16/10] overflow-hidden bg-mist">
              <motion.img
                src={card.image.src}
                alt={card.image.alt}
                loading="lazy"
                onError={event => {
                  event.currentTarget.onerror = null
                  event.currentTarget.src = science.fallbackImage.src
                }}
                className="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:hover:scale-[1.03]"
              />
            </div>
            <div className="p-5">
              <p className="text-xs font-medium uppercase tracking-wide text-forest">{card.category}</p>
              <h3 className="mt-2 font-serif text-xl leading-tight">{card.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{card.description}</p>
              <button
                type="button"
                aria-expanded={expanded}
                aria-controls={`science-detail-${index}`}
                onClick={() => setExpandedCard(expanded ? null : index)}
                className="mt-4 rounded-sm text-sm font-medium text-forest underline decoration-brass underline-offset-4 hover:text-brass focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2"
              >
                {expanded ? 'Hide context' : 'View context'}
              </button>
              <p id={`science-detail-${index}`} hidden={!expanded} className="mt-3 border-l-2 border-brass pl-3 text-sm text-muted">{card.details}</p>
            </div>
          </motion.article>
        })}
      </motion.div>
    </Section>
  </>
}