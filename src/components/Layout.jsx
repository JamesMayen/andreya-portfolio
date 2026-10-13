import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Mail, Phone, MessageCircle, Linkedin } from 'lucide-react'
import { siteData } from '../data/siteData'
import { Motion, pageTransition } from './ui'

const link = ({ isActive }) => `rounded px-2 py-1 text-sm transition ${isActive ? 'text-forest font-bold border-b-2 border-brass' : 'text-ink hover:text-forest'}`

export default function Layout() {
  const [open, setOpen] = useState(false), [scrolled, setScrolled] = useState(false), { pathname } = useLocation()
  useEffect(() => { setOpen(false); window.scrollTo(0, 0) }, [pathname])
  useEffect(() => { const f = () => setScrolled(window.scrollY > 10); f(); window.addEventListener('scroll', f, { passive: true }); return () => window.removeEventListener('scroll', f) }, [])
  return <Motion>
    <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[60] focus:bg-white focus:p-3">Skip to content</a>
    <header className={`sticky top-0 z-50 transition ${scrolled ? 'bg-ivory/95 shadow-sm backdrop-blur' : 'bg-ivory'}`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Link to="/" className="font-serif text-lg font-bold tracking-wide text-forest">{siteData.brand.logoText}</Link>
        <nav aria-label="Primary" className="hidden items-center gap-2 xl:flex">
          {siteData.navigation.slice(1).map(({ label, href }) => <NavLink key={href} to={href} className={link}>{label}</NavLink>)}
          <Link to="/contact" className="ml-2 rounded-md bg-forest px-4 py-2 text-sm text-ivory hover:bg-deep">Let's Connect</Link>
        </nav>
        <button className="p-2 xl:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
      <AnimatePresence>{open && <motion.nav id="mobile-menu" aria-label="Mobile" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-forest/10 bg-ivory xl:hidden">
        <div className="flex flex-col px-5 py-3">{siteData.navigation.map(({ label, href }) => <NavLink key={href} to={href} end={href === '/'} className={({ isActive }) => `py-3 ${isActive ? 'font-bold text-forest' : ''}`}>{label}</NavLink>)}</div></motion.nav>}</AnimatePresence>
    </header>
    <motion.main id="main" key={pathname} {...pageTransition}><Outlet /></motion.main>
    <footer className="bg-deep text-ivory"><div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 md:grid-cols-3">
      <div><p className="font-serif text-xl">{siteData.brand.name}</p><p className="mt-2 text-sm opacity-75">{siteData.brand.professionalTitle}</p></div>
      <ul className="space-y-1 text-sm">{siteData.navigation.map(({ label, href }) => <li key={href}><Link className="hover:text-brass" to={href}>{label}</Link></li>)}</ul>
      <ul className="space-y-2 text-sm">
        {siteData.socialLinks.map(({ icon: IconName, label, href, external }) => {
          const Icon = { Mail, MessageCircle, Linkedin, Phone }[IconName];
          return <li key={href}><a className="flex gap-2 hover:text-brass" href={href} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}><Icon size={16} />{label}</a></li>
        })}
        <li className="opacity-75">{siteData.contact.location}</li>
      </ul>
    </div>
    <p className="border-t border-ivory/10 py-4 text-center text-xs opacity-60">© {new Date().getFullYear()} {siteData.footer.copyright}</p></footer>
  </Motion>
}