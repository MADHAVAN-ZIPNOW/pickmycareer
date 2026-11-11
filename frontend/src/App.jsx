import React, { useEffect, useState } from 'react'
import { api, setToken, hasToken } from './api.js'
import { B, AuthModal, Quiz } from './parts.jsx'
import { Header, Hero } from './Chrome.jsx'
import { t, tr, feeText, loadLang, saveLang } from './lang.js'

const inr = (n) => '₹' + Number(n).toLocaleString('en-IN')
const Rows = ({ r }) => r.map(([k, v]) => <div className="row" key={k}><span>{k}</span><b>{v}</b></div>)
const Journey = () => <div className="journey">{[t('ஆர்வம்', 'Interest'), t('படிப்பு', 'Course'), t('கல்லூரி', 'College'), t('கட்டணம்', 'Fees'), t('வீடியோ', 'Videos'), t('தேர்வு', 'Exam')].map((j) => <i key={j}>{j}</i>)}</div>

const CARDS = [
  { k: 'k1', t: 'quiz', ic: '🧠', ta: 'திறன் மதிப்பீடு', en: 'Assessment', d: { ta: '100 எளிய கேள்விகள். உனக்கான 3 சிறந்த தொழில்களைக் கண்டறி.', en: '100 simple questions. Find your top 3 careers.' } },
  { k: 'k2', t: 'experts', ic: '🎤', ta: 'நிபுணர் உரை', en: 'Expert Speech', d: { ta: 'நிபுணர்களிடம் கேள்: படிப்புகள், தேர்வுகள், உதவித்தொகை.', en: 'Listen to experts: courses, exams, scholarships.' } },
  { k: 'k3', t: 'careers', ic: '🚀', ta: 'தொழில் பாதை', en: 'Career Path', d: { ta: 'உன் தொழிலைத் தேர்ந்தெடு. படிப்பு, தேர்வு, கட்டணம் பார்.', en: 'Choose your career. See course, exam and fees.' } },
  { k: 'k4', t: 'colleges', ic: '🏫', ta: 'கல்லூரி & கட்டணம்', en: 'College & Fees', d: { ta: 'கல்லூரி, கட்டணம், விடுதி, உதவித்தொகை ஒப்பிடு.', en: 'Compare colleges, fees, hostel and scholarships.' } },
]

export default function App() {
  const [user, setUser] = useState(null)
  const [pending, setPending] = useState(null)
  const [authOpen, setAuthOpen] = useState(false)
  const [view, setView] = useState(null) // {t, id?}
  const [lang, setLang] = useState(loadLang)
  const [toastMsg, setToastMsg] = useState('')

  const toast = (m) => { setToastMsg(m); setTimeout(() => setToastMsg(''), 3200) }
  document.body.dataset.lang = lang
  useEffect(() => { saveLang(lang) }, [lang])
  useEffect(() => { if (hasToken()) api('/me').then(setUser).catch(() => setToken(null)) }, [])

  // login required for every card; after login the clicked card opens
  const gate = (a) => { if (user) setView(a); else { setPending(a); setAuthOpen(true) } }
  const onAuthed = (u) => {
    setUser(u); setAuthOpen(false); toast(t(`வரவேற்கிறோம், ${u.name}! 🎉`, `Welcome, ${u.name}! 🎉`))
    if (pending) { const a = pending; setPending(null); setTimeout(() => setView(a), 250) }
  }
  const logout = () => { setToken(null); setUser(null); toast(t('வெளியேறினாய். மீண்டும் சந்திப்போம்!', 'Logged out. See you soon!')) }

  return (
    <>
      <Header user={user} lang={lang} setLang={setLang} logout={logout} login={() => setAuthOpen(true)} />
      <Hero cards={CARDS} gate={gate} />

      {authOpen && <AuthModal onClose={() => { setAuthOpen(false); setPending(null) }} onAuthed={onAuthed} toast={toast} />}
      {view && <Panel view={view} setView={setView} toast={toast} />}
      {toastMsg && <div className="toast show" role="status">{toastMsg}</div>}
    </>
  )
}

