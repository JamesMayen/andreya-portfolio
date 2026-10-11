import { motion, MotionConfig } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
export const fadeUp = { hidden:{opacity:0,y:18}, show:{opacity:1,y:0,transition:{duration:.5,ease:'easeOut'}} }
export const stagger = { hidden:{}, show:{transition:{staggerChildren:.08}} }
export const pageTransition = { initial:{opacity:0}, animate:{opacity:1,transition:{duration:.3}} }
export const Motion = ({children}) => <MotionConfig reducedMotion="user">{children}</MotionConfig>
export const Reveal = ({children,className='',as:T='div'}) => { const M = motion[T]; return <M className={className} variants={fadeUp} initial="hidden" whileInView="show" viewport={{once:true,margin:'-60px'}}>{children}</M> }
export const Stagger = ({children,className=''}) => <motion.div className={className} variants={stagger} initial="hidden" whileInView="show" viewport={{once:true,margin:'-60px'}}>{children}</motion.div>
export const Item = ({children,className=''}) => <motion.div className={className} variants={fadeUp}>{children}</motion.div>
export const Seo = ({title,description}) => <Helmet><title>{title} | Andreya Mouratek</title><meta name="description" content={description}/><meta property="og:title" content={title}/><meta property="og:description" content={description}/><meta property="og:type" content="website"/></Helmet>
const base = 'inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-medium transition min-h-11'
const styles = { primary:'bg-forest text-ivory hover:bg-deep', light:'bg-ivory text-forest hover:bg-white', ghost:'border border-current hover:bg-forest/10' }
export const Button = ({to,href,variant='primary',children,...p}) => {
  const c = `${base} ${styles[variant]}`
  if (to) return <Link to={to} className={c} {...p}>{children}</Link>
  return <a href={href} className={c} {...p}>{children}</a>
}
export const Hero = ({eyebrow,title,children,dark=true}) => (
  <section className={dark?'bg-forest text-ivory':'bg-mist'}>
    <Stagger className="mx-auto max-w-6xl px-5 py-20 md:py-28">
      {eyebrow && <Item><p className="mb-4 text-xs tracking-[.2em] text-brass">{eyebrow}</p></Item>}
      <Item><h1 className="max-w-3xl font-serif text-4xl leading-tight md:text-6xl">{title}</h1></Item>
      <Item><p className="mt-6 max-w-2xl text-lg opacity-90">{children}</p></Item>
    </Stagger>
  </section>)
export const Section = ({title,intro,children,tone='',id}) => (
  <section id={id} className={`py-16 md:py-20 ${tone}`}><div className="mx-auto max-w-6xl px-5">
    {title && <Reveal><h2 className="max-w-2xl font-serif text-3xl md:text-4xl">{title}</h2>{intro && <p className="mt-4 max-w-2xl text-muted">{intro}</p>}</Reveal>}
    <div className={title?'mt-10':''}>{children}</div></div></section>)
export const Card = ({title,children,to,icon}) => {
  const inner = <><div className="mb-3 text-brass">{icon}</div><h3 className="font-serif text-xl">{title}</h3><p className="mt-2 text-sm text-muted">{children}</p></>
  const c = 'block h-full rounded-lg border border-forest/10 bg-white p-6 transition hover:-translate-y-0.5 hover:border-brass'
  return <Item className="h-full">{to ? <Link to={to} className={c}>{inner}</Link> : <div className={c}>{inner}</div>}</Item>
}
export const Grid = ({children,cols='md:grid-cols-3'}) => <Stagger className={`grid gap-5 ${cols}`}>{children}</Stagger>
