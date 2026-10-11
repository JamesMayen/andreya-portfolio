import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Mail, Phone, MessageCircle, Linkedin } from 'lucide-react'
import { nav, profile } from '../data/profile'
import { Motion, pageTransition } from './ui'
const link = ({isActive}) => `rounded px-2 py-1 text-sm transition ${isActive?'text-forest font-bold border-b-2 border-brass':'text-ink hover:text-forest'}`
export default function Layout(){
  const [open,setOpen]=useState(false), [scrolled,setScrolled]=useState(false), {pathname}=useLocation()
  useEffect(()=>{ setOpen(false); window.scrollTo(0,0) },[pathname])
  useEffect(()=>{ const f=()=>setScrolled(window.scrollY>10); f(); window.addEventListener('scroll',f,{passive:true}); return ()=>window.removeEventListener('scroll',f) },[])
  return <Motion>
    <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[60] focus:bg-white focus:p-3">Skip to content</a>
    <header className={`sticky top-0 z-50 transition ${scrolled?'bg-ivory/95 shadow-sm backdrop-blur':'bg-ivory'}`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Link to="/" className="font-serif text-lg font-bold tracking-wide text-forest">ANDREYA MOURATEK</Link>
        <nav aria-label="Primary" className="hidden items-center gap-2 xl:flex">
          {nav.slice(1).map(([l,t])=><NavLink key={t} to={t} className={link}>{l}</NavLink>)}
          <Link to="/contact" className="ml-2 rounded-md bg-forest px-4 py-2 text-sm text-ivory hover:bg-deep">Let’s Connect</Link>
        </nav>
        <button className="p-2 xl:hidden" aria-label={open?'Close menu':'Open menu'} aria-expanded={open} aria-controls="mobile-menu" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button>
      </div>
      <AnimatePresence>{open && <motion.nav id="mobile-menu" aria-label="Mobile" initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} className="overflow-hidden border-t border-forest/10 bg-ivory xl:hidden">
        <div className="flex flex-col px-5 py-3">{nav.map(([l,t])=><NavLink key={t} to={t} end={t==='/'} className={({isActive})=>`py-3 ${isActive?'font-bold text-forest':''}`}>{l}</NavLink>)}</div></motion.nav>}</AnimatePresence>
    </header>
    <motion.main id="main" key={pathname} {...pageTransition}><Outlet/></motion.main>
    <footer className="bg-deep text-ivory"><div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 md:grid-cols-3">
      <div><p className="font-serif text-xl">Andreya Mouratek</p><p className="mt-2 text-sm opacity-75">Biological Sciences Graduate · Freight Forwarding & Logistics Professional · Entrepreneur · Emerging Writer</p></div>
      <ul className="space-y-1 text-sm">{nav.map(([l,t])=><li key={t}><Link className="hover:text-brass" to={t}>{l}</Link></li>)}</ul>
      <ul className="space-y-2 text-sm">
        <li><a className="flex gap-2 hover:text-brass" href={`mailto:${profile.email}`}><Mail size={16}/>{profile.email}</a></li>
        <li><a className="flex gap-2 hover:text-brass" href={profile.phoneHref}><Phone size={16}/>{profile.phoneDisplay}</a></li>
        <li><a className="flex gap-2 hover:text-brass" href={profile.whatsappHref} target="_blank" rel="noreferrer"><MessageCircle size={16}/>WhatsApp</a></li>
        <li><a className="flex gap-2 hover:text-brass" href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16}/>LinkedIn</a></li>
        <li className="opacity-75">{profile.location}</li></ul></div>
      <p className="border-t border-ivory/10 py-4 text-center text-xs opacity-60">© {new Date().getFullYear()} {profile.brand}</p></footer>
  </Motion>
}
