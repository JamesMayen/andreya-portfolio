import { useMemo, useState } from 'react'
import { Section, Seo, PageHero } from '../components/ui'
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

const statusBadges = {
  professional: { label: 'Professional Experience', color: 'bg-forest text-ivory' },
  entrepreneurship: { label: 'Entrepreneurship', color: 'bg-brass text-white' },
  academic: { label: 'Academic Background', color: 'bg-ivory text-forest border border-forest/20' },
  writing: { label: 'Writing & Communication', color: 'bg-white text-forest border border-forest/20' },
}

export default function Experience() {
  const { experience } = siteData;
  const [q, setQ] = useState(''), [cat, setCat] = useState('All')

  const list = useMemo(() => experience.entries.filter(e => (cat === 'All' || e.category === cat) && (e.title + e.category + e.description + e.skills.join(' ') + (e.organization || '')).toLowerCase().includes(q.toLowerCase())), [cat, q])

  return <>
    <Seo title="Experience" description="Professional experience, academic projects, entrepreneurship and writing." />
    <PageHero
      eyebrow={experience.eyebrow}
      title={experience.headline}
      description={experience.description}
      image={experience.heroImage}
      dark
    />
    <Section>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div role="group" aria-label="Categories" className="flex flex-wrap gap-2">
          {experience.filterCategories.map(c => <button key={c} aria-pressed={cat === c} onClick={() => setCat(c)} className={`rounded-full border px-4 py-1.5 text-sm ${cat === c ? 'border-forest bg-forest text-ivory' : 'border-forest/25 bg-white'}`}>{c}</button>)}
        </div>
        <input type="search" id="experience-search" name="experience-search" aria-label="Search experience or skills" placeholder="Search experience or skills..." value={q} onChange={e => setQ(e.target.value)} className="rounded-md border border-forest/25 bg-white px-3 py-2" />
      </div>
      {list.length === 0 ? <p className="rounded-lg border border-dashed border-forest/30 p-10 text-center text-muted">No experience entries match your search. Try another keyword or category.</p> :
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
      >
        {list.map((entry, idx) => (
          <motion.article
            key={entry.id}
            variants={cardReveal}
            whileHover={cardHover}
            className="rounded-2xl overflow-hidden border border-forest/10 bg-white transition-all duration-300"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={entry.image.src}
                alt={entry.image.alt}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading={idx < 3 ? 'eager' : 'lazy'}
              />
              <div className="absolute top-3 left-3">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusBadges[entry.status]?.color || 'bg-forest/10 text-forest'}`}>
                  {statusBadges[entry.status]?.label || entry.category}
                </span>
              </div>
            </div>
            <div className="p-6">
              {entry.organization && (
                <p className="text-xs text-brass uppercase tracking-wide mb-1">{entry.organization}</p>
              )}
              <h3 className="font-serif text-xl leading-tight">{entry.title}</h3>
              <p className="mt-3 text-sm text-muted leading-relaxed">{entry.description}</p>
              <ul className="mt-4 space-y-2">
                {entry.skills.map((skill, sIdx) => (
                  <li key={sIdx} className="flex items-start gap-2 text-sm text-muted">
                    <span className="flex-shrink-0 mt-0.5 w-1.5 h-1.5 rounded-full bg-brass" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>
        ))}
      </motion.div>
      }
    </Section>
  </>
}