function Shell({ onClose, children }) {
  return (
    <div className="ov show" onClick={(e) => e.target === e.currentTarget && onClose()} role="dialog" aria-modal="true">
      <div className="modal big"><button className="x" onClick={onClose} aria-label="Close">✕</button>{children}</div>
    </div>
  )
}

function Panel({ view, setView, toast }) {
  const close = () => setView(null)
  if (view.t === 'quiz') return <Quiz onClose={close} setA={setView} />
  if (view.t === 'careers') return <Careers close={close} setView={setView} />
  if (view.t === 'career') return <CareerDetail id={view.id} close={close} setView={setView} />
  if (view.t === 'experts') return <Experts close={close} />
  if (view.t === 'colleges') return <Colleges close={close} toast={toast} />
  return null
}

function useData(path, params) {
  const [d, setD] = useState(null)
  const [err, setErr] = useState('')
  const key = JSON.stringify(params || {})
  useEffect(() => { setErr(''); api(path, { params }).then(setD).catch((e) => setErr(e.message)) }, [path, key])
  return [d, err]
}
const Wait = ({ d, err }) => err ? <div className="err" role="alert">⚠ {err}</div> : !d ? <p><span className="spin" style={{ borderColor: 'var(--acc)', borderTopColor: 'transparent' }} /> {t('ஏற்றுகிறது…', 'Loading…')}</p> : null

function Careers({ close, setView }) {
  const [list, err] = useData('/careers')
  return (
    <Shell onClose={close}>
      <h2><B ta="உன் வழியைத் தேர்ந்தெடு" en="Choose Your Career Path" /></h2>
      <Wait d={list} err={err} />
      <div className="pick">{(list || []).map((c) => (
        <button key={c.id} onClick={() => setView({ t: 'career', id: c.id })}><span className="em">{c.ic}</span><span><B ta={c.ta} en={c.en} /><small>{tr(c.tag)}</small></span></button>
      ))}</div>
    </Shell>
  )
}

function CareerDetail({ id, close, setView }) {
  const [list, err] = useData('/careers')
  const c = (list || []).find((x) => x.id === id)
  return (
    <Shell onClose={close}>
      <Wait d={list} err={err} />
      {c && <>
        <button className="btn b-out" style={{ minHeight: 40, marginBottom: 12 }} onClick={() => setView({ t: 'careers' })}>← {t('பின்', 'Back')}</button>
        <div className="ico" style={{ marginBottom: 10 }}>{c.ic}</div>
        <h2><B ta={c.ta} en={c.en} /></h2>
        <p className="sub" style={{ margin: '8px 0 14px' }}>{tr(c.desc)}</p>
        <Rows r={[[t('📘 படிப்புகள்', '📘 Courses'), c.courses.join(', ')], [t('📝 தேர்வு', '📝 Exam'), c.exam], [t('💰 கட்டணம்', '💰 Fees'), feeText(c.fee)]]} />
        <div style={{ margin: '14px 0' }}><Journey /></div>
        <button className="btn b-pri" style={{ width: '100%' }} onClick={() => setView({ t: 'colleges' })}>🏫 {t('கல்லூரி & கட்டணம் பார்', 'Find Colleges & Fees')}</button>
      </>}
    </Shell>
  )
}

function Experts({ close }) {
  const [list, err] = useData('/videos')
  return (
    <Shell onClose={close}>
      <h2><B ta="நிபுணர் உரை" en="Expert Speech" /></h2>
      <p className="sub" style={{ margin: '6px 0 0' }}>{t('பார்க்க ஒரு உரையைத் தொடு.', 'Tap a talk to watch.')}</p>
      <Wait d={list} err={err} />
      <div className="pick">{(list || []).map((v) => (
        <button key={v.id} onClick={() => v.youtube_url ? window.open(v.youtube_url, '_blank', 'noopener') : alert(t('இந்த உரையின் YouTube இணைப்பு விரைவில் சேர்க்கப்படும்.', 'The YouTube link for this talk will be added soon.'))}>
          <span className="em">{v.icon}</span><span>{tr(v.title)}<small>▶ {v.duration} · {tr(v.category)}</small></span></button>
      ))}</div>
    </Shell>
  )
}

