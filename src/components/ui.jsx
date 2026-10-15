import { motion, MotionConfig } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { fadeUp, stagger, imageReveal, viewportOnce } from './motion'
export { fadeUp, stagger, pageTransition, cardHover, imageHover, imageReveal, viewportOnce } from './motion'
export const Motion = ({children}) => <MotionConfig reducedMotion="user">{children}</MotionConfig>
export const Reveal = ({children,className='',as:T='div'}) => { const M = motion[T]; return <M className={className} variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce}>{children}</M> }
export const Stagger = ({children,className=''}) => <motion.div className={className} variants={stagger} initial="hidden" whileInView="show" viewport={viewportOnce}>{children}</motion.div>
export const Item = ({children,className=''}) => <motion.div className={className} variants={fadeUp}>{children}</motion.div>
export const Seo = ({title,description}) => <Helmet><title>{title} | Andreya Mouratek</title><meta name="description" content={description}/><meta property="og:title" content={title}/><meta property="og:description" content={description}/><meta property="og:type" content="website"/></Helmet>
const base = 'inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition min-h-10 duration-300 active:scale-[.97] motion-reduce:active:scale-100'
const styles = { primary: 'bg-forest text-ivory hover:bg-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2', light: 'bg-ivory text-forest hover:bg-white', ghost: 'border border-current hover:bg-forest/10' }
export const Button = ({to, href, variant = 'primary', children, ...p}) => {
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

export const PageHero = ({eyebrow, title, description, image, dark = false, primaryCta, secondaryCta}) => (
  <section className={`relative ${dark ? 'bg-deep text-ivory' : 'bg-mist'} min-h-[50vh] md:min-h-[55vh] flex items-center`}>
    <div className="absolute inset-0 bg-gradient-to-br from-forest/10 via-transparent to-transparent" aria-hidden="true" />
    <div className="relative z-10 mx-auto max-w-6xl px-5 py-10 md:py-16 w-full">
      <div className="grid gap-8 lg:grid-cols-[1.15fr_.85fr] items-center">
        <motion.div className="max-w-2xl" variants={stagger} initial="hidden" animate="show">
          {eyebrow && <motion.p variants={fadeUp} className="mb-4 text-xs tracking-[.25em] uppercase text-brass">{eyebrow}</motion.p>}
          <motion.h1 variants={fadeUp} className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1]">{title}</motion.h1>
          {description && <motion.p variants={fadeUp} className="mt-6 text-lg md:text-xl opacity-80 leading-relaxed">{description}</motion.p>}
          {(primaryCta || secondaryCta) && (
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
              {primaryCta && <Button to={primaryCta.href} variant={primaryCta.variant}>{primaryCta.label}</Button>}
              {secondaryCta && <Button to={secondaryCta.href} variant={secondaryCta.variant} className="border-current/30 hover:bg-current/10">{secondaryCta.label}</Button>}
            </motion.div>
          )}
        </motion.div>
        {image && (
          <motion.div variants={imageReveal} initial="hidden" animate="show" className="relative">
            <div className="relative h-[280px] md:h-[320px] lg:h-[360px] rounded-2xl overflow-hidden border border-brass/30 bg-forest/10">
              <img
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105 motion-reduce:transform-none"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/30 via-transparent to-transparent" aria-hidden="true" />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  </section>
)

export const Section = ({title,intro,children,tone='',id}) => (
  <section id={id} className={`py-16 md:py-20 ${tone}`}><div className="mx-auto max-w-6xl px-5">
    {title && <Reveal><h2 className="max-w-2xl font-serif text-3xl md:text-4xl">{title}</h2>{intro && <p className="mt-4 max-w-2xl text-muted">{intro}</p>}</Reveal>}
    <div className={title?'mt-10':''}>{children}</div></div></section>)
export const Card = ({title,children,to,icon}) => {
  const inner = <><div className="mb-3 text-brass">{icon}</div><h3 className="font-serif text-xl">{title}</h3><p className="mt-2 text-sm text-muted">{children}</p></>
  const c = 'block h-full rounded-lg border border-forest/10 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-brass hover:shadow-lg hover:shadow-forest/10 motion-reduce:hover:translate-y-0'
  return <Item className="h-full">{to ? <Link to={to} className={c}>{inner}</Link> : <div className={c}>{inner}</div>}</Item>
}
export const Grid = ({children,cols='md:grid-cols-3'}) => <Stagger className={`grid gap-5 ${cols}`}>{children}</Stagger>
