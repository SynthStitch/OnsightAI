import {
  IconArrowRight, IconArrowUp, IconCalculator, IconCheck, IconCloudOff, IconDental, IconFileSearch,
  IconForms, IconHome, IconLock, IconMail, IconMicrophone, IconScale, IconShieldLock, IconStethoscope,
  IconUmbrella, IconUsersGroup, IconWifiOff, IconX,
} from '@tabler/icons-react'
import { Clock, Eyebrow, Glass, Pill, cn } from './ui'

const features = [
  [IconFileSearch, 'Ask your documents', 'Answers come from your own contracts, SOPs and records, with the source file cited on every reply.'],
  [IconMail, 'Drafts in your voice', 'Emails, letters and client updates written in your firm’s style, ready for a quick review.'],
  [IconMicrophone, 'Meeting notes', 'Record a consult or staff meeting. Get a transcript, a summary and the action items.'],
  [IconForms, 'Intake to paperwork', 'Turn intake forms into filled documents and summaries without retyping anything.'],
  [IconUsersGroup, 'A login for every employee', 'Everyone signs in. Admins decide who can see which folders.'],
  [IconShieldLock, 'Encrypted and logged', 'Disk encryption, nightly backups and an audit log of who asked what.'],
]

const industries = [[IconScale, 'Law firms'], [IconDental, 'Dental'], [IconStethoscope, 'Medical clinics'], [IconCalculator, 'CPAs & tax'], [IconUmbrella, 'Insurance'], [IconHome, 'Real estate']]

const steps = [
  ['01', 'Discovery call', 'We learn which workflows eat your week and size the right box.'],
  ['02', 'On-site install', 'We set up the hardware in your office and connect your file shares.'],
  ['03', 'Loaded with your docs', 'Your documents are indexed locally. Staff get logins the same day.'],
  ['04', 'Monthly care', 'Updates, new models, monitoring, and a local number to call.'],
]

const tiers = [
  { name: 'Starter', hw: 'Mac mini · 64 GB', users: '1–5 users', price: '~$2,000', items: ['Private chat', 'Document Q&A', 'Email and letter drafting'] },
  { name: 'Pro', hw: 'NVIDIA DGX Spark · 128 GB', users: '5–20 users', price: '$4,699', items: ['Everything in Starter', 'Larger, smarter models', 'Automations: intake, reports, notes'], featured: true },
  { name: 'Office', hw: 'Mac Studio M3 Ultra · up to 256 GB', users: '20+ users', price: '~$6,000+', items: ['Everything in Pro', 'The largest open models', 'Custom integrations'] },
]

const compare = [
  ['Where your data goes', 'Stays in your office', 'A vendor’s servers'],
  ['Cost as you grow', 'One flat monthly plan', 'Per seat, every seat'],
  ['Works when the internet is down', true, false],
  ['Knows your documents', 'All of them, with permissions', 'Only what you paste in'],
  ['Who you call', 'A local tech, by name', 'A support ticket'],
]

const faqs = [
  ['Is it as smart as ChatGPT?', 'For everyday work like drafting, summarizing and finding things in your files, it is very capable. On the hardest reasoning tasks the top cloud models are still stronger, and we show you exactly where that line is in the demo.'],
  ['Does it help with HIPAA or client confidentiality?', 'Keeping data on-site removes the biggest risk. We also set up encryption, per-user logins, backups and access logs. Your compliance officer or attorney should still review the setup.'],
  ['Who owns the hardware?', 'You do. Buy it through us at cost-plus, or buy it directly and pay only for setup.'],
  ['What happens if it breaks?', 'Your care plan covers monitoring and a set number of support hours. With your permission we fix most issues remotely, and we are local for the rest.'],
]

const DEMO_CALL = 'mailto:hello@example.com?subject=Demo%20request' // TODO: real booking link

function Cell({ v }) {
  if (v === true) return <IconCheck size={18} className="text-ink" />
  if (v === false) return <IconX size={18} className="text-slate-400" />
  return v
}

