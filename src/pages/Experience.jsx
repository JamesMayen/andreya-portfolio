import { Card, Grid, Hero, Section, Seo } from '../components/ui'
import { experienceCategories, projects } from '../data/projects'
export default function Experience(){
  return <><Seo title="Experience" description="Professional experience, academic projects, entrepreneurship and writing."/>
    <Hero eyebrow="PROJECTS · EXPERIENCE" title="Work, Experience & Developing Initiatives.">A portfolio that grows as verified details are added.</Hero>
    {experienceCategories.map(([t,d],i)=>{const items=projects.filter(p=>p.category===t); return <Section key={t} title={t} intro={d} tone={i%2?'bg-mist':''}>
      <Grid cols="md:grid-cols-2">{items.length? items.map(p=><Card key={p.title} title={p.title}>{p.description}{p.role&&<span className="mt-2 block">Role: {p.role}</span>}{p.skills&&<span className="mt-1 block">Skills: {p.skills.join(', ')}</span>}{p.date&&<span className="block">{p.date}</span>}{p.link&&<a className="mt-2 block underline" href={p.link} target="_blank" rel="noreferrer">View</a>}</Card>) : <Card title="Details to be added">Project details for this category will be added here.</Card>}</Grid></Section>})}</>
}
