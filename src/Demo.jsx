import { useRef, useState } from 'react'
import {
  IconArrowLeft, IconArrowUp, IconBolt, IconChevronDown, IconChevronRight, IconChevronUp, IconCircleCheck,
  IconCornerDownLeft, IconCpu, IconFileText, IconFiles, IconFolder, IconGripVertical, IconLayoutDashboard,
  IconListDetails, IconLock, IconMessageChatbot, IconMicrophone, IconPlus, IconSearch, IconServer2, IconUsers, IconWifiOff,
} from '@tabler/icons-react'
import { Clock, Count, Glass, Meter, Pill, Toggle, cn, useNow } from './ui'

// ---------- mock data (swap for LM Studio + real backend later) ----------

const workspaces = [['Client files', 1284], ['HR & policies', 46], ['Templates', 112], ['General', 0]]

const starterChat = [
  { role: 'user', text: 'What notice does the Henderson lease require to terminate?' },
  {
    role: 'ai',
    text: 'Section 4.2 requires 60 days’ written notice, delivered by certified mail to the landlord’s address in Schedule A. Terminating early also triggers a fee equal to two months’ rent (§4.3).',
    sources: ['Henderson_Lease_2024.pdf · p.6', 'Schedule_A.pdf · p.1'],
  },
]

const MODEL = 'qwen/qwen2.5-coder-14b'
const SYSTEM_PROMPT = 'You are the private, on-premises AI assistant for Smith & Co Law, a small law office. Be concise, professional and accurate. Say so when you are unsure.'

// Streams LM Studio's /api/v1/chat SSE, calling onDelta with each text chunk. Returns the response_id for the next turn.
async function streamChat({ input, previousId, workspace, onDelta }) {
  const res = await fetch('/lmstudio/api/v1/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: MODEL, input, stream: true,
      system_prompt: `${SYSTEM_PROMPT} Current workspace: ${workspace}.`,
      ...(previousId && { previous_response_id: previousId }),
    }),
  })
  if (!res.ok) throw new Error(`LM Studio returned ${res.status}`)
  const reader = res.body.pipeThrough(new TextDecoderStream()).getReader()
  let buf = '', id = null
  for (;;) {
    const { value, done } = await reader.read()
    if (done) return id
    buf += value
    const lines = buf.split('\n')
    buf = lines.pop()
    for (const line of lines) {
      if (!line.startsWith('data: ')) continue
      const ev = JSON.parse(line.slice(6))
      if (ev.type === 'message.delta') onDelta(ev.content)
      if (ev.type === 'chat.end') id = ev.result.response_id
      if (ev.type === 'error') throw new Error(ev.error?.message || 'LM Studio error')
    }
  }
}

const folders = [['Client files', 1284, 'Attorneys'], ['HR & policies', 46, 'Everyone'], ['Templates', 112, 'Everyone'], ['Billing', 1776, 'Admins']]

const files = [
  ['Henderson_Lease_2024.pdf', 'Client files', '2.4 MB', 'Indexed'],
  ['Intake_2231_Garcia.pdf', 'Client files', '880 KB', 'Indexed'],
  ['Employee_Handbook_v7.docx', 'HR & policies', '1.1 MB', 'Indexed'],
  ['Q3_Billing_Export.xlsx', 'Billing', '5.8 MB', 64],
  ['Deposition_Ramos_audio.m4a', 'Client files', '48 MB', 'Queued'],
]

const automations = [
  ['Draft email replies', 'Drafts replies to client emails in the firm’s voice and leaves them in Outlook for review.', 'Outlook', 128, true],
  ['Summarize intake forms', 'New intake PDFs get a one-page summary and a conflict check against existing clients.', 'Shared drive', 41, true],
  ['Meeting notes', 'Transcribes recorded consults and sends the summary and action items to the attendees.', 'Microphone', 17, true],
  ['Weekly matter report', 'Every Friday, a status report on open matters for the managing partner.', 'Schedule', 6, false],
]

const team = [
  ['Sarah Smith', 'Admin', 'All workspaces', 'Now'],
  ['David Cho', 'Staff', 'Client files, Templates', '12 min ago'],
  ['Ana Ramirez', 'Staff', 'Client files, HR', '1 hr ago'],
  ['Front desk', 'Limited', 'General, Templates', 'Yesterday'],
]

