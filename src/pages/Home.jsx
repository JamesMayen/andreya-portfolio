import { Truck, FlaskConical, PenLine, Lightbulb } from 'lucide-react'
const Icons = { Truck, FlaskConical, PenLine, Lightbulb }
import { ChevronDown } from 'lucide-react'
import { Button, Card, Grid, Item, Reveal, Section, Seo, Stagger } from '../components/ui'
import { featured, pillars } from '../data/profile'
const Trade = () => <svg viewBox="0 0 400 420" className="h-full w-full" aria-hidden="true">
  <g stroke="#B89A62" fill="none" strokeWidth="1"><path d="M60 330 C140 250 200 260 250 180 S330 110 350 70" strokeDasharray="4 6"/><path d="M60 330 C160 340 260 300 330 250" strokeDasharray="4 6"/><path d="M60 330 C90 230 150 150 200 100" strokeDasharray="4 6"/></g>
  <g fill="#B89A62"><circle cx="60" cy="330" r="6"/><circle cx="350" cy="70" r="4"/><circle cx="330" cy="250" r="4"/><circle cx="200" cy="100" r="4"/></g>
  <text x="72" y="350" fill="#F7F5EF" fontSize="12">Nimule · Elegu</text></svg>
export default function Home(){
  return <>
    <Seo title="Home" description="Andreya Mouratek: Biological Sciences graduate, freight forwarding and logistics professional, entrepreneur, and emerging writer."/>
    <section className="bg-forest text-ivory"><div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-[1.2fr_.8fr] md:py-24">
      <Stagger>
        <Item><p className="mb-4 text-xs tracking-[.2em] text-brass">SCIENCE · COMMERCE · IDEAS</p></Item>
        <Item><h1 className="font-serif text-4xl leading-tight md:text-6xl">Connecting Knowledge, Commerce & Human Stories.</h1></Item>
        <Item><p className="mt-6 max-w-xl text-lg opacity-90">I am Deng Andreya Gang, known professionally as Andreya Mouratek—a Biological Sciences graduate, freight forwarding and logistics professional, entrepreneur, and emerging writer exploring the connections between science, business, and society.</p></Item>
        <Item><div className="mt-8 flex flex-wrap gap-3"><Button to="/logistics-business" variant="light">Explore My Work</Button><Button to="/stories" variant="ghost">Read My Stories</Button></div></Item>
      </Stagger>
      <div className="relative aspect-[4/5] rounded-lg border border-brass/40 bg-deep p-4"><Trade/>
        <p className="absolute bottom-4 left-4 right-4 text-xs opacity-60">Editorial illustration. A professional portrait can be placed in public/images/profile/.</p></div>
    </div><a href="#intro" aria-label="Scroll to introduction" className="flex justify-center pb-6 text-brass"><ChevronDown/></a></section>
    <Section id="intro" title="A Little About What I Do" intro="I am a Biological Sciences graduate whose professional interests extend across freight forwarding, logistics, entrepreneurship, research, and creative writing. My work and interests are united by a commitment to practical problem-solving, continuous learning, and exploring ideas that can create value for businesses and communities.">
      <Grid cols="md:grid-cols-2 lg:grid-cols-4">{pillars.map(([t,d,to,i],n)=>{const I=Icons[i];return <Card key={t} title={t} to={to} icon={<I/>}>{d}</Card>})}</Grid></Section>
    <section className="bg-deep py-20 text-ivory"><Reveal className="mx-auto max-w-4xl px-5 text-center">
      <h2 className="font-serif text-3xl md:text-5xl">Different Disciplines. One Purpose.</h2>
      <blockquote className="mt-8 border-l-2 border-brass pl-6 text-left font-serif text-xl italic leading-relaxed">I believe that knowledge becomes more valuable when it connects with real-world challenges.</blockquote>
      <p className="mt-6 text-left opacity-85">Whether through trade, scientific inquiry, enterprise, or storytelling, I am interested in ideas and relationships that help people understand problems, discover opportunities, and move forward.</p></Reveal></section>
    <Section title="Featured Work"><Grid>{featured.map(([t,d,to])=><Card key={t} title={t} to={to}>{d}</Card>)}</Grid></Section>
    <section className="bg-mist py-16 text-center"><Reveal className="mx-auto max-w-2xl px-5"><h2 className="font-serif text-3xl">Have an Idea, Opportunity, or Project in Mind?</h2>
      <p className="mt-3 text-muted">Let’s explore how our interests, experience, and professional networks might create mutual value.</p><div className="mt-6"><Button to="/contact">Start a Conversation</Button></div></Reveal></section></>
}