function Colleges({ close, toast }) {
  const [opts] = useData('/colleges/filters')
  const [f, setF] = useState({ district: '', course: '', fee: '', type: '', hostel: false, scholarship: false })
  const [list, err] = useData('/colleges', { district: f.district, course: f.course, type: f.type, hostel: f.hostel, scholarship: f.scholarship,
    fee_max: f.fee && f.fee !== '999999' ? f.fee : '', fee_min: f.fee === '999999' ? 150000 : '' })
  const set = (k) => (e) => setF({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value })
  return (
    <Shell onClose={close}>
      <h2><B ta="கல்லூரி மற்றும் கட்டணம்" en="Find Colleges & Fees" /></h2>
      <div className="mini">
        <select value={f.district} onChange={set('district')} aria-label="District"><option value="">{t('எல்லா மாவட்டங்கள்', 'All districts')}</option>{(opts?.districts || []).map((d) => <option key={d} value={d}>{tr(d)}</option>)}</select>
        <select value={f.course} onChange={set('course')} aria-label="Course"><option value="">{t('எல்லாப் படிப்புகள்', 'All courses')}</option>{(opts?.courses || []).map((d) => <option key={d}>{d}</option>)}</select>
        <select value={f.fee} onChange={set('fee')} aria-label="Fee"><option value="">{t('எந்தக் கட்டணமும்', 'Any fee')}</option><option value="25000">{t('₹25,000-க்குள்', 'Below ₹25,000')}</option><option value="75000">{t('₹75,000-க்குள்', 'Below ₹75,000')}</option><option value="150000">{t('₹1,50,000-க்குள்', 'Below ₹1,50,000')}</option><option value="999999">{t('₹1,50,000-க்கு மேல்', 'Above ₹1,50,000')}</option></select>
        <select value={f.type} onChange={set('type')} aria-label="Type"><option value="">{t('அரசு / தனியார்', 'Govt / Private')}</option><option value="Government">{tr('Government')}</option><option value="Private">{tr('Private')}</option><option value="Aided">{tr('Aided')}</option></select>
        <label className="chk" style={{ display: 'flex', gap: 8, alignItems: 'center', minHeight: 46 }}><input type="checkbox" style={{ width: 22, height: 22 }} checked={f.hostel} onChange={set('hostel')} /> 🛏 {t('விடுதி', 'Hostel')}</label>
        <label className="chk" style={{ display: 'flex', gap: 8, alignItems: 'center', minHeight: 46 }}><input type="checkbox" style={{ width: 22, height: 22 }} checked={f.scholarship} onChange={set('scholarship')} /> 🎓 {t('உதவித்தொகை', 'Scholarship')}</label>
      </div>
      <Wait d={list} err={err} />
      {list && !list.length && <div className="empty">😔 {t('பொருந்தும் கல்லூரி இல்லை. வடிகட்டிகளை மாற்றிப் பார்.', 'No colleges match. Try changing the filters.')}</div>}
      {(list || []).map((x) => (
        <div className="cl" key={x.id}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span className={'tag' + (x.type === 'Private' ? ' b' : '')}>{tr(x.type)}</span><b style={{ color: '#B45309' }}>⭐ {x.rating}</b></div>
          <h3>{x.name}</h3>
          <div style={{ color: 'var(--mut)' }}>📍 {tr(x.district)}, {tr(x.state)} · 📘 {x.course}</div>
          <div className="fee">{inr(x.fee)} <small>{t('/ ஆண்டு', '/ year')}</small></div>
          <div className="tags"><span className={'tag' + (x.hostel ? '' : ' b')}>{x.hostel ? t('🛏 விடுதி உண்டு', '🛏 Hostel available') : t('விடுதி இல்லை', 'No hostel')}</span>{x.scholarship && <span className="tag w">🎓 {t('உதவித்தொகை', 'Scholarship')}</span>}<span className="tag b">📈 {tr(x.highlight)}</span></div>
        </div>
      ))}
    </Shell>
  )
}