export default function Landing() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
      {/* Nav */}
      <header className="sticky top-4 z-20 mt-4">
        <Glass className="flex items-center justify-between !rounded-full py-2.5 pl-3 pr-2.5">
          <a href="#" className="flex items-center gap-2.5 font-semibold">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-ink text-white"><IconLock size={16} /></span>
            Onsite AI
          </a>
          <nav className="hidden gap-7 text-sm text-slate-600 md:flex">
            <a href="#features" className="hover:text-ink">Features</a>
            <a href="#how" className="hover:text-ink">How it works</a>
            <a href="#pricing" className="hover:text-ink">Pricing</a>
            <a href="#faq" className="hover:text-ink">FAQ</a>
          </nav>
          <a href="#/demo" className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-white hover:bg-slate-800">Try the demo</a>
        </Glass>
      </header>

      {/* Hero */}
      <section className="grid items-center gap-12 pt-20 pb-16 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <Eyebrow>Private AI · Installed on-site</Eyebrow>
          <h1 className="mt-5 text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-6xl">
            Your own AI assistant. It never leaves the building.
          </h1>
          <p className="mt-6 max-w-lg text-lg text-slate-600">
            We install a private AI system in your office, load it with your documents, and keep it running.
            No client files sent to the cloud, and no per-seat subscriptions.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={DEMO_CALL} className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-medium text-white shadow-lg shadow-slate-900/20 hover:bg-slate-800">
              Book a 20-minute demo <IconArrowRight size={18} />
            </a>
            <a href="#/demo" className="glass inline-flex items-center rounded-full px-6 py-3 font-medium text-ink">See the interface</a>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            <Pill icon={IconWifiOff}>Works offline</Pill>
            <Pill icon={IconCloudOff}>0 bytes to the cloud</Pill>
            <Pill icon={IconShieldLock}>Encrypted at rest</Pill>
          </div>
        </div>

        {/* Product preview */}
        <Glass className="p-5">
          <div className="flex items-center justify-between px-1 pb-4">
            <p className="text-sm text-slate-500">Office <span className="font-semibold text-ink">Smith &amp; Co Law</span></p>
            <Pill icon={IconWifiOff}>Offline</Pill>
          </div>
          <div className="space-y-3">
            <div className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-ink px-4 py-2.5 text-sm text-white">
              What notice does the Henderson lease require to terminate?
            </div>
            <Glass raised className="!rounded-2xl p-4 text-sm leading-relaxed text-slate-700">
              Section 4.2 requires <b className="text-ink">60 days’ written notice</b>, delivered by certified mail to the
              landlord’s address in Schedule A. Early termination also triggers a fee of two months’ rent (§4.3).
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="hatch rounded-lg px-2 py-1 font-mono text-[11px] text-slate-600 ring-1 ring-white/80">Henderson_Lease_2024.pdf · p.6</span>
                <span className="hatch rounded-lg px-2 py-1 font-mono text-[11px] text-slate-600 ring-1 ring-white/80">Schedule_A.pdf · p.1</span>
              </div>
            </Glass>
            <div className="flex items-center gap-4 rounded-2xl p-2">
              <Clock size={64} />
              <div className="text-sm text-slate-500">Answered in 3.1s on <span className="font-medium text-ink">your box</span>, from 3,218 indexed files.</div>
            </div>
          </div>
        </Glass>
      </section>

      {/* Industries */}
      <section className="pb-20">
        <Eyebrow className="text-center">Built for offices that handle confidential files</Eyebrow>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {industries.map(([Icon, label]) => (
            <Glass key={label} className="flex items-center justify-center gap-2 !rounded-2xl py-4 text-sm font-medium text-slate-600">
              <Icon size={18} stroke={1.5} /> {label}
            </Glass>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="scroll-mt-28 pb-24">
        <Eyebrow>What it does</Eyebrow>
        <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl">The AI your staff already want, without the risk.</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(([Icon, title, body]) => (
            <Glass key={title} className="p-6">
              <span className="glass-raised grid h-11 w-11 place-items-center rounded-2xl text-ink"><Icon size={22} stroke={1.5} /></span>
              <h3 className="mt-5 font-semibold text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{body}</p>
            </Glass>
          ))}
        </div>
      </section>

      {/* Upload band, reference 2 */}
      <section className="slate-surface relative overflow-hidden rounded-[2.5rem] px-6 py-14 sm:px-14">
        <div className="pointer-events-none absolute inset-6 rounded-[2rem] border border-white/15 bg-white/[0.04]" />
        <div className="relative grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/50">Your files</p>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/30">Stay local</p>
            <h2 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Drop in a folder. Ask it anything.</h2>
            <p className="mt-4 max-w-md text-white/70">Contracts, patient forms, tax returns, SOPs. Everything is indexed on the box in your office and searched there. Nothing is uploaded anywhere else.</p>
          </div>
          <div className="flex items-center gap-5 sm:justify-end">
            <a href="#/demo" aria-label="Open the demo" className="bevel grid h-24 w-24 shrink-0 place-items-center rounded-full sm:h-28 sm:w-28">
              <IconArrowUp size={40} stroke={1.75} />
            </a>
            <a href="#/demo" className="bevel rounded-full px-8 py-5 text-3xl font-medium sm:px-12 sm:text-5xl">Upload</a>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="scroll-mt-28 py-24">
        <Eyebrow>How it works</Eyebrow>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Installed in a week. Supported every month.</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-4">
          {steps.map(([n, title, body], i) => (
            <Glass key={n} raised={i === 0} className="p-6">
              <p className="font-mono text-sm text-slate-400">{n}</p>
              <h3 className="mt-6 font-semibold text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{body}</p>
            </Glass>
          ))}
        </div>
      </section>

      {/* Compare */}
      <section className="pb-24">
        <Glass className="overflow-hidden p-2">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-slate-500">
                <th className="p-4 font-medium" />
                <th className="p-4 font-semibold text-ink">Onsite AI</th>
                <th className="p-4 font-medium">Cloud AI subscriptions</th>
              </tr>
            </thead>
            <tbody>
              {compare.map(([row, us, them]) => (
                <tr key={row} className="border-t border-white/60">
                  <td className="p-4 text-slate-600">{row}</td>
                  <td className="p-4 font-medium text-ink"><Cell v={us} /></td>
                  <td className="p-4 text-slate-500"><Cell v={them} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Glass>
      </section>

      {/* Pricing */}
      <section id="pricing" className="scroll-mt-28 pb-24">
        <Eyebrow>Pricing</Eyebrow>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Pick a box. We handle the rest.</h2>
        <p className="mt-3 max-w-xl text-slate-600">One-time setup, hardware at cost-plus, and a monthly care plan from $300. Hardware prices are moving fast, so every quote is checked the day we send it.</p>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {tiers.map(t => (
            <Glass key={t.name} raised={t.featured} className={cn('flex flex-col p-7', t.featured && 'ring-2 ring-ink/80')}>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-ink">{t.name}</h3>
                {t.featured && <span className="rounded-full bg-ink px-2.5 py-1 text-xs font-medium text-white">Most offices</span>}
              </div>
              <p className="mt-1 text-sm text-slate-500">{t.users}</p>
              <p className="mt-6 text-3xl font-semibold tracking-tight text-ink">{t.price}</p>
              <p className="font-mono text-xs text-slate-500">{t.hw} · hardware</p>
              <ul className="mt-6 flex-1 space-y-2.5 text-sm text-slate-600">
                {t.items.map(i => <li key={i} className="flex gap-2"><IconCheck size={18} className="shrink-0 text-ink" />{i}</li>)}
              </ul>
              <a href={DEMO_CALL} className={cn('mt-8 rounded-full py-2.5 text-center text-sm font-medium',
                t.featured ? 'bg-ink text-white hover:bg-slate-800' : 'glass text-ink')}>Get a quote</a>
            </Glass>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-28 pb-24">
        <Eyebrow>Straight answers</Eyebrow>
        <div className="mt-8 grid gap-3">
          {faqs.map(([q, a]) => (
            <Glass key={q} className="!rounded-2xl">
              <details className="group p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-ink">
                  {q}<IconArrowRight size={18} className="transition group-open:rotate-90" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{a}</p>
              </details>
            </Glass>
          ))}
        </div>
      </section>

      {/* CTA */}
      <Glass raised className="p-10 text-center sm:p-16">
        <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">See it run in your office.</h2>
        <p className="mx-auto mt-3 max-w-md text-slate-600">20 minutes, on your own sample documents. No slides.</p>
        <a href={DEMO_CALL} className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-medium text-white hover:bg-slate-800">
          Book a demo <IconArrowRight size={18} />
        </a>
      </Glass>

      <footer className="mt-12 flex flex-wrap justify-between gap-4 text-sm text-slate-500">
        <span>© {new Date().getFullYear()} Onsite AI · San Antonio, TX</span>
        <span className="font-mono text-xs">Private AI, installed and maintained locally.</span>
      </footer>
    </div>
  )
}
