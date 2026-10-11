import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { profile } from '../data/profile'
const env = import.meta.env
const configured = !!(env.VITE_EMAILJS_SERVICE_ID && env.VITE_EMAILJS_TEMPLATE_ID && env.VITE_EMAILJS_PUBLIC_KEY)
const cats = ['Freight forwarding and logistics','Customs clearance support','Transport and cargo coordination','Regional trade and supply chain','Business development and entrepreneurship','Logistics marketing and referrals','Writing and editorial projects','Community development and knowledge exchange']
const F = ({label,err,children}) => <label className="block text-sm font-medium">{label}{children}{err && <span role="alert" className="mt-1 block text-xs text-red-700">{err.message}</span>}</label>
const inp = 'mt-1 w-full rounded-md border border-forest/25 bg-white px-3 py-2.5 font-normal'
export default function ContactForm({kind='contact'}){
  const logistics = kind==='logistics'
  const {register,handleSubmit,reset,formState:{errors,isSubmitting}} = useForm()
  const [status,setStatus] = useState(null)
  const onSubmit = async (d) => {
    if (d.website) return // honeypot spam trap
    const body = Object.entries(d).filter(([k])=>k!=='website'&&k!=='privacy').map(([k,v])=>`${k}: ${v}`).join('\n')
    if (!configured) { window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(d.subject||d.enquiryType||'Website enquiry')}&body=${encodeURIComponent(body)}`; setStatus('fallback'); return }
    try { const ej = (await import('@emailjs/browser')).default
      await ej.send(env.VITE_EMAILJS_SERVICE_ID, env.VITE_EMAILJS_TEMPLATE_ID, { ...d, message: body, reply_to: d.email }, { publicKey: env.VITE_EMAILJS_PUBLIC_KEY })
      setStatus('ok'); reset() } catch { setStatus('error') }
  }
  const req = {required:'This field is required'}
  const email = {...req, pattern:{value:/^\S+@\S+\.\S+$/, message:'Enter a valid email address'}}
  return <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-4 rounded-lg border border-forest/10 bg-white p-6">
    <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" {...register('website')}/>
    <F label="Full name" err={errors.name}><input className={inp} autoComplete="name" {...register('name',req)}/></F>
    {logistics && <F label="Company or organization"><input className={inp} {...register('company')}/></F>}
    <F label="Email address" err={errors.email}><input type="email" className={inp} autoComplete="email" {...register('email',email)}/></F>
    {logistics && <><F label="Telephone number" err={errors.phone}><input type="tel" className={inp} {...register('phone',req)}/></F>
      <F label="Type of enquiry" err={errors.enquiryType}><select className={inp} {...register('enquiryType',req)}><option value="">Select…</option>{cats.slice(0,3).concat('Partnership or referral','Other').map(c=><option key={c}>{c}</option>)}</select></F>
      <F label="Origin and destination" err={errors.route}><input className={inp} {...register('route',req)}/></F>
      <F label="Cargo or service requirements" err={errors.cargo}><input className={inp} {...register('cargo',req)}/></F></>}
    {!logistics && <><F label="Subject" err={errors.subject}><input className={inp} {...register('subject',req)}/></F>
      <F label="Collaboration category" err={errors.category}><select className={inp} {...register('category',req)}><option value="">Select…</option>{cats.map(c=><option key={c}>{c}</option>)}</select></F></>}
    <F label={logistics?'Additional message':'Message'} err={errors.message}><textarea rows={5} className={inp} {...register('message', logistics?{}:req)}/></F>
    {!logistics && <label className="flex gap-2 text-sm"><input type="checkbox" {...register('privacy',{required:'Please acknowledge to continue'})}/>I agree that my details may be used to respond to this message.</label>}
    {errors.privacy && <span role="alert" className="text-xs text-red-700">{errors.privacy.message}</span>}
    <button disabled={isSubmitting} className="min-h-11 rounded-md bg-forest px-6 py-3 text-ivory hover:bg-deep disabled:opacity-60">{isSubmitting?'Sending…':'Send message'}</button>
    <div aria-live="polite" className="text-sm">
      {status==='ok' && <p className="text-forest">Thank you. Your message has been sent.</p>}
      {status==='error' && <p className="text-red-700">Sending failed. Please email <a className="underline" href={`mailto:${profile.email}`}>{profile.email}</a> directly.</p>}
      {status==='fallback' && <p className="text-muted">Online delivery is not configured, so your email app was opened with the message prepared. Nothing has been sent until you send it from there.</p>}
    </div></form>
}
