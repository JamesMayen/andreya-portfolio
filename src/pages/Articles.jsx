import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Hero, Item, Section, Seo, Stagger, PageHero } from '../components/ui'
import { articles, ideaCategories, readingTime, storyCategories } from '../data/articles'
import { siteData } from '../data/siteData'
import { motion } from 'framer-motion'
import { fadeUp as cardReveal, cardHover, viewportOnce } from '../components/motion'

const readableDate = value => {
  const match = /^(\d{4}-\d{2}-\d{2})(?:T(\d{2}:\d{2}))?$/.exec(value || '')
  if (!match) return null
  const [, day, time] = match
  const date = new Date(`${day}T${time || '00:00'}:00Z`)
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== day) return null
  // Time is shown exactly as entered (no timezone conversion).
  const opts = { year: 'numeric', month: 'long', day: 'numeric', ...(time && { hour: 'numeric', minute: '2-digit', hour12: true }), timeZone: 'UTC' }
  return new Intl.DateTimeFormat('en-GB', opts).format(date)
}

// Missing or invalid fields are omitted rather than shown as placeholders.
const metaItems = a => [
  a.author && { label: 'Author', value: a.author },
  readableDate(a.publishedAt || a.date) && { label: 'Published', value: readableDate(a.publishedAt || a.date) },
  readableDate(a.updatedAt) && { label: 'Updated', value: readableDate(a.updatedAt) },
  a.body?.length && { label: 'Reading time', value: `${readingTime(a)} min read` },
].filter(Boolean)

const meta = a => [a.demo && 'Demonstration content', ...metaItems(a).map(i => i.value)].filter(Boolean).join(' · ')
const path = a => `/${a.section === 'ideas' ? 'ideas-strategies' : 'stories'}/${a.slug}`
const formatArticleDate = value => readableDate(value) || 'Not specified'

const getRelatedArticles = article => articles
  .filter(candidate => candidate.section === article.section && candidate.slug !== article.slug && !candidate.demo && candidate.status !== 'draft' && candidate.published !== false)
  .map(candidate => {
    const shared = (left = [], right = []) => left.filter(value => right.includes(value)).length
    const score = Number(candidate.category === article.category)
      + shared(candidate.tags, article.tags) * 2
      + shared(candidate.topics, article.topics) * 2
      + shared(candidate.editorialThemes, article.editorialThemes)
    return { article: candidate, score }
  })
  .filter(result => result.score > 0)
  .sort((left, right) => right.score - left.score)
  .slice(0, 3)

const FALLBACK_IMAGE = '/images/writing/stories-hero.jpg'

function StoryMeta({ item }) {
  const items = metaItems(item)
  if (!items.length) return null
  return <dl className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
    {items.map(({ label, value }) => <div key={label} className="flex flex-wrap gap-1"><dt className="font-medium text-forest">{label}:</dt><dd>{value}</dd></div>)}
  </dl>
}

