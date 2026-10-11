import { Hero, Item, Reveal, Section, Seo, Stagger } from '../components/ui'
import { journey } from '../data/profile'
const bio = ['My name is Deng Andreya Gang, also known as Andreya Mouratek. I am a graduate of Biological Sciences from Kwame Nkrumah University of Science and Technology (KNUST), Ghana. My professional interests and experience span freight forwarding, logistics, entrepreneurship, scientific inquiry, and writing.',
'I work with Nilegate Freight and Forwarding Services, operating around the Nimule and Elegu border checkpoints, which connect South Sudan with Uganda and wider East African markets.',
'My professional responsibilities and areas of engagement include truck coordination, customs clearance, freight forwarding, cargo movement facilitation, and monitoring developments in customs policies and cross-border trade procedures. This work involves coordination with transporters, clearing agents, importers, exporters, and other stakeholders to facilitate the movement of goods and support compliance with applicable requirements.',
'Alongside logistics, I am interested in business development, strategic marketing, and sustainable ventures that connect markets and improve operational efficiency.',
'My academic background has shaped my interest in microbiology, public health, environmental issues, and evidence-based problem-solving. Through writing, I explore people, culture, leadership, society, and the experiences that shape our understanding of the world.',
'I see my professional journey as an opportunity to combine knowledge, enterprise, and creativity in ways that create value beyond a single field.']
export default function About(){
  return <><Seo title="About" description="Biography of Deng Andreya Gang (Andreya Mouratek): Biological Sciences graduate working in freight forwarding and logistics."/>
    <Hero eyebrow="ABOUT" title="Who I Am">Science, commerce, enterprise, and storytelling.</Hero>
    <Section><div className="max-w-2xl space-y-5 font-serif text-lg leading-relaxed">{bio.map((p,i)=><Reveal key={i}><p>{p}</p></Reveal>)}</div></Section>
    <Section title="Professional Journey" tone="bg-mist"><Stagger><ol className="relative space-y-6 border-l border-brass pl-6">{journey.map(([t,d],i)=><Item key={t}><li><span className="absolute -left-[5px] mt-2 h-2.5 w-2.5 rounded-full bg-brass"/><h3 className="font-serif text-xl">{i+1}. {t}</h3><p className="text-muted">{d}</p></li></Item>)}</ol></Stagger></Section>
    <Section title="Building a Career Across Disciplines" intro="I aspire to build a career that combines professional excellence, entrepreneurship, continuous learning, and meaningful contributions to society. Through this platform, I aim to share my work, connect with others, and create new professional opportunities."/>
    <Section title="Beyond Work" tone="bg-mist"><ul className="flex flex-wrap gap-3">{['Literature','Community development','Public health','Entrepreneurship','Leadership','Environmental sustainability','The exchange of ideas'].map(i=><li key={i} className="rounded-full border border-forest/20 bg-white px-4 py-2 text-sm">{i}</li>)}</ul></Section></>
}