const audit = [
  ['10:42', 'David Cho', 'Asked a question', 'Client files'],
  ['10:38', 'System', 'Indexed 12 new files', 'Client files'],
  ['10:15', 'Sarah Smith', 'Changed permissions', 'Billing → Admins only'],
  ['09:58', 'Ana Ramirez', 'Ran automation', 'Summarize intake forms'],
  ['09:30', 'Front desk', 'Denied access', 'Client files'],
  ['02:00', 'System', 'Encrypted backup completed', 'All data'],
]

const models = [
  ['qwen3-32b', 'Chat & documents', '19 GB', '32 tok/s', 'Apache 2.0'],
  ['gpt-oss-20b', 'Fast drafting', '13 GB', '58 tok/s', 'Apache 2.0'],
  ['llama-3.3-70b', 'Hard questions', '42 GB', '11 tok/s', 'Llama license'],
  ['whisper-large-v3', 'Transcription', '3 GB', '—', 'MIT'],
]

// ---------- shell ----------

const nav = [
  ['overview', 'Overview', IconLayoutDashboard],
  ['chat', 'Assistant', IconMessageChatbot],
  ['docs', 'Documents', IconFiles],
  ['auto', 'Automations', IconBolt],
  ['team', 'Team', IconUsers],
  ['audit', 'Audit log', IconListDetails],
  ['models', 'Models', IconCpu],
  ['system', 'System', IconServer2],
]

export default function Demo() {
  const [view, setView] = useState('overview')
  const View = { overview: Overview, chat: Chat, docs: Documents, auto: Automations, team: Team, audit: Audit, models: Models, system: System }[view]

  return (
    <div className="p-3 sm:p-6">
      <Glass className="flex min-h-[calc(100vh-3rem)] flex-col gap-4 !rounded-[2.5rem] p-3 md:flex-row">
        {/* Icon rail */}
        <aside className="flex shrink-0 gap-2 overflow-x-auto rounded-[2rem] bg-white/70 p-2 shadow-sm ring-1 ring-white md:flex-col md:overflow-visible">
          <a href="#/" title="Back to site" className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-ink text-white shadow-lg shadow-slate-900/30">
            <IconLock size={24} stroke={1.75} />
          </a>
          {nav.map(([id, label, Icon]) => (
            <button key={id} title={label} onClick={() => setView(id)}
              className={cn('grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-slate-600 transition hover:text-ink',
                view === id && 'bg-slate-400/20 text-ink ring-1 ring-white')}>
              <Icon size={26} stroke={1.5} />
            </button>
          ))}
        </aside>

        <main className="flex min-w-0 flex-1 flex-col">
          <header className="flex flex-wrap items-center gap-3 px-3 py-3">
            <p className="text-lg text-slate-500">Office <span className="font-semibold text-ink">Smith &amp; Co Law</span></p>
            <IconMicrophone size={20} className="text-slate-500" />
            <div className="ml-auto flex flex-wrap items-center gap-2">
              <Pill icon={IconWifiOff}>Offline · local only</Pill>
              <Pill icon={IconCpu}>{MODEL.split('/').pop()}</Pill>
              <a href="#/" className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium text-slate-500 hover:text-ink">
                <IconArrowLeft size={14} /> Site
              </a>
            </div>
          </header>
          <View />
        </main>
      </Glass>
    </div>
  )
}

function Panel({ title, action, className, children }) {
  return (
    <Glass className={cn('flex min-w-0 flex-col p-6', className)}>
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="text-xl font-medium text-ink">{title}</h2>
        {action}
      </div>
      {children}
    </Glass>
  )
}

function Row({ icon: Icon, label, count, active, onClick }) {
  return (
    <button onClick={onClick}
      className={cn('flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-slate-700 transition',
        active ? 'glass-raised' : 'hover:bg-white/30')}>
      <Icon size={22} stroke={1.5} />
      <span className="flex-1 truncate">{label}</span>
      {count !== undefined && <Count muted={!count}>{count}</Count>}
      {active && <IconChevronRight size={18} className="text-slate-500" />}
    </button>
  )
}