// Single card used for both the featured (horizontal) and regular (vertical) layouts.
function StoryCard({ item, featured = false }) {
  const isArticle = 'section' in item
  const image = item.image || item.coverImage?.src || FALLBACK_IMAGE
  const alt = item.image ? item.image : (item.coverImage?.alt || `Cover image for ${item.title}`)
  const reveal = featured
    ? { initial: 'hidden', animate: 'show' }
    : { initial: 'hidden', whileInView: 'show', viewport: viewportOnce }
  return (
    <motion.div variants={cardReveal} whileHover={cardHover} {...reveal} className={featured ? 'mb-10' : 'h-full'}>
      <Link to={isArticle ? path(item) : '#'} className={`group flex h-full overflow-hidden rounded-xl border border-forest/10 bg-white transition-colors duration-300 hover:border-brass ${featured ? 'flex-col md:grid md:grid-cols-[1fr_1.2fr]' : 'flex-col'}`}>
        <div className={`relative overflow-hidden ${featured ? 'aspect-[4/3] md:aspect-auto md:min-h-[320px]' : 'aspect-[4/3]'}`}>
          <img src={image} alt={alt} className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none ${featured ? 'md:absolute md:inset-0' : ''}`} />
        </div>
        <div className={`flex flex-1 flex-col ${featured ? 'justify-center p-6 md:p-8' : 'p-6'}`}>
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs uppercase tracking-wide text-brass">
            <span>{item.category}{featured && ' · Featured'}</span>
            {item.demo && <span className="rounded-full bg-mist px-2 py-0.5 normal-case tracking-normal text-forest">Demonstration content</span>}
            {item.status === 'draft' && <span className="rounded-full bg-brass/90 px-2 py-0.5 normal-case tracking-normal text-white">{isArticle ? 'Draft' : 'Draft topic'}</span>}
          </p>
          <h3 className={`mt-2 font-serif leading-tight ${featured ? 'text-2xl md:text-3xl' : 'text-xl'}`}>{item.title}</h3>
          <p className={`mt-3 text-sm leading-relaxed text-muted md:text-base ${featured ? '' : 'line-clamp-3'}`}>{item.excerpt}</p>
          <StoryMeta item={item} />
          {isArticle && <span className="mt-auto inline-flex items-center gap-2 pt-5 font-medium text-forest transition-colors group-hover:text-brass">Read Story <span aria-hidden="true">→</span></span>}
        </div>
      </Link>
    </motion.div>
  )
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
        {lead && section !== 'ideas' && <StoryCard item={lead} featured />}
        <Stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {list.filter(item => item !== lead).map(item => <StoryCard key={item.slug || item.title} item={item} />)}
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
  const relatedArticles = getRelatedArticles(a), url = typeof window !== 'undefined' ? window.location.href : ''
  return <>
    <Seo title={a.title} description={a.excerpt} />
    <article className="mx-auto max-w-3xl px-5 py-16">
      <Stagger>
      <Item><p className="text-xs text-brass uppercase tracking-wide">{a.category}</p></Item>
      <Item><h1 className="mt-2 font-serif text-3xl md:text-4xl lg:text-5xl leading-tight">{a.title}</h1></Item>
      <Item><p className="mt-3 text-sm text-muted">{meta(a)}</p></Item>
      {a.coverImage && (
        <Item><div className="mt-8 overflow-hidden rounded-xl">
          <img
            src={a.coverImage.src}
            alt={a.coverImage.alt}
            className="h-auto w-full object-cover max-h-[500px]"
          />
        </div></Item>
      )}
      </Stagger>
      {!a.demo && <section aria-label="Publication dates" className="mt-8 grid gap-5 rounded-xl border border-forest/10 bg-white p-5 shadow-sm sm:grid-cols-2 sm:p-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-forest">Published</p>
          <p className="mt-2 text-sm text-muted">{formatArticleDate(a.publishedAt)}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-forest">Last Updated</p>
          <p className="mt-2 text-sm text-muted">{formatArticleDate(a.updatedAt)}</p>
        </div>
      </section>}
      {a.demo && <p className="mt-4 rounded bg-mist p-3 text-sm">Demonstration content: not a published work.</p>}
      <div className="prose-art mt-8 font-serif">{a.body.map((p, i) => <p key={i}>{p}</p>)}</div>
      <p className="mt-8 border-t border-forest/10 pt-4 text-sm">Share: <a className="underline" target="_blank" rel="noreferrer" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}>LinkedIn</a> · <a className="underline" target="_blank" rel="noreferrer" href={`https://wa.me/?text=${encodeURIComponent(a.title + ' ' + url)}`}>WhatsApp</a></p>
      {relatedArticles.length > 0 && <section aria-labelledby="related-articles-heading" className="mt-14 border-t border-forest/10 pt-10">
        <p className="text-xs font-semibold uppercase tracking-[.16em] text-brass">Related Articles</p>
        <h2 id="related-articles-heading" className="mt-2 font-serif text-2xl md:text-3xl">More stories you may like</h2>
        <Stagger className="mt-6 grid gap-5 sm:grid-cols-2">
          {relatedArticles.map(({ article: related }) => <motion.div
            key={related.slug}
            variants={cardReveal}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            whileHover={cardHover}
          >
            <Link to={path(related)} className="group block h-full overflow-hidden rounded-xl border border-forest/10 bg-white transition-colors hover:border-brass focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2">
              <div className="aspect-[16/10] overflow-hidden bg-mist">
                <img src={related.coverImage?.src || '/images/writing/stories-hero.jpg'} alt={related.coverImage?.alt || `Cover image for ${related.title}`} loading="lazy" className="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.03]" />
              </div>
              <div className="p-5">
                <p className="text-xs font-medium uppercase tracking-wide text-brass">{related.category}</p>
                <h3 className="mt-2 font-serif text-xl leading-tight">{related.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-3">{related.excerpt}</p>
                {related.publishedAt && <p className="mt-4 text-xs text-muted">{formatArticleDate(related.publishedAt)}</p>}
                <span className="mt-4 inline-block text-sm font-medium text-forest">Read story <span aria-hidden="true">→</span></span>
              </div>
            </Link>
          </motion.div>)}
        </Stagger>
      </section>}
      <Link to={a.section === 'ideas' ? '/ideas-strategies' : '/stories'} className="mt-10 inline-block underline">← All articles</Link>
    </article>
  </>
}