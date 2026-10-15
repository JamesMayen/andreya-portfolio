import { Mail, MessageCircle, Linkedin, Phone, Facebook } from 'lucide-react'
import { Section, Seo, PageHero, Reveal } from '../components/ui'
import ContactForm from '../components/ContactForm'
import { siteData } from '../data/siteData'

export default function Contact() {
  const { contact } = siteData;
  const socialLinks = siteData.socialLinks;
  return <>
    <Seo title="Contact" description="Contact Andreya Mouratek about logistics, partnerships, business, research or writing collaborations." />
    <PageHero
      eyebrow={contact.eyebrow}
      title={contact.headline}
      description={contact.description}
      image={contact.heroImage}
      dark
    />
    <Section>
      <div className="grid gap-10 md:grid-cols-2">
        <Reveal>
          <h2 className="font-serif text-2xl">Collaboration interests</h2>
          <ul className="mt-4 list-disc space-y-1 pl-5">{contact.interests.map(i => <li key={i}>{i}</li>)}</ul>
          <ul className="mt-8 space-y-3">
            {socialLinks.map(({ icon: IconName, label, href, external }) => {
              const Icon = { Mail, MessageCircle, Linkedin, Phone, Facebook }[IconName];
              return (
                <li key={href}>
                  <a href={href} className="flex items-center gap-3 hover:text-forest" {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
                    <Icon size={18} className="text-brass" />
                    {label}
                  </a>
                </li>
              );
            })}
            <li className="text-muted">Location: {siteData.contact.location}</li>
          </ul>
        </Reveal>
        <Reveal><ContactForm /></Reveal>
      </div>
    </Section>
  </>
}