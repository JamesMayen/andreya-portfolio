import { Card, Grid, Hero, Section, Seo, PageHero } from '../components/ui'
import { siteData } from '../data/siteData'

export const ResearchCard = ({ title, description, details }) => (
  <Card title={title}>{description}{details && <span className="mt-2 block">{details}</span>}</Card>
)

export default function Science() {
  const { science } = siteData;
  return <>
    <Seo title="Science & Research" description="Biological Sciences foundations: microbiology, public health, environmental sustainability and evidence-based thinking." />
    <PageHero
      eyebrow={science.eyebrow}
      title={science.headline}
      description={science.description}
      image={science.heroImage}
      dark
    />
    <Section title="Areas of Interest">
      <Grid>{science.researchAreas.map(({ title, description }) => <Card key={title} title={title}>{description}</Card>)}</Grid>
    </Section>
    <Section title="Academic Experience" intro="Academic projects, undergraduate research, laboratory work, and relevant coursework." tone="bg-mist">
      <Grid cols="md:grid-cols-2">
        <ResearchCard title="Project details coming soon" description="Further details of academic projects and research will be added here." details="Reusable ResearchCard: add entries to src/data/projects.js." />
      </Grid>
    </Section>
  </>
}