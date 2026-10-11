import { Mail, MessageCircle, Linkedin, Phone } from 'lucide-react'
import { Hero, Section, Seo } from '../components/ui'
import ContactForm from '../components/ContactForm'
import { profile } from '../data/profile'
const interests = ['Freight forwarding and logistics','Customs clearance support and documentation','Transport and cargo coordination','Regional trade and supply chain collaboration','Business development and entrepreneurship','Logistics marketing and professional referrals','Writing, editorial projects, and storytelling','Community development and knowledge exchange']
export default function Contact(){
  const L=[[Mail,profile.email,`mailto:${profile.email}`],[Phone,profile.phoneDisplay,profile.phoneHref],[MessageCircle,`WhatsApp ${profile.whatsappDisplay}`,profile.whatsappHref],[Linkedin,'LinkedIn',profile.linkedin]]
  return <><Seo title="Contact" description="Contact Andreya Mouratek about logistics, partnerships, business, research or writing collaborations."/>
    <Hero eyebrow="CONTACT" title="Let's Connect & Create Mutual Value.">Whether you are exploring a logistics requirement, business partnership, entrepreneurial initiative, research-related opportunity, or creative collaboration, I welcome thoughtful professional conversations.</Hero>
    <Section><div className="grid gap-10 md:grid-cols-2"><div>
      <h2 className="font-serif text-2xl">Collaboration interests</h2><ul className="mt-4 list-disc space-y-1 pl-5">{interests.map(i=><li key={i}>{i}</li>)}</ul>
      <ul className="mt-8 space-y-3">{L.map(([I,t,h])=><li key={h}><a href={h} className="flex items-center gap-3 hover:text-forest" {...(h.startsWith('http')?{target:'_blank',rel:'noreferrer'}:{})}><I size={18} className="text-brass"/>{t}</a></li>)}<li className="text-muted">Location: {profile.location}</li></ul></div>
      <ContactForm/></div></Section></>
}