function Group({ label, count, open: initial = false, children }) {
  const [open, setOpen] = useState(initial)
  return (
    <div className="mt-4">
      <button onClick={() => setOpen(!open)} className="flex items-center gap-2.5 py-2 text-slate-700">
        {open ? <IconChevronUp size={18} /> : <IconChevronDown size={18} />} {label} <Count muted={!count}>{count}</Count>
      </button>
      {open && <div className="mt-2 space-y-2">{children}</div>}
    </div>
  )
}

function Chip({ children }) {
  return (
    <span className="glass-raised inline-flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-sm text-slate-700">
      <IconCircleCheck size={16} stroke={1.5} />{children}
    </span>
  )
}

function Table({ head, rows }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead><tr className="text-slate-500">{head.map(h => <th key={h} className="px-3 pb-3 font-medium">{h}</th>)}</tr></thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-white/60">{r.map((c, j) => <td key={j} className="px-3 py-3.5 text-slate-700">{c}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const grid = 'grid flex-1 gap-4 p-1'

// ---------- views ----------

function Overview() {
  const now = useNow()
  return (
    <div className={cn(grid, 'lg:grid-cols-3')}>
      <Panel title="Today">
        <Row icon={IconMessageChatbot} label="Questions answered" count={142} active />
        <Row icon={IconFileText} label="Files indexed" count="3,218" />
        <Row icon={IconBolt} label="Automations run" count={37} />
        <Glass raised className="mt-6 flex items-center gap-6 p-5">
          <Clock size={130} />
          <div>
            <p className="text-3xl font-medium text-ink">{now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</p>
            <p className="mt-1 text-slate-500">{now.toLocaleDateString([], { weekday: 'short', day: 'numeric', month: 'long' })}</p>
          </div>
        </Glass>
      </Panel>

      <Panel title="Activity">
        <div className="glass flex items-center gap-3 rounded-2xl px-4 py-3.5 text-slate-500">
          <IconPlus size={20} /> Ask or assign a task, press
          <span className="rounded-md bg-slate-400/20 p-0.5"><IconCornerDownLeft size={14} /></span> ENTER
        </div>
        <Group label="Needs review" count={2} open>
          <div className="glass-raised hatch flex items-center gap-3 rounded-2xl p-2.5">
            <IconGripVertical size={18} className="text-slate-400" /><Chip>Draft</Chip><span className="truncate text-slate-700">Reply to Mark Henderson</span>
          </div>
          <div className="glass flex items-center gap-3 rounded-2xl p-2.5">
            <IconGripVertical size={18} className="text-slate-400" /><Chip>Summary</Chip><span className="truncate text-slate-700">Intake #2231 Garcia</span>
          </div>
        </Group>
        <Group label="Scheduled" count={1}>
          <div className="glass flex items-center gap-3 rounded-2xl p-2.5"><Chip>Report</Chip><span className="text-slate-700">Weekly matter report · Fri</span></div>
        </Group>
        <Group label="Done today" count={12} />
        <Group label="Failed" count={0} />
      </Panel>

      <Panel title="System">
        <div className="space-y-5">
          <Meter label="GPU memory" detail="74 / 128 GB" value={58} />
          <Meter label="Document storage" detail="212 GB / 2 TB" value={11} />
          <Meter label="Load" detail="23%" value={23} />
        </div>
        <Glass raised className="mt-6 p-5">
          <p className="text-sm text-slate-500">Sent to the cloud this month</p>
          <p className="mt-1 text-4xl font-semibold tracking-tight text-ink">0 bytes</p>
        </Glass>
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <Glass className="!rounded-2xl p-4"><p className="text-slate-500">Uptime</p><p className="font-medium text-ink">41 days</p></Glass>
          <Glass className="!rounded-2xl p-4"><p className="text-slate-500">Last backup</p><p className="font-medium text-ink">2:00 AM</p></Glass>
        </div>
      </Panel>
    </div>
  )
}

function Chat() {
  const [ws, setWs] = useState(0)
  const [msgs, setMsgs] = useState(starterChat)
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const end = useRef(null)
  const lastId = useRef(null) // LM Studio keeps history server-side; we just chain response ids

  async function send(e) {
    e.preventDefault()
    if (!input.trim() || busy) return
    const text = input
    const setLast = fn => setMsgs(m => [...m.slice(0, -1), fn(m.at(-1))])
    setMsgs(m => [...m, { role: 'user', text }, { role: 'ai', text: '' }])
    setInput(''); setBusy(true)
    try {
      lastId.current = await streamChat({
        input: text, previousId: lastId.current, workspace: workspaces[ws][0],
        onDelta: d => { setLast(a => ({ ...a, text: a.text + d })); end.current?.scrollIntoView({ block: 'end' }) },
      })
    } catch (err) {
      setLast(a => ({ ...a, text: a.text || `Couldn’t reach the local model (${err.message}). Is the LM Studio server running?` }))
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className={cn(grid, 'lg:grid-cols-[300px_1fr]')}>
      <Panel title="Workspaces">
        {workspaces.map(([name, n], i) => <Row key={name} icon={IconFolder} label={name} count={n} active={ws === i} onClick={() => setWs(i)} />)}
        <p className="mt-auto pt-6 text-xs leading-relaxed text-slate-500">Answers only use files this user can access. Every question is written to the audit log.</p>
      </Panel>

      <Panel title="Assistant" className="min-h-[70vh]" action={<Pill icon={IconLock}>{workspaces[ws][0]}</Pill>}>
        <div className="flex-1 space-y-4 overflow-y-auto pr-1">
          {msgs.map((m, i) => m.role === 'user' ? (
            <div key={i} className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-md bg-ink px-4 py-2.5 text-white">{m.text}</div>
          ) : (
            <Glass key={i} raised className="max-w-[85%] !rounded-2xl p-4 whitespace-pre-wrap leading-relaxed text-slate-700">
              {m.text || <span className="text-slate-400">Thinking on your box…</span>}
              {!!m.sources?.length && (
                <div className="mt-3 flex flex-wrap gap-2 whitespace-normal">
                  {m.sources.map(s => <span key={s} className="hatch rounded-lg px-2 py-1 font-mono text-[11px] text-slate-600 ring-1 ring-white/80">{s}</span>)}
                </div>
              )}
            </Glass>
          ))}
          <div ref={end} />
        </div>
        <form onSubmit={send} className="glass mt-4 flex items-center gap-3 rounded-2xl py-2 pl-4 pr-2">
          <IconPlus size={20} className="text-slate-500" />
          <input value={input} onChange={e => setInput(e.target.value)} placeholder="Ask about your documents, or try “Draft a reply to Mark”"
            className="min-w-0 flex-1 bg-transparent py-2 outline-none placeholder:text-slate-400" />
          <button disabled={busy} className="grid h-10 w-10 place-items-center rounded-xl bg-ink text-white disabled:opacity-40" aria-label="Send">
            <IconArrowUp size={20} />
          </button>
        </form>
      </Panel>
    </div>
  )
}

function Documents() {
  return (
    <div className={cn(grid, 'lg:grid-cols-[1fr_2fr]')}>
      <div className="flex flex-col gap-4">
        <div className="slate-surface flex items-center gap-4 rounded-[1.75rem] p-6">
          <button className="bevel grid h-16 w-16 shrink-0 place-items-center rounded-full" aria-label="Upload"><IconArrowUp size={28} /></button>
          <button className="bevel rounded-full px-8 py-3.5 text-2xl font-medium">Upload</button>
        </div>
        <Panel title="Folders" className="flex-1">
          {folders.map(([name, n, access], i) => <Row key={name} icon={IconFolder} label={`${name} · ${access}`} count={n} active={i === 0} />)}
          <button className="mt-3 flex items-center gap-2 px-3 py-2 text-sm text-slate-500 hover:text-ink"><IconPlus size={16} /> Connect a shared drive</button>
        </Panel>
      </div>
      <Panel title="Files" action={
        <label className="glass flex items-center gap-2 rounded-xl px-3 py-1.5 text-sm"><IconSearch size={16} className="text-slate-500" /><input placeholder="Search" className="w-32 bg-transparent outline-none" /></label>
      }>
        <Table head={['Name', 'Folder', 'Size', 'Status']} rows={files.map(([n, f, s, st]) => [
          <span className="flex items-center gap-2 font-medium text-ink"><IconFileText size={18} stroke={1.5} />{n}</span>, f, s,
          typeof st === 'number'
            ? <span className="flex items-center gap-2"><span className="h-1.5 w-16 rounded-full bg-slate-400/25"><span className="block h-full rounded-full bg-ink" style={{ width: `${st}%` }} /></span>{st}%</span>
            : <Count muted={st !== 'Indexed'}>{st}</Count>,
        ])} />
      </Panel>
    </div>
  )
}

function Automations() {
  const [on, setOn] = useState(automations.map(a => a[4]))
  return (
    <div className={cn(grid, 'content-start md:grid-cols-2')}>
      {automations.map(([name, body, trigger, runs], i) => (
        <Panel key={name} title={name} action={<Toggle on={on[i]} onChange={v => setOn(o => o.map((x, j) => j === i ? v : x))} />}>
          <p className="text-sm leading-relaxed text-slate-600">{body}</p>
          <div className="mt-5 flex flex-wrap gap-2"><Pill>Trigger: {trigger}</Pill><Pill>{runs} runs this month</Pill></div>
        </Panel>
      ))}
      <button className="glass flex min-h-40 items-center justify-center gap-2 rounded-[1.75rem] text-slate-500 hover:text-ink md:col-span-2">
        <IconPlus size={20} /> Request a custom automation
      </button>
    </div>
  )
}

function Team() {
  return (
    <div className={grid}>
      <Panel title="Team" action={<button className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-white">Invite</button>}>
        <Table head={['Name', 'Role', 'Workspaces', 'Last active']} rows={team.map(([n, r, w, l]) => [
          <span className="flex items-center gap-3 font-medium text-ink"><span className="glass-raised grid h-9 w-9 place-items-center rounded-full text-xs">{n.split(' ').map(p => p[0]).join('')}</span>{n}</span>,
          <Count muted={r === 'Limited'}>{r}</Count>, w, l,
        ])} />
      </Panel>
    </div>
  )
}

function Audit() {
  return (
    <div className={grid}>
      <Panel title="Audit log" action={<Pill icon={IconLock}>Tamper-evident · kept 7 years</Pill>}>
        <Table head={['Time', 'Who', 'Action', 'Resource']} rows={audit.map(([t, w, a, r]) => [<span className="font-mono text-xs">{t}</span>, w, a, r])} />
      </Panel>
    </div>
  )
}

function Models() {
  const [active, setActive] = useState(0)
  return (
    <div className={grid}>
      <Panel title="Installed models" action={<Pill>All run on this box</Pill>}>
        <div className="space-y-3">
          {models.map(([name, use, size, speed, license], i) => (
            <button key={name} onClick={() => setActive(i)}
              className={cn('flex w-full flex-wrap items-center gap-x-6 gap-y-2 rounded-2xl p-4 text-left', active === i ? 'glass-raised hatch' : 'glass')}>
              <span className={cn('h-4 w-4 rounded-full ring-1 ring-slate-400', active === i && 'border-4 border-ink ring-ink')} />
              <span className="min-w-40 font-mono font-medium text-ink">{name}</span>
              <span className="flex-1 text-sm text-slate-600">{use}</span>
              <span className="text-sm text-slate-500">{size}</span>
              <span className="text-sm text-slate-500">{speed}</span>
              <Count>{license}</Count>
            </button>
          ))}
        </div>
      </Panel>
    </div>
  )
}

function System() {
  const [s, setS] = useState({ encryption: true, backups: true, remote: false, updates: true })
  const items = [
    ['encryption', 'Disk encryption', 'All documents and chat history are encrypted at rest.'],
    ['backups', 'Nightly encrypted backups', 'Backed up to a drive in your office at 2:00 AM.'],
    ['remote', 'Remote support access', 'Lets your technician connect to fix issues. Off unless you turn it on.'],
    ['updates', 'Automatic model updates', 'New models are tested by us before they reach your box.'],
  ]
  return (
    <div className={cn(grid, 'content-start md:grid-cols-2')}>
      {items.map(([k, title, body]) => (
        <Panel key={k} title={title} action={<Toggle on={s[k]} onChange={v => setS({ ...s, [k]: v })} />}>
          <p className="text-sm text-slate-600">{body}</p>
        </Panel>
      ))}
      <Panel title="Hardware" className="md:col-span-2">
        <div className="grid gap-5 md:grid-cols-3">
          <Meter label="GPU memory" detail="74 / 128 GB" value={58} />
          <Meter label="Storage" detail="212 GB / 2 TB" value={11} />
          <Meter label="Temperature" detail="61°C" value={61} />
        </div>
      </Panel>
    </div>
  )
}
