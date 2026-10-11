import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Hero, Item, Section, Seo, Stagger } from '../components/ui'
import { articles, ideaCategories, readingTime, storyCategories } from '../data/articles'
const meta = a => [a.demo?'Demonstration content':a.author, a.date, `${readingTime(a)} min read`].filter(Boolean).join(' · ')
const path = a => `/${a.section==='ideas'?'ideas-strategies':'stories'}/${a.slug}`
function Index({section,cats,seo,hero}){
  const [q,setQ]=useState(''), [cat,setCat]=useState('All')
  const list = useMemo(()=>articles.filter(a=>a.section===section&&(cat==='All'||a.category===cat)&&(a.title+a.excerpt+a.category).toLowerCase().includes(q.toLowerCase())),[section,cat,q])
  const lead = list.find(a=>a.featured)
  return <><Seo {...seo}/>{hero}
    <Section><div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div role="group" aria-label="Categories" className="flex flex-wrap gap-2">{['All',...cats].map(c=><button key={c} aria-pressed={cat===c} onClick={()=>setCat(c)} className={`rounded-full border px-4 py-1.5 text-sm ${cat===c?'border-forest bg-forest text-ivory':'border-forest/25 bg-white'}`}>{c}</button>)}</div>
      <input type="search" aria-label="Search by title or topic" placeholder="Search by title or topic" value={q} onChange={e=>setQ(e.target.value)} className="rounded-md border border-forest/25 bg-white px-3 py-2"/></div>
      {list.length===0 ? <p className="rounded-lg border border-dashed border-forest/30 p-10 text-center text-muted">No articles match yet. New writing will appear here.</p> :
      <Stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{list.map(a=><Item key={a.slug}><Link to={path(a)} className="block h-full rounded-lg border border-forest/10 bg-white p-6 hover:border-brass">
        <p className="text-xs text-brass">{a.category}{a===lead?' · Featured':''}</p><h3 className="mt-2 font-serif text-xl">{a.title}</h3><p className="mt-2 text-sm text-muted">{a.excerpt}</p><p className="mt-4 text-xs text-muted">{meta(a)}</p></Link></Item>)}</Stagger>}
    </Section></>
}
export const Stories = () => <Index section="stories" cats={storyCategories} seo={{title:'Stories & Publications',description:'Short stories, essays, community profiles and reflections.'}}
  hero={<Hero eyebrow="STORIES · CULTURE · REFLECTION" title="Stories That Observe, Question & Connect.">This is a space for short stories, essays, social commentary, and narratives that document people, places, experiences, and ideas. Through writing, I explore the human dimensions of culture, leadership, society, and development.</Hero>}/>
export const Ideas = () => <Index section="ideas" cats={ideaCategories} seo={{title:'Ideas & Strategies',description:'Practical ideas on business, marketing, logistics, leadership and learning.'}}
  hero={<Hero eyebrow="THINKING THROUGH PROBLEMS" title="Practical Ideas. Better Decisions. Meaningful Progress.">This space explores ideas, strategies, and lessons drawn from business, logistics, entrepreneurship, leadership, communication, and personal development. “I believe useful ideas should move beyond discussion. They should help people understand problems, evaluate alternatives, and take practical action.” Commentary here is personal opinion, not verified fact or professional advice.</Hero>}/>
export function ArticleDetail(){
  const {slug}=useParams(), a=articles.find(x=>x.slug===slug)
  if(!a) return <Section title="Article not found"><Link className="underline" to="/stories">Back to stories</Link></Section>
  const rel = articles.filter(x=>x.section===a.section&&x.slug!==a.slug).slice(0,3), url = typeof window!=='undefined'?window.location.href:''
  return <><Seo title={a.title} description={a.excerpt}/><article className="mx-auto max-w-2xl px-5 py-16">
    <p className="text-xs text-brass">{a.category}</p><h1 className="mt-2 font-serif text-4xl leading-tight">{a.title}</h1><p className="mt-3 text-sm text-muted">{meta(a)}</p>
    {a.demo && <p className="mt-4 rounded bg-mist p-3 text-sm">Demonstration content: not a published work.</p>}
    <div className="prose-art mt-8 font-serif">{a.body.map((p,i)=><p key={i}>{p}</p>)}</div>
    <p className="mt-8 border-t border-forest/10 pt-4 text-sm">Share: <a className="underline" target="_blank" rel="noreferrer" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}>LinkedIn</a> · <a className="underline" target="_blank" rel="noreferrer" href={`https://wa.me/?text=${encodeURIComponent(a.title+' '+url)}`}>WhatsApp</a></p>
    {rel.length>0 && <div className="mt-10"><h2 className="font-serif text-2xl">Related</h2><ul className="mt-3 space-y-1">{rel.map(r=><li key={r.slug}><Link className="underline" to={path(r)}>{r.title}</Link></li>)}</ul></div>}
    <Link to={a.section==='ideas'?'/ideas-strategies':'/stories'} className="mt-10 inline-block underline">← All articles</Link></article></>
}
