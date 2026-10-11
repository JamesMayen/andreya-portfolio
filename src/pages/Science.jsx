import { Card, Grid, Hero, Section, Seo } from '../components/ui'
import { researchAreas } from '../data/projects'
export const ResearchCard = ({title,description,details}) => <Card title={title}>{description}{details && <span className="mt-2 block">{details}</span>}</Card>
export default function Science(){
  return <><Seo title="Science & Research" description="Biological Sciences foundations: microbiology, public health, environmental sustainability and evidence-based thinking."/>
    <Hero eyebrow="SCIENCE · EVIDENCE · CURIOSITY" title="Curiosity Guided by Evidence.">My academic background in Biological Sciences informs my interest in scientific inquiry, microbiology, public health, environmental issues, and evidence-based problem-solving.</Hero>
    <Section title="Areas of Interest"><Grid>{researchAreas.map(([t,d])=><Card key={t} title={t}>{d}</Card>)}</Grid></Section>
    <Section title="Academic Experience" intro="Academic projects, undergraduate research, laboratory work, and relevant coursework." tone="bg-mist"><Grid cols="md:grid-cols-2"><ResearchCard title="Project details coming soon" description="Further details of academic projects and research will be added here." details="Reusable ResearchCard: add entries to src/data/projects.js."/></Grid></Section></>
}
