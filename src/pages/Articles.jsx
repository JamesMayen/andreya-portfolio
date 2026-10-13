import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Hero, Item, Section, Seo, Stagger, PageHero } from '../components/ui'
import { articles, ideaCategories, readingTime, storyCategories } from '../data/articles'
import { siteData } from '../data/siteData'
import { motion } from 'framer-motion'

const meta = a => [a.demo ? 'Demonstration content' : a.author, a.date, `${readingTime(a)} min read`].filter(Boolean).join(' · ')
const path = a => `/${a.section === 'ideas' ? 'ideas-strategies' : 'stories'}/${a.slug}`

const cardReveal = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

const cardHover = {
  y: -4,
  boxShadow: '0 12px 24px -8px rgba(0,0,0,0.1)',
  transition: { duration: 0.3, ease: 'easeOut' }
}

function Index({ section, cats, seo, hero, heroImage, topics }) {
  const [q, setQ] = useState(''), [cat, setCat] = useState('All')
  
  const list = useMemo(() => {
    if (section === 'ideas' && topics) {
      return topics.filter(t => (cat === 'All' || t.category === cat) && (t.title + t.excerpt + t.category).toLowerCase().includes(q.toLowerCase()))
    }
    return articles.filter(a => a.section === section && (cat === 'All' || a.category === cat) && (a.title + a.excerpt + a.category).toLowerCase().includes(q.toLowerCase()))
  }, [section, cat, q, topics])
  
  const lead = list.find(a => a.featured)
  
  return <>
    <Seo {...seo} />
    <PageHero
      eyebrow={hero.props.eyebrow}
      title={hero.props.title}
      description={hero.props.children}
      image={heroImage}
      dark={false}
    />
    <Section>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div role="group" aria-label="Categories" className="flex flex-wrap gap-2">
          {['All', ...cats].map(c => <button key={c} aria-pressed={cat === c} onClick={() => setCat(c)} className={`rounded-full border px-4 py-1.5 text-sm ${cat === c ? 'border-forest bg-forest text-ivory' : 'border-forest/25 bg-white'}`}>{c}</button>)}
        </div>
        <input type="search" aria-label="Search by title or topic" placeholder="Search by title or topic" value={q} onChange={e => setQ(e.target.value)} className="rounded-md border border-forest/25 bg-white px-3 py-2" />
      </div>
      {list.length === 0 ? <p className="rounded-lg border border-dashed border-forest/30 p-10 text-center text-muted">No articles match yet. New writing will appear here.</p> :
      <>
        {lead && section !== 'ideas' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10 rounded-2xl overflow-hidden border border-forest/10 bg-white"
          >
            <div className="grid gap-6 md:grid-cols-[1fr_1.2fr]">
              <div className="relative aspect-[4/3] md:aspect-auto md:h-full min-h-[300px]">
                <img
                  src={lead.coverImage?.src || '/images/writing/stories-hero.jpg'}
                  alt={lead.coverImage?.alt || `Cover image for ${lead.title}`}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-6 md:p-8 flex flex-col justify-center">
                <p className="text-xs text-brass uppercase tracking-wide">{lead.category}{lead === lead ? ' · Featured' : ''}</p>
                <h3 className="mt-2 font-serif text-2xl md:text-3xl leading-tight">{lead.title}</h3>
                <p className="mt-4 text-muted leading-relaxed">{lead.excerpt}</p>
                <p className="mt-4 text-xs text-muted">{meta(lead)}</p>
                <Link to={path(lead)} className="mt-6 inline-flex items-center gap-2 text-forest font-medium hover:text-brass transition-colors">
                  Read Story <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
        <Stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {list.filter(item => item !== lead).map(item => {
            const isArticle = 'section' in item
            const itemPath = isArticle ? path(item) : '#'
            const itemImage = item.image || item.coverImage?.src || '/images/writing/stories-hero.jpg'
            const itemAlt = item.image ? item.image : (item.coverImage?.alt || `Cover image for ${item.title}`)
            const itemCategory = item.category
            const itemTitle = item.title
            const itemExcerpt = item.excerpt
            const itemMeta = isArticle ? meta(item) : (item.status === 'draft' ? 'Draft topic' : '')
            
            return (
              <motion.div
                key={item.slug || item.title}
                variants={cardReveal}
                whileHover={cardHover}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-100px' }}
              >
                <Link to={itemPath} className="block h-full rounded-xl overflow-hidden border border-forest/10 bg-white hover:border-brass transition-all duration-300">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={itemImage}
                      alt={itemAlt}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {item.status === 'draft' && (
                      <div className="absolute top-3 left-3 rounded-full bg-brass/90 px-3 py-1 text-xs font-medium text-white">
                        Draft
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <p className="text-xs text-brass uppercase tracking-wide">{itemCategory}</p>
                    <h3 className="mt-2 font-serif text-xl leading-tight">{itemTitle}</h3>
                    <p className="mt-2 text-sm text-muted line-clamp-2">{itemExcerpt}</p>
                    {itemMeta && <p className="mt-4 text-xs text-muted">{itemMeta}</p>}
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </Stagger>
      </>
      }
    </Section>
  </>
}

export const Stories = () => {
  const { stories } = siteData;
  return <Index 
    section="stories" 
    cats={storyCategories} 
    seo={{ title: 'Stories & Publications', description: 'Short stories, essays, community profiles and reflections.' }}
    hero={<Hero eyebrow={stories.eyebrow} title={stories.headline}>{stories.description}</Hero>}
    heroImage={stories.heroImage}
  />
}

export const Ideas = () => {
  const { ideas } = siteData;
  return <Index 
    section="ideas" 
    cats={ideaCategories} 
    seo={{ title: 'Ideas & Strategies', description: 'Practical ideas on business, marketing, logistics, leadership and learning.' }}
    hero={<Hero eyebrow={ideas.eyebrow} title={ideas.headline}>{ideas.description}</Hero>}
    heroImage={ideas.heroImage}
    topics={ideas.topics}
  />
}

export function ArticleDetail() {
  const { slug } = useParams(), a = articles.find(x => x.slug === slug)
  if (!a) return <Section title="Article not found"><Link className="underline" to="/stories">Back to stories</Link></Section>
  const rel = articles.filter(x => x.section === a.section && x.slug !== a.slug).slice(0, 3), url = typeof window !== 'undefined' ? window.location.href : ''
  return <>
    <Seo title={a.title} description={a.excerpt} />
    <article className="mx-auto max-w-3xl px-5 py-16">
      {a.coverImage && (
        <div className="mb-8 rounded-xl overflow-hidden">
          <img
            src={a.coverImage.src}
            alt={a.coverImage.alt}
            className="h-auto w-full object-cover max-h-[500px]"
          />
        </div>
      )}
      <p className="text-xs text-brass uppercase tracking-wide">{a.category}</p>
      <h1 className="mt-2 font-serif text-3xl md:text-4xl lg:text-5xl leading-tight">{a.title}</h1>
      <p className="mt-3 text-sm text-muted">{meta(a)}</p>
      {a.demo && <p className="mt-4 rounded bg-mist p-3 text-sm">Demonstration content: not a published work.</p>}
      <div className="prose-art mt-8 font-serif">{a.body.map((p, i) => <p key={i}>{p}</p>)}</div>
      <p className="mt-8 border-t border-forest/10 pt-4 text-sm">Share: <a className="underline" target="_blank" rel="noreferrer" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}>LinkedIn</a> · <a className="underline" target="_blank" rel="noreferrer" href={`https://wa.me/?text=${encodeURIComponent(a.title + ' ' + url)}`}>WhatsApp</a></p>
      {rel.length > 0 && <div className="mt-10"><h2 className="font-serif text-2xl">Related</h2><ul className="mt-3 space-y-1">{rel.map(r => <li key={r.slug}><Link className="underline" to={path(r)}>{r.title}</Link></li>)}</ul></div>}
      <Link to={a.section === 'ideas' ? '/ideas-strategies' : '/stories'} className="mt-10 inline-block underline">← All articles</Link>
    </article>
  </>
}